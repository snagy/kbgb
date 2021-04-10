import {globals} from './globals.js';
import {tuning} from './tuning.js';
import * as coremath from './coremath.js';
import {Matrix, Vector3, Epsilon, TmpVectors} from 'babylonjs'
import FlatQueue from 'flatqueue';

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


// FIX THIS TO GEN PIN IDS
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

//bounds are half width / half height
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
    "mx_hotswap": {
        pthDefs: {
            "switchPin":  {radius:3.0/2, ring: 0.1/2},
            "stemPin": {radius:3.988/2, ring:0.0},
            "sidePin": {radius:1.75/2, ring:0.0}
        },
        bounds: [9,6.75],
        pthList: [
            {pin: 1, loc: [-3.81, 2.54], defName:"switchPin"},
            {pin: 2, loc: [2.54, 5.08], defName:"switchPin"},
            {pin: 0, loc: [0, 0], defName:"stemPin"},
            {pin: 0, loc: [-5.08, 0], defName:"sidePin"},
            {pin: 0, loc: [5.08, 0], defName:"sidePin"}
        ],  //x: p loc + 2.275, to 2.275 + 2.55, z = ploc +/1.25
        padList: [{pin:1, 
                   poly:[[-3.81, 2.54], [-3.81-2.275, 2.54 + 1.25],[-3.81-2.275-2.55, 2.54 + 1.25],[-3.81-2.275-2.55, 2.54 - 1.25],[-3.81-2.275, 2.54 - 1.25]],
                   loc:[-3.81-2.275-(2.55/2),2.54]}, 
                  {pin:2,
                   poly:[[2.54, 5.08], [2.54+2.275, 5.08 + 1.25],[2.54+2.275+2.55, 5.08 + 1.25],[2.54+2.275+2.55, 5.08 - 1.25],[2.54+2.275, 5.08 - 1.25]],
                   loc:[2.54+2.275+(2.55/2),5.08]}],
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

export function clearPCBs() {
    globals.pcbData = {};
    const bd = globals.boardData;
    for(const [k,cBD] of Object.entries(bd.cases)) {
        globals.pcbData[k] = {outline:[], devices:{}, nets:{}, caseIdx:k};
    }
}

export function addDevice(id, t, xForm, caseIdx) {
    const pcbData = globals.pcbData;
    const caseData = pcbData[caseIdx];
    if(!caseData.devices[id]) {
        caseData.devices[id] = {footprints:[],type:t,id:id, caseIdx:caseIdx};
    }
    let d = caseData.devices[id];

    let newDef = footprintDefs[t];
    let newFootprint = {pths:[],pads:[]};

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

    if(newDef.pins) {
        newFootprint.pins = {};
        for(const pin of newDef.pins) {
            newFootprint.pins[pin] = {name:pin};
        }
    }

    if(newDef.pthList) {
        for(const hole of newDef.pthList) {
            const holeDef = newDef.pthDefs[hole.defName];
            const pth = {type:"pth", radius:holeDef.radius, ring:holeDef.ring};
            if(hole.pin) {
                pth.pin = newFootprint.pins[hole.pin];
            }
            pth.location = Vector3.TransformCoordinates(new Vector3(hole.loc[0], 0, hole.loc[1]), xForm);
            newFootprint.pths.push(pth);
        }
    }

    if(newDef.padList) {
        for(const pad of newDef.padList) {
            let xPad = [];
            for(const p of pad.poly) {
                const xformedP = Vector3.TransformCoordinates(new Vector3(p[0], 0, p[1]), xForm);
                xPad.push(xformedP);
            }
            const xformedLocation = Vector3.TransformCoordinates(new Vector3(pad.loc[0], 0, pad.loc[1]), xForm);
            const newPad = {type:"pad", poly:xPad,location:xformedLocation};
            if(pad.pin) {
                newPad.pin = newFootprint.pins[pad.pin];
            }
            newFootprint.pads.push(newPad);
        }
    }

    d.footprints.push(newFootprint)
}

function createMatrix(pcb) {
    let maxCols = 26;
    let maxRows = 26;
    let maxW = Math.min(maxCols,Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0])/tuning.base1U[0]));
    let maxH = Math.min(maxRows,Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1])/tuning.base1U[1]));
    let matrix = [];
    console.log(`Max matrix: ${maxW} cols ${maxH} rows`)
    for(let i = 0; i < maxH; i++) {
        matrix.push(new Array(maxW));
    }
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            // HAAACK if it has pins, needs to be in the matrix
            if(f.pins) {
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
    var vSites = [];
    var bbox = {xl:1000000, xr:-1000000, yt:1000000, yb:-1000000};

    let addSite = function(x,y) {
        const site = {x:x,y:y};
        vSites.push(site);
        bbox.xl = Math.min(site.x,bbox.xl);
        bbox.xr = Math.max(site.x,bbox.xr);
        bbox.yt = Math.min(site.y,bbox.yt);
        bbox.yb = Math.max(site.y,bbox.yb);
    }

    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for( const pth of f.pths ) {
                addSite(pth.location.x,pth.location.z);
            }
        }
    }

    // // hrm: add outline points?
    // for(let p of pcb.outline) {
    //     addSite(p.x,p.z);
    // }

    bbox.xl -= 1000;
    bbox.yt -= 1000;
    bbox.xr += 1000;
    bbox.yb += 1000;
                
    // xl, xr means x left, x right
    // yt, yb means y top, y bottom
    let voronoi = new Voronoi();
    // pass an object which exhibits xl, xr, yt, yb properties. The bounding
    // box will be used to connect unbound edges, and to close open cells
    const vRes = voronoi.compute(vSites, bbox);
    // render, further analyze, etc.

    console.log(`voronoi!`);
    console.log(vRes);
}

function genSDF(pcb) {
    var startTime = window.performance.now();
    const cellSizeMM = pcb.trackWidth*10;
    const cellSizeMMInv = 1.0/cellSizeMM;
    const xStart = pcb.outlineBounds.mins[0];
    const yStart = pcb.outlineBounds.mins[1];
    let w = Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0]) * cellSizeMMInv);
    let h = Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv);

    console.log(`SDF: ${w} cols ${h} rows`)

    if( w <= 0 || h <= 0 ) {
        console.log(`No PCB SDF`)
        return;
    }
    let sdf = [];
    for(let i = 0; i < h; i++) {
        sdf.push(new Array(w).fill(100000.0));
    }

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

    // console.log("preblur");
    //blur it
    const dirs = [{d:[1,0],pX:[w-1,-1,-1],pY:[0,h,1]},
                  {d:[-1,0],pX:[0,w,1],pY:[0,h,1]},
                  {d:[0,1],pX:[0,w,1],pY:[h-1,-1,-1]},
                  {d:[0,-1],pX:[0,w,1],pY:[0,h,1]}];

    for(const dir of dirs) {
        // for(let y = 0; y < h; y++) {
        //     console.log(sdf[y]);
        // }
        // console.log("blur");
        // console.log(dir);
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
    // console.log("postblur");
    for(let y = 0; y < h; y++) {
        // console.log(sdf[y]);
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

    // addDevice("MCU", "UFQFPN48", kXform, pcb.caseIdx);
}

export function createNets(pcb) {
    const startTime = window.performance.now();
    const matrix = createMatrix(pcb);

    const matrixCreatedTime = window.performance.now();
    const cellSizeMM = 0.8;// via size, was
    // const cellSizeMM = 1.5*pcb.trackWidth;
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
    const s0 = TmpVectors.Vector3[11];
    s0.x = pcb.outlineBounds.mins[0] - 100.0;
    s0.y = 0;
    const s1 = TmpVectors.Vector3[12];
    s1.x = pcb.outlineBounds.maxs[0] + 100.0;
    s1.y = 0;
    let out_marker = {type:"out"};
    for(let i = 0; i < h; i++) {
        occupancy[0].push(new Array(w));
        occupancy[1].push(new Array(w));
        vias.push({});
        //rasterize across each line of the occupancy
        const lineZ = pcb.outlineBounds.mins[1] + cellSizeMM*(i+0.5);
        s0.z = s1.z = lineZ
        const intersections = coremath.polyIntersectionSlice(s0, s1, pcb.outline);
        intersections.sort((a,b) => a.x - b.x);

        let is_out = true;
        let nextIntIdx = 0;
        for(let j = 0; j < w; j++) {
            if(intersections.length > nextIntIdx) {
                const pointX = is_out?pcb.outlineBounds.mins[0] + cellSizeMM*(j-1.5):pcb.outlineBounds.mins[0] + cellSizeMM*(j+1.5);
                let nextIntersection = intersections[nextIntIdx]
                while(intersections.length > nextIntIdx && nextIntersection.x < pointX ) {
                    is_out = !is_out;
                    nextIntIdx+=1;
                    nextIntersection = intersections[nextIntIdx]
                }
            }
            if(is_out) {
                occupancy[0][i][j] = out_marker;
                occupancy[1][i][j] = out_marker;
            }
        }
    }

    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for( const pth of f.pths ) {
                // i guess we could assign nets here
                let pin = pth.pin;
                if(pin && !pin.net) {
                    if(pin.name == 1) {
                        pin.net = `mRow${f.matrixPos.row}`;
                        pin.subnet = -1;
                    }
                    else if(pin.name == 2) {
                        pin.net = `mCol${f.matrixPos.col}`;
                        pin.subnet = -1;
                    }
                }

                if(pin && pin.net) {
                    if(!pcb.nets[pin.net]) {
                        pcb.nets[pin.net] = {members:[],connectivity:[]};
                    }
                    if(pin.subnet == -1) {
                        pin.subnet = pcb.nets[pin.net].connectivity.length;
                        pcb.nets[pin.net].connectivity.push([pin.subnet]);
                    }
                    pcb.nets[pin.net].members.push(pth);   // NOT pin
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
            for( const padInfo of f.pads ) {
                // todo: currently we assume all pads are on the bottom

                // i guess we could assign nets here
                let pin = padInfo.pin;
                if(pin && !pin.net) {
                    if(pin.name == 1) {
                        pin.net = `mRow${f.matrixPos.row}`;
                        pin.subnet = -1;
                    }
                    else if(pin.name == 2) {
                        pin.net = `mCol${f.matrixPos.col}`;
                        pin.subnet = -1;
                    }
                }

                if(pin && pin.net) {
                    if(!pcb.nets[pin.net]) {
                        pcb.nets[pin.net] = {members:[],connectivity:[]};
                    }
                    if(pin.subnet == -1) {
                        pin.subnet = pcb.nets[pin.net].connectivity.length;
                        pcb.nets[pin.net].connectivity.push([pin.subnet]);
                    }
                    pcb.nets[pin.net].members.push(padInfo);   // NOT pin
                }

                const pad = padInfo.poly;
                let mins = [100000,100000]
                let maxs = [-100000,-100000]
                for(const p of pad) {
                    mins[0] = Math.min(mins[0],p.x);
                    mins[1] = Math.min(mins[1],p.z);
                    maxs[0] = Math.max(maxs[0],p.x);
                    maxs[1] = Math.max(maxs[1],p.z);
                }
                let minJ = Math.floor((mins[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv)-1;
                let jSpan = Math.ceil((maxs[1]-mins[1]) * cellSizeMMInv)+2;

                let padRasterLines = new Array(jSpan);
                for(let j = 0; j < jSpan; j++) {
                    padRasterLines[j] = [];
                }

                const lP = TmpVectors.Vector3[10];

                for(let iP = 0; iP < pad.length; iP++) {
                    const p = pad[iP];
                    const nP = pad[(iP+1)%pad.length];
                    nP.subtractToRef(p,lP);
                    
                    let minH = Math.floor((Math.min(p.z, nP.z) - pcb.outlineBounds.mins[1]) * cellSizeMMInv)-1;
                    let hOffset = minH - minJ;
                    let maxH = Math.ceil((Math.max(p.z, nP.z) - pcb.outlineBounds.mins[1]) * cellSizeMMInv)+1;
                    let hSpan = maxH-minH;

                    let minX = Math.min(p.x, nP.x);
                    let maxX = Math.max(p.x, nP.x);

                    const ws = new Array(hSpan);
                    for(let h = 0; h < hSpan; h++) { 
                        const z = (h+minH) * cellSizeMM + pcb.outlineBounds.mins[1];
                        if(lP.z < Epsilon) {
                            if(h==0) {
                                ws[h] = minX;
                            } else {
                                ws[h] = maxX;
                            }
                        }
                        else {
                            ws[h] = Math.min(Math.max(minX,((z - p.z) / lP.z) * lP.x + p.x),maxX);
                        }
                    }
                    for(let h = 0; h < hSpan-1; h++) { 
                        const l = padRasterLines[h+hOffset];
                        const maxW = Math.max(ws[h],ws[h+1]);
                        const minW = Math.min(ws[h],ws[h+1]);
                        if(l.length > 1 ) {
                            l[0] = Math.min(l[0],minW);
                            l[1] = Math.max(l[1],maxW);
                        }
                        else {
                            l[0] = minW;
                            l[1] = maxW;
                        }

                        // whoops this was overkill.  actually did wireframe blitting
                        // //insert max/min range
                        // let iRL = 0;
                        // while(iRL != l.length && l[iRL] < minW) {
                        //     iRL++;
                        // }
                        // if(iRL%2 == 0) {
                        //     // new range
                        //     if(iRL == l.length || maxW < l[iRL]) {
                        //         l.splice(iRL,0,minW,maxW);
                        //     }
                        //     else {
                        //         let jRL = iRL;
                        //         while(jRL != l.length && l[jRL] < maxW) {
                        //             jRL++;
                        //         }
                        //         if(jRL%2==1) {
                        //             //ending in a range
                        //             l.splice(iRL,jRL-iRL,minW);
                        //         } else {
                        //             //consume range(s)
                        //             l.splice(iRL,jRL-iRL,minW,maxW);
                        //         }
                        //     }
                        // }
                        // else { //starting in a range
                        //     let jRL = iRL;
                        //     while(jRL != l.length && l[jRL] < maxW) {
                        //         jRL++;
                        //     }
                        //     if(jRL%2==1) {
                        //         //ending in a range
                        //         l.splice(iRL,jRL-iRL);
                        //     } else {
                        //         //merge ranges
                        //         l.splice(iRL,jRL-iRL,maxW);
                        //     }
                        // }
                    }
                }

                // HARDCODED TO BOTTOM HERE, FIX THIS SOMEDAY
                const side = 0;
                // write the lines into the map
                for(let j = 0; j < jSpan; j++) {
                    const l = padRasterLines[j];
                    const destH = j+minJ;
                    for(let i = 0; i < l.length; i+=2) {
                        const start = Math.floor((l[i] - xStart)*cellSizeMMInv)-1;
                        const end = Math.ceil((l[i+1] - xStart)*cellSizeMMInv)+1; // todo check offset by 1?
                        // console.log(`writing from ${start} to ${end}`)
                        for(let x = start; x <= end; x++) {
                            if(!occupancy[side][destH][x]) {
                                occupancy[side][destH][x] = padInfo;
                            }
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

    pathingLoop:
    for(const [netName,net] of Object.entries(pcb.nets)) {
        while(net.connectivity[0].length != net.connectivity.length) {
            // for(const pth of net.members) {
            {
                const pth = net.members[0];
                if(net.connectivity[0].length == net.connectivity.length) break;
                // pathfind from here to the net!
                // always start on the bottom
                let current = [Math.floor((pth.location.x - xStart)*cellSizeMMInv),Math.floor((pth.location.z-yStart)*cellSizeMMInv),0];//(pth.pin == 1)?0:1];
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
                                let blocker = (occupant && occupant != pth && (!occupant.pin || occupant.pin.net != pth.pin.net || (side != current[2] && occupant.type == "pad")))
                                if( !blocker ) {
                                    cameFrom[nameTok] = curTok;

                                    let cost = i==4?80:10; //8x the cost for a via
                                    let findCostGuess = function() {
                                        let minGuess = 100000000;
                                        for(const oth of net.members) { 
                                            if(!net.connectivity[oth.pin.subnet].includes(pth.pin.subnet)) {
                                                //todo:  add cost of side switching for pads
                                                let end = [Math.floor((oth.location.x - xStart)*cellSizeMMInv),Math.floor((oth.location.z-yStart)*cellSizeMMInv)];

                                                // let estCost = Math.abs(end[0]-next[0]) + Math.abs(end[1]-next[1]);
                                                let estCost = Math.sqrt(Math.pow(Math.abs(end[0]-next[0]),2) + Math.pow(Math.abs(end[1]-next[1]),2));
                                                if(oth.type == "pad" && next[2] != 0) {
                                                    estCost += 8;
                                                }
                                                estCost *= 10;
                                                
                                                minGuess = Math.min(minGuess,estCost);
                                            }
                                        }
                                        return minGuess;
                                    }

                                    if(occupant) {
                                        if(!net.connectivity[occupant.pin.subnet].includes(pth.pin.subnet)) {
                                            console.log(`found a route`);
                                            console.log(pth);
                                            console.log(occupant);
                                            if(occupant.location) {
                                                let end = [Math.floor((occupant.location.x - xStart)*cellSizeMMInv),Math.floor((occupant.location.z-yStart)*cellSizeMMInv)];
                                                let endTok = next[2]*w*h+end[1]*w+end[0];
                                                cameFrom[endTok] = curTok;
                                                destination = endTok;
                                            }
                                            else {
                                                destination = nameTok;
                                            }
                                            connectGraphs(net, occupant.pin.subnet, pth.pin.subnet);
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
                        break pathingLoop;
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
                    let steps = 0;
                    while(cameFrom[nextTok] && cameFrom[nextTok] != 'START') {
                        // console.log(`came from ${cameFrom[nextTok]}`);
                        nextTok = cameFrom[nextTok];
                        let nextSide = Math.floor(nextTok / (w*h));
                        let sideTok = nextTok%(w*h)
                        let nextLoc = new Vector3((sideTok % w) * cellSizeMM + xStart, 0, Math.floor(sideTok / w) * cellSizeMM + yStart);
                        if(!occupancy[nextSide][Math.floor(sideTok / w)][sideTok % w]) {
                            occupancy[nextSide][Math.floor(sideTok / w)][sideTok % w] = {type:"route",pin:{net:pth.pin.net,subnet:pth.pin.subnet}};
                        }
    
                        if(nextSide != lineSide || (Math.abs(lineStartLoc.x - nextLoc.x) > Epsilon && Math.abs(lineStartLoc.z - nextLoc.z) > Epsilon) ) // new line!
                        {
                            let route = [lineStartLoc,prevLoc];
                            let routeSide = (lineSide == 1)?pcb.topRoutes:pcb.bottomRoutes;
                            routeSide.push(route);
                            if(nextSide != lineSide) {
                                console.log(`placing a via at step ${steps}`)
                                pcb.vias.push(nextLoc);
                                vias[Math.floor(sideTok / w)][sideTok % w] = {net:pth.pin.net,subnet:pth.pin.subnet};
                            }
                            lineStartLoc = prevLoc;
                            lineSide = nextSide;
                        }
                        steps +=1;
                        prevLoc = nextLoc;
                    }
                    console.log(`route took a total of ${steps} steps`)
                    let routeSide = (lineSide == 1)?pcb.topRoutes:pcb.bottomRoutes;
                    routeSide.push([lineStartLoc,prevLoc]);
                }
            }
        }
    }
    const pathingTime = window.performance.now();

    var ctx = globals.debugCanvas.getContext('2d');
    globals.debugCanvas.width = w;
    globals.debugCanvas.height = 2*h;
    var myImageData = ctx.createImageData(w, 2*h);
    function setColorAtCoord(x, y, s, r,g,b,a) {
        const width = myImageData.width;
        myImageData.data[(s*h+y)*(width*4)+x*4+0] = r;
        myImageData.data[(s*h+y)*(width*4)+x*4+1] = g;
        myImageData.data[(s*h+y)*(width*4)+x*4+2] = b;
        myImageData.data[(s*h+y)*(width*4)+x*4+3] = a;
      }
    for(let s = 0; s < 2; s++) {
        for(let y = 0; y < h; y++) {
            for(let x = 0; x < w; x++) {
                const occupant = occupancy[s][h-y-1][x];
    
                if(occupant) {
                    if(occupant.type == "out") {
                        setColorAtCoord(x,y,s,0,0,0,255);
                    }
                    else if(occupant.type == "pth" || occupant.type == "pad") {
                        if(occupant.pin) {
                            setColorAtCoord(x,y,s,0,0,255,255);
                        } else {
                            setColorAtCoord(x,y,s,76,0,0,255);
                        }
                    }
                    else {
                        setColorAtCoord(x,y,s,255,0,0,255);
                    }
                }
                else {
                    setColorAtCoord(x,y,s,0,64,0,255);
                }
            }
        }
    }
    ctx.putImageData(myImageData, 0, 0);

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

export function refreshPCBOutline(minOutline, caseIdx, cRD) {
    const pD = globals.pcbData[caseIdx];

    pD.outline = minOutline;
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

    // const voronoi = genVoronoi(pD);
    const sdf = genSDF(pD);

    createNets(pD);
}
