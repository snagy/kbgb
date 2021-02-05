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
        if(y0Dot > -Epsilon && y1Dot < Epsilon &&
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
    var bbox = {xl:1000000, xr:-100000, yt:1000000, yb:-1000000};

    let addSite = function(x,y) {
        const site = {x:x,y:y};
        vSites.push(site);
        bbox.xl = Math.min(site.x,bbox.xl);
        bbox.xr = Math.max(site.x,bbox.xr);
        bbox.yt = Math.min(site.y,bbox.yt);
        bbox.yb = Math.max(site.y,bbox.yb);
    }

    for( const p of points ) {
        addSite(p.x,p.z);
    }

    const bbump = 10000;
    bbox.xl -= bbump;
    bbox.yt -= bbump;
    bbox.xr += bbump;
    bbox.yb += bbump;

    var voronoi = new Voronoi();
    const vRes = voronoi.compute(vSites, bbox);

    console.log(`voronoi!`);
    console.log(vRes);

    return vRes;
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

// offset is + to the left, - to right
export function offsetAndFilletOutline(outline, offset, fillets, close) {
    let vectorOutline = [];
    //todo turn fillets into array if it's just a value
    if(fillets && !Array.isArray(fillets)) {
        fillets = (new Array(outline.length)).fill(fillets)
    }
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

        if (!fillets) {
            vectorOutline.push(new Point(intersection));
        }
        else {
            let fillet = fillets[i];
            let flip = Vector3.Dot(prevNorm,nextDir) > 0;
            if( flip ) {
                fillet = -fillet;
            }
            let filletCenter = lineLineIntersection(inPoint.add(prevNorm.scale(-fillet)), prevNorm,
                                                    outPoint.add(nextNorm.scale(-fillet)), nextNorm);

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