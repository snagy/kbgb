use crate::core_math;
use wasm_bindgen::prelude::*;
extern crate js_sys;
extern crate nalgebra as na;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct PCBData {
    x: i32,
    bounds: core_math::Bounds2,
}

#[wasm_bindgen]
impl PCBData {
    pub fn new() -> PCBData {
        log!("new PCB created");
        PCBData {
            x: 1,
            bounds: core_math::Bounds2::default(),
        }
    }

    pub fn set_bounds(&mut self, min_x: f32, min_y: f32, max_x: f32, max_y: f32) {
        self.bounds.mins.x = min_x;
        self.bounds.mins.y = min_y;
        self.bounds.maxs.x = max_x;
        self.bounds.maxs.y = max_y;
    }

    pub fn route(self) -> f32 {
        let cell_size_mm: f32 = 0.8; // set to via size
                                     // const cellSizeMM = 1.5*pcb.trackWidth;
        let cell_size_mm_inv: f32 = 1.0 / cell_size_mm;

        // let bounds = core_math::Bounds2::new_from_js(js_sys::Reflect::get(pcb_data, "outlineBounds")); // {mins: Vector2::new({x:-100,y:-100}, maxs: Vector2{x:100,y:100}};
        self.bounds.mins.x

        // let outlineBounds = js_sys::Reflect::get(pcbData, "outlineBounds");
        // const xStart = pcb.outlineBounds.mins[0];
        // const yStart = pcb.outlineBounds.mins[1];
        // let w = Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0]) * cellSizeMMInv);
        // let h = Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv);
        // let occupancy = [[],[]];
        // let vias = [];
        // const top = 0;
        // const bottom = 1;
        // console.log(`occupancy: ${w} cols ${h} rows`)
        // const s0 = TmpVectors.Vector3[11];
        // s0.x = pcb.outlineBounds.mins[0] - 100.0;
        // s0.y = 0;
        // const s1 = TmpVectors.Vector3[12];
        // s1.x = pcb.outlineBounds.maxs[0] + 100.0;
        // s1.y = 0;

        // // mark areas outside the mesh as 'out'
        // let out_marker = {type:"out"};
        // for(let i = 0; i < h; i++) {
        //     occupancy[0].push(new Array(w));
        //     occupancy[1].push(new Array(w));
        //     vias.push({});
        //     //rasterize across each line of the occupancy
        //     const lineZ = pcb.outlineBounds.mins[1] + cellSizeMM*(i+0.5);
        //     s0.z = s1.z = lineZ
        //     const intersections = coremath.polyIntersectionSlice(s0, s1, pcb.outline);
        //     intersections.sort((a,b) => a.x - b.x);

        //     let is_out = true;
        //     let nextIntIdx = 0;
        //     for(let j = 0; j < w; j++) {
        //         if(intersections.length > nextIntIdx) {
        //             const pointX = is_out?pcb.outlineBounds.mins[0] + cellSizeMM*(j-1.5):pcb.outlineBounds.mins[0] + cellSizeMM*(j+1.5);
        //             let nextIntersection = intersections[nextIntIdx]
        //             while(intersections.length > nextIntIdx && nextIntersection.x < pointX ) {
        //                 is_out = !is_out;
        //                 nextIntIdx+=1;
        //                 nextIntersection = intersections[nextIntIdx]
        //             }
        //         }
        //         if(is_out) {
        //             occupancy[0][i][j] = out_marker;
        //             occupancy[1][i][j] = out_marker;
        //         }
        //     }
        // }

        // for( let [id,d] of Object.entries(pcb.devices) ) {
        //     for(let f of d.footprints) {
        //         for( const pth of f.pths ) {
        //             // i guess we could assign nets here
        //             let pin = pth.pin;
        //             if(pin && !pin.net) {
        //                 if(pin.name == 1) {
        //                     pin.net = `mRow${f.matrixPos.row}`;
        //                     pin.subnet = -1;
        //                 }
        //                 else if(pin.name == 2) {
        //                     pin.net = `mCol${f.matrixPos.col}`;
        //                     pin.subnet = -1;
        //                 }
        //             }

        //             if(pin && pin.net) {
        //                 if(!pcb.nets[pin.net]) {
        //                     pcb.nets[pin.net] = {members:[],connectivity:[]};
        //                 }
        //                 if(pin.subnet == -1) {
        //                     pin.subnet = pcb.nets[pin.net].connectivity.length;
        //                     pcb.nets[pin.net].connectivity.push([pin.subnet]);
        //                 }
        //                 pcb.nets[pin.net].members.push(pth);   // NOT pin
        //             }
        //             // rasterize this into the occupancy map
        //             // deal with if this was already set?
        //             const center = [(pth.location.x - xStart)*cellSizeMMInv,(pth.location.z-yStart)*cellSizeMMInv];
        //             const radius = pth.radius + pth.ring + cellSizeMM;
        //             const pixRad = Math.ceil(radius * cellSizeMMInv);
        //             for( let x = -pixRad; x <= pixRad; x++ ) {
        //                 const locX = center[0] + x;
        //                 if( locX < 0 || locX >= w) {
        //                     continue;
        //                 }
        //                 for( let y = -pixRad; y <= pixRad; y++ ) {
        //                     const locY = center[1] + y;
        //                     if( locY < 0 || locY >= h) {
        //                         continue;
        //                     }

        //                     if(x*x+y*y < pixRad*pixRad) {
        //                         occupancy[0][Math.floor(locY)][Math.floor(locX)] = pth;
        //                         occupancy[1][Math.floor(locY)][Math.floor(locX)] = pth;
        //                     }
        //                 }
        //             }
        //         }
        //         for( const padInfo of f.pads ) {
        //             // todo: currently we assume all pads are on the bottom

        //             // i guess we could assign nets here
        //             let pin = padInfo.pin;
        //             if(pin && !pin.net) {
        //                 if(pin.name == 1) {
        //                     pin.net = `mRow${f.matrixPos.row}`;
        //                     pin.subnet = -1;
        //                 }
        //                 else if(pin.name == 2) {
        //                     pin.net = `mCol${f.matrixPos.col}`;
        //                     pin.subnet = -1;
        //                 }
        //             }

        //             if(pin && pin.net) {
        //                 if(!pcb.nets[pin.net]) {
        //                     pcb.nets[pin.net] = {members:[],connectivity:[]};
        //                 }
        //                 if(pin.subnet == -1) {
        //                     pin.subnet = pcb.nets[pin.net].connectivity.length;
        //                     pcb.nets[pin.net].connectivity.push([pin.subnet]);
        //                 }
        //                 pcb.nets[pin.net].members.push(padInfo);   // NOT pin
        //             }

        //             const pad = padInfo.poly;
        //             let mins = [100000,100000]
        //             let maxs = [-100000,-100000]
        //             for(const p of pad) {
        //                 mins[0] = Math.min(mins[0],p.x);
        //                 mins[1] = Math.min(mins[1],p.z);
        //                 maxs[0] = Math.max(maxs[0],p.x);
        //                 maxs[1] = Math.max(maxs[1],p.z);
        //             }
        //             let minJ = Math.floor((mins[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv)-1;
        //             let jSpan = Math.ceil((maxs[1]-mins[1]) * cellSizeMMInv)+2;

        //             let padRasterLines = new Array(jSpan);
        //             for(let j = 0; j < jSpan; j++) {
        //                 padRasterLines[j] = [];
        //             }

        //             const lP = TmpVectors.Vector3[10];

        //             for(let iP = 0; iP < pad.length; iP++) {
        //                 const p = pad[iP];
        //                 const nP = pad[(iP+1)%pad.length];
        //                 nP.subtractToRef(p,lP);

        //                 let minH = Math.floor((Math.min(p.z, nP.z) - pcb.outlineBounds.mins[1]) * cellSizeMMInv)-1;
        //                 let hOffset = minH - minJ;
        //                 let maxH = Math.ceil((Math.max(p.z, nP.z) - pcb.outlineBounds.mins[1]) * cellSizeMMInv)+1;
        //                 let hSpan = maxH-minH;

        //                 let minX = Math.min(p.x, nP.x);
        //                 let maxX = Math.max(p.x, nP.x);

        //                 const ws = new Array(hSpan);
        //                 for(let h = 0; h < hSpan; h++) {
        //                     const z = (h+minH) * cellSizeMM + pcb.outlineBounds.mins[1];
        //                     if(lP.z < Epsilon) {
        //                         if(h==0) {
        //                             ws[h] = minX;
        //                         } else {
        //                             ws[h] = maxX;
        //                         }
        //                     }
        //                     else {
        //                         ws[h] = Math.min(Math.max(minX,((z - p.z) / lP.z) * lP.x + p.x),maxX);
        //                     }
        //                 }
        //                 for(let h = 0; h < hSpan-1; h++) {
        //                     const l = padRasterLines[h+hOffset];
        //                     const maxW = Math.max(ws[h],ws[h+1]);
        //                     const minW = Math.min(ws[h],ws[h+1]);
        //                     if(l.length > 1 ) {
        //                         l[0] = Math.min(l[0],minW);
        //                         l[1] = Math.max(l[1],maxW);
        //                     }
        //                     else {
        //                         l[0] = minW;
        //                         l[1] = maxW;
        //                     }

        //                     // whoops this was overkill.  actually did wireframe blitting
        //                     // //insert max/min range
        //                     // let iRL = 0;
        //                     // while(iRL != l.length && l[iRL] < minW) {
        //                     //     iRL++;
        //                     // }
        //                     // if(iRL%2 == 0) {
        //                     //     // new range
        //                     //     if(iRL == l.length || maxW < l[iRL]) {
        //                     //         l.splice(iRL,0,minW,maxW);
        //                     //     }
        //                     //     else {
        //                     //         let jRL = iRL;
        //                     //         while(jRL != l.length && l[jRL] < maxW) {
        //                     //             jRL++;
        //                     //         }
        //                     //         if(jRL%2==1) {
        //                     //             //ending in a range
        //                     //             l.splice(iRL,jRL-iRL,minW);
        //                     //         } else {
        //                     //             //consume range(s)
        //                     //             l.splice(iRL,jRL-iRL,minW,maxW);
        //                     //         }
        //                     //     }
        //                     // }
        //                     // else { //starting in a range
        //                     //     let jRL = iRL;
        //                     //     while(jRL != l.length && l[jRL] < maxW) {
        //                     //         jRL++;
        //                     //     }
        //                     //     if(jRL%2==1) {
        //                     //         //ending in a range
        //                     //         l.splice(iRL,jRL-iRL);
        //                     //     } else {
        //                     //         //merge ranges
        //                     //         l.splice(iRL,jRL-iRL,maxW);
        //                     //     }
        //                     // }
        //                 }
        //             }

        //             // HARDCODED TO BOTTOM HERE, FIX THIS SOMEDAY
        //             const side = 0;
        //             // write the lines into the map
        //             for(let j = 0; j < jSpan; j++) {
        //                 const l = padRasterLines[j];
        //                 const destH = j+minJ;
        //                 for(let i = 0; i < l.length; i+=2) {
        //                     const start = Math.floor((l[i] - xStart)*cellSizeMMInv)-1;
        //                     const end = Math.ceil((l[i+1] - xStart)*cellSizeMMInv)+1; // todo check offset by 1?
        //                     // console.log(`writing from ${start} to ${end}`)
        //                     for(let x = start; x <= end; x++) {
        //                         if(!occupancy[side][destH][x]) {
        //                             occupancy[side][destH][x] = padInfo;
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        // const occupancyCreatedTime = window.performance.now();

        // pcb.topRoutes = [];
        // pcb.bottomRoutes = [];
        // pcb.vias = [];

        // function connectGraphs(net,ia,ib) {
        //     let a = net.connectivity[ia];
        //     let b = net.connectivity[ib];
        //     for(const v of b) {
        //         if(!a.includes(v)) {
        //             a.push(v);
        //         }
        //         net.connectivity[v] = a;
        //     }
        // }

        // pathingLoop:
        // for(const [netName,net] of Object.entries(pcb.nets)) {
        //     while(net.connectivity[0].length != net.connectivity.length) {
        //         // for(const pth of net.members) {
        //         {
        //             const pth = net.members[0];
        //             if(net.connectivity[0].length == net.connectivity.length) break;
        //             // pathfind from here to the net!
        //             // always start on the bottom
        //             let current = [Math.floor((pth.location.x - xStart)*cellSizeMMInv),Math.floor((pth.location.z-yStart)*cellSizeMMInv),0];//(pth.pin == 1)?0:1];
        //             let currentDist = 0;
        //             let startTok = current[2]*w*h+current[1]*w+current[0];
        //             const cameFrom = {};
        //             cameFrom[startTok] = `START`;
        //             const pending = new FlatQueue();
        //             let destination = false;
        //             while(!destination) {
        //                 let curTok = current[2]*w*h+current[1]*w+current[0];
        //                 for(let i = 0; i<5; i++) {
        //                     let xOffset = i==0?-1:(i==1?1:0);
        //                     let yOffset = i==2?-1:(i==3?1:0);
        //                     let side = i==4?(1^current[2]):current[2];
        //                     let next = [current[0]+xOffset,current[1]+yOffset, side];
        //                     if(next[0]>=0 && next[0] < w && next[1]>=0 && next[1] < h) {
        //                         let occupant = occupancy[next[2]][next[1]][next[0]];
        //                         const nameTok = next[2]*w*h+next[1]*w+next[0];
        //                         if(!cameFrom[nameTok]) {
        //                             let blocker = (occupant && occupant != pth && (!occupant.pin || occupant.pin.net != pth.pin.net || (side != current[2] && occupant.type == "pad")))
        //                             if( !blocker ) {
        //                                 cameFrom[nameTok] = curTok;

        //                                 let cost = (next[2]!=current[2])?80:10; //8x the cost for a via
        //                                 let findCostGuess = function() {
        //                                     let minGuess = 100000000;
        //                                     for(const oth of net.members) {
        //                                         if(!net.connectivity[oth.pin.subnet].includes(pth.pin.subnet)) {
        //                                             let end = [Math.floor((oth.location.x - xStart)*cellSizeMMInv),Math.floor((oth.location.z-yStart)*cellSizeMMInv)];

        //                                             // let estCost = Math.abs(end[0]-next[0]) + Math.abs(end[1]-next[1]);
        //                                             let estCost = Math.sqrt(Math.pow(Math.abs(end[0]-next[0]),2) + Math.pow(Math.abs(end[1]-next[1]),2));
        //                                             // add cost of side switching for pads
        //                                             if(oth.type == "pad" && next[2] != 0) {
        //                                                 estCost += 8;
        //                                             }
        //                                             estCost *= 7; // this needs to be < 10.  lower gives better paths but takes longer

        //                                             minGuess = Math.min(minGuess,estCost);
        //                                         }
        //                                     }
        //                                     return minGuess;
        //                                 }

        //                                 if(occupant) {
        //                                     if(!net.connectivity[occupant.pin.subnet].includes(pth.pin.subnet)) {
        //                                         console.log(`found a route`);
        //                                         console.log(pth);
        //                                         console.log(occupant);
        //                                         if(occupant.location) {
        //                                             let end = [Math.floor((occupant.location.x - xStart)*cellSizeMMInv),Math.floor((occupant.location.z-yStart)*cellSizeMMInv)];
        //                                             let endTok = next[2]*w*h+end[1]*w+end[0];
        //                                             cameFrom[endTok] = curTok;
        //                                             destination = endTok;
        //                                         }
        //                                         else {
        //                                             destination = nameTok;
        //                                         }
        //                                         connectGraphs(net, occupant.pin.subnet, pth.pin.subnet);
        //                                         break;
        //                                     }
        //                                     else {
        //                                         cost = 0;
        //                                     }
        //                                 }
        //                                 pending.push({node:next,dist:currentDist+cost},currentDist+cost+findCostGuess());
        //                             }
        //                         }
        //                     }
        //                 }
        //                 if(pending.length == 0) {
        //                     console.log("could not reach destination!");
        //                     console.log(pth);
        //                     break pathingLoop;
        //                 }
        //                 const nextNode = pending.pop()
        //                 currentDist = nextNode.dist;
        //                 current = nextNode.node;
        //             }
        //             if(destination) {
        //                 // reconstruct path here
        //                 let nextTok = destination;
        //                 let lineSide = Math.floor(nextTok / (w*h));
        //                 let lineStartLoc = new Vector3(((nextTok%(w*h)) % w + 0.5) * cellSizeMM + xStart, 0, Math.floor((nextTok%(w*h)) / w + 0.5) * cellSizeMM + yStart);
        //                 let prevLoc = lineStartLoc;
        //                 let steps = 0;
        //                 while(cameFrom[nextTok] && cameFrom[nextTok] != 'START') {
        //                     // console.log(`came from ${cameFrom[nextTok]}`);
        //                     nextTok = cameFrom[nextTok];
        //                     let nextSide = Math.floor(nextTok / (w*h));
        //                     let sideTok = nextTok%(w*h)
        //                     let nextLoc = new Vector3((sideTok % w + 0.5) * cellSizeMM + xStart, 0, Math.floor(sideTok / w + 0.5) * cellSizeMM + yStart);
        //                     if(!occupancy[nextSide][Math.floor(sideTok / w)][sideTok % w]) {
        //                         occupancy[nextSide][Math.floor(sideTok / w)][sideTok % w] = {type:"route",pin:{net:pth.pin.net,subnet:pth.pin.subnet}};
        //                     }

        //                     if(nextSide != lineSide || (Math.abs(lineStartLoc.x - nextLoc.x) > Epsilon && Math.abs(lineStartLoc.z - nextLoc.z) > Epsilon) ) // new line!
        //                     {
        //                         let route = [lineStartLoc,prevLoc];
        //                         let routeSide = (lineSide == 1)?pcb.topRoutes:pcb.bottomRoutes;
        //                         routeSide.push(route);
        //                         if(nextSide != lineSide) {
        //                             console.log(`placing a via at step ${steps}`)
        //                             pcb.vias.push(nextLoc);
        //                             vias[Math.floor(sideTok / w)][sideTok % w] = {net:pth.pin.net,subnet:pth.pin.subnet};
        //                         }
        //                         lineStartLoc = prevLoc;
        //                         lineSide = nextSide;
        //                     }
        //                     steps +=1;
        //                     prevLoc = nextLoc;
        //                 }
        //                 console.log(`route took a total of ${steps} steps`)
        //                 let routeSide = (lineSide == 1)?pcb.topRoutes:pcb.bottomRoutes;
        //                 routeSide.push([lineStartLoc,prevLoc]);
        //             }
        //         }
        //     }
        // }
        // const pathingTime = window.performance.now();

        // var ctx = globals.debugCanvas.getContext('2d');
        // globals.debugCanvas.width = w;
        // globals.debugCanvas.height = 2*h;
        // var myImageData = ctx.createImageData(w, 2*h);
        // function setColorAtCoord(x, y, s, r,g,b,a) {
        //     const width = myImageData.width;
        //     myImageData.data[(s*h+y)*(width*4)+x*4+0] = r;
        //     myImageData.data[(s*h+y)*(width*4)+x*4+1] = g;
        //     myImageData.data[(s*h+y)*(width*4)+x*4+2] = b;
        //     myImageData.data[(s*h+y)*(width*4)+x*4+3] = a;
        // }
        // for(let s = 0; s < 2; s++) {
        //     for(let y = 0; y < h; y++) {
        //         for(let x = 0; x < w; x++) {
        //             const occupant = occupancy[s][h-y-1][x];

        //             if(occupant) {
        //                 if(occupant.type == "out") {
        //                     setColorAtCoord(x,y,s,0,0,0,255);
        //                 }
        //                 else if(occupant.type == "pth" || occupant.type == "pad") {
        //                     if(occupant.pin) {
        //                         setColorAtCoord(x,y,s,0,0,255,255);
        //                     } else {
        //                         setColorAtCoord(x,y,s,76,0,0,255);
        //                     }
        //                 }
        //                 else {
        //                     setColorAtCoord(x,y,s,255,0,0,255);
        //                 }
        //             }
        //             else {
        //                 setColorAtCoord(x,y,s,0,64,0,255);
        //             }
        //         }
        //     }
        // }
        // ctx.putImageData(myImageData, 0, 0);

        // console.log(`creating matrix took ${matrixCreatedTime-startTime} ms`);
        // console.log(`creating occupancy took ${occupancyCreatedTime-matrixCreatedTime} ms`);
        // console.log(`route pathing took ${pathingTime-occupancyCreatedTime} ms`);
    }
}
