import {globals} from './globals.js'
import {tuning} from './tuning.js'
import {kbgbGUI} from './ui.js'
import * as boardOps from './boardOps.js'
import * as gfx from './gfx.js'
import * as dxf from './dxf_export.js'

const hdris = [
    "assets/carpentry_shop.env",
    "assets/studio_small.env",
    "assets/photo_studio.env",
    "assets/sculpture_exhibition.env",
    "assets/environment.dds"
];

let hdriIdx = 2;

function initKBGB() {
    gfx.init();

    gfx.setEnvironmentLight(hdris[hdriIdx]);

    kbgbGUI.addModeGUI();

    // run the render loop
    globals.engine.runRenderLoop(function () {
        globals.scene.render();
    });

    let keyboards = [
        'testkbs/hy_nova.kle',
        'testkbs/ansi104.kle',
        'testkbs/fc660m.kle',
        'testkbs/fake_alice.kle',
        'testkbs/kle_atreus.kle',
        'testkbs/basis-mono.kle',
        'testkbs/basis-stagger-3.kle',
        'testkbs/kle-ergodox.kle',
        'testkbs/foggy_sp_knobs.kle',
        'testkbs/reddit-9d-ortho.kle',
        'testkbs/blank.kle',
        'testkbs/onekey.kle',
        'testkbs/twokey.kle',
        'testkbs/threekey.kle',
        'testkbs/threekeyoffset.kle',
        'testkbs/keysize_test.kle'
    ]
    let kbdidx = 2;

    // load a keyboard
    boardOps.loadKeyboard(keyboards[kbdidx]);

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
        if( event.key == 'k' ) {
            tuning.keyShape = tuning.keyShape?null:"square";
            boardOps.refreshKeyboard();
        }
        if( event.key == 'c' ) {
            tuning.drawCase = tuning.drawCase?false:true;
            boardOps.refreshKeyboard();
        }
        if( event.key == 'p' ) {
            tuning.drawPlate = tuning.drawPlate?false:true;
            boardOps.refreshKeyboard();
        }
        if( event.key == 'e' ) {
            tuning.drawPCB = tuning.drawPCB?false:true;
            boardOps.refreshKeyboard();
        }
        if( event.key == 'b' ) {
            tuning.drawBezel = tuning.drawBezel?false:true;
            boardOps.refreshKeyboard();
        }
        if( event.key == 'r' ) {
            kbdidx = (kbdidx+1)%keyboards.length;
            boardOps.loadKeyboard(keyboards[kbdidx]);
        }
        if( event.key == 'l' ) {
            hdriIdx = (hdriIdx+1)%hdris.length;
            gfx.setEnvironmentLight(hdris[hdriIdx]);
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
            boardOps.refreshOutlines();
        }
    }
});