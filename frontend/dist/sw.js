if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let a={};const u=s=>l(s,n),t={module:{uri:n},exports:a,require:u};e[n]=Promise.all(i.map((s=>t[s]||u(s)))).then((s=>(r(...s),a)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-BVrt1EiH.js",revision:null},{url:"assets/_plugin-vue_export-helper-legacy-DiXWvjWf.js",revision:null},{url:"assets/basedecoder-cyllKOBe.js",revision:null},{url:"assets/basedecoder-legacy-D2El87z6.js",revision:null},{url:"assets/decoder-CaSv2t6h.js",revision:null},{url:"assets/decoder-legacy-CBOdBBhG.js",revision:null},{url:"assets/deflate-D09RTw64.js",revision:null},{url:"assets/deflate-legacy-DnI0qCGa.js",revision:null},{url:"assets/focus-visible-legacy-CdO5cX4I.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/index-CCVJPXjL.css",revision:null},{url:"assets/index9-CPgeBBbF.js",revision:null},{url:"assets/index9-legacy-B2gDfbZQ.js",revision:null},{url:"assets/input-shims-ByocNw7T.js",revision:null},{url:"assets/input-shims-legacy-J7j7Qj9b.js",revision:null},{url:"assets/ios.transition-GRDYIa0f.js",revision:null},{url:"assets/ios.transition-legacy-_WPGXcwt.js",revision:null},{url:"assets/jpeg-CmqsAIlE.js",revision:null},{url:"assets/jpeg-legacy-BNM-uGir.js",revision:null},{url:"assets/lerc-DJObX1BK.js",revision:null},{url:"assets/lerc-legacy-sFHVw0SQ.js",revision:null},{url:"assets/lzw-CtikbtPO.js",revision:null},{url:"assets/lzw-legacy-BJTdzC9p.js",revision:null},{url:"assets/md.transition-COPNi1cE.js",revision:null},{url:"assets/md.transition-legacy-DrDeqHzR.js",revision:null},{url:"assets/packbits-Bh9zKA8A.js",revision:null},{url:"assets/packbits-legacy-JasmFbKs.js",revision:null},{url:"assets/pako.esm-BhoZX99Z.js",revision:null},{url:"assets/pako.esm-legacy-qZH5qtUV.js",revision:null},{url:"assets/polyfills-legacy-CuUzwLLm.js",revision:null},{url:"assets/raw-BNQmimxK.js",revision:null},{url:"assets/raw-legacy-BDrjqlUA.js",revision:null},{url:"assets/status-tap-Ds70kA8R.js",revision:null},{url:"assets/status-tap-legacy-C1yMB8ZZ.js",revision:null},{url:"assets/swipe-back-Cm_58ZL3.js",revision:null},{url:"assets/swipe-back-legacy-BIpJ6aun.js",revision:null},{url:"assets/TabAssets-9WE4_PpQ.css",revision:null},{url:"assets/TabAssets-DCQO021D.js",revision:null},{url:"assets/TabAssets-legacy-5UzeJ0BI.js",revision:null},{url:"assets/TabHomepage-legacy-BM5qNy-5.js",revision:null},{url:"assets/TabHomepage-P12p2mHV.js",revision:null},{url:"assets/TabHomepage-skbUyOcf.css",revision:null},{url:"assets/TabNavigate-DVQAWn_n.css",revision:null},{url:"assets/TabNavigate-legacy-Dix7ebkl.js",revision:null},{url:"assets/TabNavigate-qmOsL1uT.js",revision:null},{url:"assets/web-CgxIIW_m.js",revision:null},{url:"assets/web-legacy-qL0zSgi2.js",revision:null},{url:"assets/webimage-lb3ZIxVW.js",revision:null},{url:"assets/webimage-legacy-C7-2GbH4.js",revision:null},{url:"index.html",revision:"24ab63923cfb7c0a304dddf375e76eb2"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.png",revision:"4902a3f6d990d349fd6ea8034fa72076"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"images/icons/android-chrome-192x192.png",revision:"f130a0b70e386170cf6f011c0ca8c4f4"},{url:"images/icons/android-chrome-512x512.png",revision:"0ff1bc4d14e5c9abcacba7c600d97814"},{url:"manifest.webmanifest",revision:"aace5465907eccb3fe0849d0668ab0ee"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
