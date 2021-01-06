import {globals} from './globals.js'
import * as coremath from './coremath.js'
import * as pcb from './pcbOps.js'

/*
G04 #@! TF.GenerationSoftware,KiCad,Pcbnew,(5.1.7-0-10_14)*
G04 #@! TF.CreationDate,2020-12-31T23:26:21-08:00*
G04 #@! TF.ProjectId,keyboard,6b657962-6f61-4726-942e-6b696361645f,rev?*
G04 #@! TF.SameCoordinates,Original*
G04 #@! TF.FileFunction,Copper,L2,Bot*  // or L1,Top (for 2 layer boards)
G04 #@! TF.FilePolarity,Positive*  // "positive" indicates presence of material  (note solder mask is negative)
*/ 

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,      
    maximumFractionDigits: 4,
 });

 function fmt_float(a) { return formatter.format(a)}


function f(a) { return Number(a * 1000000).toFixed(0)}

function uuidv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}

let setUuid = uuidv4();
export function beginSetExport() {
    setUuid = uuidv4();
}

const orgName = "TangentSpace";
const progName = "KBGB";
const versionString = "0.0.1";

export function exportEdgeCutsLayer(pcb) {
    const outline = coremath.offsetAndFilletOutline(pcb.outline, 0.0, 2.0, false);
    const bd = globals.boardData;

    const gbr = [];
    function append(...values) {
        gbr.push.apply(gbr, values);
    }

    append(`G04 #@! TF.GenerationSoftware,${orgName},${progName},(${versionString})*`);
    append(`G04 #@! TF.CreationDate,${new Date().toISOString()}*`);
    append(`G04 #@! TF.ProjectId,${bd.meta.name},${setUuid},rev?*`);
    append(`G04 #@! TF.SameCoordinates,${setUuid}*`);
    append(`G04 #@! TF.FileFunction,Profile,NP*`);  // file function: "Profile" <aka edge cuts> 
    append(`%FSLAX46Y46*%`);  // leading zero omitted, version 4.6
    append(`G04 Gerber Fmt 4.6, Leading zero omitted, Abs format (unit mm)*`);
    append(`G04 Created by Tangent Space - KBGB (0.0.1)*`);
    append(`%MOMM*%`);
    append(`%LPD*%`); 

    const linearDrawMode = "G01*"
    append(linearDrawMode);

    append(`G04 APERTURE LIST*`);
    append(`G04 #@! TA.AperFunction,Profile*`);  //TA: define attribute "Profile"
    append(`%ADD10C,0.200000*%`); // AD (D10 apeture) (C = circle), (0.2 diameter)
    append(`G04 #@! TD*`);  // TD*: delete all attributes
    append(`G04 APERTURE END LIST*`);

    // begin D10 aperture
    append(`D10*`);

    // for(let shape of outline) {
    const shape = outline;
        if(Array.isArray(shape)) {
            let isDrawingLine = false;
            if(shape.length > 1) {
                // // starting point
                // let p = shape[0];
                // switch(p.type) {
                //     case 0:
                //         append(`X${f(p.point.x)}Y${f(-p.point.z)}D02*`);
                //         break;
                //     case 1:
                //         // let startPoint = p.center.add(coremath.getNormalFromRot(p.endRot - p.rotDegrees).scale(p.radius));
                //         // pathStr += `M${f(startPoint.x)},${f(-startPoint.z)}`
                //         break;
                // }

                for(let i = 0; i <= shape.length; i++) {
                    let p = shape[i%shape.length];
                    switch(p.type) {
                        case 0:
                            let mode = i>0?`D01`:`D02`;
                            if(!isDrawingLine) {
                                append(linearDrawMode);
                                isDrawingLine = true;
                                // mode = `D02`;
                            }
                            append(`X${f(p.point.x)}Y${f(p.point.z)}${mode}*`);
                            break;
                        case 1: // arc
                            isDrawingLine = false;
                            append(`G75*`);
                            if(p.rotRadians < 0) {
                                append(`G02*`); //clockwise
                            } else {
                                append(`G03*`); //ccw
                            }
                            let endPoint = p.center.add(coremath.getNormalFromRot(p.endRot).scale(p.radius));
                            let startVec = coremath.getNormalFromRot(p.endRot-p.rotRadians).scale(p.radius);
                            append(`X${f(endPoint.x)}Y${f(endPoint.z)}I${f(-startVec.x)}J${f(-startVec.z)}D01*`)
                            break;
                    }
                }
            }
        } else {
            if(shape.type == 2) {
                console.log("SKIPPING CIRCLE");
            }
        }
    // }
    append(`M02*`);  // END FILE

    return gbr.join('\n');
}

export function exportDrillFile(pcb) {
    const bd = globals.boardData;

    const gbr = [];
    function append(...values) {
        gbr.push.apply(gbr, values);
    }

    append(`M48`);

    append(`; DRILL file {KBGB (0.0.1)} date Monday, January 04, 2021 at 10:50:19 PM`);
    append(`; FORMAT={-:-/ absolute / inch / decimal}`);
    append(`; #@! TF.CreationDate,${new Date().toISOString()}`);
    append(`; #@! TF.GenerationSoftware,${orgName},${progName},(${versionString})`);
    append(`FMAT,2`); // dec?
    append(`INCH`);   // inch

    let tools = {};
    let tIdx = 1;
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for(const pth of f.pths) {
                if(!tools[pth.radius]) {
                    let tool = {name:`T${tIdx}`, locs:[]}
                    append(`${tool.name}C${fmt_float(2 * 0.1 * pth.radius / 2.54)}`)
                    tIdx += 1;
                    tools[pth.radius] = tool;
                }
                !tools[pth.radius].locs.push([pth.location.x,pth.location.z]);
            }
        }
    }
    append(`%`);
    append(`G90`);
    append(`G05`);
    for( let [tRad, t] of Object.entries(tools)) {
        append(`${t.name}`);
        for( const loc of t.locs ) {
            append(`X${fmt_float(0.1 * loc[0] / 2.54)}Y${fmt_float(0.1 * loc[1] / 2.54)}`)
        }
    }
    append(`T0`);
    append(`M30`); // end file

    return gbr.join('\n');
}