import {globals} from './globals.js'
import * as boardData from './boardData.js';
import {tuning} from './tuning.js'
import * as base from './base.js'
import * as gfx from './gfx.js'
import * as coremath from './coremath.js'
import * as boardOps from './boardOps.js'
import * as svg from './svg_export.js'
import * as gbr from './gbr_export.js'
import * as pcbOps from './pcbOps.js'
import * as interactions from './interactions.js'
import {PointerEventTypes, Matrix, Vector3, Space, MeshBuilder, Epsilon, GLTF2Export} from 'babylonjs';
import * as keyPicking from './keyPicking.js'
import {snapCamera} from './gfx.js'
import {Button, ToggleButton, Rectangle, Control, TextBlock, InputText, StackPanel, RadioButton, Checkbox, 
        Slider, ScrollViewer, AdvancedDynamicTexture} from 'babylonjsGUI'
import JSZip from 'jszip/dist/jszip';
import Analytics from '@aws-amplify/analytics';

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const snapGridSizeInU = 0.125;

const buttonHeight = "50px";
const ctrlBarHeight = "50px";

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,      
    maximumFractionDigits: 4,
 });

function format_float(a) { return formatter.format(a)}

function downloadSVGs() {
    Analytics.record({ name: 'SVG export' });
    var zip = new JSZip();
    const bd = boardData.getData();
    let layerInfoCSV = `Layer Name,Material,Thickness(mm),Part Width(mm),PartHeight(mm)\n`
    for(const [cID,cRD] of Object.entries(globals.renderData.cases)) {
        for(const [layerName, layerDef] of Object.entries(boardData.layerDefs)) {
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
    const bd = boardData.getData();
    for(const [cID,cRD] of Object.entries(globals.renderData.cases)) {
        pcbOps.routePCB(cID);
        const pcb = globals.pcbData[cID];

        gbr.beginSetExport();
        const pcbName = `pcb${cID}`;
        zip.file(`${pcbName}.gml`, gbr.exportEdgeCutsLayer(pcb));
        zip.file(`${pcbName}.txt`, gbr.exportDrillFile(pcb));

        zip.file(`${pcbName}.gtl`, gbr.exportLayer(pcb, "copper", "top"));
        zip.file(`${pcbName}.gbl`, gbr.exportLayer(pcb, "copper", "bot"));

        zip.file(`${pcbName}.gts`, gbr.exportLayer(pcb, "mask", "top"));
        zip.file(`${pcbName}.gbs`, gbr.exportLayer(pcb, "mask", "bot"));
    }

    zip.generateAsync({type:"blob"})
        .then(function(content) {
            download(content, `${bd.meta.name}_gerbers.zip`, 'text/plain');
        });
}

export function exportKeyboard() {
    let options = {
        shouldExportNode: function (node) {
            console.log(node);
            return true;
        },
    };
    
    GLTF2Export.GLBAsync(globals.scene, "fileName", options).then((glb) => {
        glb.downloadFiles();
    });
}

const buttonColor = "#000000";
const backgroundColor = gfx.bgColors[5].toHexString();
function addButton(txt, action, style) {
    style = style?style:{};
    var button = Button.CreateSimpleButton("button", txt);
    button.top = "0px";
    button.left = "0px";
    button.width = style.width?style.width:buttonHeight;
    button.height = style.height?style.height:buttonHeight;
    button.cornerRadius = 2;
    button.thickness = 2;
    button.children[0].color = "#FFFFFF";
    button.children[0].fontSize = 24;
    button.color = buttonColor;
    button.background = backgroundColor;
    //button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;

    button.onPointerClickObservable.add( (a,b) => {
        if(action) {
            action(a,b);
         }
        b.skipNextObservers = true;
    });

    return button;
}

function addToggleButton(txt, action, style) {
    style = style?style:{};
    const button = new ToggleButton();
    button.textBlock.text = txt;
    button.top = "0px";
    button.left = "0px";
    button.width = style.width?style.width:buttonHeight;
    button.height = style.height?style.height:buttonHeight;
    button.cornerRadius = 2;
    button.thickness = 2;
    button.children[0].color = "#FFFFFF";
    button.children[0].fontSize = 24;
    button.color = "#607060";
    button.background = "#739484";
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
    const scrollerHeight = Math.min(400,options.length * 50); // 50 = BUTTON HEIGHT
    scroller.height = scrollerHeight+"px";
    scroller.barSize = barSize;
    scroller.thickness = 0;
    scroller.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    scroller.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    scroller.leftInPixels = parentButton.centerX-parentButton.widthInPixels*0.5;
    scroller.topInPixels = Math.max(0,parentButton.centerY-parentButton.heightInPixels*0.5 - scrollerHeight);

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
    let optionIdx = options.findIndex((o) => o.val===initialOption);

    if(optionIdx < 0) { optionIdx = 0; }

    return addButton(options[optionIdx].txt, (e,f) => {
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
    slider.step = 0.1;
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
                    let bd = boardData.getData();
                    let k = bd.layout.keys[kId];
                    pointerController.modes.keyMove.keyInfo[kId] = {x: k.x, y: k.y};
                }
                pointerController.alignHoverTimeoutId = null;

                updateRotationHandle(false);
            },
            move: function(pointerInfo) {
                let hitLoc = pointerController.getLocFromInfo(pointerInfo);
                const e = pointerInfo.event;
                let kRD = globals.renderData.keys;
                let overKey = null;
                for (const [id, rd] of Object.entries(kRD)) {
                    if(!keyPicking.pickedKeys.includes(id)) {
                        for(const [ip, keyPoly] of Object.entries(rd["bezelHoles"])) {
                            if(coremath.isPointInPoly(hitLoc,keyPoly.points)) {
                                overKey = id;
                                break;
                            }
                        }
                        if(overKey!==null) {
                            break;
                        }
                    } else {
                        console.log(`discarding hover check for ${id}`);
                    }
                }

                if(pointerController.alignHoverKeyId !== overKey) {
                    if(pointerController.alignHoverTimeoutId) {
                        clearTimeout(pointerController.alignHoverTimeoutId);
                        pointerController.alignHoverTimeoutId = null;
                    }
                    if(overKey!==null) {
                        pointerController.alignHoverKeyId = overKey;
    
                        const setGridAlignment = (id) => {
                            let bd = boardData.getData();
                            let k = bd.layout.keys[id];
    
                            for (let kId of keyPicking.pickedKeys) {
                                let bd = boardData.getData();
                                let ok = bd.layout.keys[kId];
                                const savedKeyPos = pointerController.modes.keyMove.keyInfo[ok.id];
                                const xDiff = 4*(k.x-k.width*tuning.base1U[0]*0.5 - savedKeyPos.x)/tuning.base1U[0];
                                const yDiff = 4*(k.y-k.height*tuning.base1U[1]*0.5 - savedKeyPos.y)/tuning.base1U[0];
                                savedKeyPos.x = savedKeyPos.x - (xDiff-Math.trunc(xDiff))*tuning.base1U[0] * snapGridSizeInU;
                                savedKeyPos.y = savedKeyPos.y + (yDiff-Math.trunc(yDiff))*tuning.base1U[1] * snapGridSizeInU;
                            }
                        }
    
                        pointerController.alignHoverTimeoutId = setTimeout(() => setGridAlignment(overKey), 1000);
                    }
                }

                kbgbGUI.keyAction((k) => {
                    const savedKeyPos = pointerController.modes.keyMove.keyInfo[k.id];
                    if(savedKeyPos) {
                        if(e.shiftKey) {
                            // don't snap to grid
                            k.x = savedKeyPos.x + (hitLoc.x - pointerController.enterModePosition.x);
                            k.y = savedKeyPos.y - (hitLoc.z - pointerController.enterModePosition.z);
                        } else {
                            k.x = savedKeyPos.x + Math.floor(4*(hitLoc.x - pointerController.enterModePosition.x)/tuning.base1U[0])*tuning.base1U[0]*snapGridSizeInU;
                            k.y = savedKeyPos.y - Math.floor(4*(hitLoc.z - pointerController.enterModePosition.z)/tuning.base1U[1])*tuning.base1U[1]*snapGridSizeInU;
                        }
                    }
                });
            },
            up: function(pointerInfo) {
                if(pointerController.alignHoverTimeoutId) {
                    clearTimeout(pointerController.alignHoverTimeoutId);
                    pointerController.alignHoverTimeoutId = null;
                }

                pointerController.setMode(null,pointerInfo);

                updateRotationHandle(true);
                
                console.log(`pointer up.... mode is ${pointerController.activeMode}`)
            }
        },
        "keyRotation": {
            keyInfo: {},
            enter: function(pointerInfo) {
                pointerController.modes.keyMove.rotBump = 0;
                for (let kId of keyPicking.pickedKeys) {
                    let bd = boardData.getData();
                    let k = bd.layout.keys[kId];
                    pointerController.modes.keyMove.keyInfo[kId] = {rotation_angle: k.rotation_angle, x: k.x, y: k.y};
                }
                pointerController.alignHoverTimeoutId = null;

                updateRotationHandle(true);
            },
            move: function(pointerInfo) {
                let hitLoc = pointerController.getLocFromInfo(pointerInfo);
                const e = pointerInfo.event;
                let kRD = globals.renderData.keys;
                let overKey = null;
                for (const [id, rd] of Object.entries(kRD)) {
                    if(!keyPicking.pickedKeys.includes(id)) {
                        for(const [ip, keyPoly] of Object.entries(rd["bezelHoles"])) {
                            if(coremath.isPointInPoly(hitLoc,keyPoly.points)) {
                                overKey = id;
                                break;
                            }
                        }
                        if(overKey!==null) {
                            break;
                        }
                    } else {
                        console.log(`discarding hover check for ${id}`);
                    }
                }

                // if(pointerController.alignHoverKeyId !== overKey) {
                //     if(pointerController.alignHoverTimeoutId) {
                //         clearTimeout(pointerController.alignHoverTimeoutId);
                //         pointerController.alignHoverTimeoutId = null;
                //     }
                //     if(overKey!==null) {
                //         pointerController.alignHoverKeyId = overKey;
    
                //         const setGridAlignment = (id) => {
                //             let bd = boardData.getData();
                //             let k = bd.layout.keys[id];
    
                //             for (let kId of keyPicking.pickedKeys) {
                //                 let bd = boardData.getData();
                //                 let ok = bd.layout.keys[kId];
                //                 const savedKeyPos = pointerController.modes.keyMove.keyInfo[ok.id];
                //                 const rDiff = (k.rotation_angle-savedKeyPos.rotation_angle)/tuning.base1U[0];
                //                 savedKeyPos.rotation_angle = savedKeyPos.x - (xDiff-Math.trunc(xDiff))*tuning.base1U[0]*snapGridSizeInU;
                //                 savedKeyPos.y = savedKeyPos.y + (yDiff-Math.trunc(yDiff))*tuning.base1U[1]*snapGridSizeInU;
                //             }
                //         }
    
                //         pointerController.alignHoverTimeoutId = setTimeout(() => setGridAlignment(overKey), 1000);
                //     }
                // }

                let rotBump = (coremath.getRotFromNormal(pointerController.enterModePosition.subtract(new Vector3(rotHandleMiddle.x,0,rotHandleMiddle.z)).normalize())
                               -coremath.getRotFromNormal(hitLoc.subtract(new Vector3(rotHandleMiddle.x,0,rotHandleMiddle.z)).normalize())) * 180.0 / Math.PI;
                
                if(!e.shiftKey) {
                    rotBump = rotBump - rotBump % 15;
                }
                if(Math.abs(pointerController.modes.keyMove.rotBump-rotBump) > Epsilon) {
                    pointerController.modes.keyMove.rotBump = rotBump
                    let newPos = new Vector3();
                    kbgbGUI.keyAction((k) => {
                        const savedKeyPos = pointerController.modes.keyMove.keyInfo[k.id];
                        if(savedKeyPos) {
                            let kXform = Matrix.Translation(savedKeyPos.x-rotHandleMiddle.x, 0, -savedKeyPos.y-rotHandleMiddle.z);
                            kXform = kXform.multiply(Matrix.RotationY(rotBump * Math.PI / 180));
                            kXform = kXform.multiply(Matrix.Translation(rotHandleMiddle.x,0,rotHandleMiddle.z));
    
                            Vector3.TransformCoordinatesToRef(Vector3.ZeroReadOnly, kXform, newPos);
                            k.x = newPos.x;
                            k.y = -newPos.z;
                            k.rotation_angle = savedKeyPos.rotation_angle + rotBump;
                        }
                    });
                }
            },
            up: function(pointerInfo) {
                if(pointerController.alignHoverTimeoutId) {
                    clearTimeout(pointerController.alignHoverTimeoutId);
                    pointerController.alignHoverTimeoutId = null;
                }

                pointerController.setMode(null,pointerInfo);

                updateRotationHandle(true);
                
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
                kbgbGUI.refresh();
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
            selMesh.translate(new Vector3(0, 25.5, 0), 1, Space.LOCAL);
        }
    }
}

let frameMeshes = [];
let matCoverMeshes = [];
function updateFrameBox(cID,start,end) {
    let mats = globals.renderData.mats;

    for(const frameMesh of frameMeshes) {
        globals.scene.removeMesh(frameMesh);
        frameMesh.dispose();
    }
    for(const matCoverMesh of matCoverMeshes) {
        globals.scene.removeMesh(matCoverMesh);
        matCoverMesh.dispose();
    }

    if(start && end) {
        const mins = {x: Math.min(start[0],end[0]),z:Math.min(start[1],end[1])};
        const maxs = {x: Math.max(start[0],end[0]),z:Math.max(start[1],end[1])};
        if(maxs.x - mins.x > Epsilon && maxs.z - mins.z > Epsilon) {
            let selOutline = [new Vector3(mins.x, 0, mins.z),
                              new Vector3(maxs.x, 0, mins.z),
                              new Vector3(maxs.x, 0, maxs.z),
                              new Vector3(mins.x, 0, maxs.z)
            ];
    
            const frameMesh = MeshBuilder.CreateRibbon(`frameOutline${cID}`,
            {
                pathArray: [coremath.genArrayFromOutline(selOutline, 20.0, 1.0, true),
                    coremath.genArrayFromOutline(selOutline, 25.5, 5.5, true)]
            }, globals.scene);
            frameMesh.material = mats["layoutFrame"];

            const matCoverMesh = MeshBuilder.CreatePolygon(`gridMatCover${cID}`,
            {
                shape: coremath.genArrayFromOutline(selOutline, 20.0, 1.0, true)
            }, globals.scene);
            matCoverMesh.material = mats["gridMaterial"];
            frameMesh.translate(new Vector3(0, 0.3, 0), 1, Space.LOCAL);
            matCoverMesh.translate(new Vector3(0, 0.2, 0), 1, Space.LOCAL);
            frameMeshes.push(frameMesh);
            matCoverMeshes.push(matCoverMesh);
        }
    }
}

let rotHandleMesh = null;
let rotHandleMiddle = {};
function updateRotationHandle(show) {

    if(rotHandleMesh) {
        globals.scene.removeMesh(rotHandleMesh);
        rotHandleMesh.dispose();
    }

    if(show && keyPicking.pickedKeys.length > 0) {
        let mats = globals.renderData.mats;

        let kRD = globals.renderData.keys;
        let selMins = [100000.0, 100000.0];
        let selMaxs = [-100000.0, -100000.0];
        for (const id of keyPicking.pickedKeys) {
            const rd = kRD[id];
            selMins[0] = Math.min(selMins[0],rd.mins[0]);
            selMins[1] = Math.min(selMins[1],rd.mins[1]);
            selMaxs[0] = Math.max(selMaxs[0],rd.maxs[0]);
            selMaxs[1] = Math.max(selMaxs[1],rd.maxs[1]);
        }

        rotHandleMiddle = {x: (selMins[0]+selMaxs[0])/2,z:(selMins[1]+selMaxs[1])/2 };
        const rad = Math.sqrt(Math.pow(Math.abs(selMaxs[0]-rotHandleMiddle.x),2)+Math.pow(Math.abs(selMaxs[1]-rotHandleMiddle.z),2)) + 15;
        if(rad > Epsilon) {
            rotHandleMesh = MeshBuilder.CreateTorus("rotHandle",
            {
                diameter:rad*2,
                thickness:5,
                tessellation:64
            }, globals.scene);
            rotHandleMesh.material = mats["rotHandle"];
            rotHandleMesh.translate(new Vector3(rotHandleMiddle.x, 30.5, rotHandleMiddle.z), 1, Space.LOCAL);
        }
    }
}

const keySizeOptions = [
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
    {txt:"OLED", type:"oled"},
    {txt:"EC11-18", type:"ec11", encoder_knob_size:18},
    {txt:"EC11-19", type:"ec11", encoder_knob_size:19.05},
    {txt:"EC11-30", type:"ec11", encoder_knob_size:30},
    // this is an awful way to do this.  someday deal with this elsewhere
    {txt:"ISO", type:"special", special:"ISO", width: 1.25, height: 2, width2: 1.5, height2: 1, x2: -0.25, y2: 0},
    {txt:"1.75U STEPPED", width:1.75, stepped:true},
    {txt:"BAE", type:"special", special:"BAE", width:1.5, height: 2, width2: 2.25, height2: 1, x2: -0.75, y2: 1}
];

const keySizeDefaults = {
    width:1,
    height:1,
    width2:null,
    height2:null,
    x2:0,
    y2:0,
    nub:null,
    type:"standard",
    special:null,
    encoder_knob_size:null
};

function refreshLayout() {
    boardOps.refreshLayout();
    for(const [cID,cRD] of Object.entries(globals.renderData.layoutData)) {
        updateFrameBox(cID,cRD.bounds.mins,cRD.bounds.maxs);
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
            let bd = boardData.getData();
            let k = bd.layout.keys[kId];
            action(k);
        }
        refreshLayout();
    },
    addKeyActionKeycode: function(action, keyCode) {
        const appliedKeyAction = () => {this.keyAction(action)}
        interactions.addBinding("keydown", keyCode, appliedKeyAction)
    },
    addActionButton: function(txt, action, keyCode) {
        if(keyCode) {
            interactions.addBinding("keydown", keyCode, action)
        }
        return addButton(txt, action); 
    },
    addCaseSelection: function(holder) {
        let caseOptions = []
        for(const [k,cBD] of Object.entries(boardData.getData().cases)) {
            if(!kbgbGUI.activeCase) {
                kbgbGUI.activeCase = k;
            }
            caseOptions.push({txt:k, val:k});
        }
        let caseSelectionAction = (o,a,b) => {
            kbgbGUI.activeCase = o.val;
        }
        const dropdown = createDropdown(globals.screengui, kbgbGUI.activeCase, caseOptions, caseSelectionAction);
        holder.addControl(dropdown);
        if(caseOptions.length <= 1) {
            dropdown.isVisible = false;
        }
    },
    mData: {},
    modes:{
        "key":{
            cameraMode:"top",
            add: function() {
                interactions.addPointerBinding(PointerEventTypes.POINTERDOWN, (pointerInfo) => {
                    const pickResult = pointerInfo.pickInfo;
                    const ray = pickResult.ray;
                    const t = -ray.origin.y / ray.direction.y;
                    const hitLoc = ray.origin.add(ray.direction.scale(t));

                    let beginSelection = true;

                    console.log(`pickResult is`)
                    console.log(pickResult)

                    if (pickResult && pickResult.pickedMesh) {
                        const parent = pickResult.pickedMesh.parent;
                        let name = pickResult.pickedMesh.name;
                        if(name === "rotHandle") {
                            console.log(`entering rotation!`)
                            beginSelection = false;
                            pointerController.setMode("keyRotation",pointerInfo);
                        }
                        else {
                            if (parent && boardData.getData().layout.keys[parent.name]) {
                                name = parent.name;
                            }
                            if (keyPicking.pickedKeys.indexOf(name) >= 0) {
                                beginSelection = false;
                                pointerController.setMode("keyMove",pointerInfo);
                            }
                        }
                    }

                    // if we didn't hit a key that's already selected, start a selection box
                    if(beginSelection) {
                        pointerController.setMode("selection",pointerInfo);
                    }
                });
                interactions.addPointerBinding(PointerEventTypes.POINTERMOVE, (pointerInfo) => {
                    pointerController.processMove(pointerInfo);
                });
                interactions.addPointerBinding(PointerEventTypes.POINTERUP, (pointerInfo) => {
                    pointerController.processUp(pointerInfo);
                    kbgbGUI.refresh();
                });
                interactions.addPointerBinding(PointerEventTypes.POINTERTAP, (pointerInfo) => {
                    pointerController.processUp(pointerInfo);
                    kbgbGUI.refresh();
                });
                // boardOps.removeCaseData();
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;


                let setCtrls = new StackPanel();  
                setCtrls.height = ctrlBarHeight;
                setCtrls.isPointerBlocker = true;
                setCtrls.isVertical = false;
                setCtrls.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
                const capProfile = [
                    {txt:"KAM",val:"KAM"},
                    {txt:"KAT",val:"KAT"},
                    {txt:"SA",val:"SA"},
                    {txt:"DSA",val:"DSA"},
                    {txt:"DCS",val:"DCS"},
                    {txt:"Cherry",val:"CHE"}
                ];

                let capProfileChange = (o,a,b) => {
                    boardOps.updateKeycapMorphTargets(o.val);
                }
                setCtrls.addControl(createDropdown(globals.screengui, boardData.getData().keycapProfile, capProfile, capProfileChange));

                setCtrls.addControl(addButton("add key", (e) => {
                        boardOps.addKey();
                        refreshLayout();
                    }, {height:buttonHeight, width:"120px"}));

                kbgbGUI.addKeyActionKeycode((k) => k.x -= snapGridSizeInU*tuning.base1U[0], "ArrowLeft");
                kbgbGUI.addKeyActionKeycode((k) => k.y -= snapGridSizeInU*tuning.base1U[1], "ArrowUp");
                kbgbGUI.addKeyActionKeycode((k) => k.y += snapGridSizeInU*tuning.base1U[1], "ArrowDown");
                kbgbGUI.addKeyActionKeycode((k) => k.x += snapGridSizeInU*tuning.base1U[0], "ArrowRight");
            
                let keyCtrls = new StackPanel();  
                keyCtrls.height = ctrlBarHeight;
                keyCtrls.isPointerBlocker = true;
                keyCtrls.isVertical = false;
                keyCtrls.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
                // keyCtrls.addControl(kbgbGUI.addLabel("Rot: "));
                // keyCtrls.addControl(kbgbGUI.addKeyActionButton(`⤹`, (k) => k.rotation_angle -= 2, "q" ));
                // keyCtrls.addControl(kbgbGUI.addKeyActionButton(`⤸`, (k) => k.rotation_angle += 2, "e" ));
            
                keyCtrls.addControl(kbgbGUI.addLabel("  "));
                let kAction = (keyAction) => {
                        for (let kId of keyPicking.pickedKeys) {
                            let bd = boardData.getData();
                            let k = bd.layout.keys[kId];
                            keyAction(k);
                        }
                };
                let setKeyAction = (key,v) => kAction((k) => {
                    k[key] = v;
                });

                keyCtrls.addControl(addButton("add mirror", (e) => {
                    boardOps.mirrorSelectedKeys();
                    refreshLayout();
                }, {height:buttonHeight, width:"120px"}));

                var textInput = new InputText();
                // textInput.maxWidth = 0.2;
                textInput.width = "150px";
                textInput.height = buttonHeight;
                textInput.text = " ";
                textInput.color = "white";
                textInput.background = buttonColor;
                textInput.onFocusObservable.add((v) => {
                    interactions.blockKeyBindings();
                });
                textInput.onBlurObservable.add((v) => {
                    interactions.unblockKeyBindings();
                });
                textInput.onTextChangedObservable.add((v) => {
                    setKeyAction("txt", v.text);
                    textInput.text = ""+v.text;
                    boardOps.refreshLayout();
                });
                kbgbGUI.mData.textInput = textInput;
                keyCtrls.addControl(textInput);    

                let keySelectionAction = (o,a,b) => {
                    for (const [k, v] of Object.entries(keySizeDefaults)) {
                        if(o[k]) {
                            setKeyAction(k,o[k]);
                        } else {
                            setKeyAction(k,v);
                        }
                    }
                    refreshLayout();
                }

                kbgbGUI.mData.keySizeDropdown = createDropdown(globals.screengui, 0, keySizeOptions, keySelectionAction);

                keyCtrls.addControl( kbgbGUI.mData.keySizeDropdown );


                const rowOptions = [
                    {txt:"r0",val:0},
                    {txt:"r1",val:1},
                    {txt:"r2",val:2},
                    {txt:"r3",val:3},
                    {txt:"r4",val:4},
                    {txt:"r5",val:5}
                ];

                let rowSelectionAction = (o,a,b) => {
                    setKeyAction("row", o.val);
                    refreshLayout();
                }

                kbgbGUI.mData.rowDropdown = createDropdown(globals.screengui, 0, rowOptions, rowSelectionAction);

                keyCtrls.addControl( kbgbGUI.mData.rowDropdown );

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
                    refreshLayout();
                });

                kbgbGUI.mData.stabLabel = kbgbGUI.addLabel("STAB: ")
                keyCtrls.addControl(kbgbGUI.mData.stabLabel);
                kbgbGUI.mData.stabCheckbox = checkbox;
                keyCtrls.addControl(checkbox);


                let caseIdxSwap = (v) => kAction((k) => {
                    if(k.caseIdx == 1) {
                        k.caseIdx = 0;
                    } else {
                        k.caseIdx = 1;
                    }
                    boardOps.removeKeyRD(k.id);
                    boardOps.addCase(k.caseIdx);
                });

                var cb = new Checkbox();
                cb.width = "10px";
                cb.height = "10px";
                cb.isChecked = false;
                cb.color = "blue";
                cb.onIsCheckedChangedObservable.add(function(value) {
                    caseIdxSwap(value);
                    refreshLayout();
                });
                keyCtrls.addControl(kbgbGUI.addLabel("split"));
                keyCtrls.addControl(cb);

                keyCtrls.addControl(kbgbGUI.addLabel("  "));

                keyCtrls.addControl(kbgbGUI.addActionButton("del", () => {
                    kbgbGUI.keyAction((k)=> {boardOps.removeKey(k.id)});
                    keyPicking.clearPickedKeys();
                    kbgbGUI.refresh();
                }, "Backspace"));

                
                kbgbGUI.mData.setCtrls = setCtrls;
                ctrlBar.addControl(setCtrls);
                kbgbGUI.mData.keyCtrls = keyCtrls;
                ctrlBar.addControl(keyCtrls);
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
                kbgbGUI.refresh();
                boardOps.setFlatRotations();
                gfx.showGrid();
                boardOps.fadeCase();
                for(const [cID,cRD] of Object.entries(globals.renderData.layoutData)) {
                    updateFrameBox(cID,cRD.bounds.mins,cRD.bounds.maxs);
                }
            },
            refresh: () => {
                if(keyPicking.pickedKeys.length === 0) {
                    kbgbGUI.mData.keyCtrls.isVisible = false;
                    kbgbGUI.mData.setCtrls.isVisible = true;
                }
                else {
                    kbgbGUI.mData.setCtrls.isVisible = false;
                    kbgbGUI.mData.keyCtrls.isVisible = true;
                    // kbgbGUI.mData.stabLabel.isVisible = false;
                    // kbgbGUI.mData.stabCheckbox.isVisible = false;
                    let optionMatches = [];
                    let rowOptions = [];
                    let text = "";
                    for (let kId of keyPicking.pickedKeys) {
                        let bd = boardData.getData();
                        let k = bd.layout.keys[kId];
                        if(rowOptions.indexOf(k.row) === -1) {
                            rowOptions.push(k.row);
                        }
                        for(const o of keySizeOptions) {
                            if(o.type === k.type && o.width === k.width && o.rad === k.rad) {
                                if(optionMatches.indexOf(o) === -1) {
                                    optionMatches.push(o);
                                }
                            }
                        }
                        text = k.txt;
                        // todo fix this for multiselection
                        kbgbGUI.mData.stabCheckbox = k.flipStab;
                    }
                    if(optionMatches.length === 1) {
                        kbgbGUI.mData.keySizeDropdown.textBlock.text = optionMatches[0].txt;
                    }
                    else if(optionMatches.length > 1) {
                        kbgbGUI.mData.keySizeDropdown.textBlock.text = `**`;
                    }

                    if(rowOptions.length === 1) {
                        kbgbGUI.mData.rowDropdown.textBlock.text = `r${rowOptions[0]}`;
                    }
                    else if(rowOptions.length > 1) {
                        kbgbGUI.mData.rowDropdown.textBlock.text = `**`;
                    }

                    if(keyPicking.pickedKeys.length !== 1) {
                        kbgbGUI.mData.textInput.isVisible = false;
                    } else {
                        kbgbGUI.mData.textInput.isVisible = true;
                        if(text) {
                            kbgbGUI.mData.textInput.text = text;
                        } else {
                            kbgbGUI.mData.textInput.text = "";
                        }
                    }
                }

                updateRotationHandle(true);

                for(const [cID,cRD] of Object.entries(globals.renderData.layoutData)) {
                    updateFrameBox(cID,cRD.bounds.mins,cRD.bounds.maxs);
                }
            },
            remove: () => {
                interactions.removePointerBinding(PointerEventTypes.POINTERDOWN);
                interactions.removePointerBinding(PointerEventTypes.POINTERMOVE);
                interactions.removePointerBinding(PointerEventTypes.POINTERUP);
                interactions.removePointerBinding(PointerEventTypes.POINTERTAP);
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
                keyPicking.clearPickedKeys();
                boardOps.unfadeCase();
                boardOps.refreshPCBs();
                boardOps.refreshCase();
                kbgbGUI.mData.keySizeDropdown = null;
                kbgbGUI.mData.stabCheckbox = null;
                updateRotationHandle(false);
                gfx.hideGrid();
                for(const [cID,cRD] of Object.entries(globals.renderData.layoutData)) {
                    updateFrameBox(cID);
                }
            }
        },
        "view":{
            cameraMode:"front",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

                ctrlBar.addControl(addButton("prev", () => {
                    base.loadPrevKeyboard();
                }, {height:buttonHeight,width:"120px"}));

                ctrlBar.addControl(addButton("next", () => {
                    base.loadNextKeyboard();
                }, {height:buttonHeight,width:"120px"}));

                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                boardOps.setNaturalRotations();
            },
            refresh: () => {},
            remove: () => {
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
            }
        },
        "case":{
            cameraMode:"front",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);

                var checkbox = new Checkbox();
                checkbox.width = "10px";
                checkbox.height = "10px";
                console.log(`case: ${kbgbGUI.activeCase}`)
                console.log(boardData.getData().cases);
                checkbox.isChecked = boardData.getData().cases[kbgbGUI.activeCase].forceSymmetrical;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(value) {
                    boardData.getData().cases[kbgbGUI.activeCase].forceSymmetrical = value;
                    boardOps.refreshCase();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                ctrlBar.addControl(checkbox);

                var ftbx = new Checkbox();
                ftbx.width = "10px";
                ftbx.height = "10px";
                ftbx.isChecked = boardData.getData().cases[kbgbGUI.activeCase].hasFeet;
                ftbx.color = "green";
                ftbx.onIsCheckedChangedObservable.add(function(value) {
                    boardData.getData().cases[kbgbGUI.activeCase].hasFeet = value;
                    boardOps.refreshCase();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("FEET: "));
                ctrlBar.addControl(ftbx);

                let isRefreshingTuning = false;

                let addRTBar = function(propName) {
                    if(kbgbGUI.rtBar) {
                        globals.screengui.removeControl(kbgbGUI.rtBar);
                    }

                    let rtBar = new StackPanel();  
                    rtBar.width = ".2";
                    rtBar.isPointerBlocker = true;
                    rtBar.isVertical = true;
                    rtBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    
                    let refreshTuningValues = function(k) {
                        const cBD = boardData.getData().cases[kbgbGUI.activeCase];
                        const kPin = k+"Pin";
                        let pendingList = [];
                        let lastVal = null;
                        for(const [layerName, layerDef] of Object.entries(boardData.layerDefs)) {
                            if(layerDef.tuneable !== null) {
                                let pinned = boardData.layerGetValue(cBD, layerName, kPin);
                                let thisVal = boardData.layerGetValue(cBD, layerName, k);
                                if(!pinned) {
                                    pendingList.push(layerName);
                                } else {
                                    if(lastVal === null) {
                                        for(const lName of pendingList) {
                                            boardData.layerSetValue(cBD,lName,k,thisVal);
                                        }
                                    } else {
                                        const nLerps = pendingList.length;
                                        const t = (thisVal - lastVal)/(nLerps+1);
                                        for(let i = 0; i < nLerps; i++) {
                                            boardData.layerSetValue(cBD,pendingList[i],k,lastVal+(t*(i+1)));
                                        }
                                    }
                                    lastVal = thisVal;
                                    pendingList = [];
                                }
                            }
                        }
                        if(lastVal !== null) {
                            for(const lName of pendingList) {
                                boardData.layerSetValue(cBD,lName,k,lastVal);
                            }
                        }
    
                        for(const [layerName, layerDef] of Object.entries(boardData.layerDefs)) {
                            if(layerDef.tuneable !== null) {
                                rtBar[layerName].slider.value = boardData.layerGetValue(cBD, layerName, k);
                            }
                        }
                        boardOps.refreshCase();
                    }

                    let addTuningButton = function(layerName) {
                        const cBD = boardData.getData().cases[kbgbGUI.activeCase];
                        let buttonBar = new StackPanel();  
                        buttonBar.height = "40px";
                        buttonBar.isPointerBlocker = true;
                        buttonBar.isVertical = false;
                        buttonBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
                        
                        let label = kbgbGUI.addLabel(layerName)
                        var slider = new Slider();
                        var lock = new Checkbox();
    
                        label.height = "40px"
    
                        if(tuning[propName]) {
                            slider.minimum = tuning[propName].min;
                            slider.maximum = tuning[propName].max;
                        }
                        else {
                            slider.minimum = 0;
                            slider.maximum = 1;
                        }
                        slider.value = boardData.layerGetValue(cBD, layerName, propName);
                        slider.height = "15px";
                        slider.width = "100px";
                        slider.onValueChangedObservable.add(function(value) {
                            if(!isRefreshingTuning) {
                                isRefreshingTuning = true;
                                lock.isChecked = true;
                                boardData.layerSetValue(cBD, layerName, propName+"Pin", true);
                                boardData.layerSetValue(cBD, layerName, propName, value);
                                refreshTuningValues(propName);
                                isRefreshingTuning = false;
                            }
                        });
    
    
                        lock.width = "10px";
                        lock.height = "10px";
                        lock.isChecked = boardData.layerGetValue(cBD, layerName, propName+"Pin");
                        lock.color = "red";
                        lock.onIsCheckedChangedObservable.add(function(value) {
                            if(!isRefreshingTuning) {
                                isRefreshingTuning = true;
                                boardData.layerSetValue(cBD, layerName, propName+"Pin", value);
                                refreshTuningValues(propName);
                                isRefreshingTuning = false;
                            }
                        });
    
                        rtBar[layerName] = {lock:lock, slider:slider};
    
                        buttonBar.addControl(label);   
                        buttonBar.addControl(slider);  
                        buttonBar.addControl(lock); 
                        rtBar.addControl(buttonBar);
                    }
    
                    for(const [layerName, layerDef] of Object.entries(boardData.layerDefs)) {
                        if(layerDef.tuneable !== null) {
                            addTuningButton(layerName);
                        }
                    }
    
                    globals.screengui.addControl(rtBar);
    
                    kbgbGUI.rtBar = rtBar;
                }

                ctrlBar.addControl(addButton("Shape", () => {
                    addRTBar("bezelConcavity");
                }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("Thickness", () => {
                    addRTBar("bezelThickness");
                }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("Corners", () => {
                    addRTBar("caseCornerFillet");
                }, {height:buttonHeight,width:"120px"}));
                
                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                boardOps.setNaturalRotations();
            },
            refresh: () => {},
            remove: () => {
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
                if(kbgbGUI.rtBar) {
                    globals.screengui.removeControl(kbgbGUI.rtBar);
                }
            }
        },
        "pcb":{
            cameraMode:"rear",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);
            
                let createCheckbox = (prop) => {
                    var checkbox = new Checkbox()
                    checkbox.width = "20px";
                    checkbox.height = "20px";
                    checkbox.isChecked = boardData.getData().cases[kbgbGUI.activeCase][prop];
                    checkbox.color = "orange";
                    checkbox.onIsCheckedChangedObservable.add(function(value) {
                        boardData.getData().cases[kbgbGUI.activeCase][prop] = value;
                        boardOps.refreshCase();
                    });
                    return checkbox;
                }

                let createTextInput = (prop) => {
                    var input = new InputText();
                    input.width = "80px";
                    input.maxWidth = "80px";
                    input.height = "40px";
                    input.text = ""+boardData.getData().cases[kbgbGUI.activeCase][prop];
                    input.color = "white";
                    input.background = "green";
                    input.onBlurObservable.add((v) => {
                        console.log(`usb port moving to ${v.text}`);
                        let f = parseFloat(v.text);
                        if(f) {
                            boardData.getData().cases[kbgbGUI.activeCase][prop] = f;
                        }
                        input.text = ""+boardData.getData().cases[kbgbGUI.activeCase][prop];
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
                // ctrlBar.addControl(addToggleButton("Center",(value) => {
                //     boardData.getData().cases[kbgbGUI.activeCase]["usbPortCentered"] = value;
                //     boardOps.refreshCase();
                // }));
                ctrlBar.addControl(kbgbGUI.addLabel("Center "));
                ctrlBar.addControl(createCheckbox("usbPortCentered"));

                createSlider(ctrlBar, "Screw span: ", boardData.getData().cases[kbgbGUI.activeCase].maxScrewSpan, 40, 300, (v) => {
                    boardData.getData().cases[kbgbGUI.activeCase].maxScrewSpan = v; boardOps.refreshCase();
                }); 
                createSlider(ctrlBar, "Screw offset: ", boardData.getData().cases[kbgbGUI.activeCase].screwBezelBias, 0.0, 1.0, (v) => {
                    boardData.getData().cases[kbgbGUI.activeCase].screwBezelBias = v; boardOps.refreshCase();
                }); 

                globals.screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                boardOps.setNaturalRotations();
            },
            refresh: () => {},
            remove: () => {
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
            }
        },
        "details":{
            cameraMode:"split",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);

                const caseOptions = [
                    {txt:"smoke",val:"ac_smoke"},
                    {txt:"clear",val:"ac_clear"},
                    {txt:"blue",val:"ac_blue"},
                    {txt:"purp",val:"ac_purple"},
                    {txt:"yello",val:"ac_yellow"},
                    {txt:"alu",val:"aluminium"},
                    {txt:"pom",val:"pom_white"},
                    {txt:"pom(b)",val:"pom_black"},
                    {txt:"stl",val:"steel"},
                    {txt:"pc",val:"pc_cl"}
                ];

                const plateOptions = [
                    {txt:"alu",val:"aluminium"},
                    {txt:"pom",val:"pom_white"},
                    {txt:"pom(b)",val:"pom_black"},
                    {txt:"steel",val:"steel"},
                    {txt:"fr4",val:"fr4"},
                    {txt:"brass",val:"brass"},
                    {txt:"pc",val:"pc_cl"}
                ];

                let caseMatSelection = (o,a,b) => {
                    const cBD = boardData.getData().cases[kbgbGUI.activeCase];
                    cBD.material = o.val;

                    if(plateOptions.findIndex((opt) => opt.val===o.val) >= 0) {
                        boardData.layerSetValue(cBD, "plate", "material", o.val);
                    } else if(!cBD.layers["plate"] || !cBD.layers["plate"]["material"]) {
                        boardData.layerSetValue(cBD, "plate", "material", "pom_white");
                    }
                    boardOps.refreshCase();
                }
                const cBD = boardData.getData().cases[kbgbGUI.activeCase];
                ctrlBar.addControl(
                    createDropdown(globals.screengui, cBD.material, caseOptions, caseMatSelection));

                let getMaterialDropdown = (layerName) => {
                    let layerMatSelection = (o,a,b) => {
                        const cBD = boardData.getData().cases[kbgbGUI.activeCase];
                        boardData.layerSetValue(cBD, layerName, "material", o.val);
                        boardOps.refreshCase();
                    };
                    let dd = null;
                    const cBD = boardData.getData().cases[kbgbGUI.activeCase];
                    let existingValue = boardData.layerGetValue(cBD, layerName, "material");
                    switch(boardData.layerDefs[layerName].mat) {
                        case "case":
                            dd = createDropdown(globals.screengui, existingValue, caseOptions, layerMatSelection);
                            break;
                        case "plate":
                            dd = createDropdown(globals.screengui, existingValue, plateOptions, layerMatSelection);
    
                            break;
                        case "foam":
                            break;
                    }
                    return dd;
                }
                // ctrlBar.addControl(
                //     createDropdown(globals.screengui,0, [
                //         {txt:"smoke",val:"ac_smoke"},
                //         {txt:"clear",val:"ac_clear"},
                //         {txt:"blue",val:"ac_blue"},
                //         {txt:"purp",val:"ac_purple"},
                //         {txt:"yello",val:"ac_yellow"},
                //         {txt:"alu",val:"aluminium"},
                //         {txt:"pom",val:"pom_white"},
                //         {txt:"pom(b)",val:"pom_black"},
                //         {txt:"stl",val:"steel"},
                //         {txt:"pc",val:"pc_cl"}
                //     ], caseMatSelection));

                let addRTBar = function(propName) {
                    if(kbgbGUI.rtBar) {
                        globals.screengui.removeControl(kbgbGUI.rtBar);
                    }

                    let rtBar = new StackPanel();  
                    rtBar.width = ".2";
                    rtBar.isPointerBlocker = true;
                    rtBar.isVertical = true;
                    rtBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;

                    let addTuningButton = function(layerName) {
                        const cBD = boardData.getData().cases[kbgbGUI.activeCase];
                        let buttonBar = new StackPanel();  
                        buttonBar.height = buttonHeight;
                        buttonBar.isPointerBlocker = true;
                        buttonBar.isVertical = false;
                        buttonBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
                        
                        let label = kbgbGUI.addLabel(layerName)
                        let dd = getMaterialDropdown(layerName);
    
                        if(dd === null) return;

                        label.height = "40px"
    
                        rtBar[layerName] = {dropdown:dd};
    
                        buttonBar.addControl(label);   
                        buttonBar.addControl(dd);
                        rtBar.addControl(buttonBar);
                    }
    
                    for(const [layerName, layerDef] of Object.entries(boardData.layerDefs)) {
                        addTuningButton(layerName);
                    }
    
                    globals.screengui.addControl(rtBar);
    
                    kbgbGUI.rtBar = rtBar;
                }

                addRTBar();

                globals.screengui.addControl(ctrlBar);
                
                kbgbGUI.activeModeCtrl = ctrlBar;
                boardOps.expandLayers();
            },
            refresh: () => {},
            remove: () => {
                boardOps.collapseLayers();
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
                globals.screengui.removeControl(kbgbGUI.rtBar);
            }
        },
        "files":{
            cameraMode:"front",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new StackPanel();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

                ctrlBar.addControl(addButton("DEBUG", () => {
                            // for(const [cID,cRD] of Object.entries(globals.renderData.cases)) {
                            //     pcbOps.routePCB(cID);
                            // }
                            // globals.debugCanvas.hidden = false;
                            exportKeyboard();
                        }, {height:buttonHeight,width:"120px"}));

                ctrlBar.addControl(addButton("export SVGs", () => {
                            downloadSVGs();
                        }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("export GBRs", () => {
                            downloadGBRs();
                        }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("save layout", () => {
                            download(boardOps.saveKeyboard(), `${boardData.getData().meta.name}.kbd`, 'text/plain');
                        }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("load layout", () => {
                            document.getElementById("loadKBD").click();
                        }, {height:buttonHeight,width:"120px"}));
                
                ctrlBar.addControl(addButton("import kle", (e) => {
                            document.getElementById("loadKLE").click();
                        }, {height:buttonHeight, width:"120px"}));

                let txt = kbgbGUI.addLabel("WORK IN PROGRESS");

                txt.width = "260px";
                ctrlBar.addControl(txt);
                

                globals.screengui.addControl(ctrlBar);
                
                kbgbGUI.activeModeCtrl = ctrlBar;
            },
            refresh: () => {},
            remove: () => {
                globals.screengui.removeControl(kbgbGUI.activeModeCtrl);
            }
        },
    },
    setGUIMode: function(mode) {
        if(mode == kbgbGUI.activeMode) {      
            if(kbgbGUI.modes[kbgbGUI.activeMode]) {
                kbgbGUI.modes[kbgbGUI.activeMode].refresh();
            }
            return;
        }

        if(kbgbGUI.modes[kbgbGUI.activeMode]) {
            kbgbGUI.modes[kbgbGUI.activeMode].remove();
        }
        if(kbgbGUI.modes[mode]) {
            kbgbGUI.modes[mode].add();
            kbgbGUI.modes[mode].refresh();
            snapCamera(kbgbGUI.modes[mode].cameraMode);
        }
        kbgbGUI.activeMode = mode;
    },
    refresh: function() {
        if(kbgbGUI.modes[kbgbGUI.activeMode]) {
            kbgbGUI.modes[kbgbGUI.activeMode].refresh();
        }
    },
    addModeGUI: function() {
        if(kbgbGUI.modeCtrl) {
            globals.screengui.removeControl(kbgbGUI.modeCtrl);
            kbgbGUI.modeCtrl = null;
        }
        else {
            globals.screengui = AdvancedDynamicTexture.CreateFullscreenUI("screenUI");
            globals.screengui.renderScale = 1.0;
        }

        let ctrlBar = new StackPanel();  
        ctrlBar.height = ctrlBarHeight;
        ctrlBar.isPointerBlocker = true;
        ctrlBar.isVertical = false;
        //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        ctrlBar.addControl(addButton("edit", () => {kbgbGUI.addEditModeGUI()}, {height:"1",width:"120px"}));

        kbgbGUI.modeCtrl = ctrlBar;
        globals.screengui.addControl(ctrlBar);
        kbgbGUI.setGUIMode("view");
    },
    addEditModeGUI: function() {
        if(kbgbGUI.modeCtrl) {
            globals.screengui.removeControl(kbgbGUI.modeCtrl);
            kbgbGUI.modeCtrl = null;
        }
        let ctrlBar = new StackPanel();  
        ctrlBar.height = ctrlBarHeight;
        ctrlBar.isPointerBlocker = true;
        ctrlBar.isVertical = false;
        //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ctrlBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        ctrlBar.addControl(addButton("layout", () => {kbgbGUI.setGUIMode("key")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("layers", () => {kbgbGUI.setGUIMode("details")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("case", () => {kbgbGUI.setGUIMode("case")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("parts", () => {kbgbGUI.setGUIMode("pcb")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("files", () => {kbgbGUI.setGUIMode("files")}, {height:"1",width:"120px"}));


        kbgbGUI.modeCtrl = ctrlBar;
        globals.screengui.addControl(ctrlBar);
    }
}