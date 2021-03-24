import {globals} from './globals.js'
import {tuning} from './tuning.js'
import {kbgbGUI} from './ui.js'
import * as boardOps from './boardOps.js'
import * as gfx from './gfx.js'
import * as dxf from './dxf_export.js'
import * as kle from '@ijprest/kle-serial';
import * as inspectorStub from './inspectorstub.js'
import * as interactions from './interactions.js'
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import {PointerEventTypes} from '@babylonjs/core';

// import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Auth.configure({ mandatorySignIn: false});

const hdris = [
    "assets/carpentry_shop.env",
    "assets/studio_small.env",
    "assets/photo_studio.env",
    "assets/sculpture_exhibition.env",
    "assets/environment.dds"
];

let hdriIdx = 2;

function loadKeyboardFromPath(path) {
    fetch(path)
    .then(response => response.json())
    .then(data => {
        boardOps.loadKeyboard(data);
    });
}

function loadKeyboardFromKLE1(txt) {
    Analytics.record({ name: 'Manual KLE1 Import' });
    let old_kle = JSON.parse(txt);

    var new_kle = kle.Serial.deserialize(old_kle);
    boardOps.loadKeyboard(new_kle);
}

function loadKeyboardFromKBD(txt) {
    Analytics.record({ name: 'KBD Load' });
    boardOps.loadKeyboard(JSON.parse(txt));
}

function initKBGB() {
    Analytics.record({ name: 'initKBGB' });
    gfx.init(boardOps.refreshKeyboard);


    const scene = globals.scene;

    scene.onPointerObservable.add((pointerInfo) => {
        const e = pointerInfo.event;
        switch (pointerInfo.type) {
            // case PointerEventTypes.POINTERDOWN:
            //     console.log("POINTER DOWN");
            //     break;
            // case PointerEventTypes.POINTERUP:
            //     console.log("POINTER UP");
            //     break;
            // case PointerEventTypes.POINTERMOVE:
            //     console.log("POINTER MOVE");
            //     break;
            // case PointerEventTypes.POINTERWHEEL:
            //     console.log("POINTER WHEEL");
            //     break;
            case PointerEventTypes.POINTERPICK:
                const pickResult = pointerInfo.pickInfo;
                if (pickResult && pickResult.pickedMesh) {
                    if(kbgbGUI.activeMode == "key") {
                        const parent = pickResult.pickedMesh.parent;
                        let name = pickResult.pickedMesh.name;
                        if (parent && globals.boardData.layout.keys[parent.name]) {
                            name = parent.name;
                        }
                        if (globals.boardData.layout.keys[name]) {
                            if (!(e.metaKey || e.ctrlKey)) {
                                boardOps.clearPickedKeys();
                            }
                            boardOps.togglePickedKey(name);
            
                            console.log("picked key " + name)
                            // boardOps.refreshOutlines();
                        }
                    }
                }
                break;
            // case PointerEventTypes.POINTERTAP:
            //     console.log("POINTER TAP");
            //     break;
            // case PointerEventTypes.POINTERDOUBLETAP:
            //     console.log("POINTER DOUBLE-TAP");
            //     break;
        }
    });

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
        'testkbs/fake_alice_split.kle',
        'testkbs/kle_atreus.kle',  //5
        'testkbs/basis-mono-og.kle',
        'testkbs/basis-stagger-3.kle',
        'testkbs/kle-ergodox.kle',
        'testkbs/foggy_sp_knobs.kle',
        'testkbs/reddit-9d-ortho.kle', //10
        'testkbs/boston-noISO.kle',
        'testkbs/atreus_solo.kle',
        'testkbs/blank.kle', 
        'testkbs/onekey.kle',
        'testkbs/twokey.kle', //15
        'testkbs/threekey.kle',
        'testkbs/threekey_split.kle',
        'testkbs/threekeyoffset.kle',
        'testkbs/one_bigass.kle',
        'testkbs/twoonone.kle', //20
        'testkbs/three_key_vtest.kle',
        'testkbs/fourkeygap.kle',
        'testkbs/atreus_row.kle',
        'testkbs/keysize_test.kle' 
    ]
    let kbdidx = 5;
    // load a keyboard
    loadKeyboardFromPath(keyboards[kbdidx]);

    // the canvas/window resize event handler
    window.addEventListener('resize', function () {
        globals.engine.resize();
    });

    document.getElementById("loadKLE").onchange = e => { 
        // getting a hold of the file reference
        var file = e.target.files[0]; 
    
        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
    
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            // console.log(content);
            loadKeyboardFromKLE1(content);
        }
    }
    //input.click();
    document.getElementById("loadKBD").onchange = e => { 
        // getting a hold of the file reference
        var file = e.target.files[0]; 
    
        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
    
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            // console.log(content);
            loadKeyboardFromKBD(content);
        }
    }

    interactions.init();
    interactions.addBinding('keydown', 'i', e => inspectorStub.showInspector());
    interactions.addBinding('keydown', 'k', e => {
        tuning.keyShape = tuning.keyShape?null:"square";
        boardOps.refreshKeyboard();
    });
    interactions.addBinding('keydown', 'c', e => {
        tuning.drawCase = tuning.drawCase?false:true;
        boardOps.refreshKeyboard();
    });
    interactions.addBinding('keydown', 'p', e => {
        tuning.drawPlate = tuning.drawPlate?false:true;
        boardOps.refreshKeyboard();
    });
    interactions.addBinding('keydown', 'o', e => {
        tuning.drawPCB = tuning.drawPCB?false:true;
        boardOps.refreshKeyboard();
    });
    interactions.addBinding('keydown', 'b', e => {
        tuning.drawBezel = tuning.drawBezel?false:true;
        boardOps.refreshKeyboard();
    });
    interactions.addBinding('keydown', 'r', e => {
        kbdidx = (kbdidx+1)%keyboards.length;
        loadKeyboardFromPath(keyboards[kbdidx]);
    });
    interactions.addBinding('keydown', 'l', e => {
        hdriIdx = (hdriIdx+1)%hdris.length;
        gfx.setEnvironmentLight(hdris[hdriIdx]);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    initKBGB();
});