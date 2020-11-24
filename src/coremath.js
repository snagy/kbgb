
export function lineLineIntersection(p0, d0, p1, d1) {
    let det = d0.x * d1.z - d1.x * d0.z;
    if (det < BABYLON.Epsilon) // no collision
    {
        return null;
    }

    let prevC = p0.x * d0.x + p0.z * d0.z;
    let nextC = p1.x * d1.x + p1.z * d1.z;
    let intersection = new BABYLON.Vector3((d1.z * prevC - d0.z * nextC) / det, 0,
        (d0.x * nextC - d1.x * prevC) / det);

    return intersection;
}

export function rayToSegment(x0, xL, xNorm, y0, y1) {
    //let xL = x1.subtract(x0);
    let yL = y1.subtract(y0);
    //let xNorm = (new BABYLON.Vector3(xL.z, 0, -xL.x)).normalize();
    let yNorm = (new BABYLON.Vector3(yL.z, 0, -yL.x)).normalize();

    let intersection = lineLineIntersection(x0,xNorm,y0,yNorm);
    if(intersection) {
        let intLenSq = intersection.subtract(y0).lengthSquared();
        if(intLenSq > -BABYLON.Epsilon && intLenSq < yL.lengthSquared() - BABYLON.Epsilon) {
            return intersection;
        }
    }
    return null;
}

// only convex
export function isPointInPoly(p, poly) {
    for(let i = 0; i < poly.length; i++) {
        let point = poly[i];
        let next = poly[(i + 1) % poly.length];
        let nextDir = next.subtract(point).normalize();
        let nextNorm = new BABYLON.Vector3(nextDir.z, 0, -nextDir.x);
        let pV = p.subtract(point).normalize();
        let d = BABYLON.Vector3.Dot(pV,nextNorm)
        if( d > BABYLON.Epsilon) {
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
    return new BABYLON.Vector3(Math.cos(rot), 0, Math.sin(rot));
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
        pList.unshift(points[i])
    }

    //Return result
    return pList
}

// offset is + to the left, - to right (right won't work right now)
export function genArrayFromOutline(outline, offset, fillets, close, segments) {
    let outPoints = [];
    //todo turn fillets into array if it's just a value
    if (!segments) {
        segments = 4;
    }

    for (let i = 0; i < outline.length; i++) {
        let point = outline[i];
        let next = outline[(i + 1) % outline.length];
        let prev = outline[(i - 1 + outline.length) % outline.length];
        let nextDir = next.subtract(point).normalize();
        let prevDir = point.subtract(prev).normalize();
        let nextNorm = new BABYLON.Vector3(nextDir.z, 0, -nextDir.x);
        let prevNorm = new BABYLON.Vector3(prevDir.z, 0, -prevDir.x);
        let inPoint = point.add(prevNorm.scale(offset));
        let outPoint = point.add(nextNorm.scale(offset));

        let intersection = lineLineIntersection(inPoint, prevNorm,
            outPoint, nextNorm);
        if (intersection === null) {
            outPoints.push(inPoint);
            outPoints.push(outPoint);
            continue;
        }

        if (!fillets) {
            outPoints.push(intersection);
        }
        else {
            let fillet = fillets;
            let filletCenter = lineLineIntersection(inPoint.add(prevNorm.scale(-fillet)), prevNorm,
                outPoint.add(nextNorm.scale(-fillet)), nextNorm);


            let startRot = getRotFromNormal(prevNorm);
            let endRot = getRotFromNormal(nextNorm);
            if (endRot < startRot) {
                endRot += Math.PI * 2;
            }
            let rotStep = (endRot - startRot) / segments;

            for (let i = 0; i <= segments; i++) {
                outPoints.push(filletCenter.add(getNormalFromRot(startRot + rotStep * i).scale(fillet)));
            }
        }
    }

    if (close) {
        outPoints.push(outPoints[0]);
    }

    return outPoints;
}