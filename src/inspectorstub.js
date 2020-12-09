import {globals} from './globals.js'
import * as Core from '@babylonjs/core';

export function showInspector() {
    window.BABYLON = { ...Core };
    if(globals.scene.debugLayer.isVisible()) {
        globals.scene.debugLayer.hide();
    } else {
        globals.scene.debugLayer.show();
    }
}