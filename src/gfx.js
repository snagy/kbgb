import {globals} from './globals.js'
import {tuning} from './tuning.js'

export function createKeyMaterial(name,color) {
    let mats = globals.renderData.mats;
    mats[name] = new BABYLON.PBRMetallicRoughnessMaterial(name, globals.scene);
    mats[name].metallic = 0;
    mats[name].roughness = 0.6;
    mats[name].baseColor = color;
    mats[name].environmentTexture = globals.hdrTexture;
}

export function createMaterials() {
    let mats = globals.renderData.mats;
    let name = "keySel";
    mats[name] = new BABYLON.StandardMaterial(name, globals.scene);
    mats[name].diffuseColor = new BABYLON.Color3(0, 0, 0);
    mats[name].emissiveColor = new BABYLON.Color3(1, 0, 0);
    mats[name].specularColor = new BABYLON.Color3(0, 0, 0);

    let caseMatName = "case";
    mats[caseMatName] = new BABYLON.PBRMetallicRoughnessMaterial(caseMatName, globals.scene);
    mats[caseMatName].metallic = 1;
    mats[caseMatName].roughness = 0.8;
    mats[caseMatName].baseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
    mats[caseMatName].environmentTexture = globals.hdrTexture;

    let plateMatName = "plate";
    mats[plateMatName] = new BABYLON.PBRMetallicRoughnessMaterial(plateMatName, globals.scene);
    mats[plateMatName].metallic = 1;
    mats[plateMatName].roughness = 0.2;
    mats[plateMatName].baseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    mats[plateMatName].environmentTexture = globals.hdrTexture;

    let pcbMatName = "fr4";
    mats[pcbMatName] = new BABYLON.PBRMetallicRoughnessMaterial(pcbMatName, globals.scene);
    mats[pcbMatName].metallic = 0;
    mats[pcbMatName].roughness = 0.2;
    mats[pcbMatName].baseColor = new BABYLON.Color3(41/255, 110/255, 1/255);
    mats[pcbMatName].environmentTexture = globals.hdrTexture;

    createKeyMaterial("key", new BABYLON.Color3(0.9, 0.9, 0.9));
}

export function snapCamera() {
    const bd = globals.boardData;
    globals.camera.setTarget(new BABYLON.Vector3(bd.layout.bounds.mins[0] + (bd.layout.bounds.maxs[0] - bd.layout.bounds.mins[0]) / 2.0,
        0,
        bd.layout.bounds.mins[1] + (bd.layout.bounds.maxs[1] - bd.layout.bounds.mins[1]) / 2.0));
    globals.camera.alpha = -Math.PI / 2;
    globals.camera.beta = 0;
    globals.camera.radius = 300;
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
    // var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    // // Default intensity is 1. Let's dim the light a small amount
    // light.intensity = 0.7;
    var skyboxPath = "assets/environment.dds";
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
