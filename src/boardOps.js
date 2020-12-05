import {globals} from './globals.js';
import {tuning} from './tuning.js';
import * as coremath from './coremath.js';
import * as gfx from './gfx.js';
import * as BABYLON from '@babylonjs/core'

export function refreshOutlines() {
    let kRD = globals.renderData.keys;
    let oRD = globals.renderData.outlines;
    let mats = globals.renderData.mats;

    for (const [k, o] of Object.entries(oRD)) {
        globals.scene.removeMesh(o);
    }

    for (const id of globals.pickedKeys) {
        if (!kRD[id]) {
            console.log("picked nonexistant key");
        }
        else {
            let rd = kRD[id];

            oRD[id] = BABYLON.MeshBuilder.CreateRibbon(id + "outline",
                {
                    pathArray: [coremath.genArrayFromOutline(rd.outline, 0.1, 0.1, true),
                        coremath.genArrayFromOutline(rd.outline, 0.5, 0.5, true)]
                }, globals.scene);
            oRD[id].material = mats["keySel"];
            oRD[id].translate(new BABYLON.Vector3(0, 10.5, 0), 1, BABYLON.Space.LOCAL);
        }
    }
}

function getPlateCutsWithStabs(width,height,kXform,plateCuts,pcbBounds) {
    let switchCutDims = [tuning.switchCutout[0]*0.5, tuning.switchCutout[1]*0.5];
    let sXform = kXform;

    // wack ass cherry 6u spacebar
    if(width == 6) {
        sXform = BABYLON.Matrix.Translation(9.525, 0, 0).multiply(sXform)
    }
    plateCuts.push([
        BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-switchCutDims[0], 0, -switchCutDims[1]), sXform),
        BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(switchCutDims[0], 0, -switchCutDims[1]), sXform),
        BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(switchCutDims[0], 0, switchCutDims[1]), sXform),
        BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-switchCutDims[0], 0, switchCutDims[1]), sXform)
    ]);

    // pcb footprint of a hotswap switch: x +/- 9 y +/- 6.75
    // enc: 6.75, 8,5
    let keyPCBBounds = [9,6.75];
    pcbBounds.push([
        BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-keyPCBBounds[0], 0, -keyPCBBounds[1]), sXform),
        BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(keyPCBBounds[0], 0, -keyPCBBounds[1]), sXform),
        BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(keyPCBBounds[0], 0, keyPCBBounds[1]), sXform),
        BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-keyPCBBounds[0], 0, keyPCBBounds[1]), sXform)
    ]);

    let span = width;
    if(height >= 1.75) {
        span = height;
        sXform = BABYLON.Matrix.RotationY(Math.PI / 2.0).multiply(sXform);
    }

    let stabCutDims = [7*0.5,15*0.5];
    if( span >= 2 ) {
        let stabOffsetXL = 0.0;
        let stabOffsetXR = 0.0;
        if(span <= 2.75) {
            stabOffsetXL = stabOffsetXR = 11.938;
        }
        else if(span <= 3.0) {
            stabOffsetXL = stabOffsetXR = 19.05;
        }
        else if(span <= 4) {
            stabOffsetXL = stabOffsetXR = 28.575;
        }
        else if(span <= 4.5) {
            stabOffsetXL = stabOffsetXR = 34.671;
        }
        else if(span <= 5.5) {
            stabOffsetXL = stabOffsetXR = 42.8625;
        }
        else if(span == 6) {
            // cherry 6u again
            stabOffsetXL = 57.15;
            stabOffsetXR = 38.1
        }
        else if(span <= 6) {
            stabOffsetXL = stabOffsetXR = 47.5;
        }
        else if(span <= 6.25) {
            stabOffsetXL = stabOffsetXR = 50;
        }
        else if(span <= 6.5) {
            stabOffsetXL = stabOffsetXR = 52.38;
        }
        else if(span <= 7) {
            stabOffsetXL = stabOffsetXR = 57.15;
        }
        else {
            stabOffsetXL = stabOffsetXR = 66.675;
        }

        let stabXforms = [BABYLON.Matrix.Translation(-stabOffsetXL, 0, -2).multiply(sXform),
                          BABYLON.Matrix.Translation( stabOffsetXR, 0, -2).multiply(sXform)];
        let stabCut = [new BABYLON.Vector3(-stabCutDims[0], 0, -stabCutDims[1]),
                       new BABYLON.Vector3(stabCutDims[0], 0, -stabCutDims[1]),
                       new BABYLON.Vector3(stabCutDims[0], 0, stabCutDims[1]),
                       new BABYLON.Vector3(-stabCutDims[0], 0, stabCutDims[1])];

        // stab foot = 4 wide x 19 h
        let stabPCBFootDims = [3,9.5];
        let stabFoot = [new BABYLON.Vector3(-stabPCBFootDims[0], 0, -7),
        new BABYLON.Vector3(stabPCBFootDims[0], 0, -7),
        new BABYLON.Vector3(stabPCBFootDims[0], 0, 11),
        new BABYLON.Vector3(-stabPCBFootDims[0], 0, 11)];

        for(let j = 0; j < stabXforms.length; j++) {
            let xformedCut = [];
            for(let i = 0; i < stabCut.length; i++) {
                xformedCut.push(BABYLON.Vector3.TransformCoordinates(stabCut[i],stabXforms[j]));
            }
            plateCuts.push(xformedCut);

            let xformedPCBBounds = [];
            for(let i = 0; i < stabFoot.length; i++) {
                xformedPCBBounds.push(BABYLON.Vector3.TransformCoordinates(stabFoot[i],stabXforms[j]));
            }
            pcbBounds.push(xformedPCBBounds);
        }
    }
}

export function refreshLayout() {
    const scene = globals.scene;
    const bd = globals.boardData;

    let mins = [100000.0, 100000.0]
    let maxs = [-100000.0, -100000.0];

    let bezelHoles = [];

    let kRD = globals.renderData.keys;
    // clear the renderdata (cache this later?)
    for(const [id, rd] of Object.entries(kRD)) {
        if (rd.keycap) {
            scene.removeMesh(rd.keycap);
        }
    }
    kRD = globals.renderData.keys = [];
    
    let outlines = [];

    let kgID = 0;
    for (const [id, k] of Object.entries(bd.layout.keys)) {
        // console.log(k);

        if (!kRD[id]) {
            kRD[id] = {keyGroupId:null,id:id,
                        mins:[100000.0, 100000.0], maxs:[-100000.0, -100000.0],
                        bezelMins:[100000.0, 100000.0], bezelMaxs:[-100000.0, -100000.0],
                        overlappingKeys:{}
                    };
        }
        let rd = kRD[id];

        let keycapDim = [(tuning.keyDims[0] + tuning.base1U[0] * (k.width - 1)) / 2,
        (tuning.keyDims[1] + tuning.base1U[1] * (k.height - 1)) / 2];

        // let uDim = [(tuning.base1U[0] + tuning.base1U[0] * (k.width - 1)) / 2,
        // (tuning.base1U[1] + tuning.base1U[1] * (k.height - 1)) / 2];

        let kPos = [k.x * tuning.base1U[0] + keycapDim[0],
        -(k.y * tuning.base1U[1] + keycapDim[1])]
        let kPosition = new BABYLON.Vector3(kPos[0], 0, kPos[1]);
        let kXform = BABYLON.Matrix.Identity();
        kXform = kXform.multiply(BABYLON.Matrix.Translation(kPos[0], 0, kPos[1]));
        if (k.rotation_angle != 0) {
            kXform = kXform.multiply(BABYLON.Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
            kXform = kXform.multiply(BABYLON.Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
            kXform = kXform.multiply(BABYLON.Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
        }
        rd.outline = [
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-keycapDim[0], 0, -keycapDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(keycapDim[0], 0, -keycapDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(keycapDim[0], 0, keycapDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-keycapDim[0], 0, keycapDim[1]), kXform)
        ];

        rd.pcbBoxes = [];
        rd.switchCut = [];

        getPlateCutsWithStabs(k.width,k.height,kXform,rd.switchCut,rd.pcbBoxes);

        if (rd.keycap) {
            scene.removeMesh(rd.keycap);
        }
        if (tuning.keyShape) {
            rd.keycap = BABYLON.MeshBuilder.CreatePolygon(id, { shape: coremath.genArrayFromOutline(rd.outline,0,0.25), depth: 7, smoothingThreshold: 0.1, updatable: false }, scene);
            rd.keycap.translate(new BABYLON.Vector3(0, 10.5, 0), 1, BABYLON.Space.LOCAL);
    
            if(k.matName && globals.renderData.mats[k.matName]) {
                rd.keycap.material = globals.renderData.mats[k.matName];
            }
        }

        rd.bezelHole = [
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-keycapDim[0] - tuning.bezelGap, 0, -keycapDim[1] - tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(keycapDim[0] + tuning.bezelGap, 0, -keycapDim[1] - tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(keycapDim[0] + tuning.bezelGap, 0, keycapDim[1] + tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-keycapDim[0] - tuning.bezelGap, 0, keycapDim[1] + tuning.bezelGap), kXform)
        ];
        bezelHoles.push(rd.bezelHole);

        for (let p of rd.bezelHole) {
            rd.bezelMins[0] = Math.min(rd.bezelMins[0], p.x);
            rd.bezelMaxs[0] = Math.max(rd.bezelMaxs[0], p.x);
            rd.bezelMins[1] = Math.min(rd.bezelMins[1], p.z);
            rd.bezelMaxs[1] = Math.max(rd.bezelMaxs[1], p.z);
        }

        for (let p of rd.outline) {
            rd.mins[0] = Math.min(rd.mins[0], p.x);
            rd.maxs[0] = Math.max(rd.maxs[0], p.x);
            rd.mins[1] = Math.min(rd.mins[1], p.z);
            rd.maxs[1] = Math.max(rd.maxs[1], p.z);
        }
        mins[0] = Math.min(rd.mins[0], mins[0]);
        maxs[0] = Math.max(rd.maxs[0], maxs[0]);
        mins[1] = Math.min(rd.mins[1], mins[1]);
        maxs[1] = Math.max(rd.maxs[1], maxs[1]);

        let checkOverlap = function(k1, rd1, k2, rd2) {
            if( rd1.bezelMins[0]+BABYLON.Epsilon > rd2.bezelMaxs[0] || rd2.bezelMins[0]+BABYLON.Epsilon > rd1.bezelMaxs[0] ||
                rd1.bezelMins[1]+BABYLON.Epsilon > rd2.bezelMaxs[1] || rd2.bezelMins[1]+BABYLON.Epsilon > rd1.bezelMaxs[1] ) {
                return false
            }

            // see if any of the lines bisect the other rect  (since it's a rect, we know each line is actually a normal of the previous)

            let checkIntersection = (pRD, oRD) => {
                for(let iP = 0; iP < pRD.bezelHole.length; iP++) {
                    let line = pRD.bezelHole[(iP+1)%pRD.bezelHole.length].subtract(pRD.bezelHole[iP]);
                    let allLess = true;
                    let allMore = true;
                    for(let oP = 0; oP < oRD.bezelHole.length; oP++) {
                        let dot = BABYLON.Vector3.Dot(line,oRD.bezelHole[oP].subtract(pRD.bezelHole[iP]));
                        allMore &= dot > -BABYLON.Epsilon;
                        allLess &= dot < BABYLON.Epsilon;
                    }
    
                    if( allMore || allLess ) {
                        return true;
                    }
                }
                return false;
            }
            let confirmedIntersection = checkIntersection(rd1,rd2);
            if(!confirmedIntersection) {
                confirmedIntersection = checkIntersection(rd2,rd1);
            }

            if(confirmedIntersection) {
                rd1.overlappingKeys[rd2.id] = rd2;
                rd2.overlappingKeys[rd1.id] = rd1;
                if(rd1.keyGroupId && rd2.keyGroupId) {
                    // merge
                    // console.log(`merging kgIDs ${rd1.keyGroupId} and ${rd2.keyGroupId}`);
                    let pKG = rd1.keyGroupId;
                    let oKG = rd2.keyGroupId;
                    for(const [otherId, oRD] of Object.entries(kRD)) {
                        if(oRD.keyGroupId == oKG) {
                            oRD.keyGroupId = pKG;
                        }
                    }
                }
                else if(rd1.keyGroupId) {
                    rd2.keyGroupId = rd1.keyGroupId;
                }
                else if(rd2.keyGroupId) {
                    rd1.keyGroupId = rd2.keyGroupId;
                }
                else {
                    rd1.keyGroupId = rd2.keyGroupId = kgID++;
                }
            }
        }

        for (const [otherId, otherRD] of Object.entries(kRD)) {
            if(otherId == id) {
                continue;
            }

            let otherKey = bd.layout.keys[otherId];
            checkOverlap(k,rd,otherKey,otherRD);
        }

        if(!rd.keyGroupId) {
            rd.keyGroupId = kgID++;
        }
    }

    bd.layout.bounds = { mins: mins, maxs: maxs };

    let kPs = [];
    for( let [id,rd] of Object.entries(kRD) ) {
        for( let b of rd.pcbBoxes) {
            for( let p of b) {
                kPs.push(p)
            }
        }
    }
    bd.pcbOutline = coremath.convexHull2d(kPs);
    if(bd.forcePCBSymmetrical) {
        let midPoint = (bd.layout.bounds.maxs[0] - bd.layout.bounds.mins[0]) * 0.5 + bd.layout.bounds.mins[0];
        for(let oP of bd.pcbOutline) {
            kPs.push(new BABYLON.Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
        }
        bd.pcbOutline = coremath.convexHull2d(kPs);
    }
    bd.pcbBounds = {mins:[100000.0, 100000.0],
                     maxs:[-100000.0, -100000.0]};
    for(let p of bd.pcbOutline) {
        bd.pcbBounds.mins[0] = Math.min(bd.pcbBounds.mins[0], p.x);
        bd.pcbBounds.maxs[0] = Math.max(bd.pcbBounds.maxs[0], p.x);
        bd.pcbBounds.mins[1] = Math.min(bd.pcbBounds.mins[1], p.z);
        bd.pcbBounds.maxs[1] = Math.max(bd.pcbBounds.maxs[1], p.z);
    }


    refreshOutlines();
}

function getCombinedOutlineFromRDGroup(KG) {
    for( const rd of KG ) {
        rd.outlineLines = [];
        rd.parsedOutlineLines = {};
        for(let p = 0; p < rd.bezelHole.length; p++) {
            let lStart = rd.bezelHole[p];
            let lEnd = rd.bezelHole[(p+1)%rd.bezelHole.length]
            rd.outlineLines.push([lStart,lEnd]);
        }
    }


    let maxOverlapSq = BABYLON.Epsilon;

    let overlapFunc = (primeL, primeLen, otherLen, line, norm, distBetween, lineArray, parseArray) => {
        if(!parseArray[primeL]) {
            let primeToOtherNear = Math.max(distBetween - otherLen,0) / primeLen;
            let primeToOtherFar = distBetween / primeLen;
            if(primeToOtherNear < 1 - BABYLON.Epsilon && primeToOtherFar > BABYLON.Epsilon) {
                // kill O and replace it with any remaining line segments
                //parseArray[primeL] = true;
                if (primeToOtherNear > BABYLON.Epsilon) {
                    lineArray.push([line[0],line[0].add(norm.scale(distBetween - otherLen))]);
                }
                if (primeToOtherFar < 1 - BABYLON.Epsilon) {
                    lineArray.push([line[0].add(norm.scale(distBetween)), line[1]]);
                }
                lineArray.splice(primeL,1);
            }
        }
    }
    // clip any overlapping parallel lines against each other (cancel if they face each other)
    for( const rd of KG ) {
        // if(true) break;
        rd.visitedForOutline = true;

        for( const [oId,otherRD] of Object.entries(rd.overlappingKeys) ) {
            //if(otherRD.visitedForOutline) continue;
            for(let iL = rd.outlineLines.length-1; iL >= 0; iL--) {
                let lL = rd.outlineLines[iL];
                let lDir = lL[1].subtract(lL[0]);
                let lLen = lDir.length()
                if(lLen < BABYLON.Epsilon) continue;
                let lineNorm = lDir.normalizeFromLength(lLen);

                for( let jL = otherRD.outlineLines.length-1; jL > 0; jL-- ) {
                    let oL = otherRD.outlineLines[jL];
                    let oDir = oL[1].subtract(oL[0]);
                    let oLen = oDir.length();
                    if(oLen < BABYLON.Epsilon ) continue;
                    let oLNorm = oDir.normalizeFromLength(oLen);
                    let lineDot = BABYLON.Vector3.Dot(oLNorm,lineNorm)
                    if( Math.abs(lineDot) > 1-BABYLON.Epsilon) {
                        let diff = lL[0].subtract(oL[0]);
                        if(diff.lengthSquared() < BABYLON.Epsilon) {
                            let d2 = lL[1].subtract(oL[1]);
                            let d2ls = d2.lengthSquared();
                            if(d2ls< BABYLON.Epsilon || d2ls > lLen*lLen) {
                                rd.outlineLines.splice(iL,1);
                                break;
                            } else {
                                lL[0] = oL[1];
                                break;
                            }
                        }
                        let dd = BABYLON.Vector3.Dot(diff, oLNorm);
                        let projPoint = oL[0].add(oLNorm.scale(dd))
                        if( projPoint.subtract(lL[0]).lengthSquared() < maxOverlapSq) {
                            // check to see if these two are facing away from each other
                            if(lineDot < BABYLON.Epsilon-1) {
                                // at this point, dd is the distance between the two starting points (which are facing each other) 
                                // erase the overlapping portion of each line
                                // O ------------> olen
                                //      llen <--------- L
                                // O <----------------> dd
                                overlapFunc(jL,oLen,lLen,oL,oLNorm,dd,otherRD.outlineLines,otherRD.parsedOutlineLines);
                                overlapFunc(iL,lLen,oLen,lL,lineNorm,dd,rd.outlineLines,rd.parsedOutlineLines);
                            }
                            else if( lineDot > 1-BABYLON.Epsilon ) {
                                if( dd > BABYLON.Epsilon ) {
                                    // O -------->
                                    //        L ---------->
                                    // O <---> dd
                                    // consume L
                                    let overlapDist = oLen - dd;
                                    if(!rd.parsedOutlineLines[iL]) {
                                        if(overlapDist > BABYLON.Epsilon) {
                                            // console.log(`trimming A ${rd.id} ${iL} vs ${oId} ${jL} len ${lLen} ov ${overlapDist}`)
                                            if(lLen - overlapDist < BABYLON.Epsilon)
                                            {
                                                // console.log(`SPLICE`);
                                                rd.outlineLines.splice(iL,1);
                                                break;
                                            }
                                            // rd.parsedOutlineLines[iL] = true;
                                            // rd.outlineLines.push([lL[0].add(lineNorm.scale(overlapDist)),lL[1]]);
                                            lL[0] = lL[0].add(lineNorm.scale(overlapDist));
                                        }
                                    }
                                }
                                if( dd < BABYLON.Epsilon ) {
                                    // L -------->
                                    //        O ---------->
                                    // L <---> -dd
                                    // consume L
                                    let d = -dd;
                                    if(!rd.parsedOutlineLines[iL]) {
                                        if(d < lLen - BABYLON.Epsilon) {
                                            // console.log(`trimming B ${rd.id} ${iL} vs ${oId} ${jL} d ${d}`)
                                            if(d < BABYLON.Epsilon)
                                            {
                                                // console.log(`SPLICE`);
                                                rd.outlineLines.splice(iL,1);
                                                break;
                                            }
                                            // rd.parsedOutlineLines[iL] = true;
                                            // rd.outlineLines.push([lL[0],lL[0].add(lineNorm.scale(d))]);
                                            lL[1] = lL[0].add(lineNorm.scale(d));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    for( const rd of KG ) {
        // if(true) break;
        for( const [oId,otherRD] of Object.entries(rd.overlappingKeys) ) {
            for(let iL = rd.outlineLines.length - 1; iL >= 0; iL--) {
                let l = rd.outlineLines[iL];
                let lL = l[1].subtract(l[0]);
                let lNorm = new BABYLON.Vector3(lL.z,0,-lL.x).normalize();

                let intersections = [];
                let colinear = false;
                for(let iOP = 0; iOP < otherRD.bezelHole.length; iOP++) {
                    let segRes = coremath.segmentToSegment(l[0], l[1], lL, lNorm, otherRD.bezelHole[iOP], otherRD.bezelHole[(iOP+1)%otherRD.bezelHole.length]);
                    if(segRes.type == "in_segment" && segRes.intersection) {
                        // console.log(`intersecting ${rd.id} line ${iL} with ${otherRD.id} line ${iOP}` )
                        // console.log(l)
                        intersections.push(segRes.intersection);
                    }
                    else if(segRes.type == "colinear") {
                        // console.log(`bailing colinear ${rd.id} line ${iL} with ${otherRD.id} line ${iOP}`);
                        // we're colinear with an edge, so we don't have anything to clip with this box
                        colinear = true;
                        break;
                    }
                }
                if(colinear) continue;

                let isStartInPoly = coremath.isPointInPoly(l[0],otherRD.bezelHole);
                let isEndInPoly = coremath.isPointInPoly(l[1],otherRD.bezelHole);

                // console.log(`${rd.id} line ${iL} with ${otherRD.id} startIn ${isStartInPoly} end ${isEndInPoly} ${intersections.length}`);
                if(isStartInPoly && isEndInPoly && intersections.length <= 1) {
                    // both are inside the poly, just remove the line
                    // console.log(`removing line ${iL} from ${rd.id}`);
                    rd.outlineLines.splice(iL, 1);
                }
                else if(intersections.length == 1) {
                    // console.log(`splitting (one intersection) line ${iL} from ${rd.id}`);
                    // console.log(`start ${isStartInPoly} end ${isEndInPoly}`);
                    if(isStartInPoly) {
                        l[0] = intersections[0];
                    } else {
                        l[1] = intersections[0];
                    }
                    if(l[1].subtract(l[0]).lengthSquared() < BABYLON.Epsilon) {
                        rd.outlineLines.splice(iL, 1);
                    }
                }
                else if(intersections.length > 1) {
                    // console.log(`multisplit line ${iL} from ${rd.id}`);
                    // console.log(`${rd.id} l is ${l[0]} ${l[1]}`);
                    intersections.sort((a,b) => (a.subtract(l[0]).lengthSquared() - b.subtract(l[0]).lengthSquared()))
                    let tmp = l[1];
                    l[1] = intersections[0];
                    if(l[1].subtract(l[0]).lengthSquared() < BABYLON.Epsilon) {
                        // console.log("skipping start length due to shortness");
                        rd.outlineLines.splice(iL, 1);
                    }
                    // console.log(`${rd.id} start is ${l[0]} ${l[1]}`);
                    for(let i = 2; i < intersections.length; i+=2) {
                        if( intersections[i-1].subtract(intersections[i]).lengthSquared() > BABYLON.Epsilon) {
                            rd.outlineLines.push([intersections[i-1],intersections[i]]);
                        } 
                        // console.log(`${rd.id} mid is ${intersections[i-1]} ${intersections[i]}`);
                    }
                    if(intersections.length % 2 == 0) {
                        if( intersections[intersections.length-1].subtract(tmp).lengthSquared() > BABYLON.Epsilon) {
                            rd.outlineLines.push([intersections[intersections.length-1],tmp]);
                            // console.log(`${rd.id} end is ${intersections[intersections.length-1]} ${tmp}`);
                        }
                    }
                }
            }
        }
    }


    let parsedLines = [];
    let nextKeyRd = null;
    let nextLineIndex = -1;
    let invertNextLine = false;
    // pick a line at random.  this could actually pick something on an interior island so we should probably
    // run the loop gen algorithm until all the lines are used up and then pick the polygon with the largest area
    for( const rd of KG ) {
        for(let iL = 0; iL < rd.outlineLines.length; iL++) {
            if(!rd.parsedOutlineLines[iL]) {
                nextKeyRd = rd;
                nextLineIndex = iL;
                break;
            }
        }
        if(nextLineIndex >= 0) break;
    }
    
    let outline = [];
    // finally, walk through the list of available outline lines and pick the closest end point for the next line
    while(nextKeyRd != null && nextLineIndex >= 0) {
        nextKeyRd.parsedOutlineLines[nextLineIndex] = true;
        let prevLine = nextKeyRd.outlineLines[nextLineIndex];
        if(invertNextLine) {
            let tmp = prevLine[0];
            prevLine[0] = prevLine[1];
            prevLine[1] = tmp;
        }
        // console.log(`key rd ${nextKeyRd.id} line idx ${nextLineIndex} s ${prevLine[0]} e ${prevLine[1]}`)
        
        outline.push(prevLine[0]);

        parsedLines.push(prevLine);
        nextLineIndex = -1;
        let nextDistSq = 20.0

        let checkNext = (n,nRd,i) => {
            let newDistSq = prevLine[1].subtract(n[0]).lengthSquared();
            if(newDistSq < nextDistSq) {
                nextDistSq = newDistSq;
                nextKeyRd = nRd;
                nextLineIndex = i;
                invertNextLine = false;
            }

            newDistSq = prevLine[1].subtract(n[1]).lengthSquared();
            if(newDistSq < nextDistSq) {
                nextDistSq = newDistSq;
                nextKeyRd = nRd;
                nextLineIndex = i;
                invertNextLine = true;
            }
        }
        
        for(let iL = 0; iL < nextKeyRd.outlineLines.length; iL++) {
            if(!nextKeyRd.parsedOutlineLines[iL]) {
                checkNext(nextKeyRd.outlineLines[iL],nextKeyRd,iL);
            }
        }

        for( const [oId,otherRD] of Object.entries(nextKeyRd.overlappingKeys) ) {
            for( let jL = 0; jL < otherRD.outlineLines.length; jL++ ) {
                if(otherRD.parsedOutlineLines[jL]) continue;

                checkNext(otherRD.outlineLines[jL],otherRD,jL);
            }
        }
    }
    return outline;
}

export function addScrewHoles() {
    globals.boardData.screwLocations = [];
    globals.renderData.screwData = [];
    if(globals.boardData.caseType != "rect") { return; }

    const bounds = globals.boardData.layout.bounds;
    const caseWidth = bounds.maxs[0] - bounds.mins[0];
    const caseHeight = bounds.maxs[1] - bounds.mins[1];
    const screwSideBuffer = tuning.screwSideBuffer;
    const maxScrewSpan = tuning.maxScrewSpan;
    const screwBezelBias = tuning.screwBezelBias;
    const bezelOffset = (tuning.bezelThickness - tuning.screwBossMin * 2.0) * screwBezelBias + tuning.bezelGap + tuning.screwBossMin;


    const topScrewLengthToCover = caseWidth+bezelOffset*2.0-screwSideBuffer*2.0;
    const topScrews = Math.floor(topScrewLengthToCover / maxScrewSpan) + 1
    const topScrewSpan = topScrewLengthToCover / topScrews
    const sideScrewLengthToCover = caseHeight+bezelOffset*2.0-screwSideBuffer*2.0;
    const sideScrews = Math.floor(sideScrewLengthToCover / maxScrewSpan) + 1
    const sideScrewSpan = sideScrewLengthToCover / sideScrews
    console.log(`bezel offset: ${bezelOffset} num top screws: ${topScrews} span ${topScrewSpan} side screws: ${sideScrews} span: ${sideScrewSpan}`)
    //bottom
    for(let i = 0; i <= topScrews; i++) {
        let newLoc = [ i*topScrewSpan + screwSideBuffer + bounds.mins[0] - bezelOffset,
                        bounds.mins[1]-bezelOffset]
        globals.boardData.screwLocations.push(new BABYLON.Vector3(newLoc[0], 0, newLoc[1]));
    }
    // top
    for(let i = 0; i <= topScrews; i++) {
        let newLoc = [i*topScrewSpan+screwSideBuffer+bounds.mins[0]-bezelOffset,
                        bounds.maxs[1]+bezelOffset]
        globals.boardData.screwLocations.push(new BABYLON.Vector3(newLoc[0], 0, newLoc[1]));
    }
    // sides (minus ends)
    for(let i = 1; i < sideScrews; i++) {
        let newLoc = [ bounds.mins[0]-bezelOffset,
                        i*sideScrewSpan + screwSideBuffer + bounds.mins[1] - bezelOffset ]
        globals.boardData.screwLocations.push(new BABYLON.Vector3(newLoc[0], 0, newLoc[1]));
    }
    for(let i = 1; i < sideScrews; i++) {
        let newLoc = [ bounds.maxs[0]+bezelOffset,
                        i*sideScrewSpan + screwSideBuffer + bounds.mins[1] - bezelOffset ]
        globals.boardData.screwLocations.push(new BABYLON.Vector3(newLoc[0], 0, newLoc[1]));
    }

    for(const loc of globals.boardData.screwLocations) {
        globals.renderData.screwData.push(new coremath.Circle(loc,tuning.screwHoleThruRadius));
    }
}

export function refreshCase() {
    const scene = globals.scene;
    const bd = globals.boardData;
    const kRD = globals.renderData.keys;
    const mats = globals.renderData.mats;

    let cRD = globals.renderData.case;
    cRD.layers = {};
    if (cRD.bottom) {
        scene.removeMesh(cRD.bottom);
    }
    if (cRD.pcbMesh) {
        scene.removeMesh(cRD.pcbMesh);
    }
    if (cRD.bezel) {
        scene.removeMesh(cRD.bezel);
    }
    if (cRD.plateMesh) {
        scene.removeMesh(cRD.plateMesh);
    }
    if (cRD.edgeMesh) {
        scene.removeMesh(cRD.edgeMesh);
    }

    if(Object.keys(bd.layout.keys).length < 1) {
        return;
    }

    addScrewHoles();

    let screwHoles = globals.renderData.screwData.map((a) => coremath.genArrayForCircle(a,0,19));


    if(bd.caseType == "convex") {
        let kPs = [];
        for( let [id,rd] of Object.entries(kRD) ) {
            for( let p of rd.outline ) {
                kPs.push(p)
            }
        }
        for(let p of bd.pcbOutline) {
            kPs.push(p);
        }
        bd.outline = coremath.convexHull2d(kPs);

        if(bd.forceSymmetrical) {
            let midPoint = (bd.layout.bounds.maxs[0] - bd.layout.bounds.mins[0]) * 0.5 + bd.layout.bounds.mins[0];
            for(let oP of bd.outline) {
                kPs.push(new BABYLON.Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
            }
            bd.outline = coremath.convexHull2d(kPs);
        }
    }
    else
    {
        let pcbBounds = bd.pcbBounds;
        let bounds = bd.layout.bounds;
        bd.outline = [
            new BABYLON.Vector3(Math.min(bounds.mins[0],pcbBounds.mins[0]), 0, Math.min(bounds.mins[1],pcbBounds.mins[1])),
            new BABYLON.Vector3(Math.max(bounds.maxs[0],pcbBounds.maxs[0]), 0, Math.min(bounds.mins[1],pcbBounds.mins[1])),
            new BABYLON.Vector3(Math.max(bounds.maxs[0],pcbBounds.maxs[0]), 0, Math.max(bounds.maxs[1],pcbBounds.maxs[1])),
            new BABYLON.Vector3(Math.min(bounds.mins[0],pcbBounds.mins[0]), 0, Math.max(bounds.maxs[1],pcbBounds.maxs[1]))
        ];
    }


    let cavityInnerEdgeVec = [coremath.offsetAndFilletOutline(bd.outline, tuning.bezelGap, tuning.bezelCornerFillet, false)];
    // let cavityInnerEdge = [coremath.genArrayFromOutline(bd.outline, tuning.bezelGap, tuning.bezelCornerFillet, false)];
    let caseFrameVec = coremath.offsetAndFilletOutline(bd.outline, tuning.bezelGap + tuning.bezelThickness, tuning.caseCornerFillet, false);
    let caseFrame = coremath.genPointsFromVectorPath(caseFrameVec,8);

    if( tuning.drawCase ) {
        cRD.layers["edge"] = {outlines:[caseFrameVec, ...cavityInnerEdgeVec, ...globals.renderData.screwData]};
        cRD.edgeMesh = BABYLON.MeshBuilder.CreatePolygon("edge", 
                                                         { shape: caseFrame, depth:9, smoothingThreshold: 0.1, 
                                                           holes: [...screwHoles,...cavityInnerEdgeVec.map((a) => coremath.genPointsFromVectorPath(a,8))],
                                                           updatable: true }, scene);
        cRD.edgeMesh.translate(new BABYLON.Vector3(0, -1.5, 0), 1, BABYLON.Space.LOCAL);
        cRD.edgeMesh.material = mats["case"];
        //gfx.combineSideVerts(cRD.edgeMesh);
    }

    if( tuning.drawCase ) {
        cRD.layers["bottom"] = {outlines:[caseFrameVec, ...globals.renderData.screwData]};
        cRD.bottom = BABYLON.MeshBuilder.CreatePolygon("bottom", { shape: caseFrame, depth:3, smoothingThreshold: 0.1, holes:screwHoles, updatable: true }, scene);
        cRD.bottom.translate(new BABYLON.Vector3(0, -9-1.5, 0), 1, BABYLON.Space.LOCAL);
        cRD.bottom.material = mats["case"];
    }

    if( tuning.drawPCB ) {
        let pcbOutlineVec = coremath.offsetAndFilletOutline(bd.pcbOutline, 0.0, 2.0, false);
        let pcbOutline = coremath.genPointsFromVectorPath(pcbOutlineVec);
        cRD.layers["pcb"] = {outlines:[pcbOutlineVec]};
        cRD.pcbMesh = BABYLON.MeshBuilder.CreatePolygon("pcbMesh", { shape: pcbOutline, depth:1.6, smoothingThreshold: 0.1, updatable: true }, scene);
        cRD.pcbMesh.translate(new BABYLON.Vector3(0, -5.0, 0), 1, BABYLON.Space.LOCAL);
        cRD.pcbMesh.material = mats["fr4"];
    }

    let keyGroups = {};
    let bezelOutlineVecs = []
    let bezelOutlines = [];
    for(const [otherId, oRD] of Object.entries(kRD)) {
        // console.log(`${otherId} is in kgid: ${oRD.keyGroupId}`);
        if(!keyGroups[oRD.keyGroupId]) {
            keyGroups[oRD.keyGroupId] = [];
        }
        keyGroups[oRD.keyGroupId].push(oRD);
    }

    let dbglines = [];
    for(const [kgId, KG] of Object.entries(keyGroups)) {
        let outline = getCombinedOutlineFromRDGroup(KG);

        let bezelOutlineVec = coremath.offsetAndFilletOutline(outline, 0.0, tuning.bezelCornerFillet, false);
        bezelOutlineVecs.push(bezelOutlineVec);
        bezelOutlines.push(coremath.genPointsFromVectorPath(bezelOutlineVec));
        
        // for( const rd of KG ) {
        //     for(let iL = 0; iL < rd.outlineLines.length; iL++) {
        //         dbglines.push(rd.outlineLines[iL])
        //     }
        // }
    }
    // if( globals.lineSystem ) {
    //     globals.scene.removeMesh(globals.lineSystem)
    // }
    // globals.lineSystem = BABYLON.MeshBuilder.CreateLineSystem("lineSystem", {lines: dbglines}, globals.scene);

    if( tuning.drawBezel ) {
        cRD.layers["bezel"] = {outlines:[caseFrameVec, ...bezelOutlineVecs, ...globals.renderData.screwData]};
        cRD.bezel = BABYLON.MeshBuilder.CreatePolygon("bezel", { shape: caseFrame, depth:7.5, smoothingThreshold: 0.1, holes:[...screwHoles,...bezelOutlines] }, scene);
        cRD.bezel.translate(new BABYLON.Vector3(0, 7.5, 0), 1, BABYLON.Space.LOCAL);
        //cRD.bezel.rotation = new BABYLON.Vector3(-Math.PI/12, 0, 0);
        cRD.bezel.material = mats["case"];
    }


    let switchCuts = [];
    let switchCutsVec = [];
    for(const [otherId, rd] of Object.entries(kRD)) {
        for(let cut of rd.switchCut) {
            let switchOutlineVec = coremath.offsetAndFilletOutline(cut, 0.0, 0.5, false);
            switchCutsVec.push(switchOutlineVec);
            switchCuts.push(coremath.genPointsFromVectorPath(switchOutlineVec));
        }
        // switchCuts.push(...rd.switchCut);
    }
    if( tuning.drawPlate ) {
        cRD.layers["plate"] = {outlines:[caseFrameVec, ...switchCutsVec, ...globals.renderData.screwData]};
        cRD.plateMesh = BABYLON.MeshBuilder.CreatePolygon("plate", { shape: caseFrame, depth:1.5, smoothingThreshold: 0.1, holes: [...screwHoles,...switchCuts] }, scene);
        //cRD.plate.translate()
        cRD.plateMesh.material = mats["plate"];
    }
}

export function refreshKeyboard() {
    refreshLayout();

    refreshCase();
}

export function loadKeyboard(path) {
    fetch(path)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let mats = globals.renderData.mats;

            let bd = {};
            bd.meta = data.meta;
            bd.forceSymmetrical = true;
            bd.forcePCBSymmetrical = true;
            bd.caseType = "rect";
            bd.case = data.case;
            bd.layout = {keys: {}};
            let kIdx = 0
            for (let k of data.keys) {
                k.id = "key" + kIdx++;
                
                if(!mats[k.color]) {
                    gfx.createKeyMaterial(k.color,BABYLON.Color3.FromHexString(k.color));
                }
                k.matName = k.color;
                
                bd.layout.keys[k.id] = k;
            }
            globals.boardData = bd;
            
            gfx.createMaterials();
            refreshKeyboard();
            gfx.snapCamera("angle");
        });
}
