import {globals} from './globals.js'
import {tuning} from './tuning.js'
import {Engine, ArcRotateCamera, CubeTexture, Scene, Vector3, VertexBuffer, 
        VertexData, Color3, DefaultRenderingPipeline, StandardMaterial, PBRMaterial, PBRMetallicRoughnessMaterial,
        Animation, QuinticEase, EasingFunction, Texture, SceneLoader, Matrix, MeshBuilder, Color4} from 'babylonjs'
import {GLTFFileLoader} from "babylonjs";

export function createKeyMaterial(name,color) {
    let mats = globals.renderData.mats;
    if(!mats[name])
    {
        mats[name] = new PBRMetallicRoughnessMaterial(name, globals.scene);
        mats[name].metallic = 0;
        mats[name].transparencyMode = PBRMaterial.PBRMATERIAL_OPAQUE;
        mats[name].roughness = 0.6;
        mats[name].baseColor = color;
    }
}

export function setMatFromTuning(matType, pmName) {
    let mats = globals.renderData.mats;
    let pmData = tuning.caseMats[pmName];

    if(!mats[matType])
    {
        mats[matType] = new PBRMaterial(matType, globals.scene);
    }

    let mat = mats[matType];
    for(const [k,v] of Object.entries(pmData)) {
        if(Array.isArray(v)) {
            mat[k] = new Color3(v[0],v[1],v[2]);
        } else {
            mat[k] = v;
        }
    }

    if(mat.alpha <= 0.99) {
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
    }
    else {
        mat.subSurface.isRefractionEnabled = false;
        mat.subSurface.isTranslucencyEnabled = false;
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

    setMatFromTuning("case", "ac_smoke");

    setMatFromTuning("plate", "aluminium");

    let switchMatName = "switch";
    if(!mats[switchMatName])
    {
        mats[switchMatName] = new PBRMaterial(switchMatName, globals.scene);
        mats[switchMatName].metallic = 0;
        mats[switchMatName].transparencyMode = PBRMaterial.PBRMATERIAL_OPAQUE;
        mats[switchMatName].roughness = 0.7;
        mats[switchMatName].baseColor = new Color3(0.1, 0.1, 0.1);
    }

    let pcbMatName = "fr4";
    if(!mats[pcbMatName])
    {
        mats[pcbMatName] = new PBRMetallicRoughnessMaterial(pcbMatName, globals.scene);
        mats[pcbMatName].metallic = 0;
        mats[pcbMatName].transparencyMode = PBRMaterial.PBRMATERIAL_OPAQUE;
        mats[pcbMatName].roughness = 0.2;
        mats[pcbMatName].baseColor = new Color3(45/255, 90/255, 10/255);
    }

    createKeyMaterial("key", new Color3(0.9, 0.9, 0.9));
}

export function snapCamera(mode) {
    const mins = [100000,100000];
    const maxs = [-100000,-100000];
    for(const [k,cRD] of Object.entries(globals.renderData.cases)) {
        for(let i = 0; i < 2; i++) {
            mins[i] = Math.min(mins[i],cRD.bounds.mins[i]);
            maxs[i] = Math.max(maxs[i],cRD.bounds.maxs[i]);
        }
    }

    const bd = globals.boardData;
    // TODO: fix this to work with multiple cases
    const bezelAdd = 30;
    const w = maxs[0] - mins[0] + bezelAdd * 2;
    const h = maxs[1] - mins[1] + bezelAdd * 2;
    const dim = Math.max(w,h);
    let cam = globals.camera;
    cam.setTarget(new Vector3(mins[0] + (maxs[0] - mins[0]) / 2.0,
        0, mins[1] + (maxs[1] - mins[1]) / 2.0));
    
    let nextAlpha = -Math.PI / 3.5;
    let nextBeta = Math.PI / 3.5;

    cam.inputs.attached.keyboard.detachControl();
    cam.inputs.attached.pointers.detachControl();
    if(mode != "top") {
        cam.inputs.attachInput(cam.inputs.attached.pointers);
        cam.inputs.attachInput(cam.inputs.attached.keyboard);
    }
    
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

const debugLineSystems = {};
export function drawDbgLines(groupName, dbgLines, lineColors) {
    if( debugLineSystems[groupName] ) {
        globals.scene.removeMesh(debugLineSystems[groupName])
    }
    debugLineSystems[groupName] = MeshBuilder.CreateLineSystem(groupName, {lines: dbgLines, colors:lineColors}, globals.scene);
}

export function drawDbgOutline(groupName, points, startColor, endColor, close) {
    let dbglines = [];
    let linecolors = [];
    startColor = startColor || new Color4(1,0,0,1);
    endColor = endColor || new Color4(0,0,1,1);
    let end = close?points.length:(points.length-1);
    for(let i = 0; i < end; i++) {
        dbglines.push([points[i],points[(i+1)%points.length]])
        linecolors.push([startColor,endColor]);
    }
    drawDbgLines(groupName, dbglines, linecolors);
}

export function setEnvironmentLight(path) {
    if(!globals.hdrTextures) globals.hdrTextures = {};
    if(!globals.hdrTextures[path]) {
        globals.hdrTextures[path] = CubeTexture.CreateFromPrefilteredData(path, globals.scene);
    }
    globals.scene.environmentTexture = globals.hdrTextures[path];

    // if(globals.currentSkybox) {
    //     globals.currentSkybox.material.reflectionTexture = globals.hdrTextures[path].clone();
    //     if (globals.currentSkybox.material.reflectionTexture) {
    //         globals.currentSkybox.material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    //     }
    // } else {
    //     globals.currentSkybox = globals.scene.createDefaultSkybox(globals.hdrTextures[path], true, (globals.scene.activeCamera.maxZ - globals.scene.activeCamera.minZ) / 2, 0.3);
    // }
}

function createScene() {
    const engine = globals.engine;

    // create a basic BJS Scene object
    var scene = new Scene(engine);

    var camera = new ArcRotateCamera("Camera", -Math.PI / 2, 0, 100, new Vector3(0, 0, 0), scene);

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

    scene.clearColor = new Color3(0.7, 0.8, 0.8).toLinearSpace();

    // var pipeline = new DefaultRenderingPipeline(
    //     "defaultPipeline", // The name of the pipeline
    //     true, // Do you want the pipeline to use HDR texture?
    //     scene, // The scene instance
    //     [camera] // The list of cameras to be attached to
    // );

    scene.getOutlineRenderer().zOffset = 10;

    // return the created scene
    return scene;
}

export const switchAsset = {container:null,details:null};

export const keyAssets = {"KAT":{},"DSA":{},"KAM":{},"KRK":{}};
export function getKeycap(profile, width, height, opts) {
    const prof = keyAssets[profile];
    if(!prof) return null;

    let xForm = Matrix.Identity();
    if(profile == "KAM") {
        if(opts.vertical) {
            width = height;
            height = 1;

            xForm = Matrix.RotationY(Math.PI / 2);
        } else {
            xForm = Matrix.RotationY(Math.PI);
        }
        xForm = xForm.multiply(Matrix.Scaling(-1,1,1));
    }
    else if(profile == "KAT") {
        xForm = Matrix.RotationY(Math.PI);
    }
    else if(profile == "KRK") {
        xForm = Matrix.Scaling(-1,1,1);
    }

    const sized = prof[width];
    if(!sized) return null;

    let best = null;
    let bestScore = -1;

    for(const [r,m] of Object.entries(sized)) {
        const container = m.container;
        const d = m.details;
        let score = 0;
        for(const [k,v] of Object.entries(opts)) {
            if( d[k] == v) {
                score += 1;
            }
        }
        if(score > bestScore) {
            best = container;
            bestScore = score;
        }
    }
    return {container:best,preXform:xForm};
}

const krkList = {
    "1r_1u.glb": {r:"1", w:"1"},
    "ISO_enter.glb": {r:"special", w:"ISO", type:"ISO ENTER", nub:false, stepped:false}
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
    "KAT_1u_r3_nub.glb": {r:"3", w:"1", nub:true},
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
    "1u.glb": {r:"0", w:"1", nub:false, stepped:false},
    "1u_nub.glb": {r:"0", w:"1", nub:true, stepped:false},
    "1_25u.glb": {r:"0", w:"1.25", nub:false, stepped:false},
    "1_5u.glb": {r:"0", w:"1.5", nub:false, stepped:false},
    "1_75u.glb": {r:"0", w:"1.75", nub:false, stepped:false},
    "1_75u_stepped.glb": {r:"0", w:"1.25", nub:false, stepped:true},
    "2u.glb": {r:"0", w:"2", nub:false, stepped:false},
    // "2u_convex.glb": {r:"0", w:"2", convex:true},
    "2_25u.glb": {r:"0", w:"2.25", nub:false, stepped:false},
    "2_75u.glb": {r:"0", w:"2.75", nub:false, stepped:false},
    "3u_convex.glb": {r:"0", w:"3", nub:false, stepped:false},
    "6u_convex.glb": {r:"0", w:"6", nub:false, stepped:false},
    "6_25u_convex.glb": {r:"0", w:"6.25", nub:false, stepped:false},
    "7u_convex.glb": {r:"0", w:"7", nub:false, stepped:false},
    "ISO_ENTER.glb": {r:"special", w:"ISO", type:"ISO ENTER", nub:false, stepped:false}
}


export function init(loadCB) {
    // get the canvas DOM element
    globals.canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    globals.engine = new Engine(globals.canvas, true);

    // call the createScene function
    globals.scene = createScene();
    let loading = [];

    SceneLoader.LoadAssetContainer("assets/", "MX_SWITCH_opt.glb", globals.scene, function (container) {
        switchAsset.container = container;
        loadCB();
    });

    for(const [n,d] of Object.entries(kamList)) {
        loading.push(n);
        SceneLoader.LoadAssetContainer("assets/KAM/", n, globals.scene, function (container) {
            if(!keyAssets.KAM[d.w]) {
                keyAssets.KAM[d.w] = [];
            }
            keyAssets.KAM[d.w].push({container:container, details:d});
            var i = loading.indexOf(n);
            if (i >= 0) {
                loading.splice(i, 1 );
            }

            if(loading.length == 0) {
                loadCB();
            }
        });
    }

    for(const [n,d] of Object.entries(krkList)) {
        loading.push(n);
        SceneLoader.LoadAssetContainer("assets/KRK/", n, globals.scene, function (container) {
            if(!keyAssets.KRK[d.w]) {
                keyAssets.KRK[d.w] = [];
            }
            keyAssets.KRK[d.w].push({container:container, details:d});
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
