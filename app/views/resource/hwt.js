!function(t,e){function i(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),i=window.location.search.substr(1).match(e);return null!==i?unescape(i[2]):null}function n(e,i){if(i=i||"log",t.console&&t.console[i]&&(M||t._tracker_debug))t._tracker_logs||(t._tracker_logs=[]),t._tracker_logs.push(i+":"+e),t.console[i]("t : "+e);else if("throw"===i)throw e+" >> http://developers.hypers.com.cn/website/debug.html"}function o(){var e;try{e=t.top.document.referrer}catch(i){n(i);try{e=t.parent.document.referrer}catch(o){n(o),e=document.referrer}}return e}function a(){var e=0;try{Plugin=t.navigator.plugins["Shockwave Flash"]||t.ActiveXObject,e=Plugin.description||new Plugin("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(i){n(i)}return e||n("No Flash"),e}function s(t){for(;t.length;)t.shift()()}function r(e,i){var n,o=c();t[o]=function(){i.apply(t,arguments),n.parentNode.removeChild(n),t[o]=null},e+="&jsonp="+o,n=l(e)}function l(t){var i=e.createElement("script"),n=e.getElementsByTagName("head")[0];return i.type="text/javascript",i.charset="utf-8",i.src=t,n.insertBefore(i,n.firstChild),i}function c(){return"_"+(1e18*Math.random()).toString(36).slice(0,5).toUpperCase()}function h(){}function u(e,i,n){return t.addEventListener?(e.addEventListener(i,n),e):(e.attachEvent("on"+i,n),e)}function f(e,i,n){return t.addEventListener?(e.removeEventListener(i,n),e):(e.detachEvent(i,n),e)}function d(t){return"function"==typeof t}function p(t){return"[object Object]"===Object.prototype.toString.call(t)}function v(t){return"[object Array]"===Object.prototype.toString.call(t)}function g(t){return/^[0-9]+$/.test(t)}function m(t){return encodeURIComponent(t)}function _(t,e){var i,n={};for(i in t)n[e+i]=t[i];return n}function b(t){var e,i={};for(e in t)i[e.toLowerCase()]=t[e];return i}function y(t){var e,i,n=[];for(e in t)i=t[e],void 0!==i&&""!==i&&n.push(e+"="+m(i));return n.join("&")}function w(t,e,i){var n,o={};if(i){for(n in t)o[n]=t[n];for(n in e)o[n]=e[n];return o}for(n in e)t[n]=e[n];return t}function k(i,n){function o(){if(!t[n].isReady){try{e.documentElement.doScroll("left")}catch(i){return void setTimeout(o,1)}a()}}function a(){t[n].isReady=!0,i(n)}var s;if(e.addEventListener?s=function(){e.removeEventListener("DOMContentLoaded",s,!1),a()}:e.attachEvent&&(s=function(){"complete"===e.readyState&&(e.detachEvent("onreadystatechange",s),a())}),"complete"===e.readyState)return setTimeout(a,1);if(e.addEventListener)e.addEventListener("DOMContentLoaded",s,!1),t.addEventListener("load",a,!1);else if(e.attachEvent){e.attachEvent("onreadystatechange",s),t.attachEvent("onload",a);var r=!1;try{r=null===t.frameElement}catch(l){}e.documentElement.doScroll&&r&&o()}}function S(){this.available=1,this.flashJSProxyFn=c(),this.swf={},this.id="_ha",this.type="flashcookie",this.successCallbacks=[],this.failCallbacks=[],this.get=function(t,e){this.sendMsg(e,"jGetItem",t)},this.set=function(t,e,i){this.sendMsg(i,"jSetItem",t,e)},this.sendMsg=function(e,i,n,o){e=e||h;var a=c(),s=arguments.length,r=this.swf;if(t[a]=e,2==s)r[i](a);else if(3==s)r[i](n,a);else{if("string"!=typeof o)throw new Error("FlashStorage only support string type value!");r[i](n,o,a)}},this.initialize=function(t,e,i,n){return this.options=n,this.id=i,this.available?this.initialized?t&&setTimeout(t,0):(t&&this.successCallbacks.push(t),e&&this.failCallbacks.push(e),void(this.loading||this.loadSWF())):e&&e()},this.loadSWF=function(){this.loading=1;var i=0,n=this;if(O&&(i=(O.match(/\d+/g)||[0])[0]),10>i)return this.available=0,void s(n.failCallbacks);this.available=1,t[this.flashJSProxyFn]=function(){var t=arguments;setTimeout(function(){n.deferCallJS.apply(n,t)},0)};var o=setInterval(function(){e.body&&(clearInterval(o),n.createSWF(),setTimeout(function(){n.initialized||(n.available=0,n.successCallbacks.length=0,s(n.failCallbacks))},5e3))},50)},this.createSWF=function(){var t=e.createElement("div"),i=this.options.swf_url;t.setAttribute("style",["display:block","position:absolute","right:0","bottom:0","border:none"].join(";")),e.body.appendChild(t,e.body.firstChild),t.innerHTML=['<object id="'+c()+'" data="'+i+'"  type="application/x-shockwave-flash" width="10" height="10" style="position:absolute;right:0;bottom:0;">','<param name="movie" value="'+i+'" />','<param name="wmode" value="transparent" />','<param name="version" value="10" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="jsproxyfunction='+this.flashJSProxyFn+'" />',"</object>"].join(" "),this.swf=t.firstChild},this.deferCallJS=function(e,i){switch(e){case"onecall":if(!t[i])return;t[i].apply(t,[].slice.call(arguments,2)),t[i]=null;break;case"error":this.available=this.initialized=0,s(this.failCallbacks),n(i);break;case"load":n("Flash storage load success!"),this.available=this.initialized=1,this.failCallbacks.length=0,s(this.successCallbacks)}}}function C(){this.successCallbacks=[],this.failCallbacks=[],this.type="localstorage",this.available=function(){try{return t.postMessage&&t.localStorage?1:0}catch(e){return n(e),0}}()}function E(t,e,i){function n(n,o,a,s){function r(t){t&&"undefined"!=t&&u.push(t),f--,!f&&a&&a(u)}function l(t){t.initialize(function(){t[n].apply(t,o)},function(){r()},e,i)}var c,h=t.length,u=[],f=h;for(o.push(r);c=s[--h];)l(c)}this.storages=t,this.get=function(t,e,i){function o(t){for(var n,o,a,s=t.length;s--;)if(n=t[s]){if(n=n.split("___"),n.length<2)return e(n[0]);o=parseInt(n[0],36),(!a||a[0]>o)&&(a=n)}return a?void e(a[1]):i&&i()}n("get",[t],o,this.storages)},this.set=function(t,e,i){e=(+new Date).toString(36)+"___"+e,n("set",[t,e],i,this.storages)}}function j(i){this.loaded=0,this.hmtq=[],this.id=i,this.isReady=!1,this.bindClick=function(){function i(t,e){var i=s(t.href);t._hwt_href=t.href,p.hash[i]||(p.hash[i]=0),p.hash[i]++,t._hwt_index=e,t._hwt_group_index=p.hash[i],a(t)}function o(t,e){t._hwt_index=e,t._hwt_group_index=1,a(t)}function a(t){u(t,"click",function(e){r(t)})}function s(t){for(var e=0,i=0,n=t.length;n>i;i++)e=31*e+t.charCodeAt(i)<<0;return e}function r(i){var o,a=[];return i._hwt_href&&a.push("link_url="+m(i._hwt_href)),t[d.id].options?(a.push("seq="+p.total+"_"+i._hwt_index+"_"+i._hwt_group_index),a.push("txt="+m(i.innerHTML||i.value)),a.push("screen="+t.screen.width+"x"+t.screen.height),a.push("offset="+e.body.offsetWidth+"x"+e.body.offsetHeight),a.push("scroll="+e.body.scrollWidth+"x"+e.body.scrollHeight),a.push("client="+e.body.clientWidth+"x"+e.body.clientHeight),a.push("node="+i.nodeName),a.push("v="+t[d.id].options.version),a.push("_t=i"),a.push("type=clkmap"),a.push("r="+c()),o=t[d.id].options.api_url+"/hwt?"+a.join("&").replace(/%20/g,"+"),void l(o)):void n("Options is undefined","throw")}function l(t){var e=new Image(1,1);e.src=t,e.onload=e.onreadystatechange=function(){e.readyState&&"loaded"!==e.readyState&&"complete"!==e.readyState||(e.onload=e.onreadystatechange=null)},e.onerror=function(){e.onerror=null,n("Img error")}}var h,f,d=this,p={func:{},hash:{}},v=e.getElementsByTagName("*"),g=[];for(f=0;f<v.length;f++)h=v[f],"A"!==h.nodeName&&"BUTTON"!==h.nodeName&&"INPUT"!==h.nodeName||"HIDDEN"===h.type.toUpperCase()||g.push(h);for(p.total=g.length,f=0;f<g.length;f++)"A"==g[f].nodeName?i(g[f],f):o(g[f],f)},this.trigger=function(){this.hmtq.push(i)},this.init=function(){this.hmtq.length>0&&!this.loaded&&(this.bindClick(),this.loaded=1)}}function x(i){this.options={title:e.title,params:{}},this.available=!0,this.ua=0,this.has_cache=!0,this.logs=[],this.pageview=function(e){var i={},n=e[0]||{},o=e[1],a=n.url||this.options.url;return"_v1_1"!==this.alias&&(a&&!a.substr(0,8).match(/https?:\/\//)&&(a=[t.location.protocol,"//",t.location.hostname,"/"==a.substr(0,1)?"":"/",a].join("")),i.url=a),i.title=n.title||this.options.title,i.pv_fl=O,w(i,_(n.params,"p_")),T(this,"pv",i,o),this},this.action=function(t){var e=t[0],i=_(t[1],"p_"),n=t[2];return i.act_name=e,T(this,"act",i,n),this}}function T(t,e,i,o){function a(){w(i,_(t.options.params,"p_")),i.type=e,L(t,i,o)}var s=t.options.storage_id||"_hid";return t.available?t[s]?void a():t.comboStorage?void t.comboStorage.get(s,function(e){e&&(t[s]=e),a()},function(){a()}):void a():void n("this is disable")}function L(t,e,i){var n,a,s,l=t.options.storage_id||"_hid",c={},h=0;if(w(c,e),t[l]&&"null"!==t[l]&&(c[l]=t[l]),t.options.with_ref&&(a=o())&&/.*[\u4e00-\u9fa5]+.*$/.test(a)&&(a=encodeURI(a)),c.ref=a,t.has_cache){n=t.comboStorage.storages;for(var u=0;u<n.length;u++)h+=parseInt(n[u].available)||0;h||(t.has_cache=!1)}t.options.muid&&(c.muid=t.options.muid),t.options.uid&&(c.uid=t.options.uid),c._ua=t.ua,c.v=t.options.version,c.has_cache=t.has_cache,c["char"]=z,c.lang=H,c.sr=U,c.sd=W,s=t.options.api_url+"/hwt?"+y(c),r(s,function(e){t.comboStorage&&(t[l]=e,t.comboStorage.set(l,e)),P(e),d(i)&&i(t,s),M&&t.logs.push(s)})}function I(){this.trackers={},this.create=function(e,i,o){var a,s=e[0],r=e[1],l=e[2],c=[];return s||n("14001","throw"),t[i]=t[i]||{},t[i].flashStore=t[i].flashStore||new S,t[i].iframeStore=t[i].iframeStore||new C,a=new x(i),a.ua=s,a.alias=o,a.options=A(w(a.options,w(D,b(r),!0))),t[i].options=a.options,a.options.id&&(a.options.storage_id=a.options.id),a.options.no_fls||a.options.disable_flash||c.push(t[i].flashStore),a.options.no_ils||a.options.disable_iframe||c.push(t[i].iframeStore),c.length?a.comboStorage=a.comboStorage||new E(c,i,a.options):a.has_cache=!1,this.trackers[o]=a,d(l)&&l(),this},this.enable=function(e,i,n){var o=e[0];return e.length?("clickmap"===o&&t[i]&&!t[i].hmt&&(t[i].hmt=new j(i),t[i].hmt.trigger(),k(function(e){t[i].hmt.init()},i)),this):void(this.trackers[n].available=!0)},this.send=function(t,e,i){var n=t.splice(0,1)[0];return this.trackers[i][n](t),this},this.set=function(t,e,i){function n(t,e){return p(e[0])?(w(t.options,e[0]),void(d(e[1])&&e[1](t))):e.length>=2?(t.options[e[0]]=e[1],void(d(e[2])&&e[2](t))):void 0}return n(this.trackers[i],t),this},this.identify=function(t,e,i){var n=t[0];if(!n)throw"muid is undifined";this.trackers[i].muid=n},this.track=function(t,e,i){i="_v1_2_v1_3",p(t[0])?t.splice(0,0,t[0].UA):t.splice(0,1,t[1].UA),this.create(t,e,i),this.send(["pageview"],e,i)}}function A(t){function e(t,e){return t=t.replace(/\/(hwt|hmt)\?[^\s]*/,"").replace(/https?:/,""),"/"===t[t.length-1]&&(t=t.substr(0,t.length-1)),(e?"https:":F)+t}return t.api_url&&(t.api_url=e(t.api_url,t.force_ssl)),t.swf_url&&(t.swf_url=e(t.swf_url)),t.iframe_url&&(t.iframe_url=e(t.iframe_url)),t}function N(){if(t._hwtTQ){var e="_ha",i="_v1_1";t[e]||(t[e]=function(){return(t[e].q=t[e].q||[]).push(arguments)}),t[e].controller=t[e].controller||new I;for(var n,o=t._hwtTQ;n=o.shift();)n.splice(0,0,n[0].UA),t[e].controller.create(n,e,i),t[e].controller.send(["pageview"],e,i);t._hwt={track:function(n,o){t[e].controller.send(["pageview"],e,i)}}}}function q(e,i){if(t[i].controller=t[i].controller||new I,this.push=function(e){var o,a,s="default";return e=[].slice.apply(e),e.length?t._ha_disable?void n("_ha is disabled"):t["_ha_disable_"+s]?void n("_ha ["+s+"]  is disabled"):(o=e.splice(0,1)[0],a=o.split("."),"create"===o&&e[1]&&e[1].name&&(s=e[1].name),a.length>1&&(s=a[0],o=a[1]),t[i].controller[o]?void t[i].controller[o](e,i,s):void n(o+"  is not defined")):void 0},e&&e.length)for(var o=0;o<e.length;o++)this.push(e[o])}var F="https:"===e.location.protocol?"https:":"http:",M=i("_tracker_debug")||t._tracker_debug,O=a()||0,z=e.charset||e.characterSet,H=navigator.language||navigator.userLanguage,U=t.screen.width+"x"+t.screen.height,W=t.screen.colorDepth,D={force_ssl:!1,storage_id:"_hid",version:"1.7.1",disable_flash:!1,disable_iframe:!1,with_ref:!0,swf_url:"//t.hypers.com.cn/storage.swf#",iframe_url:"//t.hypers.com.cn/storage.html",api_url:"//t.hypers.com.cn/cgi-bin"};C.prototype.initialize=function(i,o,a,r){var l,c,h=this;return this.options=r,this.fn=a,this.available?this.initialized?i&&setTimeout(i,0):(this.loaded||(this.loaded=1,setTimeout(function(){function i(e){var n=(e.data+"").split("#"),o=n[0],a=n[1],r=n[2];g(r)&&(h.available=r),e.origin==h.origin&&a===h.fn&&(f(t,"message",i),"loaded"===o&&(clearTimeout(c),h.window=l.contentWindow,h.initialized=1,s(h.successCallbacks)))}e.body&&(l=e.createElement("iframe"),c=setTimeout(function(){l.onerror(),l.parentNode.removeChild(l)},3e3),l.style.display="none",l.src=h.options.iframe_url+"#"+h.fn,h.origin=l.src.split("/").slice(0,3).join("/"),u(t,"message",i),l.onerror=l.onabort=function(){h.available=0,s(h.failCallbacks),n("iframe storage error")},e.body.appendChild(l,e.body.firstChild))},50)),i&&this.successCallbacks.push(i),void(o&&this.failCallbacks.push(o))):void(d(o)&&o())},C.prototype.sendMessage=function(e,i,o,a){function s(i){var n=(i.data+"").split("#"),o=n[0],a=n[1];i.origin==r.origin&&a===r.fn&&(f(t,"message",s),e(o))}var r=this;u(t,"message",s);try{r.window.postMessage([i,o,a].join("#"),"*")}catch(l){n(l)}},C.prototype.get=function(t,e){return this.sendMessage(e,"getItem",t),this},C.prototype.set=function(t,e,i){return this.sendMessage(i,"setItem",t,e),this};var P=function(e){var i=t.HWT_ID_READY_CALL_ONCE;i&&(d(i)?i(e):d(t[i])?t[i](e):l(i),P=h)};N(),function(){var e="undefined"==typeof t.HyperAnalyticsObject?"_hwt":t.HyperAnalyticsObject;if(v(e))for(var i=0;i<e.length;i++)p(t[e[i]].q)||(t[e[i]].q=new q(t[e[i]].q,e[i]));else t[e]||(t[e]=function(){return(t[e].q=t[e].q||[]).push(arguments)}),t[e].q=new q(t[e].q,e)}()}(this,document);