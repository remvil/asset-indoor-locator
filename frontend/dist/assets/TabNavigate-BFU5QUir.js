import{m as D,_ as ue,l as _e,p as fe,O as pe,n as de,q as me,d as ge,r as l,s as ve,t as x,v as ye,c as V,w as o,u as s,x as z,y as r,o as M,b as e,z as he,A as q,g as be,I as Ce,e as Pe,B as we,f as Oe,h as E,C as Se,D as ke,E as Ae,F as je,j as Fe,k as xe}from"./index-DZXn8A86.js";import{p as Ee,_ as Ge}from"./_plugin-vue_export-helper-BVrt1EiH.js";var Ie=Array.isArray;function Ne(a,n){return Ie(n)?a.apply(void 0,ue([],_e(n))):a(n)}function Te(a){return D(function(n){return Ne(a,n)})}var Be=Array.isArray,Je=Object.getPrototypeOf,ze=Object.prototype,Me=Object.keys;function Re(a){if(a.length===1){var n=a[0];if(Be(n))return{args:n,keys:null};if(Ve(n)){var u=Me(n);return{args:u.map(function(_){return n[_]}),keys:u}}}return{args:a,keys:null}}function Ve(a){return a&&typeof a=="object"&&Je(a)===ze}function qe(a,n){return a.reduce(function(u,_,f){return u[_]=n[f],u},{})}function De(){for(var a=[],n=0;n<arguments.length;n++)a[n]=arguments[n];var u=fe(a),_=Re(a),f=_.args,g=_.keys,S=new pe(function(p){var d=f.length;if(!d){p.complete();return}for(var C=new Array(d),k=d,P=d,G=function(O){var v=!1;de(f[O]).subscribe(me(p,function(I){v||(v=!0,P--),C[O]=I},function(){return k--},void 0,function(){(!k||!v)&&(P||p.next(g?qe(g,C):C),p.complete())}))},w=0;w<d;w++)G(w)});return u?S.pipe(Te(u)):S}const Ze={key:0,class:"loader"},$e={class:"btn-map btn-layers",id:"open-action-sheet"},Le={class:"overlay-content"},We=ge({__name:"TabNavigate",setup(a){const n=l("EPSG:3857"),u=l(22),_=l(0),f=l([166676263257e-5,495602694507e-5]),g=l(f.value),S=l([166676327053e-5,495602430346e-5]),p=l(S.value),d=l(u.value),C=l(_.value),k=l(0),P=l(),G=t=>{console.log("geoLocChange: ",t)},w=()=>{var t;(t=P.value)==null||t.setCenter(p.value)},O=l([]),v=l([]),I=l([]),Z=z("ol-format"),y=new Z.GeoJSON,$={"stroke-width":2,"stroke-color":"rgba(100,100,100,0.4)","fill-color":"#F3EFF5CC"},L=l(!0);ve(async()=>{try{De({planimetria:x("map/planimetry/battipaglia/4"),assets:x("map/assets/battipaglia"),path:x("path/battipaglia/4"),shortestPath:x("map/shortestpath/demo")}).pipe(D(({planimetria:t,assets:c,path:i,shortestPath:h})=>{const N=y.readFeatures(t,{featureProjection:"EPSG:3857"}),b=y.readFeatures(c,{featureProjection:"EPSG:3857"}),T=y.readFeatures(i,{featureProjection:"EPSG:3857"}),m=h.features[0].geometry.coordinates;return{planimetriaGeoJSON:N,assetsGeoJSON:b,pathGeoJSON:T,shortestPathArray:m}}),ye(t=>{throw console.error("Error in RxJS pipeline:",t),t})).subscribe({next:({planimetriaGeoJSON:t,assetsGeoJSON:c,pathGeoJSON:i,shortestPathArray:h})=>{O.value=t,v.value=c,I.value=i,W(h)},error:t=>{console.error("Error while fetching API Service:",t)}})}catch(t){console.error("Error while requesting API Service: ",t)}});function W(t){const c=[];return t.forEach(i=>{c.push(Ee("EPSG:4326","EPSG:3857",i))}),c}const H=z("ol-extent"),R=l([]),A=l(""),K=z("ol-selectconditions").pointerMove,Q=t=>{if(t.selected.length==1){const c=t.selected[0];R.value=H.getCenter(t.selected[0].getGeometry().extent_),A.value=c.get("name")}else A.value=""},U=t=>t.values_.name!=null;function X(t){k.value=t.target.getResolution(),d.value=t.target.getZoom()}function Y(t){g.value=t.target.getCenter();const c=50,i=t.target.getCenter();Math.sqrt(Math.pow(i[0]-f.value[0],2)+Math.pow(i[1]-f.value[1],2))>c?t.target.setCenter(g.value):g.value=p.value}function ee(t){C.value=t.target.getRotation()}const te=[{text:"Floor 1",data:{action:"cancel"}},{text:"Floor 2",role:"destructive",data:{act:"cancel"}},{text:"Floor 3",data:{action:"cancel"}},{text:"Floor 4",data:{action:"cancel"}},{text:"Cancel",role:"cancel",data:{action:"cancel"}}];return(t,c)=>{const i=r("ion-icon"),h=r("ol-view"),N=r("ol-tile-layer"),b=r("ol-source-vector"),T=r("ol-webgl-vector-layer"),m=r("ol-style-stroke"),j=r("ol-style"),B=r("ol-vector-layer"),F=r("ol-style-fill"),J=r("ol-style-circle"),oe=r("ol-interaction-select"),ne=r("ol-overlay"),ae=r("ol-interaction-link"),re=r("ol-geom-point"),le=r("ol-feature"),ce=r("ol-geolocation"),se=r("ol-layer-group"),ie=r("ol-map");return M(),V(s(xe),null,{default:o(()=>[e(s(Fe),{fullscreen:!0},{default:o(()=>[L.value?(M(),he("div",Ze)):q("",!0),e(s(be),null,{default:o(()=>[e(s(Ce),null,{default:o(()=>[e(s(Pe),{size:"large"},{default:o(()=>[e(i,{"aria-hidden":"true",icon:s(we)},null,8,["icon"]),Oe("    Floor 4 ")]),_:1})]),_:1})]),_:1}),e(ie,{class:"map-container",style:{height:"90vh"},loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0},{default:o(()=>[e(h,{ref_key:"view",ref:P,center:p.value,rotation:_.value,zoom:u.value,minZoom:18,projection:n.value,"onChange:center":Y,"onChange:resolution":X,"onChange:rotation":ee},null,8,["center","rotation","zoom","projection"]),E("button",{class:"btn-map btn-locate",type:"button",onClick:c[0]||(c[0]=Ke=>w())},[e(i,{"aria-hidden":"true",icon:s(Se)},null,8,["icon"])]),E("button",$e,[e(i,{"aria-hidden":"true",icon:s(ke)},null,8,["icon"])]),e(se,{opacity:1},{default:o(()=>[e(N),e(T,{styles:[$]},{default:o(()=>[e(b,{format:s(y),crossOrigin:"anonymous",url:"geojson/battipagliabbox.geojson"},null,8,["format"])]),_:1},8,["styles"]),e(B,null,{default:o(()=>[e(b,{format:s(y),crossOrigin:"anonymous",features:O.value},null,8,["format","features"]),e(j,null,{default:o(()=>[e(m,{color:"rgba(5, 6, 34, 0.5)",width:"1",dash:"true"})]),_:1})]),_:1}),e(oe,{onSelect:Q,condition:s(K),filter:U},{default:o(()=>[e(j,null,{default:o(()=>[e(m,{color:"blue",width:6}),e(F,{color:"rgba(255,255,255,0.2)"}),e(J,{radius:14},{default:o(()=>[e(F,{color:"#3333ffff"}),e(m,{color:"#3333ff55",width:"8"})]),_:1})]),_:1})]),_:1},8,["condition"]),e(B,null,{default:o(()=>[e(b,{format:s(y),crossOrigin:"anonymous",features:v.value,projection:n.value},null,8,["format","features","projection"]),e(j,null,{default:o(()=>[e(J,{radius:6},{default:o(()=>[e(F,{color:"#3333ffff"}),e(m,{color:"#3333ff99",width:"20"})]),_:1})]),_:1})]),_:1}),A.value!=""?(M(),V(ne,{key:0,position:R.value},{default:o(()=>[E("div",Le,Ae(A.value),1)]),_:1},8,["position"])):q("",!0),e(ae),e(ce,{projection:n.value,"onChange:fakePosition":G},{default:o(()=>[E("template",null,[e(B,{zIndex:2},{default:o(()=>[e(b,null,{default:o(()=>[e(le,{ref:"positionFeature"},{default:o(()=>[e(re,{coordinates:f.value},null,8,["coordinates"]),e(j,null,{default:o(()=>[e(J,{radius:6,color:"none"},{default:o(()=>[e(F,{color:"#c11111"}),e(m,{color:"#c1111199",width:"8"})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})])]),_:1},8,["projection"])]),_:1})]),_:1}),e(s(je),{trigger:"open-action-sheet",header:"Actions",buttons:te})]),_:1})]),_:1})}}}),Xe=Ge(We,[["__scopeId","data-v-e768e38d"]]);export{Xe as default};
