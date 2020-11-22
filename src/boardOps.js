import {globals} from './globals.js'
import {tuning} from './tuning.js'
import * as coremath from './coremath.js'
import * as gfx from './gfx.js'

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

        let switchCutDims = [tuning.switchCutout[0]*0.5, tuning.switchCutout[1]*0.5];
        rd.switchCut = [
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-switchCutDims[0], 0, -switchCutDims[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(switchCutDims[0], 0, -switchCutDims[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(switchCutDims[0], 0, switchCutDims[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-switchCutDims[0], 0, switchCutDims[1]), kXform)
        ];

        if (rd.keycap) {
            scene.removeMesh(rd.keycap);
        }
        if (tuning.keyShape) {
            rd.keycap = BABYLON.MeshBuilder.CreatePolygon(id, { shape: rd.outline, depth: 7, updatable: false }, scene);
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

        for( const [oId,otherRD] of Object.entries(rd.overlappingKeys) ) {
            for(let iL = rd.outlineLines.length - 1; iL >= 0; iL--) {
                let l = rd.outlineLines[iL];
                let lL = l[1].subtract(l[0]);
                let lNorm = new BABYLON.Vector3(lL.z,0,-lL.x).normalize();
                let isStartInPoly = coremath.isPointInPoly(l[0],otherRD.bezelHole);
                let isEndInPoly = coremath.isPointInPoly(l[1],otherRD.bezelHole)
                if(isStartInPoly) {
                    if(isEndInPoly) {
                        // both are inside the poly, just remove the line
                        // console.log(`removing line ${iL} from ${rd.id}`);
                        rd.outlineLines.splice(iL, 1);
                    }
                    let minExitT = 100000.0;
                    let bestIntersection = null;
                    for(let iOP = 0; iOP < otherRD.bezelHole.length; iOP++) {
                        let intersection = coremath.rayToSegment(l[0], lL, lNorm, otherRD.bezelHole[iOP], otherRD.bezelHole[(iOP+1)%otherRD.bezelHole.length]);
                        if(intersection) {
                            let t = intersection.subtract(l[0]).lengthSquared();
                            if( t > BABYLON.Epsilon && t < minExitT ) {
                                minExitT = t;
                                bestIntersection = intersection;
                            }
                        }
                    }
                    if (bestIntersection) {
                        // console.log(`trimming line ${iL} from ${rd.id} to ${minExitT}`);
                        l[0] = bestIntersection;
                    }
                    // else { console.log(`FAILED TO TRIM ${iL} from ${rd.id}`); }
                }
                else if(isEndInPoly) {
                    let revLine = l[0].subtract(l[1])
                    let revNorm = new BABYLON.Vector3(revLine.z,0,-revLine.x).normalize();
                    let minExitT = 100000.0;
                    let bestIntersection = null;
                    for(let iOP = 0; iOP < otherRD.bezelHole.length; iOP++) {
                        let intersection = coremath.rayToSegment(l[1], revLine, revNorm, otherRD.bezelHole[iOP], otherRD.bezelHole[(iOP+1)%otherRD.bezelHole.length]);
                        if( intersection ) {
                            let t = intersection.subtract(l[1]).lengthSquared();
                            if( t > BABYLON.Epsilon && t < minExitT ) {
                                minExitT = t;
                                bestIntersection = intersection;
                            }
                        }
                    }
                    if (bestIntersection) {
                        // console.log(`rev trimming line ${iL} from ${rd.id} to ${minExitT}`);
                        l[1] = bestIntersection;
                    }
                    // else { console.log(`FAILED TO REV TRIM ${iL} from ${rd.id}`); }
                }
                else {
                    // else neither end is in the poly and we should do full seg->seg checks if we're worried about this
                }
            }
        }
    }
    let maxOverlapSq = tuning.bezelGap*tuning.bezelGap + BABYLON.Epsilon;

    // clip any overlapping parallel lines against each other (cancel if they face each other)
    for( const rd of KG ) {
        rd.visitedForOutline = true;
        let ilMax = rd.outlineLines.length;
        for(let iL = 0; iL < ilMax; iL++) {
            let lL = rd.outlineLines[iL];
            let lDir = lL[1].subtract(lL[0]);
            let lLen = lDir.length()
            if(lLen < BABYLON.Epsilon) continue;
            let lineNorm = lDir.normalizeFromLength(lLen);

            for( const [oId,otherRD] of Object.entries(rd.overlappingKeys) ) {
                if(otherRD.visitedForOutline) continue;

                let jLMax = otherRD.outlineLines.length;
                for( let jL = 0; jL < jLMax; jL++ ) {
                    let oL = otherRD.outlineLines[jL];
                    let oDir = oL[1].subtract(oL[0]);
                    let oLen = oDir.length();
                    if(oLen < BABYLON.Epsilon ) continue;
                    let oLNorm = oDir.normalizeFromLength(oLen);
                    // check to see if these two are facing away from each other
                    let lineDot = BABYLON.Vector3.Dot(oLNorm,lineNorm)
                    if( lineDot < BABYLON.Epsilon-1 || lineDot > 1-BABYLON.Epsilon) {
                        let diff = lL[0].subtract(oL[0]);
                        let dd = BABYLON.Vector3.Dot(diff, oLNorm);
                        let projPoint = oL[0].add(oLNorm.scale(dd))
                        if( projPoint.subtract(lL[0]).lengthSquared() < maxOverlapSq) {
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
                                            rd.parsedOutlineLines[iL] = true;
                                            rd.outlineLines.push([lL[0].add(lineNorm.scale(overlapDist)),lL[1]]);
                                        }
                                    }
                                }
                                if( dd < BABYLON.Epsilon ) {
                                    // L -------->
                                    //        O ---------->
                                    // L <---> -dd
                                    // consume L
                                    let overlapDist = -dd;
                                    if(!rd.parsedOutlineLines[iL]) {
                                        if(overlapDist < lLen - BABYLON.Epsilon) {
                                            rd.parsedOutlineLines[iL] = true;
                                            rd.outlineLines.push([lL[0],lL[0].add(lineNorm.scale(overlapDist))]);
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

        outline.push(prevLine[0]);

        parsedLines.push(prevLine);
        nextLineIndex = -1;
        let nextDistSq = 1000000.0

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


export function refreshCase() {
    const scene = globals.scene;
    const bd = globals.boardData;
    const kRD = globals.renderData.keys;
    const mats = globals.renderData.mats;

    let funFunc = (primeL, primeLen, otherLen, line, norm, distBetween, lineArray, parseArray) => {
        if(!parseArray[primeL]) {
            let primeToOtherNear = Math.max(distBetween - otherLen,0) / primeLen;
            let primeToOtherFar = distBetween / primeLen;
            if(primeToOtherNear < 1 - BABYLON.Epsilon && primeToOtherFar > BABYLON.Epsilon) {
                // kill O and replace it with any remaining line segments
                parseArray[primeL] = true;
                if (primeToOtherNear > BABYLON.Epsilon) {
                    lineArray.push([line[0],line[0].add(norm.scale(distBetween - otherLen))]);
                }
                if (primeToOtherFar < 1 - BABYLON.Epsilon) {
                    lineArray.push([line[0].add(norm.scale(distBetween)), line[1]]);
                }
            }
        }
    }

    if(bd.caseType == "convex") {
        let kPs = [];
        for( let [id,rd] of Object.entries(kRD) ) {
            for( let p of rd.outline ) {
                kPs.push(p)
            }
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
        let bounds = bd.layout.bounds;
        bd.outline = [
            new BABYLON.Vector3(bounds.mins[0], 0, bounds.mins[1]),
            new BABYLON.Vector3(bounds.maxs[0], 0, bounds.mins[1]),
            new BABYLON.Vector3(bounds.maxs[0], 0, bounds.maxs[1]),
            new BABYLON.Vector3(bounds.mins[0], 0, bounds.maxs[1])
        ];
    }

    let cRD = globals.renderData.case;

    let cavityInnerEdge = [coremath.genArrayFromOutline(bd.outline, tuning.bezelGap, tuning.bezelCornerFillet, false)];
    let caseFrame = coremath.genArrayFromOutline(bd.outline, tuning.bezelGap + tuning.bezelThickness, tuning.bezelThickness, false, 8);

    if (cRD.edge) {
        scene.removeMesh(cRD.edge);
    }
    if( tuning.drawCase ) {
        cRD.edge = BABYLON.MeshBuilder.CreatePolygon("edge", { shape: caseFrame, depth:9, holes: cavityInnerEdge, updatable: true }, scene);
        cRD.edge.translate(new BABYLON.Vector3(0, -1.5, 0), 1, BABYLON.Space.LOCAL);
        cRD.edge.material = mats["case"];
    }

    if (cRD.bottom) {
        scene.removeMesh(cRD.bottom);
    }
    if( tuning.drawCase ) {
        cRD.bottom = BABYLON.MeshBuilder.CreatePolygon("bottom", { shape: caseFrame, depth:3, updatable: true }, scene);
        cRD.bottom.translate(new BABYLON.Vector3(0, -9-1.5, 0), 1, BABYLON.Space.LOCAL);
        cRD.bottom.material = mats["case"];
    }


    let keyGroups = {};
    let bezelOutlines = [];
    for(const [otherId, oRD] of Object.entries(kRD)) {
        // console.log(`kgid: ${oRD.keyGroupId}`);
        if(!keyGroups[oRD.keyGroupId]) {
            keyGroups[oRD.keyGroupId] = [];
        }
        keyGroups[oRD.keyGroupId].push(oRD);
    }

    for(const [kgId, KG] of Object.entries(keyGroups)) {
        let outline = getCombinedOutlineFromRDGroup(KG);
        bezelOutlines.push(coremath.genArrayFromOutline(outline,0.0,tuning.bezelCornerFillet,false));
    }
    
    if (cRD.bezel) {
        scene.removeMesh(cRD.bezel);
    }
    if( tuning.drawBezel ) {
        cRD.bezel = BABYLON.MeshBuilder.CreatePolygon("bezel", { shape: caseFrame, depth:7.5, holes: bezelOutlines }, scene);
        cRD.bezel.translate(new BABYLON.Vector3(0, 7.5, 0), 1, BABYLON.Space.LOCAL);
        //cRD.bezel.rotation = new BABYLON.Vector3(-Math.PI/12, 0, 0);
        cRD.bezel.material = mats["case"];
    }

    if (cRD.plate) {
        scene.removeMesh(cRD.plate);
    }

    let switchCuts = [];
    for(const [otherId, rd] of Object.entries(kRD)) {
        switchCuts.push(rd.switchCut);
    }
    if( tuning.drawPlate ) {
        cRD.plate = BABYLON.MeshBuilder.CreatePolygon("plate", { shape: caseFrame, depth:1.5, holes: switchCuts }, scene);
        //cRD.plate.translate()
        cRD.plate.material = mats["plate"];
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
            bd.caseType = "convex";
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
            gfx.snapCamera();
        });
}
