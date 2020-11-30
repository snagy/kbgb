!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e={pickedKeys:[],renderData:{keys:{},case:{},mats:{},outlines:{}},boardData:{}},t={keyDims:[18,18],switchCutout:[14,14],base1U:[19.05,19.05],bezelGap:1.05,bezelThickness:8,bezelCornerFillet:.5,keyShape:"square",drawCase:!0,drawBezel:!0,drawPlate:!0,drawPCB:!0};function n(e,t,n,o){let a=t.x*o.z-o.x*t.z;if(Math.abs(a)<BABYLON.Epsilon)return null;let r=e.x*t.x+e.z*t.z,l=n.x*o.x+n.z*o.z;return new BABYLON.Vector3((o.z*r-t.z*l)/a,0,(t.x*l-o.x*r)/a)}function o(e,t,o,a,r,l){let s=l.subtract(r),i={intersection:n(e,a,r,new BABYLON.Vector3(s.z,0,-s.x).normalize()),type:"unknown"};if(i.intersection){let n=BABYLON.Vector3.Dot(i.intersection.subtract(r),s),a=BABYLON.Vector3.Dot(i.intersection.subtract(l),s),c=BABYLON.Vector3.Dot(i.intersection.subtract(e),o),d=BABYLON.Vector3.Dot(i.intersection.subtract(t),o);n>-BABYLON.Epsilon&&a<BABYLON.Epsilon&&c>-BABYLON.Epsilon&&d<BABYLON.Epsilon?i.type="in_segment":i.type="off_segment"}else(function(e,t,n){let o=n.subtract(e),a=t.normalizeToNew(),r=BABYLON.Vector3.Dot(o,a),l=e.add(a.scale(r));return n.subtract(l).lengthSquared()})(e,o,r)<BABYLON.Epsilon?i.type="colinear":i.type="parallel";return i}function a(e,t){for(let n=0;n<t.length;n++){let o=t[n],a=t[(n+1)%t.length].subtract(o).normalize(),r=new BABYLON.Vector3(a.z,0,-a.x),l=e.subtract(o).normalize();if(BABYLON.Vector3.Dot(l,r)>BABYLON.Epsilon)return!1}return!0}function r(e){let t=Math.acos(e.x);return e.z<0&&(t=2*Math.PI-t),t}function l(e){return new BABYLON.Vector3(Math.cos(e),0,Math.sin(e))}function s(e,t,n){var o,a=(e.z-n.z)*(t.x-n.x),r=(e.x-n.x)*(t.z-n.z),l=a-r;if(a>0){if(r<=0)return l;o=a+r}else{if(!(a<0))return l;if(r>=0)return l;o=-(a+r)}var s=33306690738754716e-32*o;return l>=s||l<=-s?l:0}function i(e){var t=e.length;if(t<3){for(var n=new Array(t),o=0;o<t;++o)n[o]=o;return 2===t&&e[0].x===e[1].x&&e[0].z===e[1].z?[0]:n}var a=new Array(t);for(o=0;o<t;++o)a[o]=o;a.sort((function(t,n){var o=e[t].x-e[n].x;return o||e[t].z-e[n].z}));var r=[a[0],a[1]],l=[a[0],a[1]];for(o=2;o<t;++o){for(var i=a[o],c=e[i],d=r.length;d>1&&s(e[r[d-2]],e[r[d-1]],c)<=0;)d-=1,r.pop();for(r.push(i),d=l.length;d>1&&s(e[l[d-2]],e[l[d-1]],c)>=0;)d-=1,l.pop();l.push(i)}n=new Array(l.length+r.length-2);for(var u=0,B=(o=0,r.length);o<B;++o)n[u++]=r[o];for(var h=l.length-2;h>0;--h)n[u++]=l[h];let p=[];for(const t of n)p.unshift(e[t]);return p}function c(e){this.type=0,this.point=e}function d(e,t,n,o){this.type=1,this.center=e,this.radius=t,this.rotDegrees=n,this.endRot=o}function u(e,t,o,a){let l=[];for(let a=0;a<e.length;a++){let s=e[a],i=e[(a+1)%e.length],u=e[(a-1+e.length)%e.length],B=i.subtract(s).normalize(),h=s.subtract(u).normalize(),p=new BABYLON.Vector3(B.z,0,-B.x),m=new BABYLON.Vector3(h.z,0,-h.x),b=s.add(m.scale(t)),f=s.add(p.scale(t)),L=n(b,m,f,p);if(null!==L)if(o){let e=o,t=BABYLON.Vector3.Dot(m,B)>0;t&&(e=-e);let a=n(b.add(m.scale(-e)),m,f.add(p.scale(-e)),p);l.push(new c(a.add(m.scale(e))));let s=r(m)+2*Math.PI,i=r(p)+2*Math.PI;t?(s+=Math.PI,i+=Math.PI,e=-e,s<i&&(s+=2*Math.PI)):i<s&&(i+=2*Math.PI);let u=i-s;l.push(new d(a,e,u,i))}else l.push(new c(L));else l.push(new c(b)),l.push(new c(f))}return a&&l.push(l[0]),l}function B(e,t){let n=[];t||(t=4);for(let o=0;o<e.length;o++){let a=e[o];switch(a.type){case 0:n.push(a.point);break;case 1:let e=a.rotDegrees/t,o=a.endRot;for(let r=t-1;r>=0;r--)n.push(a.center.add(l(o-e*r).scale(a.radius)))}}return n}function h(e,t,n,o,a){return B(u(e,t,n,o),a)}function p(t,n){let o=e.renderData.mats;o[t]||(o[t]=new BABYLON.PBRMetallicRoughnessMaterial(t,e.scene),o[t].metallic=0,o[t].roughness=.6,o[t].baseColor=n,o[t].environmentTexture=e.hdrTexture)}function m(){e.canvas=document.getElementById("renderCanvas"),e.engine=new BABYLON.Engine(e.canvas,!0),e.scene=function(){const t=e.engine;var n=new BABYLON.Scene(t),o=new BABYLON.ArcRotateCamera("Camera",-Math.PI/2,0,10,new BABYLON.Vector3(0,0,0),n);return o.setTarget(BABYLON.Vector3.Zero()),o.attachControl(e.canvas,!1),e.camera=o,e.hdrTexture=BABYLON.CubeTexture.CreateFromPrefilteredData("assets/environment.dds",n),e.currentSkybox=n.createDefaultSkybox(e.hdrTexture,!0,(n.activeCamera.maxZ-n.activeCamera.minZ)/2,.3),n}()}function b(){let t=e.renderData.keys,n=e.renderData.outlines,o=e.renderData.mats;for(const[t,o]of Object.entries(n))e.scene.removeMesh(o);for(const a of e.pickedKeys)if(t[a]){let r=t[a];n[a]=BABYLON.MeshBuilder.CreateRibbon(a+"outline",{pathArray:[h(r.outline,.1,.1,!0),h(r.outline,.5,.5,!0)]},e.scene),n[a].material=o.keySel,n[a].translate(new BABYLON.Vector3(0,10.5,0),1,BABYLON.Space.LOCAL)}else console.log("picked nonexistant key")}function f(e,n,o,a,r){let l=[.5*t.switchCutout[0],.5*t.switchCutout[1]],s=o;6==e&&(s=BABYLON.Matrix.Translation(9.525,0,0).multiply(s)),a.push([BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-l[0],0,-l[1]),s),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(l[0],0,-l[1]),s),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(l[0],0,l[1]),s),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-l[0],0,l[1]),s)]);let i=[9,6.75];r.push([BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-i[0],0,-i[1]),s),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(i[0],0,-i[1]),s),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(i[0],0,i[1]),s),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-i[0],0,i[1]),s)]);let c=e;n>=1.75&&(c=n,s=BABYLON.Matrix.RotationY(Math.PI/2).multiply(s));let d=[3.5,7.5];if(c>=2){let e=0,t=0;c<=2.75?e=t=11.938:c<=3?e=t=19.05:c<=4?e=t=28.575:c<=4.5?e=t=34.671:c<=5.5?e=t=42.8625:6==c?(e=57.15,t=38.1):e=t=c<=6?47.5:c<=6.25?50:c<=6.5?52.38:c<=7?57.15:66.675;let n=[BABYLON.Matrix.Translation(-e,0,-2).multiply(s),BABYLON.Matrix.Translation(t,0,-2).multiply(s)],o=[new BABYLON.Vector3(-d[0],0,-d[1]),new BABYLON.Vector3(d[0],0,-d[1]),new BABYLON.Vector3(d[0],0,d[1]),new BABYLON.Vector3(-d[0],0,d[1])],l=[3,9.5],i=[new BABYLON.Vector3(-l[0],0,-7),new BABYLON.Vector3(l[0],0,-7),new BABYLON.Vector3(l[0],0,11),new BABYLON.Vector3(-l[0],0,11)];for(let e=0;e<n.length;e++){let t=[];for(let a=0;a<o.length;a++)t.push(BABYLON.Vector3.TransformCoordinates(o[a],n[e]));a.push(t);let l=[];for(let t=0;t<i.length;t++)l.push(BABYLON.Vector3.TransformCoordinates(i[t],n[e]));r.push(l)}}}function L(e){for(const t of e){t.outlineLines=[],t.parsedOutlineLines={};for(let e=0;e<t.bezelHole.length;e++){let n=t.bezelHole[e],o=t.bezelHole[(e+1)%t.bezelHole.length];t.outlineLines.push([n,o])}}let t=BABYLON.Epsilon,n=(e,t,n,o,a,r,l,s)=>{if(!s[e]){let s=Math.max(r-n,0)/t,i=r/t;s<1-BABYLON.Epsilon&&i>BABYLON.Epsilon&&(s>BABYLON.Epsilon&&l.push([o[0],o[0].add(a.scale(r-n))]),i<1-BABYLON.Epsilon&&l.push([o[0].add(a.scale(r)),o[1]]),l.splice(e,1))}};for(const o of e){o.visitedForOutline=!0;for(const[e,a]of Object.entries(o.overlappingKeys))for(let e=o.outlineLines.length-1;e>=0;e--){let r=o.outlineLines[e],l=r[1].subtract(r[0]),s=l.length();if(s<BABYLON.Epsilon)continue;let i=l.normalizeFromLength(s);for(let l=a.outlineLines.length-1;l>0;l--){let c=a.outlineLines[l],d=c[1].subtract(c[0]),u=d.length();if(u<BABYLON.Epsilon)continue;let B=d.normalizeFromLength(u),h=BABYLON.Vector3.Dot(B,i);if(Math.abs(h)>1-BABYLON.Epsilon){let d=r[0].subtract(c[0]);if(d.lengthSquared()<BABYLON.Epsilon){let t=r[1].subtract(c[1]).lengthSquared();if(t<BABYLON.Epsilon||t>s*s){o.outlineLines.splice(e,1);break}r[0]=c[1];break}let p=BABYLON.Vector3.Dot(d,B);if(c[0].add(B.scale(p)).subtract(r[0]).lengthSquared()<t)if(h<BABYLON.Epsilon-1)n(l,u,s,c,B,p,a.outlineLines,a.parsedOutlineLines),n(e,s,u,r,i,p,o.outlineLines,o.parsedOutlineLines);else if(h>1-BABYLON.Epsilon){if(p>BABYLON.Epsilon){let t=u-p;if(!o.parsedOutlineLines[e]&&t>BABYLON.Epsilon){if(s-t<BABYLON.Epsilon){o.outlineLines.splice(e,1);break}r[0]=r[0].add(i.scale(t))}}if(p<BABYLON.Epsilon){let t=-p;if(!o.parsedOutlineLines[e]&&t<s-BABYLON.Epsilon){if(t<BABYLON.Epsilon){o.outlineLines.splice(e,1);break}r[1]=r[0].add(i.scale(t))}}}}}}}for(const t of e)for(const[e,n]of Object.entries(t.overlappingKeys))for(let e=t.outlineLines.length-1;e>=0;e--){let r=t.outlineLines[e],l=r[1].subtract(r[0]),s=new BABYLON.Vector3(l.z,0,-l.x).normalize(),i=[],c=!1;for(let e=0;e<n.bezelHole.length;e++){let t=o(r[0],r[1],l,s,n.bezelHole[e],n.bezelHole[(e+1)%n.bezelHole.length]);if("in_segment"==t.type&&t.intersection)i.push(t.intersection);else if("colinear"==t.type){c=!0;break}}if(c)continue;let d=a(r[0],n.bezelHole),u=a(r[1],n.bezelHole);if(d&&u&&i.length<=1)t.outlineLines.splice(e,1);else if(1==i.length)d?r[0]=i[0]:r[1]=i[0],r[1].subtract(r[0]).lengthSquared()<BABYLON.Epsilon&&t.outlineLines.splice(e,1);else if(i.length>1){i.sort(((e,t)=>e.subtract(r[0]).lengthSquared()-t.subtract(r[0]).lengthSquared()));let n=r[1];r[1]=i[0],r[1].subtract(r[0]).lengthSquared()<BABYLON.Epsilon&&t.outlineLines.splice(e,1);for(let e=2;e<i.length;e+=2)i[e-1].subtract(i[e]).lengthSquared()>BABYLON.Epsilon&&t.outlineLines.push([i[e-1],i[e]]);i.length%2==0&&i[i.length-1].subtract(n).lengthSquared()>BABYLON.Epsilon&&t.outlineLines.push([i[i.length-1],n])}}let r=null,l=-1,s=!1;for(const t of e){for(let e=0;e<t.outlineLines.length;e++)if(!t.parsedOutlineLines[e]){r=t,l=e;break}if(l>=0)break}let i=[];for(;null!=r&&l>=0;){r.parsedOutlineLines[l]=!0;let e=r.outlineLines[l];if(s){let t=e[0];e[0]=e[1],e[1]=t}i.push(e[0]),l=-1;let t=20,n=(n,o,a)=>{let i=e[1].subtract(n[0]).lengthSquared();i<t&&(t=i,r=o,l=a,s=!1),i=e[1].subtract(n[1]).lengthSquared(),i<t&&(t=i,r=o,l=a,s=!0)};for(let e=0;e<r.outlineLines.length;e++)r.parsedOutlineLines[e]||n(r.outlineLines[e],r,e);for(const[e,t]of Object.entries(r.overlappingKeys))for(let e=0;e<t.outlineLines.length;e++)t.parsedOutlineLines[e]||n(t.outlineLines[e],t,e)}return i}function O(){const n=e.scene,o=e.boardData,a=e.renderData.keys,r=e.renderData.mats;if("convex"==o.caseType){let e=[];for(let[t,n]of Object.entries(a))for(let t of n.outline)e.push(t);for(let t of o.pcbOutline)e.push(t);if(o.outline=i(e),o.forceSymmetrical){let t=.5*(o.layout.bounds.maxs[0]-o.layout.bounds.mins[0])+o.layout.bounds.mins[0];for(let n of o.outline)e.push(new BABYLON.Vector3(t-(n.x-t),n.y,n.z));o.outline=i(e)}}else{let e=o.pcbBounds,t=o.layout.bounds;o.outline=[new BABYLON.Vector3(Math.min(t.mins[0],e.mins[0]),0,Math.min(t.mins[1],e.mins[1])),new BABYLON.Vector3(Math.max(t.maxs[0],e.maxs[0]),0,Math.min(t.mins[1],e.mins[1])),new BABYLON.Vector3(Math.max(t.maxs[0],e.maxs[0]),0,Math.max(t.maxs[1],e.maxs[1])),new BABYLON.Vector3(Math.min(t.mins[0],e.mins[0]),0,Math.max(t.maxs[1],e.maxs[1]))]}let l=e.renderData.case;l.layers={};let s=[u(o.outline,t.bezelGap,t.bezelCornerFillet,!1)],c=u(o.outline,t.bezelGap+t.bezelThickness,t.bezelThickness,!1),d=B(c,8);if(l.edgeMesh&&n.removeMesh(l.edgeMesh),t.drawCase&&(l.layers.edge={outlines:[c,...s]},l.edgeMesh=BABYLON.MeshBuilder.CreatePolygon("edge",{shape:d,depth:9,holes:s.map((e=>B(e,8))),updatable:!0},n),l.edgeMesh.translate(new BABYLON.Vector3(0,-1.5,0),1,BABYLON.Space.LOCAL),l.edgeMesh.material=r.case),l.bottom&&n.removeMesh(l.bottom),t.drawCase&&(l.layers.bottom={outlines:[c]},l.bottom=BABYLON.MeshBuilder.CreatePolygon("bottom",{shape:d,depth:3,updatable:!0},n),l.bottom.translate(new BABYLON.Vector3(0,-10.5,0),1,BABYLON.Space.LOCAL),l.bottom.material=r.case),l.pcbMesh&&n.removeMesh(l.pcbMesh),t.drawPCB){let e=u(o.pcbOutline,0,2,!1),t=B(e);l.layers.pcb={outlines:[e]},l.pcbMesh=BABYLON.MeshBuilder.CreatePolygon("pcbMesh",{shape:t,depth:1.6,updatable:!0},n),l.pcbMesh.translate(new BABYLON.Vector3(0,-5,0),1,BABYLON.Space.LOCAL),l.pcbMesh.material=r.fr4}let h={},p=[],m=[];for(const[e,t]of Object.entries(a))h[t.keyGroupId]||(h[t.keyGroupId]=[]),h[t.keyGroupId].push(t);for(const[e,n]of Object.entries(h)){let e=u(L(n),0,t.bezelCornerFillet,!1);p.push(e),m.push(B(e))}l.bezel&&n.removeMesh(l.bezel),t.drawBezel&&(l.layers.bezel={outlines:[c,...p]},l.bezel=BABYLON.MeshBuilder.CreatePolygon("bezel",{shape:d,depth:7.5,holes:m},n),l.bezel.translate(new BABYLON.Vector3(0,7.5,0),1,BABYLON.Space.LOCAL),l.bezel.material=r.case),l.plateMesh&&n.removeMesh(l.plateMesh);let b=[],f=[];for(const[e,t]of Object.entries(a))for(let e of t.switchCut){let t=u(e,0,.5,!1);f.push(t),b.push(B(t))}t.drawPlate&&(l.layers.plate={outlines:[c,...f]},l.plateMesh=BABYLON.MeshBuilder.CreatePolygon("plate",{shape:d,depth:1.5,holes:b},n),l.plateMesh.material=r.plate)}function A(){!function(){const n=e.scene,o=e.boardData;let a=[1e5,1e5],r=[-1e5,-1e5],l=[],s=e.renderData.keys;for(const[e,t]of Object.entries(s))t.keycap&&n.removeMesh(t.keycap);s=e.renderData.keys=[];let c=0;for(const[i,d]of Object.entries(o.layout.keys)){s[i]||(s[i]={keyGroupId:null,id:i,mins:[1e5,1e5],maxs:[-1e5,-1e5],bezelMins:[1e5,1e5],bezelMaxs:[-1e5,-1e5],overlappingKeys:{}});let u=s[i],B=[(t.keyDims[0]+t.base1U[0]*(d.width-1))/2,(t.keyDims[1]+t.base1U[1]*(d.height-1))/2],h=[d.x*t.base1U[0]+B[0],-(d.y*t.base1U[1]+B[1])],p=(new BABYLON.Vector3(h[0],0,h[1]),BABYLON.Matrix.Identity());p=p.multiply(BABYLON.Matrix.Translation(h[0],0,h[1])),0!=d.rotation_angle&&(p=p.multiply(BABYLON.Matrix.Translation(-d.rotation_x*t.base1U[0],0,d.rotation_y*t.base1U[1])),p=p.multiply(BABYLON.Matrix.RotationY(d.rotation_angle*Math.PI/180)),p=p.multiply(BABYLON.Matrix.Translation(d.rotation_x*t.base1U[0],0,-d.rotation_y*t.base1U[1]))),u.outline=[BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-B[0],0,-B[1]),p),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(B[0],0,-B[1]),p),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(B[0],0,B[1]),p),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-B[0],0,B[1]),p)],u.pcbBoxes=[],u.switchCut=[],f(d.width,d.height,p,u.switchCut,u.pcbBoxes),u.keycap&&n.removeMesh(u.keycap),t.keyShape&&(u.keycap=BABYLON.MeshBuilder.CreatePolygon(i,{shape:u.outline,depth:7,updatable:!1},n),u.keycap.translate(new BABYLON.Vector3(0,10.5,0),1,BABYLON.Space.LOCAL),d.matName&&e.renderData.mats[d.matName]&&(u.keycap.material=e.renderData.mats[d.matName])),u.bezelHole=[BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-B[0]-t.bezelGap,0,-B[1]-t.bezelGap),p),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(B[0]+t.bezelGap,0,-B[1]-t.bezelGap),p),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(B[0]+t.bezelGap,0,B[1]+t.bezelGap),p),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-B[0]-t.bezelGap,0,B[1]+t.bezelGap),p)],l.push(u.bezelHole);for(let e of u.bezelHole)u.bezelMins[0]=Math.min(u.bezelMins[0],e.x),u.bezelMaxs[0]=Math.max(u.bezelMaxs[0],e.x),u.bezelMins[1]=Math.min(u.bezelMins[1],e.z),u.bezelMaxs[1]=Math.max(u.bezelMaxs[1],e.z);for(let e of u.outline)u.mins[0]=Math.min(u.mins[0],e.x),u.maxs[0]=Math.max(u.maxs[0],e.x),u.mins[1]=Math.min(u.mins[1],e.z),u.maxs[1]=Math.max(u.maxs[1],e.z);a[0]=Math.min(u.mins[0],a[0]),r[0]=Math.max(u.maxs[0],r[0]),a[1]=Math.min(u.mins[1],a[1]),r[1]=Math.max(u.maxs[1],r[1]);let m=function(e,t,n,o){if(t.bezelMins[0]+BABYLON.Epsilon>o.bezelMaxs[0]||o.bezelMins[0]+BABYLON.Epsilon>t.bezelMaxs[0]||t.bezelMins[1]+BABYLON.Epsilon>o.bezelMaxs[1]||o.bezelMins[1]+BABYLON.Epsilon>t.bezelMaxs[1])return!1;let a=(e,t)=>{for(let n=0;n<e.bezelHole.length;n++){let o=e.bezelHole[(n+1)%e.bezelHole.length].subtract(e.bezelHole[n]),a=!0,r=!0;for(let l=0;l<t.bezelHole.length;l++){let s=BABYLON.Vector3.Dot(o,t.bezelHole[l].subtract(e.bezelHole[n]));r&=s>-BABYLON.Epsilon,a&=s<BABYLON.Epsilon}if(r||a)return!0}return!1},r=a(t,o);if(r||(r=a(o,t)),r)if(t.overlappingKeys[o.id]=o,o.overlappingKeys[t.id]=t,t.keyGroupId&&o.keyGroupId){let e=t.keyGroupId,n=o.keyGroupId;for(const[t,o]of Object.entries(s))o.keyGroupId==n&&(o.keyGroupId=e)}else t.keyGroupId?o.keyGroupId=t.keyGroupId:o.keyGroupId?t.keyGroupId=o.keyGroupId:t.keyGroupId=o.keyGroupId=c++};for(const[e,t]of Object.entries(s))e!=i&&m(d,u,o.layout.keys[e],t);u.keyGroupId||(u.keyGroupId=c++)}let d=[];for(let[e,t]of Object.entries(s))for(let e of t.pcbBoxes)for(let t of e)d.push(t);o.pcbOutline=i(d),o.pcbBounds={mins:[1e5,1e5],maxs:[-1e5,-1e5]};for(let e of o.pcbOutline)o.pcbBounds.mins[0]=Math.min(o.pcbBounds.mins[0],e.x),o.pcbBounds.maxs[0]=Math.max(o.pcbBounds.maxs[0],e.x),o.pcbBounds.mins[1]=Math.min(o.pcbBounds.mins[1],e.z),o.pcbBounds.maxs[1]=Math.max(o.pcbBounds.maxs[1],e.z);o.layout.bounds={mins:a,maxs:r},b()}(),O()}function y(t){fetch(t).then((e=>e.json())).then((t=>{let n=e.renderData.mats,o={};o.meta=t.meta,o.forceSymmetrical=!0,o.caseType="convex",o.case=t.case,o.layout={keys:{}};let a=0;for(let e of t.keys)e.id="key"+a++,n[e.color]||p(e.color,BABYLON.Color3.FromHexString(e.color)),e.matName=e.color,o.layout.keys[e.id]=e;e.boardData=o,function(){let t=e.renderData.mats,n="keySel";t[n]||(t[n]=new BABYLON.StandardMaterial(n,e.scene),t[n].diffuseColor=new BABYLON.Color3(0,0,0),t[n].emissiveColor=new BABYLON.Color3(1,0,0),t[n].specularColor=new BABYLON.Color3(0,0,0));let o="case";t.case||(t.case=new BABYLON.PBRMetallicRoughnessMaterial(o,e.scene),t.case.metallic=1,t.case.roughness=.8,t.case.baseColor=new BABYLON.Color3(.6,.6,.6),t.case.environmentTexture=e.hdrTexture);let a="plate";t.plate||(t.plate=new BABYLON.PBRMetallicRoughnessMaterial(a,e.scene),t.plate.metallic=1,t.plate.roughness=.2,t.plate.baseColor=new BABYLON.Color3(.5,.5,.5),t.plate.environmentTexture=e.hdrTexture);let r="fr4";t.fr4||(t.fr4=new BABYLON.PBRMetallicRoughnessMaterial(r,e.scene),t.fr4.metallic=0,t.fr4.roughness=.2,t.fr4.baseColor=new BABYLON.Color3(41/255,110/255,1/255),t.fr4.environmentTexture=e.hdrTexture),p("key",new BABYLON.Color3(.9,.9,.9))}(),A(),function(){const t=e.boardData;e.camera.setTarget(new BABYLON.Vector3(t.layout.bounds.mins[0]+(t.layout.bounds.maxs[0]-t.layout.bounds.mins[0])/2,0,t.layout.bounds.mins[1]+(t.layout.bounds.maxs[1]-t.layout.bounds.mins[1])/2)),e.camera.alpha=-Math.PI/2,e.camera.beta=0,e.camera.radius=300}()}))}const N=new Intl.NumberFormat("en-US",{minimumFractionDigits:0,maximumFractionDigits:4});function Y(e){return N.format(e)}function g(t){const n=e.boardData;var o,a,r,s,i;o=function(t){const n=e.boardData,o=[];function a(...e){o.push.apply(o,e)}a('<?xml version="1.0" standalone="no"?>');let r=n.layout.bounds,s=r.maxs[0]-r.mins[0]+40,i=-r.mins[1]+r.maxs[1]+40;a(`<svg width="${Y(s)}mm" height="${Y(i)}mm" viewBox="${Y(r.mins[0]-20)} ${Y(-r.maxs[1]-20)} ${Y(s)} ${Y(i)}" xmlns="http://www.w3.org/2000/svg" version="1.1">`),a(`<title>${n.meta.name} ${t} layer</title>`),a(`<desc>The ${n.meta.name} ${t} layer</desc>`);let c=e.renderData.case.layers[t];if(c.outlines){let e='<path fill="red" fill-rule="evenodd" stroke="blue" stroke-width="1" d="';for(let t of c.outlines){let n=!1;if(t.length>1){let o=t[0];switch(o.type){case 0:e+=`M${Y(o.point.x)},${Y(-o.point.z)}`;break;case 1:let t=o.center.add(l(o.endRot-o.rotDegrees).scale(o.radius));e+=`M${Y(t.x)},${Y(-t.z)}`}for(let o=0;o<=t.length;o++){let a=t[o%t.length];switch(a.type){case 0:n||(e+="L",n=!0),e+=`${Y(a.point.x)},${Y(-a.point.z)} `;break;case 1:n=!1;let t=a.center.add(l(a.endRot).scale(a.radius));e+=`A${Y(a.radius)},${Y(a.radius)} 0 0,0 ${Y(t.x)},${Y(-t.z)} `}}}}e+='z"/>',a(e)}return a("</svg>"),o.join("\n")}(t),a=`${n.meta.name}_${t}.svg`,r="text/plain",s=document.createElement("a"),i=new Blob([o],{type:r}),s.href=URL.createObjectURL(i),s.download=a,s.click()}const k={addButton:function(e,t,n){n=n||{};var o=BABYLON.GUI.Button.CreateSimpleButton("button",e);return o.top="0px",o.left="0px",o.width=n.width?n.width:"60px",o.height=n.height?n.height:".4",o.cornerRadius=5,o.thickness=2,o.children[0].color="#DFF9FB",o.children[0].fontSize=24,o.color="#FF7979",o.background="#EB4D4B",o.onPointerClickObservable.add(t),o},addLabel:function(e){var t=new BABYLON.GUI.TextBlock;return t.width="80px",t.height=".9",t.text=e,t.color="white",t.fontSize=24,t},addKeyActionButton:function(t,n){return k.addButton(t,(function(){for(let t of e.pickedKeys){let o=e.boardData.layout.keys[t];n(o)}A()}))},modes:{key:{add:function(){let t=new BABYLON.GUI.StackPanel;t.height=".2",t.isPointerBlocker=!0,t.isVertical=!1,t.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,t.addControl(k.addLabel("Pos: ")),t.addControl(k.addKeyActionButton("◄",(e=>e.x-=.25))),t.addControl(k.addKeyActionButton("▲",(e=>e.y-=.25))),t.addControl(k.addKeyActionButton("▼",(e=>e.y+=.25))),t.addControl(k.addKeyActionButton("►",(e=>e.x+=.25))),t.addControl(k.addLabel("Rot: ")),t.addControl(k.addKeyActionButton("⤹",(e=>e.rotation_angle-=5))),t.addControl(k.addKeyActionButton("⤸",(e=>e.rotation_angle+=5))),t.addControl(k.addLabel("W: ")),t.addControl(k.addKeyActionButton("⬌",(e=>e.width+=.25))),t.addControl(k.addKeyActionButton("⬄",(e=>e.width-=.25))),t.addControl(k.addLabel("H: ")),t.addControl(k.addKeyActionButton("⬍",(e=>e.height+=.25))),t.addControl(k.addKeyActionButton("⇳",(e=>e.height-=.25))),e.screengui.addControl(t),k.activeModeCtrl=t}},case:{add:function(){let t=new BABYLON.GUI.StackPanel;t.height=".2",t.isPointerBlocker=!0,t.isVertical=!1,t.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,t.addControl(k.addLabel("Type: "));var n=function(t,n){var o=new BABYLON.GUI.RadioButton;o.width="20px",o.height="20px",o.color="white",o.background="green",o.onIsCheckedChangedObservable.add((function(n){n&&(e.boardData.caseType=t,O())}));var a=BABYLON.GUI.Control.AddHeader(o,t,"100px",{isHorizontal:!0,controlFirst:!0});a.height="30px",n.addControl(a)};let o=new BABYLON.GUI.StackPanel;o.height="1",o.width="200px",o.isVertical=!0,n("rectangle",o),n("convex",o),n("concave",o),t.addControl(o);var a=new BABYLON.GUI.Checkbox;a.width="20px",a.height="20px",a.isChecked=!1,a.color="green",a.onIsCheckedChangedObservable.add((function(t){e.boardData.forceSymmetrical=t,O()})),t.addControl(k.addLabel("SYM: ")),t.addControl(a),e.screengui.addControl(t),k.activeModeCtrl=t}},details:{add:function(){let t=new BABYLON.GUI.StackPanel;t.height=".2",t.isPointerBlocker=!0,t.isVertical=!1,t.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;let n=function(e){t.addControl(k.addButton(e,(()=>{g(e)}),{height:"60px",width:"120px"}))};n("bezel"),n("plate"),n("edge"),n("bottom"),n("pcb");let o=k.addLabel("WORK IN PROGRESS.");o.width="260px",t.addControl(o),e.screengui.addControl(t),k.activeModeCtrl=t}}},setGUIMode:function(t){k.activeModeCtrl&&e.screengui.removeControl(k.activeModeCtrl),k.modes[t]&&k.modes[t].add()},addModeGUI:function(){let t=new BABYLON.GUI.StackPanel;t.height=".1",t.isPointerBlocker=!0,t.isVertical=!1,t.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,t.addControl(k.addButton("layout",(()=>{k.setGUIMode("key")}),{height:"1",width:"120px"})),t.addControl(k.addButton("case",(()=>{k.setGUIMode("case")}),{height:"1",width:"120px"})),t.addControl(k.addButton("pcb",(()=>{k.setGUIMode("pcb")}),{height:"1",width:"120px"})),t.addControl(k.addButton("deets",(()=>{k.setGUIMode("details")}),{height:"1",width:"120px"})),k.modeCtrl=t,e.screengui.addControl(t)}};window.addEventListener("DOMContentLoaded",(function(){!function(){m(),e.screengui=BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("screenUI"),k.addModeGUI(),e.engine.runRenderLoop((function(){e.scene.render()}));let n=["testkbs/hy_nova.kle","testkbs/ansi104.kle","testkbs/fc660m.kle","testkbs/kle_atreus.kle","testkbs/basis-mono.kle","testkbs/basis-stagger-3.kle","testkbs/kle-ergodox.kle","testkbs/foggy_sp_knobs.kle","testkbs/reddit-9d-ortho.kle","testkbs/onekey.kle","testkbs/twokey.kle","testkbs/threekey.kle","testkbs/threekeyoffset.kle","testkbs/keysize_test.kle"],o=13;y(n[o]),window.addEventListener("resize",(function(){e.engine.resize()})),window.addEventListener("keydown",(a=>{"i"==a.key&&(e.scene.debugLayer.isVisible()?e.scene.debugLayer.hide():e.scene.debugLayer.show()),"k"==a.key&&(t.keyShape=t.keyShape?null:"square",A()),"c"==a.key&&(t.drawCase=!t.drawCase,A()),"p"==a.key&&(t.drawPlate=!t.drawPlate,A()),"e"==a.key&&(t.drawPCB=!t.drawPCB,A()),"b"==a.key&&(t.drawBezel=!t.drawBezel,A()),"r"==a.key&&(o=(o+1)%n.length,y(n[o]))}))}()})),window.addEventListener("click",(function(t){const n=e.scene;var o=n.pick(n.pointerX,n.pointerY);o&&o.pickedMesh&&e.boardData.layout.keys[o.pickedMesh.name]&&(t.metaKey||t.ctrlKey?e.pickedKeys.indexOf(o.pickedMesh.name)>0?e.pickedKeys.splice(e.pickedKeys.indexOf(o.pickedMesh.name),1):e.pickedKeys.push(o.pickedMesh.name):e.pickedKeys=[o.pickedMesh.name],console.log("picked key "+o.pickedMesh.name),b())}))}));
//# sourceMappingURL=pack.js.map
