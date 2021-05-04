import {getFootShape} from './boardOps.js'

let data = {};

export function getData() { return data; }

export function genKeycapDefaults() { data.keycapDefaults = {profile:"KAM"}; }
export function getKeycapDefaults() { return data.keycapDefaults; }

export function setData(newData) { data = newData; };

export const layerDefs = {
    "pcbMesh":{height:1.6,offset:-5.1,stackOrder:null,visFilter:"drawPCB",shape:"pcbOutline",holes:[],mat:"fr4",physicalMat:"FR4",tuneable:null},
    "plateFoam":{height:3.5,offset:-1.5,stackOrder:null,visFilter:"drawPlateFoam",shape:"pcbOutline",holes:["switchCuts"],mat:"foam",physicalMat:"FOAM",tuneable:null},
    "caseFoam":{height:3.5,offset:-7.5,stackOrder:null,visFilter:"drawCaseFoam",shape:"cavityInner",holes:[],mat:"foam",physicalMat:"FOAM",tuneable:null},
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



