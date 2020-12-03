import {globals} from './globals.js'
import {tuning} from './tuning.js'
import * as boardOps from './boardOps.js'
import * as svg from './svg_export.js'
import * as BJSGUI from '@babylonjs/gui'

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
        var button = BJSGUI.Button.CreateSimpleButton("button", txt);
        button.top = "0px";
        button.left = "0px";
        button.width = style.width?style.width:"60px";
        button.height = style.height?style.height:".4";
        button.cornerRadius = 5;
        button.thickness = 2;
        button.children[0].color = "#FFFFFF";
        button.children[0].fontSize = 24;
        button.color = "#101010";
        button.background = "#909090";
        //button.horizontalAlignment = BJSGUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    
        button.onPointerClickObservable.add(action);
    
        return button;
    },
    addLabel: function(txt) {
        var t = new BJSGUI.TextBlock();
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
            add: function() {
                //let ctrlBar = BJSGUI.Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new BJSGUI.StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = BJSGUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = BJSGUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            
                ctrlBar.addControl(kbgbGUI.addLabel("Pos: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`◄`, (k) => k.x -= 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`▲`, (k) => k.y -= 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`▼`, (k) => k.y += 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`►`, (k) => k.x += 0.25 ));
            
            
                ctrlBar.addControl(kbgbGUI.addLabel("Rot: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⤹`, (k) => k.rotation_angle -= 5 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⤸`, (k) => k.rotation_angle += 5 ));
            
                ctrlBar.addControl(kbgbGUI.addLabel("W: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬌`, (k) => k.width += 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬄`, (k) => k.width -= 0.25 ));
            
                ctrlBar.addControl(kbgbGUI.addLabel("H: "));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⬍`, (k) => k.height += 0.25 ));
                ctrlBar.addControl(kbgbGUI.addKeyActionButton(`⇳`, (k) => k.height -= 0.25 ));
                
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
            }
        },
        "case":{
            add: function() {
                //let ctrlBar = BJSGUI.Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new BJSGUI.StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = BJSGUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            
                ctrlBar.addControl(kbgbGUI.addLabel("Type: "));

                var addRadio = function(text, parent) {

                    var button = new BJSGUI.RadioButton();
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
            
                    var header = BJSGUI.Control.AddHeader(button, text, "100px", { isHorizontal: true, controlFirst: true });
                    header.height = "30px";
            
                    parent.addControl(header);    
                }
            
            
                let radioCtrl = new BJSGUI.StackPanel();  
                radioCtrl.height = "1";
                radioCtrl.width = "200px";
                radioCtrl.isVertical = true;
                addRadio("rectangle", radioCtrl);
                addRadio("convex", radioCtrl);
                addRadio("concave", radioCtrl);
                ctrlBar.addControl(radioCtrl);

                var checkbox = new BJSGUI.Checkbox();
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

                let createSlider = function(txt, initialVal, min, max, onChangeFunc) {
                    let label = kbgbGUI.addLabel(txt + initialVal)
                    var slider = new BJSGUI.Slider();
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

                createSlider("Bezel Thickness: ", tuning.bezelThickness, 5.5, 50, (v) => {
                    tuning.bezelThickness = v; boardOps.refreshCase();
                });
                createSlider("Bezel Fillet: ", tuning.caseCornerFillet, 0.5, 30, (v) => {
                    tuning.caseCornerFillet = v; boardOps.refreshCase();
                }); 
                createSlider("Screw span: ", tuning.maxScrewSpan, 80, 300, (v) => {
                    tuning.maxScrewSpan = v; boardOps.refreshCase();
                }); 
                createSlider("Screw offset: ", tuning.screwBezelBias, 0.0, 1.0, (v) => {
                    tuning.screwBezelBias = v; boardOps.refreshCase();
                }); 
                
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
            }
        },
        "pcb":{
            add: function() {
                //let ctrlBar = BJSGUI.Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new BJSGUI.StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = BJSGUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            
                var checkbox = new BJSGUI.Checkbox();
                checkbox.width = "20px";
                checkbox.height = "20px";
                checkbox.isChecked = globals.boardData.forcePCBSymmetrical;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(value) {
                    globals.boardData.forcePCBSymmetrical = value;
                    boardOps.refreshLayout();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                ctrlBar.addControl(checkbox);

                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
            }
        },
        "details":{
            add: function() {
                //let ctrlBar = BJSGUI.Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new BJSGUI.StackPanel();  
                ctrlBar.height = ".2";
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = BJSGUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = BJSGUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            
                let addSVGButton = function(layerName) {
                    ctrlBar.addControl(kbgbGUI.addButton(layerName, () => {
                        downloadSVG(layerName);
                    }, {height:"60px",width:"120px"}));
                }
                addSVGButton("bezel");
                addSVGButton("plate");
                addSVGButton("edge");
                addSVGButton("bottom");
                addSVGButton("pcb");

                let txt = kbgbGUI.addLabel("WORK IN PROGRESS.");

                txt.width = "260px";
                ctrlBar.addControl(txt);
                

                globals.screengui.addControl(ctrlBar);
                

                kbgbGUI.activeModeCtrl = ctrlBar;
            }
        },
    },
    setGUIMode: function(mode) {
        if(kbgbGUI.activeModeCtrl) {
            globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
        }
        if(kbgbGUI.modes[mode]) {
            kbgbGUI.modes[mode].add();
        }
    },
    addModeGUI: function() {
        globals.screengui = BJSGUI.AdvancedDynamicTexture.CreateFullscreenUI("screenUI");

        let ctrlBar = new BJSGUI.StackPanel();  
        ctrlBar.height = ".1";
        ctrlBar.isPointerBlocker = true;
        ctrlBar.isVertical = false;
        //ctrlBar.horizontalAlignment = BJSGUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ctrlBar.verticalAlignment = BJSGUI.Control.VERTICAL_ALIGNMENT_TOP;

        ctrlBar.addControl(kbgbGUI.addButton("layout", () => {kbgbGUI.setGUIMode("key")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("case", () => {kbgbGUI.setGUIMode("case")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("pcb", () => {kbgbGUI.setGUIMode("pcb")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(kbgbGUI.addButton("deets", () => {kbgbGUI.setGUIMode("details")}, {height:"1",width:"120px"}));

        kbgbGUI.modeCtrl = ctrlBar;
        globals.screengui.addControl(ctrlBar);
    }
}