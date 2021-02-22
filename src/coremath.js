import {Epsilon, Vector3} from '@babylonjs/core';

let polyID = 0;

export function Poly(points) {
    this.points = points;
    this.id = polyID++;
    this.overlappingPolys = {};
    this.type = "rect";
}

export function createRectPoly(w, h, xform) {
   return (new Poly([
        Vector3.TransformCoordinates(new Vector3(-w, 0, -h), xform),
        Vector3.TransformCoordinates(new Vector3(w, 0, -h), xform),
        Vector3.TransformCoordinates(new Vector3(w, 0, h), xform),
        Vector3.TransformCoordinates(new Vector3(-w, 0, h), xform)
    ]));
}


export function Point(point) {
    this.type = 0;
    this.point = point;
}


export function Arc(center, radius, rotRadians, endRot) {
    this.type = 1;
    this.center = center;
    this.radius = radius;
    this.rotRadians = rotRadians;
    this.endRot = endRot;
}

export function Circle(center, radius) {
    this.type = 2;
    this.center = center;
    this.radius = radius;
}

export function lineLineIntersection(p0, d0, p1, d1) {
    let det = d0.x * d1.z - d1.x * d0.z;
    if (Math.abs(det) < Epsilon) // no collision
    {
        return null;
    }

    let prevC = p0.x * d0.x + p0.z * d0.z;
    let nextC = p1.x * d1.x + p1.z * d1.z;
    let intersection = new Vector3((d1.z * prevC - d0.z * nextC) / det, 0,
        (d0.x * nextC - d1.x * prevC) / det);

    return intersection;
}

function nearestPointOnLine(x0, xL, y0) {
    let dir = y0.subtract(x0);
    let xNormalized = xL.normalizeToNew();
    let dot = Vector3.Dot(dir,xNormalized);
    
    return x0.add(xNormalized.scale(dot));
}

function pointToLineDistSq(x0, xL, y0) {
    let nearestPoint = nearestPointOnLine(x0, xL, y0);
    return y0.subtract(nearestPoint).lengthSquared();
}

function segmentToArcIntersection(x0, x1, xL, xNorm, a) {
    let nearestPoint = nearestPointOnLine(x0, xL, a.center);
    let dist = a.center.subtract(nearestPoint).length();
    let numIntersections = 0;
    if( Math.abs(dist-a.radius) < Epsilon ) {
        return [nearestPoint];
    }
    else if( dist > a.radius ) {
        return [];
    }

    return {numIntersections:numIntersections};
}

export function segmentToSegment(x0, x1, xL, xNorm, y0, y1) {
    //let xL = x1.subtract(x0);
    let yL = y1.subtract(y0);
    //let xNorm = (new Vector3(xL.z, 0, -xL.x)).normalize();
    let yNorm = (new Vector3(yL.z, 0, -yL.x)).normalize();

    let result = {intersection: lineLineIntersection(x0,xNorm,y0,yNorm),
                  type:"unknown"}
    if(result.intersection) {
        let y0Dot = Vector3.Dot(result.intersection.subtract(y0),yL);
        let y1Dot = Vector3.Dot(result.intersection.subtract(y1),yL);
        let x0Dot = Vector3.Dot(result.intersection.subtract(x0),xL);
        let x1Dot = Vector3.Dot(result.intersection.subtract(x1),xL);
        if(y0Dot > Epsilon && y1Dot < Epsilon &&
           x0Dot > -Epsilon && x1Dot < Epsilon) {
            result.type = "in_segment";
        } else {
            result.type = "off_segment";
        }
    } else {
        if(pointToLineDistSq(x0,xL,y0) < Epsilon) {
            result.type = "colinear"
            // check overlap?
            // let y0In = (Vector3.Dot(y0.subtract(x0),xL) > -Epsilon && Vector3.Dot(y0.subtract(x1),xL) < Epsilon);
            // let y1In = (Vector3.Dot(y1.subtract(x0),xL) > -Epsilon && Vector3.Dot(y1.subtract(x1),xL) < Epsilon);
            // let x0In = (Vector3.Dot(x0.subtract(y0),yL) > -Epsilon && Vector3.Dot(x0.subtract(y1),yL) < Epsilon);
            // let x1In = (Vector3.Dot(x1.subtract(y0),yL) > -Epsilon && Vector3.Dot(x1.subtract(y1),yL) < Epsilon);
            // if(y0In || x0In || y1In || x1In) {
            //     result.type = "colinear_OVERLAPPING"
            // }
        } else {
            result.type = "parallel"
        }
    }
    return result;
}

export function segmentToPoly(s0, s1, poly) {
    let tL = s1.subtract(s0);
    const tNorm = new Vector3(tL.z,0,-tL.x).normalize();
    let closest = 1000000000.0;
    let closestIntersection = null;
    let numIntersections = 0;

    for(let j = 0; j < poly.length; j++) {
        const sLine = [poly[j], poly[(j+1)%poly.length]];
        const sL = sLine[1].subtract(sLine[0]);
        const sNorm = new Vector3(sL.z,0,-sL.x).normalize();
        
        let segRes = segmentToSegment(s0, s1, tL, tNorm, sLine[0], sLine[1]);
        if(segRes.type == "in_segment" && segRes.intersection) {
            let dist = segRes.intersection.subtract(s0).lengthSquared();
            if( dist > Epsilon*Epsilon) {
                numIntersections += 1;
                if( dist < closest ) {
                    closest = dist;
                    closestIntersection = segRes.intersection;
                }
            }
        }
    }

    return {numIntersections:numIntersections,nearestIntersection:closestIntersection,nearestDistSq:closest};
}

// only convex
export function isPointInPoly(p, poly) {
    for(let i = 0; i < poly.length; i++) {
        let point = poly[i];
        let next = poly[(i + 1) % poly.length];
        let nextDir = next.subtract(point).normalize();
        let nextNorm = new Vector3(nextDir.z, 0, -nextDir.x);
        let pV = p.subtract(point).normalize();
        let d = Vector3.Dot(pV,nextNorm)
        if( d > Epsilon) {
            return false;
        }
    }
    return true;
}

export function getRotFromNormal(norm) {
    let t = Math.acos(norm.x);
    if (norm.z < 0) t = 2 * Math.PI - t;
    return t;
}

export function getNormalFromRot(rot) {
    return new Vector3(Math.cos(rot), 0, Math.sin(rot));
}

var EPSILON     = 1.1102230246251565e-16
var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON
function orient(a, b, c) {
    var l = (a.z - c.z) * (b.x - c.x)
    var r = (a.x - c.x) * (b.z - c.z)
    var det = l - r
    var s
    if(l > 0) {
      if(r <= 0) {
        return det
      } else {
        s = l + r
      }
    } else if(l < 0) {
      if(r >= 0) {
        return det
      } else {
        s = -(l + r)
      }
    } else {
      return det
    }
    var tol = ERRBOUND3 * s
    if(det >= tol || det <= -tol) {
      return det
    }
    return 0
  }

// convex hull of points on the x/z plane
export function convexHull2d(points) {
    var n = points.length

    if (n < 3) {
        var result = new Array(n)
        for (var i = 0; i < n; ++i) {
            result[i] = i
        }

        if (n === 2 &&
            points[0].x === points[1].x &&
            points[0].z === points[1].z) {
            return [0]
        }

        return result
    }

    //Sort point indices along x-axis
    var sorted = new Array(n)
    for (var i = 0; i < n; ++i) {
        sorted[i] = i
    }
    sorted.sort(function (a, b) {
        var d = points[a].x - points[b].x
        if (d) {
            return d
        }
        return points[a].z - points[b].z
    })

    //Construct upper and lower hulls
    var lower = [sorted[0], sorted[1]]
    var upper = [sorted[0], sorted[1]]

    for (var i = 2; i < n; ++i) {
        var idx = sorted[i]
        var p = points[idx]

        //Insert into lower list
        var m = lower.length
        while (m > 1 && orient(
                                points[lower[m - 2]],
                                points[lower[m - 1]],
                                p) <= 0) {
            m -= 1
            lower.pop()
        }
        lower.push(idx)

        //Insert into upper list
        m = upper.length
        while (m > 1 && orient(
            points[upper[m - 2]],
            points[upper[m - 1]],
            p) >= 0) {
            m -= 1
            upper.pop()
        }
        upper.push(idx)
    }

    //Merge lists together
    var result = new Array(upper.length + lower.length - 2)
    var ptr = 0
    for (var i = 0, nl = lower.length; i < nl; ++i) {
        result[ptr++] = lower[i]
    }
    for (var j = upper.length - 2; j > 0; --j) {
        result[ptr++] = upper[j]
    }

    let pList = [];
    for( const i of result ) {
        if(pList.length < 1 || points[i].subtract(pList[0]).lengthSquared() > Epsilon*Epsilon ) {
            pList.unshift(points[i])
        } else {
            console.log(`skipping point ${points[i]} too close to ${pList[0]}`)
        }
    }

    return pList
}


export function createVoronoi(points) {
    var vSites = [];
    var bbox = {xl:1000000, xr:-100000, zt:1000000, zb:-1000000};

    let addSite = function(site) {
        vSites.push(site);
        bbox.xl = Math.min(site.x,bbox.xl);
        bbox.xr = Math.max(site.x,bbox.xr);
        bbox.zt = Math.min(site.z,bbox.zt);
        bbox.zb = Math.max(site.z,bbox.zb);
    }

    for( const p of points ) {
        addSite(p);
    }

    const bbump = 10000;
    bbox.xl -= bbump;
    bbox.zt -= bbump;
    bbox.xr += bbump;
    bbox.zb += bbump;

    var voronoi = new Voronoi();
    const vRes = voronoi.compute(vSites, bbox);

    console.log(`voronoi!`);
    console.log(vRes);

    return vRes;
}

// combine two outlines.  'subtract' assumes one is being cut from the other, the other assumes they are being added
// they must intersect (todo: fix that assumption)
export function combineOutlines(primary, primaryFillets, secondary, secondaryFillets, intersectionFillet, subtraction) {
    let output = [];
    let outputFillets = [];
    let walkingShape = primary;
    let walkingFillets = primaryFillets;
    let targetShape = secondary;
    let targetFillets = secondaryFillets;
    output.push(walkingShape[0]);
    outputFillets.push(primaryFillets[0])
    let curr = walkingShape[0];
    let currFillet = walkingFillets[0];
    let targ = walkingShape[1];
    let targFillet = walkingFillets[1];
    let nextWalkingIdx = 2;
    do {
        let tL = targ.subtract(curr);
        const tNorm = new Vector3(tL.z,0,-tL.x).normalize();
        let closestEntry = 1000000000.0;
        let entry = null;
        let entryNextIdx = 0;
        let closestExit = 1000000000.0;
        let exit = null;

        const maxLen = (tL.lengthSquared() - Epsilon*Epsilon);
        for(let j = 0; j < targetShape.length; j++) {
            const sLine = [targetShape[j], targetShape[(j+1)%targetShape.length]];
            const sL = sLine[1].subtract(sLine[0]);
            const sNorm = new Vector3(sL.z,0,-sL.x).normalize();
            
            let segRes = segmentToSegment(curr, targ, tL, tNorm, sLine[0], sLine[1]);
            if(segRes.type === "in_segment" && segRes.intersection) {
                let dist = segRes.intersection.subtract(curr).lengthSquared();
                if( dist > Epsilon*Epsilon && dist < maxLen) {
                    let isEntry = (Vector3.Dot(sNorm, tL) < 0) ^ subtraction;
                    if(isEntry) {
                        if( dist < closestEntry ) {
                            closestEntry = dist;
                            entry = segRes.intersection;
                            entryNextIdx = (j+1)%targetShape.length;
                        }
                    } else {
                        if( dist < closestExit ) {
                            closestExit = dist;
                            exit = segRes.intersection;
                        }
                    }
                }
            }
        }
        if( entry || exit ) {
            if(closestExit < closestEntry) {
                console.log("started inside");
                // we're in it.  uhhhh.
                // target remains the same and push the entry point on the stack
                output.pop();
                outputFillets.pop();
                curr = exit;
                currFillet = intersectionFillet;
            } else {
                // console.log(`swapping at ${entry}`);
                curr = entry;
                currFillet = intersectionFillet;
                let tmp = targetShape;
                targetShape = walkingShape;
                walkingShape = tmp;
                tmp = targetFillets;
                targetFillets = walkingFillets;
                walkingFillets = tmp;
                nextWalkingIdx = entryNextIdx;
                targ = walkingShape[nextWalkingIdx];
                targFillet = walkingFillets[nextWalkingIdx];
                nextWalkingIdx = (nextWalkingIdx+1)%walkingShape.length;
            }
        }
        else {
            // console.log(`walking to ${targ}`);
            curr = targ;
            currFillet = targFillet;
            targ = walkingShape[nextWalkingIdx];
            targFillet = walkingFillets[nextWalkingIdx];
            nextWalkingIdx = (nextWalkingIdx+1)%walkingShape.length;
        }
        output.push(curr);
        outputFillets.push(currFillet);
        // console.log(`len ${curr.subtract(output[0]).lengthSquared()}`)
        if(output.length > 10000) {
            console.log("boolean output overflow");
            output = [];
            outputFillets = [];
            break;
        }
    }  while(curr.subtract(output[0]).lengthSquared() > Epsilon*Epsilon);
    output.pop();
    outputFillets.pop();
    return {outline:output,fillets:outputFillets};
}

// fixup the outline to remove overlaps/etc
export function fixupOutline(outline, fillets, intersectionFillet) {
    let output = [];
    let outputFillets = [];

    let curr = null;
    let currIdx = 0;
    for(let i = 0; i < outline.length; i++) {
        const p = outline[i];
        // find a point guaranteed to be on the convex hull (so we can guess winding order below)
        if(!curr || p.z < curr.z || (Math.abs(p.z-curr.z) < Epsilon && p.x <= curr.x)) {
            curr = p;
            currIdx = i;
        }
    }
    let currFillet = fillets[currIdx];

    let targIdx = (currIdx+1)%outline.length;
    let targ = outline[targIdx];
    let targFillet = fillets[targIdx];

    let targs = [];

    output.push(curr);
    outputFillets.push(currFillet)

    do {
        let loopIdx = targs.indexOf(targIdx);
        if(loopIdx !== -1) {
            console.log(`LOOP DETECTED at ${targIdx}`);
            console.log(targs);

            targs.length = loopIdx;
            output.length = loopIdx;
            outputFillets.length = loopIdx;
            
            curr = targ;
            currFillet = targFillet;
            currIdx = targIdx;
            targIdx = (targIdx+1)%outline.length;
            output.push(curr);
            outputFillets.push(currFillet);
        }
        targs.push(targIdx);

        let tL = targ.subtract(curr);
        const tNorm = new Vector3(tL.z,0,-tL.x).normalize();
        let closestEntry = 1000000000.0;
        let entry = null;
        let entryNextIdx = 0;

        const maxLen = (tL.lengthSquared() - Epsilon*Epsilon);
        for(let j = 0; j < outline.length; j++) {
            const jNext = (j+1)%outline.length;
            if(j===currIdx || j === targIdx || jNext === currIdx || jNext === targIdx) continue;
            const sLine = [outline[j], outline[jNext]];
            const sL = sLine[1].subtract(sLine[0]);
            const sNorm = new Vector3(sL.z,0,-sL.x).normalize();
            const s0 = sLine[0];
            const s1 = sLine[1];
            
            let segRes = segmentToSegment(curr, targ, tL, tNorm, s0, s1);
            if(segRes.type === "in_segment" && segRes.intersection) {
                let dist = segRes.intersection.subtract(curr).lengthSquared();
                if( dist > Epsilon*Epsilon && dist < maxLen) {
                    if( dist < closestEntry ) {
                        closestEntry = dist;
                        entry = segRes.intersection;
                        entryNextIdx = jNext;
                        if(entry.subtract(s1).lengthSquared() < Epsilon * Epsilon) {
                            entryNextIdx = jNext+1;
                        }
                    }
                }
            }
            // else if(segRes.type === "colinear") {
            //     console.log(`hitting the colinear`)
            //     // check overlap
            //     let y0In = (Vector3.Dot(s0.subtract(curr),tL) > -Epsilon && Vector3.Dot(s0.subtract(targ),tL) < Epsilon);
            //     let y1In = (Vector3.Dot(s1.subtract(curr),tL) > -Epsilon && Vector3.Dot(s1.subtract(targ),tL) < Epsilon);
            //     let x0In = (Vector3.Dot(curr.subtract(s0),sL) > -Epsilon && Vector3.Dot(curr.subtract(s1),sL) < Epsilon);
            //     let x1In = (Vector3.Dot(targ.subtract(s0),sL) > -Epsilon && Vector3.Dot(targ.subtract(s1),sL) < Epsilon);
            //     if(y0In || x0In || y1In || x1In) {
            //         let dist = s0.subtract(curr).lengthSquared();
            //         if( dist < closestEntry ) {
            //             closestEntry = dist;
            //             entry = s0;
            //             entryNextIdx = jNext;
            //         }
            //     }
            // }
        }
        if( entry ) {
            console.log(`trimming at ${curr} (${currIdx}) to ${targ} (${targIdx}) at ${entry} ${entryNextIdx}`);
            curr = entry;
            currFillet = intersectionFillet;
            currIdx = -1;
            targIdx = entryNextIdx;
        }
        else {
            // console.log(`walking to ${targ}`);
            curr = targ;
            currFillet = targFillet;
            currIdx = targIdx;
            targIdx = (targIdx+1)%outline.length;
        }

        targ = outline[targIdx];
        if(!targ) {
            console.log(`nulltarg!`)
        }
        targFillet = fillets[targIdx];

        output.push(curr);
        outputFillets.push(currFillet);

        // console.log(`len ${curr.subtract(output[0]).lengthSquared()}`)
        if(output.length > 10000) {
            console.log("boolean output overflow");
            output = [];
            outputFillets = [];
            break;
        }
    }  while(curr.subtract(output[0]).lengthSquared() > Epsilon*Epsilon);
    output.pop();
    outputFillets.pop();
    return {outline:output, fillets:outputFillets};
}

// offset is + to the left, - to right
export function offsetOutlinePoints(outline, offset) {
    let newOutline = [];
    //todo turn fillets into array if it's just a value
    for (let i = 0; i < outline.length; i++) {
        let point = outline[i];
        let next = outline[(i + 1) % outline.length];
        let prev = outline[(i - 1 + outline.length) % outline.length];
        let nextDir = next.subtract(point).normalize();
        let prevDir = point.subtract(prev).normalize();
        let nextNorm = new Vector3(nextDir.z, 0, -nextDir.x);
        let prevNorm = new Vector3(prevDir.z, 0, -prevDir.x);
        let inPoint = point.add(prevNorm.scale(offset));
        let outPoint = point.add(nextNorm.scale(offset));

        let intersection = lineLineIntersection(inPoint, prevNorm,
            outPoint, nextNorm);
        if (intersection === null) {
            // console.log("Skipping colinear point");
            continue;
        }

        newOutline.push(intersection);
    }
    return newOutline;
}

export function filletOutline(outline, fillets, close) {
    let vectorOutline = [];
    //todo turn fillets into array if it's just a value
    if(fillets && !Array.isArray(fillets)) {
        fillets = (new Array(outline.length)).fill(fillets)
    }
    for (let i = 0; i < outline.length; i++) {
        const point = outline[i];
        const next = outline[(i + 1) % outline.length];
        const prev = outline[(i - 1 + outline.length) % outline.length];
        const nextVec = next.subtract(point);
        const nextLen = nextVec.length();
        const nextDir = nextVec.normalizeFromLength(nextLen);
        const prevVec = point.subtract(prev);
        const prevLen = prevVec.length();
        const prevDir = prevVec.normalizeFromLength(prevLen);
        const nextNorm = new Vector3(nextDir.z, 0, -nextDir.x);
        const prevNorm = new Vector3(prevDir.z, 0, -prevDir.x);

        const nDotP = Vector3.Dot(nextDir,prevDir);

        if (!fillets || Math.abs(nDotP) > 0.9) {
            vectorOutline.push(new Point(point));
        }
        else {
            // todo:  should this be offset or some kind of scaled offset from inPoint/outPoint etc?
            let fillet = Math.min(fillets[i],Math.min(prevLen,nextLen)*0.5);
            let flip = Vector3.Dot(prevNorm,nextDir) > 0;
            if( flip ) {
                fillet = -fillet;
            }
            let filletCenter = lineLineIntersection(point.add(prevNorm.scale(-fillet)), prevNorm,
                                                    point.add(nextNorm.scale(-fillet)), nextNorm);

            if(!filletCenter) {
                vectorOutline.push(new Point(point));
                continue;
            }

            vectorOutline.push(new Point(filletCenter.add(prevNorm.scale(fillet))));

            let startRot = getRotFromNormal(prevNorm)+ Math.PI * 2;
            let endRot = getRotFromNormal(nextNorm)+ Math.PI * 2;
            if(flip) {
                startRot += Math.PI;
                endRot += Math.PI;
                fillet = -fillet;
                if (startRot < endRot) {
                    startRot += Math.PI * 2;
                }
            }
            else if (endRot < startRot) {
                endRot += Math.PI * 2;
            }
            let totRot = endRot - startRot;
            vectorOutline.push(new Arc(filletCenter, fillet, totRot, endRot))
        }
    }

    if (close) {
        vectorOutline.push(vectorOutline[0]);
    }

    return vectorOutline;    
}

// offset is + to the left, - to right
export function offsetAndFilletOutline(outline, offset, fillets, close) {
    const offsetPoints = offsetOutlinePoints(outline,offset)

    if(fillets && !Array.isArray(fillets)) {
        fillets = (new Array(outline.length)).fill(fillets)
    }

    const fixed = fixupOutline(offsetPoints,fillets,fillets[0]);

    const fixedPoints = fixed.outline;
    const fixedFillets = fixed.fillets;

    if(fillets) {
        return filletOutline(fixedPoints,fixedFillets,close);
    }
    else {
        let vectorPath = []
        for(const p of fixedPoints) {
            vectorPath.push(new Point(p))
        }
        return vectorPath;
    }
}

export function genPointsFromVectorPath(vectorPath, segmentsPerFillet) {
    let outPoints = [];
    //todo turn fillets into array if it's just a value
    if (!segmentsPerFillet) {
        segmentsPerFillet = 4;
    }

    for (let i = 0; i < vectorPath.length; i++) {
        let nextItem = vectorPath[i];
        switch(nextItem.type) {
            case 0:
                outPoints.push(nextItem.point)
                break;
            case 1:
                let rotStep = nextItem.rotRadians / segmentsPerFillet;
                let endRot = nextItem.endRot;
                for (let i = segmentsPerFillet-1; i >= 0; i--) {
                    outPoints.push(nextItem.center.add(getNormalFromRot(endRot - rotStep * i).scale(nextItem.radius)));
                }
                break;
        }
    }

    return outPoints;
}

export function getVectorPathBounds(vectorPath) {
    let mins = new Vector3(10000000.0,100000000.0,1000000000.0);
    let maxs = new Vector3(-10000000.0,-10000000.0,-10000000.0);

    for (let i = 0; i < vectorPath.length; i++) {
        let nextItem = vectorPath[i];
        switch(nextItem.type) {
            case 0:
                mins.minimizeInPlace(nextItem.point);
                maxs.maximizeInPlace(nextItem.point);
                break;
            case 1:
                //todo:  better analytic solution for this
                let minPoint = nextItem.center.add((new Vector3(-1,0,-1)).scale(nextItem.radius));
                let maxPoint = nextItem.center.add((new Vector3(1,0,1)).scale(nextItem.radius));
                mins.minimizeInPlace(minPoint);
                maxs.maximizeInPlace(maxPoint);
                break;
        }
    }
    return {mins:mins,maxs:maxs};
}

export function genArrayFromOutline(outline, offset, fillets, close, segments) {
    let vectorPath = offsetAndFilletOutline(outline, offset, fillets, close);
    return genPointsFromVectorPath(vectorPath, segments);
}

export function genArrayForCircle(circle, offset, segments) {
    let outPoints = [];
    //todo turn fillets into array if it's just a value
    if (!segments) {
        segments = 10;
    }

    let rotStep = Math.PI * 2 / segments;
    for (let i = 0; i < segments; i++) {
        outPoints.push(circle.center.add(getNormalFromRot(rotStep * i).scale(circle.radius+offset)));
    }

    return outPoints;
}