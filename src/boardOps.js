import {globals} from './globals.js';
import {tuning} from './tuning.js';
import * as coremath from './coremath.js';
import * as gfx from './gfx.js';
import {Vector3, Space, MeshBuilder, Matrix, Epsilon, Color3,
        Animation, EasingFunction, QuinticEase, TransformNode} from '@babylonjs/core'

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

function createRectPoly(w, h, xform) {
   return (new Poly([
        Vector3.TransformCoordinates(new Vector3(-w, 0, -h), xform),
        Vector3.TransformCoordinates(new Vector3(w, 0, -h), xform),
        Vector3.TransformCoordinates(new Vector3(w, 0, h), xform),
        Vector3.TransformCoordinates(new Vector3(-w, 0, h), xform)
    ]));
}

function getPlateCutsWithStabs(width,height,kXform,plateCuts,pcbBounds) {
    let switchCutDims = [tuning.switchCutout[0]*0.5, tuning.switchCutout[1]*0.5];
    let sXform = kXform;

    // wack ass cherry 6u spacebar
    if(width == 6) {
        getPlateCutsWithStabs(666,height,Matrix.Translation(9.525, 0, 0).multiply(sXform),plateCuts,pcbBounds);
    }
    plateCuts.push(createRectPoly(switchCutDims[0], switchCutDims[1], sXform));

    // pcb footprint of a hotswap switch: x +/- 9 y +/- 6.75
    // enc: 6.75, 8,5
    let keyPCBBounds = [9,6.75];
    pcbBounds.push(createRectPoly(keyPCBBounds[0], keyPCBBounds[1], sXform));

    let span = width;
    if(height >= 1.75) {
        span = height;
        sXform = Matrix.RotationY(Math.PI / 2.0).multiply(sXform);
    }

    let stabCutDims = [7*0.5,15*0.5];
    if( span >= 2 && span != 666 ) {
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
        let stabPCBXforms = [Matrix.Translation(-stabOffsetXL, 0, 0).multiply(sXform),
                             Matrix.Translation( stabOffsetXR, 0, 0).multiply(sXform)];

        // stab foot = 4 wide x 19 h
        let stabPCBFootDims = [3,9];

        for(let j = 0; j < stabXforms.length; j++) {
            plateCuts.push(createRectPoly(stabCutDims[0], stabCutDims[1], stabXforms[j]));

            pcbBounds.push(createRectPoly(stabPCBFootDims[0],stabPCBFootDims[1],stabPCBXforms[j]));
        }
    }
}

export function refreshLayout() {
    const scene = globals.scene;
    const bd = globals.boardData;
    const root = globals.renderData.rootXform;

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
                        mins:[100000.0, 100000.0], maxs:[-100000.0, -100000.0],
                        pcbBoxes:[],
                        switchCut:[],
                        bezelHoles:[]
                    };
        }
        let rd = kRD[id];

        if(k.type == "oled") {
            //oled sizing: greater than 38 x 12    20.1*2 x 14.1 ?
            let oledDim = [(38.1+tuning.bezelGap) / 2, (14.1+tuning.bezelGap) / 2];
    
            let kPos = [k.x * tuning.base1U[0] + oledDim[0],
                      -(k.y * tuning.base1U[1] + oledDim[1])]
                      
            let kXform = Matrix.Identity();
            kXform = kXform.multiply(Matrix.Translation(kPos[0], 0, kPos[1]));
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
                kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
                kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
            }
            let keyOutlines = [createRectPoly(oledDim[0], oledDim[1], kXform)];
    
            rd.bezelHoles.push(createRectPoly(oledDim[0] + tuning.bezelGap, oledDim[1] + tuning.bezelGap, kXform));
            
            rd.switchCut.push(createRectPoly(oledDim[0] + tuning.bezelGap, oledDim[1] + tuning.bezelGap, kXform));

            let keyPCBBounds = [15,6.75];
            rd.pcbBoxes.push(createRectPoly(keyPCBBounds[0], keyPCBBounds[1], kXform));

            rd.outline = getCombinedOutlineFromPolyGroup(keyOutlines);
            if (rd.keycap) {
                scene.removeMesh(rd.keycap);
            }
    
            if (tuning.keyShape) {
                rd.keycap = MeshBuilder.CreatePolygon(id, { shape: coremath.genArrayFromOutline(rd.outline,0,0.25), depth: 2, smoothingThreshold: 0.1, updatable: false }, scene);
                rd.keycap.parent = root;
                rd.keycap.translate(new Vector3(0, 4.5, 0), 1, Space.LOCAL);
        
                if(k.matName && globals.renderData.mats[k.matName]) {
                    rd.keycap.material = globals.renderData.mats[k.matName];
                }
            }
        }
        else if(k.type == "ec11") {
            let rad = k.encoder_knob_size / 2;
    
            let kPos = [(k.x+0.5) * tuning.base1U[0],
                      -((k.y+0.5) * tuning.base1U[1])]
                      
            let kXform = Matrix.Identity();
            kXform = kXform.multiply(Matrix.Translation(kPos[0], 0, kPos[1]));
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
                kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
                kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
            }
            let circCenter = Vector3.TransformCoordinates(new Vector3(0, 0, 0), kXform)
            let keyOutlines = [new Poly(coremath.genArrayForCircle(new coremath.Circle(circCenter, rad), 0, 19))];
    
            const bezelHole = new Poly(coremath.genArrayForCircle(new coremath.Circle(circCenter, rad), tuning.bezelGap, 19));
            rd.bezelHoles.push(bezelHole);
            
            let switchCutDims = [15*0.5, 15.5*0.5];
            
            rd.switchCut.push(createRectPoly(switchCutDims[0], switchCutDims[1], kXform));
            let keyPCBBounds = [15/2,12/2];
            rd.pcbBoxes.push(createRectPoly(keyPCBBounds[0], keyPCBBounds[1], kXform));
            
            rd.outline = getCombinedOutlineFromPolyGroup(keyOutlines);
            if (rd.keycap) {
                scene.removeMesh(rd.keycap);
            }
    
            if (tuning.keyShape) {
                rd.keycap = MeshBuilder.CreatePolygon(id, { shape: coremath.genArrayFromOutline(rd.outline,0,0), depth: 9, smoothingThreshold: 0.1, updatable: false }, scene);
                rd.keycap.parent = root;
                rd.keycap.translate(new Vector3(0, 10.5, 0), 1, Space.LOCAL);
        
                if(k.matName && globals.renderData.mats[k.matName]) {
                    rd.keycap.material = globals.renderData.mats[k.matName];
                }
            }
        }
        else { //normal keycap
            let kCenter = [(tuning.base1U[0] + tuning.base1U[0] * (k.width - 1)) / 2,
                            (tuning.base1U[1] + tuning.base1U[1] * (k.height - 1)) / 2];
            let keycapDim = [(tuning.keyDims[0] + tuning.base1U[0] * (k.width - 1)) / 2,
                            (tuning.keyDims[1] + tuning.base1U[1] * (k.height - 1)) / 2];
    
            let kPos = [k.x * tuning.base1U[0] + kCenter[0],
                      -(k.y * tuning.base1U[1] + kCenter[1])]
            let kPosition = new Vector3(kPos[0], 0, kPos[1]);
            let kXform = Matrix.Identity();
            kXform = kXform.multiply(Matrix.Translation(kPos[0], 0, kPos[1]));
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
                kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
                kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
            }

            let keyOutlines = [createRectPoly(keycapDim[0], keycapDim[1], kXform)];

            rd.bezelHoles.push(createRectPoly(keycapDim[0] + tuning.bezelGap, keycapDim[1] + tuning.bezelGap, kXform));
    
            if(k.width2 > 0 && k.height2 > 0 && !(k.width == k.width2 && k.height == k.height2 && k.x2 == 0 && k.y2 == 0)) {  
                let k2Dim = [(tuning.keyDims[0] + tuning.base1U[0] * (k.width2 - 1)) / 2,
                            (tuning.keyDims[1] + tuning.base1U[1] * (k.height2 - 1)) / 2];
                let k2Pos = [k.x2 * tuning.base1U[0] - keycapDim[0] + k2Dim[0],
                            -(k.y2 * tuning.base1U[1] - keycapDim[1] + k2Dim[1])];
    
                let k2Xform = Matrix.Translation(k2Pos[0], 0, k2Pos[1]).multiply(kXform);
                keyOutlines.push(createRectPoly(k2Dim[0], k2Dim[1], k2Xform));
                keyOutlines[0].overlappingPolys[keyOutlines[1].id] = keyOutlines[1];
                keyOutlines[1].overlappingPolys[keyOutlines[0].id] = keyOutlines[0];
    
                const bezelHole2 = createRectPoly(k2Dim[0]+ tuning.bezelGap, k2Dim[1] + tuning.bezelGap, k2Xform);
                rd.bezelHoles.push(bezelHole2);
            }
            
            
            getPlateCutsWithStabs(k.width,k.height,kXform,rd.switchCut,rd.pcbBoxes);
            
            rd.outline = getCombinedOutlineFromPolyGroup(keyOutlines);
            if (rd.keycap) {
                scene.removeMesh(rd.keycap);
            }
    
            if (tuning.keyShape) {
                rd.keycap = MeshBuilder.CreatePolygon(id, { shape: coremath.genArrayFromOutline(rd.outline,0,0.25), depth: 7, smoothingThreshold: 0.1, updatable: false }, scene);
                rd.keycap.parent = root;
                rd.keycap.translate(new Vector3(0, 10.5, 0), 1, Space.LOCAL);
        
                if(k.matName && globals.renderData.mats[k.matName]) {
                    rd.keycap.material = globals.renderData.mats[k.matName];
                }
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
            for( let p of b.points) {
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

// combine two outlines.  'subtract' assumes one is being cut from the other, the other assumes they are being added
// they must intersect (todo: fix that assumption)
function combineOutlines(primary, primaryFillets, secondary, secondaryFillets, intersectionFillet, outputFillets, subtraction) {
    let output = [];
    let walkingShape = primary;
    let walkingFillets = primaryFillets;
    let targetShape = secondary;
    let targetFillets = secondaryFillets;
    output.push(walkingShape[0]);
    outputFillets.push(primaryFillets[0])
    let curr = walkingShape[0];
    let currFillet = walkingFillets[0];
    let targ = walkingShape[1];
    let targFillet = walkingFillets[1];
    let nextWalkingIdx = 2;
    do {
        let tL = targ.subtract(curr);
        const tNorm = new Vector3(tL.z,0,-tL.x).normalize();
        let closestEntry = 1000000000.0;
        let entry = null;
        let entryNextIdx = 0;
        let closestExit = 1000000000.0;
        let exit = null;

        for(let j = 0; j < targetShape.length; j++) {
            const sLine = [targetShape[j], targetShape[(j+1)%targetShape.length]];
            const sL = sLine[1].subtract(sLine[0]);
            const sNorm = new Vector3(sL.z,0,-sL.x).normalize();
            
            let segRes = coremath.segmentToSegment(curr, targ, tL, tNorm, sLine[0], sLine[1]);
            if(segRes.type == "in_segment" && segRes.intersection) {
                let dist = segRes.intersection.subtract(curr).lengthSquared();
                if( dist > Epsilon*Epsilon) {
                    let isEntry = (Vector3.Dot(sNorm, tL) < 0) ^ subtraction;
                    if(isEntry) {
                        if( dist < closestEntry ) {
                            closestEntry = dist;
                            entry = segRes.intersection;
                            entryNextIdx = (j+1)%targetShape.length;
                        }
                    } else {
                        if( dist < closestExit ) {
                            closestExit = dist;
                            exit = segRes.intersection;
                        }
                    }
                }
            }
        }
        if( entry || exit ) {
            if(closestExit < closestEntry) {
                // console.log("started inside");
                // we're in it.  uhhhh.
                // target remains the same and push the entry point on the stack
                output.pop();
                outputFillets.pop();
                curr = exit;
                currFillet = intersectionFillet;
            } else {
                // console.log(`swapping at ${entry}`);
                curr = entry;
                currFillet = intersectionFillet;
                let tmp = targetShape;
                targetShape = walkingShape;
                walkingShape = tmp;
                tmp = targetFillets;
                targetFillets = walkingFillets;
                walkingFillets = tmp;
                nextWalkingIdx = entryNextIdx;
                targ = walkingShape[nextWalkingIdx];
                targFillet = walkingFillets[nextWalkingIdx];
                nextWalkingIdx = (nextWalkingIdx+1)%walkingShape.length;
            }
        }
        else {
            // console.log(`walking to ${targ}`);
            curr = targ;
            currFillet = targFillet;
            targ = walkingShape[nextWalkingIdx];
            targFillet = walkingFillets[nextWalkingIdx];
            nextWalkingIdx = (nextWalkingIdx+1)%walkingShape.length;
        }
        output.push(curr);
        outputFillets.push(currFillet);
        // console.log(`len ${curr.subtract(output[0]).lengthSquared()}`)
        if(output.length > 10000) {
            console.log("boolean output overflow");
            break;
        }
    }  while(curr.subtract(output[0]).lengthSquared() > Epsilon*Epsilon);
    output.pop();
    outputFillets.pop();
    return output;
}

function getCombinedOutlineFromPolyGroup(group, ignoreOverlapping) {
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

    let overlapFunc = (primeL, primeLen, otherLen, line, norm, distBetween, lineArray) => {
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

    // clip any overlapping parallel lines against each other (cancel if they face each other)
    for( const hole of group ) {
        let polyList = ignoreOverlapping?group:hole.overlappingPolys;
        for( const [oId,otherHole] of Object.entries(polyList) ) {
            if(otherHole.id == hole.id) continue;
            for(let iL = hole.outlineLines.length-1; iL >= 0; iL--) {
                let lL = hole.outlineLines[iL];
                let lDir = lL[1].subtract(lL[0]);
                let lLen = lDir.length()
                let lineNorm = lDir.normalizeFromLength(lLen);

                for( let jL = otherHole.outlineLines.length-1; jL >= 0; jL-- ) {
                    let oL = otherHole.outlineLines[jL];
                    let oDir = oL[1].subtract(oL[0]);
                    let oLen = oDir.length();
                    let oLNorm = oDir.normalizeFromLength(oLen);
                    let lineDot = Vector3.Dot(oLNorm,lineNorm)
                    if( Math.abs(lineDot) > 1-Epsilon) {  //parallel
                        let diff = lL[0].subtract(oL[0]);
                        if(diff.lengthSquared() < Epsilon && lineDot > 0) { // same(ish) start point
                            if(oLen >= lLen-Epsilon) { //same or further end point
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
                                overlapFunc(jL,oLen,lLen,oL,oLNorm,dd,otherHole.outlineLines);
                                overlapFunc(iL,lLen,oLen,lL,lineNorm,dd,hole.outlineLines);
                            }
                            else if( lineDot > 1-Epsilon ) {
                                if( dd > Epsilon ) {
                                    // O -------->
                                    //        L ---------->
                                    // O <---> dd
                                    // consume L
                                    let overlapDist = oLen - dd;
                                    if(overlapDist > Epsilon) {
                                        // console.log(`trimming A ${hole.id} ${iL} vs ${oId} ${jL} len ${lLen} ov ${overlapDist}`)
                                        if((lLen - overlapDist) < Epsilon)
                                        {
                                            // console.log(`SPLICE`);
                                            hole.outlineLines.splice(iL,1);
                                            break;
                                        }
                                        lL[0] = lL[0].add(lineNorm.scale(overlapDist));
                                    }
                                }
                                if( dd < Epsilon ) {
                                    // L -------->
                                    //        O ---------->
                                    // L <---> -dd
                                    // consume L
                                    let d = -dd;
                                    if(d < lLen - Epsilon) {
                                        // console.log(`trimming B ${hole.id} ${iL} vs ${oId} ${jL} d ${d}`)
                                        if(d < Epsilon)
                                        {
                                            // console.log(`SPLICE`);
                                            hole.outlineLines.splice(iL,1);
                                            break;
                                        }
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

    for( const hole of group ) {
        let polyList = ignoreOverlapping?group:hole.overlappingPolys;
        for( const [oId,oHole] of Object.entries(polyList) ) {
            if(hole.id == oHole.id) continue;
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
                    if(l[1].subtract(l[0]).lengthSquared() < Epsilon*Epsilon) {
                        hole.outlineLines.splice(iL, 1);
                    }
                }
                else if(intersections.length > 1) {
                    // console.log(`multisplit line ${iL} from ${rd.id}`);
                    // console.log(`${rd.id} l is ${l[0]} ${l[1]}`);
                    intersections.sort((a,b) => (a.subtract(l[0]).lengthSquared() - b.subtract(l[0]).lengthSquared()))
                    let tmp = l[1];
                    l[1] = intersections[0];
                    if(l[1].subtract(l[0]).lengthSquared() < Epsilon*Epsilon) {
                        // console.log("skipping start length due to shortness");
                        hole.outlineLines.splice(iL, 1);
                    }
                    // console.log(`${rd.id} start is ${l[0]} ${l[1]}`);
                    for(let i = 2; i < intersections.length; i+=2) {
                        if( intersections[i-1].subtract(intersections[i]).lengthSquared() > Epsilon*Epsilon) {
                            hole.outlineLines.push([intersections[i-1],intersections[i]]);
                        } 
                        // console.log(`${rd.id} mid is ${intersections[i-1]} ${intersections[i]}`);
                    }
                    if(intersections.length % 2 == 0) {
                        if( intersections[intersections.length-1].subtract(tmp).lengthSquared() > Epsilon*Epsilon) {
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
    
            let polyList = ignoreOverlapping?group:nextHole.overlappingPolys;
            for( const [oId,oHole] of Object.entries(polyList) ) {
                if(nextHole.id == oHole.id) continue;
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
        // see if any of the lines bisect the other poly
        let checkIntersection = (polyA, polyB) => {
            const hole = polyA.points;
            for(let iP = 0; iP < hole.length; iP++) {
                const line = hole[(iP+1)%hole.length].subtract(hole[iP]);
                const norm = new Vector3(line.z, 0, -line.x);
                let allLess = true;
                let allMore = true;
                const holeO = polyB.points;

                for(let oP = 0; oP < holeO.length; oP++) {
                    const oL = holeO[oP].subtract(hole[iP]);
                    let dot = Vector3.Dot(norm,oL);
                    allMore &= dot > Epsilon;
                    allLess &= dot < -Epsilon;
                }

                if( allMore ) {
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

export function addScrewHoles(outline) {
    const bezelOffset = (tuning.bezelThickness - tuning.screwBossMin * 2.0) * tuning.screwBezelBias + tuning.bezelGap + tuning.screwBossMin;
    let screwLocs = coremath.offsetOutlinePoints(outline,bezelOffset);
    globals.renderData.screwData = [];

    let minDist =  tuning.screwHoleThruRadius + tuning.screwBossMin;
    if(minDist > Epsilon) {
        let remSet = [];
        for(let i = screwLocs.length-1; i >= 0; i--) {
            let loc = screwLocs[i];
            let nexti = (i+screwLocs.length-1)%screwLocs.length;
            let nextLoc = screwLocs[nexti];
            if(loc.subtract(nextLoc).lengthSquared() < minDist*minDist) {
                if(!remSet.includes(i)) {
                    remSet.push(i);
                }
                if(!remSet.includes(nexti)) {
                    remSet.push(nexti);
                }
            } else {
                if(remSet.length) {
                    let distDiffs = {};
                    let startP = (remSet[0]+1)%screwLocs.length;
                    let startLoc = screwLocs[startP];
                    let endP = (remSet[remSet.length-1]+screwLocs.length-1)%screwLocs.length;
                    let endLoc = screwLocs[endP];
                    let minDiff = 100000000.0;
                    let bestPoint = 0;
                    for(const j of remSet) {
                        let midPoint = screwLocs[j]
                        let diff = Math.abs(startLoc.subtract(midPoint).lengthSquared()-endLoc.subtract(midPoint).lengthSquared());
                        if(diff < minDiff) {
                            minDiff = diff;
                            bestPoint = j;
                        }
                    }

                    for(const j of remSet) {
                        if(j != bestPoint) {
                            screwLocs.splice(j,1);
                        }
                    }

                    remSet.length = 0;
                }
            }
        }
    }

    const maxSpan = tuning.maxScrewSpan;
    for(let i = screwLocs.length-1; i >= 0; i--) {
        let loc = screwLocs[i];
        let nexti = (i+screwLocs.length-1)%screwLocs.length;
        let nextLoc = screwLocs[nexti];
        let nextDir = loc.subtract(nextLoc);
        let nextSpan = nextDir.length();
        if(nextSpan > maxSpan) {
            nextDir = nextDir.normalizeFromLength(nextSpan);
            const additionalScrews = Math.floor(nextSpan / maxSpan);
            const additionalSpan = nextSpan / (additionalScrews+1);
            for(let j = additionalScrews; j > 0; j--) {
                let newLoc = nextLoc.add(nextDir.scale(j*additionalSpan));
                // splice puts in front of i
                screwLocs.splice(i,0,newLoc);
            }
        }
    }

    globals.boardData.screwLocations = screwLocs;
    for(const loc of screwLocs) {
        globals.renderData.screwData.push(new coremath.Circle(loc,tuning.screwHoleThruRadius));
    }
}

let layerDefs = {
    "pcbMesh":{height:1.6,offset:-5,stackOrder:null,visFilter:"drawPCB",shape:"pcbOutline",holes:[],mat:"fr4"},
    "bezel":{height:3,offset:6,stackOrder:2,visFilter:"drawBezel",shape:"caseFrameTaper",holes:["bezel","screwHoles"],mat:"case"},
    "bezelmid":{height:3,offset:3,stackOrder:1,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel","screwHoles"],mat:"case"},
    "plate":{height:1.5,offset:0,stackOrder:0,visFilter:"drawPlate",shape:"caseFrame",holes:["screwHoles","switchCuts"],mat:"plate"},
    "edge":{height:3,offset:-1.5,stackOrder:-1,visFilter:"drawCase",shape:"caseFrameWithPortCut",holes:["screwHoles", "cavityInnerEdge"],mat:"case"},
    "edge2":{height:3,offset:-4.5,stackOrder:-2,visFilter:"drawCase",shape:"caseFrameWithPortCut",holes:["screwHoles", "cavityInnerEdge"],mat:"case"},
    "edge3":{height:3,offset:-7.5,stackOrder:-3,visFilter:"drawCase",shape:"caseFrameWithPortCut",holes:["screwHoles", "cavityInnerEdge"],mat:"case"},
    "bottom":{height:3,offset:-10.5,stackOrder:-4,visFilter:"drawCase",shape:"caseFrame",holes:["screwHoles"],mat:"case"},
    "feet":{height:9,offset:-13.5,stackOrder:-5,visFilter:"drawCase",mat:"case",customShape:(layerName, layerDef, cRD, bd) => {
        const scene = globals.scene;
        const root = globals.renderData.rootXform;
        const mats = globals.renderData.mats;
        let feet = getFeet(bd);
        cRD.layers[layerName] = {outlines:[],meshes:[]};
        for(const foot of feet) {
            cRD.layers[layerName].outlines.push(foot.points)
            let polyHoles = [];
            for(const screw of foot.screws) {
                let screwVec = new coremath.Circle(screw,tuning.screwHoleThruRadius);
                cRD.layers[layerName].outlines.push(screwVec);
                polyHoles.push(coremath.genArrayForCircle(screwVec,0,19));
            }
            // let shape = coremath.genArrayForCircle(foot,0,44);
            let shape = coremath.genPointsFromVectorPath(foot.points,8);
            const mesh = MeshBuilder.CreatePolygon(layerName, { shape: shape, depth:layerDef.height, smoothingThreshold: 0.1, holes:polyHoles }, scene);
            mesh.parent = root;
            mesh.position.y = -13.5;
            mesh.material = mats["case"];
            const meshBounds = mesh.getBoundingInfo();
            console.log(`meshBounds ${meshBounds.minimum}`)
            cRD.layers[layerName].meshes.push(mesh);
        }
    }}
}

function addUSBPort() {
    let portDim = [15 / 2,
                    tuning.bezelThickness*2];

    let portPos = globals.boardData.usbPortPos * tuning.base1U[0];

    const boardBounds = globals.boardData.layout.bounds;
    
    if(globals.boardData.usbPortCentered) {
        portPos = boardBounds.mins[0] + (boardBounds.maxs[0] - boardBounds.mins[0])/2;
    }
    
    let kPos = [portPos,
                boardBounds.maxs[1]+tuning.bezelThickness/2]
    let kXform = Matrix.Translation(kPos[0], 0, kPos[1]);
    // if (k.rotation_angle != 0) {
    //     kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
    //     kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
    //     kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
    // }
    globals.boardData.portCut = [new Poly([
        Vector3.TransformCoordinates(new Vector3(-portDim[0], 0, -portDim[1]), kXform),
        Vector3.TransformCoordinates(new Vector3(portDim[0], 0, -portDim[1]), kXform),
        Vector3.TransformCoordinates(new Vector3(portDim[0], 0, portDim[1]), kXform),
        Vector3.TransformCoordinates(new Vector3(-portDim[0], 0, portDim[1]), kXform)
    ])];
}

function getFeet(bd) {
    let screwLocs = bd.screwLocations;
    let feet = [];
    let bounds = bd.layout.bounds;
    let midZ = bounds.mins[1] + (bounds.maxs[1]-bounds.mins[1])/2;
    let maxLoc = -10000.0;
    for(const l of screwLocs) {
        if(l.z > maxLoc) {
            maxLoc = l.z;
        }
    }

    let candidates = [];
    for(const l of screwLocs) {
        if(maxLoc - l.z < 20) {
            candidates.push(l);
        }
    }

    if(candidates.length % 2) {
        candidates.splice(Math.floor(candidates.length / 2),1)
    }
    
    for(let i = 0; i < candidates.length; i+=2) {
        const p0 = candidates[i];
        const p1 = candidates[i+1];
        const offset = tuning.bezelThickness/2;
        const z_line = Math.min(p0.z, p1.z)-offset; // double offset for aesthetics
        const foot = {  points:coremath.offsetAndFilletOutline([  new Vector3(p0.x+offset,0,z_line-offset),
                                                        new Vector3(p0.x+offset,0,p0.z+offset),
                                                        new Vector3(p1.x-offset,0,p1.z+offset),
                                                        new Vector3(p1.x-offset,0,z_line-offset)],
                                            0, Math.min(tuning.caseCornerFillet,tuning.bezelThickness/2), false),
                        screws:[p0, p1]};
        feet.push(foot);
    }
    return feet;
}

export function refreshCase() {
    const scene = globals.scene;
    const bd = globals.boardData;
    const kRD = globals.renderData.keys;
    const mats = globals.renderData.mats;
    const root = globals.renderData.rootXform;

    root.rotation = new Vector3();

    let cRD = globals.renderData.case;
    
    for(const [layerName, layer] of Object.entries(cRD.layers)) {
        if(layer.mesh) {
            scene.removeMesh(layer.mesh);
        }
        if(layer.meshes) {
            for(const m of layer.meshes) {
                scene.removeMesh(m);
            }
            layer.meshes.length = 0;
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
    vectorGeo["cavityInnerEdge"] = [coremath.offsetAndFilletOutline(bd.outline, tuning.bezelGap, tuning.bezelCornerFillet, false)];
    tesselatedGeo["cavityInnerEdge"] = vectorGeo["cavityInnerEdge"].map((a) => coremath.genPointsFromVectorPath(a,8));
    vectorGeo["caseFrame"] = coremath.offsetAndFilletOutline(bd.outline, tuning.bezelGap + tuning.bezelThickness, tuning.caseCornerFillet, false);
    tesselatedGeo["caseFrame"] = coremath.genPointsFromVectorPath(vectorGeo["caseFrame"],8);
    vectorGeo["caseFrameTaper"] = coremath.offsetAndFilletOutline(bd.outline, tuning.bezelGap + tuning.bezelThickness*.9, tuning.caseCornerFillet, false);
    tesselatedGeo["caseFrameTaper"] = coremath.genPointsFromVectorPath(vectorGeo["caseFrameTaper"],8);

    addScrewHoles(bd.outline);

    vectorGeo["screwHoles"] = globals.renderData.screwData;
    tesselatedGeo["screwHoles"] = vectorGeo["screwHoles"].map((a) => coremath.genArrayForCircle(a,0,19));

    if(bd.hasUSBPort) {
        addUSBPort();
        let portCut = globals.boardData.portCut;
        let portOutline = getCombinedOutlineFromPolyGroup(portCut);
        let portFillets = (new Array(portOutline.length)).fill(0);
        let interiorShape = coremath.offsetOutlinePoints(bd.outline,tuning.bezelGap);
        let interiorFillets = (new Array(interiorShape.length)).fill(tuning.bezelCornerFillet);
        let comboFillets = [];
        let intersectionFillet = 1.0;
        let combo = combineOutlines(interiorShape,interiorFillets, portOutline, portFillets, intersectionFillet, comboFillets);
        combo.reverse();
        comboFillets.reverse();
        let outlineFillets = (new Array(bd.outline.length)).fill(tuning.caseCornerFillet);
        let exteriorShape = coremath.offsetOutlinePoints(bd.outline,tuning.bezelGap+tuning.bezelThickness);
        let finFillets = [];
        combo = combineOutlines(exteriorShape,outlineFillets,combo,comboFillets, intersectionFillet, finFillets, true);

        vectorGeo["caseFrameWithPortCut"] = coremath.offsetAndFilletOutline(combo, 0, finFillets, false);
        tesselatedGeo["caseFrameWithPortCut"] = coremath.genPointsFromVectorPath(vectorGeo["caseFrameWithPortCut"],8);
        vectorGeo["cavityInnerEdge"].length = 0;
        tesselatedGeo["cavityInnerEdge"].length = 0;
    } else {
        vectorGeo["caseFrameWithPortCut"] = vectorGeo["caseFrame"];
        tesselatedGeo["caseFrameWithPortCut"] = tesselatedGeo["caseFrame"];
    }
    
    // let dbglines = [];
    // for(let i = 0; i < combo.length; i++) {
    //     dbglines.push([combo[i], combo[(i+1)%combo.length]]);
    // }
    // if( globals.lineSystem ) {
    //     globals.scene.removeMesh(globals.lineSystem)
    // }
    // globals.lineSystem = MeshBuilder.CreateLineSystem("lineSystem", {lines: dbglines}, globals.scene);

    vectorGeo["bezel"] = []
    tesselatedGeo["bezel"] = [];
    

    let keyGroups = findOverlappingGroups(kRD, "bezelHoles");

    // let dbglines = [];
    for(const [kgId, KG] of Object.entries(keyGroups)) {
        let outline = getCombinedOutlineFromPolyGroup(KG);

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


    let plateGroups = findOverlappingGroups(kRD, "switchCut");
    vectorGeo["switchCuts"] = [];
    tesselatedGeo["switchCuts"] = [];
    for(const [gId, G] of Object.entries(plateGroups)) {
        let outline = getCombinedOutlineFromPolyGroup(G);
        let switchOutlineVec = coremath.offsetAndFilletOutline(outline, 0.0, 0.5, false);
        vectorGeo["switchCuts"].push(switchOutlineVec);
        const genPoints = coremath.genPointsFromVectorPath(switchOutlineVec);
        tesselatedGeo["switchCuts"].push(genPoints);

        // for(let i = 0; i < genPoints.length; i++) {
        //     dbglines.push([genPoints[i], genPoints[(i+1)%genPoints.length]]);
        // }


        // for( const poly of KG ) {
        //     for(let iL = 0; iL < poly.outlineLines.length; iL++) {
        //         dbglines.push(poly.outlineLines[iL])
        //     }
        // } 
    }

    // if( globals.lineSystem ) {
    //     globals.scene.removeMesh(globals.lineSystem)
    // }
    // globals.lineSystem = MeshBuilder.CreateLineSystem("lineSystem", {lines: dbglines}, globals.scene);

    vectorGeo["pcbOutline"] = coremath.offsetAndFilletOutline(bd.pcbOutline, 0.0, 2.0, false);
    tesselatedGeo["pcbOutline"] = coremath.genPointsFromVectorPath(vectorGeo["pcbOutline"]);

    for(const [layerName, layerDef] of Object.entries(layerDefs)) {
        if( tuning[layerDef.visFilter] ) {
            if(layerDef.customShape) {
                layerDef.customShape(layerName, layerDef, cRD, bd);
            }
            else {
                cRD.layers[layerName] = {outlines:[vectorGeo[layerDef.shape]],meshes:[]};
                const polyShape = tesselatedGeo[layerDef.shape];
                let polyHoles = [];
                for(const holeLayer of layerDef.holes) {
                    if(vectorGeo[holeLayer] != null) {
                        cRD.layers[layerName].outlines = cRD.layers[layerName].outlines.concat(vectorGeo[holeLayer]);
                    }
                    if(tesselatedGeo[holeLayer] != null) {
                        polyHoles = polyHoles.concat(tesselatedGeo[holeLayer]);
                    }
                }
                // console.log("adding layer "+layerName);
                const mesh = MeshBuilder.CreatePolygon(layerName, { shape: polyShape, depth:layerDef.height, smoothingThreshold: 0.1, holes:polyHoles }, scene);
                mesh.parent = root;
                mesh.position.y = layerDef.offset;
                mesh.material = mats[layerDef.mat];
                cRD.layers[layerName].meshes.push(mesh);
            }
        }
    }
    
    if(bd.hasFeet) {
        let feet = getFeet(bd);
        let footMinY = 1000000.0;
        let footMinZ = 1000000.0;
        let footDepth = 9;
        for(const footMesh of cRD.layers["feet"].meshes) {
            const meshBounds = footMesh.getBoundingInfo();
            footMinY = Math.min(footMinY,meshBounds.minimum.y);
            footMinZ = Math.min(footMinZ,meshBounds.minimum.z);
        }
        
        const baseBounds = cRD.layers["bottom"].meshes[0].getBoundingInfo();
        let baseMinY = baseBounds.minimum.y;
        let baseMinZ = baseBounds.minimum.z;

        // could use (footMinY - baseMinY) but the bounds aren't transformed. :/
        bd.typingAngle = Math.atan2(-footDepth,(footMinZ - baseMinZ));
    }
    else {
        bd.typingAngle = 0;
    }
    updateRotation();
    console.log(`typing angle: ${bd.typingAngle * 180 / Math.PI}`)
}

export function refreshKeyboard() {
    refreshLayout();

    refreshCase();
}

export function updateRotation() {
    let root = globals.renderData.rootXform;
    let targetRot = globals.boardData.typingAngle;
    if(globals.renderData.viewRotation == "flat") {
        targetRot = 0;
    }

    let easingFunction = new QuinticEase();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation("expand", root, "rotation.x", 30, 20,
                        root.rotation.x, targetRot,
                        Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
}

export function setFlatRotation() {
    globals.renderData.viewRotation = "flat";
    updateRotation();
}

export function setNaturalRotation() {
    globals.renderData.viewRotation = "natural";
    updateRotation();
}

export function expandLayers() {
    let cRDL = globals.renderData.case.layers;
    let easingFunction = new QuinticEase();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    for(const [layerName, layerDef] of Object.entries(layerDefs)) {
        if (cRDL[layerName]) {
            for(const mesh of cRDL[layerName].meshes) {
                Animation.CreateAndStartAnimation("expand", mesh, "position.y", 30, 20,
                mesh.position.y, (layerDef.offset + layerDef.stackOrder * 15),
                Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
            }
        }
    }
    setFlatRotation();

    // Animation.CreateAndStartAnimation("flip",root,"rotation."
}

export function collapseLayers() {
    let cRDL = globals.renderData.case.layers;
    let easingFunction = new QuinticEase();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    for(const [layerName, layerDef] of Object.entries(layerDefs)) {
        if (cRDL[layerName]) {
            for(const mesh of cRDL[layerName].meshes) {
                Animation.CreateAndStartAnimation("collapse", mesh, "position.y", 30, 20,
                                                mesh.position.y, layerDef.offset,
                                                Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
            }
        }
    }
}

export function loadKeyboard(data) {
    // console.log(data);
    let mats = globals.renderData.mats;

    globals.renderData.rootXform = new TransformNode("keebRoot");

    let bd = {};
    bd.meta = data.meta;
    bd.forceSymmetrical = true;
    bd.forcePCBSymmetrical = true;
    bd.hasUSBPort = true;
    bd.usbPortPos = 1.85;
    bd.usbPortCentered = true;
    bd.caseType = "convex";
    bd.case = data.case;
    bd.hasFeet = true;
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
    setNaturalRotation();
    gfx.snapCamera("angle");
}
