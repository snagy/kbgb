var globals = {}
var tuning = {
    keyDims:[18.0,18.0],
    switchCutout:[14.0,14.0],
    base1U:[19.05,19.05],
    bezelGap:1.05,
    bezelThickness:5
}


function refreshKeyboard() {
    const scene = globals.scene;
    const bd = globals.boardData;

    let mins = [100000.0,100000.0]
    let maxs = [-100000.0,-100000.0];

    let bezelHoles = [];

    let kIdx = 0
    for (const k of bd.keys) {
        console.log(k);
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
        var keyPoints = [
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-kDim[0], 0, -kDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3( kDim[0], 0, -kDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3( kDim[0], 0,  kDim[1]), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-kDim[0], 0,  kDim[1]), kXform)
        ];
        
        var keycap = BABYLON.MeshBuilder.CreatePolygon("key"+kIdx, {shape: keyPoints, updatable: true}, scene);
    
        let bezelHole = [
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-kDim[0]-tuning.bezelGap, 0, -kDim[1]-tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3( kDim[0]+tuning.bezelGap, 0, -kDim[1]-tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3( kDim[0]+tuning.bezelGap, 0,  kDim[1]+tuning.bezelGap), kXform),
            BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-kDim[0]-tuning.bezelGap, 0,  kDim[1]+tuning.bezelGap), kXform)
        ];
        bezelHoles.push(bezelHole);

        for(let p of keyPoints) {
            mins[0] = Math.min(mins[0], p.x);
            maxs[0] = Math.max(maxs[0], p.x);
            mins[1] = Math.min(mins[1], p.z);
            maxs[1] = Math.max(maxs[1], p.z);
        }
        kIdx++;
    }

    let bezelEdgeTotal = tuning.bezelGap + tuning.bezelThickness;
    let frameMins = [mins[0]-bezelEdgeTotal,mins[1]-bezelEdgeTotal]
    let frameMaxs = [maxs[0]+bezelEdgeTotal,maxs[1]+bezelEdgeTotal]
    let caseFrame = [
        new BABYLON.Vector3(frameMins[0], 0, frameMins[1]),
        new BABYLON.Vector3(frameMaxs[0], 0, frameMins[1]),
        new BABYLON.Vector3(frameMaxs[0], 0, frameMaxs[1]),
        new BABYLON.Vector3(frameMins[0], 0, frameMaxs[1])
    ];
    let bezelMins = [mins[0]-tuning.bezelGap,mins[1]-tuning.bezelGap]
    let bezelMaxs = [maxs[0]+tuning.bezelGap,maxs[1]+tuning.bezelGap]
    let cavityInnerEdge = [[
        new BABYLON.Vector3(bezelMins[0], 0, bezelMins[1]),
        new BABYLON.Vector3(bezelMaxs[0], 0, bezelMins[1]),
        new BABYLON.Vector3(bezelMaxs[0], 0, bezelMaxs[1]),
        new BABYLON.Vector3(bezelMins[0], 0, bezelMaxs[1])
    ]];
    var edgeGeo = BABYLON.MeshBuilder.CreatePolygon("edge", {shape:caseFrame, holes:cavityInnerEdge }, scene);
    
    //var bezelGeo = BABYLON.MeshBuilder.CreatePolygon("bezel", {shape:caseFrame, holes:bezelHoles }, scene);

    globals.camera.setPosition(new BABYLON.Vector3(-Math.PI/2, 0, 100));
    globals.camera.setTarget(new BABYLON.Vector3((maxs[0]-mins[0])/2.0,0,(maxs[1]-mins[1])/2.0));
}

function loadKeyboard() {
    fetch('testkbs/kle_atreus.kle')
    .then(response => response.json())
    .then(data => {
                console.log(data);
                globals.boardData = data;
                refreshKeyboard();
            });
}

function createScene() {
    const engine = globals.engine;

    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
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
window.addEventListener("click", function () {
    const scene = globals.scene;
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    //console.log(pickResult);
    if(pickResult && pickResult.pickedMesh) {
        console.log("picked key "+pickResult.pickedMesh.name)
    }
 });