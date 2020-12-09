
import {globals} from './globals.js'
import * as coremath from './coremath.js'

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,      
    maximumFractionDigits: 4,
 });

 function f(a) { return formatter.format(a)}


export function exportLayerString(layerName) {
    const bd = globals.boardData;
    const svg = [];
    function append(...values) {
        svg.push.apply(svg, values);
    }
    
    append(`<?xml version="1.0" standalone="no"?>`)

    let bBounds = bd.layout.bounds;
    let w = bBounds.maxs[0]-bBounds.mins[0]+40
    let h = -bBounds.mins[1]+bBounds.maxs[1]+40

    //begin svg
    append(`<svg width="${f(w)}mm" height="${f(h)}mm" viewBox="${f(bBounds.mins[0]-20)} ${f(-bBounds.maxs[1]-20)} ${f(w)} ${f(h)}" xmlns="http://www.w3.org/2000/svg" version="1.1">`);

    append(`<title>${bd.meta.name} ${layerName} layer</title>`);
    
    append(`<desc>The ${bd.meta.name} ${layerName} layer</desc>`);

    const cRD = globals.renderData.case;
    let layerData = cRD.layers[layerName];
    if( layerData.outlines ) {
        let pathStr = `<path fill="red" fill-rule="evenodd" stroke="blue" stroke-width="1" d="`
        for(let shape of layerData.outlines) {
            if(Array.isArray(shape)) {
                let isL = false;
                if(shape.length > 1) {
                    // starting point
                    let p = shape[0];
                    switch(p.type) {
                        case 0:
                            pathStr += `M${f(p.point.x)},${f(-p.point.z)}`
                            break;
                        case 1:
                            let startPoint = p.center.add(coremath.getNormalFromRot(p.endRot - p.rotDegrees).scale(p.radius));
                            pathStr += `M${f(startPoint.x)},${f(-startPoint.z)}`
                            break;
                    }
    
                    for(let i = 0; i <= shape.length; i++) {
                        let p = shape[i%shape.length];
                        switch(p.type) {
                            case 0:
                                if(!isL) { pathStr+="L"; isL = true; }
                                pathStr += `${f(p.point.x)},${f(-p.point.z)} `
                                break;
                            case 1: // arc
                                isL = false;
                                let endPoint = p.center.add(coremath.getNormalFromRot(p.endRot).scale(p.radius));
                                let sweepFlag = (p.rotDegrees > 0)?0:1;
                                //(rx ry x-axis-rotation large-arc-flag sweep-flag x y)
                                pathStr += `A${f(p.radius)},${f(p.radius)} 0 0,${sweepFlag} ${f(endPoint.x)},${f(-endPoint.z)} `
                                break;
                        }
                    }
                }
            } else {
                if(shape.type == 2) {
                    // could do this with relative movements but this is slightly more compact output.
                    pathStr += `M${f(shape.center.x+shape.radius)},${f(-shape.center.z)}`
                    pathStr += `A${f(shape.radius)},${f(shape.radius)} 0 1,0 ${f(shape.center.x-shape.radius)},${f(-shape.center.z)} `
                    pathStr += `A${f(shape.radius)},${f(shape.radius)} 0 1,0 ${f(shape.center.x+shape.radius)},${f(-shape.center.z)} `
                }
            }
        }
        pathStr += `z"/>`;
        append(pathStr);
    }
    //end svg
    append(`</svg>`);

    return svg.join('\n');
}