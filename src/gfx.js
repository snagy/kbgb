import {globals} from './globals.js'
import {tuning} from './tuning.js'
import {Engine, ArcRotateCamera, CubeTexture, Scene, Vector3, VertexBuffer, 
        VertexData, Color3, StandardMaterial, PBRMaterial, PBRMetallicRoughnessMaterial,
        Animation, QuinticEase, EasingFunction, Texture, SceneLoader, Matrix} from '@babylonjs/core'
import {GLTFFileLoader} from "@babylonjs/loaders";

export function createKeyMaterial(name,color) {
    let mats = globals.renderData.mats;
    if(!mats[name])
    {
        mats[name] = new PBRMetallicRoughnessMaterial(name, globals.scene);
        mats[name].metallic = 0;
        mats[name].roughness = 0.6;
        mats[name].baseColor = color;
    }
}

export function createMaterials() {
    let mats = globals.renderData.mats;
    let name = "keySel";
    if(!mats[name])
    {
        mats[name] = new StandardMaterial(name, globals.scene);
        mats[name].diffuseColor = new Color3(0, 0, 0);
        mats[name].emissiveColor = new Color3(1, 0, 0);
        mats[name].specularColor = new Color3(0, 0, 0);
    }

    let caseMatName = "case";
    if(!mats[caseMatName])
    {
        const mat = new PBRMaterial(caseMatName, globals.scene);
        mat.metallic = 0;
        mat.roughness = 0.8;
        mat.baseColor = new Color3(12/255, 237/255, 239/255);
        // mat.subSurface.isTranslucencyEnabled = true;
        // mat.subSurface.isScatteringEnabled = true;
        // mat.subSurface.isRefractionEnabled = true;
        mat.alpha = 0.75;
        // alpha mode combine
        mat.subSurface.isRefractionEnabled = true;
        mat.subSurface.refractionIntensity = 0.9;
        mat.subSurface.indexOfRefraction = 1.13;
        mat.subSurface.tintColor = mat.baseColor;
        mat.subSurface.linkRefractionWithTransparency = false;
        mat.subSurface.isTranslucencyEnabled = true;
        mat.subSurface.useAlbedoToTintRefraction = true;
        // link refraction with trans
        // translucency enable
        mats[caseMatName] = mat;
    }

    let plateMatName = "plate";
    if(!mats[plateMatName])
    {
        mats[plateMatName] = new PBRMaterial(plateMatName, globals.scene);
        mats[plateMatName].metallic = 1;
        mats[plateMatName].roughness = 0.2;
        mats[plateMatName].baseColor = new Color3(0.5, 0.5, 0.5);
    }

    let pcbMatName = "fr4";
    if(!mats[pcbMatName])
    {
        mats[pcbMatName] = new PBRMetallicRoughnessMaterial(pcbMatName, globals.scene);
        mats[pcbMatName].metallic = 0;
        mats[pcbMatName].roughness = 0.2;
        mats[pcbMatName].baseColor = new Color3(45/255, 90/255, 10/255);
    }

    createKeyMaterial("key", new Color3(0.9, 0.9, 0.9));
}

export function combineSideVerts(mesh) {
    var _decPlaces = Math.pow(10, 8);
    var _pdata = mesh.getVerticesData(VertexBuffer.PositionKind);
    var _ndata = mesh.getVerticesData(VertexBuffer.NormalKind);
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
    VertexData.ComputeNormals(_newPdata, _newIdata, _newNdata);
    //create new vertex data object and update
    var _vertexData = new VertexData();
    _vertexData.positions = _newPdata;
    _vertexData.indices = _newIdata;
    _vertexData.normals = _newNdata;
    _vertexData.applyToMesh(mesh);
}

export function snapCamera(mode) {
    const bd = globals.boardData;
    const bounds = bd.layout.bounds;
    const w = bounds.maxs[0] - bounds.mins[0] + tuning.bezelThickness * 2;
    const h = bounds.maxs[1] - bounds.mins[1] + tuning.bezelThickness * 2;
    const dim = Math.max(w,h);
    let cam = globals.camera;
    cam.setTarget(new Vector3(bounds.mins[0] + (bounds.maxs[0] - bounds.mins[0]) / 2.0,
        0, bounds.mins[1] + (bounds.maxs[1] - bounds.mins[1]) / 2.0));
    
    let nextAlpha = -Math.PI / 3.5;
    let nextBeta = Math.PI / 3.5;
    if(mode == "top") {
        nextAlpha = -Math.PI / 2;
        nextBeta = 0;
    } else if(mode == "front") {
        nextAlpha = -Math.PI / 2;
        nextBeta = Math.PI / 4;
    } else if(mode == "rear") {
        nextAlpha = -Math.PI / 3.5 + Math.PI;
        nextBeta = Math.PI / 2.3;
    } else if(mode == "split") {
        nextAlpha = -Math.PI / 3.5;
        nextBeta = Math.PI / 2.25;
    }
    cam.radius = 0.5 * dim / Math.tan(cam.fov * 0.5);

    let easingFunction = new QuinticEase();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEOUT);
    Animation.CreateAndStartAnimation("camAlpha", cam, "alpha", 30, 12, cam.alpha, nextAlpha, Animation.ANIMATIONLOOPMODE_CONSTANT,easingFunction);
    Animation.CreateAndStartAnimation("camBeta", cam, "beta", 30, 12, cam.beta, nextBeta, Animation.ANIMATIONLOOPMODE_CONSTANT,easingFunction);

}


export function setEnvironmentLight(path) {
    if(!globals.hdrTextures) globals.hdrTextures = {};
    if(!globals.hdrTextures[path]) {
        globals.hdrTextures[path] = CubeTexture.CreateFromPrefilteredData(path, globals.scene);
    }
    globals.scene.environmentTexture = globals.hdrTextures[path];

    if(globals.currentSkybox) {
        globals.currentSkybox.material.reflectionTexture = globals.hdrTextures[path].clone();
        if (globals.currentSkybox.material.reflectionTexture) {
            globals.currentSkybox.material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        }
    } else {
        globals.currentSkybox = globals.scene.createDefaultSkybox(globals.hdrTextures[path], true, (globals.scene.activeCamera.maxZ - globals.scene.activeCamera.minZ) / 2, 0.3);
    }
}

function createScene() {
    const engine = globals.engine;

    // create a basic BJS Scene object
    var scene = new Scene(engine);

    var camera = new ArcRotateCamera("Camera", -Math.PI / 2, 0, 10, new Vector3(0, 0, 0), scene);

    // target the camera to scene origin
    camera.setTarget(Vector3.Zero());

    camera.alpha = -Math.PI / 3.5;
    camera.beta  = Math.PI / 3.5;
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

    scene.getOutlineRenderer().zOffset = 100;

    // return the created scene
    return scene;
}

export const keyAssets = {"KAT":{},"DSA":{},"KAM":{}};
export function getKeycap(profile, width, height, row, opts) {
    const prof = keyAssets[profile];
    if(!prof) return null;

    let xForm = Matrix.Identity();
    if(profile == "KAM") {
        if(height > width) {
            width = height;
            height = 1;

            xForm = Matrix.RotationY(Math.PI / 2);
        }
    }
    else if(profile == "KAT") {
        xForm = Matrix.RotationY(Math.PI);
    }

    const sized = prof[width];
    if(!sized) return null;

    let best = null;

    for(const [r,m] of Object.entries(sized)) {
        const container = m.container;
        const d = m.details;
        if(best == null || row == r) {
            best = container;
        }
    }
    return {container:best,preXform:xForm};
}

const katList = {
    "KAT_1_25u_r5.glb": {r:"5", w:"1.25"},
    "KAT_1_5u_r2.glb": {r:"2", w:"1.5"},
    "KAT_1_5u_r3_stepped.glb": {r:"3", w:"1.5", stepped:true},
    "KAT_1_5u_r5.glb": {r:"5", w:"1.5"},
    "KAT_1_75u_r3.glb": {r:"3", w:"1.75"},
    "KAT_1_75u_r5.glb": {r:"5", w:"1.75"},
    "KAT_1u_r0.glb": {r:"0", w:"1"},
    "KAT_1u_r1.glb": {r:"1", w:"1"},
    "KAT_1u_r2.glb": {r:"2", w:"1"},
    "KAT_1u_r3.glb": {r:"3", w:"1"},
    "KAT_1u_r3_nub.glb": {r:"3", w:"1", nubbed:true},
    "KAT_1u_r4.glb": {r:"4", w:"1"},
    "KAT_1u_r5.glb": {r:"5", w:"1"},
    "KAT_2_25u_r3.glb": {r:"3", w:"2.25"},
    "KAT_2_25u_r4.glb": {r:"4", w:"2.25"},
    "KAT_2_75u_r4.glb": {r:"4", w:"2.75"},
    "KAT_2_75u_r5_convex.glb": {r:"5", w:"2.75", convex:true},
    "KAT_2u_r1.glb": {r:"1", w:"2"},
    "KAT_2u_r2_vertical.glb": {r:"2", w:"2", vertical:true},
    "KAT_2u_r4_vertical.glb": {r:"4", w:"2", vertical:true},
    "KAT_2u_r5.glb": {r:"5", w:"2"},
    "KAT_2u_r5_convex.glb": {r:"5", w:"2", convex:true},
    "KAT_3u_r5.glb": {r:"5", w:"3", convex:true},
    "KAT_6_25u_r5.glb": {r:"5", w:"6.25", convex:true},
    "KAT_6u_r5.glb": {r:"5", w:"6", convex:true},
    "KAT_7u_r5.glb": {r:"5", w:"7", convex:true},
    "KAT_ISO_ENTER.glb": {r:"special", w:"ISO", type:"ISO ENTER"}
}
const dsaList = {
    "1u.glb": {r:"0", w:"1"},
    "1_25u.glb": {r:"0", w:"1.25"}
}
const kamList = {
    "1u.glb": {r:"0", w:"1"},
    "1u_nub.glb": {r:"0", w:"2", nubbed:true},
    "1_25u.glb": {r:"0", w:"1.25"},
    "1_5u.glb": {r:"0", w:"1.5"},
    "1_75u.glb": {r:"0", w:"1.75"},
    "2u.glb": {r:"0", w:"2"},
    // "2u_convex.glb": {r:"0", w:"2", convex:true},
    // "2u_stepped.glb": {r:"0", w:"1.75", stepped:true},
    "2_25u.glb": {r:"0", w:"2.25"},
    "2_75u.glb": {r:"0", w:"2.75"},
    "3u_convex.glb": {r:"0", w:"3"},
    "6u_convex.glb": {r:"0", w:"6"},
    "6_25u_convex.glb": {r:"0", w:"6.25"},
    "7u_convex.glb": {r:"0", w:"7"},
    "ISO_ENTER.glb": {r:"special", w:"ISO", type:"ISO ENTER"}
}

export function init(loadCB) {
    // get the canvas DOM element
    globals.canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    globals.engine = new Engine(globals.canvas, true);

    // call the createScene function
    globals.scene = createScene();
    let loading = [];

    for(const [n,d] of Object.entries(kamList)) {
        loading.push(n);
        SceneLoader.LoadAssetContainer("assets/KAM/", n, globals.scene, function (container) {
            if(!keyAssets.KAM[d.w]) {
                keyAssets.KAM[d.w] = {};
            }
            keyAssets.KAM[d.w][d.r] = {container:container, details:d};
            var i = loading.indexOf(n);
            if (i >= 0) {
                loading.splice(i, 1 );
            }

            if(loading.length == 0) {
                loadCB();
            }
        });
    }

    // for(const [n,d] of Object.entries(katList)) {
    //     SceneLoader.LoadAssetContainer("assets/KAT/", n, globals.scene, function (container) {
    //         if(!keyAssets.KAT[d.w]) {
    //             keyAssets.KAT[d.w] = {};
    //         }
    //         keyAssets.KAT[d.w][d.r] = {container:container, details:d};
    //     });
    // }

    // for(const [n,d] of Object.entries(dsaList)) {
    //     SceneLoader.LoadAssetContainer("assets/DSA/", n, globals.scene, function (container) {
    //         if(!keyAssets.DSA[d.w]) {
    //             keyAssets.DSA[d.w] = {};
    //         }
    //         keyAssets.DSA[d.w][d.r] = {container:container, details:d};
    //     });
    // }

}
