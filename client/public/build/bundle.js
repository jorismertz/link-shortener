var app=function(){"use strict";function t(){}const n=t=>t;function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function i(t){return"function"==typeof t}function s(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(n,e,o){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}(e,o))}const u="undefined"!=typeof window;let l=u?()=>window.performance.now():()=>Date.now(),a=u?t=>requestAnimationFrame(t):t;const f=new Set;function d(t){f.forEach((n=>{n.c(t)||(f.delete(n),n.f())})),0!==f.size&&a(d)}function h(t){let n;return 0===f.size&&a(d),{promise:new Promise((e=>{f.add(n={c:t,f:e})})),abort(){f.delete(n)}}}function p(t,n){t.appendChild(n)}function g(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}function m(t){const n=b("style");return function(t,n){p(t.head||t,n),n.sheet}(g(t),n),n.sheet}function y(t,n,e){t.insertBefore(n,e||null)}function $(t){t.parentNode.removeChild(t)}function b(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function k(){return v(" ")}function w(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function x(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function _(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function L(t,n){t.value=null==n?"":n}function S(t,n,e,o){null===e?t.style.removeProperty(n):t.style.setProperty(n,e,o?"important":"")}const A=new Map;let E,C=0;function O(t,n,e,o,r,i,s,c=0){const u=16.666/o;let l="{\n";for(let t=0;t<=1;t+=u){const o=n+(e-n)*i(t);l+=100*t+`%{${s(o,1-o)}}\n`}const a=l+`100% {${s(e,1-e)}}\n}`,f=`__svelte_${function(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}(a)}_${c}`,d=g(t),{stylesheet:h,rules:p}=A.get(d)||function(t,n){const e={stylesheet:m(n),rules:{}};return A.set(t,e),e}(d,t);p[f]||(p[f]=!0,h.insertRule(`@keyframes ${f} ${a}`,h.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${f} ${o}ms linear ${r}ms 1 both`,C+=1,f}function P(t,n){const e=(t.style.animation||"").split(", "),o=e.filter(n?t=>t.indexOf(n)<0:t=>-1===t.indexOf("__svelte")),r=e.length-o.length;r&&(t.style.animation=o.join(", "),C-=r,C||a((()=>{C||(A.forEach((t=>{const{ownerNode:n}=t.stylesheet;n&&$(n)})),A.clear())})))}function N(t){E=t}const T=[],j=[],M=[],D=[],R=Promise.resolve();let z=!1;function I(t){M.push(t)}const U=new Set;let q,J=0;function B(){const t=E;do{for(;J<T.length;){const t=T[J];J++,N(t),F(t.$$)}for(N(null),T.length=0,J=0;j.length;)j.pop()();for(let t=0;t<M.length;t+=1){const n=M[t];U.has(n)||(U.add(n),n())}M.length=0}while(T.length);for(;D.length;)D.pop()();z=!1,U.clear(),N(t)}function F(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(I)}}function H(){return q||(q=Promise.resolve(),q.then((()=>{q=null}))),q}function G(t,n,e){t.dispatchEvent(function(t,n,{bubbles:e=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,o,n),r}(`${n?"intro":"outro"}${e}`))}const K=new Set;let Q;function V(t,n){t&&t.i&&(K.delete(t),t.i(n))}function W(t,n,e,o){if(t&&t.o){if(K.has(t))return;K.add(t),Q.c.push((()=>{K.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}else o&&o()}const X={duration:0};function Y(e,o,r){let s,c,u=o(e,r),a=!1,f=0;function d(){s&&P(e,s)}function p(){const{delay:o=0,duration:r=300,easing:i=n,tick:p=t,css:g}=u||X;g&&(s=O(e,0,1,r,o,i,g,f++)),p(0,1);const m=l()+o,y=m+r;c&&c.abort(),a=!0,I((()=>G(e,!0,"start"))),c=h((t=>{if(a){if(t>=y)return p(1,0),G(e,!0,"end"),d(),a=!1;if(t>=m){const n=i((t-m)/r);p(n,1-n)}}return a}))}let g=!1;return{start(){g||(g=!0,P(e),i(u)?(u=u(),H().then(p)):p())},invalidate(){g=!1},end(){a&&(d(),a=!1)}}}function Z(t,n,o,s){const{fragment:c,on_mount:u,on_destroy:l,after_update:a}=t.$$;c&&c.m(n,o),s||I((()=>{const n=u.map(e).filter(i);l?l.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(I)}function tt(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function nt(t,n){-1===t.$$.dirty[0]&&(T.push(t),z||(z=!0,R.then(B)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function et(n,e,i,s,c,u,l,a=[-1]){const f=E;N(n);const d=n.$$={fragment:null,ctx:null,props:u,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:o(),dirty:a,skip_bound:!1,root:e.target||f.$$.root};l&&l(d.root);let h=!1;if(d.ctx=i?i(n,e.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return d.ctx&&c(d.ctx[t],d.ctx[t]=r)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](r),h&&nt(n,t)),e})):[],d.update(),h=!0,r(d.before_update),d.fragment=!!s&&s(d.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);d.fragment&&d.fragment.l(t),t.forEach($)}else d.fragment&&d.fragment.c();e.intro&&V(n.$$.fragment),Z(n,e.target,e.anchor,e.customElement),B()}N(f)}class ot{$destroy(){tt(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const rt=[];let it=localStorage.getItem("secret");"null"===it&&(it=null);const st=function(n,e=t){let o;const r=new Set;function i(t){if(s(n,t)&&(n=t,o)){const t=!rt.length;for(const t of r)t[1](),rt.push(t,n);if(t){for(let t=0;t<rt.length;t+=2)rt[t][0](rt[t+1]);rt.length=0}}}return{set:i,update:function(t){i(t(n))},subscribe:function(s,c=t){const u=[s,c];return r.add(u),1===r.size&&(o=e(i)||t),s(n),()=>{r.delete(u),0===r.size&&(o(),o=null)}}}}(it);function ct(t){const n=t-1;return n*n*n+1}function ut(t){const n=Math.cos(t*Math.PI*.5);return Math.abs(n)<1e-14?1:1-n}function lt(t){return Math.sin(t*Math.PI/2)}function at(t,{delay:n=0,duration:e=400,easing:o=ct,x:r=0,y:i=0,opacity:s=0}={}){const c=getComputedStyle(t),u=+c.opacity,l="none"===c.transform?"":c.transform,a=u*(1-s);return{delay:n,duration:e,easing:o,css:(t,n)=>`\n\t\t\ttransform: ${l} translate(${(1-t)*r}px, ${(1-t)*i}px);\n\t\t\topacity: ${u-a*n}`}}function ft(t,n,e){const o=t.slice();return o[3]=n[e].id,o[4]=n[e].createdAt,o[5]=n[e].originalUrl,o[6]=n[e].shorthand,o[7]=n[e].visitedAmount,o[9]=e,o}function dt(e){let o,s,c,u,a,f,d,g,m,v,_,L,A,E,C=e[1],N=[];for(let t=0;t<C.length;t+=1)N[t]=ht(ft(e,C,t));return{c(){o=b("section"),s=b("header"),c=b("h2"),c.textContent="All previous created links",u=k(),a=b("h2"),a.textContent="Close",f=k(),d=b("table"),g=b("tr"),g.innerHTML="<th>id</th> \n        <th>created at</th> \n        <th>Link</th> \n        <th>Shorthand</th> \n        <th>Times visited</th>",m=k();for(let t=0;t<N.length;t+=1)N[t].c();S(a,"cursor","pointer"),x(s,"class","svelte-14tvuhp"),x(o,"class","svelte-14tvuhp")},m(t,n){y(t,o,n),p(o,s),p(s,c),p(s,u),p(s,a),p(o,f),p(o,d),p(d,g),p(d,m);for(let t=0;t<N.length;t+=1)N[t].m(d,null);L=!0,A||(E=w(a,"click",e[2]),A=!0)},p(t,n){if(e=t,2&n){let t;for(C=e[1],t=0;t<C.length;t+=1){const o=ft(e,C,t);N[t]?(N[t].p(o,n),V(N[t],1)):(N[t]=ht(o),N[t].c(),V(N[t],1),N[t].m(d,null))}for(;t<N.length;t+=1)N[t].d(1);N.length=C.length}},i(t){if(!L){for(let t=0;t<C.length;t+=1)V(N[t]);I((()=>{_&&_.end(1),v=Y(o,at,{y:200,easing:ut}),v.start()})),L=!0}},o(e){v&&v.invalidate(),_=function(e,o,s){let c,u=o(e,s),a=!0;const f=Q;function d(){const{delay:o=0,duration:i=300,easing:s=n,tick:d=t,css:p}=u||X;p&&(c=O(e,1,0,i,o,s,p));const g=l()+o,m=g+i;I((()=>G(e,!1,"start"))),h((t=>{if(a){if(t>=m)return d(0,1),G(e,!1,"end"),--f.r||r(f.c),!1;if(t>=g){const n=s((t-g)/i);d(1-n,n)}}return a}))}return f.r+=1,i(u)?H().then((()=>{u=u(),d()})):d(),{end(t){t&&u.tick&&u.tick(1,0),a&&(c&&P(e,c),a=!1)}}}(o,at,{y:25,easing:lt}),L=!1},d(t){t&&$(o),function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(N,t),t&&_&&_.end(),A=!1,E()}}}function ht(n){let e,o,r,i,s,c,u,l,a,f,d,h,g,m,w,L,S,A,E,C=n[3]+"",O=new Date(n[4]).toDateString()+"",P=n[7]+"";return{c(){e=b("tr"),o=b("td"),r=v(C),i=k(),s=b("td"),c=v(O),u=k(),l=b("td"),a=b("input"),d=k(),h=b("td"),g=b("input"),w=k(),L=b("td"),S=v(P),A=k(),x(a,"type","text"),a.readOnly=!0,a.value=f=n[5],x(g,"type","text"),g.readOnly=!0,g.value=m=window.location+n[6]},m(t,n){y(t,e,n),p(e,o),p(o,r),p(e,i),p(e,s),p(s,c),p(e,u),p(e,l),p(l,a),p(e,d),p(e,h),p(h,g),p(e,w),p(e,L),p(L,S),p(e,A)},p(t,e){n=t,2&e&&C!==(C=n[3]+"")&&_(r,C),2&e&&O!==(O=new Date(n[4]).toDateString()+"")&&_(c,O),2&e&&f!==(f=n[5])&&a.value!==f&&(a.value=f),2&e&&m!==(m=window.location+n[6])&&g.value!==m&&(g.value=m),2&e&&P!==(P=n[7]+"")&&_(S,P)},i(t){E||I((()=>{E=Y(e,at,{y:100,delay:100*n[9],easing:ut}),E.start()}))},o:t,d(t){t&&$(e)}}}function pt(t){let n,e,o=t[0]&&0!==t[1].length&&dt(t);return{c(){o&&o.c(),n=v("")},m(t,r){o&&o.m(t,r),y(t,n,r),e=!0},p(t,[e]){t[0]&&0!==t[1].length?o?(o.p(t,e),3&e&&V(o,1)):(o=dt(t),o.c(),V(o,1),o.m(n.parentNode,n)):o&&(Q={r:0,c:[],p:Q},W(o,1,1,(()=>{o=null})),Q.r||r(Q.c),Q=Q.p)},i(t){e||(V(o),e=!0)},o(t){W(o),e=!1},d(t){o&&o.d(t),t&&$(n)}}}function gt(t,n,e){let{showAllLinks:o}=n,{allLinks:r}=n;return t.$$set=t=>{"showAllLinks"in t&&e(0,o=t.showAllLinks),"allLinks"in t&&e(1,r=t.allLinks)},[o,r,()=>e(0,o=!1)]}st.subscribe((t=>{localStorage.setItem("secret",t)}));class mt extends ot{constructor(t){super(),et(this,t,gt,pt,s,{showAllLinks:0,allLinks:1})}}function yt(t){let n,e,o,i,s,c,u,l,a,f,d,h,g,m;return d=new mt({props:{showAllLinks:t[5],allLinks:t[4]}}),{c(){var r;n=b("div"),e=b("ul"),o=b("button"),o.textContent="Shorten new link",i=k(),s=b("button"),s.textContent="Show all links",c=k(),u=b("textarea"),l=k(),a=b("textarea"),f=k(),(r=d.$$.fragment)&&r.c(),x(n,"class","gui"),x(u,"placeholder","paste link here..."),x(u,"class","link-input"),S(u,"--display-input",t[3].input),x(a,"class","link-output"),S(a,"--display-output",t[3].output),a.readOnly=!0},m(r,$){y(r,n,$),p(n,e),p(e,o),p(e,i),p(e,s),y(r,c,$),y(r,u,$),L(u,t[2]),y(r,l,$),y(r,a,$),L(a,t[0]),t[13](a),y(r,f,$),Z(d,r,$),h=!0,g||(m=[w(o,"click",t[9]),w(s,"click",t[10]),w(u,"input",t[11]),w(u,"keyup",t[7]),w(a,"input",t[12])],g=!0)},p(t,[n]){(!h||8&n)&&S(u,"--display-input",t[3].input),4&n&&L(u,t[2]),(!h||8&n)&&S(a,"--display-output",t[3].output),1&n&&L(a,t[0]);const e={};32&n&&(e.showAllLinks=t[5]),16&n&&(e.allLinks=t[4]),d.$set(e)},i(t){h||(V(d.$$.fragment,t),h=!0)},o(t){W(d.$$.fragment,t),h=!1},d(e){e&&$(n),e&&$(c),e&&$(u),e&&$(l),e&&$(a),t[13](null),e&&$(f),tt(d,e),g=!1,r(m)}}}function $t(t,n,e){let o;c(t,st,(t=>e(15,o=t)));let r,i="",s="";const u={input:"unset",output:"none"};let l="";const a=t=>{t?"string"!=typeof t?console.error("function expected a string."):(e(0,i=document.location.href+t),e(3,u.input="none",u),navigator.clipboard&&navigator.clipboard.writeText(i),e(3,u.output="unset",u),r.select()):(e(0,i=""),e(2,s=""),e(3,u.input="unset",u),e(3,u.output="none",u))};let f=[],d=!1;async function h(){null===o&&await async function(){if(null===o){const t=await prompt("Provide secret");st.set(t)}return o}(),e(5,d=!d),0===f.length&&fetch("http://localhost:5123/api/all-links",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({secret:o})}).then((t=>t.json())).then((t=>{e(4,f=t.reverse())}))}return[i,r,s,u,f,d,a,function(){const t=(t=>{try{new URL(t)}catch(t){return!1}return!0})(s),n=s;if(t){if(n==l)return;l=n,fetch("http://localhost:5123/api/create-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({originalUrl:n})}).then((t=>t.json())).then((t=>{a(t.data.shorthand)}))}},h,()=>a(),()=>h(),function(){s=this.value,e(2,s)},function(){i=this.value,e(0,i)},function(t){j[t?"unshift":"push"]((()=>{r=t,e(1,r)}))}]}return new class extends ot{constructor(t){super(),et(this,t,$t,yt,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
