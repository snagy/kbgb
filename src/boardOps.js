import {globals} from './globals.js';
import {tuning} from './tuning.js';
import * as coremath from './coremath.js';
import * as gfx from './gfx.js';
import * as pcb from './pcbOps.js';
import * as keyPicking from './keyPicking.js';
import {Vector3, Vector4, MeshBuilder, Matrix, Epsilon, Color3, Color4,
        Animation, EasingFunction, QuinticEase, TransformNode, DynamicTexture} from 'babylonjs'

function getPlateCutsWithStabs(id,width,height,kXform,flipStab,plateCuts,caseIdx) {
    let switchCutDims = [tuning.switchCutout[0]*0.5, tuning.switchCutout[1]*0.5];
    let sXform = kXform;

    // wack ass cherry 6u spacebar
    if(width === 6) {
        getPlateCutsWithStabs(id,666,height,Matrix.Translation(9.525, 0, 0).multiply(sXform),flipStab,plateCuts,caseIdx);
    }
    
    if(width !== 666) {
        plateCuts.push(coremath.createRectPoly(switchCutDims[0], switchCutDims[1], sXform));

        pcb.addDevice(id, "mx_hotswap", sXform, caseIdx);
    }

    let span = width;
    if(height >= 1.75) {
        span = height;
        sXform = Matrix.RotationY(Math.PI / 2.0).multiply(sXform);
    }

    if(flipStab) {
        sXform = Matrix.RotationY(Math.PI).multiply(sXform);
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
        else if(span === 666) {
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

        let stabXforms = [Matrix.Translation(-stabOffsetXL, 0, 2).multiply(sXform),
                          Matrix.Translation( stabOffsetXR, 0, 2).multiply(sXform)];
        let stabPCBXforms = [Matrix.Translation(-stabOffsetXL, 0, 0).multiply(sXform),
                             Matrix.Translation( stabOffsetXR, 0, 0).multiply(sXform)];


        for(let j = 0; j < stabXforms.length; j++) {
            plateCuts.push(coremath.createRectPoly(stabCutDims[0], stabCutDims[1], stabXforms[j]));
            pcb.addDevice(id, "stab", stabPCBXforms[j], caseIdx);
        }
    }
}

export function refreshLayout() {
    const scene = globals.scene;
    const bd = globals.boardData;

    pcb.clearPCBs();

    if(!bd.layout) { return; }

    let kRD = globals.renderData.keys;
    // kRD = globals.renderData.keys = [];
    
    for (const [id, k] of Object.entries(bd.layout.keys)) {
        // console.log(k);

        if (!kRD[id]) {
            kRD[id] = { id:id,
                        mins:[100000.0, 100000.0], maxs:[-100000.0, -100000.0],
                        switchCut:[],
                        bezelHoles:[],
                        caseIdx:k.caseIdx||0
                    };
        }

        let rd = kRD[id];
        rd.mins = [100000.0, 100000.0];
        rd.maxs = [-100000.0, -100000.0];
        rd.switchCut.length = 0;
        rd.bezelHoles.length = 0;
        const root = globals.renderData.cases[rd.caseIdx].rootXform;

        if(k.type === "oled") {
            //oled sizing: greater than 38 x 12    20.1*2 x 14.1 ?
            let oledDim = [(38.1+tuning.bezelGap) / 2, (14.1+tuning.bezelGap) / 2];
                      
            let kXform = Matrix.Translation(k.x, 0, -k.y);
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
            }
            let keyOutlines = [coremath.createRectPoly(oledDim[0], oledDim[1], kXform)];
    
            rd.bezelHoles.push(coremath.createRectPoly(oledDim[0] + tuning.bezelGap, oledDim[1] + tuning.bezelGap, kXform));
            
            rd.switchCut.push(coremath.createRectPoly(oledDim[0] + tuning.bezelGap, oledDim[1] + tuning.bezelGap, kXform));

            pcb.addDevice(k.id, k.type, kXform, rd.caseIdx);

            rd.outline = getCombinedOutlineFromPolyGroup(keyOutlines);
            if (rd.keycap) {
                rd.keycap.parent = null;
                scene.removeMesh(rd.keycap);
                rd.keycap.dispose();
            }
            if(rd.switch) {
                rd.switch.parent = null;
                scene.removeMesh(rd.switch);
                rd.switch.dispose();
            }
    
            if (tuning.keyShape) {
                const faceUV = [];
                faceUV[0] = new Vector4(0, 0, 1, 1);
                faceUV[1] = new Vector4(0, 0, 0, 0);
                faceUV[2] = new Vector4(0, 0, 0, 0);
                rd.keycap = MeshBuilder.CreatePolygon(id, { shape: coremath.genArrayFromOutline(rd.outline,0,0.25), faceUV: faceUV, depth: 2, smoothingThreshold: 0.1, updatable: false }, scene);
                if(keyPicking.pickedKeys.indexOf(id)>=0) {
                    rd.keycap.renderOverlay = true;
                }
                rd.keycap.parent = root;
                rd.keycap.heightOffset = 4.5,
                rd.keycap.position.y = rd.keycap.heightOffset;
        
                if(k.matName && globals.renderData.mats[k.matName]) {

                    let mat = globals.renderData.mats[k.matName].clone()
                                       
                    let myDynamicTexture = new DynamicTexture(k.id, {width:128, height:32}, scene);
                    var font = "bold 24px monospace";
                    myDynamicTexture.drawText("kbgb", 32, 24, font, "white", "black", true, true);
                    //myDynamicTexture.drawText("Z", x, y, font, color, canvas, color, invertY, update);
                    mat.baseTexture = myDynamicTexture;
                    mat.roughness = 0.1;
                    mat.baseColor = new Color3(1, 1, 1);

                    rd.keycap.material = mat;//globals.renderData.mats[k.matName];
                }
            }
        }
        else if(k.type === "ec11") {
            let rad = k.encoder_knob_size / 2;

            let kXform = Matrix.Translation(k.x, 0, -k.y);
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
            }

            let circCenter = Vector3.TransformCoordinates(new Vector3(0, 0, 0), kXform)
            let keyOutlines = [new coremath.Poly(coremath.genArrayForCircle(new coremath.Circle(circCenter, rad), 0, 19))];
    
            const bezelHole = new coremath.Poly(coremath.genArrayForCircle(new coremath.Circle(circCenter, rad), tuning.bezelGap, 19));
            rd.bezelHoles.push(bezelHole);
            
            let switchCutDims = [15*0.5, 15.5*0.5];
            
            rd.switchCut.push(coremath.createRectPoly(switchCutDims[0], switchCutDims[1], kXform));
            
            pcb.addDevice(k.id, k.type, kXform, rd.caseIdx);
            
            rd.outline = getCombinedOutlineFromPolyGroup(keyOutlines);
            if (rd.keycap) {
                rd.keycap.parent = null;
                scene.removeMesh(rd.keycap);
                rd.keycap.dispose();
            }
            if(rd.switch) {
                rd.switch.parent = null;
                scene.removeMesh(rd.switch);
                rd.switch.dispose();
            }
    
            if (tuning.keyShape) {
                rd.keycap = MeshBuilder.CreatePolygon(id, { shape: coremath.genArrayFromOutline(rd.outline,0,0), depth: 9, smoothingThreshold: 0.1, updatable: false }, scene);
                if(keyPicking.pickedKeys.indexOf(id)>=0) {
                    rd.keycap.renderOverlay = true;
                }
                rd.keycap.parent = root;
                rd.keycap.heightOffset = 10.5;
                rd.keycap.position.y = rd.keycap.heightOffset;
        
                if(k.matName && globals.renderData.mats[k.matName]) {
                    rd.keycap.material = globals.renderData.mats[k.matName];
                }
            }
        }
        else { //normal keycap
            let keycapDim = [(tuning.keyDims[0] + tuning.base1U[0] * (k.width - 1)) / 2,
                            (tuning.keyDims[1] + tuning.base1U[1] * (k.height - 1)) / 2];

            let kXform = Matrix.Translation(k.x, 0, -k.y);
            if (k.rotation_angle != 0) {
                kXform = Matrix.RotationY(k.rotation_angle * Math.PI / 180.0).multiply(kXform)
            }

            let keyOutlines = [coremath.createRectPoly(keycapDim[0], keycapDim[1], kXform)];

            rd.bezelHoles.push(coremath.createRectPoly(keycapDim[0] + tuning.bezelGap, keycapDim[1] + tuning.bezelGap, kXform));
    
            if(k.width2 > 0 && k.height2 > 0 && !(k.width === k.width2 && k.height === k.height2 && k.x2 === 0 && k.y2 === 0)) {  
                let k2Dim = [(tuning.keyDims[0] + tuning.base1U[0] * (k.width2 - 1)) / 2,
                            (tuning.keyDims[1] + tuning.base1U[1] * (k.height2 - 1)) / 2];
                let k2Pos = [k.x2 * tuning.base1U[0] - keycapDim[0] + k2Dim[0],
                            -(k.y2 * tuning.base1U[1] - keycapDim[1] + k2Dim[1])];
    
                let k2Xform = Matrix.Translation(k2Pos[0], 0, k2Pos[1]).multiply(kXform);
                keyOutlines.push(coremath.createRectPoly(k2Dim[0], k2Dim[1], k2Xform));
                keyOutlines[0].overlappingPolys[keyOutlines[1].id] = keyOutlines[1];
                keyOutlines[1].overlappingPolys[keyOutlines[0].id] = keyOutlines[0];
    
                const bezelHole2 = coremath.createRectPoly(k2Dim[0]+ tuning.bezelGap, k2Dim[1] + tuning.bezelGap, k2Xform);
                rd.bezelHoles.push(bezelHole2);
            }
            
            getPlateCutsWithStabs(k.id,k.width,k.height,kXform,k.flipStab,rd.switchCut,rd.caseIdx);
            
            if(!rd.switch) {
                const switchGLTF = gfx.switchAsset.container;
                if( switchGLTF ) {
                    rd.switch = switchGLTF.instantiateModelsToScene(name => id, false).rootNodes[0];
                    rd.switch.parent = root;
                    rd.switch.setPreTransformMatrix(Matrix.RotationY(Math.PI).multiply(Matrix.Scaling(-1,1,1)));
                    for (const child of rd.switch.getChildMeshes()){
                        child.setPreTransformMatrix(Matrix.RotationY(Math.PI).multiply(Matrix.Scaling(-1,1,1)));	
                    }
                }
            }

            if(rd.switch) {
                const kcXform = kXform.multiply(Matrix.Scaling(-1,1,1));
                rd.switch.setPreTransformMatrix(kcXform);
            }

            rd.outline = getCombinedOutlineFromPolyGroup(keyOutlines);
            // if (rd.keycap) {
            //     rd.keycap.parent = null;
            //     scene.removeMesh(rd.keycap);
            //     rd.keycap.dispose();
            // }
    
            if (tuning.keyShape && (!rd.keycap || rd.keycap.width != k.width || rd.keycap.row != k.row)) {
                if (rd.keycap) {
                    rd.keycap.parent = null;
                    scene.removeMesh(rd.keycap);
                    rd.keycap.dispose();
                }

                let primeSearch = k.width;
                if(k.row === "special") {
                    primeSearch = k.special;
                }
                let searchOpts = {vertical:k.vertical, stepped: k.stepped, nub: k.nub, r:k.row};
                const keyCapGLTF = gfx.getKeycap("KAM", primeSearch, k.height, searchOpts);
                if( keyCapGLTF ) {
                    rd.keycap = keyCapGLTF.container.instantiateModelsToScene(name => id, false).rootNodes[0];

                    // if we ever switch to KRK keycaps
                    // console.log(rd.keycap.morphTargetManager);
                    // for (const child of rd.keycap.getChildMeshes()) {
                    //     console.log(child.morphTargetManager);
                    //     let mt = child.morphTargetManager.getTarget(1);	
                    //     mt.influence = 1;
                    // }
                    
                    rd.keycap.parent = root;
                    rd.keycap.preXform = keyCapGLTF.preXform;
                    rd.keycap.postXform = Matrix.Scaling(-1,1,1);
                    rd.keycap.heightOffset = 3.5;
                }
                else {
                    rd.keycap = MeshBuilder.CreatePolygon(id, { shape: coremath.genArrayFromOutline(rd.outline,0,0.25), depth: 7, smoothingThreshold: 0.1, updatable: false }, scene);
                    rd.keycap.parent = root;
                    rd.keycap.preXform = null;
                    rd.keycap.heightOffset = 10.5;
                }

                rd.keycap.width = k.width;
                rd.keycap.row = k.row;

        
                if(k.matName && globals.renderData.mats[k.matName]) {
                    let mat = globals.renderData.mats[k.matName];
                    // let mat = globals.renderData.mats[k.matName].clone()
                                       
                    // let myDynamicTexture = new DynamicTexture(k.id, {width:256, height:256}, scene);
                    // var font = "bold 44px monospace";
                    // myDynamicTexture.drawText("Z", 128, 128, font, "white", "green", true, true);
                    // //myDynamicTexture.drawText("Z", x, y, font, color, canvas, color, invertY, update);
                    // mat.baseTexture = myDynamicTexture;
                    for (const child of rd.keycap.getChildMeshes()){			
                        child.material = mat; 
                    }
                    rd.keycap.material = mat;
                }
                if(keyPicking.pickedKeys.indexOf(id)>=0) {
                    rd.keycap.renderOverlay = true;
                    for (const child of rd.keycap.getChildMeshes()){			
                        child.renderOverlay = true; 
                    }
                }
            }
            if(rd.keycap) {
                if(rd.keycap.preXform) {
                    const kcXform = rd.keycap.preXform.multiply(kXform).multiply(rd.keycap.postXform);
                    rd.keycap.setPreTransformMatrix(kcXform);
                }
                rd.keycap.position.y = rd.keycap.heightOffset;
            }
        }

        for (let p of rd.outline) {
            rd.mins[0] = Math.min(rd.mins[0], p.x);
            rd.maxs[0] = Math.max(rd.maxs[0], p.x);
            rd.mins[1] = Math.min(rd.mins[1], p.z);
            rd.maxs[1] = Math.max(rd.maxs[1], p.z);
        }
    }
    
    finalizeLayout();
    refreshPCBs();

    // refreshOutlines();
    refreshCase();
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
            if(otherHole.id === hole.id) continue;
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
            if(hole.id === oHole.id) continue;
            for(let iL = hole.outlineLines.length - 1; iL >= 0; iL--) {
                let l = hole.outlineLines[iL];
                let lL = l[1].subtract(l[0]);
                let lNorm = new Vector3(lL.z,0,-lL.x).normalize();

                let intersections = [];
                let colinear = false;
                let oPoints = oHole.points;
                for(let iOP = 0; iOP < oPoints.length; iOP++) {
                    let segRes = coremath.segmentToSegment(l[0], l[1], lL, lNorm, oPoints[iOP], oPoints[(iOP+1)%oPoints.length]);
                    if(segRes.type === "in_segment" && segRes.intersection) {
                        // console.log(`intersecting ${rd.id} line ${iL} with ${otherRD.id} line ${iOP}` )
                        intersections.push(segRes.intersection);
                    }
                    else if(segRes.type === "colinear") {
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
                else if(intersections.length === 1) {
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
                    if(intersections.length % 2 === 0) {
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
    // TODO: we could start with a point on the hull and probably be gtg
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

        if(nextLineIndex === -1)
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
                if(nextHole.id === oHole.id) continue;
                for( let jL = 0; jL < oHole.outlineLines.length; jL++ ) {
                    if(!oHole.parsedOutlineLines[jL]) {
                        checkNext(oHole.outlineLines[jL],oHole,jL);
                    }
                }
            }
        }
        // yeah this isn't exactly correct. but it mostly works
        if(outline.length > bestOutlineLength) {
            bestOutline = outline;
            bestOutlineLength = outline.length;
        }
    }
    return bestOutline;
}

function findOverlappingGroups(kRD, groupName, caseIdx) {
    let gID = 0;
    let groups = {};

    for (const [id, rd] of Object.entries(kRD)) {
        if(rd.caseIdx != caseIdx)  {
            continue;
        }
        for(const [ip, poly] of Object.entries(rd[groupName])) {
            for (const [otherId, otherRD] of Object.entries(kRD)) {
                if(otherRD.caseIdx == rd.caseIdx) {
                    for(const [op, otherPoly] of Object.entries(otherRD[groupName])) {
                        if(otherId === id && ip === op) {
                            continue;
                        }
                        if(coremath.polyPolyOverlap(poly,otherPoly)) {
                            poly.overlappingPolys[otherPoly.id] = otherPoly;
                            otherPoly.overlappingPolys[poly.id] = poly;
                            if(poly.overlapGroupId && otherPoly.overlapGroupId) {
                                // merge
                                // console.log(`merging kgIDs ${rd1.overlapGroupId} and ${rd2.overlapGroupId}`);
                                let pKG = poly.overlapGroupId;
                                let oKG = otherPoly.overlapGroupId;
                                for(const [otherId, oRD] of Object.entries(kRD)) {
                                    for(const poly of oRD[groupName]) {
                                        if(poly.overlapGroupId === oKG) {
                                            poly.overlapGroupId = pKG;
                                        }
                                    }
                                }
                            }
                            else if(poly.overlapGroupId) {
                                otherPoly.overlapGroupId = poly.overlapGroupId;
                            }
                            else if(otherPoly.overlapGroupId) {
                                poly.overlapGroupId = otherPoly.overlapGroupId;
                            }
                            else {
                                poly.overlapGroupId = otherPoly.overlapGroupId = gID++;
                            }
                        }
                    }
                }
            }
    
            if(!poly.overlapGroupId) {
                poly.overlapGroupId = gID++;
            }
        }
    }

    for (const [id, rd] of Object.entries(kRD)) {
        if(rd.caseIdx != caseIdx)  {
            continue;
        }
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

function getScrewRadius(screw,layerName) {
    const bd = globals.boardData;
    let screwTypeName = screw.screwType?screw.screwType:"m2_simple";
    let screwType = tuning.screwTypes[screwTypeName];
    let radius = screwType.screwHoleRadius;
    
    if(layerName !== screw.topLayer && layerName !== screw.bottomLayer && screwType.standoffRadius) {
        radius = screwType.standoffRadius;
    }

    return radius;
}

function getScrewStandoff() {
    const bd = globals.boardData;
    const screwType = bd.screwType?bd.screwType:"m2_simple";

    return tuning.screwTypes[screwType].screwHoleRadius;
}

function getScrewBoss() {
    const bd = globals.boardData;
    const screwType = bd.screwType?bd.screwType:"m2_simple";

    return tuning.screwTypes[screwType].minBoss;
}

function screwAddLayer(screw, layerName) {
    if(!screw.topLayer || (layerDefs[layerName].stackOrder && layerDefs[layerName].stackOrder > layerDefs[screw.topLayer].stackOrder)) {
        screw.topLayer = layerName;
    }
    if(!screw.bottomLayer || (layerDefs[layerName].stackOrder && layerDefs[layerName].stackOrder < layerDefs[screw.bottomLayer].stackOrder)) {
        screw.bottomLayer = layerName;
    }
}

export function addScrewHoles(cRD, cBD, outline, minBezelOffset, primaryLayerName, layerOutlines) {
    const defaultScrew = {};
    const screwBoss = getScrewBoss();
    const screwRadius = getScrewRadius(defaultScrew);
    const totalRad = screwRadius + screwBoss;
    const bezelOffset =  ((cBD.bezelThickness + minBezelOffset - totalRad * 2.0) * cBD.screwBezelBias + totalRad + minBezelOffset) - cBD.bezelThickness;
    // console.log(`screw offset: ${bezelOffset} thickness ${cBD.bezelThickness} boss ${totalRad} bias ${cBD.screwBezelBias}`)
    let screwLocs = coremath.offsetOutlinePoints(outline,bezelOffset);
    cBD.screws = [];

    // if(true) {
    //     return;
    // }

    let minDist = (totalRad) * 2;
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

    const maxSpan = cBD.maxScrewSpan;
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

    // find all the layers that are a 'shape'
    let shapeLayers = {};
    for(const [layerName, layerDef] of Object.entries(layerDefs)) {
        if(layerDef.shape) {
            if(!shapeLayers[layerDef.shape]) {
                shapeLayers[layerDef.shape] = [];
            }
            shapeLayers[layerDef.shape].push(layerName);
        }
    }
    
    const externalPoint = new Vector3(20,0,-3500);
    const minEdgeDistSq = (screwRadius+screwBoss)*(screwRadius+screwBoss);
    for(let i = screwLocs.length-1; i >= 0; i--) {
        let loc = screwLocs[i];
        let layers = [];
        let screw = {location:loc, shapes:[], topLayer:null, bottomLayer:null}
        
        const int = coremath.segmentToPoly(loc, externalPoint, layerOutlines[primaryLayerName]);
        if(int.numIntersections === 0 || int.numIntersections % 2 === 0 || int.nearestDistSq < minEdgeDistSq) {
            // not in the primary layer
            screwLocs.splice(i,1);
        } else {
            for(const [lId,lList] of Object.entries(shapeLayers)) {
                if(lId !== primaryLayerName) {
                    const layerOutline = layerOutlines[lId];

                    const int = coremath.segmentToPoly(loc, externalPoint, layerOutline);
                    if(int.numIntersections === 0 || int.numIntersections % 2 === 0 || int.nearestDistSq < minEdgeDistSq) {
                        continue;
                    }
                }
                screw.shapes.push(lId);

                for(const l of lList) {
                    screwAddLayer(screw,l);
                }
            }

            cBD.screws.push(screw);
        }
    }
    // screwLocs.length = 0;
}

function getFootShape(layerName, layerDef, cRD, cBD, bd) {
    const scene = globals.scene;
    const root = cRD.rootXform;
    const mats = globals.renderData.mats;
    let feet = cRD.feet;
    cRD.layers[layerName] = {name:layerName,outlines:[],meshes:[],outlineBounds:{mins:(new Vector3(10000000.0,1000000.0,1000000.0)), maxs:(new Vector3(-10000000,-1000000,-1000000))}};
    for(const foot of feet) {
        const s0 = foot.screws[0];
        const s1 = foot.screws[1];
        const p0 = (s0.location.x>=s1.location.x)?s0.location:s1.location;
        const p1 = (s0.location.x>=s1.location.x)?s1.location:s0.location;

        const offset = cBD.bezelThickness/2;
        const z_line = Math.min(p0.z, p1.z)-offset*layerDef.chin;
        const points = coremath.offsetAndFilletOutline([new Vector3(p0.x+offset,0,z_line-offset),
                                                        new Vector3(p0.x+offset,0,p0.z+offset),
                                                        new Vector3(p1.x-offset,0,p1.z+offset),
                                                        new Vector3(p1.x-offset,0,z_line-offset)],
                                            0, Math.min(cBD.caseCornerFillet,cBD.bezelThickness/2), false);
        cRD.layers[layerName].outlines.push(points)
        let polyHoles = [];
        for(const screw of foot.screws) {
            let screwVec = new coremath.Circle(screw.location,getScrewRadius(screw, layerName));
            cRD.layers[layerName].outlines.push(screwVec);
            polyHoles.push(coremath.genArrayForCircle(screwVec,0,19));
        }
        // let shape = coremath.genArrayForCircle(foot,0,44);
        let shape = coremath.genPointsFromVectorPath(points,8);
        const mesh = MeshBuilder.CreatePolygon(layerName, { shape: shape, depth:layerDef.height, smoothingThreshold: 0.1, holes:polyHoles }, scene);
        mesh.parent = root;
        mesh.position.y = layerDef.offset;
        mesh.material = mats["case"];
        const meshBounds = mesh.getBoundingInfo();
        cRD.layers[layerName].meshes.push(mesh);
        const outlineBounds = coremath.getVectorPathBounds(points);
        cRD.layers[layerName].outlineBounds.mins.minimizeInPlace(outlineBounds.mins);
        cRD.layers[layerName].outlineBounds.maxs.maximizeInPlace(outlineBounds.maxs);
    }
}

export const layerDefs = {
    "pcbMesh":{height:1.6,offset:-5.1,stackOrder:null,visFilter:"drawPCB",shape:"pcbOutline",holes:[],mat:"fr4",physicalMat:"FR4"},
    "plateFoam":{height:3.5,offset:-1.5,stackOrder:null,visFilter:"drawPlateFoam",shape:"pcbOutline",holes:["switchCuts"],mat:"foam",physicalMat:"FOAM"},
    "caseFoam":{height:3.5,offset:-7.5,stackOrder:null,visFilter:"drawCaseFoam",shape:"cavityInner",holes:[],mat:"foam",physicalMat:"FOAM"},
    "bezel":{height:3,offset:6,stackOrder:2,visFilter:"drawBezel",shape:"caseFrameTaper",holes:["bezel","screwHoles"],mat:"case",physicalMat:"acrylic"},
    "bezelmid":{height:3,offset:3,stackOrder:1,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel","screwHoles"],mat:"case",physicalMat:"acrylic"},
    "plate":{height:1.5,offset:0,stackOrder:0,visFilter:"drawPlate",shape:"caseFrame",holes:["screwHoles","switchCuts"],mat:"plate",physicalMat:"alu"},
    "edge":{height:3,offset:-1.5,stackOrder:-1,visFilter:"drawCase",shape:"caseFrameWithPortCut",holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "edge2":{height:3,offset:-4.5,stackOrder:-2,visFilter:"drawCase",shape:"caseFrameWithPortCut",holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "edge3":{height:3,offset:-7.5,stackOrder:-3,visFilter:"drawCase",shape:"caseFrameWithPortCut",holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "bottom":{height:3,offset:-10.5,stackOrder:-4,visFilter:"drawCase",shape:"caseFrame",holes:["screwHoles"],mat:"case",physicalMat:"acrylic"},
    "feet4":{height:3,offset:-13.5,stackOrder:-5,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:4.0,physicalMat:"acrylic"},
    "feet3":{height:3,offset:-16.5,stackOrder:-6,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:3.0,physicalMat:"acrylic"},
    "feet2":{height:3,offset:-19.5,stackOrder:-7,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:2.0,physicalMat:"acrylic"},
    "feet1":{height:3,offset:-22.5,stackOrder:-8,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:1.0,physicalMat:"acrylic"},
    "feet":{height:3,offset:-25.5,stackOrder:-9,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:0.0,physicalMat:"acrylic"}
};

function addUSBPort(cRD, cBD) {
    const boardBounds = cRD.bounds;
    let portDim = [15 / 2,
                   cBD.bezelThickness*2];

    let portPos = cBD.usbPortPos * tuning.base1U[0];

    
    if(cBD.usbPortCentered) {
        portPos = boardBounds.mins[0] + (boardBounds.maxs[0] - boardBounds.mins[0])/2;
    }
    
    let kPos = [portPos,
                boardBounds.maxs[1]+cBD.bezelThickness/2]
    let kXform = Matrix.Translation(kPos[0], 0, kPos[1]);
    // if (k.rotation_angle != 0) {
    //     kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
    //     kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
    //     kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
    // }
    cRD.portCut = [new coremath.Poly([
        Vector3.TransformCoordinates(new Vector3(-portDim[0], 0, -portDim[1]), kXform),
        Vector3.TransformCoordinates(new Vector3(portDim[0], 0, -portDim[1]), kXform),
        Vector3.TransformCoordinates(new Vector3(portDim[0], 0, portDim[1]), kXform),
        Vector3.TransformCoordinates(new Vector3(-portDim[0], 0, portDim[1]), kXform)
    ])];
}

function getFeet(bd, cRD, cBD) {
    let screwLocs = cBD.screws;
    let feet = [];

    if(!cBD.hasFeet) {
        cRD.feet = feet;
        return;
    }

    let bounds = cRD.bounds;
    let midZ = bounds.mins[1] + (bounds.maxs[1]-bounds.mins[1])/2;
    let maxLoc = -10000.0;
    for(const l of screwLocs) {
        maxLoc = Math.max(maxLoc, l.location.z);
    }

    let candidates = [];
    for(const l of screwLocs) {
        if(maxLoc - l.location.z < 20) {
            candidates.push(l);
        }
    }

    if(candidates.length % 2) {
        candidates.splice(Math.floor(candidates.length / 2),1)
    }
    
    for(let i = 0; i < candidates.length; i+=2) {
        const p0 = candidates[i];
        const p1 = candidates[i+1];

        const foot = { screws:[p0, p1]};
        feet.push(foot);


        for(const [layerName, layerDef] of Object.entries(layerDefs)) {
            if(layerDef.customShape === getFootShape) {
                screwAddLayer(p0,layerName);
                screwAddLayer(p1,layerName);
            }
        }
    }
    cRD.feet = feet;
}

function finalizeLayout() {
    const bd = globals.boardData;
    const kRD = globals.renderData.keys;
    globals.renderData.layoutData = {};
    for(const [caseIdx,cBD] of Object.entries(bd.cases)) {
        let keyGroups = findOverlappingGroups(kRD, "bezelHoles", caseIdx);
        let kgOutlines = {};

        if( Object.keys(keyGroups).length > 0 ) {
            for(const [kgId, KG] of Object.entries(keyGroups)) {
                let outline = getCombinedOutlineFromPolyGroup(KG);
                kgOutlines[kgId] = outline;
            }
        }
        else {
            continue;
        }


        let kPs = [];

        // for(let p of globals.pcbData[caseIdx].outline) {
        //     p.delaunayPoints = [];
        //     p.pointIdx = pid++;
        //     kPs.push(p);
        // }

        let pid = 0;
        let oid = 0;
        for(const [id,o] of Object.entries(kgOutlines)) {
            for(let i = 0; i < o.length; i++) {
                const p = o[i];
                p.delaunayPoints = [];
                p.pointIdx = pid+i;
                p.outlineIdx = oid;
                p.outlinePoints = [pid+((i+o.length-1)%o.length),pid+((i+1)%o.length)];
                kPs.push(p);
            }
            oid += 1;
            pid += o.length;
        }

        // not implemented yet
        if(false && cBD.forceSymmetrical) {
            let midPoint = (cRD.bounds.maxs[0] - cRD.bounds.mins[0]) * 0.5 + cRD.bounds.mins[0];
            let kpLen = kPs.length;
            for(let i = 0; i < kpLen; i++) {
                const kP = kPs[i];
                const p = new Vector3(midPoint - (kP.x - midPoint), kP.y, kP.z);
                p.delaunayPoints = [];
                p.pointIdx = pid++;
                kPs.push(p);
            }
        }

        const vRes = coremath.createVoronoi(kPs);

        let dbglines = [];
        let color1 = new Color4(1,0,0,1);
        let color2 = new Color4(0,1,0,1);
        let linecolors = [];

        for(const edge of vRes.edges) {
            if(edge.lSite && edge.rSite) {
                if(edge.lSite.pointIdx > kPs.length || edge.rSite.pointIdx > kPs.length ) {
                    console.log(`couldn't find points`);
                    continue;
                }

                let lP = edge.lSite;
                let rP = edge.rSite;
                let outlineEdge = false;
                const rToL = lP.subtract(rP);
                let dist = rToL.length();
                if(dist < Epsilon) {
                    continue;
                }
                if(lP.outlinePoints.includes(rP.pointIdx)) {
                    // an actual edge!
                    outlineEdge = true;
                    // continue;
                    // dbglines.push([lP,rP]);
                    // linecolors.push([color1, color1]);
                }
                else {
                    let checkExterior = function(cP, pToL) {
                        const prevToC = cP.subtract(kPs[cP.outlinePoints[0]]);
                        const cToNext = kPs[cP.outlinePoints[1]].subtract(cP);
    
                        const prevNorm = new Vector3(prevToC.z,0,-prevToC.x);
                        const nextNorm = new Vector3(cToNext.z,0,-cToNext.x);
                        // todo: figure out epsilons
                        const isAcute = Vector3.Dot(prevNorm,cToNext) > Epsilon;
    
                        const pDot = Vector3.Dot(pToL, prevNorm);
                        const nDot = Vector3.Dot(pToL, nextNorm);
    
                        return (pDot > Epsilon && (!isAcute || nDot > Epsilon)) || (pDot < Epsilon && !isAcute && nDot > Epsilon);
                    }
                    let isExterior = checkExterior(rP, rToL);
                    if(lP.outlineIdx !== rP.outlineIdx) {
                        const lToR = rP.subtract(lP);
                        isExterior = isExterior & checkExterior(lP, lToR);
                    }

                    if(!isExterior) {
                        // skip this edge
                        continue;
                    }
                    // dbglines.push([lP,rP]);
                    // linecolors.push([color2, color2]);
                }


                const centerP = lP.add(rP).scale(0.5);

                let circumscribedRadius = function(a,b,c) {
                    const v = (a+b+c)*(b+c-a)*(c+a-b)*(a+b-c);
                    const sqrt = Math.sqrt(v);
                    if(v < 0 || sqrt < Epsilon) {
                        return 10000000.0;
                    }
                    return (a*b*c) / sqrt;
                }

                const lToR = rP.subtract(lP);
                const rNorm = new Vector3(rToL.z, 0, -rToL.x).normalizeToNew();

                let minThetaL = dist/2;
                let maxThetaL = 1000000;
                let minThetaR = dist/2;
                let maxThetaR = 1000000;
                for(const p of kPs) {
                    if(p.pointIdx === lP.pointIdx || p.pointIdx === rP.pointIdx) {
                        continue;
                    }

                    const rToP = p.subtract(rP);
                    const lToP = p.subtract(lP);
                    let lPDist = lToP.length();
                    let rPDist = rToP.length();
                    if( lPDist < Epsilon || rPDist < Epsilon) {
                        continue;
                    }
                    const pToCDist = centerP.subtract(p).length();
                    let nDot = Vector3.Dot(rNorm,rToP);

                    let circleRadius = circumscribedRadius(lPDist,rPDist,dist);

                    if(pToCDist*2 <= dist) {
                        // between the two!
                        // one side or the other is ALWAYS inside, the other is a minimal value (theta needs to be bigger
                        // and as the circle grows it approaches a line between the main points, which excludes a half space)
                        if(nDot >= 0) {
                            minThetaL = Math.max(minThetaL,circleRadius);
                            maxThetaR = 0;
                        }
                        else {
                            minThetaR = Math.max(minThetaR,circleRadius);
                            maxThetaL = 0;
                        }
                    }
                    else {
                        if(nDot >= 0) {
                            maxThetaR = Math.min(maxThetaR, circleRadius);
                        }
                        else {
                            maxThetaL = Math.min(maxThetaL, circleRadius);
                        }
                    }

                    // this means that there's a point between the endpoints that will always be covered by a circle that direction.
                    if((maxThetaR - minThetaR) < Epsilon && (maxThetaL - minThetaL) < Epsilon) {
                        break;
                    }
                }

                let minTheta = minThetaL;
                let maxTheta = maxThetaL;
                // lets just always bias to the larger side
                if(maxThetaR >= maxThetaL) {
                    minTheta = minThetaR;
                    maxTheta = maxThetaR;
                }
                minTheta = Math.round(minTheta*100000)/100000;
                maxTheta = Math.round(maxTheta*100000)/100000;
                maxTheta = Math.min(maxTheta, 10000);


                if(outlineEdge) {
                    minTheta = 0;
                }
                lP.delaunayPoints.push({p:rP,dist:dist,minTheta:minTheta,maxTheta:maxTheta});
                rP.delaunayPoints.push({p:lP,dist:dist,minTheta:minTheta,maxTheta:maxTheta});
            }
        }
        const thetaValues = [];
        let outlineLinks = {};
        for(const p of kPs) {
            // console.log(`point ${p.pointIdx}`)
            // console.log(p);

            const pToPrev = p.subtract(kPs[p.outlinePoints[0]]).normalize();
            const pToNext = p.subtract(kPs[p.outlinePoints[1]]).normalize();
            const prevAngle = coremath.getRotFromNormal(pToPrev);
            const compVal =  Math.PI * 2 - prevAngle + Epsilon;
            const nextAngle = coremath.getRotFromNormal(pToNext);
            // console.log(`prevAngle ${prevAngle}`)

            for(const dP of p.delaunayPoints) {
                if(dP.maxTheta > 9000) {
                    p.isOnConvexHull = true;
                    break;
                }
            }

            p.delaunayPoints.sort((a,b) => {
                const pToA = (coremath.getRotFromNormal(p.subtract(a.p).normalize()) + compVal) % (Math.PI * 2);
                const pToB = (coremath.getRotFromNormal(p.subtract(b.p).normalize()) + compVal) % (Math.PI * 2);
                return pToA - pToB;
            });
            // ok we have a radially sorted list of lines, 0 is input and the end is output
            const joinTheta = 10;
            for(const dp of p.delaunayPoints) {
                if(p.outlineIdx !== dp.p.outlineIdx) {
                    const outlinePairName = `${Math.min(p.outlineIdx,dp.p.outlineIdx)}_${Math.max(p.outlineIdx,dp.p.outlineIdx)}`
                    if(!outlineLinks[outlinePairName]) {
                        outlineLinks[outlinePairName] = [];
                    }
                    outlineLinks[outlinePairName].push({p:p,dp:dp});
                    // dbglines.push([p,dp.p]);
                    // linecolors.push([color1, color2]);
                }

                if(!thetaValues.includes(dp.minTheta)) {
                    thetaValues.push(dp.minTheta);
                }
                if(!thetaValues.includes(dp.maxTheta)) {
                    thetaValues.push(dp.maxTheta);
                }
                // console.log(`thetas: ${dp.minTheta} ${dp.maxTheta} / dist: ${dp.dist} / rot: ${coremath.getRotFromNormal(p.subtract(dp.p).normalize())}`)
                // console.log(dp.p);
            }
            // console.log(`nextAngle ${nextAngle}`)
        }
        // this might not work, we might need an actual o -> o linkage
        for(const [ooId,ooEdges] of Object.entries(outlineLinks)) {
            ooEdges.sort((a,b) => {return a.dp.dist > b.dp.dist});
            let linkedPts = [];
            let minEdges = [];
            // console.log(ooEdges);
            const edgeDiffMax = 2;  // 2 mm
            const edgeMin = 19.05;

            // find all of the edges that are within some epsilon (the edgeDiffMax) of the shortest edge
            for(const e of ooEdges) {
                if(linkedPts.length >= 4 && e.dp.dist > (ooEdges[0].dp.dist + edgeDiffMax) && e.dp.dist > edgeMin) {
                    break;
                }
                if(!linkedPts.includes(e.p.pointIdx) && !linkedPts.includes(e.dp.p.pointIdx)) {
                    linkedPts.push(e.p.pointIdx);
                    linkedPts.push(e.dp.p.pointIdx);
                    minEdges.push(e);
                }
            }

            // out of the set of short edges, find the two that are the farthest apart (in the center, maybe do seg->seg in the future?)
            let maxDist = -1;
            let bestEdges = [];
                for(const e of minEdges) {
                    for(const oE of minEdges) {
                        if(e.p.pointIdx !== oE.p.pointIdx) {
                            const e_center = (kPs[e.p.pointIdx].add(kPs[e.dp.p.pointIdx]).scale(0.5));
                            const oE_center = (kPs[oE.p.pointIdx].add(kPs[oE.dp.p.pointIdx]).scale(0.5))
                            let dist = e_center.subtract(oE_center).lengthSquared();
                            if( dist > maxDist ) {
                                maxDist = dist;
                                bestEdges = [e,oE];
                            }
                        }
                    }
                }



            // set the linking edges in the points  (todo: this should be an array that we rotationally sort)
            let bestEdgesRev = [];
            for(const e of bestEdges) {
                if(!e.p.linkingEdges) {
                    e.p.linkingEdges = [];
                }
                e.p.linkingEdges.push(e.dp);
                const revP = kPs[e.dp.p.pointIdx];
                // dbglines.push([e.p,e.dp.p]);
                // linecolors.push([color1, color2]);
                for(const dp of revP.delaunayPoints) {
                    if(dp.p.pointIdx === e.p.pointIdx) {
                        if(!revP.linkingEdges) {
                            revP.linkingEdges = [];
                        }
                        revP.linkingEdges.push(dp);
                        break;
                    }
                }
            }
        }

        
        let convexHull = [];
        for(const p of kPs) {
            if(p.linkingEdges && p.linkingEdges.length > 1) {
                // radially sort the linked edges counter clockwise from the outline start
                const pToPrev = p.subtract(kPs[p.outlinePoints[0]]).normalize();
                const pToNext = p.subtract(kPs[p.outlinePoints[1]]).normalize();
                const prevAngle = coremath.getRotFromNormal(pToPrev);
                const compVal =  Math.PI * 2 - prevAngle + Epsilon;
                p.linkingEdges.sort((a,b) => {
                    const pToA = (coremath.getRotFromNormal(p.subtract(a.p).normalize()) + compVal) % (Math.PI * 2);
                    const pToB = (coremath.getRotFromNormal(p.subtract(b.p).normalize()) + compVal) % (Math.PI * 2);
                    return pToA - pToB;
                });
            }
        }

        // ok, find the minimal outline by starting at a known edge point and walking the outline (taking every linkingEdge)
        // until we get back to the start
        let firstP = null;
        for(const p of kPs) {
            if(p.isOnConvexHull && !p.linkingEdges) {
                firstP = p;
            }
        }
        let thisP = firstP;
        let lastP = thisP;

        let realOutline = [];
        let outlineIdx = [];
        do {
            if(thisP.isOnConvexHull) {
                convexHull.push(thisP);
            }
            realOutline.push(thisP);
            if(outlineIdx.includes(thisP.pointIdx)) {
                console.log(`oh boy loop detected`);
                // gfx.drawDbgOutline("badOutline", realOutline);
                break;
            }
            outlineIdx.push(thisP.pointIdx);
            let foundLast = lastP.pointIdx === thisP.outlinePoints[0];
            let linked = false;
            // since this is a sorted array, pick the LAST one and nuke the rest (little unsure of this)
            if(thisP.linkingEdges) {
                console.log(`n linked edges: ${thisP.linkingEdges.length}`)
                for(const edge of thisP.linkingEdges) {
                    if(lastP.pointIdx === edge.p.pointIdx) {
                        foundLast = true;
                    }
                    else if(foundLast && !outlineIdx.includes(edge.p.pointIdx)) {
                        lastP = thisP;
                        thisP = edge.p;
                        linked = true;
                    }
                }
            }
            if(!linked) {
                lastP = thisP;
                thisP = kPs[thisP.outlinePoints[1]];
            }
        } while(thisP.pointIdx != firstP.pointIdx)

        thetaValues.sort((a,b) => a - b);

        const bounds = { mins:[100000.0, 100000.0],
                         maxs:[-100000.0, -100000.0] };
        for(let oP of convexHull) {
            bounds.mins[0] = Math.min(bounds.mins[0],oP.x);
            bounds.maxs[0] = Math.max(bounds.maxs[0],oP.x);
            bounds.mins[1] = Math.min(bounds.mins[1],oP.z);
            bounds.maxs[1] = Math.max(bounds.maxs[1],oP.z);
        }

        globals.renderData.layoutData[caseIdx] = {bounds:bounds, keyGroups:keyGroups,convexHull:convexHull,kgOutlines:kgOutlines,minOutline:realOutline,kPs:kPs,thetaValues:thetaValues};
    }
}

export function refreshPCBs() {
    const bd = globals.boardData;
    for(const [caseIdx,cBD] of Object.entries(bd.cases)) {
        const cRD = globals.renderData.cases[caseIdx];
        const layoutData = globals.renderData.layoutData[caseIdx];

        if(layoutData) {
            pcb.refreshPCBOutline(layoutData.minOutline, caseIdx, cRD);
        }

        // cBD.pcbBounds = globals.pcbData[caseIdx].outlineBounds;
    }
}

export function removeCaseData() {
    const scene = globals.scene;
    const bd = globals.boardData;
    for(const [caseIdx,cBD] of Object.entries(bd.cases)) {
        if(!globals.renderData.cases[caseIdx]) {
            globals.renderData.cases.push({layers:{}});
        }
        const cRD = globals.renderData.cases[caseIdx];

        for(const [layerName, layer] of Object.entries(cRD.layers)) {
            if(layer.mesh) {
                layer.mesh.parent = null;
                scene.removeMesh(layer.mesh);
                layer.mesh.dispose();
            }
            if(layer.meshes) {
                for(const m of layer.meshes) {
                    m.parent = null;
                    scene.removeMesh(m);
                    m.dispose();
                }
                layer.meshes.length = 0;
            }
        }
        cRD.layers = {};
    }
}
export function refreshCase() {
    const scene = globals.scene;
    const bd = globals.boardData;
    const kRD = globals.renderData.keys;
    const mats = globals.renderData.mats;

    removeCaseData();

    for(const [caseIdx,cBD] of Object.entries(bd.cases)) {
        if(!globals.renderData.cases[caseIdx]) {
            globals.renderData.cases.push({layers:{}});
        }
        const cRD = globals.renderData.cases[caseIdx];

        const root = cRD.rootXform;
        root.position.x = 50*caseIdx;
    
        // if(!bd.layout || Object.keys(bd.layout.keys).length < 1) {
        //     return;
        // }
    
        const layoutData = globals.renderData.layoutData[caseIdx];
    
        if(!layoutData || Object.keys(layoutData.keyGroups).length <= 0 ) {
            continue;
        }

        let kgOutlines = layoutData.kgOutlines;
    
        let vectorGeo = {};
        let tesselatedGeo = {};
        vectorGeo["bezel"] = []
        tesselatedGeo["bezel"] = [];
        
        cRD.bounds = layoutData.bounds;

        for(const [id,outline] of Object.entries(kgOutlines)) {
            let bezelOutlineVec = coremath.offsetAndFilletOutline(outline, 0.0, tuning.bezelCornerFillet, false);
            vectorGeo["bezel"].push(bezelOutlineVec);
            tesselatedGeo["bezel"].push(coremath.genPointsFromVectorPath(bezelOutlineVec));
        }
    
        if(cBD.caseType === "concave") {
            cRD.outline = layoutData.minOutline;
            // gfx.drawDbgOutline("badOutline", cRD.outline);
        }
        else
        {
            let pcbBounds = globals.pcbData[caseIdx].outlineBounds;
            let bounds = cRD.bounds;
            const rectangularBounds = [
                new Vector3(Math.min(bounds.mins[0],pcbBounds.mins[0]), 0, Math.min(bounds.mins[1],pcbBounds.mins[1])),
                new Vector3(Math.max(bounds.maxs[0],pcbBounds.maxs[0]), 0, Math.min(bounds.mins[1],pcbBounds.mins[1])),
                new Vector3(Math.max(bounds.maxs[0],pcbBounds.maxs[0]), 0, Math.max(bounds.maxs[1],pcbBounds.maxs[1])),
                new Vector3(Math.min(bounds.mins[0],pcbBounds.mins[0]), 0, Math.max(bounds.maxs[1],pcbBounds.maxs[1]))
            ];

            let convexHull = layoutData.convexHull;
    
            if(cBD.forceSymmetrical) {
                let midPoint = (bounds.maxs[0] - bounds.mins[0]) * 0.5 + bounds.mins[0];
                let cvPs = [...convexHull];
                for(let oP of convexHull) {
                    cvPs.push(new Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
                }
                convexHull = coremath.convexHull2d(cvPs);
            }

            let dists = [1000000,1000000,1000000,1000000];
            let points = [-1, -1, -1, -1];

            for(let iP = 0; iP < convexHull.length; iP++) {
                const p = convexHull[iP];
                for(let iR = 0; iR < 4; iR++) {
                    let dist = Vector3.DistanceSquared(p,rectangularBounds[iR]);
                    if(dist < dists[iR]) {
                        points[iR] = iP;
                        dists[iR] = dist;
                    }
                }
            }
            let targets = new Array(convexHull.length);

            let nPoints = 4;
            for(let i = 0; i < nPoints; i++) {
                let iThis = points[i];
                let iNext = points[(i+1)%nPoints];
                if(iNext < iThis) {
                    iNext+=convexHull.length;
                }

                let pThis = rectangularBounds[i];
                let pNext = rectangularBounds[(i+1)%nPoints];
                // let pThis = convexHull[iThis];
                // let pNext = convexHull[iNext%convexHull.length];

                let line = pNext.subtract(pThis);
                let lineLen = line.length();
                line.normalizeFromLength(lineLen);
                let step = lineLen/(iNext-iThis);
                
                for(let j = iThis+1; j < iNext; j++) {
                    targets[j%convexHull.length] = coremath.nearestPointOnLine(pThis,line,convexHull[j%convexHull.length]);
                    // targets[j%convexHull.length] = pThis.add(line.scale((j-iThis)*step));
                }
                targets[iThis] = pThis;
            }

            cRD.outline = [...convexHull];

            for(let iP = 0; iP < convexHull.length; iP++) {
                cRD.outline[iP] = convexHull[iP].scale(cBD.bezelConcavity).add(targets[iP].scale(1.0-cBD.bezelConcavity));
            }
            // gfx.drawDbgOutline("badOutline", cRD.outline);
            // cRD.outline = convexHull;
        }

        cRD.outline = coremath.offsetAndFixOutlinePoints(cRD.outline, tuning.bezelGap + cBD.bezelThickness,null).outline;

        vectorGeo["cavityInner"] = coremath.offsetAndFilletOutline(cRD.outline, -cBD.bezelThickness, tuning.bezelCornerFillet, false);
        tesselatedGeo["cavityInner"] = coremath.genPointsFromVectorPath(vectorGeo["cavityInner"],8);

        vectorGeo["cavityInnerEdge"] = [vectorGeo["cavityInner"]];
        tesselatedGeo["cavityInnerEdge"] = [tesselatedGeo["cavityInner"]];
        vectorGeo["caseFrame"] = coremath.offsetAndFilletOutline(cRD.outline, 0, cBD.caseCornerFillet, false);
        tesselatedGeo["caseFrame"] = coremath.genPointsFromVectorPath(vectorGeo["caseFrame"],8);
        vectorGeo["caseFrameTaper"] = coremath.offsetAndFilletOutline(cRD.outline, -cBD.bezelThickness*.1, cBD.caseCornerFillet, false);
        tesselatedGeo["caseFrameTaper"] = coremath.genPointsFromVectorPath(vectorGeo["caseFrameTaper"],8);
    
        const taperOffsetMax = -cBD.bezelThickness*.1;
    
        if(cBD.hasUSBPort) {
            addUSBPort(cRD, cBD);
            let portCut = cRD.portCut;
            let portOutline = getCombinedOutlineFromPolyGroup(portCut);
            let portFillets = (new Array(portOutline.length)).fill(0);
            let interiorShape = coremath.offsetOutlinePoints(cRD.outline,-cBD.bezelThickness);
            let interiorFillets = (new Array(interiorShape.length)).fill(tuning.bezelCornerFillet);
            let intersectionFillet = 1.0;
            let combined = coremath.combineOutlines(interiorShape,interiorFillets, portOutline, portFillets, intersectionFillet);
            let combo = combined.outline;
            let comboFillets = combined.fillets;
            combo.reverse();
            comboFillets.reverse();
            let outlineFillets = (new Array(cRD.outline.length)).fill(cBD.caseCornerFillet);
            let exteriorShape = coremath.offsetOutlinePoints(cRD.outline,0.0);

            combined = coremath.combineOutlines(exteriorShape,outlineFillets,combo,comboFillets, intersectionFillet, true);
            combo = combined.outline;
            let finFillets = combined.fillets;
    
            vectorGeo["caseFrameWithPortCut"] = coremath.offsetAndFilletOutline(combo, 0, finFillets, false);
            tesselatedGeo["caseFrameWithPortCut"] = coremath.genPointsFromVectorPath(vectorGeo["caseFrameWithPortCut"],8);
            vectorGeo["cavityInnerEdge"].length = 0;
            tesselatedGeo["cavityInnerEdge"].length = 0;
        } else {
            vectorGeo["caseFrameWithPortCut"] = vectorGeo["caseFrame"];
            tesselatedGeo["caseFrameWithPortCut"] = tesselatedGeo["caseFrame"];
        }
    
        vectorGeo["pcbOutline"] = coremath.offsetAndFilletOutline(globals.pcbData[caseIdx].outline, 0.0, 2.0, false);
        tesselatedGeo["pcbOutline"] = coremath.genPointsFromVectorPath(vectorGeo["pcbOutline"]);

        addScrewHoles(cRD, cBD, cRD.outline, taperOffsetMax, "caseFrameWithPortCut", tesselatedGeo);
        getFeet(bd, cRD, cBD);

        let plateGroups = findOverlappingGroups(kRD, "switchCut", caseIdx);
        vectorGeo["switchCuts"] = [];
        tesselatedGeo["switchCuts"] = [];
        for(const [gId, G] of Object.entries(plateGroups)) {
            let outline = getCombinedOutlineFromPolyGroup(G);
            let switchOutlineVec = coremath.offsetAndFilletOutline(outline, 0.0, 0.5, false);
            vectorGeo["switchCuts"].push(switchOutlineVec);
            const genPoints = coremath.genPointsFromVectorPath(switchOutlineVec);
            tesselatedGeo["switchCuts"].push(genPoints);
        }
    
        for(const [layerName, layerDef] of Object.entries(layerDefs)) {
            // console.log(`generating layer ${layerName}`);

            if( tuning[layerDef.visFilter] ) {
                if(layerDef.customShape) {
                    layerDef.customShape(layerName, layerDef, cRD, cBD, bd);
                }
                else {
                    if(layerDef.holes.includes("screwHoles")) {
                        let screwData = [];
                        for(const screw of cBD.screws) {
                            screwData.push(new coremath.Circle(screw.location,getScrewRadius(screw, layerName)));
                        }
            
                        vectorGeo["screwHoles"] = screwData;
                        tesselatedGeo["screwHoles"] = vectorGeo["screwHoles"].map((a) => coremath.genArrayForCircle(a,0,19));
                    }

                    cRD.layers[layerName] = {name:layerName,outlines:[vectorGeo[layerDef.shape]],meshes:[]};
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
                    cRD.layers[layerName].outlineBounds = coremath.getVectorPathBounds(vectorGeo[layerDef.shape]);
                }
            }
        }
        
        if(cBD.hasFeet) {
            let footMinY = 1000000.0;
            let footMinZ = 1000000.0;
            let footDepth = 15;
            for(const footMesh of cRD.layers["feet"].meshes) {
                const meshBounds = footMesh.getBoundingInfo();
                footMinY = Math.min(footMinY,meshBounds.minimum.y);
                footMinZ = Math.min(footMinZ,meshBounds.minimum.z);
            }
            
            const baseBounds = cRD.layers["bottom"].meshes[0].getBoundingInfo();
            let baseMinY = baseBounds.minimum.y;
            let baseMinZ = baseBounds.minimum.z;
    
            // could use (footMinY - baseMinY) but the bounds aren't transformed. :/
            console.log(`foot: ${footMinZ} base: ${baseMinZ}`)
            cBD.typingAngle = Math.atan2(-footDepth,(footMinZ - baseMinZ));
        }
        else {
            cBD.typingAngle = 0;
        }
        updateRotation(cRD, cBD);
        console.log(`typing angle: ${cBD.typingAngle * 180 / Math.PI}`)
    }
}

export function setPlateMat(iBD, matName) {
    gfx.setMatFromTuning("plate",matName);
}

export function setCaseMat(iBD, matName) {
    gfx.setMatFromTuning("case",matName);
}

export function refreshKeyboard() {
    refreshLayout();
}

export function updateRotation(cRD, cBD) {
    let root = cRD.rootXform;
    let targetRot = cBD.typingAngle || 0;
    if(globals.renderData.viewRotation === "flat") {
        targetRot = 0;
    }

    let easingFunction = new QuinticEase();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    Animation.CreateAndStartAnimation("expand", root, "rotation.x", 30, 20,
                        root.rotation.x, targetRot,
                        Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
}

export function setFlatRotation(cRD, cBD) {
    cRD.viewRotation = "flat";
    updateRotation(cRD, cBD);
}

export function setFlatRotations(cRD) {
    for(const [k,cRD] of Object.entries(globals.renderData.cases)) {
        setFlatRotation(cRD, globals.boardData.cases[k]);
    }
}

export function setNaturalRotation(cRD, cBD) {
    cRD.viewRotation = "natural";
    updateRotation(cRD, cBD);
}

export function setNaturalRotations() {
    for(const [k,cRD] of Object.entries(globals.renderData.cases)) {
        setNaturalRotation(cRD, globals.boardData.cases[k]);
    }
}

export function expandLayers() {
    let easingFunction = new QuinticEase();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

    for(const [k,cRD] of Object.entries(globals.renderData.cases)) {
        let cRDL = cRD.layers;
        for(const [layerName, layerDef] of Object.entries(layerDefs)) {
            if (cRDL[layerName]) {
                for(const mesh of cRDL[layerName].meshes) {
                    Animation.CreateAndStartAnimation("expand", mesh, "position.y", 30, 20,
                    mesh.position.y, (layerDef.offset + layerDef.stackOrder * 15),
                    Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
                }
            }
        }
        setFlatRotation(cRD, globals.boardData.cases[k]);
    }
    let kRD = globals.renderData.keys;
    for(const [id, rd] of Object.entries(kRD)) {
        if (rd.keycap) {
            Animation.CreateAndStartAnimation("expand", rd.keycap, "position.y", 30, 20+Math.random()*10,
            rd.keycap.position.y, 203.5,
            Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {rd.keycap.setEnabled(false)}); 
        }

        if (rd.switch) {
            Animation.CreateAndStartAnimation("expand", rd.switch, "position.y", 30, 30+Math.random()*10,
            rd.switch.position.y, 200.0,
            Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {rd.switch.setEnabled(false)}); 
        }
    }
}

export function collapseLayers() {
    let easingFunction = new QuinticEase();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

    for(const [cID,cRD] of Object.entries(globals.renderData.cases) ) {
        let cRDL = cRD.layers;
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

    let kRD = globals.renderData.keys;
    // clear the renderdata (cache this later?)
    for(const [id, rd] of Object.entries(kRD)) {
        if (rd.keycap) {
            rd.keycap.setEnabled(true);
            Animation.CreateAndStartAnimation("expand", rd.keycap, "position.y", 30, 30+Math.random()*10,
            rd.keycap.position.y, rd.keycap.heightOffset,
            Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
        }
        if (rd.switch) {
            rd.switch.setEnabled(true);
            Animation.CreateAndStartAnimation("expand", rd.switch, "position.y", 30, 20+Math.random()*10,
            rd.switch.position.y, 0.0,
            Animation.ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
        }
    }
}

export function addKey() {
    const bd = globals.boardData;
    let kIdx = Object.keys(bd.layout.keys).length;
    while(bd.layout.keys[`key${kIdx}`]) {
        kIdx += 1;
    }
    const k = {
            "color": "#e8e7e3",
            "labels": [],
            "textColor": [],
            "textSize": [],
            "default": {
              "textColor": "#5c5c5c",
              "textSize": 7
            },
            "x": 0,
            "y": -1,
            "width": 1,
            "height": 1,
            "rotation_x": 0,
            "rotation_y": 0,
            "rotation_angle": 0,
            "decal": false,
            "ghost": false,
            "stepped": false,
            "nub": false,
            "id":`key${kIdx}`
    }
    bd.layout.keys[k.id] = k;
}

export function removeKeyRD(kId) {
    const rd = globals.renderData.keys[kId];
    if(rd) {
        if (rd.keycap) {
            rd.keycap.parent = null;
            globals.scene.removeMesh(rd.keycap);
            rd.keycap.dispose();
        }
        if(rd.switch) {
            rd.switch.parent = null;
            globals.scene.removeMesh(rd.switch);
            rd.switch.dispose();
        }
        delete globals.renderData.keys[kId];
    }
}

export function removeKey(kId) {
    removeKeyRD(kId);
    const bd = globals.boardData;
    delete bd.layout.keys[kId];
}

function clearOldBoard() {
    for(const [id, rd] of Object.entries(globals.renderData.keys)) {
        if (rd.keycap) {
            rd.keycap.parent = null;
            globals.scene.removeMesh(rd.keycap);
            rd.keycap.dispose();
        }
        if(rd.switch) {
            rd.switch.parent = null;
            globals.scene.removeMesh(rd.switch);
            rd.switch.dispose();
        }
    }
    globals.renderData.keys = {};

    for(const [k,cRD] of Object.entries(globals.renderData.cases)) {
        for(const [layerName, layer] of Object.entries(cRD.layers)) {
            if(layer.mesh) {
                layer.mesh.parent = null;
                globals.scene.removeMesh(layer.mesh);
                layer.mesh.dispose();
            }
            if(layer.meshes) {
                for(const m of layer.meshes) {
                    m.parent = null;
                    globals.scene.removeMesh(m);
                    m.dispose();
                }
                layer.meshes.length = 0;
            }
        }
    }
}

export function loadKeyboard(data) {
    // console.log(data);
    clearOldBoard();

    let mats = globals.renderData.mats;

    if(!data.kbdVersion) {
        let bd = {};
        bd.meta = data.meta;
        bd.cases = data.cases?data.cases:{};
        bd.hasFeet = true;
        bd.layout = {keys: {}};
        let kIdx = 0
        for (let k of data.keys) {
            let keyInfo = {id: "key" + kIdx++,
                            special: "standard",
                            x: k.x,
                            y: k.y,
                            caseIdx: k.caseIdx||0,
                            width: k.width,
                            height: k.height,
                            rotation_angle: k.rotation_angle,
                            nub:k.nub,
                            stepped:k.stepped,
                            type:k.type,
                            encoder_knob_size:k.encoder_knob_size
                            };

            const getCenterOffset = (t) => {
                switch(t) {
                    case "oled": {
                        // hacky dims
                        let oledDim = [(38.1+tuning.bezelGap) / 2, (14.1+tuning.bezelGap) / 2];
                        return( [k.x * tuning.base1U[0] + oledDim[0],
                                  -(k.y * tuning.base1U[1] + oledDim[1])] );
                    }
                    case "ec11": {
                        return ([(k.x+0.5) * tuning.base1U[0],
                                  -((k.y+0.5) * tuning.base1U[1])]);
                    }
                    default: {
                        const center = [(tuning.base1U[0] + tuning.base1U[0] * (k.width - 1)) / 2,
                                (tuning.base1U[1] + tuning.base1U[1] * (k.height - 1)) / 2];
                        return ([k.x * tuning.base1U[0] + center[0],
                                  -(k.y * tuning.base1U[1] + center[1])]);
                    }
                }
            }
                            
            let centerOffset = getCenterOffset(k.type);
            let kXform = Matrix.Translation(centerOffset[0], 0, centerOffset[1]);
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
                kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
                kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
            }

            let newPos = Vector3.TransformCoordinates(new Vector3(0,0,0), kXform);

            keyInfo.x = newPos.x;
            keyInfo.y = -newPos.z;

            if(!bd.cases[keyInfo.caseIdx]) {
                bd.cases[keyInfo.caseIdx]  = Object.assign({}, tuning.defaultCase);
            }

            keyInfo.matName = k.color;
    
            if( k.width === 1 && k.height > 1) {
                keyInfo.vertical = true;
            }
            
            if(!(k.width2 === k.width && k.height2 === k.height && k.x2 === 0 && k.y2 === 0)) {
                if(k.width2 === 1.5 && k.height2 === 1 && k.width === 1.25 && k.height === 2 && k.x2 === -0.25 ) {
                    keyInfo.row = "special";
                    keyInfo.special = "ISO";
                }
                else if(k.width2 === 1.75 && k.height2 === 1 && k.width === 1.25 && k.x2 === 0) {
                    // stepped is..uhhh...weird.            
                    // keyInfo.width = 1.75;
                }
                keyInfo.width2 = k.width2;
                keyInfo.height2 = k.height2;
                keyInfo.x2 = k.x2;
                keyInfo.y2 = k.y2;
            }
            
            if(!mats[keyInfo.matName]) {
                gfx.createKeyMaterial(keyInfo.matName,Color3.FromHexString(keyInfo.matName));
            }
            
            //todo: handle decals better
            if(k.decal === false && k.ghost === false) {
                bd.layout.keys[keyInfo.id] = keyInfo;
            }
        }
        bd.kbdVersion = "0.0.2";
        globals.boardData = bd;
    }
    else if(data.kbdVersion) {
        globals.boardData = data;
    }

    globals.renderData.cases = {};
    for(const [k,c] of Object.entries(globals.boardData.cases)) {
        const cRD = {layers:{}, rootXform: new TransformNode(`case${k}Root`)};
        globals.renderData.cases[k] = cRD;
        setNaturalRotation(cRD, c);
    }
    
    gfx.createMaterials();
    refreshKeyboard();
    gfx.snapCamera("angle");
}

export function addCase(newId) {
    const bd = globals.boardData;
    if(!bd.cases[newId]) {
        bd.cases[newId]  = Object.assign({}, tuning.defaultCase);
        const cRD = {layers:{}, rootXform: new TransformNode(`case${newId}Root`)};
        globals.renderData.cases[newId] = cRD;
        setNaturalRotation(cRD, bd.cases[newId]);
    }
}

export function saveKeyboard() {
    const blah = globals.boardData;
    return JSON.stringify(blah);
}