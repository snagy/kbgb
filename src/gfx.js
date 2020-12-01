import {globals} from './globals.js'
import {tuning} from './tuning.js'

export function createKeyMaterial(name,color) {
    let mats = globals.renderData.mats;
    if(!mats[name])
    {
        mats[name] = new BABYLON.PBRMetallicRoughnessMaterial(name, globals.scene);
        mats[name].metallic = 0;
        mats[name].roughness = 0.6;
        mats[name].baseColor = color;
        mats[name].environmentTexture = globals.hdrTexture;
    }
}

export function createMaterials() {
    let mats = globals.renderData.mats;
    let name = "keySel";
    if(!mats[name])
    {
        mats[name] = new BABYLON.StandardMaterial(name, globals.scene);
        mats[name].diffuseColor = new BABYLON.Color3(0, 0, 0);
        mats[name].emissiveColor = new BABYLON.Color3(1, 0, 0);
        mats[name].specularColor = new BABYLON.Color3(0, 0, 0);
    }

    let caseMatName = "case";
    if(!mats[caseMatName])
    {
        mats[caseMatName] = new BABYLON.PBRMetallicRoughnessMaterial(caseMatName, globals.scene);
        mats[caseMatName].metallic = 0;
        mats[caseMatName].roughness = 0.8;
        mats[caseMatName].baseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
        mats[caseMatName].environmentTexture = globals.hdrTexture;
    }

    let plateMatName = "plate";
    if(!mats[plateMatName])
    {
        mats[plateMatName] = new BABYLON.PBRMetallicRoughnessMaterial(plateMatName, globals.scene);
        mats[plateMatName].metallic = 1;
        mats[plateMatName].roughness = 0.2;
        mats[plateMatName].baseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        mats[plateMatName].environmentTexture = globals.hdrTexture;
    }

    let pcbMatName = "fr4";
    if(!mats[pcbMatName])
    {
        mats[pcbMatName] = new BABYLON.PBRMetallicRoughnessMaterial(pcbMatName, globals.scene);
        mats[pcbMatName].metallic = 0;
        mats[pcbMatName].roughness = 0.2;
        mats[pcbMatName].baseColor = new BABYLON.Color3(45/255, 90/255, 10/255);
        mats[pcbMatName].environmentTexture = globals.hdrTexture;
    }

    createKeyMaterial("key", new BABYLON.Color3(0.9, 0.9, 0.9));
}

export function combineSideVerts(mesh) {
    var _decPlaces = Math.pow(10, 8);
    var _pdata = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var _ndata = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
    var _idata = mesh.getIndices();    
    var _newPdata = []; //new positions array
    var _newIdata =[]; //new indices array
    var _mapPtr =0; // new index;
    var _uniquePositions = {}; // unique vertex positions
    for(var _i=0; _i<_idata.length; _i+=3) {
        var _facet = [_idata[_i], _idata[_i + 1], _idata[_i+2]]; //facet vertex indices
        var _pstring = []; //lists facet vertex positions (x,y,z) as string "xyz""
        for(var _j = 0; _j<3; _j++) { //
            _pstring[_j] = "";
            for(var _k = 0; _k<3; _k++) {
                //small values make 0
                if (Math.abs(_pdata[3*_facet[_j] + _k]) < 0.0001) {
                    _pdata[3*_facet[_j] + _k] = 0;
                }
                _pstring[_j] += Math.round(_pdata[3*_facet[_j] + _k] * _decPlaces)/_decPlaces + "|";
            }
        }
        //check facet vertices to see that none are repeated
        // do not process any facet that has a repeated vertex, ie is a line
        if(!(_pstring[0] == _pstring[1] || _pstring[0] == _pstring[2] || _pstring[1] == _pstring[2])) {        
            //for each facet position check if already listed in uniquePositions
            // if not listed add to uniquePositions and set index pointer
            // if listed use its index in uniquePositions and new index pointer
            for(var _j = 0; _j<3; _j++) { 
                var _ptr = _uniquePositions[_pstring[_j]];
                if(_ptr === undefined) {
                    _uniquePositions[_pstring[_j]] = _mapPtr;
                    _ptr = _mapPtr++;
                    //not listed so add individual x, y, z coordinates to new positions array newPdata
                    //and add matching normal data to new normals array newNdata
                    for(var _k = 0; _k<3; _k++) {
                        _newPdata.push(_pdata[3*_facet[_j] + _k]);
                    }
                }
                // add new index pointer to new indices array newIdata
                _newIdata.push(_ptr);
            }
        }
    }
    let _newNdata =[]; //new normal data
    BABYLON.VertexData.ComputeNormals(_newPdata, _newIdata, _newNdata);
    //create new vertex data object and update
    var _vertexData = new BABYLON.VertexData();
    _vertexData.positions = _newPdata;
    _vertexData.indices = _newIdata;
    _vertexData.normals = _newNdata;
    _vertexData.applyToMesh(mesh);
}

export function snapCamera() {
    const bd = globals.boardData;
    globals.camera.setTarget(new BABYLON.Vector3(bd.layout.bounds.mins[0] + (bd.layout.bounds.maxs[0] - bd.layout.bounds.mins[0]) / 2.0,
        0,
        bd.layout.bounds.mins[1] + (bd.layout.bounds.maxs[1] - bd.layout.bounds.mins[1]) / 2.0));
    globals.camera.alpha = -Math.PI / 2;
    globals.camera.beta = 0;
    globals.camera.radius = 600;
}

function createScene() {
    const engine = globals.engine;

    // create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    camera.fov = 0.3;
    camera.lowerRadiusLimit = 75;
    camera.upperRadiusLimit = 1500;

    // attach the camera to the canvas
    camera.attachControl(globals.canvas, false);

    globals.camera = camera;

    // var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', scene, 0.75, [camera]);
    // ssao.base = 0.6;
    // ssao.radius = 0.001;
    // ssao.area = 0.003;
    // ssao.falloff = 0.00001;

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    // var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    // // Default intensity is 1. Let's dim the light a small amount
    // light.intensity = 0.7;
    var skyboxPath = "assets/studio_small.env";
    globals.hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(skyboxPath, scene);
    globals.currentSkybox = scene.createDefaultSkybox(globals.hdrTexture, true, (scene.activeCamera.maxZ - scene.activeCamera.minZ) / 2, 0.3);

    // return the created scene
    return scene;
}

export function init() {
    // get the canvas DOM element
    globals.canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    globals.engine = new BABYLON.Engine(globals.canvas, true);

    // call the createScene function
    globals.scene = createScene();
}
