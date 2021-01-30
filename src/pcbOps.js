import {globals} from './globals.js';
import {tuning} from './tuning.js';
import * as coremath from './coremath.js';
import {Matrix, Vector3, Epsilon} from '@babylonjs/core'
import FlatQueue from 'flatqueue';
import { find } from '@svgdotjs/svg.js';

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

function genPads(centerToPadStart, sideWidth, nPadsPerSide, padH, padW, padPitch) {
    let pads = [];

    const corners = [{x:0,y:1},{x:0,y:0},{x:1,y:0},{x:1,y:1},]

    //assume 4 sides
    for(let t = -1; t <= 1; t+=2) {
        for(let s = 0; s <= 1; s++) {
            for(let p = 0; p < nPadsPerSide; p++) {
                let pos = -(sideWidth / 2) + p*padPitch;
                let pad = [];
                for(const corner of corners) {
                    let pX = pos + corner.x*padW;
                    let pY = centerToPadStart + corner.y*padH;
                    let fX = s==0?pX*t:pY*t;
                    let fY = s==1?pX*t:pY*t;
                    pad.push([fX,fY]);
                }
                pads.push(pad);
            }
        }
    }

    return pads;
}

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
    },
    "UFQFPN48":{
        bounds: [7.3/3,7.3/2],
        padList: genPads(3.1, 5.8, 12, 0.55, 0.3, 0.5)
    }
};

export function clearPCB() {
    globals.pcbData = {outline:[], devices:{}, nets:{}};
}

export function addDevice(id, t, xForm) {
    if(!globals.pcbData.devices[id]) {
        globals.pcbData.devices[id] = {footprints:[],type:t,id:id};
    }
    let d = globals.pcbData.devices[id];

    let newDef = footprintDefs[t];
    let newFootprint = {pths:[],pins:[],pads:[]};

    if(newDef.bounds) {
        newFootprint.box = coremath.createRectPoly(newDef.bounds[0], newDef.bounds[1], xForm);
        newFootprint.bounds = {mins:[100000.0, 100000.0],
            maxs:[-100000.0, -100000.0]};

        for(let p of newFootprint.box.points) {
            newFootprint.bounds.mins[0] = Math.min(newFootprint.bounds.mins[0], p.x);
            newFootprint.bounds.maxs[0] = Math.max(newFootprint.bounds.maxs[0], p.x);
            newFootprint.bounds.mins[1] = Math.min(newFootprint.bounds.mins[1], p.z);
            newFootprint.bounds.maxs[1] = Math.max(newFootprint.bounds.maxs[1], p.z);
        }
    }

    if(newDef.pthList) {
        for(const hole of newDef.pthList) {
            const holeDef = newDef.pthDefs[hole.defName];
            const pth = {radius:holeDef.radius, ring:holeDef.ring, pin:hole.pin};
            pth.location = Vector3.TransformCoordinates(new Vector3(hole.loc[0], 0, hole.loc[1]), xForm);
            newFootprint.pths.push(pth);
        }
    }

    if(newDef.pins) {
        for(const pin of newDef.pins) {
            newFootprint.pins.push({name:pin})
        }
    }

    if(newDef.padList) {
        for(const pad of newDef.padList) {
            let xPad = [];
            for(const p of pad) {
                xPad.push(Vector3.TransformCoordinates(new Vector3(p[0], 0, p[1]), xForm));
            }
            newFootprint.pads.push(xPad);
        }
    }

    d.footprints.push(newFootprint)
}

function createMatrix(pcb) {
    let maxCols = 16;
    let maxRows = 16;
    let maxW = Math.min(maxCols,Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0])/tuning.base1U[0]));
    let maxH = Math.min(maxRows,Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1])/tuning.base1U[1]));
    let matrix = [];
    console.log(`Max matrix: ${maxW} cols ${maxH} rows`)
    for(let i = 0; i < maxH; i++) {
        matrix.push(new Array(maxW));
    }
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            // if it has pins, needs to be in the matrix
            if(f.pins.length > 0) {
                let colGuess = Math.floor((f.bounds.mins[0]-pcb.outlineBounds.mins[0])/tuning.base1U[0]) % maxW;
                let rowGuess = Math.floor((f.bounds.mins[1]-pcb.outlineBounds.mins[1])/tuning.base1U[1]) % maxH;

                let ogCol = colGuess;
                let ogRow = rowGuess;
                console.log(`initial guess: row ${rowGuess} col ${colGuess}`)
                while( matrix[rowGuess][colGuess] ) {
                    colGuess += 1;
                    //TODO BETTER INSERTION HERE
                    console.log(`bumping to: row ${rowGuess} col ${colGuess}`)
                }
                matrix[rowGuess][colGuess] = f;
                f.matrixPos = {row:rowGuess, col:colGuess};
                // for( let p of f.pins) {
                //     kPs.push(p)
                // }
            }
        }
    }
    return matrix;
}

function genVoronoi(pcb) {

}

function genSDF(pcb) {
    var startTime = window.performance.now();
    const cellSizeMM = pcb.trackWidth*10;
    const cellSizeMMInv = 1.0/cellSizeMM;
    const xStart = pcb.outlineBounds.mins[0];
    const yStart = pcb.outlineBounds.mins[1];
    let w = Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0]) * cellSizeMMInv);
    let h = Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv);

    let sdf = [];
    for(let i = 0; i < h; i++) {
        sdf.push(new Array(w).fill(100000.0));
    }

    console.log(`SDF: ${w} cols ${h} rows`)
    // splat some 3x3 blocks circles into things
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for( const pth of f.pths ) {
                const center = [(pth.location.x - xStart)*cellSizeMMInv,(pth.location.z-yStart)*cellSizeMMInv];
                const radius = pth.radius + pth.ring;
                const cX = Math.floor(center[0]);
                const cY = Math.floor(center[1]);

                for(let oy = -1; oy<=1; oy++) {
                    for(let ox = -1; ox<=1; ox++) {
                        const y = cY - oy;
                        const x = cX - ox;
                        if(x >= 0 && x < w && y >= 0 && y < h) {
                            const distSq = Math.pow(center[0]-x,2)+Math.pow(center[1]-y,2);
                            const dist = Math.sqrt(distSq)-radius;
                            sdf[y][x] = Math.min(sdf[y][x], dist);
                        }
                    }
                }
            }
        }
    }

    console.log("preblur");
    //blur it
    const dirs = [{d:[1,0],pX:[w-1,-1,-1],pY:[0,h,1]},
                  {d:[-1,0],pX:[0,w,1],pY:[0,h,1]},
                  {d:[0,1],pX:[0,w,1],pY:[h-1,-1,-1]},
                  {d:[0,-1],pX:[0,w,1],pY:[0,h,1]}];

    for(const dir of dirs) {
        for(let y = 0; y < h; y++) {
            console.log(sdf[y]);
        }
        console.log("blur");
        console.log(dir);
        for(let y = dir.pY[0]; y != dir.pY[1]; y+=dir.pY[2]) {
            const oY = y + dir.d[1];
            for(let x = dir.pX[0]; x != dir.pX[1]; x+=dir.pX[2]) {
                const oX = x + dir.d[0];
                if(oX >= 0 && oX < w && oY >= 0 && oY < h) {
                    sdf[y][x] = Math.min(sdf[y][x], sdf[oY][oX]+1);
                } else {
                    sdf[y][x] = Math.min(sdf[y][x], 1);
                }
            }
        } 
    }

    let maxD = -10000;
    let coords = [0,0];
    console.log("postblur");
    for(let y = 0; y < h; y++) {
        console.log(sdf[y]);
        for(let x = 0; x < w; x++) {
            if(sdf[y][x] > maxD) {
                maxD = sdf[y][x];
                coords[0] = x;
                coords[1] = y;
            }
        }
    }

    console.log(`SDF locating took ${window.performance.now()-startTime}`);

    let maxPos = [coords[0]*cellSizeMM + xStart, coords[1]*cellSizeMM + yStart];

    console.log(`empty zone: ${maxPos[0]} ${maxPos[1]} clearance ${maxD * cellSizeMM}`)

    let kXform = Matrix.RotationY(45.0 * Math.PI / 180.0);
    kXform = kXform.multiply(Matrix.Translation(maxPos[0], 0, maxPos[1]));

    addDevice("MCU", "UFQFPN48", kXform);
}

export function createNets(pcb) {
    const startTime = window.performance.now();
    const matrix = createMatrix(pcb);

    const matrixCreatedTime = window.performance.now();
    const cellSizeMM = pcb.trackWidth*1.5;
    const cellSizeMMInv = 1.0/cellSizeMM;
    const xStart = pcb.outlineBounds.mins[0];
    const yStart = pcb.outlineBounds.mins[1];
    let w = Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0]) * cellSizeMMInv);
    let h = Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv);
    let occupancy = [[],[]];
    let vias = [];
    const top = 0;
    const bottom = 1;
    console.log(`occupancy: ${w} cols ${h} rows`)
    for(let i = 0; i < h; i++) {
        occupancy[0].push(new Array(w));
        occupancy[1].push(new Array(w));
        vias.push({});
    }

    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for( const pth of f.pths ) {
                // i guess we could assign nets here
                if(pth.pin == 1) {
                    pth.net = `mRow${f.matrixPos.row}`;
                }
                else if(pth.pin == 2) {
                    pth.net = `mCol${f.matrixPos.col}`;
                }

                if(pth.net) {
                    if(!pcb.nets[pth.net]) {
                        pcb.nets[pth.net] = {members:[],connectivity:[]};
                    }
                    pth.subnet = pcb.nets[pth.net].members.length;
                    pcb.nets[pth.net].members.push(pth);
                    pcb.nets[pth.net].connectivity.push([pth.subnet]);
                }
                // rasterize this into the occupancy map
                // deal with if this was already set?
                const center = [(pth.location.x - xStart)*cellSizeMMInv,(pth.location.z-yStart)*cellSizeMMInv];
                const radius = pth.radius + pth.ring + cellSizeMM;
                const pixRad = Math.ceil(radius * cellSizeMMInv);
                for( let x = -pixRad; x <= pixRad; x++ ) {
                    const locX = center[0] + x;
                    if( locX < 0 || locX >= w) {
                        continue;
                    }
                    for( let y = -pixRad; y <= pixRad; y++ ) {
                        const locY = center[1] + y;
                        if( locY < 0 || locY >= h) {
                            continue;
                        }

                        if(x*x+y*y < pixRad*pixRad) {
                            occupancy[0][Math.floor(locY)][Math.floor(locX)] = pth;
                            occupancy[1][Math.floor(locY)][Math.floor(locX)] = pth;
                        }
                    }
                }
            }
            for( const pad of f.pads ) {
                // todo: currently we assume all pads are on the bottom
                // and round. :/
                const side = 0;
                // rasterize this into the occupancy map
                // deal with if this was already set?
                let centerP = new Vector3();
                for(const p of pad) {
                    centerP.addInPlace(p);
                }
                centerP.scaleInPlace(1 / pad.length);
                const center = [(centerP.x - xStart)*cellSizeMMInv,(centerP.z-yStart)*cellSizeMMInv];
                const radius = 0.5 + cellSizeMM;
                const pixRad = Math.ceil(radius * cellSizeMMInv);
                for( let x = -pixRad; x <= pixRad; x++ ) {
                    const locX = center[0] + x;
                    if( locX < 0 || locX >= w) {
                        continue;
                    }
                    for( let y = -pixRad; y <= pixRad; y++ ) {
                        const locY = center[1] + y;
                        if( locY < 0 || locY >= h) {
                            continue;
                        }

                        if(x*x+y*y < pixRad*pixRad) {
                            occupancy[side][Math.floor(locY)][Math.floor(locX)] = pad;
                        }
                    }
                }
            }
        }
    }


    const occupancyCreatedTime = window.performance.now();

    pcb.topRoutes = [];
    pcb.bottomRoutes = [];
    pcb.vias = [];

    function connectGraphs(net,ia,ib) {
        let a = net.connectivity[ia];
        let b = net.connectivity[ib];
        for(const v of b) {
            if(!a.includes(v)) {
                a.push(v);
            }
            net.connectivity[v] = a;
        }
    }

    for(const [netName,net] of Object.entries(pcb.nets)) {
        while(net.connectivity[0].length != net.members.length) {
            for(const pth of net.members) {
                if(net.connectivity[0].length == net.members.length) break;
                // pathfind from here to the net!
                let current = [Math.floor((pth.location.x - xStart)*cellSizeMMInv),Math.floor((pth.location.z-yStart)*cellSizeMMInv),(pth.pin == 1)?0:1];
                let currentDist = 0;
                let startTok = current[2]*w*h+current[1]*w+current[0];
                const cameFrom = {};
                cameFrom[startTok] = `START`;
                const pending = new FlatQueue();
                let destination = false;
                while(!destination) {
                    let curTok = current[2]*w*h+current[1]*w+current[0];
                    for(let i = 0; i<5; i++) {
                        let xOffset = i==0?-1:(i==1?1:0);
                        let yOffset = i==2?-1:(i==3?1:0);
                        let side = i==4?(1^current[2]):current[2];
                        let next = [current[0]+xOffset,current[1]+yOffset, side];
                        if(next[0]>=0 && next[0] < w && next[1]>=0 && next[1] < h) {
                            let occupant = occupancy[next[2]][next[1]][next[0]];
                            const nameTok = next[2]*w*h+next[1]*w+next[0];
                            if(!cameFrom[nameTok]) {
                                let blocker = (occupant && occupant != pth && occupant.net != pth.net)
                                if( !blocker ) {
                                    cameFrom[nameTok] = curTok;

                                    let cost = i==4?80:10; //8x the cost for a via
                                    let findCostGuess = function() {
                                        let minGuess = 100000000;
                                        for(const oth of net.members) { 
                                            if(!net.connectivity[oth.subnet].includes(pth.subnet)) {
                                                //todo:  add cost of side switching for pads
                                                let end = [Math.floor((oth.location.x - xStart)*cellSizeMMInv),Math.floor((oth.location.z-yStart)*cellSizeMMInv)];

                                                // let estCost = Math.abs(end[0]-next[0]) + Math.abs(end[1]-next[1]);
                                                let estCost = Math.sqrt(Math.pow(Math.abs(end[0]-next[0]),2) + Math.pow(Math.abs(end[1]-next[1]),2));
                                                estCost *= 10;
                                                
                                                minGuess = Math.min(minGuess,estCost);
                                            }
                                        }
                                        return minGuess;
                                    }

                                    if(occupant) {
                                        if(!net.connectivity[occupant.subnet].includes(pth.subnet)) {
                                            // console.log(`found a destination: ${nameTok}`);
                                            if(occupant.location) {
                                                let end = [Math.floor((occupant.location.x - xStart)*cellSizeMMInv),Math.floor((occupant.location.z-yStart)*cellSizeMMInv)];
                                                let endTok = next[2]*w*h+end[1]*w+end[0];
                                                cameFrom[endTok] = curTok;
                                                destination = endTok;
                                            }
                                            else {
                                                destination = nameTok;
                                            }
                                            connectGraphs(net, occupant.subnet, pth.subnet);
                                            break;
                                        }
                                        else {
                                            cost = 1;
                                        }
                                    }
                                    pending.push({node:next,dist:currentDist+cost},currentDist+cost+findCostGuess());
                                }
                            }
                        }
                    }
                    if(pending.length == 0) {
                        console.log("could not reach destination!");
                        console.log(pth);
                        return;
                    }
                    const nextNode = pending.pop()
                    currentDist = nextNode.dist;
                    current = nextNode.node;
                }
                if(destination) {
                    // reconstruct path here
                    let nextTok = destination;
                    let lineSide = Math.floor(nextTok / (w*h));
                    let lineStartLoc = new Vector3(((nextTok%(w*h)) % w) * cellSizeMM + xStart, 0, Math.floor((nextTok%(w*h)) / w) * cellSizeMM + yStart);
                    let prevLoc = lineStartLoc;
                    while(cameFrom[nextTok] && cameFrom[nextTok] != 'START') {
                        // console.log(`came from ${cameFrom[nextTok]}`);
                        nextTok = cameFrom[nextTok];
                        let nextSide = Math.floor(nextTok / (w*h));
                        let sideTok = nextTok%(w*h)
                        let nextLoc = new Vector3((sideTok % w) * cellSizeMM + xStart, 0, Math.floor(sideTok / w) * cellSizeMM + yStart);
                        if(!occupancy[nextSide][Math.floor(sideTok / w)][sideTok % w]) {
                            occupancy[nextSide][Math.floor(sideTok / w)][sideTok % w] = {type:"route",net:pth.net,subnet:pth.subnet};
                        }
    
                        if(nextSide != lineSide || (Math.abs(lineStartLoc.x - nextLoc.x) > Epsilon && Math.abs(lineStartLoc.z - nextLoc.z) > Epsilon) ) // new line!
                        {
                            let route = [lineStartLoc,prevLoc];
                            let routeSide = (lineSide == 1)?pcb.topRoutes:pcb.bottomRoutes;
                            routeSide.push(route);
                            if(nextSide != lineSide) {
                                pcb.vias.push(nextLoc);
                                vias[Math.floor(sideTok / w)][sideTok % w] = {net:pth.net,subnet:pth.subnet};
                            }
                            lineStartLoc = prevLoc;
                            lineSide = nextSide;
                        }
                        prevLoc = nextLoc;
                    }
                    let routeSide = (lineSide == 1)?pcb.topRoutes:pcb.bottomRoutes;
                    routeSide.push([lineStartLoc,prevLoc]);
                }
            }
        }
    }
    const pathingTime = window.performance.now();

    console.log(`creating matrix took ${matrixCreatedTime-startTime} ms`);
    console.log(`creating occupancy took ${occupancyCreatedTime-matrixCreatedTime} ms`);
    console.log(`route pathing took ${pathingTime-occupancyCreatedTime} ms`);
    // let lastCols = new Array(matrix[0].length);
    // for( const row of matrix ) {
    //     let lastKey = null;
    //     let col = 0;
    //     for(const keySlot of row ) {
    //         if(keySlot) {
    //             if(lastKey) {
    //                 let route = [keySlot.pths[0].location, lastKey.pths[0].location];
    //                 pcb.topRoutes.push(route);
    //             }
    //             lastKey = keySlot;
    //             if(lastCols[col]) {
    //                 let route = [keySlot.pths[1].location, lastCols[col].pths[1].location];
    //                 pcb.bottomRoutes.push(route);
    //             }
    //             lastCols[col] = keySlot;
    //         }
    //         col++;
    //     }
    // }

    // for( let [id,d] of Object.entries(pcb.devices) ) {
    //     for(let f of d.footprints) {
    //         if(f.box) {
    //             for( let p of f.box.points) {
    //                 kPs.push(p)
    //             }
    //         }
    //     }
    // }
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

    pD.outlineBounds = {mins:[100000.0, 100000.0],
        maxs:[-100000.0, -100000.0]};
    for(let p of pD.outline) {
        pD.outlineBounds.mins[0] = Math.min(pD.outlineBounds.mins[0], p.x);
        pD.outlineBounds.maxs[0] = Math.max(pD.outlineBounds.maxs[0], p.x);
        pD.outlineBounds.mins[1] = Math.min(pD.outlineBounds.mins[1], p.z);
        pD.outlineBounds.maxs[1] = Math.max(pD.outlineBounds.maxs[1], p.z);
    }
    pD.trackWidth = defaultTrackWidth;

    const sdf = genSDF(pD);

    createNets(pD);
}
