import {globals} from './globals.js';
import * as coremath from './coremath.js';
import {Vector3, Space, MeshBuilder, Matrix} from '@babylonjs/core'

export const pickedKeys = []

export function refreshOutlines() {
    let kRD = globals.renderData.keys;
    let oRD = globals.renderData.uiOutlines;
    let mats = globals.renderData.mats;

    for (const [k, o] of Object.entries(oRD)) {
        globals.scene.removeMesh(o);
        o.dispose();
    }

    for (const id of pickedKeys) {
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

export function clearPickedKeys() {
    let kRD = globals.renderData.keys;
    for (const id of pickedKeys) {
        if (!kRD[id]) {
            console.log("picked nonexistant key");
        } else {
            let rd = kRD[id];
            rd.keycap.renderOverlay = false;
            for (const child of rd.keycap.getChildMeshes()){			
                child.renderOverlay = false; 
            }
        }
    }
    pickedKeys.length = 0;
}

export function pickKey(id) {
    let kRD = globals.renderData.keys;

    if (!kRD[id]) {
        console.log("picked nonexistant key");
    } else {
        let rd = kRD[id];
        if (pickedKeys.indexOf(id) < 0) {
            rd.keycap.renderOverlay = true;

            for (const child of rd.keycap.getChildMeshes()){			
                child.renderOverlay = true; 
            }
            pickedKeys.push(id);
        }
    }
}

export function togglePickedKey(id) {
    let kRD = globals.renderData.keys;

    if (!kRD[id]) {
        console.log("picked nonexistant key");
    } else {
        let rd = kRD[id];
        if (pickedKeys.indexOf(id) >= 0) {
            rd.keycap.renderOverlay = false;
            for (const child of rd.keycap.getChildMeshes()){			
                child.renderOverlay = false; 
            }
            pickedKeys.splice(pickedKeys.indexOf(id), 1)
        } else {
            rd.keycap.renderOverlay = true;

            for (const child of rd.keycap.getChildMeshes()){			
                child.renderOverlay = true; 
            }
            pickedKeys.push(id);
        }
    }
}