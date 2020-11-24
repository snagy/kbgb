!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e={pickedKeys:[],renderData:{keys:{},case:{},mats:{},outlines:{}}},t={keyDims:[18,18],switchCutout:[14,14],base1U:[19.05,19.05],bezelGap:1.05,bezelThickness:5,bezelCornerFillet:.5,keyShape:"square",drawCase:!0,drawBezel:!0,drawPlate:!0};function o(e,t,o,n){let a=t.x*n.z-n.x*t.z;if(a<BABYLON.Epsilon)return null;let r=e.x*t.x+e.z*t.z,l=o.x*n.x+o.z*n.z;return new BABYLON.Vector3((n.z*r-t.z*l)/a,0,(t.x*l-n.x*r)/a)}function n(e,t,n,a,r){let l=r.subtract(a),s=o(e,n,a,new BABYLON.Vector3(l.z,0,-l.x).normalize());if(s){let e=s.subtract(a).lengthSquared();if(e>-BABYLON.Epsilon&&e<l.lengthSquared()-BABYLON.Epsilon)return s}return null}function a(e,t){for(let o=0;o<t.length;o++){let n=t[o],a=t[(o+1)%t.length].subtract(n).normalize(),r=new BABYLON.Vector3(a.z,0,-a.x),l=e.subtract(n).normalize();if(BABYLON.Vector3.Dot(l,r)>BABYLON.Epsilon)return!1}return!0}function r(e){let t=Math.acos(e.x);return e.z<0&&(t=2*Math.PI-t),t}function l(e,t,o){var n,a=(e.z-o.z)*(t.x-o.x),r=(e.x-o.x)*(t.z-o.z),l=a-r;if(a>0){if(r<=0)return l;n=a+r}else{if(!(a<0))return l;if(r>=0)return l;n=-(a+r)}var s=33306690738754716e-32*n;return l>=s||l<=-s?l:0}function s(e){var t=e.length;if(t<3){for(var o=new Array(t),n=0;n<t;++n)o[n]=n;return 2===t&&e[0].x===e[1].x&&e[0].z===e[1].z?[0]:o}var a=new Array(t);for(n=0;n<t;++n)a[n]=n;a.sort((function(t,o){var n=e[t].x-e[o].x;return n||e[t].z-e[o].z}));var r=[a[0],a[1]],s=[a[0],a[1]];for(n=2;n<t;++n){for(var i=a[n],d=e[i],c=r.length;c>1&&l(e[r[c-2]],e[r[c-1]],d)<=0;)c-=1,r.pop();for(r.push(i),c=s.length;c>1&&l(e[s[c-2]],e[s[c-1]],d)>=0;)c-=1,s.pop();s.push(i)}o=new Array(s.length+r.length-2);for(var u=0,B=(n=0,r.length);n<B;++n)o[u++]=r[n];for(var h=s.length-2;h>0;--h)o[u++]=s[h];let b=[];for(const t of o)b.unshift(e[t]);return b}function i(e,t,n,a,l){let s=[];l||(l=4);for(let a=0;a<e.length;a++){let d=e[a],c=e[(a+1)%e.length],u=e[(a-1+e.length)%e.length],B=c.subtract(d).normalize(),h=d.subtract(u).normalize(),b=new BABYLON.Vector3(B.z,0,-B.x),p=new BABYLON.Vector3(h.z,0,-h.x),f=d.add(p.scale(t)),m=d.add(b.scale(t)),L=o(f,p,m,b);if(null!==L)if(n){let e=n,t=o(f.add(p.scale(-e)),p,m.add(b.scale(-e)),b),a=r(p),d=r(b);d<a&&(d+=2*Math.PI);let c=(d-a)/l;for(let o=0;o<=l;o++)s.push(t.add((i=a+c*o,new BABYLON.Vector3(Math.cos(i),0,Math.sin(i))).scale(e)))}else s.push(L);else s.push(f),s.push(m)}var i;return a&&s.push(s[0]),s}function d(t,o){let n=e.renderData.mats;n[t]=new BABYLON.PBRMetallicRoughnessMaterial(t,e.scene),n[t].metallic=0,n[t].roughness=.6,n[t].baseColor=o,n[t].environmentTexture=e.hdrTexture}function c(){e.canvas=document.getElementById("renderCanvas"),e.engine=new BABYLON.Engine(e.canvas,!0),e.scene=function(){const t=e.engine;var o=new BABYLON.Scene(t),n=new BABYLON.ArcRotateCamera("Camera",-Math.PI/2,0,10,new BABYLON.Vector3(0,0,0),o);return n.setTarget(BABYLON.Vector3.Zero()),n.attachControl(e.canvas,!1),e.camera=n,e.hdrTexture=BABYLON.CubeTexture.CreateFromPrefilteredData("assets/environment.dds",o),e.currentSkybox=o.createDefaultSkybox(e.hdrTexture,!0,(o.activeCamera.maxZ-o.activeCamera.minZ)/2,.3),o}()}function u(){let t=e.renderData.keys,o=e.renderData.outlines,n=e.renderData.mats;for(const[t,n]of Object.entries(o))e.scene.removeMesh(n);for(const a of e.pickedKeys)if(t[a]){let r=t[a];o[a]=BABYLON.MeshBuilder.CreateRibbon(a+"outline",{pathArray:[i(r.outline,.1,.1,!0),i(r.outline,.5,.5,!0)]},e.scene),o[a].material=n.keySel,o[a].translate(new BABYLON.Vector3(0,10.5,0),1,BABYLON.Space.LOCAL)}else console.log("picked nonexistant key")}function B(e){for(const t of e){t.outlineLines=[],"key57"==t.id&&console.log("found it"),t.parsedOutlineLines={};for(let e=0;e<t.bezelHole.length;e++){let o=t.bezelHole[e],n=t.bezelHole[(e+1)%t.bezelHole.length];t.outlineLines.push([o,n])}for(const[e,o]of Object.entries(t.overlappingKeys))for(let e=t.outlineLines.length-1;e>=0;e--){let r=t.outlineLines[e],l=r[1].subtract(r[0]),s=new BABYLON.Vector3(l.z,0,-l.x).normalize(),i=a(r[0],o.bezelHole),d=a(r[1],o.bezelHole);if(i){d&&t.outlineLines.splice(e,1);let a=1e5,l=null;for(let e=0;e<o.bezelHole.length;e++){let t=n(r[0],0,s,o.bezelHole[e],o.bezelHole[(e+1)%o.bezelHole.length]);if(t){let e=t.subtract(r[0]).lengthSquared();e>BABYLON.Epsilon&&e<a&&(a=e,l=t)}}l&&(r[0]=l)}else if(d){let e=r[0].subtract(r[1]),t=new BABYLON.Vector3(e.z,0,-e.x).normalize(),a=1e5,l=null;for(let e=0;e<o.bezelHole.length;e++){let s=n(r[1],0,t,o.bezelHole[e],o.bezelHole[(e+1)%o.bezelHole.length]);if(s){let e=s.subtract(r[1]).lengthSquared();e>BABYLON.Epsilon&&e<a&&(a=e,l=s)}}l&&(r[1]=l)}}}let t=null,o=-1,r=!1;for(const n of e){for(let e=0;e<n.outlineLines.length;e++)if(!n.parsedOutlineLines[e]){t=n,o=e;break}if(o>=0)break}let l=[];for(;null!=t&&o>=0;){"key57"==t.id&&console.log("found it"),t.parsedOutlineLines[o]=!0;let e=t.outlineLines[o];if(r){let t=e[0];e[0]=e[1],e[1]=t}console.log(`key rd ${t.id} line idx ${o} s ${e[0]} e ${e[1]}`),l.push(e[0]),o=-1;let n=1e6,a=(a,l,s)=>{let i=e[1].subtract(a[0]).lengthSquared();i<n&&(n=i,t=l,o=s,r=!1),i=e[1].subtract(a[1]).lengthSquared(),i<n&&(n=i,t=l,o=s,r=!0)};for(let e=0;e<t.outlineLines.length;e++)t.parsedOutlineLines[e]||a(t.outlineLines[e],t,e);for(const[e,o]of Object.entries(t.overlappingKeys))for(let e=0;e<o.outlineLines.length;e++)o.parsedOutlineLines[e]||a(o.outlineLines[e],o,e)}return l}function h(){const o=e.scene,n=e.boardData,a=e.renderData.keys,r=e.renderData.mats;if("convex"==n.caseType){let e=[];for(let[t,o]of Object.entries(a))for(let t of o.outline)e.push(t);if(n.outline=s(e),n.forceSymmetrical){let t=.5*(n.layout.bounds.maxs[0]-n.layout.bounds.mins[0])+n.layout.bounds.mins[0];for(let o of n.outline)e.push(new BABYLON.Vector3(t-(o.x-t),o.y,o.z));n.outline=s(e)}}else{let e=n.layout.bounds;n.outline=[new BABYLON.Vector3(e.mins[0],0,e.mins[1]),new BABYLON.Vector3(e.maxs[0],0,e.mins[1]),new BABYLON.Vector3(e.maxs[0],0,e.maxs[1]),new BABYLON.Vector3(e.mins[0],0,e.maxs[1])]}let l=e.renderData.case,d=[i(n.outline,t.bezelGap,t.bezelCornerFillet,!1)],c=i(n.outline,t.bezelGap+t.bezelThickness,t.bezelThickness,!1,8);l.edge&&o.removeMesh(l.edge),t.drawCase&&(l.edge=BABYLON.MeshBuilder.CreatePolygon("edge",{shape:c,depth:9,holes:d,updatable:!0},o),l.edge.translate(new BABYLON.Vector3(0,-1.5,0),1,BABYLON.Space.LOCAL),l.edge.material=r.case),l.bottom&&o.removeMesh(l.bottom),t.drawCase&&(l.bottom=BABYLON.MeshBuilder.CreatePolygon("bottom",{shape:c,depth:3,updatable:!0},o),l.bottom.translate(new BABYLON.Vector3(0,-10.5,0),1,BABYLON.Space.LOCAL),l.bottom.material=r.case);let u={},h=[];for(const[e,t]of Object.entries(a))u[t.keyGroupId]||(u[t.keyGroupId]=[]),u[t.keyGroupId].push(t);for(const[e,o]of Object.entries(u)){let e=B(o);h.push(i(e,0,t.bezelCornerFillet,!1))}l.bezel&&o.removeMesh(l.bezel),t.drawBezel&&(l.bezel=BABYLON.MeshBuilder.CreatePolygon("bezel",{shape:c,depth:7.5,holes:h},o),l.bezel.translate(new BABYLON.Vector3(0,7.5,0),1,BABYLON.Space.LOCAL),l.bezel.material=r.case),l.plate&&o.removeMesh(l.plate);let b=[];for(const[e,t]of Object.entries(a))b.push(t.switchCut);t.drawPlate&&(l.plate=BABYLON.MeshBuilder.CreatePolygon("plate",{shape:c,depth:1.5,holes:b},o),l.plate.material=r.plate)}function b(){!function(){const o=e.scene,n=e.boardData;let a=[1e5,1e5],r=[-1e5,-1e5],l=[],s=e.renderData.keys;for(const[e,t]of Object.entries(s))t.keycap&&o.removeMesh(t.keycap);s=e.renderData.keys=[];let i=0;for(const[d,c]of Object.entries(n.layout.keys)){s[d]||(s[d]={keyGroupId:null,id:d,mins:[1e5,1e5],maxs:[-1e5,-1e5],bezelMins:[1e5,1e5],bezelMaxs:[-1e5,-1e5],overlappingKeys:{}});let u=s[d],B=[(t.keyDims[0]+t.base1U[0]*(c.width-1))/2,(t.keyDims[1]+t.base1U[1]*(c.height-1))/2],h=[c.x*t.base1U[0]+B[0],-(c.y*t.base1U[1]+B[1])],b=(new BABYLON.Vector3(h[0],0,h[1]),BABYLON.Matrix.Identity());b=b.multiply(BABYLON.Matrix.Translation(h[0],0,h[1])),0!=c.rotation_angle&&(b=b.multiply(BABYLON.Matrix.Translation(-c.rotation_x*t.base1U[0],0,c.rotation_y*t.base1U[1])),b=b.multiply(BABYLON.Matrix.RotationY(c.rotation_angle*Math.PI/180)),b=b.multiply(BABYLON.Matrix.Translation(c.rotation_x*t.base1U[0],0,-c.rotation_y*t.base1U[1]))),u.outline=[BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-B[0],0,-B[1]),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(B[0],0,-B[1]),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(B[0],0,B[1]),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-B[0],0,B[1]),b)];let p=[.5*t.switchCutout[0],.5*t.switchCutout[1]];u.switchCut=[BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-p[0],0,-p[1]),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(p[0],0,-p[1]),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(p[0],0,p[1]),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-p[0],0,p[1]),b)],u.keycap&&o.removeMesh(u.keycap),t.keyShape&&(u.keycap=BABYLON.MeshBuilder.CreatePolygon(d,{shape:u.outline,depth:7,updatable:!1},o),u.keycap.translate(new BABYLON.Vector3(0,10.5,0),1,BABYLON.Space.LOCAL),c.matName&&e.renderData.mats[c.matName]&&(u.keycap.material=e.renderData.mats[c.matName])),u.bezelHole=[BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-B[0]-t.bezelGap,0,-B[1]-t.bezelGap),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(B[0]+t.bezelGap,0,-B[1]-t.bezelGap),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(B[0]+t.bezelGap,0,B[1]+t.bezelGap),b),BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-B[0]-t.bezelGap,0,B[1]+t.bezelGap),b)],l.push(u.bezelHole);for(let e of u.bezelHole)u.bezelMins[0]=Math.min(u.bezelMins[0],e.x),u.bezelMaxs[0]=Math.max(u.bezelMaxs[0],e.x),u.bezelMins[1]=Math.min(u.bezelMins[1],e.z),u.bezelMaxs[1]=Math.max(u.bezelMaxs[1],e.z);for(let e of u.outline)u.mins[0]=Math.min(u.mins[0],e.x),u.maxs[0]=Math.max(u.maxs[0],e.x),u.mins[1]=Math.min(u.mins[1],e.z),u.maxs[1]=Math.max(u.maxs[1],e.z);a[0]=Math.min(u.mins[0],a[0]),r[0]=Math.max(u.maxs[0],r[0]),a[1]=Math.min(u.mins[1],a[1]),r[1]=Math.max(u.maxs[1],r[1]);let f=function(e,t,o,n){if(t.bezelMins[0]+BABYLON.Epsilon>n.bezelMaxs[0]||n.bezelMins[0]+BABYLON.Epsilon>t.bezelMaxs[0]||t.bezelMins[1]+BABYLON.Epsilon>n.bezelMaxs[1]||n.bezelMins[1]+BABYLON.Epsilon>t.bezelMaxs[1])return!1;let a=(e,t)=>{for(let o=0;o<e.bezelHole.length;o++){let n=e.bezelHole[(o+1)%e.bezelHole.length].subtract(e.bezelHole[o]),a=!0,r=!0;for(let l=0;l<t.bezelHole.length;l++){let s=BABYLON.Vector3.Dot(n,t.bezelHole[l].subtract(e.bezelHole[o]));r&=s>-BABYLON.Epsilon,a&=s<BABYLON.Epsilon}if(r||a)return!0}return!1},r=a(t,n);if(r||(r=a(n,t)),r)if(t.overlappingKeys[n.id]=n,n.overlappingKeys[t.id]=t,t.keyGroupId&&n.keyGroupId){let e=t.keyGroupId,o=n.keyGroupId;for(const[t,n]of Object.entries(s))n.keyGroupId==o&&(n.keyGroupId=e)}else t.keyGroupId?n.keyGroupId=t.keyGroupId:n.keyGroupId?t.keyGroupId=n.keyGroupId:t.keyGroupId=n.keyGroupId=i++};for(const[e,t]of Object.entries(s))e!=d&&f(c,u,n.layout.keys[e],t);u.keyGroupId||(u.keyGroupId=i++)}n.layout.bounds={mins:a,maxs:r},u()}(),h()}function p(t){fetch(t).then((e=>e.json())).then((t=>{let o=e.renderData.mats,n={};n.meta=t.meta,n.forceSymmetrical=!0,n.caseType="convex",n.case=t.case,n.layout={keys:{}};let a=0;for(let e of t.keys)e.id="key"+a++,o[e.color]||d(e.color,BABYLON.Color3.FromHexString(e.color)),e.matName=e.color,n.layout.keys[e.id]=e;e.boardData=n,function(){let t=e.renderData.mats,o="keySel";t[o]=new BABYLON.StandardMaterial(o,e.scene),t[o].diffuseColor=new BABYLON.Color3(0,0,0),t[o].emissiveColor=new BABYLON.Color3(1,0,0),t[o].specularColor=new BABYLON.Color3(0,0,0);let n="case";t.case=new BABYLON.PBRMetallicRoughnessMaterial(n,e.scene),t.case.metallic=1,t.case.roughness=.8,t.case.baseColor=new BABYLON.Color3(.6,.6,.6),t.case.environmentTexture=e.hdrTexture;let a="plate";t.plate=new BABYLON.PBRMetallicRoughnessMaterial(a,e.scene),t.plate.metallic=1,t.plate.roughness=.2,t.plate.baseColor=new BABYLON.Color3(.5,.5,.5),t.plate.environmentTexture=e.hdrTexture,d("key",new BABYLON.Color3(.9,.9,.9))}(),b(),function(){const t=e.boardData;e.camera.setTarget(new BABYLON.Vector3(t.layout.bounds.mins[0]+(t.layout.bounds.maxs[0]-t.layout.bounds.mins[0])/2,0,t.layout.bounds.mins[1]+(t.layout.bounds.maxs[1]-t.layout.bounds.mins[1])/2)),e.camera.alpha=-Math.PI/2,e.camera.beta=0,e.camera.radius=300}()}))}const f={addButton:function(e,t,o){o=o||{};var n=BABYLON.GUI.Button.CreateSimpleButton("button",e);return n.top="0px",n.left="0px",n.width=o.width?o.width:"60px",n.height=o.height?o.height:".4",n.cornerRadius=5,n.thickness=2,n.children[0].color="#DFF9FB",n.children[0].fontSize=24,n.color="#FF7979",n.background="#EB4D4B",n.onPointerClickObservable.add(t),n},addLabel:function(e){var t=new BABYLON.GUI.TextBlock;return t.width="80px",t.height=".9",t.text=e,t.color="white",t.fontSize=24,t},addKeyActionButton:function(t,o){return f.addButton(t,(function(){for(let t of e.pickedKeys){let n=e.boardData.layout.keys[t];o(n)}b()}))},modes:{key:{add:function(){let t=new BABYLON.GUI.StackPanel;t.height=".2",t.isPointerBlocker=!0,t.isVertical=!1,t.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,t.addControl(f.addLabel("Pos: ")),t.addControl(f.addKeyActionButton("◄",(e=>e.x-=.25))),t.addControl(f.addKeyActionButton("▲",(e=>e.y-=.25))),t.addControl(f.addKeyActionButton("▼",(e=>e.y+=.25))),t.addControl(f.addKeyActionButton("►",(e=>e.x+=.25))),t.addControl(f.addLabel("Rot: ")),t.addControl(f.addKeyActionButton("⤹",(e=>e.rotation_angle-=5))),t.addControl(f.addKeyActionButton("⤸",(e=>e.rotation_angle+=5))),t.addControl(f.addLabel("W: ")),t.addControl(f.addKeyActionButton("⬌",(e=>e.width+=.25))),t.addControl(f.addKeyActionButton("⬄",(e=>e.width-=.25))),t.addControl(f.addLabel("H: ")),t.addControl(f.addKeyActionButton("⬍",(e=>e.height+=.25))),t.addControl(f.addKeyActionButton("⇳",(e=>e.height-=.25))),e.screengui.addControl(t),f.activeModeCtrl=t}},case:{add:function(){let t=new BABYLON.GUI.StackPanel;t.height=".2",t.isPointerBlocker=!0,t.isVertical=!1,t.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,t.addControl(f.addLabel("Type: "));var o=function(t,o){var n=new BABYLON.GUI.RadioButton;n.width="20px",n.height="20px",n.color="white",n.background="green",n.onIsCheckedChangedObservable.add((function(o){o&&(e.boardData.caseType=t,h())}));var a=BABYLON.GUI.Control.AddHeader(n,t,"100px",{isHorizontal:!0,controlFirst:!0});a.height="30px",o.addControl(a)};let n=new BABYLON.GUI.StackPanel;n.height="1",n.width="200px",n.isVertical=!0,o("rectangle",n),o("convex",n),o("concave",n),t.addControl(n);var a=new BABYLON.GUI.Checkbox;a.width="20px",a.height="20px",a.isChecked=!1,a.color="green",a.onIsCheckedChangedObservable.add((function(t){e.boardData.forceSymmetrical=t,h()})),t.addControl(f.addLabel("SYM: ")),t.addControl(a),e.screengui.addControl(t),f.activeModeCtrl=t}},details:{add:function(){let t=new BABYLON.GUI.StackPanel;t.height=".2",t.isPointerBlocker=!0,t.isVertical=!1,t.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;let o=f.addLabel("WORK IN PROGRESS.  Press 'r' to cycle keyboards, press 'k', 'b', 'p' and 'c' to toggle rendering of stuff");o.width="1200px",t.addControl(o),e.screengui.addControl(t),f.activeModeCtrl=t}}},setGUIMode:function(t){f.activeModeCtrl&&e.screengui.removeControl(f.activeModeCtrl),f.modes[t]&&f.modes[t].add()},addModeGUI:function(){let t=new BABYLON.GUI.StackPanel;t.height=".1",t.isPointerBlocker=!0,t.isVertical=!1,t.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,t.addControl(f.addButton("layout",(()=>{f.setGUIMode("key")}),{height:"1",width:"120px"})),t.addControl(f.addButton("case",(()=>{f.setGUIMode("case")}),{height:"1",width:"120px"})),t.addControl(f.addButton("pcb",(()=>{f.setGUIMode("pcb")}),{height:"1",width:"120px"})),t.addControl(f.addButton("deets",(()=>{f.setGUIMode("details")}),{height:"1",width:"120px"})),f.modeCtrl=t,e.screengui.addControl(t)}};window.addEventListener("DOMContentLoaded",(function(){!function(){c(),e.screengui=BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("screenUI"),f.addModeGUI(),e.engine.runRenderLoop((function(){e.scene.render()}));let o=["testkbs/hy_nova.kle","testkbs/ansi104.kle","testkbs/fc660m.kle","testkbs/kle_atreus.kle","testkbs/basis-mono.kle","testkbs/basis-stagger-3.kle","testkbs/kle-ergodox.kle","testkbs/foggy_sp_knobs.kle","testkbs/reddit-9d-ortho.kle","testkbs/onekey.kle","testkbs/twokey.kle","testkbs/threekey.kle","testkbs/threekeyoffset.kle"],n=4;p(o[n]),window.addEventListener("resize",(function(){e.engine.resize()})),window.addEventListener("keydown",(a=>{"i"==a.key&&(e.scene.debugLayer.isVisible()?e.scene.debugLayer.hide():e.scene.debugLayer.show()),"k"==a.key&&(t.keyShape=t.keyShape?null:"square",b()),"c"==a.key&&(t.drawCase=!t.drawCase,b()),"p"==a.key&&(t.drawPlate=!t.drawPlate,b()),"b"==a.key&&(t.drawBezel=!t.drawBezel,b()),"r"==a.key&&(n=(n+1)%o.length,p(o[n]))}))}()})),window.addEventListener("click",(function(t){const o=e.scene;var n=o.pick(o.pointerX,o.pointerY);n&&n.pickedMesh&&e.boardData.layout.keys[n.pickedMesh.name]&&(t.metaKey||t.ctrlKey?e.pickedKeys.indexOf(n.pickedMesh.name)>0?e.pickedKeys.splice(e.pickedKeys.indexOf(n.pickedMesh.name),1):e.pickedKeys.push(n.pickedMesh.name):e.pickedKeys=[n.pickedMesh.name],console.log("picked key "+n.pickedMesh.name),u())}))}));
//# sourceMappingURL=pack.js.map
