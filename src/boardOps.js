import {globals} from './globals.js';
import {tuning} from './tuning.js';
import * as coremath from './coremath.js';
import * as gfx from './gfx.js';
import {Vector3, Space, MeshBuilder, Matrix, Epsilon, Color3} from '@babylonjs/core'

export function refreshOutlines() {
    let kRD = globals.renderData.keys;
    let oRD = globals.renderData.outlines;
    let mats = globals.renderData.mats;

    for (const [k, o] of Object.entries(oRD)) {
        globals.scene.removeMesh(o);
    }

    oRD.length = 0;

    for (const id of globals.pickedKeys) {
        if (!kRD[id]) {
            console.log("picked nonexistant key");
        }
        else {
            let rd = kRD[id];

            oRD[id] = MeshBuilder.CreateRibbon(id + "outline",
                {
                    pathArray: [coremath.genArrayFromOutline(rd.outline, 0.1, 0.1, true),
                        coremath.genArrayFromOutline(rd.outline, 0.5, 0.5, true)]
                }, globals.scene);
            oRD[id].material = mats["keySel"];
            oRD[id].translate(new Vector3(0, 10.5, 0), 1, Space.LOCAL);
        }
    }
}

let polyID = 0;

function Poly(points) {
    this.points = points;
    this.id = polyID++;
    this.overlappingPolys = {};
    this.type = "rect";
}

function getPlateCutsWithStabs(width,height,kXform,plateCuts,pcbBounds) {
    let switchCutDims = [tuning.switchCutout[0]*0.5, tuning.switchCutout[1]*0.5];
    let sXform = kXform;

    // wack ass cherry 6u spacebar
    if(width == 6) {
        getPlateCutsWithStabs(666,height,Matrix.Translation(9.525, 0, 0).multiply(sXform),plateCuts,pcbBounds);
    }
    plateCuts.push(new Poly([
        Vector3.TransformCoordinates(new Vector3(-switchCutDims[0], 0, -switchCutDims[1]), sXform),
        Vector3.TransformCoordinates(new Vector3(switchCutDims[0], 0, -switchCutDims[1]), sXform),
        Vector3.TransformCoordinates(new Vector3(switchCutDims[0], 0, switchCutDims[1]), sXform),
        Vector3.TransformCoordinates(new Vector3(-switchCutDims[0], 0, switchCutDims[1]), sXform)
    ]));

    // pcb footprint of a hotswap switch: x +/- 9 y +/- 6.75
    // enc: 6.75, 8,5
    let keyPCBBounds = [9,6.75];
    pcbBounds.push([
        Vector3.TransformCoordinates(new Vector3(-keyPCBBounds[0], 0, -keyPCBBounds[1]), sXform),
        Vector3.TransformCoordinates(new Vector3(keyPCBBounds[0], 0, -keyPCBBounds[1]), sXform),
        Vector3.TransformCoordinates(new Vector3(keyPCBBounds[0], 0, keyPCBBounds[1]), sXform),
        Vector3.TransformCoordinates(new Vector3(-keyPCBBounds[0], 0, keyPCBBounds[1]), sXform)
    ]);

    let span = width;
    if(height >= 1.75) {
        span = height;
        sXform = Matrix.RotationY(Math.PI / 2.0).multiply(sXform);
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
        else if(span == 666) {
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

        let stabXforms = [Matrix.Translation(-stabOffsetXL, 0, -2).multiply(sXform),
                          Matrix.Translation( stabOffsetXR, 0, -2).multiply(sXform)];
        let stabCut = [new Vector3(-stabCutDims[0], 0, -stabCutDims[1]),
                       new Vector3(stabCutDims[0], 0, -stabCutDims[1]),
                       new Vector3(stabCutDims[0], 0, stabCutDims[1]),
                       new Vector3(-stabCutDims[0], 0, stabCutDims[1])];

        // stab foot = 4 wide x 19 h
        let stabPCBFootDims = [3,9.5];
        let stabFoot = [new Vector3(-stabPCBFootDims[0], 0, -7),
        new Vector3(stabPCBFootDims[0], 0, -7),
        new Vector3(stabPCBFootDims[0], 0, 11),
        new Vector3(-stabPCBFootDims[0], 0, 11)];

        for(let j = 0; j < stabXforms.length; j++) {
            let xformedCut = [];
            for(let i = 0; i < stabCut.length; i++) {
                xformedCut.push(Vector3.TransformCoordinates(stabCut[i],stabXforms[j]));
            }
            plateCuts.push(new Poly(xformedCut));

            let xformedPCBBounds = [];
            for(let i = 0; i < stabFoot.length; i++) {
                xformedPCBBounds.push(Vector3.TransformCoordinates(stabFoot[i],stabXforms[j]));
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

    let kRD = globals.renderData.keys;
    // clear the renderdata (cache this later?)
    for(const [id, rd] of Object.entries(kRD)) {
        if (rd.keycap) {
            scene.removeMesh(rd.keycap);
        }
    }
    kRD = globals.renderData.keys = [];
    
    for (const [id, k] of Object.entries(bd.layout.keys)) {
        // console.log(k);

        if (!kRD[id]) {
            kRD[id] = { id:id,
                        mins:[100000.0, 100000.0], maxs:[-100000.0, -100000.0]
                    };
        }
        let rd = kRD[id];

        let keycapDim = [(tuning.keyDims[0] + tuning.base1U[0] * (k.width - 1)) / 2,
        (tuning.keyDims[1] + tuning.base1U[1] * (k.height - 1)) / 2];

        // let uDim = [(tuning.base1U[0] + tuning.base1U[0] * (k.width - 1)) / 2,
        // (tuning.base1U[1] + tuning.base1U[1] * (k.height - 1)) / 2];

        let kPos = [k.x * tuning.base1U[0] + keycapDim[0],
                  -(k.y * tuning.base1U[1] + keycapDim[1])]
        let kPosition = new Vector3(kPos[0], 0, kPos[1]);
        let kXform = Matrix.Identity();
        kXform = kXform.multiply(Matrix.Translation(kPos[0], 0, kPos[1]));
        if (k.rotation_angle != 0) {
            kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
            kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
            kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
        }
        let keyOutlines = [new Poly([
            Vector3.TransformCoordinates(new Vector3(-keycapDim[0], 0, -keycapDim[1]), kXform),
            Vector3.TransformCoordinates(new Vector3(keycapDim[0], 0, -keycapDim[1]), kXform),
            Vector3.TransformCoordinates(new Vector3(keycapDim[0], 0, keycapDim[1]), kXform),
            Vector3.TransformCoordinates(new Vector3(-keycapDim[0], 0, keycapDim[1]), kXform)
        ])];

        rd.bezelHoles = []
        const bezelHole = new Poly([
            Vector3.TransformCoordinates(new Vector3(-keycapDim[0] - tuning.bezelGap, 0, -keycapDim[1] - tuning.bezelGap), kXform),
            Vector3.TransformCoordinates(new Vector3(keycapDim[0] + tuning.bezelGap, 0, -keycapDim[1] - tuning.bezelGap), kXform),
            Vector3.TransformCoordinates(new Vector3(keycapDim[0] + tuning.bezelGap, 0, keycapDim[1] + tuning.bezelGap), kXform),
            Vector3.TransformCoordinates(new Vector3(-keycapDim[0] - tuning.bezelGap, 0, keycapDim[1] + tuning.bezelGap), kXform)
        ]);
        rd.bezelHoles.push(bezelHole);

        if(k.width2 > 0 && k.height2 > 0 && !(k.width == k.width2 && k.height == k.height2 && k.x2 == 0 && k.y2 == 0)) {  
            let k2Dim = [(tuning.keyDims[0] + tuning.base1U[0] * (k.width2 - 1)) / 2,
                        (tuning.keyDims[1] + tuning.base1U[1] * (k.height2 - 1)) / 2];
            let k2Pos = [k.x2 * tuning.base1U[0] - keycapDim[0] + k2Dim[0],
                        -(k.y2 * tuning.base1U[1] - keycapDim[1] + k2Dim[1])];

            let k2Xform = Matrix.Translation(k2Pos[0], 0, k2Pos[1]).multiply(kXform);
            keyOutlines.push(new Poly([
                Vector3.TransformCoordinates(new Vector3(-k2Dim[0], 0, -k2Dim[1]), k2Xform),
                Vector3.TransformCoordinates(new Vector3(k2Dim[0], 0, -k2Dim[1]), k2Xform),
                Vector3.TransformCoordinates(new Vector3(k2Dim[0], 0, k2Dim[1]), k2Xform),
                Vector3.TransformCoordinates(new Vector3(-k2Dim[0], 0, k2Dim[1]), k2Xform)
            ]));
            keyOutlines[0].overlappingPolys[keyOutlines[1].id] = keyOutlines[1];
            keyOutlines[1].overlappingPolys[keyOutlines[0].id] = keyOutlines[0];

            const bezelHole2 = new Poly([
                Vector3.TransformCoordinates(new Vector3(-k2Dim[0] - tuning.bezelGap, 0, -k2Dim[1] - tuning.bezelGap), k2Xform),
                Vector3.TransformCoordinates(new Vector3(k2Dim[0] + tuning.bezelGap, 0, -k2Dim[1] - tuning.bezelGap), k2Xform),
                Vector3.TransformCoordinates(new Vector3(k2Dim[0] + tuning.bezelGap, 0, k2Dim[1] + tuning.bezelGap), k2Xform),
                Vector3.TransformCoordinates(new Vector3(-k2Dim[0] - tuning.bezelGap, 0, k2Dim[1] + tuning.bezelGap), k2Xform)
            ]);
            rd.bezelHoles.push(bezelHole2);
        }
        
        rd.outline = getCombinedOutlineFromPolyGroup(keyOutlines);

        rd.pcbBoxes = [];
        rd.switchCut = [];

        getPlateCutsWithStabs(k.width,k.height,kXform,rd.switchCut,rd.pcbBoxes);

        if (rd.keycap) {
            scene.removeMesh(rd.keycap);
        }
        if (tuning.keyShape) {
            rd.keycap = MeshBuilder.CreatePolygon(id, { shape: coremath.genArrayFromOutline(rd.outline,0,0.25), depth: 7, smoothingThreshold: 0.1, updatable: false }, scene);
            rd.keycap.translate(new Vector3(0, 10.5, 0), 1, Space.LOCAL);
    
            if(k.matName && globals.renderData.mats[k.matName]) {
                rd.keycap.material = globals.renderData.mats[k.matName];
            }
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
            kPs.push(new Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
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

function getCombinedOutlineFromPolyGroup(group) {
    for( const hole of group ) {
        hole.outlineLines = [];
        hole.parsedOutlineLines = {};
        let points = hole.points;
        for(let p = 0; p < points.length; p++) {
            let lStart = points[p];
            let lEnd = points[(p+1)%points.length]
            hole.outlineLines.push([lStart,lEnd]);
        }
    }

    let maxOverlapSq = Epsilon;

    let overlapFunc = (primeL, primeLen, otherLen, line, norm, distBetween, lineArray, parseArray) => {
        if(!parseArray[primeL]) {
            let primeToOtherNear = Math.max(distBetween - otherLen,0) / primeLen;
            let primeToOtherFar = distBetween / primeLen;
            if(primeToOtherNear < 1 - Epsilon && primeToOtherFar > Epsilon) {
                // kill O and replace it with any remaining line segments
                //parseArray[primeL] = true;
                if (primeToOtherNear > Epsilon) {
                    lineArray.push([line[0],line[0].add(norm.scale(distBetween - otherLen))]);
                }
                if (primeToOtherFar < 1 - Epsilon) {
                    lineArray.push([line[0].add(norm.scale(distBetween)), line[1]]);
                }
                lineArray.splice(primeL,1);
            }
        }
    }
    // clip any overlapping parallel lines against each other (cancel if they face each other)
    for( const hole of group ) {
        for( const [oId,otherHole] of Object.entries(hole.overlappingPolys) ) {
            for(let iL = hole.outlineLines.length-1; iL >= 0; iL--) {
                let lL = hole.outlineLines[iL];
                let lDir = lL[1].subtract(lL[0]);
                let lLen = lDir.length()
                if(lLen < Epsilon) continue;
                let lineNorm = lDir.normalizeFromLength(lLen);

                for( let jL = otherHole.outlineLines.length-1; jL >= 0; jL-- ) {
                    let oL = otherHole.outlineLines[jL];
                    let oDir = oL[1].subtract(oL[0]);
                    let oLen = oDir.length();
                    if(oLen < Epsilon ) continue;
                    let oLNorm = oDir.normalizeFromLength(oLen);
                    let lineDot = Vector3.Dot(oLNorm,lineNorm)
                    if( Math.abs(lineDot) > 1-Epsilon) {  //parallel
                        let diff = lL[0].subtract(oL[0]);
                        if(diff.lengthSquared() < Epsilon) {
                            let d2 = lL[0].subtract(oL[1]);
                            let d2ls = d2.lengthSquared();
                            if(d2ls< Epsilon || d2ls > lLen*lLen) {
                                hole.outlineLines.splice(iL,1);
                                break;
                            } else {
                                lL[0] = oL[1];
                                break;
                            }
                        }
                        let dd = Vector3.Dot(diff, oLNorm);
                        let projPoint = oL[0].add(oLNorm.scale(dd))
                        if( projPoint.subtract(lL[0]).lengthSquared() < maxOverlapSq) {
                            // check to see if these two are facing away from each other
                            if(lineDot < Epsilon-1) {
                                // at this point, dd is the distance between the two starting points (which are facing each other) 
                                // erase the overlapping portion of each line
                                // O ------------> olen
                                //      llen <--------- L
                                // O <----------------> dd
                                overlapFunc(jL,oLen,lLen,oL,oLNorm,dd,otherHole.outlineLines,otherHole.parsedOutlineLines);
                                overlapFunc(iL,lLen,oLen,lL,lineNorm,dd,hole.outlineLines,hole.parsedOutlineLines);
                            }
                            else if( lineDot > 1-Epsilon ) {
                                if( dd > Epsilon ) {
                                    // O -------->
                                    //        L ---------->
                                    // O <---> dd
                                    // consume L
                                    let overlapDist = oLen - dd;
                                    if(!hole.parsedOutlineLines[iL]) {
                                        if(overlapDist > Epsilon) {
                                            // console.log(`trimming A ${hole.id} ${iL} vs ${oId} ${jL} len ${lLen} ov ${overlapDist}`)
                                            if(lLen - overlapDist < Epsilon)
                                            {
                                                // console.log(`SPLICE`);
                                                hole.outlineLines.splice(iL,1);
                                                break;
                                            }
                                            // hole.parsedOutlineLines[iL] = true;
                                            // hole.outlineLines.push([lL[0].add(lineNorm.scale(overlapDist)),lL[1]]);
                                            lL[0] = lL[0].add(lineNorm.scale(overlapDist));
                                        }
                                    }
                                }
                                if( dd < Epsilon ) {
                                    // L -------->
                                    //        O ---------->
                                    // L <---> -dd
                                    // consume L
                                    let d = -dd;
                                    if(!hole.parsedOutlineLines[iL]) {
                                        if(d < lLen - Epsilon) {
                                            // console.log(`trimming B ${hole.id} ${iL} vs ${oId} ${jL} d ${d}`)
                                            if(d < Epsilon)
                                            {
                                                // console.log(`SPLICE`);
                                                hole.outlineLines.splice(iL,1);
                                                break;
                                            }
                                            // hole.parsedOutlineLines[iL] = true;
                                            // hole.outlineLines.push([lL[0],lL[0].add(lineNorm.scale(d))]);
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

    for( const hole of group ) {
        for( const [oId,oHole] of Object.entries(hole.overlappingPolys) ) {
            for(let iL = hole.outlineLines.length - 1; iL >= 0; iL--) {
                let l = hole.outlineLines[iL];
                let lL = l[1].subtract(l[0]);
                let lNorm = new Vector3(lL.z,0,-lL.x).normalize();

                let intersections = [];
                let colinear = false;
                let oPoints = oHole.points;
                for(let iOP = 0; iOP < oPoints.length; iOP++) {
                    let segRes = coremath.segmentToSegment(l[0], l[1], lL, lNorm, oPoints[iOP], oPoints[(iOP+1)%oPoints.length]);
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

                let isStartInPoly = coremath.isPointInPoly(l[0],oPoints);
                let isEndInPoly = coremath.isPointInPoly(l[1],oPoints);

                // console.log(`${rd.id} line ${iL} with ${otherRD.id} startIn ${isStartInPoly} end ${isEndInPoly} ${intersections.length}`);
                if(isStartInPoly && isEndInPoly && intersections.length <= 1) {
                    // both are inside the poly, just remove the line
                    // console.log(`removing line ${iL} from ${rd.id}`);
                    hole.outlineLines.splice(iL, 1);
                }
                else if(intersections.length == 1) {
                    // console.log(`splitting (one intersection) line ${iL} from ${rd.id}`);
                    // console.log(`start ${isStartInPoly} end ${isEndInPoly}`);
                    if(isStartInPoly) {
                        l[0] = intersections[0];
                    } else {
                        l[1] = intersections[0];
                    }
                    if(l[1].subtract(l[0]).lengthSquared() < Epsilon) {
                        hole.outlineLines.splice(iL, 1);
                    }
                }
                else if(intersections.length > 1) {
                    // console.log(`multisplit line ${iL} from ${rd.id}`);
                    // console.log(`${rd.id} l is ${l[0]} ${l[1]}`);
                    intersections.sort((a,b) => (a.subtract(l[0]).lengthSquared() - b.subtract(l[0]).lengthSquared()))
                    let tmp = l[1];
                    l[1] = intersections[0];
                    if(l[1].subtract(l[0]).lengthSquared() < Epsilon) {
                        // console.log("skipping start length due to shortness");
                        hole.outlineLines.splice(iL, 1);
                    }
                    // console.log(`${rd.id} start is ${l[0]} ${l[1]}`);
                    for(let i = 2; i < intersections.length; i+=2) {
                        if( intersections[i-1].subtract(intersections[i]).lengthSquared() > Epsilon) {
                            hole.outlineLines.push([intersections[i-1],intersections[i]]);
                        } 
                        // console.log(`${rd.id} mid is ${intersections[i-1]} ${intersections[i]}`);
                    }
                    if(intersections.length % 2 == 0) {
                        if( intersections[intersections.length-1].subtract(tmp).lengthSquared() > Epsilon) {
                            hole.outlineLines.push([intersections[intersections.length-1],tmp]);
                            // console.log(`${rd.id} end is ${intersections[intersections.length-1]} ${tmp}`);
                        }
                    }
                }
            }
        }
    }


    // pick a line at random.  this could actually pick something on an interior island so we should probably
    // run the loop gen algorithm until all the lines are used up and then pick the polygon with the largest area
    let bestOutline = null;
    let bestOutlineLength = 0;
    while(1) {
        let nextHole = null;
        let nextLineIndex = -1;
        let invertNextLine = false;
        for( const rd of group ) {
            for(let iL = 0; iL < rd.outlineLines.length; iL++) {
                if(!rd.parsedOutlineLines[iL]) {
                    nextHole = rd;
                    nextLineIndex = iL;
                    break;
                }
            }
            if(nextLineIndex >= 0) break;
        }

        if(nextLineIndex == -1)
            break;
        
        let outline = [];
        // finally, walk through the list of available outline lines and pick the closest end point for the next line
        while(nextHole != null && nextLineIndex >= 0) {
            nextHole.parsedOutlineLines[nextLineIndex] = true;
            let prevLine = nextHole.outlineLines[nextLineIndex];
            if(invertNextLine) {
                let tmp = prevLine[0];
                prevLine[0] = prevLine[1];
                prevLine[1] = tmp;
            }
            // console.log(`key rd ${nextKeyRd.id} line idx ${nextLineIndex} s ${prevLine[0]} e ${prevLine[1]}`)
            outline.push(prevLine[0]);

            nextLineIndex = -1;
            let nextDistSq = 20.0
    
            let checkNext = (n,nRd,i) => {
                let newDistSq = prevLine[1].subtract(n[0]).lengthSquared();
                if(newDistSq < nextDistSq) {
                    nextDistSq = newDistSq;
                    nextHole = nRd;
                    nextLineIndex = i;
                    invertNextLine = false;
                }
    
                newDistSq = prevLine[1].subtract(n[1]).lengthSquared();
                if(newDistSq < nextDistSq) {
                    nextDistSq = newDistSq;
                    nextHole = nRd;
                    nextLineIndex = i;
                    invertNextLine = true;
                }
            }
            
            for(let iL = 0; iL < nextHole.outlineLines.length; iL++) {
                if(!nextHole.parsedOutlineLines[iL]) {
                    checkNext(nextHole.outlineLines[iL],nextHole,iL);
                }
            }
    
            for( const [oId,oHole] of Object.entries(nextHole.overlappingPolys) ) {
                for( let jL = 0; jL < oHole.outlineLines.length; jL++ ) {
                    if(!oHole.parsedOutlineLines[jL]) {
                        checkNext(oHole.outlineLines[jL],oHole,jL);
                    }
                }
            }
        }
        // yeah this isn't exactly correct.
        if(outline.length > bestOutlineLength) {
            bestOutline = outline;
            bestOutlineLength = outline.length;
        }
    }
    return bestOutline;
}

function findOverlappingGroups(kRD, groupName) {
    let gID = 0;
    let groups = {};

    let checkOverlap = function(poly1, poly2) {
        // see if any of the lines bisect the other rect  (since it's a rect, we know each line is actually a normal of the previous)
        let checkIntersection = (polyA, polyB) => {
            const hole = polyA.points;
            for(let iP = 0; iP < hole.length; iP++) {
                let line = hole[(iP+1)%hole.length].subtract(hole[iP]);
                let allLess = true;
                let allMore = true;
                const holeO = polyB.points;

                for(let oP = 0; oP < holeO.length; oP++) {
                    let dot = Vector3.Dot(line,holeO[oP].subtract(hole[iP]));
                    allMore &= dot > Epsilon;
                    allLess &= dot < -Epsilon;
                }

                if( allLess ) {
                    return false;
                }
            }
            return true;
        }

        let confirmedIntersection = checkIntersection(poly1,poly2);
        if(confirmedIntersection) {
            confirmedIntersection = checkIntersection(poly2,poly1);
        }

        if(confirmedIntersection) {
            poly1.overlappingPolys[poly2.id] = poly2;
            poly2.overlappingPolys[poly1.id] = poly1;
            if(poly1.overlapGroupId && poly2.overlapGroupId) {
                // merge
                // console.log(`merging kgIDs ${rd1.overlapGroupId} and ${rd2.overlapGroupId}`);
                let pKG = poly1.overlapGroupId;
                let oKG = poly2.overlapGroupId;
                for(const [otherId, oRD] of Object.entries(kRD)) {
                    for(const poly of oRD[groupName]) {
                        if(poly.overlapGroupId == oKG) {
                            poly.overlapGroupId = pKG;
                        }
                    }
                }
            }
            else if(poly1.overlapGroupId) {
                poly2.overlapGroupId = poly1.overlapGroupId;
            }
            else if(poly2.overlapGroupId) {
                poly1.overlapGroupId = poly2.overlapGroupId;
            }
            else {
                poly1.overlapGroupId = poly2.overlapGroupId = gID++;
            }
        }
    }

    for (const [id, rd] of Object.entries(kRD)) {
        for(const [ip, poly] of rd[groupName].entries()) {
            for (const [otherId, otherRD] of Object.entries(kRD)) {
                for(const [op, otherPoly] of otherRD[groupName].entries()) {
                    if(otherId == id && ip == op) {
                        continue;
                    }
                    checkOverlap(poly,otherPoly);
                }
            }
    
            if(!poly.overlapGroupId) {
                poly.overlapGroupId = gID++;
            }
        }
    }

    for (const [id, rd] of Object.entries(kRD)) {
        for(const [ip, poly] of rd[groupName].entries()) {
            // console.log(`${otherId} is in kgid: ${oRD.keyGroupId}`);
            if(!groups[poly.overlapGroupId]) {
                groups[poly.overlapGroupId] = [];
            }
            groups[poly.overlapGroupId].push(poly);
        }
    }
    return groups;
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
        globals.boardData.screwLocations.push(new Vector3(newLoc[0], 0, newLoc[1]));
    }
    // top
    for(let i = 0; i <= topScrews; i++) {
        let newLoc = [i*topScrewSpan+screwSideBuffer+bounds.mins[0]-bezelOffset,
                        bounds.maxs[1]+bezelOffset]
        globals.boardData.screwLocations.push(new Vector3(newLoc[0], 0, newLoc[1]));
    }
    // sides (minus ends)
    for(let i = 1; i < sideScrews; i++) {
        let newLoc = [ bounds.mins[0]-bezelOffset,
                        i*sideScrewSpan + screwSideBuffer + bounds.mins[1] - bezelOffset ]
        globals.boardData.screwLocations.push(new Vector3(newLoc[0], 0, newLoc[1]));
    }
    for(let i = 1; i < sideScrews; i++) {
        let newLoc = [ bounds.maxs[0]+bezelOffset,
                        i*sideScrewSpan + screwSideBuffer + bounds.mins[1] - bezelOffset ]
        globals.boardData.screwLocations.push(new Vector3(newLoc[0], 0, newLoc[1]));
    }

    for(const loc of globals.boardData.screwLocations) {
        globals.renderData.screwData.push(new coremath.Circle(loc,tuning.screwHoleThruRadius));
    }
}

let layerDefs = {
    "bottom":{num:1,height:3,offset:-7.5,stackOrder:-2,visFilter:"drawCase",shape:"caseFrame",holes:["screwHoles"],mat:"case"},
    "pcbMesh":{num:1,height:1.6,offset:-5,stackOrder:null,visFilter:"drawPCB",shape:"pcbOutline",holes:[],mat:"fr4"},
    "bezel":{num:1,height:7.8,offset:7.8,stackOrder:1,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel","screwHoles"],mat:"case"},
    "plate":{num:1,height:1.5,offset:0,stackOrder:0,visFilter:"drawPlate",shape:"caseFrame",holes:["screwHoles","switchCuts"],mat:"plate"},
    "edge":{num:1,height:9,offset:-1.5,stackOrder:-1,visFilter:"drawCase",shape:"caseFrame",holes:["screwHoles","cavityInnerEdge"],mat:"case"}
}

export function refreshCase() {
    const scene = globals.scene;
    const bd = globals.boardData;
    const kRD = globals.renderData.keys;
    const mats = globals.renderData.mats;

    let cRD = globals.renderData.case;
    
    for(const [layerName, layerDef] of Object.entries(layerDefs)) {
        if (cRD.layers[layerName] && cRD.layers[layerName].mesh) {
            console.log("removing layer "+layerName);
            scene.removeMesh(cRD.layers[layerName].mesh);
        }
    }
    
    cRD.layers = {};

    if(Object.keys(bd.layout.keys).length < 1) {
        return;
    }

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
                kPs.push(new Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
            }
            bd.outline = coremath.convexHull2d(kPs);
        }
    }
    else
    {
        let pcbBounds = bd.pcbBounds;
        let bounds = bd.layout.bounds;
        bd.outline = [
            new Vector3(Math.min(bounds.mins[0],pcbBounds.mins[0]), 0, Math.min(bounds.mins[1],pcbBounds.mins[1])),
            new Vector3(Math.max(bounds.maxs[0],pcbBounds.maxs[0]), 0, Math.min(bounds.mins[1],pcbBounds.mins[1])),
            new Vector3(Math.max(bounds.maxs[0],pcbBounds.maxs[0]), 0, Math.max(bounds.maxs[1],pcbBounds.maxs[1])),
            new Vector3(Math.min(bounds.mins[0],pcbBounds.mins[0]), 0, Math.max(bounds.maxs[1],pcbBounds.maxs[1]))
        ];
    }


    let vectorGeo = {};
    let tesselatedGeo = {};
    let cavityInnerEdgeVec = 
    vectorGeo["cavityInnerEdge"] = [coremath.offsetAndFilletOutline(bd.outline, tuning.bezelGap, tuning.bezelCornerFillet, false)];
    tesselatedGeo["cavityInnerEdge"] = cavityInnerEdgeVec.map((a) => coremath.genPointsFromVectorPath(a,8));
    vectorGeo["caseFrame"] = coremath.offsetAndFilletOutline(bd.outline, tuning.bezelGap + tuning.bezelThickness, tuning.caseCornerFillet, false);
    tesselatedGeo["caseFrame"] = coremath.genPointsFromVectorPath(vectorGeo["caseFrame"],8);

    addScrewHoles();

    vectorGeo["screwHoles"] = globals.renderData.screwData;
    tesselatedGeo["screwHoles"] = vectorGeo["screwHoles"].map((a) => coremath.genArrayForCircle(a,0,19));

    vectorGeo["bezel"] = []
    tesselatedGeo["bezel"] = [];
    

    let keyGroups = findOverlappingGroups(kRD, "bezelHoles");

    // let dbglines = [];
    for(const [kgId, KG] of Object.entries(keyGroups)) {
        let outline = getCombinedOutlineFromPolyGroup(KG, "bezelHoles");

        let bezelOutlineVec = coremath.offsetAndFilletOutline(outline, 0.0, tuning.bezelCornerFillet, false);
        vectorGeo["bezel"].push(bezelOutlineVec);
        tesselatedGeo["bezel"].push(coremath.genPointsFromVectorPath(bezelOutlineVec));
        
        // for( const poly of KG ) {
        //     for(let iL = 0; iL < poly.outlineLines.length; iL++) {
        //         dbglines.push(poly.outlineLines[iL])
        //     }
        // } 
        // for(let i = 0; i < outline.length; i++) {
        //     dbglines.push([outline[i], outline[(i+1)%outline.length]]);
        // }
    }

    // if( globals.lineSystem ) {
    //     globals.scene.removeMesh(globals.lineSystem)
    // }
    // globals.lineSystem = MeshBuilder.CreateLineSystem("lineSystem", {lines: dbglines}, globals.scene);

    let plateGroups = findOverlappingGroups(kRD, "switchCut");
    vectorGeo["switchCuts"] = [];
    tesselatedGeo["switchCuts"] = [];
    for(const [gId, G] of Object.entries(plateGroups)) {
        let outline = getCombinedOutlineFromPolyGroup(G, "switchCut");
        let switchOutlineVec = coremath.offsetAndFilletOutline(outline, 0.0, 0.5, false);
        vectorGeo["switchCuts"].push(switchOutlineVec);
        tesselatedGeo["switchCuts"].push(coremath.genPointsFromVectorPath(switchOutlineVec));
    }

    vectorGeo["pcbOutline"] = coremath.offsetAndFilletOutline(bd.pcbOutline, 0.0, 2.0, false);
    tesselatedGeo["pcbOutline"] = coremath.genPointsFromVectorPath(vectorGeo["pcbOutline"]);

    for(const [layerName, layerDef] of Object.entries(layerDefs)) {
        if( tuning[layerDef.visFilter] ) {
            cRD.layers[layerName] = {outlines:[vectorGeo[layerDef.shape]]};
            const polyShape = tesselatedGeo[layerDef.shape];
            let polyHoles = [];//[...screwHoles,...bezelOutlines];
            for(const holeLayer of layerDef.holes) {
                if(vectorGeo[holeLayer] != null) {
                    cRD.layers[layerName].outlines = cRD.layers[layerName].outlines.concat(vectorGeo[holeLayer]);
                }
                if(tesselatedGeo[holeLayer] != null) {
                    polyHoles = polyHoles.concat(tesselatedGeo[holeLayer]);
                }
            }
            console.log("adding layer "+layerName);
            cRD.layers[layerName].mesh = MeshBuilder.CreatePolygon(layerName, { shape: polyShape, depth:layerDef.height, smoothingThreshold: 0.1, holes:polyHoles }, scene);
            cRD.layers[layerName].mesh.translate(new Vector3(0, layerDef.offset, 0), 1, Space.LOCAL);
            cRD.layers[layerName].mesh.material = mats[layerDef.mat];
        }
    }
}

export function refreshKeyboard() {
    refreshLayout();

    refreshCase();
}

export function loadKeyboard(data) {
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
            gfx.createKeyMaterial(k.color,Color3.FromHexString(k.color));
        }
        k.matName = k.color;
        
        bd.layout.keys[k.id] = k;
    }
    globals.boardData = bd;
    
    gfx.createMaterials();
    refreshKeyboard();
    gfx.snapCamera("angle");
}
