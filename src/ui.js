import {globals} from './globals.js'
import {tuning} from './tuning.js'
import * as boardOps from './boardOps.js'
import * as svg from './svg_export.js'
import {snapCamera} from './gfx.js'
import {Button, Control, TextBlock, InputText, StackPanel, RadioButton, Checkbox, Slider, ScrollViewer, AdvancedDynamicTexture} from '@babylonjs/gui'

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function downloadSVG(layerName) {
    const bd = globals.boardData;
    download(svg.exportLayerString(layerName), `${bd.meta.name}_${layerName}.svg`, 'text/plain');
}

export const kbgbGUI = {
    addButton: function(txt, action, style) {
        style = style?style:{};
        var button = Button.CreateSimpleButton("button", txt);
        button.top = "0px";
        button.left = "0px";
        button.width = style.width?style.width:"50px";
        button.height = style.height?style.height:"50px";
        button.cornerRadius = 5;
        button.thickness = 2;
        button.children[0].color = "#FFFFFF";
        button.children[0].fontSize = 24;
        button.color = "#101010";
        button.background = "#909090";
        //button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    
        button.onPointerClickObservable.add(action);
    
        return button;
    },
    addLabel: function(txt) {
        var t = new TextBlock();
        t.width = "80px";
        t.height = ".9";
        t.text = txt;
        t.color = "white";
        t.fontSize = 24;
        return t;
    },
    addKeyActionButton: function(txt, keyAction) {
        return kbgbGUI.addButton(txt, function () {
            for (let kId of globals.pickedKeys) {
                let bd = globals.boardData;
                let k = bd.layout.keys[kId];
                keyAction(k);
            }
            boardOps.refreshKeyboard();
        }); 
    },
    modes:{
        "key":{
            cameraMode:"top",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
            
                ctrlBar.addControl(kbgbGUI.addButton("load kle", (e) => {
                    document.getElementById("loadKLE").click();
                }, {height:"60px", width:"120px"}));

                ctrlBar.addControl(kbgbGUI.addLabel("Pos: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`◄`, (k) => k.x -= 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`▲`, (k) => k.y -= 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`▼`, (k) => k.y += 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`►`, (k) => k.x += 0.25 ));
            
            
                ctrlBar.addControl(kbgbGUI.addLabel("Rot: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⤹`, (k) => k.rotation_angle -= 2 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⤸`, (k) => k.rotation_angle += 2 ));
            
                // ctrlBar.addControl(kbgbGUI.addButton("Size", (e) => {
                //     var sv = new ScrollViewer();
                //     sv.width = "500px";
                //     sv.height = "400px";
                //     sv.background = "orange";
                
                //     globals.screengui.addControl(sv);
                // }))

                let keyWidths = [1,1.25,1.5,1.75,2,2.25,2.5,2.75,3,4,4.5,5.5,6,6.25,6.5,7,8,9,10];
                ctrlBar.addControl(kbgbGUI.addLabel("W: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬌`, (k) => {
                    const currIdx = keyWidths.indexOf(k.width);
                    if(currIdx != -1 && currIdx > 1) {
                        k.width = keyWidths[currIdx-1];
                    }
                }));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬄`, (k) => {
                    const currIdx = keyWidths.indexOf(k.width);
                    if(currIdx != -1 && currIdx < keyWidths.length-1) {
                        k.width = keyWidths[currIdx+1];
                    }
                }));
            
                // ctrlBar.addControl(kbgbGUI.addLabel("H: "));
                // ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬍`, (k) => k.height += 0.25 ));
                // ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⇳`, (k) => k.height -= 0.25 ));
                
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
                boardOps.setFlatRotation();
            },
            remove: () => {
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
                globals.pickedKeys = [];
                boardOps.refreshOutlines();
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
            
                ctrlBar.addControl(kbgbGUI.addLabel("Type: "));

                var addRadio = function(text, parent) {

                    var button = new RadioButton();
                    button.width = "20px";
                    button.height = "20px";
                    button.color = "white";
                    button.background = "green";     
            
                    button.onIsCheckedChangedObservable.add(function(state) {
                        if(state) {
                            globals.boardData.caseType = text;
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
                addRadio("rectangle", radioCtrl);
                addRadio("convex", radioCtrl);
                addRadio("concave", radioCtrl);
                ctrlBar.addControl(radioCtrl);

                var checkbox = new Checkbox();
                checkbox.width = "20px";
                checkbox.height = "20px";
                checkbox.isChecked = globals.boardData.forceSymmetrical;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(value) {
                    globals.boardData.forceSymmetrical = value;
                    boardOps.refreshCase();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                ctrlBar.addControl(checkbox);

                var ftbx = new Checkbox();
                ftbx.width = "20px";
                ftbx.height = "20px";
                ftbx.isChecked = globals.boardData.hasFeet;
                ftbx.color = "green";
                ftbx.onIsCheckedChangedObservable.add(function(value) {
                    globals.boardData.hasFeet = value;
                    boardOps.refreshCase();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("FEET: "));
                ctrlBar.addControl(ftbx);

                let createSlider = function(txt, initialVal, min, max, onChangeFunc) {
                    let label = kbgbGUI.addLabel(txt + initialVal)
                    var slider = new Slider();
                    slider.minimum = min;
                    slider.maximum = max;
                    slider.value = tuning.bezelThickness;
                    slider.height = "15px";
                    slider.width = "100px";
                    slider.onValueChangedObservable.add(function(value) {
                        label.text = label + value;
                        onChangeFunc(value);
                    });
                    ctrlBar.addControl(label);   
                    ctrlBar.addControl(slider); 
                }

                createSlider("Thickness: ", tuning.bezelThickness, 5.5, 50, (v) => {
                    tuning.bezelThickness = v; boardOps.refreshCase();
                });
                createSlider("Fillet: ", tuning.caseCornerFillet, 0.5, 30, (v) => {
                    tuning.caseCornerFillet = v; boardOps.refreshCase();
                }); 
                createSlider("Screw span: ", tuning.maxScrewSpan, 40, 300, (v) => {
                    tuning.maxScrewSpan = v; boardOps.refreshCase();
                }); 
                createSlider("Screw offset: ", tuning.screwBezelBias, 0.0, 1.0, (v) => {
                    tuning.screwBezelBias = v; boardOps.refreshCase();
                }); 
                
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                boardOps.setNaturalRotation();
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
            
                let createCheckbox = (prop) => {
                    var checkbox = new Checkbox()
                    checkbox.width = "20px";
                    checkbox.height = "20px";
                    checkbox.isChecked = globals.boardData[prop];
                    checkbox.color = "orange";
                    checkbox.onIsCheckedChangedObservable.add(function(value) {
                        globals.boardData[prop] = value;
                        boardOps.refreshCase();
                    });
                    return checkbox;
                }

                let createTextInput = (prop) => {
                    var input = new InputText();
                    input.width = "80px";
                    input.maxWidth = "80px";
                    input.height = "40px";
                    input.text = ""+globals.boardData[prop];
                    input.color = "white";
                    input.background = "green";
                    input.onBlurObservable.add((v) => {
                        console.log(`usb port moving to ${v.text}`);
                        let f = parseFloat(v.text);
                        if(f) {
                            globals.boardData[prop] = f;
                        }
                        input.text = ""+globals.boardData[prop];
                        boardOps.refreshCase();
                    });
                    return input;
                } 

                ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                ctrlBar.addControl(createCheckbox("forcePCBSymmetrical"));
                ctrlBar.addControl(kbgbGUI.addLabel("USB: "));
                ctrlBar.addControl(createCheckbox("hasUSBPort"));
                ctrlBar.addControl(kbgbGUI.addLabel("LOC: "));
                ctrlBar.addControl(createTextInput("usbPortPos"))
                ctrlBar.addControl(kbgbGUI.addLabel("Center? "));
                ctrlBar.addControl(createCheckbox("usbPortCentered"));

                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                boardOps.setNaturalRotation();
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
            
                // let addSVGButton = function(layerName) {
                //     ctrlBar.addControl(kbgbGUI.addButton(layerName, () => {
                //         downloadSVG(layerName);
                //     }, {height:"60px",width:"120px"}));
                // }
                // addSVGButton("bezel");
                // addSVGButton("plate");
                // addSVGButton("edge");
                // addSVGButton("bottom");
                // addSVGButton("pcb");

                let txt = kbgbGUI.addLabel("WORK IN PROGRESS.");

                txt.width = "260px";
                ctrlBar.addControl(txt);
                

                globals.screengui.addControl(ctrlBar);
                
                let rtBar = new StackPanel();  
                rtBar.width = ".2";
                rtBar.isPointerBlocker = true;
                rtBar.isVertical = true;
                rtBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                let addSVGButton = function(layerName) {
                    rtBar.addControl(kbgbGUI.addButton(layerName, () => {
                        downloadSVG(layerName);
                    }, {height:"60px",width:"120px"}));
                }
                addSVGButton("bezel");
                addSVGButton("plate");
                addSVGButton("edge");
                addSVGButton("bottom");
                addSVGButton("feet");
                addSVGButton("pcb");
                globals.screengui.addControl(rtBar);

                kbgbGUI.activeModeCtrl = ctrlBar;
                boardOps.expandLayers();
            },
            remove: () => {
                boardOps.collapseLayers();
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
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

        let ctrlBar = new StackPanel();  
        ctrlBar.height = ".1";
        ctrlBar.isPointerBlocker = true;
        ctrlBar.isVertical = false;
        //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        ctrlBar.addControl(kbgbGUI.addButton("layout", () => {kbgbGUI.setGUIMode("key")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("case", () => {kbgbGUI.setGUIMode("case")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("pcb", () => {kbgbGUI.setGUIMode("pcb")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("layers", () => {kbgbGUI.setGUIMode("details")}, {height:"1",width:"120px"}));

        kbgbGUI.modeCtrl = ctrlBar;
        globals.screengui.addControl(ctrlBar);
    }
}