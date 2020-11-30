
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

    //begin svg
    append(`<svg viewBox="${f(bBounds.mins[0]-20)} ${f(-bBounds.maxs[1]-20)} ${f(bBounds.maxs[0]-bBounds.mins[0]+40)} ${f(-bBounds.mins[1]+bBounds.maxs[1]+40)}" xmlns="http://www.w3.org/2000/svg" version="1.1">`);

    append(`<title>${bd.meta.name} ${layerName} layer</title>`);
    
    append(`<desc>The ${bd.meta.name} ${layerName} layer</desc>`);

    const cRD = globals.renderData.case;
    let layerData = cRD.layers[layerName];
    if( layerData.outlines ) {
        let pathStr = `<path fill="red" fill-rule="evenodd" stroke="blue" stroke-width="1" d="`
        for(let shape of layerData.outlines) {
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
                            //(rx ry x-axis-rotation large-arc-flag sweep-flag x y)
                            pathStr += `A${f(p.radius)},${f(p.radius)} 0 0,0 ${f(endPoint.x)},${f(-endPoint.z)} `
                            break;
                    }
                }
            }
        }
        pathStr += `z"/>`;
        append(pathStr);
    }
    // append(`<rect x="1" y="1" width="398" height="398" fill="none" stroke="blue" />`);
    // append(`<path d="M 100 100 L 300 100 L 200 300 z" fill="red" stroke="blue" stroke-width="3" />`);

    //end svg
    append(`</svg>`);

    return svg.join('\n');
}