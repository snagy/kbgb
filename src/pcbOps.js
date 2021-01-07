import {globals} from './globals.js';
import {tuning} from './tuning.js';
import * as coremath from './coremath.js';
import {Vector3} from '@babylonjs/core'

// DRL = drill  
// GKO = outline           +
// GTP = solder paste top   +
// GBP = solder paste bottom +
// GTS = solder mask top -
// GBS = solder mask bottom - (negative)
// GTO = silkscreen top +
// GBO = silkscreen bottom +
// GTL = copper top +
// GBL = copper bottom +
// GL2 = inner 2 +
// GL3 = inner 3 +

const defaultTrackWidth = 0.2032; // 8 mil.  10 mil = .25, pins are 2.25, maybe go with that as a mult?

const footprintDefs = {
    "mx":{
        pthDefs: {
            "switchPin":  {radius:1.470/2, ring: 0.78/2},
            "stemPin": {radius:3.988/2, ring:0.0},
            "sidePin": {radius:1.75/2, ring:0.0}
        },
        bounds: [9,6.75],
        pthList: [
            {pin: 1, loc: [-3.81, 2.54], defName:"switchPin"},
            {pin: 2, loc: [2.54, 5.080], defName:"switchPin"},
            {pin: 0, loc: [0, 0], defName:"stemPin"},
            {pin: 0, loc: [-5.08, 0], defName:"sidePin"},
            {pin: 0, loc: [5.08, 0], defName:"sidePin"}
        ],
        pins: ["1","2"]
    },
    "oled":{
        bounds:[15,6.75]
    },
    "ec11":{
        bounds:[15/2,12/2]
    },
    "stab":{
        pthDefs: {
            "smallPin":  {radius:3.048/2, ring: 0},
            "bigPin": {radius:3.9878/2, ring:0}
        },
        bounds:[3,9],
        pthList: [
            {pin: 0, loc: [0, -6.985], defName:"smallPin"},
            {pin: 0, loc: [0, 8.255], defName:"bigPin"}
        ]
    }
};


export function clearPCB() {
    globals.pcbData = {outline:[], devices:{}, nets:{}};
}

export function addDevice(id, t, xForm) {
    if(!globals.pcbData.devices[id]) {
        globals.pcbData.devices[id] = {footprints:[],id:id};
    }
    let d = globals.pcbData.devices[id];

    let newDef = footprintDefs[t];
    let newFootprint = {pths:[]};

    if(newDef.bounds) {
        newFootprint.box = coremath.createRectPoly(newDef.bounds[0], newDef.bounds[1], xForm);
    }

    if(newDef.pthList) {
        for(const hole of newDef.pthList) {
            const holeDef = newDef.pthDefs[hole.defName];
            const pth = {radius:holeDef.radius, ring:holeDef.ring};
            pth.location = Vector3.TransformCoordinates(new Vector3(hole.loc[0], 0, hole.loc[1]), xForm);
            newFootprint.pths.push(pth);
            for(const pin of holeDef.pins) {
                newFootprint.pins.push({name:pin})
            }
        }
    }

    d.footprints.push(newFootprint)
}

export function createNets(pcb) {

    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            if(f.box) {
                for( let p of f.box.points) {
                    kPs.push(p)
                }
            }
        }
    }
}

export function refreshPCBOutline(bd) {
    const pD = globals.pcbData;
    let kPs = [];
    for( let [id,d] of Object.entries(pD.devices) ) {
        for(let f of d.footprints) {
            if(f.box) {
                for( let p of f.box.points) {
                    kPs.push(p)
                }
            }
        }
    }
    const cRD = globals.renderData.case;
    pD.outline = coremath.convexHull2d(kPs);
    // if(bd.forcePCBSymmetrical) {
    //     let midPoint = (bd.layout.bounds.maxs[0] - bd.layout.bounds.mins[0]) * 0.5 + bd.layout.bounds.mins[0];
    //     for(let oP of pD.outline) {
    //         kPs.push(new Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
    //     }
    //     pD.outline = coremath.convexHull2d(kPs);
    // }
}
