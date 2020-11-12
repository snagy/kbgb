var globals = {
    pickedKeys:[],
    renderData:{keys:{},case:{},mats:{},outlines:{}}
}
var tuning = {
    keyDims:[18.0,18.0],
    switchCutout:[14.0,14.0],
    base1U:[19.05,19.05],
    bezelGap:1.05,
    bezelThickness:5
}

function createMaterials() {
    let mats = globals.renderData.mats;
    
    mats["keySel"] = new BABYLON.StandardMaterial("keySel", globals.scene);
    mats["keySel"].diffuseColor = new BABYLON.Color3(0, 0, 0);
    mats["keySel"].emissiveColor = new BABYLON.Color3(1, 0, 0);
    mats["keySel"].specularColor = new BABYLON.Color3(0, 0, 0);

    mats["key"] = new BABYLON.StandardMaterial("key", globals.scene);
    mats["key"].diffuseColor = new BABYLON.Color3(1, 0.9, 1.0);
    mats["key"].specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
}

function lineLineIntersection(p0,d0,p1,d1) {
    let det = d0.x * d1.z - d1.x * d0.z;
    if( det < BABYLON.Epsilon ) // no collision
    {
        return null;
    }

    let prevC = p0.x*d0.x+p0.z*d0.z;
    let nextC = p1.x*d1.x+p1.z*d1.z;
    let intersection = new BABYLON.Vector3( (d1.z * prevC - d0.z * nextC) / det, 0,
                                            (d0.x * nextC - d1.x * prevC) / det );

    return intersection;
}

function getRotFromNormal(norm) {
    let t = Math.acos(norm.x);
    if( norm.z < 0 ) t = 2*Math.PI - t;
    return t;
}

function getNormalFromRot(rot) {
    return new BABYLON.Vector3(Math.cos(rot),0,Math.sin(rot));
}

// offset is + to the left, - to right (right won't work right now)
function genArrayFromOutline(outline, offset, fillets, close, segments) {
    let outPoints = [];
    //todo turn fillets into array if it's just a value
    if(!segments) {
        segments = 4;
    }

    for( let i = 0; i < outline.length; i++ ) {
        let point = outline[i];
        let next = outline[(i+1)%outline.length];
        let prev = outline[(i-1+outline.length)%outline.length];
        let nextDir = next.subtract(point).normalize();
        let prevDir = point.subtract(prev).normalize();
        let nextNorm = new BABYLON.Vector3(nextDir.z,0,-nextDir.x);
        let prevNorm = new BABYLON.Vector3(prevDir.z,0,-prevDir.x);
        let inPoint = point.add(prevNorm.scale(offset));
        let outPoint = point.add(nextNorm.scale(offset));

        let intersection = lineLineIntersection(inPoint,prevNorm,
                                                outPoint,nextNorm);
        if(intersection === null) {
            outPoints.push(inPoint);
            outPoints.push(outPoint);
            continue;
        }
        
        if(!fillets) {
            outPoints.push(intersection);
        }
        else
        {
            let fillet = fillets;
            let filletCenter = lineLineIntersection(inPoint.add(prevNorm.scale(-fillet)),prevNorm,
                                                    outPoint.add(nextNorm.scale(-fillet)),nextNorm);
 
            
            let startRot = getRotFromNormal(prevNorm);
            let endRot = getRotFromNormal(nextNorm);
            if( endRot < startRot ) {
                endRot += Math.PI * 2;
            }
            let rotStep = (endRot - startRot) / segments;

            for(let i = 0; i <= segments; i++) {
                outPoints.push(filletCenter.add(getNormalFromRot(startRot+rotStep*i).scale(fillet)));
            }
        }
    }

    if(close) {
        outPoints.push(outPoints[0]);
    }

    return outPoints;
}

function refreshOutlines() {
    let kRD = globals.renderData.keys;
    let oRD = globals.renderData.outlines;
    let mats = globals.renderData.mats;

    for(const [k,o] of Object.entries(oRD)) {
        globals.scene.removeMesh(o);
    }
    
    for (const id of globals.pickedKeys) {
        if(!kRD[id]) {
            console.log("picked nonexistant key");
        }
        else
        {
            let rd = kRD[id];

            //oRD[id] = BABYLON.MeshBuilder.CreateLines(id+"outline",{points:genArrayFromOutline(rd.outline,0.3,0,true)},globals.scene);
            oRD[id] = BABYLON.MeshBuilder.CreateRibbon(id+"outline",
                                    {pathArray:[genArrayFromOutline(rd.outline,0.1,0,true),
                                                genArrayFromOutline(rd.outline,0.5,0,true)]},globals.scene);
            oRD[id].material = mats["keySel"];
        }
    }
}

function refreshKeyboard() {
    const scene = globals.scene;
    const bd = globals.boardData;

    let mins = [100000.0,100000.0]
    let maxs = [-100000.0,-100000.0];

    let bezelHoles = [];

    let kRD = globals.renderData.keys;
    for (const [id,k] of Object.entries(bd.keys)) {
        console.log(k);

        if(!kRD[id]) {
            kRD[id] = {};
        }
        let rd = kRD[id];
        
        let kDim = [(tuning.keyDims[0] + tuning.base1U[0]*(k.width-1))/2,
                    (tuning.keyDims[1] + tuning.base1U[1]*(k.height-1))/2];

        let kPos = [ k.x*tuning.base1U[0] + kDim[0],
                    -(k.y*tuning.base1U[1] + kDim[1])]
        let kPosition = new BABYLON.Vector3(kPos[0],0,kPos[1]);
        let kXform = BABYLON.Matrix.Identity();
        kXform = kXform.multiply(BABYLON.Matrix.Translation(kPos[0],0,kPos[1]));
        if(k.rotation_angle != 0) {
            kXform = kXform.multiply(BABYLON.Matrix.Translation(-k.rotation_x*tuning.base1U[0],0,k.rotation_y*tuning.base1U[1]));
            kXform = kXform.multiply(BABYLON.Matrix.RotationY(k.rotation_angle*Math.PI/180.0))
            kXform = kXform.multiply(BABYLON.Matrix.Translation(k.rotation_x*tuning.base1U[0],0,-k.rotation_y*tuning.base1U[1]));
        }
        rd.outline = [
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-kDim[0], 0, -kDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3( kDim[0], 0, -kDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3( kDim[0], 0,  kDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-kDim[0], 0,  kDim[1]), kXform)
        ];

        if(rd.keycap)
        {
            scene.removeMesh(rd.keycap);
        }
        rd.keycap = BABYLON.MeshBuilder.CreatePolygon(id, {shape: rd.outline, updatable: false}, scene);

        rd.keycap.material = globals.renderData.mats["key"];
        
        let bezelHole = [
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-kDim[0]-tuning.bezelGap, 0, -kDim[1]-tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3( kDim[0]+tuning.bezelGap, 0, -kDim[1]-tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3( kDim[0]+tuning.bezelGap, 0,  kDim[1]+tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-kDim[0]-tuning.bezelGap, 0,  kDim[1]+tuning.bezelGap), kXform)
        ];
        bezelHoles.push(bezelHole);

        for(let p of rd.outline) {
            mins[0] = Math.min(mins[0], p.x);
            maxs[0] = Math.max(maxs[0], p.x);
            mins[1] = Math.min(mins[1], p.z);
            maxs[1] = Math.max(maxs[1], p.z);
        }
    }
    bd.bounds = {mins:mins,maxs:maxs};

    bd.outline = [
        new BABYLON.Vector3(mins[0], 0, mins[1]),
        new BABYLON.Vector3(maxs[0], 0, mins[1]),
        new BABYLON.Vector3(maxs[0], 0, maxs[1]),
        new BABYLON.Vector3(mins[0], 0, maxs[1])
    ];
    let cRD = globals.renderData.case;

    let cavityInnerEdge = [genArrayFromOutline(bd.outline, tuning.bezelGap, null, false)];
    let caseFrame = genArrayFromOutline(bd.outline, tuning.bezelGap + tuning.bezelThickness, tuning.bezelThickness, false, 8);

    if(cRD.edge)
    {
        scene.removeMesh(cRD.edge);
    }
    cRD.edge = BABYLON.MeshBuilder.CreatePolygon("edge", {shape:caseFrame, holes:cavityInnerEdge, updatable: true }, scene);
    
    //var bezelGeo = BABYLON.MeshBuilder.CreatePolygon("bezel", {shape:caseFrame, holes:bezelHoles }, scene);

    refreshOutlines();
}

function snapCamera() {
    const bd = globals.boardData;
    globals.camera.setTarget(new BABYLON.Vector3(bd.bounds.mins[0]+(bd.bounds.maxs[0]-bd.bounds.mins[0])/2.0,
                                                 0,
                                                 bd.bounds.mins[1]+(bd.bounds.maxs[1]-bd.bounds.mins[1])/2.0));
    globals.camera.alpha = -Math.PI/2;
    globals.camera.beta = 0;
    globals.camera.radius = 300;
}

function loadKeyboard() {
    fetch('testkbs/kle_atreus.kle')
    // fetch('testkbs/basis-mono.kle')
    .then(response => response.json())
    .then(data => {
                console.log(data);
                let bd = {};
                bd.meta = data.meta;
                bd.case = data.case;
                bd.keys = {};
                let kIdx = 0
                for(let k of data.keys) {
                    k.id = "key"+kIdx++;
                    bd.keys[k.id] = k;
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

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(globals.canvas, false);

    globals.camera = camera;

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // return the created scene
    return scene;
}

function initKBGB() {
    // get the canvas DOM element
    globals.canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    globals.engine = new BABYLON.Engine(globals.canvas, true);

    // call the createScene function
    globals.scene = createScene();

    globals.scene.debugLayer.show();

    
    globals.screengui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("screenUI");
    var button = BABYLON.GUI.Button.CreateSimpleButton("button", "Clicks: 0");
    button.top = "0px";
    button.left = "0px";
    button.width = "150px";
    button.height = "50px";
    button.cornerRadius = 20;
    button.thickness = 4;
    button.children[0].color = "#DFF9FB";
    button.children[0].fontSize = 24;
    button.color = "#FF7979";
    button.background = "#EB4D4B";
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    var clicks = 0;
    button.onPointerClickObservable.add(function () {
        for(let kId of globals.pickedKeys) {
            let bd = globals.boardData;
            let k = bd.keys[kId];
            k.x += 0.25;
        }
        refreshKeyboard();

        
        clicks++;
        if (clicks % 2 == 0) {
        button.background = "#EB4D4B";
        } else {
        button.background = "#007900";
        }
        button.children[0].text = "Clicks: " + clicks;
    });

    globals.screengui.addControl(button);    
    
    // run the render loop
    globals.engine.runRenderLoop(function(){
        globals.scene.render();
    });

    // load a keyboard
    loadKeyboard();

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        globals.engine.resize();
    });
}

window.addEventListener('DOMContentLoaded', function(){
    initKBGB();
});



//When click event is raised
window.addEventListener("click", function (e) {
    const scene = globals.scene;
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    //console.log(pickResult);
    if(pickResult && pickResult.pickedMesh) {
        if( globals.boardData.keys[pickResult.pickedMesh.name] ) {
            let pickedKeys = globals.pickedKeys;
            if(e.metaKey || e.ctrlKey) {
                if(globals.pickedKeys.indexOf(pickResult.pickedMesh.name) > 0) {
                    globals.pickedKeys.splice(globals.pickedKeys.indexOf(pickResult.pickedMesh.name),1)
                }
                else {
                    globals.pickedKeys.push(pickResult.pickedMesh.name)
                }
            }
            else {
                globals.pickedKeys = [pickResult.pickedMesh.name];
            }
            console.log("picked key "+pickResult.pickedMesh.name)
            refreshOutlines();
        }
    }
 });