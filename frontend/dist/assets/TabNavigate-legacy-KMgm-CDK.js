System.register(["./index-legacy-BKXjHxm1.js","./_plugin-vue_export-helper-legacy-DiXWvjWf.js"],(function(e,t){"use strict";var o,a,n,r,l,i,c,u,d,s,f,p,v,g,h,b,m,y,x,_,k,w,j,S,C,P,E,F,O,A,G,z,J,N,I;return{setters:[e=>{o=e.m,a=e._,n=e.l,r=e.p,l=e.O,i=e.n,c=e.q,u=e.d,d=e.r,s=e.s,f=e.t,p=e.v,v=e.c,g=e.w,h=e.u,b=e.x,m=e.y,y=e.o,x=e.b,_=e.z,k=e.A,w=e.g,j=e.I,S=e.e,C=e.B,P=e.f,E=e.h,F=e.C,O=e.D,A=e.E,G=e.F,z=e.j,J=e.k},e=>{N=e.p,I=e._}],execute:function(){var t=document.createElement("style");t.textContent='ion-content[data-v-e768e38d] ion-title[data-v-e768e38d]{font-size:medium;padding:8px}ion-content[data-v-e768e38d] ion-toolbar[data-v-e768e38d]{--background: #A22222;--color: #FEFAE0}ion-content[data-v-e768e38d] ion-toolbar[data-v-e768e38d] --toolbar-content[data-v-e768e38d]{--background: grey;align-items:center}ion-content[data-v-e768e38d] ul[data-v-e768e38d]{font-weight:600;font-size:12px;padding-left:1rem}ion-content[data-v-e768e38d] ul[data-v-e768e38d] li[data-v-e768e38d]{list-style-type:none}ion-content[data-v-e768e38d] .ol-map[data-v-e768e38d]{position:relative;background:repeating-linear-gradient(45deg,#fafffa,snow 6px,#fff 6px,#fff 12px)}ion-content[data-v-e768e38d] .btn-map[data-v-e768e38d]{position:absolute;z-index:9;background:var(--ol-background-color);border-radius:3px;border:1px solid lightgray;width:35px;height:35px;font-size:1.5rem;padding:.24rem}ion-content[data-v-e768e38d] .btn-map[data-v-e768e38d] ion-icon[data-v-e768e38d]{color:var(--ol-subtle-foreground-color)}ion-content[data-v-e768e38d] .btn-locate[data-v-e768e38d]{left:8px;bottom:70px}ion-content[data-v-e768e38d] .btn-layers[data-v-e768e38d]{right:8px;top:6px}ion-content[data-v-e768e38d] .ol-map-loading[data-v-e768e38d]:after{content:"";box-sizing:border-box;position:absolute;top:50%;left:50%;width:80px;height:80px;margin-top:-40px;margin-left:-40px;border-radius:50%;border:5px solid rgba(180,180,180,.6);border-top-color:var(--vp-c-brand-1);animation:spinner-e768e38d .6s linear infinite}ion-content[data-v-e768e38d] .overlay-content[data-v-e768e38d]{background:#fff;background-color:#fff;border:1px solid #00000044;border-radius:3px;box-shadow:0 0 5px rgba(0,0,0,.3);padding:10px;color:gray}@keyframes spinner-e768e38d{to{transform:rotate(360deg)}}\n',document.head.appendChild(t);var M=Array.isArray;function q(e){return o((function(t){return function(e,t){return M(t)?e.apply(void 0,a([],n(t))):e(t)}(e,t)}))}var R=Array.isArray,T=Object.getPrototypeOf,W=Object.prototype,Z=Object.keys;function B(e){if(1===e.length){var t=e[0];if(R(t))return{args:t,keys:null};if((a=t)&&"object"==typeof a&&T(a)===W){var o=Z(t);return{args:o.map((function(e){return t[e]})),keys:o}}}var a;return{args:e,keys:null}}const D={key:0,class:"loader"},L={class:"btn-map btn-layers",id:"open-action-sheet"},H={class:"overlay-content"},K=u({__name:"TabNavigate",setup(e){const t=d("EPSG:3857"),a=d(22),n=d(0),u=d([1666762.63257,4956026.94507]),I=d(u.value),M=d([1666763.27053,4956024.30346]),R=d(M.value),T=d(a.value),W=d(n.value),Z=d(0),K=d(),Q=e=>{console.log("geoLocChange: ",e)},U=d([]),V=d([]),X=d([]),Y=new(b("ol-format").GeoJSON),$={"stroke-width":2,"stroke-color":"rgba(100,100,100,0.4)","fill-color":"#F3EFF5CC"},ee=d(!0);s((async()=>{try{(function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o=r(e),a=B(e),n=a.args,u=a.keys,d=new l((function(e){var t=n.length;if(t)for(var o=new Array(t),a=t,r=t,l=function(t){var l=!1;i(n[t]).subscribe(c(e,(function(e){l||(l=!0,r--),o[t]=e}),(function(){return a--}),void 0,(function(){a&&l||(r||e.next(u?function(e,t){return e.reduce((function(e,o,a){return e[o]=t[a],e}),{})}(u,o):o),e.complete())})))},d=0;d<t;d++)l(d);else e.complete()}));return o?d.pipe(q(o)):d})({planimetria:f("map/planimetry/battipaglia/4"),assets:f("map/assets/battipaglia"),path:f("path/battipaglia/4"),shortestPath:f("map/shortestpath/demo")}).pipe(o((({planimetria:e,assets:t,path:o,shortestPath:a})=>({planimetriaGeoJSON:Y.readFeatures(e,{featureProjection:"EPSG:3857"}),assetsGeoJSON:Y.readFeatures(t,{featureProjection:"EPSG:3857"}),pathGeoJSON:Y.readFeatures(o,{featureProjection:"EPSG:3857"}),shortestPathArray:a.features[0].geometry.coordinates}))),p((e=>{throw console.error("Error in RxJS pipeline:",e),e}))).subscribe({next:({planimetriaGeoJSON:e,assetsGeoJSON:t,pathGeoJSON:o,shortestPathArray:a})=>{U.value=e,V.value=t,X.value=o,function(e){const t=[];e.forEach((e=>{t.push(N("EPSG:4326","EPSG:3857",e))}))}(a)},error:e=>{console.error("Error while fetching API Service:",e)}})}catch(e){console.error("Error while requesting API Service: ",e)}}));const te=b("ol-extent"),oe=d([]),ae=d(""),ne=b("ol-selectconditions").pointerMove,re=e=>{if(1==e.selected.length){const t=e.selected[0];oe.value=te.getCenter(e.selected[0].getGeometry().extent_),ae.value=t.get("name")}else ae.value=""},le=e=>null!=e.values_.name;function ie(e){Z.value=e.target.getResolution(),T.value=e.target.getZoom()}function ce(e){I.value=e.target.getCenter();const t=e.target.getCenter();Math.sqrt(Math.pow(t[0]-u.value[0],2)+Math.pow(t[1]-u.value[1],2))>50?e.target.setCenter(I.value):I.value=R.value}function ue(e){W.value=e.target.getRotation()}const de=[{text:"Floor 1",data:{action:"cancel"}},{text:"Floor 2",role:"destructive",data:{act:"cancel"}},{text:"Floor 3",data:{action:"cancel"}},{text:"Floor 4",data:{action:"cancel"}},{text:"Cancel",role:"cancel",data:{action:"cancel"}}];return(e,o)=>{const r=m("ion-icon"),l=m("ol-view"),i=m("ol-tile-layer"),c=m("ol-source-vector"),d=m("ol-webgl-vector-layer"),s=m("ol-style-stroke"),f=m("ol-style"),p=m("ol-vector-layer"),b=m("ol-style-fill"),N=m("ol-style-circle"),I=m("ol-interaction-select"),M=m("ol-overlay"),q=m("ol-interaction-link"),T=m("ol-geom-point"),W=m("ol-feature"),Z=m("ol-geolocation"),B=m("ol-layer-group"),X=m("ol-map");return y(),v(h(J),null,{default:g((()=>[x(h(z),{fullscreen:!0},{default:g((()=>[ee.value?(y(),_("div",D)):k("",!0),x(h(w),null,{default:g((()=>[x(h(j),null,{default:g((()=>[x(h(S),{size:"large"},{default:g((()=>[x(r,{"aria-hidden":"true",icon:h(C)},null,8,["icon"]),P("    Floor 4 ")])),_:1})])),_:1})])),_:1}),x(X,{class:"map-container",style:{height:"90vh"},loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0},{default:g((()=>[x(l,{ref_key:"view",ref:K,center:R.value,rotation:n.value,zoom:a.value,minZoom:18,projection:t.value,"onChange:center":ce,"onChange:resolution":ie,"onChange:rotation":ue},null,8,["center","rotation","zoom","projection"]),E("button",{class:"btn-map btn-locate",type:"button",onClick:o[0]||(o[0]=e=>{var t;null===(t=K.value)||void 0===t||t.setCenter(R.value)})},[x(r,{"aria-hidden":"true",icon:h(F)},null,8,["icon"])]),E("button",L,[x(r,{"aria-hidden":"true",icon:h(O)},null,8,["icon"])]),x(B,{opacity:1},{default:g((()=>[x(i),x(d,{styles:[$]},{default:g((()=>[x(c,{format:h(Y),crossOrigin:"anonymous",url:"geojson/battipagliabbox.geojson"},null,8,["format"])])),_:1},8,["styles"]),x(p,null,{default:g((()=>[x(c,{format:h(Y),crossOrigin:"anonymous",features:U.value},null,8,["format","features"]),x(f,null,{default:g((()=>[x(s,{color:"rgba(5, 6, 34, 0.5)",width:"1",dash:"true"})])),_:1})])),_:1}),x(I,{onSelect:re,condition:h(ne),filter:le},{default:g((()=>[x(f,null,{default:g((()=>[x(s,{color:"blue",width:6}),x(b,{color:"rgba(255,255,255,0.2)"}),x(N,{radius:14},{default:g((()=>[x(b,{color:"#3333ffff"}),x(s,{color:"#3333ff55",width:"8"})])),_:1})])),_:1})])),_:1},8,["condition"]),x(p,null,{default:g((()=>[x(c,{format:h(Y),crossOrigin:"anonymous",features:V.value,projection:t.value},null,8,["format","features","projection"]),x(f,null,{default:g((()=>[x(N,{radius:6},{default:g((()=>[x(b,{color:"#3333ffff"}),x(s,{color:"#3333ff99",width:"20"})])),_:1})])),_:1})])),_:1}),""!=ae.value?(y(),v(M,{key:0,position:oe.value},{default:g((()=>[E("div",H,A(ae.value),1)])),_:1},8,["position"])):k("",!0),x(q),x(Z,{projection:t.value,"onChange:fakePosition":Q},{default:g((()=>[E("template",null,[x(p,{zIndex:2},{default:g((()=>[x(c,null,{default:g((()=>[x(W,{ref:"positionFeature"},{default:g((()=>[x(T,{coordinates:u.value},null,8,["coordinates"]),x(f,null,{default:g((()=>[x(N,{radius:6,color:"none"},{default:g((()=>[x(b,{color:"#c11111"}),x(s,{color:"#c1111199",width:"8"})])),_:1})])),_:1})])),_:1},512)])),_:1})])),_:1})])])),_:1},8,["projection"])])),_:1})])),_:1}),x(h(G),{trigger:"open-action-sheet",header:"Actions",buttons:de})])),_:1})])),_:1})}}});e("default",I(K,[["__scopeId","data-v-e768e38d"]]))}}}));
