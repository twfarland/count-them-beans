!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){"use strict";n.__esModule=!0;var r=t(13),o=t(2),i=t(1),a=t(14),u=i.map(a.AppView,o.state);r["default"](document.getElementById("app"),u),o.spawnMany(3)},function(e,n){"use strict";function t(e){return{listeners:[],active:!0,value:e}}function r(e){var n=t();return e(function(e){f(n,e),l(n)}),n}function o(e){var n=t();return e.then(function(e){f(n,e),l(n)})["catch"](function(e){f(n,e instanceof Error?e:new Error(e))}),n}function i(e,n){function r(e){f(o,e)}var o=t();return o.stop=function(){e.removeEventListener(n,r,!1)},e.addEventListener(n,r,!1),o}function a(e){var n=0,r=t(n),o=setInterval(function(){n++,f(r,n)},e);return r.stop=function(){clearInterval(o)},r}function u(){function e(t){f(n,t),window.requestAnimationFrame(e)}var n=t(0);return window.requestAnimationFrame(e),n}function s(e,n){return e.active&&e.listeners.push(n),e}function c(e,n){return e.listeners=e.listeners.filter(function(e){return e!==n}),e}function f(e,n){return e.active&&(e.value=n,e.listeners.forEach(function(e){e(n)})),e}function l(e){return e.listeners=[],e.active=!1,e.stop&&e.stop(),e}function d(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var o=t();return n.forEach(function(t){s(t,function(){var t=n.map(function(e){return e.value});f(o,e.apply(null,t))})}),o}function v(e,n){var r=t();return s(n,function(n){e(n)&&f(r,n)}),r}function p(e){var n=t();return e.value&&f(n,e.value),s(e,function(e){e!==n.value&&f(n,e)}),n}function m(e,n,r){var o=t(n);return s(r,function(t){f(o,n=e(t,n))}),o}function h(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];var r=t();return e.forEach(function(e){s(e,function(e){f(r,e)})}),r}function g(e,n){var r=t();return e.value&&f(r,e.value),s(n,function(){f(r,e.value)}),r}function y(e,n){var r=t(),o=[];return s(n,function(n){o.length>e-1&&o.shift(),o.push(n),f(r,o.slice())}),r}function b(e,n){var r=t();return s(n,function(n){s(e(n),function(e){f(r,e)})}),r}function k(e,n){var r,o=t();return s(n,function(n){r&&l(r),r=e(n),s(r,function(e){f(o,e)})}),o}function w(e,n){return k(function(e){return r(function(t){setTimeout(function(){t(e)},n)})},e)}n.create=t,n.fromCallback=r,n.fromPromise=o,n.fromDomEvent=i,n.fromInterval=a,n.fromAnimationFrames=u,n.listen=s,n.unlisten=c,n.send=f,n.stop=l,n.map=d,n.filter=v,n.dropRepeats=p,n.fold=m,n.merge=h,n.sampleOn=g,n.slidingWindow=y,n.flatMap=b,n.flatMapLatest=k,n.debounce=w},function(e,n,t){"use strict";function r(e){var t=n.state.value,r=l.firstKey(t,function(n){return String(n.index)===e});return r?{command:"increment",key:r}:{command:"none"}}function o(e){var t=n.state.value;switch(e.command){case"increment":t[e.key].worker.postMessage(e)}}function i(e,n){switch(e.command){case"created":return h++,l.set(n,(t={},t[e.key]={worker:e.worker,index:h,total:0,emitting:!1},t));case"updated":return l.set(n,(r={},r[e.key]=l.set(n[e.key],{total:e.value}),r));case"notify":return u(e.key,e.value),l.set(n,(o={},o[e.key]=l.set(n[e.key],{emitting:!0}),o));case"notified":return l.set(n,(i={},i[e.key]=l.set(n[e.key],{emitting:!1}),i));default:return n}var t,r,o,i}function a(e){f.send(p,{command:"increment",key:e})}function u(e,t){var r=n.state.value,o=function(n){n!==e&&(r[n].worker.postMessage({command:"update",key:e,value:t}),setTimeout(function(){return f.send(m,{command:"notified",key:n})},100))};for(var i in r)o(i)}function s(){var e=new Worker("js/GCounterWorker.js");return e.onmessage=function(n){var t=n.data;"created"===t.command&&(t.worker=e),f.send(m,t)},e}function c(e){for(;e>0;)s(),e--}n.__esModule=!0;var f=t(1),l=t(3),d=t(12),v=f.map(r,d.fromKeys()),p=f.create({command:"none"}),m=f.create({command:"none"});f.listen(v,o),f.listen(p,o);var h=0,g={};n.state=f.fold(i,g,m),n.increment=a,n.spawn=s,n.spawnMany=c},function(e,n){"use strict";function t(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function r(e,n){for(var t in e)if(n(e[t],t))return t}function o(e,n){var t=[];for(var r in e)t.push(n(e[r],r));return t}n.__esModule=!0,n.set=t,n.firstKey=r,n.mapObject=o},function(e,n){"use strict";function t(e){return new a(Math.ceil(e/32))}function r(e,n){var t=n%32,r=(n-t)/32;e[r]|=1<<t}function o(e,n){var t=n%32,r=(n-t)/32;e[r]&=~(1<<t)}function i(e,n){var t=n%32,r=(n-t)/32;return!!(e[r]&1<<t)}Object.defineProperty(n,"__esModule",{value:!0});var a="undefined"==typeof Uint32Array?Array:Uint32Array;n.createBv=t,n.setBit=r,n.clearBit=o,n.getBit=i},function(e,n,t){n=e.exports=t(6)(),n.push([e.id,".app{font-family:Helvetica Neue,Arial;padding:20px;text-align:center}.app h1{font-size:2em;font-weight:300;padding-bottom:30px}.app a{text-decoration:none;color:#00f}.app button{padding:10px 15px;font-size:1em;background:#fff;border:none;border-radius:25px;box-shadow:0 1px 4px rgba(0,0,0,.5);color:#666}.counter{display:inline-block;padding:10px;margin:10px;width:50px}.total{text-align:center;padding:10px;font-size:1em;transition:font-size .3s ease;height:30px}.emitting .total{font-size:1.5em}",""])},function(e,n){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],n=0;n<this.length;n++){var t=this[n];t[2]?e.push("@media "+t[2]+"{"+t[1]+"}"):e.push(t[1])}return e.join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<n.length;o++){var a=n[o];"number"==typeof a[0]&&r[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),e.push(a))}},e}},function(e,n,t){"use strict";function r(e,n,t,r){function l(e,n){return r(e)===r(n)}for(var d=0,v=0,p=e.length-1,m=n.length-1,h=e[d],g=n[v];d<=p&&v<=m&&l(h,g);)t(s,h,g,v),h=e[++d],g=n[++v];if(!(v>m&&d>p)){for(var y=e[p],b=n[m],k=0;d<=p&&v<=m&&l(h,b);)t(c,h,b,p-k+1),h=e[++d],b=n[--m],++k;for(;p>=d&&v<=m&&l(g,y);)t(c,y,g,v),y=e[--p],g=n[++v],--k;for(;p>=d&&m>=v&&l(y,b);)t(s,y,b,m),y=e[--p],b=n[--m];if(d>p)for(;v<=m;)t(u,null,g,v),g=n[++v];else if(v>m)for(;d<=p;)t(f,h),h=e[++d];else{for(var w=0,E=null,x=d-k,M=d,A=(0,a.createBv)(p-d),C=i(e,d,p+1,r);v<=m;g=n[++v]){var L=C[r(g)];o(L)?(t(u,null,g,x++),++w):d!==L?((0,a.setBit)(A,L-M),t(c,e[L],g,x++)):E=v}null!==E&&((0,a.setBit)(A,0),t(c,e[d],n[E],E));for(var R=e.length-n.length+w,U=0;U<R;h=e[++d])(0,a.getBit)(A,d-M)||(t(f,h),++U)}}}function o(e){return"undefined"==typeof e}function i(e,n,t,r){for(var o={},i=n;i<t;++i)o[r(e[i])]=i;return o}Object.defineProperty(n,"__esModule",{value:!0}),n.REMOVE=n.MOVE=n.UPDATE=n.CREATE=void 0;var a=t(4),u=0,s=1,c=2,f=3;n["default"]=r,n.CREATE=u,n.UPDATE=s,n.MOVE=c,n.REMOVE=f},function(e,n,t){"use strict";function r(e){return e instanceof Array?typeof e[0]===b?D:B:typeof e===g||typeof e===y?U:O}function o(e,n){return e instanceof Array&&e[1]&&e[1].key||n}function i(e,n){var t,r,i=[];for(r=0;r<e.length;r++)t=e[r],i.push({key:o(t,r),vDom:t,element:n&&n[r]});return i}function a(e){return e.key}function u(e){return!(e===!1||void 0===e||null===e)}function s(e,n,t){return n[2]=n[2]?n[2].filter(u):[],h["default"](i(e[2]||[],t.childNodes),i(n[2]),function(e,n,r,o){var i;switch(e){case h.CREATE:i=p(r.vDom),i&&t.insertBefore(i,t.childNodes[o]||null);break;case h.UPDATE:c(n.vDom,r.vDom,n.element,t);break;case h.MOVE:t.insertBefore(c(n.vDom,r.vDom,n.element,t),n.element);break;case h.REMOVE:t.removeChild(n.element)}},a),t}function c(e,n,t,o){if(void 0===t)throw new Error("No dom node to update");if(e!==n){var i,a=void 0!==e,u=void 0!==n;if(!a&&u)i=p(n),i&&o.appendChild(i);else if(a&&!u)o.removeChild(t);else if(a&&u){var c=r(e),d=r(n);if(l(e,n,c,d))switch(d){case B:f(e[1]||{},n[1]||{},t),s(e,n,t);break;case D:(n[0].shouldUpdate?n[0].shouldUpdate(e[1],n[1]):n[1]&&e[1]&&n[1]!==e[1])?(n[2]=n[0](n[1]),f(e[2][1]||{},n[2][1]||{},t),s(e[2],n[2],t)):n[2]=e[2]}else e!==n&&(i=p(n),i&&o.replaceChild(i,t))}return t}}function f(e,n,t){var r,o,i,a,u=e[C],s=n[C];for(r in e)if(o=e[r],i=n[r],void 0===i||null===i||i===!1)switch(r){case C:case k:break;case E:case M:case x:t[r]=!1;break;case w:t.value=L;break;case A:t.blur();break;default:t.removeAttribute(r)}for(r in n)if(o=e[r],i=n[r],void 0!==i&&null!==i&&i!==!1&&i!==o&&typeof i!==b)switch(r){case C:case k:break;case E:case M:case x:case w:t[r]=i;break;case A:t.focus();break;default:t.setAttribute(r,i)}if(u&&!s)for(a in u)t.removeEventListener(a,u[a]);else if(!u&&s)for(a in s)t.addEventListener(a,s[a]);else if(u&&s){for(a in u)s[a]||t.removeEventListener(a,u[a]);for(a in s)u[a]!==s[a]&&(u[a]&&t.removeEventListener(a,u[a]),t.addEventListener(a,s[a]))}return t}function l(e,n,t,r){return t===r&&(t===B||t===D)&&e[0]===n[0]}function d(e){switch(r(e)){case D:return e[2]=e[0](e[1]),v(e[2]);case B:return v(e);case U:return"<span>"+e+"</span>";default:return""}}function v(e){var n,t,r,o,i,a=e[0],s=e[1],c=[];if(e[2]=e[2]?e[2].filter(u):[],n=e[2],s)for(r in s)t=s[r],void 0!==t&&null!==t&&t!==!1&&r!==k&&r!==C&&c.push(r+'="'+t+'"');if(i="<"+[a].concat(c).join(" ")+">",!R[a]){for(o=0;o<n.length;o++)void 0!==o&&null!==o&&o!==!1&&(i+=d(n[o]));i+="</"+a+">"}return i}function p(e){switch(r(e)){case U:case B:case D:if(0===e.length)return;var n=document.createElement("div");n.innerHTML=d(e);var t=n.firstChild;return m(e,t),t;case O:return}}function m(e,n){var t,o,i,a,u,s,c=r(e);if(c!==U&&c!==O){if(t=c===D?e[2]:e,o=t[1],s=t[2],o&&(i=o[C]))for(a in i)n.addEventListener(a,i[a]);if(s)for(u=0;u<s.length;u++)m(s[u],n.childNodes[u])}}var h=t(7),g="string",y="number",b="function",k="key",w="value",E="checked",x="selected",M="disabled",A="focus",C="on",L="",R={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1},U=0,B=1,D=2,O=3;n.updateDom=c,n.vDomToHtmlString=d,n.vNodeToHtmlString=v,n.vDomToDom=p},function(e,n,t){function r(e,n){for(var t=0;t<e.length;t++){var r=e[t],o=v[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(c(r.parts[i],n))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(c(r.parts[i],n));v[r.id]={id:r.id,refs:1,parts:a}}}}function o(e){for(var n=[],t={},r=0;r<e.length;r++){var o=e[r],i=o[0],a=o[1],u=o[2],s=o[3],c={css:a,media:u,sourceMap:s};t[i]?t[i].parts.push(c):n.push(t[i]={id:i,parts:[c]})}return n}function i(e,n){var t=h(),r=b[b.length-1];if("top"===e.insertAt)r?r.nextSibling?t.insertBefore(n,r.nextSibling):t.appendChild(n):t.insertBefore(n,t.firstChild),b.push(n);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");t.appendChild(n)}}function a(e){e.parentNode.removeChild(e);var n=b.indexOf(e);n>=0&&b.splice(n,1)}function u(e){var n=document.createElement("style");return n.type="text/css",i(e,n),n}function s(e){var n=document.createElement("link");return n.rel="stylesheet",i(e,n),n}function c(e,n){var t,r,o;if(n.singleton){var i=y++;t=g||(g=u(n)),r=f.bind(null,t,i,!1),o=f.bind(null,t,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=s(n),r=d.bind(null,t),o=function(){a(t),t.href&&URL.revokeObjectURL(t.href)}):(t=u(n),r=l.bind(null,t),o=function(){a(t)});return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}function f(e,n,t,r){var o=t?"":r.css;if(e.styleSheet)e.styleSheet.cssText=k(n,o);else{var i=document.createTextNode(o),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(i,a[n]):e.appendChild(i)}}function l(e,n){var t=n.css,r=n.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}function d(e,n){var t=n.css,r=n.sourceMap;r&&(t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([t],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(o),i&&URL.revokeObjectURL(i)}var v={},p=function(e){var n;return function(){return"undefined"==typeof n&&(n=e.apply(this,arguments)),n}},m=p(function(){return/msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,y=0,b=[];e.exports=function(e,n){n=n||{},"undefined"==typeof n.singleton&&(n.singleton=m()),"undefined"==typeof n.insertAt&&(n.insertAt="bottom");var t=o(e);return r(t,n),function(e){for(var i=[],a=0;a<t.length;a++){var u=t[a],s=v[u.id];s.refs--,i.push(s)}if(e){var c=o(e);r(c,n)}for(var a=0;a<i.length;a++){var s=i[a];if(0===s.refs){for(var f=0;f<s.parts.length;f++)s.parts[f]();delete v[s.id]}}}};var k=function(){var e=[];return function(n,t){return e[n]=t,e.filter(Boolean).join("\n")}}()},function(e,n,t){var r=t(5);"string"==typeof r&&(r=[[e.id,r,""]]);t(9)(r,{});r.locals&&(e.exports=r.locals)},,function(e,n,t){"use strict";function r(){var e=o.create("");return window.onkeypress=function(n){o.send(e,String.fromCharCode(n.keyCode))},e}n.__esModule=!0;var o=t(1);n.fromKeys=r},function(e,n,t){"use strict";function r(e,n){var t=document.createElement("div"),r={domNode:t,vDom:["div",{},[]]};return e.appendChild(t),o.fold(function(n,t){var r=t.domNode,o=t.vDom;return i.updateDom(o,n,r,e),{domNode:r,vDom:n}},r,n)}n.__esModule=!0;var o=t(1),i=t(8);n["default"]=r},function(e,n,t){"use strict";function r(e){var n=e.key,t=e.total,r=e.emitting;return[s,{"class":"counter"+(r?" emitting":"")},[[s,{"class":"total"},[t]],[c,{on:{click:function(){i.increment(n)}}},["&plus;"]]]]}function o(e){return[s,{"class":"app"},[[f,u,["count them beans"]],[d,u,[[l,{href:"https://github.com/twfarland/count-them-beans"},["source"]]]],[c,{on:{click:i.spawn}},["spawn counter"]],[s,u,a.mapObject(e,function(e,n){var t=e.total,o=e.emitting;return[r,{key:n,total:t,emitting:o}]})]]]}n.__esModule=!0;var i=t(2),a=t(3);t(10);var u=null,s="div",c="button",f="h1",l="a",d="p";n.AppView=o}]);