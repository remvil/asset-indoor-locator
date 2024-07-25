System.register(["./index-legacy-DpHnR2ne.js"],(function(e,t){"use strict";var n,r,s,a,o;return{setters:[e=>{n=e.a7,r=e.a8,s=e.a9,a=e.aa,o=e.ab}],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
e("startStatusTap",(()=>{const e=window;e.addEventListener("statusTap",(()=>{n((()=>{const t=e.innerWidth,n=e.innerHeight,i=document.elementFromPoint(t/2,n/2);if(!i)return;const c=r(i);c&&new Promise((e=>s(c,e))).then((()=>{a((async()=>{c.style.setProperty("--overflow","hidden"),await o(c,300),c.style.removeProperty("--overflow")}))}))}))}))}))}}}));
