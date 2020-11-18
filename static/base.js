var globals = {
    pickedKeys: [],
    renderData: { keys: {}, case: {}, mats: {}, outlines: {} }
}
var tuning = {
    keyDims: [18.0, 18.0],
    switchCutout: [14.0, 14.0],
    base1U: [19.05, 19.05],
    bezelGap: 1.05,
    bezelThickness: 5
}

function createKeyMaterial(name,color) {
    let mats = globals.renderData.mats;
    mats[name] = new BABYLON.StandardMaterial(name, globals.scene);
    mats[name].diffuseColor = color;
    mats[name].specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
}

function createMaterials() {
    let mats = globals.renderData.mats;

    mats["keySel"] = new BABYLON.StandardMaterial("keySel", globals.scene);
    mats["keySel"].diffuseColor = new BABYLON.Color3(0, 0, 0);
    mats["keySel"].emissiveColor = new BABYLON.Color3(1, 0, 0);
    mats["keySel"].specularColor = new BABYLON.Color3(0, 0, 0);

    createKeyMaterial("key", new BABYLON.Color3(0.9, 0.9, 0.9));
}

function lineLineIntersection(p0, d0, p1, d1) {
    let det = d0.x * d1.z - d1.x * d0.z;
    if (det < BABYLON.Epsilon) // no collision
    {
        return null;
    }

    let prevC = p0.x * d0.x + p0.z * d0.z;
    let nextC = p1.x * d1.x + p1.z * d1.z;
    let intersection = new BABYLON.Vector3((d1.z * prevC - d0.z * nextC) / det, 0,
        (d0.x * nextC - d1.x * prevC) / det);

    return intersection;
}

function segmentIntersection(x0, x1, y0, y1) {
    let xL = x1.subtract(x0);
    let yL = y1.subtract(y0);
    let xNorm = (new BABYLON.Vector3(xL.z, 0, -xL.x)).normalize();
    let yNorm = (new BABYLON.Vector3(yL.z, 0, -yL.x)).normalize();

    let intersection = lineLineIntersection(x0,xNorm,y0,yNorm);
    if(intersection) {
        let xD = BABYLON.Vector3.Dot(intersection.subtract(x0),xL);
        let xT = xD*xD / xL.lengthSquared;
        if( xT >= -BABYLON.Epsilon && xT <= (1+BABYLON.Epsilon) ) {
            let yD = BABYLON.Vector3.Dot(intersection.subtract(y0),yL);
            let yT = yD*yD / yL.lengthSquared;
            if( yT >= -BABYLON.Epsilon && yT <= (1+BABYLON.Epsilon) ) {
                return intersection;
            }
        }
    }
    return null;
}

function getRotFromNormal(norm) {
    let t = Math.acos(norm.x);
    if (norm.z < 0) t = 2 * Math.PI - t;
    return t;
}

function getNormalFromRot(rot) {
    return new BABYLON.Vector3(Math.cos(rot), 0, Math.sin(rot));
}

var EPSILON     = 1.1102230246251565e-16
var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON
function orient(a, b, c) {
    var l = (a.z - c.z) * (b.x - c.x)
    var r = (a.x - c.x) * (b.z - c.z)
    var det = l - r
    var s
    if(l > 0) {
      if(r <= 0) {
        return det
      } else {
        s = l + r
      }
    } else if(l < 0) {
      if(r >= 0) {
        return det
      } else {
        s = -(l + r)
      }
    } else {
      return det
    }
    var tol = ERRBOUND3 * s
    if(det >= tol || det <= -tol) {
      return det
    }
    return 0
  }

// convex hull of points on the x/z plane
function convexHull2d(points) {
    var n = points.length

    if (n < 3) {
        var result = new Array(n)
        for (var i = 0; i < n; ++i) {
            result[i] = i
        }

        if (n === 2 &&
            points[0].x === points[1].x &&
            points[0].z === points[1].z) {
            return [0]
        }

        return result
    }

    //Sort point indices along x-axis
    var sorted = new Array(n)
    for (var i = 0; i < n; ++i) {
        sorted[i] = i
    }
    sorted.sort(function (a, b) {
        var d = points[a].x - points[b].x
        if (d) {
            return d
        }
        return points[a].z - points[b].z
    })

    //Construct upper and lower hulls
    var lower = [sorted[0], sorted[1]]
    var upper = [sorted[0], sorted[1]]

    for (var i = 2; i < n; ++i) {
        var idx = sorted[i]
        var p = points[idx]

        //Insert into lower list
        var m = lower.length
        while (m > 1 && orient(
                                points[lower[m - 2]],
                                points[lower[m - 1]],
                                p) <= 0) {
            m -= 1
            lower.pop()
        }
        lower.push(idx)

        //Insert into upper list
        m = upper.length
        while (m > 1 && orient(
            points[upper[m - 2]],
            points[upper[m - 1]],
            p) >= 0) {
            m -= 1
            upper.pop()
        }
        upper.push(idx)
    }

    //Merge lists together
    var result = new Array(upper.length + lower.length - 2)
    var ptr = 0
    for (var i = 0, nl = lower.length; i < nl; ++i) {
        result[ptr++] = lower[i]
    }
    for (var j = upper.length - 2; j > 0; --j) {
        result[ptr++] = upper[j]
    }

    let pList = [];
    for( let i of result ) {
        pList.unshift(points[i])
    }

    //Return result
    return pList
}

// offset is + to the left, - to right (right won't work right now)
function genArrayFromOutline(outline, offset, fillets, close, segments) {
    let outPoints = [];
    //todo turn fillets into array if it's just a value
    if (!segments) {
        segments = 4;
    }

    for (let i = 0; i < outline.length; i++) {
        let point = outline[i];
        let next = outline[(i + 1) % outline.length];
        let prev = outline[(i - 1 + outline.length) % outline.length];
        let nextDir = next.subtract(point).normalize();
        let prevDir = point.subtract(prev).normalize();
        let nextNorm = new BABYLON.Vector3(nextDir.z, 0, -nextDir.x);
        let prevNorm = new BABYLON.Vector3(prevDir.z, 0, -prevDir.x);
        let inPoint = point.add(prevNorm.scale(offset));
        let outPoint = point.add(nextNorm.scale(offset));

        let intersection = lineLineIntersection(inPoint, prevNorm,
            outPoint, nextNorm);
        if (intersection === null) {
            outPoints.push(inPoint);
            outPoints.push(outPoint);
            continue;
        }

        if (!fillets) {
            outPoints.push(intersection);
        }
        else {
            let fillet = fillets;
            let filletCenter = lineLineIntersection(inPoint.add(prevNorm.scale(-fillet)), prevNorm,
                outPoint.add(nextNorm.scale(-fillet)), nextNorm);


            let startRot = getRotFromNormal(prevNorm);
            let endRot = getRotFromNormal(nextNorm);
            if (endRot < startRot) {
                endRot += Math.PI * 2;
            }
            let rotStep = (endRot - startRot) / segments;

            for (let i = 0; i <= segments; i++) {
                outPoints.push(filletCenter.add(getNormalFromRot(startRot + rotStep * i).scale(fillet)));
            }
        }
    }

    if (close) {
        outPoints.push(outPoints[0]);
    }

    return outPoints;
}

function refreshOutlines() {
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
                    pathArray: [genArrayFromOutline(rd.outline, 0.1, 0.1, true),
                    genArrayFromOutline(rd.outline, 0.5, 0.5, true)]
                }, globals.scene);
            oRD[id].material = mats["keySel"];
            oRD[id].translate(new BABYLON.Vector3(0, 1, 0), 1, BABYLON.Space.LOCAL);
        }
    }
}

function refreshLayout() {
    const scene = globals.scene;
    const bd = globals.boardData;

    let mins = [100000.0, 100000.0]
    let maxs = [-100000.0, -100000.0];

    let bezelHoles = [];

    let kRD = globals.renderData.keys;
    let outlines = [];

    let kgID = 0;
    for (const [id, k] of Object.entries(bd.layout.keys)) {
        console.log(k);

        if (!kRD[id]) {
            kRD[id] = {keyGroupId:null,
                        mins:[100000.0, 100000.0], maxs:[-100000.0, -100000.0],
                        bezelMins:[100000.0, 100000.0], bezelMaxs:[-100000.0, -100000.0]
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

        if (rd.keycap) {
            scene.removeMesh(rd.keycap);
        }
        rd.keycap = BABYLON.MeshBuilder.CreatePolygon(id, { shape: rd.outline, updatable: false }, scene);

        if(k.matName && globals.renderData.mats[k.matName]) {
            rd.keycap.material = globals.renderData.mats[k.matName];
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

            // more checks?
            if(rd1.keyGroupId && rd2.keyGroupId) {
                // merge
                console.log(`merging kgIDs ${rd1.keyGroupId} and ${rd2.keyGroupId}`);
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

        for (const [otherId, otherRD] of Object.entries(kRD)) {
            if(otherId == id || otherRD.keyGroupId == rd.keyGroupId) {
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

function refreshCase() {
    const scene = globals.scene;
    const bd = globals.boardData;
    const kRD = globals.renderData.keys;

    if(bd.caseType == "convex") {
        let kPs = [];
        for( let [id,rd] of Object.entries(kRD) ) {
            for( let p of rd.outline ) {
                kPs.push(p)
            }
        }
        bd.outline = convexHull2d(kPs);

        if(bd.forceSymmetrical) {
            let midPoint = (bd.layout.bounds.maxs[0] - bd.layout.bounds.mins[0]) * 0.5 + bd.layout.bounds.mins[0];
            for(let oP of bd.outline) {
                kPs.push(new BABYLON.Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
            }
            bd.outline = convexHull2d(kPs);
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

    let cavityInnerEdge = [genArrayFromOutline(bd.outline, tuning.bezelGap, null, false)];
    let caseFrame = genArrayFromOutline(bd.outline, tuning.bezelGap + tuning.bezelThickness, tuning.bezelThickness, false, 8);

    if (cRD.edge) {
        scene.removeMesh(cRD.edge);
    }
    cRD.edge = BABYLON.MeshBuilder.CreatePolygon("edge", { shape: caseFrame, depth:9, holes: cavityInnerEdge, updatable: true }, scene);

    if (cRD.bottom) {
        scene.removeMesh(cRD.bottom);
    }
    cRD.bottom = BABYLON.MeshBuilder.CreatePolygon("bottom", { shape: caseFrame, depth:3, updatable: true }, scene);
    cRD.bottom.translate(new BABYLON.Vector3(0, -9, 0), 1, BABYLON.Space.LOCAL);


    let keyGroups = {};
    let bezelOutlines = [];
    for(const [otherId, oRD] of Object.entries(kRD)) {
        console.log(`kgid: ${oRD.keyGroupId}`);
        if(!keyGroups[oRD.keyGroupId]) {
            keyGroups[oRD.keyGroupId] = [];
        }
        keyGroups[oRD.keyGroupId].push(oRD);
    }
    for(const [kgId, KG] of Object.entries(keyGroups)) {
        let kPs = [];
        for( const rd of KG ) {
            for( let p of rd.bezelHole ) {
                kPs.push(p)
            }
        }
        let outline = convexHull2d(kPs);
        bezelOutlines.push(genArrayFromOutline(outline, 0.0, 0.5, false, 8));
    }
    
    if (cRD.bezel) {
        scene.removeMesh(cRD.bezel);
    }
    cRD.bezel = BABYLON.MeshBuilder.CreatePolygon("bezel", { shape: caseFrame, depth:7.5, holes: bezelOutlines }, scene);
    cRD.bezel.translate(new BABYLON.Vector3(0, 7.5, 0), 1, BABYLON.Space.LOCAL);
}

function refreshKeyboard() {
    refreshLayout();

    refreshCase();
}

function snapCamera() {
    const bd = globals.boardData;
    globals.camera.setTarget(new BABYLON.Vector3(bd.layout.bounds.mins[0] + (bd.layout.bounds.maxs[0] - bd.layout.bounds.mins[0]) / 2.0,
        0,
        bd.layout.bounds.mins[1] + (bd.layout.bounds.maxs[1] - bd.layout.bounds.mins[1]) / 2.0));
    globals.camera.alpha = -Math.PI / 2;
    globals.camera.beta = 0;
    globals.camera.radius = 300;
}

function loadKeyboard() {
    fetch('testkbs/basis-mono.kle')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let mats = globals.renderData.mats;

            let bd = {};
            bd.meta = data.meta;
            bd.case = data.case;
            bd.layout = {keys: {}};
            let kIdx = 0
            for (let k of data.keys) {
                k.id = "key" + kIdx++;
                
                if(!mats[k.color]) {
                    createKeyMaterial(k.color,BABYLON.Color3.FromHexString(k.color));
                }
                k.matName = k.color;
                
                bd.layout.keys[k.id] = k;
            }
            globals.boardData = bd;
            
            createMaterials();
            refreshKeyboard();
            snapCamera();
        });
}

function createScene() {
    const engine = globals.engine;

    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(globals.canvas, false);

    globals.camera = camera;

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // return the created scene
    return scene;
}

let kbgbGUI = {
    addButton: function(txt, action, style) {
        style = style?style:{};
        var button = BABYLON.GUI.Button.CreateSimpleButton("button", txt);
        button.top = "0px";
        button.left = "0px";
        button.width = style.width?style.width:"60px";
        button.height = style.height?style.height:".4";
        button.cornerRadius = 5;
        button.thickness = 2;
        button.children[0].color = "#DFF9FB";
        button.children[0].fontSize = 24;
        button.color = "#FF7979";
        button.background = "#EB4D4B";
        //button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    
        button.onPointerClickObservable.add(action);
    
        return button;
    },
    addLabel: function(txt) {
        var t = new BABYLON.GUI.TextBlock();
        t.width = "80px";
        t.height = ".9";
        t.text = txt;
        t.color = "white";
        t.fontSize = 24;
        return t;
    },
    addKeyActionButton: function(txt, keyAction) {
        return kbgbGUI.addButton(txt, function () {
            for (let kId of globals.pickedKeys) {
                let bd = globals.boardData;
                let k = bd.layout.keys[kId];
                keyAction(k);
            }
            refreshKeyboard();
        }); 
    },
    modes:{
        "key":{
            add: function() {
                //let ctrlBar = BABYLON.GUI.Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new BABYLON.GUI.StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            
                ctrlBar.addControl(kbgbGUI.addLabel("Pos: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`◄`, (k) => k.x -= 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`▲`, (k) => k.y -= 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`▼`, (k) => k.y += 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`►`, (k) => k.x += 0.25 ));
            
            
                ctrlBar.addControl(kbgbGUI.addLabel("Rot: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⤹`, (k) => k.rotation_angle -= 5 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⤸`, (k) => k.rotation_angle += 5 ));
            
                ctrlBar.addControl(kbgbGUI.addLabel("W: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬌`, (k) => k.width += 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬄`, (k) => k.width -= 0.25 ));
            
                ctrlBar.addControl(kbgbGUI.addLabel("H: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬍`, (k) => k.height += 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⇳`, (k) => k.height -= 0.25 ));
                
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
            }
        },
        "case":{
            add: function() {
                //let ctrlBar = BABYLON.GUI.Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new BABYLON.GUI.StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            
                ctrlBar.addControl(kbgbGUI.addLabel("Type: "));

                var addRadio = function(text, parent) {

                    var button = new BABYLON.GUI.RadioButton();
                    button.width = "20px";
                    button.height = "20px";
                    button.color = "white";
                    button.background = "green";     
            
                    button.onIsCheckedChangedObservable.add(function(state) {
                        if(state) {
                            globals.boardData.caseType = text;
                            refreshCase()
                        }
                    }); 
            
                    var header = BABYLON.GUI.Control.AddHeader(button, text, "100px", { isHorizontal: true, controlFirst: true });
                    header.height = "30px";
            
                    parent.addControl(header);    
                }
            
            
                let radioCtrl = new BABYLON.GUI.StackPanel();  
                radioCtrl.height = "1";
                radioCtrl.width = "200px";
                radioCtrl.isVertical = true;
                addRadio("rectangle", radioCtrl);
                addRadio("convex", radioCtrl);
                addRadio("concave", radioCtrl);
                ctrlBar.addControl(radioCtrl);

                var checkbox = new BABYLON.GUI.Checkbox();
                checkbox.width = "20px";
                checkbox.height = "20px";
                checkbox.isChecked = false;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(value) {
                    globals.boardData.forceSymmetrical = value;
                    refreshCase();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                ctrlBar.addControl(checkbox);

                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
            }
        }
    },
    setGUIMode: function(mode) {
        if(kbgbGUI.activeModeCtrl) {
            globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
        }
        if(kbgbGUI.modes[mode]) {
            kbgbGUI.modes[mode].add();
        }
    },
    addModeGUI: function() {
        let ctrlBar = new BABYLON.GUI.StackPanel();  
        ctrlBar.height = ".1";
        ctrlBar.isPointerBlocker = true;
        ctrlBar.isVertical = false;
        //ctrlBar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ctrlBar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

        ctrlBar.addControl(kbgbGUI.addButton("layout", () => {kbgbGUI.setGUIMode("key")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("case", () => {kbgbGUI.setGUIMode("case")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("pcb", () => {kbgbGUI.setGUIMode("pcb")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("deets", () => {kbgbGUI.setGUIMode("details")}, {height:"1",width:"120px"}));

        kbgbGUI.modeCtrl = ctrlBar;
        globals.screengui.addControl(ctrlBar);
    }
}

function initKBGB() {
    // get the canvas DOM element
    globals.canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    globals.engine = new BABYLON.Engine(globals.canvas, true);

    // call the createScene function
    globals.scene = createScene();

    
    globals.screengui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("screenUI");

    kbgbGUI.addModeGUI();

    // run the render loop
    globals.engine.runRenderLoop(function () {
        globals.scene.render();
    });


    // load a keyboard
    loadKeyboard();

    // the canvas/window resize event handler
    window.addEventListener('resize', function () {
        globals.engine.resize();
    });

    window.addEventListener('keydown', event => {
        if( event.key == 'i' ) {
            if(globals.scene.debugLayer.isVisible()) {
                globals.scene.debugLayer.hide();
            } else {
                globals.scene.debugLayer.show();
            }
        }
    })
}

window.addEventListener('DOMContentLoaded', function () {
    initKBGB();
});



//When click event is raised
window.addEventListener("click", function (e) {
    const scene = globals.scene;
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    //console.log(pickResult);
    if (pickResult && pickResult.pickedMesh) {
        if (globals.boardData.layout.keys[pickResult.pickedMesh.name]) {
            let pickedKeys = globals.pickedKeys;
            if (e.metaKey || e.ctrlKey) {
                if (globals.pickedKeys.indexOf(pickResult.pickedMesh.name) > 0) {
                    globals.pickedKeys.splice(globals.pickedKeys.indexOf(pickResult.pickedMesh.name), 1)
                }
                else {
                    globals.pickedKeys.push(pickResult.pickedMesh.name)
                }
            }
            else {
                globals.pickedKeys = [pickResult.pickedMesh.name];
            }
            console.log("picked key " + pickResult.pickedMesh.name)
            refreshOutlines();
        }
    }
});