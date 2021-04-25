import {globals} from './globals.js'
import * as boardData from './boardData.js';
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
    minimumFractionDigits: 4,      
    maximumFractionDigits: 4,
 });

 function fmt_float(a) { return formatter.format(a)}


const formatter_gbr = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 6,      
    maximumFractionDigits: 6,
 });

 function fmt_float_gbr(a) { return formatter_gbr.format(a)}


function fmt_fixed(a) { return Number(a * 1000000).toFixed(0)}

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

const linearDrawMode = "G01*"

const orgName = "TangentSpace";
const progName = "KBGB";
const versionString = "0.0.1";

function exportGBRHeader(gbr, opts) {
    function append(...values) {
        gbr.push.apply(gbr, values);
    }
    append(`G04 #@! TF.GenerationSoftware,${orgName},${progName},(${versionString})*`);
    append(`G04 #@! TF.CreationDate,${new Date().toISOString()}*`);
    append(`G04 #@! TF.ProjectId,${boardData.getData().meta.name},${setUuid},rev?*`);
    append(`G04 #@! TF.SameCoordinates,${setUuid}*`);
    append(`G04 #@! TF.FileFunction,${opts.fileFunction}*`);  // file function: "Profile" <aka edge cuts> 
    if(opts.polarity) {
        append(`G04 #@! TF.FilePolarity,${opts.polarity}*`);
    }
    append(`%FSLAX46Y46*%`);  // leading zero omitted, version 4.6
    append(`G04 Gerber Fmt 4.6, Leading zero omitted, Abs format (unit mm)*`);
    append(`G04 Created by Tangent Space - KBGB (0.0.1)*`);
    append(`%MOMM*%`);
    append(`%LPD*%`); 
}

export function exportLayer(pcb,layer,side) {
    const gbr = [];
    function append(...values) {
        gbr.push.apply(gbr, values);
    }

    let headerOpts = {
    }
    if(layer=="copper") {
        headerOpts.polarity = "Positive";
        if( side == "top") {
            headerOpts.fileFunction = `Copper,L1,Top`;
        }
        else {
            headerOpts.fileFunction = `Copper,L2,Bot`;
        }
    }
    else if(layer == "mask") {
        headerOpts.polarity = "Negative";
        if( side == "top") {
            headerOpts.fileFunction = `Soldermask,Top`;
        }
        else {
            headerOpts.fileFunction = `Soldermask,Bot`;
        }
    }

    exportGBRHeader(gbr, headerOpts);

    append(linearDrawMode);

    append(`G04 APERTURE LIST*`);
    let tools = {};
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for(const pth of f.pths) {
                let cuDiameter = (pth.radius+pth.ring) * 2;
                if(!tools[cuDiameter]) {
                    tools[cuDiameter] = {locs:[],usage:`ComponentPad`,diameter:cuDiameter};          
                }
                tools[cuDiameter].locs.push(pth.location);
            }
            if(side == "bot") {
                for(const pad of f.pads) {
                    if(!tools["pads"]) {
                        tools["pads"] = {locs:[],polys:[],usage:`ComponentPad`,diameter:0.1};
                    }
                    tools["pads"].polys.push(pad.poly);
                }
            }
        }
    }

    if(pcb.vias.length > 0 && layer=="copper") {
        tools["via"] = {locs:pcb.vias,usage:`ViaPad`,diameter:0.6};
    }
    
    let tIdx = 10;
    for( let [tRad, tool] of Object.entries(tools)) {
        tool.name = `D${tIdx}`;
        if(layer=="copper") {
            append(`G04 #@! TA.AperFunction,${tool.usage}*`);
        }
        append(`%AD${tool.name}C,${fmt_float_gbr(tool.diameter)}*%`)

        if(layer=="copper") {
            append(`G04 #@! TD*`);  // TD*: delete all attributes
        }   
        tIdx += 1;
    }

    let trackTool = `D${tIdx}`
    append(`G04 #@! TA.AperFunction,Conductor*`);
    append(`%AD${trackTool}C,${fmt_float_gbr(pcb.trackWidth)}*%`);
    append(`G04 #@! TD*`);


    append(`G04 APERTURE END LIST*`);

    for( let [tRad, t] of Object.entries(tools)) {
        if(t.locs.length > 0) {
            append(`${t.name}*`);
            for( const loc of t.locs ) {
                append(`X${fmt_fixed(loc.x)}Y${fmt_fixed(loc.z)}D03*`)
            }
        }
    }

    if(tools["pads"] && tools["pads"].polys.length > 0) {
        append(`${tools["pads"].name}*`);
        for(const poly of tools["pads"].polys) {
            append(`G36*`);
            const startPoint = poly[poly.length-1];
            append(`X${fmt_fixed(startPoint.x)}Y${fmt_fixed(startPoint.z)}D02*`)
            for(const p of poly) {
                append(`X${fmt_fixed(p.x)}Y${fmt_fixed(p.z)}D01*`)
            }
            append(`G37*`);
        }
    }

    append(`${trackTool}*`);
    if(layer=="copper" && side == "top") {
        for( let route of pcb.topRoutes) {
            append(`X${fmt_fixed(route[0].x)}Y${fmt_fixed(route[0].z)}D02*`)
            append(`X${fmt_fixed(route[1].x)}Y${fmt_fixed(route[1].z)}D01*`)
        }
    }
    if(layer=="copper" && side == "bot") {
        for( let route of pcb.bottomRoutes) {
            append(`X${fmt_fixed(route[0].x)}Y${fmt_fixed(route[0].z)}D02*`)
            append(`X${fmt_fixed(route[1].x)}Y${fmt_fixed(route[1].z)}D01*`)
        }
    }
    append(`M02*`);  // END FILE

    return gbr.join('\n');
}

export function exportEdgeCutsLayer(pcb) {
    const outlines = [coremath.offsetAndFilletOutline(pcb.outline, 0.0, 2.0, false)];

    const gbr = [];
    function append(...values) {
        gbr.push.apply(gbr, values);
    }

    exportGBRHeader(gbr, {fileFunction:"Profile,NP"});

    append(`G04 APERTURE LIST*`);
    append(`G04 #@! TA.AperFunction,Profile*`);  //TA: define attribute "Profile"
    append(`%ADD10C,0.200000*%`); // AD (D10 apeture) (C = circle), (0.2 diameter)
    append(`G04 #@! TD*`);  // TD*: delete all attributes
    append(`G04 APERTURE END LIST*`);

    // begin D10 aperture
    append(`D10*`);

    for(let shape of outlines) {
        if(Array.isArray(shape)) {
            let isDrawingLine = false;
            if(shape.length > 1) {
                // // starting point
                // let p = shape[0];
                // switch(p.type) {
                //     case 0:
                //         append(`X${fmt_fixed(p.point.x)}Y${fmt_fixed(-p.point.z)}D02*`);
                //         break;
                //     case 1:
                //         // let startPoint = p.center.add(coremath.getNormalFromRot(p.endRot - p.rotDegrees).scale(p.radius));
                //         // pathStr += `M${fmt_fixed(startPoint.x)},${fmt_fixed(-startPoint.z)}`
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
                            append(`X${fmt_fixed(p.point.x)}Y${fmt_fixed(p.point.z)}${mode}*`);
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
                            append(`X${fmt_fixed(endPoint.x)}Y${fmt_fixed(endPoint.z)}I${fmt_fixed(-startVec.x)}J${fmt_fixed(-startVec.z)}D01*`)
                            break;
                    }
                }
            }
        } else {
            if(shape.type == 2) {
                console.log("SKIPPING CIRCLE");
            }
        }
    }
    append(`M02*`);  // END FILE

    return gbr.join('\n');
}

export function exportDrillFile(pcb) {
    const bd = boardData.getData();

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
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for(const pth of f.pths) {
                if(!tools[pth.radius]) {
                    tools[pth.radius] = {locs:[],rad:pth.radius};
                }
                tools[pth.radius].locs.push(pth.location);
            }
        }
    }

    if(pcb.vias.length > 0) {
        tools["via"] = {locs:pcb.vias,rad:0.15};
    }

    let tIdx = 1;
    for( let [tRad, tool] of Object.entries(tools)) {
        tool.name = `T${tIdx}`
        append(`${tool.name}C${fmt_float(2 * 0.1 * tool.rad / 2.54)}`)
        tIdx += 1;
    }

    append(`%`);
    append(`G90`);
    append(`G05`);
    for( let [tRad, t] of Object.entries(tools)) {
        append(`${t.name}`);
        for( const loc of t.locs ) {
            append(`X${fmt_float(0.1 * loc.x / 2.54)}Y${fmt_float(0.1 * loc.z / 2.54)}`)
        }
    }
    append(`T0`);
    append(`M30`); // end file

    return gbr.join('\n');
}