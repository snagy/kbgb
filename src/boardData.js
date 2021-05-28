import {getFootShape} from './boardOps.js'
import {tuning} from './tuning.js';
import {Scalar, Vector3, Matrix} from 'babylonjs';
import * as keyTypes from './keytypes.js';

let data = {};

export function getData() { return data; }

export function genKeycapDefaults() { data.keycapDefaults = {profile:"KAM"}; }
export function getKeycapDefaults() { return data.keycapDefaults; }

export function setData(newData) { data = newData; };

export const layerDefs = {
    "pcbMesh":{height:1.6,offset:-5.1,stackOrder:null,visFilter:"drawPCB",shape:"pcbOutline",holes:[],material:"fr4",physicalMat:"FR4",tuneable:null},
    "plateFoam":{height:3.5,offset:-1.5,stackOrder:null,visFilter:"drawPlateFoam",shape:"pcbOutline",holes:["switchCuts"],material:"foam_white",physicalMat:"FOAM",tuneable:null},
    "caseFoam":{height:3.5,offset:-7.5,stackOrder:null,visFilter:"drawCaseFoam",shape:"cavityInner",holes:[],material:"foam_white",physicalMat:"FOAM",tuneable:null},
    "bezel":{height:3,offset:6,stackOrder:2,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel","screwHoles"],mat:"case",physicalMat:"acrylic"},
    "bezel1":{height:3,offset:3,stackOrder:1,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel","screwHoles"],mat:"case",physicalMat:"acrylic"},
    "plate":{height:1.5,offset:0,stackOrder:0,visFilter:"drawPlate",shape:"caseFrame",holes:["screwHoles","switchCuts"],mat:"plate",physicalMat:"alu"},
    "edge":{height:3,offset:-1.5,stackOrder:-1,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "edge2":{height:3,offset:-4.5,stackOrder:-2,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "edge3":{height:3,offset:-7.5,stackOrder:-3,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "bottom":{height:3,offset:-10.5,stackOrder:-4,visFilter:"drawCase",shape:"caseFrame",holes:["screwHoles"],mat:"case",physicalMat:"acrylic"},
    "feet4":{height:3,offset:-13.5,stackOrder:-5,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:4.0,physicalMat:"acrylic",tuneable:null},
    "feet3":{height:3,offset:-16.5,stackOrder:-6,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:3.0,physicalMat:"acrylic",tuneable:null},
    "feet2":{height:3,offset:-19.5,stackOrder:-7,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:2.0,physicalMat:"acrylic",tuneable:null},
    "feet1":{height:3,offset:-22.5,stackOrder:-8,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:1.0,physicalMat:"acrylic",tuneable:null},
    "feet":{height:3,offset:-25.5,stackOrder:-9,visFilter:"drawCase",mat:"case",customShape:getFootShape,chin:0.0,physicalMat:"acrylic",tuneable:null}
};

export function layerGetValue(cBD, l, k) {
    if(cBD.layers && cBD.layers[l] && cBD.layers[l][k]!==undefined) {
        return cBD.layers[l][k];
    }
    else if(layerDefs[l] && layerDefs[l][k]!==undefined) {
        return layerDefs[l][k];
    }
    else {
        return cBD[k];
    }
}

export function layerSetValue(cBD, l, k, v) {
    if(!cBD.layers) {
        cBD.layers = {};
    }
    if(!cBD.layers[l]) {
        cBD.layers[l] = {};
    }
    cBD.layers[l][k] = v;
}




export function loadData(data) {
    if(!data.kbdVersion) {
        let bd = {};
        bd.meta = data.meta;
        bd.cases = data.cases?data.cases:{};
        bd.hasFeet = true;
        bd.layout = {keys: {}};
        let kIdx = 0
        for (let k of data.keys) {
            let keyInfo = {id: "key" + kIdx++,
                            special: "standard",
                            x: k.x,
                            y: k.y,
                            caseIdx: k.caseIdx||0,
                            width: k.width,
                            height: k.height,
                            rotation_angle: k.rotation_angle,
                            nub:k.nub,
                            stepped:k.stepped,
                            type:k.type,
                            encoder_knob_size:k.encoder_knob_size
                            };

            let rowGuess = 3;

            if(k.labels) {
                for(const label of k.labels) {
                    if(label) {
                        console.log(`checking label ${label}`)
                        let info = keyTypes.labelsInfo[label.toLowerCase()];
                        if(info) {
                            console.log(`row guess ${info.row}`)
                            rowGuess = info.row;
                            keyInfo.txt = label;
                            break;
                        }
                    }
                }
            }

            keyInfo.row = rowGuess;


            const getCenterOffset = (t) => {
                switch(t) {
                    case "oled": {
                        // hacky dims
                        let oledDim = [(38.1+tuning.bezelGap) / 2, (14.1+tuning.bezelGap) / 2];
                        return( [k.x * tuning.base1U[0] + oledDim[0],
                                  -(k.y * tuning.base1U[1] + oledDim[1])] );
                    }
                    case "ec11": {
                        return ([(k.x+0.5) * tuning.base1U[0],
                                  -((k.y+0.5) * tuning.base1U[1])]);
                    }
                    default: {
                        const center = [(tuning.base1U[0] + tuning.base1U[0] * (k.width - 1)) / 2,
                                (tuning.base1U[1] + tuning.base1U[1] * (k.height - 1)) / 2];
                        return ([k.x * tuning.base1U[0] + center[0],
                                  -(k.y * tuning.base1U[1] + center[1])]);
                    }
                }
            }
                            
            let centerOffset = getCenterOffset(k.type);
            let kXform = Matrix.Translation(centerOffset[0], 0, centerOffset[1]);
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
                kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
                kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
            }

            let newPos = Vector3.TransformCoordinates(new Vector3(0,0,0), kXform);

            keyInfo.x = newPos.x;
            keyInfo.y = -newPos.z;

            if(!bd.cases[keyInfo.caseIdx]) {
                bd.cases[keyInfo.caseIdx]  = Object.assign({}, tuning.defaultCase);
            }

            keyInfo.matName = k.color;
    
            if( k.width === 1 && k.height > 1) {
                keyInfo.vertical = true;
            }
            
            if(!(k.width2 === k.width && k.height2 === k.height && k.x2 === 0 && k.y2 === 0)) {
                if(k.width2 === 1.5 && k.height2 === 1 && k.width === 1.25 && k.height === 2 && k.x2 === -0.25 ) {
                    keyInfo.row = "special";
                    keyInfo.special = "ISO";
                }
                else if(k.width2 === 1.75 && k.height2 === 1 && k.width === 1.25 && k.x2 === 0) {
                    // stepped is..uhhh...weird.            
                    // keyInfo.width = 1.75;
                }
                keyInfo.width2 = k.width2;
                keyInfo.height2 = k.height2;
                keyInfo.x2 = k.x2;
                keyInfo.y2 = k.y2;
            }
            
            //todo: handle decals better
            if(k.decal === false && k.ghost === false) {
                bd.layout.keys[keyInfo.id] = keyInfo;
            }
        }
        bd.kbdVersion = "0.0.2";
        setData(bd);
    }
    else if(data.kbdVersion === "0.0.2") {
        for(const [k,c] of Object.entries(data.cases)) {
            // c.bezelThickness /= tuning.bezelThickness.max;
            // c.caseCornerFillet /= tuning.caseCornerFillet.max;

            c.material = "pom_white";
        }
        setData(data);
    }
    else if(data.kbdVersion === "0.0.3") {
        const oldBezelThickness = {min:5.5,max:50};
        const oldCaseCornerFillet = {min:0.5,max:30};
        for(const [k,c] of Object.entries(data.cases)) {
            c.bezelThickness = Scalar.Lerp(oldBezelThickness.min, oldBezelThickness.max, c.bezelThickness);
            c.caseCornerFillet = Scalar.Lerp(oldCaseCornerFillet.min, oldCaseCornerFillet.max, c.caseCornerFillet);

            for(const [lK, layer] of Object.entries(c.layers)) {
                if(layer.bezelThickness !== undefined) {
                    layer.bezelThickness = Scalar.Lerp(oldBezelThickness.min, oldBezelThickness.max, layer.bezelThickness);
                }
                if(layer.caseCornerFillet !== undefined) {
                    layer.caseCornerFillet = Scalar.Lerp(oldCaseCornerFillet.min, oldCaseCornerFillet.max, layer.caseCornerFillet);
                }
            }
        }
        setData(data);
    }
    else if(data.kbdVersion) {
        setData(data);
    }
}


export function exportData() {
    const bd = getData();
    bd.kbdVersion = "0.0.4";
    return JSON.stringify(bd);
}