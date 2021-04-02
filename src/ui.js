import {globals} from './globals.js'
import {tuning} from './tuning.js'
import * as coremath from './coremath.js'
import * as boardOps from './boardOps.js'
import * as svg from './svg_export.js'
import * as gbr from './gbr_export.js'
import * as interactions from './interactions.js'
import {PointerEventTypes, Vector3, Space, MeshBuilder, Epsilon} from '@babylonjs/core';
import * as keyPicking from './keyPicking.js'
import {snapCamera} from './gfx.js'
import {Button, Rectangle, Control, TextBlock, InputText, StackPanel, RadioButton, Checkbox, 
        Slider, ScrollViewer, AdvancedDynamicTexture} from '@babylonjs/gui'
import JSZip from 'jszip/dist/jszip';
import Analytics from '@aws-amplify/analytics';
import { GLTFBinaryExtension } from '@babylonjs/loaders/glTF/1.0'

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,      
    maximumFractionDigits: 4,
 });

function format_float(a) { return formatter.format(a)}

function downloadSVGs() {
    Analytics.record({ name: 'SVG export' });
    var zip = new JSZip();
    const bd = globals.boardData;
    let layerInfoCSV = `Layer Name,Material,Thickness(mm),Part Width(mm),PartHeight(mm)\n`
    for(const [cID,cRD] of Object.entries(globals.renderData.cases)) {
        for(const [layerName, layerDef] of Object.entries(boardOps.layerDefs)) {
            let layerData = cRD.layers[layerName];
            zip.file(`${layerName}_${cID}.svg`, svg.exportLayerString(layerData, bd.meta.name, cID));
            layerInfoCSV += `${layerName}_${cID},${layerDef.physicalMat},${layerDef.height},`;
            layerInfoCSV += `${format_float(layerData.outlineBounds.maxs.x-layerData.outlineBounds.mins.x)},`
            layerInfoCSV += `${format_float(layerData.outlineBounds.maxs.z-layerData.outlineBounds.mins.z)}\n`;
        }
    }
    zip.file(`caseBOM.csv`, layerInfoCSV);
    zip.generateAsync({type:"blob"})
        .then(function(content) {
            download(content, `${bd.meta.name}_layers.zip`, 'text/plain');
        });
}

function downloadGBRs() {
    Analytics.record({ name: 'GBR export' });
    var zip = new JSZip();
    const bd = globals.boardData;
    const pcb = globals.pcbData;

    gbr.beginSetExport();
    const pcbName = "pcb";
    zip.file(`${pcbName}.gml`, gbr.exportEdgeCutsLayer(pcb));
    zip.file(`${pcbName}.txt`, gbr.exportDrillFile(pcb));

    zip.file(`${pcbName}.gtl`, gbr.exportLayer(pcb, "copper", "top"));
    zip.file(`${pcbName}.gbl`, gbr.exportLayer(pcb, "copper", "bot"));

    zip.file(`${pcbName}.gts`, gbr.exportLayer(pcb, "mask", "top"));
    zip.file(`${pcbName}.gbs`, gbr.exportLayer(pcb, "mask", "bot"));

    zip.generateAsync({type:"blob"})
        .then(function(content) {
            download(content, `${bd.meta.name}_gerbers.zip`, 'text/plain');
        });
}

function addButton(txt, action, style) {
    style = style?style:{};
    var button = Button.CreateSimpleButton("button", txt);
    button.top = "0px";
    button.left = "0px";
    button.width = style.width?style.width:"50px";
    button.height = style.height?style.height:"50px";
    button.cornerRadius = 0;
    button.thickness = 2;
    button.children[0].color = "#FFFFFF";
    button.children[0].fontSize = 24;
    button.color = "#101010";
    button.background = "#909090";
    //button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;

    button.onPointerClickObservable.add( (a,b) => {
        if(action) {
            action(a,b);
         }
        b.skipNextObservers = true;
    });

    return button;
}

function createScreenBlock() {
    let background = Button.CreateSimpleButton("screenBlock", "");
    background.background = "#000000";
    background.alpha = 0.8;
    background.cornerRadius = 0;
    background.thickness = 0;
    background.top = "0px";
    background.left = "0px";
    background.width = "1";
    background.height = "1";
    background.pointerEnterAnimation = null;
    background.pointerOutAnimation = null;
    background.pointerDownAnimation = null;
    background.pointerUpAnimation = null;
    return background;
}

function modalPop(container, txt, action, escape) {
    let background = createScreenBlock();
    let modalAction = (containedAction) => {
        return (a,b) => {
            if(containedAction) {
                containedAction(a,b);
            }
            background.dispose();
            button.dispose();
            b.skipNextObservers = true;
        }
    }

    const button = addButton(txt, modalAction(action));
    button.zIndex = background.zIndex + 1;
    background.onPointerClickObservable.add( modalAction(escape));
    container.addControl(background);
    container.addControl(button);
}


function modalSelection(container, options, selectionAction, escape, parentButton) {
    let modalAction = (containedAction) => {
        return (a,b) => {
            if(containedAction) {
                containedAction(a,b);
            }
            background.dispose();
            scroller.dispose();
            b.skipNextObservers = true;
        }
    }

    let background = createScreenBlock();
    background.onPointerClickObservable.add(modalAction(escape));

    let width = 150;
    let barSize = 15;
    let scroller = new ScrollViewer("dropdown");
    scroller.zIndex = background.zIndex + 1;
    scroller.width = `${width+barSize}px`;
    scroller.height = "400px";
    scroller.barSize = barSize;
    scroller.thickness = 0;
    scroller.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    scroller.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    scroller.leftInPixels = parentButton.centerX-parentButton.widthInPixels*0.5;
    scroller.topInPixels = parentButton.centerY-parentButton.heightInPixels*0.5 - 400;

    let panel = new StackPanel();
    // panel.height = "400px";
    panel.isPointerBlocker = true;
    panel.isVertical = true;
    for(const o of options) {
        panel.addControl(addButton(o.txt, modalAction((a,b) => {
                if(selectionAction) {
                    selectionAction(o,a,b);
                }
                parentButton.textBlock.text = o.txt;
            }), {width:width}));
    }

    scroller.addControl(panel);

    container.addControl(background);
    container.addControl(scroller);
}

function createDropdown(container, initialOption, options, selectionAction) {
    return addButton(options[initialOption].txt, (e,f) => {
        // modalPop(globals.screengui,"YOOO", () => {console.log("ACK");});
        modalSelection(container, options, selectionAction, () => {}, f.target)
    },
    {width:"150px"});
}
  
let createSlider = function(parent, txt, initialVal, min, max, onChangeFunc) {
    let label = kbgbGUI.addLabel(txt + initialVal)
    var slider = new Slider();
    slider.minimum = min;
    slider.maximum = max;
    slider.value = initialVal;
    slider.height = "15px";
    slider.width = "100px";
    slider.onValueChangedObservable.add(function(value) {
        label.text = txt + value;
        onChangeFunc(value, label);
    });
    parent.addControl(label);   
    parent.addControl(slider); 
}

let pointerController = {
    activeMode: null,
    enterModePosition: null,
    getLocFromInfo: function(pointerInfo) {
        const pickResult = pointerInfo.pickInfo;
        const ray = pickResult.ray;
        const t = -ray.origin.y / ray.direction.y;
        return ray.origin.add(ray.direction.scale(t));
    },
    setMode: function(mode, pointerInfo) {
        if(pointerController.activeMode && pointerController.modes[pointerController.activeMode].exit) {
            pointerController.modes[pointerController.activeMode].exit(pointerInfo);
        }
        pointerController.activeMode = mode;
        if(mode) {
            pointerController.enterModePosition = this.getLocFromInfo(pointerInfo);
            pointerController.modes[mode].enter(pointerInfo);
        }
    },
    processMove: function(pointerInfo) {
        let m = pointerController.modes[pointerController.activeMode];
        if(m && m.move) {
            m.move(pointerInfo);
        }
    },
    processUp: function(pointerInfo) {
        let m = pointerController.modes[pointerController.activeMode];
        if(m && m.up) {
            m.up(pointerInfo);
        }
    },
    modes: {   
        "keyMove": {
            keyInfo: {},
            enter: function(pointerInfo) {
                for (let kId of keyPicking.pickedKeys) {
                    let bd = globals.boardData;
                    let k = bd.layout.keys[kId];
                    pointerController.modes.keyMove.keyInfo[kId] = {x: k.x, y: k.y};
                }
            },
            move: function(pointerInfo) {
                let hitLoc = pointerController.getLocFromInfo(pointerInfo);
                const e = pointerInfo.event;
                console.log(`hitloc ${hitLoc}`)
                kbgbGUI.keyAction((k) => {
                    const savedInfo = pointerController.modes.keyMove.keyInfo[k.id];
                    if(savedInfo) {
                        if(e.shiftKey) {
                            // don't snap to grid
                            k.x = savedInfo.x + (hitLoc.x - pointerController.enterModePosition.x);
                            k.y = savedInfo.y - (hitLoc.z - pointerController.enterModePosition.z);
                        } else {
                            k.x = savedInfo.x + Math.floor(4*(hitLoc.x - pointerController.enterModePosition.x)/tuning.base1U[0])*tuning.base1U[0]/4;
                            k.y = savedInfo.y - Math.floor(4*(hitLoc.z - pointerController.enterModePosition.z)/tuning.base1U[1])*tuning.base1U[1]/4;
                        }
                    }
                });
            },
            up: function(pointerInfo) {
                pointerController.setMode(null,pointerInfo);
                console.log(`pointer up.... mode is ${pointerController.activeMode}`)
            }
        },
        "selection": {
            enter: function(pointerInfo) {

            },
            move: function(pointerInfo) {
                let hitLoc = pointerController.getLocFromInfo(pointerInfo);
                updateSelectionBox(pointerController.enterModePosition,hitLoc);
            },
            up: function(pointerInfo) {
                const e = pointerInfo.event;
                if(!(e.metaKey || e.ctrlKey)) {
                    keyPicking.clearPickedKeys();
                }
                const end = pointerController.getLocFromInfo(pointerInfo);
                const start = pointerController.enterModePosition;
                const mins = {x: Math.min(start.x,end.x),z:Math.min(start.z,end.z)};
                const maxs = {x: Math.max(start.x,end.x),z:Math.max(start.z,end.z)};
                const selectionPoly = new coremath.Poly([new Vector3(mins.x, 0, mins.z),
                    new Vector3(maxs.x, 0, mins.z),
                    new Vector3(maxs.x, 0, maxs.z),
                    new Vector3(mins.x, 0, maxs.z)
                ]);
                let kRD = globals.renderData.keys;
                for (const [id, rd] of Object.entries(kRD)) {
                    for(const [ip, keyPoly] of Object.entries(rd["bezelHoles"])) {
                        if(coremath.polyPolyOverlap(selectionPoly,keyPoly)) {
                            keyPicking.pickKey(id);
                        }
                    }
                }
                updateSelectionBox();
                pointerController.setMode(null,pointerInfo);
            }
        }
    }
}

let selMesh = null;
function updateSelectionBox(start,end) {
    let mats = globals.renderData.mats;
    
    if(selMesh) {
        globals.scene.removeMesh(selMesh);
        selMesh.dispose();
    }

    if(start && end) {
        const mins = {x: Math.min(start.x,end.x),z:Math.min(start.z,end.z)};
        const maxs = {x: Math.max(start.x,end.x),z:Math.max(start.z,end.z)};
        if(maxs.x - mins.x > Epsilon && maxs.z - mins.z > Epsilon) {
            let selOutline = [new Vector3(mins.x, 0, mins.z),
                              new Vector3(maxs.x, 0, mins.z),
                              new Vector3(maxs.x, 0, maxs.z),
                              new Vector3(mins.x, 0, maxs.z)
            ];
    
            selMesh = MeshBuilder.CreateRibbon("selectionOutline",
            {
                pathArray: [coremath.genArrayFromOutline(selOutline, 0.1, 0.1, true),
                    coremath.genArrayFromOutline(selOutline, 0.5, 0.5, true)]
            }, globals.scene);
            selMesh.material = mats["keySel"];
            selMesh.translate(new Vector3(0, 20.5, 0), 1, Space.LOCAL);
        }
    }
}

export const kbgbGUI = {

    addLabel: function(txt) {
        var t = new TextBlock();
        t.width = "80px";
        t.height = ".9";
        t.text = txt;
        t.color = "white";
        t.fontSize = 24;
        return t;
    },
    keyAction: function(action) {
        for (let kId of keyPicking.pickedKeys) {
            let bd = globals.boardData;
            let k = bd.layout.keys[kId];
            action(k);
        }
        boardOps.refreshLayout();
    },
    addKeyActionButton: function(txt, action, keyCode) {
        const appliedKeyAction = () => {this.keyAction(action)}
        if(keyCode) {
            interactions.addBinding("keydown", keyCode, appliedKeyAction)
        }
        return addButton(txt, appliedKeyAction); 
    },
    addCaseSelection: function(holder) {
        let caseOptions = []
        for(const [k,cBD] of Object.entries(globals.boardData.cases)) {
            if(!kbgbGUI.activeCase) {
                kbgbGUI.activeCase = k;
            }
            caseOptions.push({txt:k, val:k});
        }
        let caseSelectionAction = (o,a,b) => {
            kbgbGUI.activeCase = o.val;
        }
        holder.addControl(
            createDropdown(globals.screengui,0, caseOptions, caseSelectionAction));
    },
    modes:{
        "key":{
            cameraMode:"top",
            add: function() {
                interactions.addPointerBinding(PointerEventTypes.POINTERDOWN, (pointerInfo) => {
                    const pickResult = pointerInfo.pickInfo;
                    const ray = pickResult.ray;
                    const t = -ray.origin.y / ray.direction.y;
                    const hitLoc = ray.origin.add(ray.direction.scale(t));

                    let hitPickedKey = false;

                    if (pickResult && pickResult.pickedMesh) {
                        const parent = pickResult.pickedMesh.parent;
                        let name = pickResult.pickedMesh.name;
                        if (parent && globals.boardData.layout.keys[parent.name]) {
                            name = parent.name;
                        }
                        if (keyPicking.pickedKeys.indexOf(name) >= 0) {
                            hitPickedKey = true;
                            pointerController.setMode("keyMove",pointerInfo);
                        }
                    }

                    if(!hitPickedKey) {
                        pointerController.setMode("selection",pointerInfo);
                    }
                });
                interactions.addPointerBinding(PointerEventTypes.POINTERMOVE, (pointerInfo) => {
                    pointerController.processMove(pointerInfo);
                });
                interactions.addPointerBinding(PointerEventTypes.POINTERUP, (pointerInfo) => {
                    pointerController.processUp(pointerInfo);
                });
                interactions.addPointerBinding(PointerEventTypes.POINTERTAP, (pointerInfo) => {
                    const pickResult = pointerInfo.pickInfo;
                    const e = pointerInfo.event;
                    console.log(`pointer ${e.x} ${e.y}`)
                    if (pickResult && pickResult.pickedMesh) {
                        const parent = pickResult.pickedMesh.parent;
                        let name = pickResult.pickedMesh.name;
                        if (parent && globals.boardData.layout.keys[parent.name]) {
                            name = parent.name;
                        }
                        if (globals.boardData.layout.keys[name]) {
                            if (!(e.metaKey || e.ctrlKey)) {
                                keyPicking.clearPickedKeys();
                            }
                            keyPicking.togglePickedKey(name);
            
                            console.log("picked key " + name)
                            // boardOps.refreshOutlines();
                        }
                    }
                });
                // boardOps.removeCaseData();
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
            
                ctrlBar.addControl(addButton("add key", (e) => {
                    boardOps.addKey();
                    boardOps.refreshLayout();
                }, {height:"60px", width:"120px"}));

                ctrlBar.addControl(kbgbGUI.addLabel("Pos: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`◄`, (k) => k.x -= 0.25*tuning.base1U[0], "ArrowLeft"));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`▲`, (k) => k.y -= 0.25*tuning.base1U[1], "ArrowUp"));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`▼`, (k) => k.y += 0.25*tuning.base1U[1], "ArrowDown"));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`►`, (k) => k.x += 0.25*tuning.base1U[0], "ArrowRight"));
            
            
                ctrlBar.addControl(kbgbGUI.addLabel("Rot: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⤹`, (k) => k.rotation_angle -= 2, "q" ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⤸`, (k) => k.rotation_angle += 2, "e" ));
            
                ctrlBar.addControl(kbgbGUI.addLabel("  "));
                let kAction = (keyAction) => {
                        for (let kId of keyPicking.pickedKeys) {
                            let bd = globals.boardData;
                            let k = bd.layout.keys[kId];
                            keyAction(k);
                        }
                };
                let setKeyAction = (key,v) => kAction((k) => {
                    k[key] = v;
                });
                let keyWidths = [1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,4,4.5,5.5,6,6.25,6.5,7,8,9,10];
                // modalPop(globals.screengui,"YOOO", () => {console.log("ACK");});
                let keySelectionAction = (o,a,b) => {
                    if(o.width) {
                        setKeyAction("width", o.width);
                        boardOps.refreshLayout();
                    }
                    else if(o.special) {
                        if(o.special === "ec11") {
                            setKeyAction("encoder_knob_size", o.rad);
                        }
                        setKeyAction("type", o.special);
                        boardOps.refreshLayout();
                    }
                }
                ctrlBar.addControl(
                    createDropdown(globals.screengui,0, [
                        {txt:"1U", width:1 },
                        {txt:"1.25U", width:1.25 },
                        {txt:"1.5U", width:1.5 },
                        {txt:"1.75U", width:1.75 },
                        {txt:"2U", width:2 },
                        {txt:"2.25U", width:2.25 },
                        {txt:"2.75U", width:2.75 },
                        {txt:"3U", width:3 },
                        {txt:"6U", width:6 },
                        {txt:"6.25U", width:6.25 },
                        {txt:"7U", width:7 },
                        {txt:"OLED", special:"oled"},
                        {txt:"EC11-18", special:"ec11", rad:18},
                        {txt:"EC11-19", special:"ec11", rad:19.05},
                        {txt:"EC11-30", special:"ec11", rad:30},
                        {txt:"ISO"},
                        {txt:"1.75U STEPPED"}], keySelectionAction));

                let flipStabAction = (v) => kAction((k) => {
                    k.flipStab = v;
                });

                var checkbox = new Checkbox();
                checkbox.width = "10px";
                checkbox.height = "10px";
                checkbox.isChecked = false;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(value) {
                    flipStabAction(value);
                    boardOps.refreshLayout();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("STAB: "));
                ctrlBar.addControl(checkbox);

                ctrlBar.addControl(kbgbGUI.addLabel("  "));

                ctrlBar.addControl(kbgbGUI.addKeyActionButton("del", (k) => {
                    boardOps.removeKey(k.id);
                }, {height:"60px", width:"120px"}));
                
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
                boardOps.setFlatRotations();
            },
            remove: () => {
                interactions.removePointerBinding(PointerEventTypes.POINTERDOWN);
                interactions.removePointerBinding(PointerEventTypes.POINTERMOVE);
                interactions.removePointerBinding(PointerEventTypes.POINTERUP);
                interactions.removePointerBinding(PointerEventTypes.POINTERTAP);
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
                keyPicking.clearPickedKeys();
                boardOps.refreshPCBs();
                boardOps.refreshCase();
            }
        },
        "case":{
            cameraMode:"front",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);

                ctrlBar.addControl(kbgbGUI.addLabel("Type: "));

                var addRadio = function(text, parent) {

                    var button = new RadioButton();
                    button.width = "20px";
                    button.height = "20px";
                    button.color = "white";
                    button.background = "green";     
            
                    button.onIsCheckedChangedObservable.add(function(state) {
                        if(state) {
                            globals.boardData.cases[kbgbGUI.activeCase].caseType = text;
                            boardOps.refreshCase()
                        }
                    }); 
            
                    var header = Control.AddHeader(button, text, "100px", { isHorizontal: true, controlFirst: true });
                    header.height = "30px";
            
                    parent.addControl(header);    
                }

                let radioCtrl = new StackPanel();  
                radioCtrl.height = "1";
                radioCtrl.width = "200px";
                radioCtrl.isVertical = true;
                addRadio("convex", radioCtrl);
                addRadio("concave", radioCtrl);
                ctrlBar.addControl(radioCtrl);

                createSlider(ctrlBar, "Fit: ", globals.boardData.cases[kbgbGUI.activeCase].bezelConcavity, 0, 1, (v) => {
                    globals.boardData.cases[kbgbGUI.activeCase].bezelConcavity = v; boardOps.refreshCase();
                });

                var checkbox = new Checkbox();
                checkbox.width = "10px";
                checkbox.height = "10px";
                console.log(`case: ${kbgbGUI.activeCase}`)
                console.log(globals.boardData.cases);
                checkbox.isChecked = globals.boardData.cases[kbgbGUI.activeCase].forceSymmetrical;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(value) {
                    globals.boardData.cases[kbgbGUI.activeCase].forceSymmetrical = value;
                    boardOps.refreshCase();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                ctrlBar.addControl(checkbox);

                var ftbx = new Checkbox();
                ftbx.width = "10px";
                ftbx.height = "10px";
                ftbx.isChecked = globals.boardData.cases[kbgbGUI.activeCase].hasFeet;
                ftbx.color = "green";
                ftbx.onIsCheckedChangedObservable.add(function(value) {
                    globals.boardData.cases[kbgbGUI.activeCase].hasFeet = value;
                    boardOps.refreshCase();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("FEET: "));
                ctrlBar.addControl(ftbx);

                createSlider(ctrlBar, "Thickness: ", globals.boardData.cases[kbgbGUI.activeCase].bezelThickness, 5.5, 50, (v) => {
                    globals.boardData.cases[kbgbGUI.activeCase].bezelThickness = v; boardOps.refreshCase();
                });
                createSlider(ctrlBar, "Fillet: ", globals.boardData.cases[kbgbGUI.activeCase].caseCornerFillet, 0.5, 30, (v) => {
                    globals.boardData.cases[kbgbGUI.activeCase].caseCornerFillet = v; boardOps.refreshCase();
                }); 
                
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                boardOps.setNaturalRotations();
            },
            remove: () => {
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
            }
        },
        "pcb":{
            cameraMode:"rear",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);
            
                let createCheckbox = (prop) => {
                    var checkbox = new Checkbox()
                    checkbox.width = "20px";
                    checkbox.height = "20px";
                    checkbox.isChecked = globals.boardData.cases[kbgbGUI.activeCase][prop];
                    checkbox.color = "orange";
                    checkbox.onIsCheckedChangedObservable.add(function(value) {
                        globals.boardData.cases[kbgbGUI.activeCase][prop] = value;
                        boardOps.refreshCase();
                    });
                    return checkbox;
                }

                let createTextInput = (prop) => {
                    var input = new InputText();
                    input.width = "80px";
                    input.maxWidth = "80px";
                    input.height = "40px";
                    input.text = ""+globals.boardData.cases[kbgbGUI.activeCase][prop];
                    input.color = "white";
                    input.background = "green";
                    input.onBlurObservable.add((v) => {
                        console.log(`usb port moving to ${v.text}`);
                        let f = parseFloat(v.text);
                        if(f) {
                            globals.boardData.cases[kbgbGUI.activeCase][prop] = f;
                        }
                        input.text = ""+globals.boardData.cases[kbgbGUI.activeCase][prop];
                        boardOps.refreshCase();
                    });
                    return input;
                } 

                ctrlBar.addControl(kbgbGUI.addLabel("USB: "));
                ctrlBar.addControl(createCheckbox("hasUSBPort"));
                // ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                // ctrlBar.addControl(createCheckbox("forcePCBSymmetrical"));
                ctrlBar.addControl(kbgbGUI.addLabel("LOC: "));
                ctrlBar.addControl(createTextInput("usbPortPos"))
                ctrlBar.addControl(kbgbGUI.addLabel("Center? "));
                ctrlBar.addControl(createCheckbox("usbPortCentered"));

                createSlider(ctrlBar, "Screw span: ", globals.boardData.cases[kbgbGUI.activeCase].maxScrewSpan, 40, 300, (v) => {
                    globals.boardData.cases[kbgbGUI.activeCase].maxScrewSpan = v; boardOps.refreshCase();
                }); 
                createSlider(ctrlBar, "Screw offset: ", globals.boardData.cases[kbgbGUI.activeCase].screwBezelBias, 0.0, 1.0, (v) => {
                    globals.boardData.cases[kbgbGUI.activeCase].screwBezelBias = v; boardOps.refreshCase();
                }); 

                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                boardOps.setNaturalRotations();
            },
            remove: () => {
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
            }
        },
        "details":{
            cameraMode:"split",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);

                let plateMatSelection = (o,a,b) => {
                    boardOps.setPlateMat(kbgbGUI.activeCase, o.val);
                }
                ctrlBar.addControl(
                    createDropdown(globals.screengui,0, [
                        {txt:"alu",val:"aluminium"},
                        {txt:"pom",val:"pom_white"},
                        {txt:"pom(b)",val:"pom_black"},
                        {txt:"steel",val:"steel"},
                        {txt:"fr4",val:"fr4"},
                        {txt:"pc",val:"pc_cl"}
                    ], plateMatSelection));


                let caseMatSelection = (o,a,b) => {
                    boardOps.setCaseMat(kbgbGUI.activeCase, o.val);
                }
                ctrlBar.addControl(
                    createDropdown(globals.screengui,0, [
                        {txt:"smoke",val:"ac_smoke"},
                        {txt:"blue",val:"ac_blue"},
                        {txt:"purp",val:"ac_purple"},
                        {txt:"yello",val:"ac_yellow"},
                        {txt:"alu",val:"aluminium"},
                        {txt:"pom",val:"pom_white"},
                        {txt:"pom(b)",val:"pom_black"},
                        {txt:"stl",val:"steel"}
                    ], caseMatSelection));

                ctrlBar.addControl(addButton("export SVGs", () => {
                            downloadSVGs();
                        }, {height:"60px",width:"120px"}));
                ctrlBar.addControl(addButton("export GBRs", () => {
                            downloadGBRs();
                        }, {height:"60px",width:"120px"}));
                ctrlBar.addControl(addButton("save layout", () => {
                            download(boardOps.saveKeyboard(), `${globals.boardData.meta.name}.kbd`, 'text/plain');
                        }, {height:"60px",width:"120px"}));
                ctrlBar.addControl(addButton("load layout", () => {
                            document.getElementById("loadKBD").click();
                        }, {height:"60px",width:"120px"}));
                
                ctrlBar.addControl(addButton("import kle", (e) => {
                            document.getElementById("loadKLE").click();
                        }, {height:"60px", width:"120px"}));

                let txt = kbgbGUI.addLabel("WORK IN PROGRESS");

                txt.width = "260px";
                ctrlBar.addControl(txt);
                

                globals.screengui.addControl(ctrlBar);
                
                let rtBar = new StackPanel();  
                rtBar.width = ".2";
                rtBar.isPointerBlocker = true;
                rtBar.isVertical = true;
                rtBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                let addSVGButton = function(layerName) {
                    let label = kbgbGUI.addLabel(layerName)
                    label.height = "40px"
                    var slider = new Slider();
                    slider.minimum = 0;
                    slider.maximum = 1;
                    slider.value = 1;
                    slider.height = "15px";
                    slider.width = "100px";
                    slider.onValueChangedObservable.add(function(value) {
                        tuning.layerOffsets[layerName] = value;
                    });
                    rtBar.addControl(label);   
                    rtBar.addControl(slider); 
                }

                addSVGButton("bezel");
                addSVGButton("plate");
                addSVGButton("edge");
                addSVGButton("bottom");
                addSVGButton("feet");
                // addSVGButton("pcb");

                globals.screengui.addControl(rtBar);

                kbgbGUI.rtBar = rtBar;
                kbgbGUI.activeModeCtrl = ctrlBar;
                boardOps.expandLayers();
            },
            remove: () => {
                boardOps.collapseLayers();
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
                globals.screengui.removeControl(kbgbGUI.rtBar);
            }
        },
    },
    setGUIMode: function(mode) {
        if(mode == kbgbGUI.activeMode) return;

        if(kbgbGUI.modes[kbgbGUI.activeMode]) {
            kbgbGUI.modes[kbgbGUI.activeMode].remove();
        }
        if(kbgbGUI.modes[mode]) {
            kbgbGUI.modes[mode].add();
            snapCamera(kbgbGUI.modes[mode].cameraMode);
        }
        kbgbGUI.activeMode = mode;
    },
    addModeGUI: function() {
        globals.screengui = AdvancedDynamicTexture.CreateFullscreenUI("screenUI");
        globals.screengui.renderScale = 1.0;

        let ctrlBar = new StackPanel();  
        ctrlBar.height = "40px";
        ctrlBar.isPointerBlocker = true;
        ctrlBar.isVertical = false;
        //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        ctrlBar.addControl(addButton("layout", () => {kbgbGUI.setGUIMode("key")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("case", () => {kbgbGUI.setGUIMode("case")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("parts", () => {kbgbGUI.setGUIMode("pcb")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("layers", () => {kbgbGUI.setGUIMode("details")}, {height:"1",width:"120px"}));

        kbgbGUI.modeCtrl = ctrlBar;
        globals.screengui.addControl(ctrlBar);
    }
}