"use strict";var require$$2=require("vm"),require$$4=require("buffer"),require$$0=require("fs"),require$$1=require("path"),require$$0$1=require("module"),require$$8=require("async_hooks"),_0x2d3c6d=require("escodegen"),commonjsGlobal="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},vm2Exports={},vm2={get exports(){return vm2Exports},set exports(e){vm2Exports=e}},main={},bridge={},script=(!function(e){const X=["Number","String","Boolean","Date","RegExp","Map","WeakMap","Set","WeakSet","Promise","Function"],H=["RangeError","ReferenceError","SyntaxError","TypeError","EvalError","URIError","Error"],J={__proto__:null,Object:Object.prototype,Array:Array.prototype};for(let e=0;e<X.length;e++){var t=X[e],r=commonjsGlobal[t];r&&(J[t]=r.prototype)}for(let e=0;e<H.length;e++){var i=H[e],n=commonjsGlobal[i];n&&(J[i]=n.prototype)}const{getPrototypeOf:q,setPrototypeOf:K,defineProperty:Y,deleteProperty:Q,getOwnPropertyDescriptor:s,isExtensible:Z,preventExtensions:ee,apply:te,construct:re,set:ie,get:ve,has:be,ownKeys:Se,enumerate:De}=Reflect;const{freeze:o,prototype:ne}=Object,se=ne.hasOwnProperty,oe=Proxy,ae=WeakMap,{get:ce,set:ue}=ae.prototype,he=Map,le=he.prototype.get,pe=he.prototype.set,c=Function.prototype.bind,u=Array.isArray,h=Error.captureStackTrace,l=Symbol.prototype.toString,fe=Symbol.toStringTag,Ae=Symbol.iterator,we=Symbol.for("nodejs.util.inspect.custom");class de extends Error{constructor(e,t){super(e),this.name="VMError",this.code=t,h(this,this.constructor)}}function me(){return new de("Unexpected")}if(J.VMError=de.prototype,!K(e,null))throw me();function ye(e,t){e=s(e,t);if(!e)return e;if(K(e,null))return e;throw me()}function ge(e,t){return t}var a=o({__proto__:null,get(e,t,r){throw"symbol"==typeof t&&(t=te(l,t,[])),new de(`Unexpected access to key '${t}'`)}});const xe=o({__proto__:null});a=new oe(xe,a);function Ee(){}if(!Y(Ee,"prototype",{__proto__:null,value:a}))throw me();function p(){}const f=o({__proto__:a,construct(){return this}});function Ce(e,t){let r;if("function"==typeof e)r=function(e){e=new oe(e,f);try{return new e,1}catch(e){}}(e)?te(c,p,[null]):()=>{};else{if(!u(e))return{__proto__:t};r=[]}if(K(r,t))return r;throw me()}e.createBridge=function(e,i){const o=new ae,a=new he,c=new he;function t(r,e,t){te(pe,a,[r,ge]),te(pe,a,[e,(e,t)=>k(e,t,r)]),t&&te(pe,c,[r,t])}var r={__proto__:null,globalPrototypes:J,safeGetOwnPropertyDescriptor:ye,fromArguments:function(t){var r=[];for(let e=0;e<t.length;e++){var i=_(t[e]);Y(r,e,{__proto__:null,value:i,writable:!0,enumerable:!0,configurable:!0})}return r},from:_,fromWithFactory:P,ensureThis:function(t){var r=typeof t;switch(r){case"object":if(null===t)return null;case"function":let e=q(t);if(e)for(;e;){var i=te(le,a,[e]);if(i)return te(ce,o,[t])||i(S,t);e=q(e)}return t;case"undefined":case"string":case"number":case"boolean":case"symbol":case"bigint":return t;default:throw new de(`Unknown type '${r}'`)}},mapping:o,connect:function(e,t){try{d(g,p,[e,t])}catch(e){throw new de("Unexpected error")}te(ue,o,[t,e])},reflectSet:ie,reflectGet:ve,reflectDefineProperty:Y,reflectDeleteProperty:Q,reflectApply:te,reflectConstruct:re,reflectHas:be,reflectOwnKeys:Se,reflectEnumerate:De,reflectGetPrototypeOf:q,reflectIsExtensible:Z,reflectPreventExtensions:ee,objectHasOwnProperty:se,weakMapSet:ue,addProtoMapping:t,addProtoMappingFactory:function(r,e,i){let n;te(pe,a,[e,(e,t)=>(n||(n=r(),te(pe,a,[n,ge]),i&&te(pe,c,[n,i])),k(e,t,n))])},defaultFactory:S,protectedFactory:A,readonlyFactory:C,VMError:de};const n="object"!=typeof e,{globalPrototypes:s,safeGetOwnPropertyDescriptor:u,fromArguments:h,from:l,mapping:p,reflectSet:f,reflectGet:M,reflectDefineProperty:B,reflectDeleteProperty:L,reflectApply:d,reflectConstruct:j,reflectHas:$,reflectOwnKeys:m,reflectEnumerate:U,reflectGetPrototypeOf:y,reflectIsExtensible:V,reflectPreventExtensions:G,objectHasOwnProperty:W,weakMapSet:g}=(n&&(e=e(r,i)),r.other=e);function x(e,t){try{return!0===d(W,e,[t])}catch(e){throw F(e)}}function E(e,t,r,i){let n;if(i.get||i.set){var s=i.get;if(!s)return;try{n=d(s,t,[r])}catch(e){throw F(e)}}else n=i.value;return e.fromOtherWithContext(n)}function v(e,t,r){if(!te(se,t,[r]))return!1;try{e[r]=l(t[r])}catch(e){throw F(e)}return!0}class b extends Ee{constructor(e){super(),this.objectWrapper=()=>e}getObject(){return this.objectWrapper()}getFactory(){return S}fromOtherWithContext(e){return P(this.getFactory(),e)}doPreventExtensions(r,i,e){let n;try{n=m(i)}catch(e){throw F(e)}for(let t=0;t<n.length;t++){var s=n[t];let e;try{e=u(i,s)}catch(e){throw F(e)}if(e){if(e.configurable)e.get||e.set?e={__proto__:null,configurable:!0,enumerable:e.enumerable,writable:!0,value:null}:e.value=null;else{var o=ye(r,s);if(o&&!o.configurable)continue;e.get||e.set?(e.get=this.fromOtherWithContext(e.get),e.set=this.fromOtherWithContext(e.set)):e.value="function"!=typeof i||"caller"!==s&&"callee"!==s&&"arguments"!==s?this.fromOtherWithContext(e.value):null}if(!Y(r,s,e))throw me()}}if(!ee(r))throw me()}get(e,t,r){var i=this.getObject();switch(t){case"constructor":var n=u(i,t);return n?E(this,i,t,n):null===(n=q(e))?void 0:n.constructor;case"__proto__":n=u(i,t);return n?E(this,i,t,n):q(e);case fe:if(!x(i,fe)){n=q(e),n=te(le,c,[n]);if(n)return n}break;case"arguments":case"caller":case"callee":if("function"==typeof i&&x(i,t))throw me()}let s;try{s=M(i,t)}catch(e){throw F(e)}return this.fromOtherWithContext(s)}set(e,t,r,i){var n=this.getObject();if("__proto__"===t&&!x(n,t))return this.setPrototypeOf(e,r);try{return r=l(r),!0===f(n,t,r)}catch(e){throw F(e)}}getPrototypeOf(e){return q(e)}setPrototypeOf(e,t){throw new de("Operation not allowed on contextified object.")}apply(e,t,r){var i=this.getObject();let n;try{t=l(t),r=h(r),n=d(i,t,r)}catch(e){throw F(e)}return _(n)}construct(e,t,r){var i=this.getObject();let n;try{t=h(t),n=j(i,t)}catch(e){throw F(e)}return P(this.getFactory(),n,_(i))}getOwnPropertyDescriptorDesc(e,t,r){var i=this.getObject();return!r||"function"!=typeof i||"arguments"!==t&&"caller"!==t&&"callee"!==t||(r.value=null),r}getOwnPropertyDescriptor(t,r){var i=this.getObject();let n;try{n=u(i,r)}catch(e){throw F(e)}if(n=this.getOwnPropertyDescriptorDesc(t,r,n)){let e;if(!(e=n.get||n.set?{__proto__:null,get:this.fromOtherWithContext(n.get),set:this.fromOtherWithContext(n.set),enumerable:!0===n.enumerable,configurable:!0===n.configurable}:{__proto__:null,value:this.fromOtherWithContext(n.value),writable:!0===n.writable,enumerable:!0===n.enumerable,configurable:!0===n.configurable}).configurable){i=ye(t,r);if((!i||i.configurable||i.writable!==e.writable)&&!Y(t,r,e))throw me()}return e}}definePropertyDesc(e,t,r){return r}defineProperty(t,r,e){var i=this.getObject();if(!K(e,null))throw me();if(!(e=this.definePropertyDesc(t,r,e)))return!1;let n={__proto__:null};var s=!0,o=!0,a=!0,s=(s&=v(n,e,"get"))&v(n,e,"set"),o=(o&=v(n,e,"value"))&v(n,e,"writable"),a=(a&=v(n,e,"enumerable"))&v(n,e,"configurable");try{if(!B(i,r,n))return!1;!0===n.configurable||a&&(s||o)||(n=u(i,r))}catch(e){throw F(e)}if(!n.configurable){let e;if(e=n.get||n.set?{__proto__:null,get:this.fromOtherWithContext(n.get),set:this.fromOtherWithContext(n.set),enumerable:n.enumerable,configurable:n.configurable}:{__proto__:null,value:this.fromOtherWithContext(n.value),writable:n.writable,enumerable:n.enumerable,configurable:n.configurable},!Y(t,r,e))throw me()}return!0}deleteProperty(e,t){var r=this.getObject();try{return!0===L(r,t)}catch(e){throw F(e)}}has(e,t){var r=this.getObject();try{return!0===$(r,t)}catch(e){throw F(e)}}isExtensible(e){var t=this.getObject();try{if(V(t))return!0}catch(e){throw F(e)}return Z(e)&&this.doPreventExtensions(e,t,this),!1}ownKeys(e){var t=this.getObject();let r;try{r=m(t)}catch(e){throw F(e)}return _(r)}preventExtensions(e){var t=this.getObject();try{if(!G(t))return!1}catch(e){throw F(e)}return Z(e)&&this.doPreventExtensions(e,t,this),!0}enumerate(e){var t=this.getObject();let r;try{r=U(t)}catch(e){throw F(e)}return this.fromOtherWithContext(r)}}function S(e){return new b(e)}b.prototype[we]=void 0,b.prototype[fe]="VM2 Wrapper",b.prototype[Ae]=void 0;class D extends b{getFactory(){return A}set(e,t,r,i){return"function"==typeof r?!0===Y(i,t,{__proto__:null,value:r,writable:!0,enumerable:!0,configurable:!0}):super.set(e,t,r,i)}definePropertyDesc(e,t,r){if(!r||!r.set&&!r.get&&"function"!=typeof r.value)return r}}function A(e){return new D(e)}class w extends b{getFactory(){return C}set(e,t,r,i){return Y(i,t,{__proto__:null,value:r,writable:!0,enumerable:!0,configurable:!0})}setPrototypeOf(e,t){return!1}defineProperty(e,t,r){return!1}deleteProperty(e,t){return!1}isExtensible(e){return!1}preventExtensions(e){return!1}}function C(e){return new w(e)}class z extends w{constructor(e,t){super(e),this.mock=t}get(e,t,r){var i=this.getObject(),n=this.mock;return te(se,n,t)&&!x(i,t)?n[t]:super.get(e,t,r)}}function _(e){return P(S,e)}function k(e,t,r){r=Ce(t,r),e=e(t),r=new oe(r,e);try{d(g,p,[r,t]),i(r,e)}catch(e){throw new de("Unexpected error")}if(!n)return te(ue,o,[t,r]),r;r=new oe(r,xe);try{d(g,p,[r,t]),i(r,e)}catch(e){throw new de("Unexpected error")}return te(ue,o,[t,r]),r}function F(t){for(let e=0;e<10;e++){var r=typeof t;switch(r){case"object":if(null===t)return null;case"function":var i=te(ce,o,[t]);if(i)return i;let e;try{e=y(t)}catch(e){t=e;break}if(!e)return k(S,t,null);for(;;){var n=te(le,a,[e]);if(n)return n(S,t);try{e=y(e)}catch(e){t=e;break}if(!e)return k(S,t,ne)}break;case"undefined":case"string":case"number":case"boolean":case"symbol":case"bigint":return t;default:throw new de(`Unknown type '${r}'`)}}throw new de("Exception recursion depth")}function P(e,t,r){var i=typeof t;switch(i){case"object":if(null===t)return null;case"function":var n=te(ce,o,[t]);if(n)return n;if(r)return k(e,t,r);try{r=y(t)}catch(e){throw F(e)}if(!r)return k(e,t,null);do{var s=te(le,a,[r]);if(s)return s(e,t);try{r=y(r)}catch(e){throw F(e)}}while(r);return k(e,t,ne);case"undefined":case"string":case"number":case"boolean":case"symbol":case"bigint":return t;default:throw new de(`Unknown type '${i}'`)}}t(J.Object,s.Object),t(J.Array,s.Array);for(let e=0;e<X.length;e++){var T=X[e],I=J[T],O=s[T];I&&O&&t(I,O,T)}for(let e=0;e<H.length;e++){var N=H[e],R=J[N],N=s[N];R&&N&&t(R,N,"Error")}return t(J.VMError,s.VMError,"Error"),r.BaseHandler=b,r.ProtectedHandler=D,r.ReadOnlyHandler=w,r.ReadOnlyMockHandler=z,r},e.VMError=de}(bridge),{}),compiler={};const{VMError:VMError$5}=bridge;let cacheCoffeeScriptCompiler;function getCoffeeScriptCompiler(){if(!cacheCoffeeScriptCompiler)try{const r=require("coffee-script");cacheCoffeeScriptCompiler=(e,t)=>r.compile(e,{header:!1,bare:!0})}catch(e){throw new VMError$5("Coffee-Script compiler is not installed.")}return cacheCoffeeScriptCompiler}function removeShebang$1(e){return e.startsWith("#!")?"//"+e.substring(2):e}function jsCompiler(e,t){return removeShebang$1(e)}function lookupCompiler$2(e){if("function"==typeof e)return e;switch(e){case"coffeescript":case"coffee-script":case"cs":case"text/coffeescript":return getCoffeeScriptCompiler();case"javascript":case"java-script":case"js":case"text/javascript":return jsCompiler;default:throw new VMError$5(`Unsupported compiler '${e}'.`)}}compiler.removeShebang=removeShebang$1,compiler.lookupCompiler=lookupCompiler$2;var transformer$4={},acornExports={},acorn={get exports(){return acornExports},set exports(e){acornExports=e}},walkExports=(!function(){var e=acornExports,M=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,574,3,9,9,370,1,81,2,71,10,50,3,123,2,54,14,32,10,3,1,11,3,46,10,8,0,46,9,7,2,37,13,2,9,6,1,45,0,13,2,49,13,9,3,2,11,83,11,7,0,3,0,158,11,6,9,7,3,56,1,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,5,0,82,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,243,14,166,9,71,5,2,1,3,3,2,0,2,1,13,9,120,6,3,6,4,0,29,9,41,6,2,3,9,0,10,10,47,15,406,7,2,7,17,9,57,21,2,13,123,5,4,0,2,1,2,6,2,0,9,9,49,4,2,1,2,4,9,9,330,3,10,1,2,0,49,6,4,4,14,9,5351,0,7,14,13835,9,87,9,39,4,60,6,26,9,1014,0,2,54,8,3,82,0,12,1,19628,1,4706,45,3,22,543,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,101,0,161,6,10,9,357,0,62,13,499,13,983,6,110,6,6,9,4759,9,787719,239],B=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,14,29,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,13,10,2,14,2,6,2,1,2,10,2,14,2,6,2,1,68,310,10,21,11,7,25,5,2,41,2,8,70,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,28,43,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,14,35,349,41,7,1,79,28,11,0,9,21,43,17,47,20,28,22,13,52,58,1,3,0,14,44,33,24,27,35,30,0,3,0,9,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,20,1,64,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,21,2,31,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,14,0,72,26,38,6,186,43,117,63,32,7,3,0,3,7,2,1,2,23,16,0,2,0,95,7,3,38,17,0,2,0,29,0,11,39,8,0,22,0,12,45,20,0,19,72,264,8,2,36,18,0,50,29,113,6,2,1,2,37,22,0,26,5,2,1,2,31,15,0,328,18,16,0,2,12,2,33,125,0,80,921,103,110,18,195,2637,96,16,1071,18,5,4026,582,8634,568,8,30,18,78,18,29,19,47,17,3,32,20,6,18,689,63,129,74,6,0,67,12,65,1,2,0,29,6135,9,1237,43,8,8936,3,2,6,2,1,2,290,16,0,30,2,3,0,15,3,9,395,2309,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,1845,30,7,5,262,61,147,44,11,6,17,0,322,29,19,43,485,27,757,6,2,3,2,1,2,14,2,196,60,67,8,0,1205,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42719,33,4153,7,221,3,5761,15,7472,3104,541,1507,4938,6,4191],L="‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿",t="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",n={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},j={5:c="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this","5module":c+" export import",6:c+" const class extends export import super"},$=/^in(stanceof)?$/,U=new RegExp("["+t+"]"),V=new RegExp("["+t+"‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿]");function r(e,t){for(var r=65536,i=0;i<t.length;i+=2){if(e<(r+=t[i]))return!1;if(e<=(r+=t[i+1]))return!0}return!1}function o(e,t){return e<65?36===e:e<91||(e<97?95===e:e<123||(e<=65535?170<=e&&U.test(String.fromCharCode(e)):!1!==t&&r(e,B)))}function a(e,t){return e<48?36===e:e<58||!(e<65)&&(e<91||(e<97?95===e:e<123||(e<=65535?170<=e&&V.test(String.fromCharCode(e)):!1!==t&&(r(e,B)||r(e,M)))))}function i(e,t){void 0===t&&(t={}),this.label=e,this.keyword=t.keyword,this.beforeExpr=!!t.beforeExpr,this.startsExpr=!!t.startsExpr,this.isLoop=!!t.isLoop,this.isAssign=!!t.isAssign,this.prefix=!!t.prefix,this.postfix=!!t.postfix,this.binop=t.binop||null,this.updateContext=null}function s(e,t){return new i(e,{beforeExpr:!0,binop:t})}var c={beforeExpr:!0},u={};function h(e,t){return(t=void 0===t?{}:t).keyword=e,u[e]=new i(e,t)}var g={num:new i("num",t={startsExpr:!0}),regexp:new i("regexp",t),string:new i("string",t),name:new i("name",t),privateId:new i("privateId",t),eof:new i("eof"),bracketL:new i("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new i("]"),braceL:new i("{",{beforeExpr:!0,startsExpr:!0}),braceR:new i("}"),parenL:new i("(",{beforeExpr:!0,startsExpr:!0}),parenR:new i(")"),comma:new i(",",c),semi:new i(";",c),colon:new i(":",c),dot:new i("."),question:new i("?",c),questionDot:new i("?."),arrow:new i("=>",c),template:new i("template"),invalidTemplate:new i("invalidTemplate"),ellipsis:new i("...",c),backQuote:new i("`",t),dollarBraceL:new i("${",{beforeExpr:!0,startsExpr:!0}),eq:new i("=",{beforeExpr:!0,isAssign:!0}),assign:new i("_=",{beforeExpr:!0,isAssign:!0}),incDec:new i("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new i("!/~",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:s("||",1),logicalAND:s("&&",2),bitwiseOR:s("|",3),bitwiseXOR:s("^",4),bitwiseAND:s("&",5),equality:s("==/!=/===/!==",6),relational:s("</>/<=/>=",7),bitShift:s("<</>>/>>>",8),plusMin:new i("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:s("%",10),star:s("*",10),slash:s("/",10),starstar:new i("**",{beforeExpr:!0}),coalesce:s("??",1),_break:h("break"),_case:h("case",c),_catch:h("catch"),_continue:h("continue"),_debugger:h("debugger"),_default:h("default",c),_do:h("do",{isLoop:!0,beforeExpr:!0}),_else:h("else",c),_finally:h("finally"),_for:h("for",{isLoop:!0}),_function:h("function",t),_if:h("if"),_return:h("return",c),_switch:h("switch"),_throw:h("throw",c),_try:h("try"),_var:h("var"),_const:h("const"),_while:h("while",{isLoop:!0}),_with:h("with"),_new:h("new",{beforeExpr:!0,startsExpr:!0}),_this:h("this",t),_super:h("super",t),_class:h("class",t),_extends:h("extends",c),_export:h("export"),_import:h("import",t),_null:h("null",t),_true:h("true",t),_false:h("false",t),_in:h("in",{beforeExpr:!0,binop:7}),_instanceof:h("instanceof",{beforeExpr:!0,binop:7}),_typeof:h("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:h("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:h("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},l=/\r\n?|\n|\u2028|\u2029/,L=new RegExp(l.source,"g");function p(e){return 10===e||13===e||8232===e||8233===e}function G(e,t,r){void 0===r&&(r=e.length);for(var i=t;i<r;i++){var n=e.charCodeAt(i);if(p(n))return i<r-1&&13===n&&10===e.charCodeAt(i+1)?i+2:i+1}return-1}var f=/[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,d=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,W=(c=Object.prototype).hasOwnProperty,z=c.toString,m=Object.hasOwn||function(e,t){return W.call(e,t)},X=Array.isArray||function(e){return"[object Array]"===z.call(e)};function y(e){return new RegExp("^(?:"+e.replace(/ /g,"|")+")$")}function x(e){return e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode(55296+(e>>10),56320+(1023&e)))}function E(e,t){this.line=e,this.column=t}function v(e,t,r){this.start=t,this.end=r,null!==e.sourceFile&&(this.source=e.sourceFile)}var H=/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;function b(e,t){for(var r=1,i=0;;){var n=G(e,i,t);if(n<0)return new E(r,t-i);++r,i=n}}var S={ecmaVersion:null,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!(E.prototype.offset=function(e){return new E(this.line,this.column+e)}),allowImportExportEverywhere:!1,allowAwaitOutsideFunction:null,allowSuperOutsideMethod:null,allowHashBang:!1,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1},J=!1;function q(e){var t,r,i={};for(t in S)i[t]=(e&&m(e,t)?e:S)[t];return"latest"===i.ecmaVersion?i.ecmaVersion=1e8:null==i.ecmaVersion?(!J&&"object"==typeof console&&console.warn&&(J=!0,console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")),i.ecmaVersion=11):2015<=i.ecmaVersion&&(i.ecmaVersion-=2009),null==i.allowReserved&&(i.allowReserved=i.ecmaVersion<5),e&&null!=e.allowHashBang||(i.allowHashBang=14<=i.ecmaVersion),X(i.onToken)&&(r=i.onToken,i.onToken=function(e){return r.push(e)}),X(i.onComment)&&(i.onComment=K(i,i.onComment)),i}function K(o,a){return function(e,t,r,i,n,s){e={type:e?"Block":"Line",value:t,start:r,end:i};o.locations&&(e.loc=new v(this,n,s)),o.ranges&&(e.range=[r,i]),a.push(e)}}function D(e,t){return 2|(e?4:0)|(t?8:0)}function A(e,t,r){this.options=e=q(e),this.sourceFile=e.sourceFile,this.keywords=y(j[6<=e.ecmaVersion?6:"module"===e.sourceType?"5module":5]);var i="",i=(!0!==e.allowReserved&&(i=n[6<=e.ecmaVersion?6:5===e.ecmaVersion?5:3],"module"===e.sourceType)&&(i+=" await"),this.reservedWords=y(i),(i?i+" ":"")+n.strict);this.reservedWordsStrict=y(i),this.reservedWordsStrictBind=y(i+" "+n.strictBind),this.input=String(t),this.containsEsc=!1,r?(this.pos=r,this.lineStart=this.input.lastIndexOf("\n",r-1)+1,this.curLine=this.input.slice(0,this.lineStart).split(l).length):(this.pos=this.lineStart=0,this.curLine=1),this.type=g.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.inModule="module"===e.sourceType,this.strict=this.inModule||this.strictDirective(this.pos),this.potentialArrowAt=-1,this.potentialArrowInForAwait=!1,this.yieldPos=this.awaitPos=this.awaitIdentPos=0,this.labels=[],this.undefinedExports=Object.create(null),0===this.pos&&e.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2),this.scopeStack=[],this.enterScope(1),this.regexpState=null,this.privateNameStack=[]}function w(){this.shorthandAssign=this.trailingComma=this.parenthesizedAssign=this.parenthesizedBind=this.doubleProto=-1}var t={inFunction:{configurable:!0},inGenerator:{configurable:!0},inAsync:{configurable:!0},canAwait:{configurable:!0},allowSuper:{configurable:!0},allowDirectSuper:{configurable:!0},treatFunctionsAsVar:{configurable:!0},allowNewDotTarget:{configurable:!0},inClassStaticBlock:{configurable:!0}};A.prototype.parse=function(){var e=this.options.program||this.startNode();return this.nextToken(),this.parseTopLevel(e)},t.inFunction.get=function(){return 0<(2&this.currentVarScope().flags)},t.inGenerator.get=function(){return 0<(8&this.currentVarScope().flags)&&!this.currentVarScope().inClassFieldInit},t.inAsync.get=function(){return 0<(4&this.currentVarScope().flags)&&!this.currentVarScope().inClassFieldInit},t.canAwait.get=function(){for(var e=this.scopeStack.length-1;0<=e;e--){var t=this.scopeStack[e];if(t.inClassFieldInit||256&t.flags)return!1;if(2&t.flags)return 0<(4&t.flags)}return this.inModule&&13<=this.options.ecmaVersion||this.options.allowAwaitOutsideFunction},t.allowSuper.get=function(){var e=this.currentThisScope(),t=e.flags,e=e.inClassFieldInit;return 0<(64&t)||e||this.options.allowSuperOutsideMethod},t.allowDirectSuper.get=function(){return 0<(128&this.currentThisScope().flags)},t.treatFunctionsAsVar.get=function(){return this.treatFunctionsAsVarInScope(this.currentScope())},t.allowNewDotTarget.get=function(){var e=this.currentThisScope(),t=e.flags,e=e.inClassFieldInit;return 0<(258&t)||e},t.inClassStaticBlock.get=function(){return 0<(256&this.currentVarScope().flags)},A.extend=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];for(var r=this,i=0;i<e.length;i++)r=e[i](r);return r},A.parse=function(e,t){return new this(t,e).parse()},A.parseExpressionAt=function(e,t,r){r=new this(r,e,t);return r.nextToken(),r.parseExpression()},A.tokenizer=function(e,t){return new this(t,e)},Object.defineProperties(A.prototype,t);var Y=/^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;(c=A.prototype).strictDirective=function(e){if(this.options.ecmaVersion<5)return!1;for(;;){d.lastIndex=e,e+=d.exec(this.input)[0].length;var t,r,i,n=Y.exec(this.input.slice(e));if(!n)return!1;if("use strict"===(n[1]||n[2]))return d.lastIndex=e+n[0].length,r=(t=d.exec(this.input)).index+t[0].length,";"===(i=this.input.charAt(r))||"}"===i||l.test(t[0])&&!(/[(`.[+\-/*%<>=,?^&]/.test(i)||"!"===i&&"="===this.input.charAt(r+1));e+=n[0].length,d.lastIndex=e,e+=d.exec(this.input)[0].length,";"===this.input[e]&&e++}},c.eat=function(e){return this.type===e&&(this.next(),!0)},c.isContextual=function(e){return this.type===g.name&&this.value===e&&!this.containsEsc},c.eatContextual=function(e){return!!this.isContextual(e)&&(this.next(),!0)},c.expectContextual=function(e){this.eatContextual(e)||this.unexpected()},c.canInsertSemicolon=function(){return this.type===g.eof||this.type===g.braceR||l.test(this.input.slice(this.lastTokEnd,this.start))},c.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0},c.semicolon=function(){this.eat(g.semi)||this.insertSemicolon()||this.unexpected()},c.afterTrailingComma=function(e,t){if(this.type===e)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),t||this.next(),!0},c.expect=function(e){this.eat(e)||this.unexpected()},c.unexpected=function(e){this.raise(null!=e?e:this.start,"Unexpected token")},c.checkPatternErrors=function(e,t){e&&(-1<e.trailingComma&&this.raiseRecoverable(e.trailingComma,"Comma is not permitted after the rest element"),-1<(e=t?e.parenthesizedAssign:e.parenthesizedBind))&&this.raiseRecoverable(e,t?"Assigning to rvalue":"Parenthesized pattern")},c.checkExpressionErrors=function(e,t){var r;return!!e&&(r=e.shorthandAssign,e=e.doubleProto,t?(0<=r&&this.raise(r,"Shorthand property assignments are valid only in destructuring patterns"),void(0<=e&&this.raiseRecoverable(e,"Redefinition of __proto__ property"))):0<=r||0<=e)},c.checkYieldAwaitInDefaultParams=function(){this.yieldPos&&(!this.awaitPos||this.yieldPos<this.awaitPos)&&this.raise(this.yieldPos,"Yield expression cannot be a default value"),this.awaitPos&&this.raise(this.awaitPos,"Await expression cannot be a default value")},c.isSimpleAssignTarget=function(e){return"ParenthesizedExpression"===e.type?this.isSimpleAssignTarget(e.expression):"Identifier"===e.type||"MemberExpression"===e.type};(t=A.prototype).parseTopLevel=function(e){var t=Object.create(null);for(e.body||(e.body=[]);this.type!==g.eof;){var r=this.parseStatement(null,!0,t);e.body.push(r)}if(this.inModule)for(var i=0,n=Object.keys(this.undefinedExports);i<n.length;i+=1){var s=n[i];this.raiseRecoverable(this.undefinedExports[s].start,"Export '"+s+"' is not defined")}return this.adaptDirectivePrologue(e.body),this.next(),e.sourceType=this.options.sourceType,this.finishNode(e,"Program")};var C={kind:"loop"},Q={kind:"switch"},Z=(t.isLet=function(e){if(!(this.options.ecmaVersion<6)&&this.isContextual("let")){d.lastIndex=this.pos;var t=d.exec(this.input),t=this.pos+t[0].length,r=this.input.charCodeAt(t);if(91===r||92===r)return!0;if(!e){if(123===r||55295<r&&r<56320)return!0;if(o(r,!0)){for(var i=t+1;a(r=this.input.charCodeAt(i),!0);)++i;if(92===r||55295<r&&r<56320)return!0;e=this.input.slice(t,i);if(!$.test(e))return!0}}}return!1},t.isAsyncFunction=function(){if(this.options.ecmaVersion<8||!this.isContextual("async"))return!1;d.lastIndex=this.pos;var e=d.exec(this.input),e=this.pos+e[0].length;return!(l.test(this.input.slice(this.pos,e))||"function"!==this.input.slice(e,e+8)||e+8!==this.input.length&&(a(e=this.input.charCodeAt(e+8))||55295<e&&e<56320))},t.parseStatement=function(e,t,r){var i,n,s=this.type,o=this.startNode();switch(this.isLet(e)&&(s=g._var,i="let"),s){case g._break:case g._continue:return this.parseBreakContinueStatement(o,s.keyword);case g._debugger:return this.parseDebuggerStatement(o);case g._do:return this.parseDoStatement(o);case g._for:return this.parseForStatement(o);case g._function:return e&&(this.strict||"if"!==e&&"label"!==e)&&6<=this.options.ecmaVersion&&this.unexpected(),this.parseFunctionStatement(o,!1,!e);case g._class:return e&&this.unexpected(),this.parseClass(o,!0);case g._if:return this.parseIfStatement(o);case g._return:return this.parseReturnStatement(o);case g._switch:return this.parseSwitchStatement(o);case g._throw:return this.parseThrowStatement(o);case g._try:return this.parseTryStatement(o);case g._const:case g._var:return i=i||this.value,e&&"var"!==i&&this.unexpected(),this.parseVarStatement(o,i);case g._while:return this.parseWhileStatement(o);case g._with:return this.parseWithStatement(o);case g.braceL:return this.parseBlock(!0,o);case g.semi:return this.parseEmptyStatement(o);case g._export:case g._import:if(10<this.options.ecmaVersion&&s===g._import){d.lastIndex=this.pos;var a=d.exec(this.input),a=this.pos+a[0].length,a=this.input.charCodeAt(a);if(40===a||46===a)return this.parseExpressionStatement(o,this.parseExpression())}return this.options.allowImportExportEverywhere||(t||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule)||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'"),s===g._import?this.parseImport(o):this.parseExport(o,r);default:return this.isAsyncFunction()?(e&&this.unexpected(),this.next(),this.parseFunctionStatement(o,!0,!e)):(a=this.value,n=this.parseExpression(),s===g.name&&"Identifier"===n.type&&this.eat(g.colon)?this.parseLabeledStatement(o,a,n,e):this.parseExpressionStatement(o,n))}},t.parseBreakContinueStatement=function(e,t){for(var r="break"===t,i=(this.next(),this.eat(g.semi)||this.insertSemicolon()?e.label=null:this.type!==g.name?this.unexpected():(e.label=this.parseIdent(),this.semicolon()),0);i<this.labels.length;++i){var n=this.labels[i];if(null==e.label||n.name===e.label.name){if(null!=n.kind&&(r||"loop"===n.kind))break;if(e.label&&r)break}}return i===this.labels.length&&this.raise(e.start,"Unsyntactic "+t),this.finishNode(e,r?"BreakStatement":"ContinueStatement")},t.parseDebuggerStatement=function(e){return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement")},t.parseDoStatement=function(e){return this.next(),this.labels.push(C),e.body=this.parseStatement("do"),this.labels.pop(),this.expect(g._while),e.test=this.parseParenExpression(),6<=this.options.ecmaVersion?this.eat(g.semi):this.semicolon(),this.finishNode(e,"DoWhileStatement")},t.parseForStatement=function(e){this.next();var t,r,i,n,s=9<=this.options.ecmaVersion&&this.canAwait&&this.eatContextual("await")?this.lastTokStart:-1;return this.labels.push(C),this.enterScope(0),this.expect(g.parenL),this.type===g.semi?(-1<s&&this.unexpected(s),this.parseFor(e,null)):(t=this.isLet(),this.type===g._var||this.type===g._const||t?(r=this.startNode(),t=t?"let":this.value,this.next(),this.parseVar(r,!0,t),this.finishNode(r,"VariableDeclaration"),(this.type===g._in||6<=this.options.ecmaVersion&&this.isContextual("of"))&&1===r.declarations.length?(9<=this.options.ecmaVersion&&(this.type===g._in?-1<s&&this.unexpected(s):e.await=-1<s),this.parseForIn(e,r)):(-1<s&&this.unexpected(s),this.parseFor(e,r))):(t=this.isContextual("let"),r=!1,i=new w,n=this.parseExpression(!(-1<s)||"await",i),this.type===g._in||(r=6<=this.options.ecmaVersion&&this.isContextual("of"))?(9<=this.options.ecmaVersion&&(this.type===g._in?-1<s&&this.unexpected(s):e.await=-1<s),t&&r&&this.raise(n.start,"The left-hand side of a for-of loop may not start with 'let'."),this.toAssignable(n,!1,i),this.checkLValPattern(n),this.parseForIn(e,n)):(this.checkExpressionErrors(i,!0),-1<s&&this.unexpected(s),this.parseFor(e,n))))},t.parseFunctionStatement=function(e,t,r){return this.next(),this.parseFunction(e,_|(r?0:ee),!1,t)},t.parseIfStatement=function(e){return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement("if"),e.alternate=this.eat(g._else)?this.parseStatement("if"):null,this.finishNode(e,"IfStatement")},t.parseReturnStatement=function(e){return this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(g.semi)||this.insertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement")},t.parseSwitchStatement=function(e){var t;this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.expect(g.braceL),this.labels.push(Q),this.enterScope(0);for(var r,i=!1;this.type!==g.braceR;)this.type===g._case||this.type===g._default?(r=this.type===g._case,t&&this.finishNode(t,"SwitchCase"),e.cases.push(t=this.startNode()),t.consequent=[],this.next(),r?t.test=this.parseExpression():(i&&this.raiseRecoverable(this.lastTokStart,"Multiple default clauses"),i=!0,t.test=null),this.expect(g.colon)):(t||this.unexpected(),t.consequent.push(this.parseStatement(null)));return this.exitScope(),t&&this.finishNode(t,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(e,"SwitchStatement")},t.parseThrowStatement=function(e){return this.next(),l.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement")},[]),_=(t.parseTryStatement=function(e){var t,r;return this.next(),e.block=this.parseBlock(),e.handler=null,this.type===g._catch&&(t=this.startNode(),this.next(),this.eat(g.parenL)?(t.param=this.parseBindingAtom(),r="Identifier"===t.param.type,this.enterScope(r?32:0),this.checkLValPattern(t.param,r?4:2),this.expect(g.parenR)):(this.options.ecmaVersion<10&&this.unexpected(),t.param=null,this.enterScope(0)),t.body=this.parseBlock(!1),this.exitScope(),e.handler=this.finishNode(t,"CatchClause")),e.finalizer=this.eat(g._finally)?this.parseBlock():null,e.handler||e.finalizer||this.raise(e.start,"Missing catch or finally clause"),this.finishNode(e,"TryStatement")},t.parseVarStatement=function(e,t){return this.next(),this.parseVar(e,!1,t),this.semicolon(),this.finishNode(e,"VariableDeclaration")},t.parseWhileStatement=function(e){return this.next(),e.test=this.parseParenExpression(),this.labels.push(C),e.body=this.parseStatement("while"),this.labels.pop(),this.finishNode(e,"WhileStatement")},t.parseWithStatement=function(e){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement("with"),this.finishNode(e,"WithStatement")},t.parseEmptyStatement=function(e){return this.next(),this.finishNode(e,"EmptyStatement")},t.parseLabeledStatement=function(e,t,r,i){for(var n=0,s=this.labels;n<s.length;n+=1)s[n].name===t&&this.raise(r.start,"Label '"+t+"' is already declared");for(var o=this.type.isLoop?"loop":this.type===g._switch?"switch":null,a=this.labels.length-1;0<=a;a--){var c=this.labels[a];if(c.statementStart!==e.start)break;c.statementStart=this.start,c.kind=o}return this.labels.push({name:t,kind:o,statementStart:this.start}),e.body=this.parseStatement(i?-1===i.indexOf("label")?i+"label":i:"label"),this.labels.pop(),e.label=r,this.finishNode(e,"LabeledStatement")},t.parseExpressionStatement=function(e,t){return e.expression=t,this.semicolon(),this.finishNode(e,"ExpressionStatement")},t.parseBlock=function(e,t,r){for(void 0===e&&(e=!0),(t=void 0===t?this.startNode():t).body=[],this.expect(g.braceL),e&&this.enterScope(0);this.type!==g.braceR;){var i=this.parseStatement(null);t.body.push(i)}return r&&(this.strict=!1),this.next(),e&&this.exitScope(),this.finishNode(t,"BlockStatement")},t.parseFor=function(e,t){return e.init=t,this.expect(g.semi),e.test=this.type===g.semi?null:this.parseExpression(),this.expect(g.semi),e.update=this.type===g.parenR?null:this.parseExpression(),this.expect(g.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,"ForStatement")},t.parseForIn=function(e,t){var r=this.type===g._in;return this.next(),"VariableDeclaration"===t.type&&null!=t.declarations[0].init&&(!r||this.options.ecmaVersion<8||this.strict||"var"!==t.kind||"Identifier"!==t.declarations[0].id.type)&&this.raise(t.start,(r?"for-in":"for-of")+" loop variable declaration may not have an initializer"),e.left=t,e.right=r?this.parseExpression():this.parseMaybeAssign(),this.expect(g.parenR),e.body=this.parseStatement("for"),this.exitScope(),this.labels.pop(),this.finishNode(e,r?"ForInStatement":"ForOfStatement")},t.parseVar=function(e,t,r){for(e.declarations=[],e.kind=r;;){var i=this.startNode();if(this.parseVarId(i,r),this.eat(g.eq)?i.init=this.parseMaybeAssign(t):"const"!==r||this.type===g._in||6<=this.options.ecmaVersion&&this.isContextual("of")?"Identifier"===i.id.type||t&&(this.type===g._in||this.isContextual("of"))?i.init=null:this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):this.unexpected(),e.declarations.push(this.finishNode(i,"VariableDeclarator")),!this.eat(g.comma))break}return e},t.parseVarId=function(e,t){e.id=this.parseBindingAtom(),this.checkLValPattern(e.id,"var"===t?1:2,!1)},1),ee=2;function te(e,t){var r=t.key.name,i=e[r],n="true";if("MethodDefinition"!==t.type||"get"!==t.kind&&"set"!==t.kind||(n=(t.static?"s":"i")+t.kind),"iget"===i&&"iset"===n||"iset"===i&&"iget"===n||"sget"===i&&"sset"===n||"sset"===i&&"sget"===n)e[r]="true";else{if(i)return 1;e[r]=n}}function k(e,t){var r=e.computed,e=e.key;return!r&&("Identifier"===e.type&&e.name===t||"Literal"===e.type&&e.value===t)}function F(e,t,r,i,n){this.token=e,this.isExpr=!!t,this.preserveSpace=!!r,this.override=i,this.generator=!!n}t.parseFunction=function(e,t,r,i,n){this.initFunction(e),(9<=this.options.ecmaVersion||6<=this.options.ecmaVersion&&!i)&&(this.type===g.star&&t&ee&&this.unexpected(),e.generator=this.eat(g.star)),8<=this.options.ecmaVersion&&(e.async=!!i),t&_&&(e.id=4&t&&this.type!==g.name?null:this.parseIdent(),!e.id||t&ee||this.checkLValSimple(e.id,this.strict||e.generator||e.async?this.treatFunctionsAsVar?1:2:3));var i=this.yieldPos,s=this.awaitPos,o=this.awaitIdentPos;return this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(D(e.async,e.generator)),t&_||(e.id=this.type===g.name?this.parseIdent():null),this.parseFunctionParams(e),this.parseFunctionBody(e,r,!1,n),this.yieldPos=i,this.awaitPos=s,this.awaitIdentPos=o,this.finishNode(e,t&_?"FunctionDeclaration":"FunctionExpression")},t.parseFunctionParams=function(e){this.expect(g.parenL),e.params=this.parseBindingList(g.parenR,!1,8<=this.options.ecmaVersion),this.checkYieldAwaitInDefaultParams()},t.parseClass=function(e,t){this.next();var r=this.strict,i=(this.strict=!0,this.parseClassId(e,t),this.parseClassSuper(e),this.enterClassBody()),n=this.startNode(),s=!1;for(n.body=[],this.expect(g.braceL);this.type!==g.braceR;){var o=this.parseClassElement(null!==e.superClass);o&&(n.body.push(o),"MethodDefinition"===o.type&&"constructor"===o.kind?(s&&this.raise(o.start,"Duplicate constructor in the same class"),s=!0):o.key&&"PrivateIdentifier"===o.key.type&&te(i,o)&&this.raiseRecoverable(o.key.start,"Identifier '#"+o.key.name+"' has already been declared"))}return this.strict=r,this.next(),e.body=this.finishNode(n,"ClassBody"),this.exitClassBody(),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")},t.parseClassElement=function(e){if(this.eat(g.semi))return null;var t=this.options.ecmaVersion,r=this.startNode(),i="",n=!1,s=!1,o="method",a=!1;if(this.eatContextual("static")){if(13<=t&&this.eat(g.braceL))return this.parseClassStaticBlock(r),r;this.isClassElementNameStart()||this.type===g.star?a=!0:i="static"}return r.static=a,!i&&8<=t&&this.eatContextual("async")&&(!this.isClassElementNameStart()&&this.type!==g.star||this.canInsertSemicolon()?i="async":s=!0),!i&&(9<=t||!s)&&this.eat(g.star)&&(n=!0),i||s||n||(a=this.value,(this.eatContextual("get")||this.eatContextual("set"))&&(this.isClassElementNameStart()?o=a:i=a)),i?(r.computed=!1,r.key=this.startNodeAt(this.lastTokStart,this.lastTokStartLoc),r.key.name=i,this.finishNode(r.key,"Identifier")):this.parseClassElementName(r),t<13||this.type===g.parenL||"method"!==o||n||s?(i=(a=!r.static&&k(r,"constructor"))&&e,a&&"method"!==o&&this.raise(r.key.start,"Constructor can't have get/set modifier"),r.kind=a?"constructor":o,this.parseClassMethod(r,n,s,i)):this.parseClassField(r),r},t.isClassElementNameStart=function(){return this.type===g.name||this.type===g.privateId||this.type===g.num||this.type===g.string||this.type===g.bracketL||this.type.keyword},t.parseClassElementName=function(e){this.type===g.privateId?("constructor"===this.value&&this.raise(this.start,"Classes can't have an element named '#constructor'"),e.computed=!1,e.key=this.parsePrivateIdent()):this.parsePropertyName(e)},t.parseClassMethod=function(e,t,r,i){var n=e.key,n=("constructor"===e.kind?(t&&this.raise(n.start,"Constructor can't be a generator"),r&&this.raise(n.start,"Constructor can't be an async method")):e.static&&k(e,"prototype")&&this.raise(n.start,"Classes may not have a static property named prototype"),e.value=this.parseMethod(t,r,i));return"get"===e.kind&&0!==n.params.length&&this.raiseRecoverable(n.start,"getter should have no params"),"set"===e.kind&&1!==n.params.length&&this.raiseRecoverable(n.start,"setter should have exactly one param"),"set"===e.kind&&"RestElement"===n.params[0].type&&this.raiseRecoverable(n.params[0].start,"Setter cannot use rest params"),this.finishNode(e,"MethodDefinition")},t.parseClassField=function(e){var t,r;return k(e,"constructor")?this.raise(e.key.start,"Classes can't have a field named 'constructor'"):e.static&&k(e,"prototype")&&this.raise(e.key.start,"Classes can't have a static field named 'prototype'"),this.eat(g.eq)?(r=(t=this.currentThisScope()).inClassFieldInit,t.inClassFieldInit=!0,e.value=this.parseMaybeAssign(),t.inClassFieldInit=r):e.value=null,this.semicolon(),this.finishNode(e,"PropertyDefinition")},t.parseClassStaticBlock=function(e){e.body=[];var t=this.labels;for(this.labels=[],this.enterScope(320);this.type!==g.braceR;){var r=this.parseStatement(null);e.body.push(r)}return this.next(),this.exitScope(),this.labels=t,this.finishNode(e,"StaticBlock")},t.parseClassId=function(e,t){this.type===g.name?(e.id=this.parseIdent(),t&&this.checkLValSimple(e.id,2,!1)):(!0===t&&this.unexpected(),e.id=null)},t.parseClassSuper=function(e){e.superClass=this.eat(g._extends)?this.parseExprSubscripts(null,!1):null},t.enterClassBody=function(){var e={declared:Object.create(null),used:[]};return this.privateNameStack.push(e),e.declared},t.exitClassBody=function(){for(var e=this.privateNameStack.pop(),t=e.declared,r=e.used,e=this.privateNameStack.length,i=0===e?null:this.privateNameStack[e-1],n=0;n<r.length;++n){var s=r[n];m(t,s.name)||(i?i.used.push(s):this.raiseRecoverable(s.start,"Private field '#"+s.name+"' must be declared in an enclosing class"))}},t.parseExport=function(e,t){if(this.next(),this.eat(g.star))return 11<=this.options.ecmaVersion&&(this.eatContextual("as")?(e.exported=this.parseModuleExportName(),this.checkExport(t,e.exported,this.lastTokStart)):e.exported=null),this.expectContextual("from"),this.type!==g.string&&this.unexpected(),e.source=this.parseExprAtom(),this.semicolon(),this.finishNode(e,"ExportAllDeclaration");var r,i;if(this.eat(g._default))return this.checkExport(t,"default",this.lastTokStart),this.type===g._function||(r=this.isAsyncFunction())?(i=this.startNode(),this.next(),r&&this.next(),e.declaration=this.parseFunction(i,4|_,!1,r)):this.type===g._class?(i=this.startNode(),e.declaration=this.parseClass(i,"nullableID")):(e.declaration=this.parseMaybeAssign(),this.semicolon()),this.finishNode(e,"ExportDefaultDeclaration");if(this.shouldParseExportStatement())e.declaration=this.parseStatement(null),"VariableDeclaration"===e.declaration.type?this.checkVariableExport(t,e.declaration.declarations):this.checkExport(t,e.declaration.id,e.declaration.id.start),e.specifiers=[],e.source=null;else{if(e.declaration=null,e.specifiers=this.parseExportSpecifiers(t),this.eatContextual("from"))this.type!==g.string&&this.unexpected(),e.source=this.parseExprAtom();else{for(var n=0,s=e.specifiers;n<s.length;n+=1){var o=s[n];this.checkUnreserved(o.local),this.checkLocalExport(o.local),"Literal"===o.local.type&&this.raise(o.local.start,"A string literal cannot be used as an exported binding without `from`.")}e.source=null}this.semicolon()}return this.finishNode(e,"ExportNamedDeclaration")},t.checkExport=function(e,t,r){e&&("string"!=typeof t&&(t="Identifier"===t.type?t.name:t.value),m(e,t)&&this.raiseRecoverable(r,"Duplicate export '"+t+"'"),e[t]=!0)},t.checkPatternExport=function(e,t){var r=t.type;if("Identifier"===r)this.checkExport(e,t,t.start);else if("ObjectPattern"===r)for(var i=0,n=t.properties;i<n.length;i+=1){var s=n[i];this.checkPatternExport(e,s)}else if("ArrayPattern"===r)for(var o=0,a=t.elements;o<a.length;o+=1){var c=a[o];c&&this.checkPatternExport(e,c)}else"Property"===r?this.checkPatternExport(e,t.value):"AssignmentPattern"===r?this.checkPatternExport(e,t.left):"RestElement"===r?this.checkPatternExport(e,t.argument):"ParenthesizedExpression"===r&&this.checkPatternExport(e,t.expression)},t.checkVariableExport=function(e,t){if(e)for(var r=0,i=t;r<i.length;r+=1){var n=i[r];this.checkPatternExport(e,n.id)}},t.shouldParseExportStatement=function(){return"var"===this.type.keyword||"const"===this.type.keyword||"class"===this.type.keyword||"function"===this.type.keyword||this.isLet()||this.isAsyncFunction()},t.parseExportSpecifiers=function(e){var t=[],r=!0;for(this.expect(g.braceL);!this.eat(g.braceR);){if(r)r=!1;else if(this.expect(g.comma),this.afterTrailingComma(g.braceR))break;var i=this.startNode();i.local=this.parseModuleExportName(),i.exported=this.eatContextual("as")?this.parseModuleExportName():i.local,this.checkExport(e,i.exported,i.exported.start),t.push(this.finishNode(i,"ExportSpecifier"))}return t},t.parseImport=function(e){return this.next(),this.type===g.string?(e.specifiers=Z,e.source=this.parseExprAtom()):(e.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),e.source=this.type===g.string?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(e,"ImportDeclaration")},t.parseImportSpecifiers=function(){var e=[],t=!0;if(this.type===g.name){var r=this.startNode();if(r.local=this.parseIdent(),this.checkLValSimple(r.local,2),e.push(this.finishNode(r,"ImportDefaultSpecifier")),!this.eat(g.comma))return e}if(this.type===g.star)r=this.startNode(),this.next(),this.expectContextual("as"),r.local=this.parseIdent(),this.checkLValSimple(r.local,2),e.push(this.finishNode(r,"ImportNamespaceSpecifier"));else for(this.expect(g.braceL);!this.eat(g.braceR);){if(t)t=!1;else if(this.expect(g.comma),this.afterTrailingComma(g.braceR))break;var i=this.startNode();i.imported=this.parseModuleExportName(),this.eatContextual("as")?i.local=this.parseIdent():(this.checkUnreserved(i.imported),i.local=i.imported),this.checkLValSimple(i.local,2),e.push(this.finishNode(i,"ImportSpecifier"))}return e},t.parseModuleExportName=function(){var e;return 13<=this.options.ecmaVersion&&this.type===g.string?(e=this.parseLiteral(this.value),H.test(e.value)&&this.raise(e.start,"An export name cannot include a lone surrogate."),e):this.parseIdent(!0)},t.adaptDirectivePrologue=function(e){for(var t=0;t<e.length&&this.isDirectiveCandidate(e[t]);++t)e[t].directive=e[t].expression.raw.slice(1,-1)},t.isDirectiveCandidate=function(e){return 5<=this.options.ecmaVersion&&"ExpressionStatement"===e.type&&"Literal"===e.expression.type&&"string"==typeof e.expression.value&&('"'===this.input[e.start]||"'"===this.input[e.start])};(c=A.prototype).toAssignable=function(e,t,r){if(6<=this.options.ecmaVersion&&e)switch(e.type){case"Identifier":this.inAsync&&"await"===e.name&&this.raise(e.start,"Cannot use 'await' as identifier inside an async function");break;case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":case"RestElement":break;case"ObjectExpression":e.type="ObjectPattern",r&&this.checkPatternErrors(r,!0);for(var i=0,n=e.properties;i<n.length;i+=1){var s=n[i];this.toAssignable(s,t),"RestElement"!==s.type||"ArrayPattern"!==s.argument.type&&"ObjectPattern"!==s.argument.type||this.raise(s.argument.start,"Unexpected token")}break;case"Property":"init"!==e.kind&&this.raise(e.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(e.value,t);break;case"ArrayExpression":e.type="ArrayPattern",r&&this.checkPatternErrors(r,!0),this.toAssignableList(e.elements,t);break;case"SpreadElement":e.type="RestElement",this.toAssignable(e.argument,t),"AssignmentPattern"===e.argument.type&&this.raise(e.argument.start,"Rest elements cannot have a default value");break;case"AssignmentExpression":"="!==e.operator&&this.raise(e.left.end,"Only '=' operator can be used for specifying default value."),e.type="AssignmentPattern",delete e.operator,this.toAssignable(e.left,t);break;case"ParenthesizedExpression":this.toAssignable(e.expression,t,r);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":if(!t)break;default:this.raise(e.start,"Assigning to rvalue")}else r&&this.checkPatternErrors(r,!0);return e},c.toAssignableList=function(e,t){for(var r,i=e.length,n=0;n<i;n++){var s=e[n];s&&this.toAssignable(s,t)}return i&&(r=e[i-1],6===this.options.ecmaVersion)&&t&&r&&"RestElement"===r.type&&"Identifier"!==r.argument.type&&this.unexpected(r.argument.start),e},c.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")},c.parseRestBinding=function(){var e=this.startNode();return this.next(),6===this.options.ecmaVersion&&this.type!==g.name&&this.unexpected(),e.argument=this.parseBindingAtom(),this.finishNode(e,"RestElement")},c.parseBindingAtom=function(){if(6<=this.options.ecmaVersion)switch(this.type){case g.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(g.bracketR,!0,!0),this.finishNode(e,"ArrayPattern");case g.braceL:return this.parseObj(!0)}return this.parseIdent()},c.parseBindingList=function(e,t,r){for(var i=[],n=!0;!this.eat(e);)if(n?n=!1:this.expect(g.comma),t&&this.type===g.comma)i.push(null);else{if(r&&this.afterTrailingComma(e))break;if(this.type===g.ellipsis){var s=this.parseRestBinding();this.parseBindingListItem(s),i.push(s),this.type===g.comma&&this.raise(this.start,"Comma is not permitted after the rest element"),this.expect(e);break}s=this.parseMaybeDefault(this.start,this.startLoc);this.parseBindingListItem(s),i.push(s)}return i},c.parseBindingListItem=function(e){return e},c.parseMaybeDefault=function(e,t,r){return r=r||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(g.eq)?r:((e=this.startNodeAt(e,t)).left=r,e.right=this.parseMaybeAssign(),this.finishNode(e,"AssignmentPattern"))},c.checkLValSimple=function(e,t,r){var i=0!==(t=void 0===t?0:t);switch(e.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(e.name)&&this.raiseRecoverable(e.start,(i?"Binding ":"Assigning to ")+e.name+" in strict mode"),i&&(2===t&&"let"===e.name&&this.raiseRecoverable(e.start,"let is disallowed as a lexically bound name"),r&&(m(r,e.name)&&this.raiseRecoverable(e.start,"Argument name clash"),r[e.name]=!0),5!==t)&&this.declareName(e.name,t,e.start);break;case"ChainExpression":this.raiseRecoverable(e.start,"Optional chaining cannot appear in left-hand side");break;case"MemberExpression":i&&this.raiseRecoverable(e.start,"Binding member expression");break;case"ParenthesizedExpression":return i&&this.raiseRecoverable(e.start,"Binding parenthesized expression"),this.checkLValSimple(e.expression,t,r);default:this.raise(e.start,(i?"Binding":"Assigning to")+" rvalue")}},c.checkLValPattern=function(e,t,r){switch(void 0===t&&(t=0),e.type){case"ObjectPattern":for(var i=0,n=e.properties;i<n.length;i+=1){var s=n[i];this.checkLValInnerPattern(s,t,r)}break;case"ArrayPattern":for(var o=0,a=e.elements;o<a.length;o+=1){var c=a[o];c&&this.checkLValInnerPattern(c,t,r)}break;default:this.checkLValSimple(e,t,r)}},c.checkLValInnerPattern=function(e,t,r){switch(void 0===t&&(t=0),e.type){case"Property":this.checkLValInnerPattern(e.value,t,r);break;case"AssignmentPattern":this.checkLValPattern(e.left,t,r);break;case"RestElement":this.checkLValPattern(e.argument,t,r);break;default:this.checkLValPattern(e,t,r)}};var P={b_stat:new F("{",!1),b_expr:new F("{",!0),b_tmpl:new F("${",!1),p_stat:new F("(",!1),p_expr:new F("(",!0),q_tmpl:new F("`",!0,!0,function(e){return e.tryReadTemplateToken()}),f_stat:new F("function",!1),f_expr:new F("function",!0),f_expr_gen:new F("function",!0,!1,null,!0),f_gen:new F("function",!1,!1,null,!0)};function re(e){return"MemberExpression"===e.type&&"PrivateIdentifier"===e.property.type||"ChainExpression"===e.type&&re(e.expression)}function ie(e){this.flags=e,this.var=[],this.lexical=[],this.functions=[],this.inClassFieldInit=!1}function T(e,t,r){this.type="",this.start=t,this.end=0,e.options.locations&&(this.loc=new v(e,r)),e.options.directSourceFile&&(this.sourceFile=e.options.directSourceFile),e.options.ranges&&(this.range=[t,0])}(t=A.prototype).initialContext=function(){return[P.b_stat]},t.curContext=function(){return this.context[this.context.length-1]},t.braceIsBlock=function(e){var t=this.curContext();return t===P.f_expr||t===P.f_stat||(e!==g.colon||t!==P.b_stat&&t!==P.b_expr?e===g._return||e===g.name&&this.exprAllowed?l.test(this.input.slice(this.lastTokEnd,this.start)):e===g._else||e===g.semi||e===g.eof||e===g.parenR||e===g.arrow||(e===g.braceL?t===P.b_stat:e!==g._var&&e!==g._const&&e!==g.name&&!this.exprAllowed):!t.isExpr)},t.inGeneratorContext=function(){for(var e=this.context.length-1;1<=e;e--){var t=this.context[e];if("function"===t.token)return t.generator}return!1},t.updateContext=function(e){var t,r=this.type;r.keyword&&e===g.dot?this.exprAllowed=!1:(t=r.updateContext)?t.call(this,e):this.exprAllowed=r.beforeExpr},t.overrideContext=function(e){this.curContext()!==e&&(this.context[this.context.length-1]=e)},g.parenR.updateContext=g.braceR.updateContext=function(){var e;1===this.context.length?this.exprAllowed=!0:((e=this.context.pop())===P.b_stat&&"function"===this.curContext().token&&(e=this.context.pop()),this.exprAllowed=!e.isExpr)},g.braceL.updateContext=function(e){this.context.push(this.braceIsBlock(e)?P.b_stat:P.b_expr),this.exprAllowed=!0},g.dollarBraceL.updateContext=function(){this.context.push(P.b_tmpl),this.exprAllowed=!0},g.parenL.updateContext=function(e){e=e===g._if||e===g._for||e===g._with||e===g._while;this.context.push(e?P.p_stat:P.p_expr),this.exprAllowed=!0},g.incDec.updateContext=function(){},g._function.updateContext=g._class.updateContext=function(e){!e.beforeExpr||e===g._else||e===g.semi&&this.curContext()!==P.p_stat||e===g._return&&l.test(this.input.slice(this.lastTokEnd,this.start))||(e===g.colon||e===g.braceL)&&this.curContext()===P.b_stat?this.context.push(P.f_stat):this.context.push(P.f_expr),this.exprAllowed=!1},g.backQuote.updateContext=function(){this.curContext()===P.q_tmpl?this.context.pop():this.context.push(P.q_tmpl),this.exprAllowed=!1},g.star.updateContext=function(e){e===g._function&&(e=this.context.length-1,this.context[e]===P.f_expr?this.context[e]=P.f_expr_gen:this.context[e]=P.f_gen),this.exprAllowed=!0},g.name.updateContext=function(e){var t=!1;6<=this.options.ecmaVersion&&e!==g.dot&&("of"===this.value&&!this.exprAllowed||"yield"===this.value&&this.inGeneratorContext())&&(t=!0),this.exprAllowed=t},(c=A.prototype).checkPropClash=function(e,t,r){if(!(9<=this.options.ecmaVersion&&"SpreadElement"===e.type||6<=this.options.ecmaVersion&&(e.computed||e.method||e.shorthand))){var i=e.key;switch(i.type){case"Identifier":n=i.name;break;case"Literal":n=String(i.value);break;default:return}var n,e=e.kind;6<=this.options.ecmaVersion?"__proto__"===n&&"init"===e&&(t.proto&&(r?r.doubleProto<0&&(r.doubleProto=i.start):this.raiseRecoverable(i.start,"Redefinition of __proto__ property")),t.proto=!0):((r=t[n="$"+n])?("init"===e?this.strict&&r.init||r.get||r.set:r.init||r[e])&&this.raiseRecoverable(i.start,"Redefinition of property"):r=t[n]={init:!1,get:!1,set:!1},r[e]=!0)}},c.parseExpression=function(e,t){var r=this.start,i=this.startLoc,n=this.parseMaybeAssign(e,t);if(this.type!==g.comma)return n;var s=this.startNodeAt(r,i);for(s.expressions=[n];this.eat(g.comma);)s.expressions.push(this.parseMaybeAssign(e,t));return this.finishNode(s,"SequenceExpression")},c.parseMaybeAssign=function(e,t,r){if(this.isContextual("yield")){if(this.inGenerator)return this.parseYield(e);this.exprAllowed=!1}var i=!1,n=-1,s=-1,o=-1,a=(t?(n=t.parenthesizedAssign,s=t.trailingComma,o=t.doubleProto,t.parenthesizedAssign=t.trailingComma=-1):(t=new w,i=!0),this.start),c=this.startLoc,u=(this.type!==g.parenL&&this.type!==g.name||(this.potentialArrowAt=this.start,this.potentialArrowInForAwait="await"===e),this.parseMaybeConditional(e,t));return r&&(u=r.call(this,u,a,c)),this.type.isAssign?((r=this.startNodeAt(a,c)).operator=this.value,this.type===g.eq&&(u=this.toAssignable(u,!1,t)),i||(t.parenthesizedAssign=t.trailingComma=t.doubleProto=-1),t.shorthandAssign>=u.start&&(t.shorthandAssign=-1),this.type===g.eq?this.checkLValPattern(u):this.checkLValSimple(u),r.left=u,this.next(),r.right=this.parseMaybeAssign(e),-1<o&&(t.doubleProto=o),this.finishNode(r,"AssignmentExpression")):(i&&this.checkExpressionErrors(t,!0),-1<n&&(t.parenthesizedAssign=n),-1<s&&(t.trailingComma=s),u)},c.parseMaybeConditional=function(e,t){var r=this.start,i=this.startLoc,n=this.parseExprOps(e,t);return!this.checkExpressionErrors(t)&&this.eat(g.question)?((t=this.startNodeAt(r,i)).test=n,t.consequent=this.parseMaybeAssign(),this.expect(g.colon),t.alternate=this.parseMaybeAssign(e),this.finishNode(t,"ConditionalExpression")):n},c.parseExprOps=function(e,t){var r=this.start,i=this.startLoc,n=this.parseMaybeUnary(t,!1,!1,e);return this.checkExpressionErrors(t)||n.start===r&&"ArrowFunctionExpression"===n.type?n:this.parseExprOp(n,r,i,-1,e)},c.parseExprOp=function(e,t,r,i,n){var s,o,a,c,u,h=this.type.binop;if(null!=h&&(!n||this.type!==g._in)&&i<h)return s=this.type===g.logicalOR||this.type===g.logicalAND,(o=this.type===g.coalesce)&&(h=g.logicalAND.binop),a=this.value,this.next(),c=this.start,u=this.startLoc,c=this.parseExprOp(this.parseMaybeUnary(null,!1,!1,n),c,u,h,n),u=this.buildBinary(t,r,e,c,a,s||o),(s&&this.type===g.coalesce||o&&(this.type===g.logicalOR||this.type===g.logicalAND))&&this.raiseRecoverable(this.start,"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),this.parseExprOp(u,t,r,i,n);return e},c.buildBinary=function(e,t,r,i,n,s){"PrivateIdentifier"===i.type&&this.raise(i.start,"Private identifier can only be left side of binary expression");e=this.startNodeAt(e,t);return e.left=r,e.operator=n,e.right=i,this.finishNode(e,s?"LogicalExpression":"BinaryExpression")},c.parseMaybeUnary=function(e,t,r,i){var n,s=this.start,o=this.startLoc;if(this.isContextual("await")&&this.canAwait)n=this.parseAwait(i),t=!0;else if(this.type.prefix){var a=this.startNode(),c=this.type===g.incDec;a.operator=this.value,a.prefix=!0,this.next(),a.argument=this.parseMaybeUnary(null,!0,c,i),this.checkExpressionErrors(e,!0),c?this.checkLValSimple(a.argument):this.strict&&"delete"===a.operator&&"Identifier"===a.argument.type?this.raiseRecoverable(a.start,"Deleting local variable in strict mode"):"delete"===a.operator&&re(a.argument)?this.raiseRecoverable(a.start,"Private fields can not be deleted"):t=!0,n=this.finishNode(a,c?"UpdateExpression":"UnaryExpression")}else if(t||this.type!==g.privateId){if(n=this.parseExprSubscripts(e,i),this.checkExpressionErrors(e))return n;for(;this.type.postfix&&!this.canInsertSemicolon();){var u=this.startNodeAt(s,o);u.operator=this.value,u.prefix=!1,u.argument=n,this.checkLValSimple(n),this.next(),n=this.finishNode(u,"UpdateExpression")}}else!i&&0!==this.privateNameStack.length||this.unexpected(),n=this.parsePrivateIdent(),this.type!==g._in&&this.unexpected();return r||!this.eat(g.starstar)?n:t?void this.unexpected(this.lastTokStart):this.buildBinary(s,o,n,this.parseMaybeUnary(null,!1,!1,i),"**",!1)},c.parseExprSubscripts=function(e,t){var r=this.start,i=this.startLoc,n=this.parseExprAtom(e,t);return"ArrowFunctionExpression"===n.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd)||(n=this.parseSubscripts(n,r,i,!1,t),e&&"MemberExpression"===n.type&&(e.parenthesizedAssign>=n.start&&(e.parenthesizedAssign=-1),e.parenthesizedBind>=n.start&&(e.parenthesizedBind=-1),e.trailingComma>=n.start)&&(e.trailingComma=-1)),n},c.parseSubscripts=function(e,t,r,i,n){for(var s=8<=this.options.ecmaVersion&&"Identifier"===e.type&&"async"===e.name&&this.lastTokEnd===e.end&&!this.canInsertSemicolon()&&e.end-e.start==5&&this.potentialArrowAt===e.start,o=!1;;){var a,c=this.parseSubscript(e,t,r,i,s,o,n);if(c.optional&&(o=!0),c===e||"ArrowFunctionExpression"===c.type)return o&&((a=this.startNodeAt(t,r)).expression=c,c=this.finishNode(a,"ChainExpression")),c;e=c}},c.parseSubscript=function(e,t,r,i,n,s,o){var a=11<=this.options.ecmaVersion,c=a&&this.eat(g.questionDot),u=(i&&c&&this.raise(this.lastTokStart,"Optional chaining cannot appear in the callee of new expressions"),this.eat(g.bracketL));if(u||c&&this.type!==g.parenL&&this.type!==g.backQuote||this.eat(g.dot)){var h=this.startNodeAt(t,r);h.object=e,u?(h.property=this.parseExpression(),this.expect(g.bracketR)):this.type===g.privateId&&"Super"!==e.type?h.property=this.parsePrivateIdent():h.property=this.parseIdent("never"!==this.options.allowReserved),h.computed=!!u,a&&(h.optional=c),e=this.finishNode(h,"MemberExpression")}else if(!i&&this.eat(g.parenL)){var u=new w,h=this.yieldPos,i=this.awaitPos,l=this.awaitIdentPos,p=(this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.parseExprList(g.parenR,8<=this.options.ecmaVersion,!1,u));if(n&&!c&&!this.canInsertSemicolon()&&this.eat(g.arrow))return this.checkPatternErrors(u,!1),this.checkYieldAwaitInDefaultParams(),0<this.awaitIdentPos&&this.raise(this.awaitIdentPos,"Cannot use 'await' as identifier inside an async function"),this.yieldPos=h,this.awaitPos=i,this.awaitIdentPos=l,this.parseArrowExpression(this.startNodeAt(t,r),p,!0,o);this.checkExpressionErrors(u,!0),this.yieldPos=h||this.yieldPos,this.awaitPos=i||this.awaitPos,this.awaitIdentPos=l||this.awaitIdentPos;n=this.startNodeAt(t,r);n.callee=e,n.arguments=p,a&&(n.optional=c),e=this.finishNode(n,"CallExpression")}else this.type===g.backQuote&&((c||s)&&this.raise(this.start,"Optional chaining cannot appear in the tag of tagged template expressions"),(o=this.startNodeAt(t,r)).tag=e,o.quasi=this.parseTemplate({isTagged:!0}),e=this.finishNode(o,"TaggedTemplateExpression"));return e},c.parseExprAtom=function(e,t){this.type===g.slash&&this.readRegexp();var r=this.potentialArrowAt===this.start;switch(this.type){case g._super:return this.allowSuper||this.raise(this.start,"'super' keyword outside a method"),a=this.startNode(),this.next(),this.type!==g.parenL||this.allowDirectSuper||this.raise(a.start,"super() call outside constructor of a subclass"),this.type!==g.dot&&this.type!==g.bracketL&&this.type!==g.parenL&&this.unexpected(),this.finishNode(a,"Super");case g._this:return a=this.startNode(),this.next(),this.finishNode(a,"ThisExpression");case g.name:var i=this.start,n=this.startLoc,s=this.containsEsc,o=this.parseIdent(!1);if(8<=this.options.ecmaVersion&&!s&&"async"===o.name&&!this.canInsertSemicolon()&&this.eat(g._function))return this.overrideContext(P.f_expr),this.parseFunction(this.startNodeAt(i,n),0,!1,!0,t);if(r&&!this.canInsertSemicolon()){if(this.eat(g.arrow))return this.parseArrowExpression(this.startNodeAt(i,n),[o],!1,t);if(8<=this.options.ecmaVersion&&"async"===o.name&&this.type===g.name&&!s&&(!this.potentialArrowInForAwait||"of"!==this.value||this.containsEsc))return o=this.parseIdent(!1),!this.canInsertSemicolon()&&this.eat(g.arrow)||this.unexpected(),this.parseArrowExpression(this.startNodeAt(i,n),[o],!0,t)}return o;case g.regexp:var a,s=this.value;return(a=this.parseLiteral(s.value)).regex={pattern:s.pattern,flags:s.flags},a;case g.num:case g.string:return this.parseLiteral(this.value);case g._null:case g._true:case g._false:return(a=this.startNode()).value=this.type===g._null?null:this.type===g._true,a.raw=this.type.keyword,this.next(),this.finishNode(a,"Literal");case g.parenL:i=this.start,n=this.parseParenAndDistinguishExpression(r,t);return e&&(e.parenthesizedAssign<0&&!this.isSimpleAssignTarget(n)&&(e.parenthesizedAssign=i),e.parenthesizedBind<0)&&(e.parenthesizedBind=i),n;case g.bracketL:return a=this.startNode(),this.next(),a.elements=this.parseExprList(g.bracketR,!0,!0,e),this.finishNode(a,"ArrayExpression");case g.braceL:return this.overrideContext(P.b_expr),this.parseObj(!1,e);case g._function:return a=this.startNode(),this.next(),this.parseFunction(a,0);case g._class:return this.parseClass(this.startNode(),!1);case g._new:return this.parseNew();case g.backQuote:return this.parseTemplate();case g._import:return 11<=this.options.ecmaVersion?this.parseExprImport():this.unexpected();default:this.unexpected()}},c.parseExprImport=function(){var e=this.startNode(),t=(this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword import"),this.parseIdent(!0));switch(this.type){case g.parenL:return this.parseDynamicImport(e);case g.dot:return e.meta=t,this.parseImportMeta(e);default:this.unexpected()}},c.parseDynamicImport=function(e){var t;return this.next(),e.source=this.parseMaybeAssign(),this.eat(g.parenR)||(t=this.start,this.eat(g.comma)&&this.eat(g.parenR)?this.raiseRecoverable(t,"Trailing comma is not allowed in import()"):this.unexpected(t)),this.finishNode(e,"ImportExpression")},c.parseImportMeta=function(e){this.next();var t=this.containsEsc;return e.property=this.parseIdent(!0),"meta"!==e.property.name&&this.raiseRecoverable(e.property.start,"The only valid meta property for import is 'import.meta'"),t&&this.raiseRecoverable(e.start,"'import.meta' must not contain escaped characters"),"module"===this.options.sourceType||this.options.allowImportExportEverywhere||this.raiseRecoverable(e.start,"Cannot use 'import.meta' outside a module"),this.finishNode(e,"MetaProperty")},c.parseLiteral=function(e){var t=this.startNode();return t.value=e,t.raw=this.input.slice(this.start,this.end),110===t.raw.charCodeAt(t.raw.length-1)&&(t.bigint=t.raw.slice(0,-1).replace(/_/g,"")),this.next(),this.finishNode(t,"Literal")},c.parseParenExpression=function(){this.expect(g.parenL);var e=this.parseExpression();return this.expect(g.parenR),e},c.parseParenAndDistinguishExpression=function(e,t){var r,i=this.start,n=this.startLoc,s=8<=this.options.ecmaVersion;if(6<=this.options.ecmaVersion){this.next();var o,a=this.start,c=this.startLoc,u=[],h=!0,l=!1,p=new w,f=this.yieldPos,d=this.awaitPos;for(this.yieldPos=0,this.awaitPos=0;this.type!==g.parenR;){if(h?h=!1:this.expect(g.comma),s&&this.afterTrailingComma(g.parenR,!0)){l=!0;break}if(this.type===g.ellipsis){o=this.start,u.push(this.parseParenItem(this.parseRestBinding())),this.type===g.comma&&this.raise(this.start,"Comma is not permitted after the rest element");break}u.push(this.parseMaybeAssign(!1,p,this.parseParenItem))}var m=this.lastTokEnd,y=this.lastTokEndLoc;if(this.expect(g.parenR),e&&!this.canInsertSemicolon()&&this.eat(g.arrow))return this.checkPatternErrors(p,!1),this.checkYieldAwaitInDefaultParams(),this.yieldPos=f,this.awaitPos=d,this.parseParenArrowList(i,n,u,t);u.length&&!l||this.unexpected(this.lastTokStart),o&&this.unexpected(o),this.checkExpressionErrors(p,!0),this.yieldPos=f||this.yieldPos,this.awaitPos=d||this.awaitPos,1<u.length?((r=this.startNodeAt(a,c)).expressions=u,this.finishNodeAt(r,"SequenceExpression",m,y)):r=u[0]}else r=this.parseParenExpression();return this.options.preserveParens?((e=this.startNodeAt(i,n)).expression=r,this.finishNode(e,"ParenthesizedExpression")):r},c.parseParenItem=function(e){return e},c.parseParenArrowList=function(e,t,r,i){return this.parseArrowExpression(this.startNodeAt(e,t),r,!1,i)};var ne=[];function se(e,t,r,i){return e.type=t,e.end=r,this.options.locations&&(e.loc.end=i),this.options.ranges&&(e.range[1]=r),e}c.parseNew=function(){this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword new");var e,t,r=this.startNode(),i=this.parseIdent(!0);return 6<=this.options.ecmaVersion&&this.eat(g.dot)?(r.meta=i,i=this.containsEsc,r.property=this.parseIdent(!0),"target"!==r.property.name&&this.raiseRecoverable(r.property.start,"The only valid meta property for new is 'new.target'"),i&&this.raiseRecoverable(r.start,"'new.target' must not contain escaped characters"),this.allowNewDotTarget||this.raiseRecoverable(r.start,"'new.target' can only be used in functions and class static block"),this.finishNode(r,"MetaProperty")):(i=this.start,e=this.startLoc,t=this.type===g._import,r.callee=this.parseSubscripts(this.parseExprAtom(),i,e,!0,!1),t&&"ImportExpression"===r.callee.type&&this.raise(i,"Cannot use new with import()"),this.eat(g.parenL)?r.arguments=this.parseExprList(g.parenR,8<=this.options.ecmaVersion,!1):r.arguments=ne,this.finishNode(r,"NewExpression"))},c.parseTemplateElement=function(e){var e=e.isTagged,t=this.startNode();return this.type===g.invalidTemplate?(e||this.raiseRecoverable(this.start,"Bad escape sequence in untagged template literal"),t.value={raw:this.value,cooked:null}):t.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value},this.next(),t.tail=this.type===g.backQuote,this.finishNode(t,"TemplateElement")},c.parseTemplate=function(e){var t=(e=void 0===e?{}:e).isTagged,r=(void 0===t&&(t=!1),this.startNode()),i=(this.next(),r.expressions=[],this.parseTemplateElement({isTagged:t}));for(r.quasis=[i];!i.tail;)this.type===g.eof&&this.raise(this.pos,"Unterminated template literal"),this.expect(g.dollarBraceL),r.expressions.push(this.parseExpression()),this.expect(g.braceR),r.quasis.push(i=this.parseTemplateElement({isTagged:t}));return this.next(),this.finishNode(r,"TemplateLiteral")},c.isAsyncProp=function(e){return!e.computed&&"Identifier"===e.key.type&&"async"===e.key.name&&(this.type===g.name||this.type===g.num||this.type===g.string||this.type===g.bracketL||this.type.keyword||9<=this.options.ecmaVersion&&this.type===g.star)&&!l.test(this.input.slice(this.lastTokEnd,this.start))},c.parseObj=function(e,t){var r=this.startNode(),i=!0,n={};for(r.properties=[],this.next();!this.eat(g.braceR);){if(i)i=!1;else if(this.expect(g.comma),5<=this.options.ecmaVersion&&this.afterTrailingComma(g.braceR))break;var s=this.parseProperty(e,t);e||this.checkPropClash(s,n,t),r.properties.push(s)}return this.finishNode(r,e?"ObjectPattern":"ObjectExpression")},c.parseProperty=function(e,t){var r,i,n,s,o=this.startNode();if(9<=this.options.ecmaVersion&&this.eat(g.ellipsis))return e?(o.argument=this.parseIdent(!1),this.type===g.comma&&this.raise(this.start,"Comma is not permitted after the rest element"),this.finishNode(o,"RestElement")):(o.argument=this.parseMaybeAssign(!1,t),this.type===g.comma&&t&&t.trailingComma<0&&(t.trailingComma=this.start),this.finishNode(o,"SpreadElement"));6<=this.options.ecmaVersion&&(o.method=!1,o.shorthand=!1,(e||t)&&(n=this.start,s=this.startLoc),e||(r=this.eat(g.star)));var a=this.containsEsc;return this.parsePropertyName(o),!e&&!a&&8<=this.options.ecmaVersion&&!r&&this.isAsyncProp(o)?(i=!0,r=9<=this.options.ecmaVersion&&this.eat(g.star),this.parsePropertyName(o)):i=!1,this.parsePropertyValue(o,e,r,i,n,s,t,a),this.finishNode(o,"Property")},c.parsePropertyValue=function(e,t,r,i,n,s,o,a){(r||i)&&this.type===g.colon&&this.unexpected(),this.eat(g.colon)?(e.value=t?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,o),e.kind="init"):6<=this.options.ecmaVersion&&this.type===g.parenL?(t&&this.unexpected(),e.kind="init",e.method=!0,e.value=this.parseMethod(r,i)):t||a||!(5<=this.options.ecmaVersion)||e.computed||"Identifier"!==e.key.type||"get"!==e.key.name&&"set"!==e.key.name||this.type===g.comma||this.type===g.braceR||this.type===g.eq?6<=this.options.ecmaVersion&&!e.computed&&"Identifier"===e.key.type?((r||i)&&this.unexpected(),this.checkUnreserved(e.key),"await"!==e.key.name||this.awaitIdentPos||(this.awaitIdentPos=n),e.kind="init",t?e.value=this.parseMaybeDefault(n,s,this.copyNode(e.key)):this.type===g.eq&&o?(o.shorthandAssign<0&&(o.shorthandAssign=this.start),e.value=this.parseMaybeDefault(n,s,this.copyNode(e.key))):e.value=this.copyNode(e.key),e.shorthand=!0):this.unexpected():((r||i)&&this.unexpected(),e.kind=e.key.name,this.parsePropertyName(e),e.value=this.parseMethod(!1),a="get"===e.kind?0:1,e.value.params.length!==a?(t=e.value.start,"get"===e.kind?this.raiseRecoverable(t,"getter should have no params"):this.raiseRecoverable(t,"setter should have exactly one param")):"set"===e.kind&&"RestElement"===e.value.params[0].type&&this.raiseRecoverable(e.value.params[0].start,"Setter cannot use rest params"))},c.parsePropertyName=function(e){if(6<=this.options.ecmaVersion){if(this.eat(g.bracketL))return e.computed=!0,e.key=this.parseMaybeAssign(),this.expect(g.bracketR),e.key;e.computed=!1}return e.key=this.type===g.num||this.type===g.string?this.parseExprAtom():this.parseIdent("never"!==this.options.allowReserved)},c.initFunction=function(e){e.id=null,6<=this.options.ecmaVersion&&(e.generator=e.expression=!1),8<=this.options.ecmaVersion&&(e.async=!1)},c.parseMethod=function(e,t,r){var i=this.startNode(),n=this.yieldPos,s=this.awaitPos,o=this.awaitIdentPos;return this.initFunction(i),6<=this.options.ecmaVersion&&(i.generator=e),8<=this.options.ecmaVersion&&(i.async=!!t),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,this.enterScope(64|D(t,i.generator)|(r?128:0)),this.expect(g.parenL),i.params=this.parseBindingList(g.parenR,!1,8<=this.options.ecmaVersion),this.checkYieldAwaitInDefaultParams(),this.parseFunctionBody(i,!1,!0,!1),this.yieldPos=n,this.awaitPos=s,this.awaitIdentPos=o,this.finishNode(i,"FunctionExpression")},c.parseArrowExpression=function(e,t,r,i){var n=this.yieldPos,s=this.awaitPos,o=this.awaitIdentPos;return this.enterScope(16|D(r,!1)),this.initFunction(e),8<=this.options.ecmaVersion&&(e.async=!!r),this.yieldPos=0,this.awaitPos=0,this.awaitIdentPos=0,e.params=this.toAssignableList(t,!0),this.parseFunctionBody(e,!0,!1,i),this.yieldPos=n,this.awaitPos=s,this.awaitIdentPos=o,this.finishNode(e,"ArrowFunctionExpression")},c.parseFunctionBody=function(e,t,r,i){var n=t&&this.type!==g.braceL,s=this.strict,o=!1;n?(e.body=this.parseMaybeAssign(i),e.expression=!0,this.checkParams(e,!1)):(n=7<=this.options.ecmaVersion&&!this.isSimpleParamList(e.params),s&&!n||(o=this.strictDirective(this.end))&&n&&this.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"),i=this.labels,this.labels=[],o&&(this.strict=!0),this.checkParams(e,!s&&!o&&!t&&!r&&this.isSimpleParamList(e.params)),this.strict&&e.id&&this.checkLValSimple(e.id,5),e.body=this.parseBlock(!1,void 0,o&&!s),e.expression=!1,this.adaptDirectivePrologue(e.body.body),this.labels=i),this.exitScope()},c.isSimpleParamList=function(e){for(var t=0,r=e;t<r.length;t+=1)if("Identifier"!==r[t].type)return!1;return!0},c.checkParams=function(e,t){for(var r=Object.create(null),i=0,n=e.params;i<n.length;i+=1){var s=n[i];this.checkLValInnerPattern(s,1,t?null:r)}},c.parseExprList=function(e,t,r,i){for(var n=[],s=!0;!this.eat(e);){if(s)s=!1;else if(this.expect(g.comma),t&&this.afterTrailingComma(e))break;var o=void 0;r&&this.type===g.comma?o=null:this.type===g.ellipsis?(o=this.parseSpread(i),i&&this.type===g.comma&&i.trailingComma<0&&(i.trailingComma=this.start)):o=this.parseMaybeAssign(!1,i),n.push(o)}return n},c.checkUnreserved=function(e){var t=e.start,r=e.end,e=e.name;this.inGenerator&&"yield"===e&&this.raiseRecoverable(t,"Cannot use 'yield' as identifier inside a generator"),this.inAsync&&"await"===e&&this.raiseRecoverable(t,"Cannot use 'await' as identifier inside an async function"),this.currentThisScope().inClassFieldInit&&"arguments"===e&&this.raiseRecoverable(t,"Cannot use 'arguments' in class field initializer"),!this.inClassStaticBlock||"arguments"!==e&&"await"!==e||this.raise(t,"Cannot use "+e+" in class static initialization block"),this.keywords.test(e)&&this.raise(t,"Unexpected keyword '"+e+"'"),this.options.ecmaVersion<6&&-1!==this.input.slice(t,r).indexOf("\\")||(this.strict?this.reservedWordsStrict:this.reservedWords).test(e)&&(this.inAsync||"await"!==e||this.raiseRecoverable(t,"Cannot use keyword 'await' outside an async function"),this.raiseRecoverable(t,"The keyword '"+e+"' is reserved"))},c.parseIdent=function(e){var t=this.startNode();return this.type===g.name?t.name=this.value:this.type.keyword?(t.name=this.type.keyword,"class"!==t.name&&"function"!==t.name||this.lastTokEnd===this.lastTokStart+1&&46===this.input.charCodeAt(this.lastTokStart)||this.context.pop()):this.unexpected(),this.next(!!e),this.finishNode(t,"Identifier"),e||(this.checkUnreserved(t),"await"!==t.name)||this.awaitIdentPos||(this.awaitIdentPos=t.start),t},c.parsePrivateIdent=function(){var e=this.startNode();return this.type===g.privateId?e.name=this.value:this.unexpected(),this.next(),this.finishNode(e,"PrivateIdentifier"),0===this.privateNameStack.length?this.raise(e.start,"Private field '#"+e.name+"' must be declared in an enclosing class"):this.privateNameStack[this.privateNameStack.length-1].used.push(e),e},c.parseYield=function(e){this.yieldPos||(this.yieldPos=this.start);var t=this.startNode();return this.next(),this.type===g.semi||this.canInsertSemicolon()||this.type!==g.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(g.star),t.argument=this.parseMaybeAssign(e)),this.finishNode(t,"YieldExpression")},c.parseAwait=function(e){this.awaitPos||(this.awaitPos=this.start);var t=this.startNode();return this.next(),t.argument=this.parseMaybeUnary(null,!0,!1,e),this.finishNode(t,"AwaitExpression")},(t=A.prototype).raise=function(e,t){var r=b(this.input,e),t=(t+=" ("+r.line+":"+r.column+")",new SyntaxError(t));throw t.pos=e,t.loc=r,t.raisedAt=this.pos,t},t.raiseRecoverable=t.raise,t.curPosition=function(){if(this.options.locations)return new E(this.curLine,this.pos-this.lineStart)},(c=A.prototype).enterScope=function(e){this.scopeStack.push(new ie(e))},c.exitScope=function(){this.scopeStack.pop()},c.treatFunctionsAsVarInScope=function(e){return 2&e.flags||!this.inModule&&1&e.flags},c.declareName=function(e,t,r){var i=!1;if(2===t){var n=this.currentScope(),i=-1<n.lexical.indexOf(e)||-1<n.functions.indexOf(e)||-1<n.var.indexOf(e);n.lexical.push(e),this.inModule&&1&n.flags&&delete this.undefinedExports[e]}else if(4===t)this.currentScope().lexical.push(e);else if(3===t){n=this.currentScope();i=this.treatFunctionsAsVar?-1<n.lexical.indexOf(e):-1<n.lexical.indexOf(e)||-1<n.var.indexOf(e),n.functions.push(e)}else for(var s=this.scopeStack.length-1;0<=s;--s){var o=this.scopeStack[s];if(-1<o.lexical.indexOf(e)&&!(32&o.flags&&o.lexical[0]===e)||!this.treatFunctionsAsVarInScope(o)&&-1<o.functions.indexOf(e)){i=!0;break}if(o.var.push(e),this.inModule&&1&o.flags&&delete this.undefinedExports[e],259&o.flags)break}i&&this.raiseRecoverable(r,"Identifier '"+e+"' has already been declared")},c.checkLocalExport=function(e){-1===this.scopeStack[0].lexical.indexOf(e.name)&&-1===this.scopeStack[0].var.indexOf(e.name)&&(this.undefinedExports[e.name]=e)},c.currentScope=function(){return this.scopeStack[this.scopeStack.length-1]},c.currentVarScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(259&t.flags)return t}},c.currentThisScope=function(){for(var e=this.scopeStack.length-1;;e--){var t=this.scopeStack[e];if(259&t.flags&&!(16&t.flags))return t}},(t=A.prototype).startNode=function(){return new T(this,this.start,this.startLoc)},t.startNodeAt=function(e,t){return new T(this,e,t)},t.finishNode=function(e,t){return se.call(this,e,t,this.lastTokEnd,this.lastTokEndLoc)},t.finishNodeAt=function(e,t,r,i){return se.call(this,e,t,r,i)},t.copyNode=function(e){var t,r=new T(this,e.start,this.startLoc);for(t in e)r[t]=e[t];return r};var oe={9:c="ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",10:t=c+" Extended_Pictographic",11:t,12:R=t+" EBase EComp EMod EPres ExtPict",13:R,14:R},ae="Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",ce=(R=(t=(c="Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb")+" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd")+" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho")+" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",ue=ce+" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",he={9:c,10:t,11:R,12:ce,13:ue,14:ue+" Kawi Nag_Mundari Nagm"},le={};function pe(e){e=le[e]={binary:y(oe[e]+" "+ae),nonBinary:{General_Category:y(ae),Script:y(he[e])}};e.nonBinary.Script_Extensions=e.nonBinary.Script,e.nonBinary.gc=e.nonBinary.General_Category,e.nonBinary.sc=e.nonBinary.Script,e.nonBinary.scx=e.nonBinary.Script_Extensions}for(var fe=0,de=[9,10,11,12,13,14];fe<de.length;fe+=1)pe(de[fe]);function I(e){this.parser=e,this.validFlags="gim"+(6<=e.options.ecmaVersion?"uy":"")+(9<=e.options.ecmaVersion?"s":"")+(13<=e.options.ecmaVersion?"d":""),this.unicodeProperties=le[14<=e.options.ecmaVersion?14:e.options.ecmaVersion],this.source="",this.flags="",this.start=0,this.switchU=!1,this.switchN=!1,this.pos=0,this.lastIntValue=0,this.lastStringValue="",this.lastAssertionIsQuantifiable=!1,this.numCapturingParens=0,this.maxBackReference=0,this.groupNames=[],this.backReferenceNames=[]}function me(e){return 36===e||40<=e&&e<=43||46===e||63===e||91<=e&&e<=94||123<=e&&e<=125}function ye(e){return o(e,!0)||36===e||95===e}function ge(e){return a(e,!0)||36===e||95===e||8204===e||8205===e}function xe(e){return 65<=e&&e<=90||97<=e&&e<=122}function Ee(e){return 0<=e&&e<=1114111}function ve(e){return 100===e||68===e||115===e||83===e||119===e||87===e}function be(e){return xe(e)||95===e}function Se(e){return be(e)||O(e)}function O(e){return 48<=e&&e<=57}function De(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Ae(e){return 65<=e&&e<=70?e-65+10:97<=e&&e<=102?e-97+10:e-48}function we(e){return 48<=e&&e<=55}function N(e){this.type=e.type,this.value=e.value,this.start=e.start,this.end=e.end,e.options.locations&&(this.loc=new v(e,e.startLoc,e.endLoc)),e.options.ranges&&(this.range=[e.start,e.end])}function Ce(e,t){return t?parseInt(e,8):parseFloat(e.replace(/_/g,""))}function _e(e){return"function"!=typeof BigInt?null:BigInt(e.replace(/_/g,""))}c=A.prototype,I.prototype.reset=function(e,t,r){var i=-1!==r.indexOf("u");this.start=0|e,this.source=t+"",this.flags=r,this.switchU=i&&6<=this.parser.options.ecmaVersion,this.switchN=i&&9<=this.parser.options.ecmaVersion},I.prototype.raise=function(e){this.parser.raiseRecoverable(this.start,"Invalid regular expression: /"+this.source+"/: "+e)},I.prototype.at=function(e,t){void 0===t&&(t=!1);var r,i=this.source,n=i.length;return n<=e?-1:(r=i.charCodeAt(e),!(!t&&!this.switchU||r<=55295||57344<=r||n<=e+1)&&56320<=(t=i.charCodeAt(e+1))&&t<=57343?(r<<10)+t-56613888:r)},I.prototype.nextIndex=function(e,t){void 0===t&&(t=!1);var r,i=this.source,n=i.length;return n<=e?n:(r=i.charCodeAt(e),!t&&!this.switchU||r<=55295||57344<=r||n<=e+1||(t=i.charCodeAt(e+1))<56320||57343<t?e+1:e+2)},I.prototype.current=function(e){return this.at(this.pos,e=void 0===e?!1:e)},I.prototype.lookahead=function(e){return this.at(this.nextIndex(this.pos,e=void 0===e?!1:e),e)},I.prototype.advance=function(e){this.pos=this.nextIndex(this.pos,e=void 0===e?!1:e)},I.prototype.eat=function(e,t){return this.current(t=void 0===t?!1:t)===e&&(this.advance(t),!0)},c.validateRegExpFlags=function(e){for(var t=e.validFlags,r=e.flags,i=0;i<r.length;i++){var n=r.charAt(i);-1===t.indexOf(n)&&this.raise(e.start,"Invalid regular expression flag"),-1<r.indexOf(n,i+1)&&this.raise(e.start,"Duplicate regular expression flag")}},c.validateRegExpPattern=function(e){this.regexp_pattern(e),!e.switchN&&9<=this.options.ecmaVersion&&0<e.groupNames.length&&(e.switchN=!0,this.regexp_pattern(e))},c.regexp_pattern=function(e){e.pos=0,e.lastIntValue=0,e.lastStringValue="",e.lastAssertionIsQuantifiable=!1,e.numCapturingParens=0,e.maxBackReference=0,e.groupNames.length=0,e.backReferenceNames.length=0,this.regexp_disjunction(e),e.pos!==e.source.length&&(e.eat(41)&&e.raise("Unmatched ')'"),e.eat(93)||e.eat(125))&&e.raise("Lone quantifier brackets"),e.maxBackReference>e.numCapturingParens&&e.raise("Invalid escape");for(var t=0,r=e.backReferenceNames;t<r.length;t+=1){var i=r[t];-1===e.groupNames.indexOf(i)&&e.raise("Invalid named capture referenced")}},c.regexp_disjunction=function(e){for(this.regexp_alternative(e);e.eat(124);)this.regexp_alternative(e);this.regexp_eatQuantifier(e,!0)&&e.raise("Nothing to repeat"),e.eat(123)&&e.raise("Lone quantifier brackets")},c.regexp_alternative=function(e){for(;e.pos<e.source.length&&this.regexp_eatTerm(e););},c.regexp_eatTerm=function(e){return this.regexp_eatAssertion(e)?(e.lastAssertionIsQuantifiable&&this.regexp_eatQuantifier(e)&&e.switchU&&e.raise("Invalid quantifier"),!0):!(e.switchU?!this.regexp_eatAtom(e):!this.regexp_eatExtendedAtom(e))&&(this.regexp_eatQuantifier(e),!0)},c.regexp_eatAssertion=function(e){var t=e.pos;if(e.lastAssertionIsQuantifiable=!1,e.eat(94)||e.eat(36))return!0;if(e.eat(92)){if(e.eat(66)||e.eat(98))return!0;e.pos=t}if(e.eat(40)&&e.eat(63)){var r=!1;if(9<=this.options.ecmaVersion&&(r=e.eat(60)),e.eat(61)||e.eat(33))return this.regexp_disjunction(e),e.eat(41)||e.raise("Unterminated group"),e.lastAssertionIsQuantifiable=!r,!0}return e.pos=t,!1},c.regexp_eatQuantifier=function(e,t){return!!this.regexp_eatQuantifierPrefix(e,t=void 0===t?!1:t)&&(e.eat(63),!0)},c.regexp_eatQuantifierPrefix=function(e,t){return e.eat(42)||e.eat(43)||e.eat(63)||this.regexp_eatBracedQuantifier(e,t)},c.regexp_eatBracedQuantifier=function(e,t){var r=e.pos;if(e.eat(123)){var i,n=-1;if(this.regexp_eatDecimalDigits(e)&&(i=e.lastIntValue,e.eat(44)&&this.regexp_eatDecimalDigits(e)&&(n=e.lastIntValue),e.eat(125)))return-1!==n&&n<i&&!t&&e.raise("numbers out of order in {} quantifier"),!0;e.switchU&&!t&&e.raise("Incomplete quantifier"),e.pos=r}return!1},c.regexp_eatAtom=function(e){return this.regexp_eatPatternCharacters(e)||e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)},c.regexp_eatReverseSolidusAtomEscape=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatAtomEscape(e))return!0;e.pos=t}return!1},c.regexp_eatUncapturingGroup=function(e){var t=e.pos;if(e.eat(40)){if(e.eat(63)&&e.eat(58)){if(this.regexp_disjunction(e),e.eat(41))return!0;e.raise("Unterminated group")}e.pos=t}return!1},c.regexp_eatCapturingGroup=function(e){if(e.eat(40)){if(9<=this.options.ecmaVersion?this.regexp_groupSpecifier(e):63===e.current()&&e.raise("Invalid group"),this.regexp_disjunction(e),e.eat(41))return e.numCapturingParens+=1,!0;e.raise("Unterminated group")}return!1},c.regexp_eatExtendedAtom=function(e){return e.eat(46)||this.regexp_eatReverseSolidusAtomEscape(e)||this.regexp_eatCharacterClass(e)||this.regexp_eatUncapturingGroup(e)||this.regexp_eatCapturingGroup(e)||this.regexp_eatInvalidBracedQuantifier(e)||this.regexp_eatExtendedPatternCharacter(e)},c.regexp_eatInvalidBracedQuantifier=function(e){return this.regexp_eatBracedQuantifier(e,!0)&&e.raise("Nothing to repeat"),!1},c.regexp_eatSyntaxCharacter=function(e){var t=e.current();return!!me(t)&&(e.lastIntValue=t,e.advance(),!0)},c.regexp_eatPatternCharacters=function(e){for(var t,r=e.pos;-1!==(t=e.current())&&!me(t);)e.advance();return e.pos!==r},c.regexp_eatExtendedPatternCharacter=function(e){var t=e.current();return!(-1===t||36===t||40<=t&&t<=43||46===t||63===t||91===t||94===t||124===t||(e.advance(),0))},c.regexp_groupSpecifier=function(e){e.eat(63)&&(this.regexp_eatGroupName(e)?(-1!==e.groupNames.indexOf(e.lastStringValue)&&e.raise("Duplicate capture group name"),e.groupNames.push(e.lastStringValue)):e.raise("Invalid group"))},c.regexp_eatGroupName=function(e){if(e.lastStringValue="",e.eat(60)){if(this.regexp_eatRegExpIdentifierName(e)&&e.eat(62))return!0;e.raise("Invalid capture group name")}return!1},c.regexp_eatRegExpIdentifierName=function(e){if(e.lastStringValue="",this.regexp_eatRegExpIdentifierStart(e)){for(e.lastStringValue+=x(e.lastIntValue);this.regexp_eatRegExpIdentifierPart(e);)e.lastStringValue+=x(e.lastIntValue);return!0}return!1},c.regexp_eatRegExpIdentifierStart=function(e){var t=e.pos,r=11<=this.options.ecmaVersion,i=e.current(r);return e.advance(r),ye(i=92===i&&this.regexp_eatRegExpUnicodeEscapeSequence(e,r)?e.lastIntValue:i)?(e.lastIntValue=i,!0):(e.pos=t,!1)},c.regexp_eatRegExpIdentifierPart=function(e){var t=e.pos,r=11<=this.options.ecmaVersion,i=e.current(r);return e.advance(r),ge(i=92===i&&this.regexp_eatRegExpUnicodeEscapeSequence(e,r)?e.lastIntValue:i)?(e.lastIntValue=i,!0):(e.pos=t,!1)},c.regexp_eatAtomEscape=function(e){return!!(this.regexp_eatBackReference(e)||this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)||e.switchN&&this.regexp_eatKGroupName(e))||(e.switchU&&(99===e.current()&&e.raise("Invalid unicode escape"),e.raise("Invalid escape")),!1)},c.regexp_eatBackReference=function(e){var t=e.pos;if(this.regexp_eatDecimalEscape(e)){var r=e.lastIntValue;if(e.switchU)return r>e.maxBackReference&&(e.maxBackReference=r),!0;if(r<=e.numCapturingParens)return!0;e.pos=t}return!1},c.regexp_eatKGroupName=function(e){if(e.eat(107)){if(this.regexp_eatGroupName(e))return e.backReferenceNames.push(e.lastStringValue),!0;e.raise("Invalid named reference")}return!1},c.regexp_eatCharacterEscape=function(e){return this.regexp_eatControlEscape(e)||this.regexp_eatCControlLetter(e)||this.regexp_eatZero(e)||this.regexp_eatHexEscapeSequence(e)||this.regexp_eatRegExpUnicodeEscapeSequence(e,!1)||!e.switchU&&this.regexp_eatLegacyOctalEscapeSequence(e)||this.regexp_eatIdentityEscape(e)},c.regexp_eatCControlLetter=function(e){var t=e.pos;if(e.eat(99)){if(this.regexp_eatControlLetter(e))return!0;e.pos=t}return!1},c.regexp_eatZero=function(e){return 48===e.current()&&!O(e.lookahead())&&(e.lastIntValue=0,e.advance(),!0)},c.regexp_eatControlEscape=function(e){var t=e.current();return 116===t?(e.lastIntValue=9,e.advance(),!0):110===t?(e.lastIntValue=10,e.advance(),!0):118===t?(e.lastIntValue=11,e.advance(),!0):102===t?(e.lastIntValue=12,e.advance(),!0):114===t&&(e.lastIntValue=13,e.advance(),!0)},c.regexp_eatControlLetter=function(e){var t=e.current();return!!xe(t)&&(e.lastIntValue=t%32,e.advance(),!0)},c.regexp_eatRegExpUnicodeEscapeSequence=function(e,t){var r=e.pos,t=(t=void 0===t?!1:t)||e.switchU;if(e.eat(117)){if(this.regexp_eatFixedHexDigits(e,4)){var i=e.lastIntValue;if(t&&55296<=i&&i<=56319){var n=e.pos;if(e.eat(92)&&e.eat(117)&&this.regexp_eatFixedHexDigits(e,4)){var s=e.lastIntValue;if(56320<=s&&s<=57343)return e.lastIntValue=1024*(i-55296)+(s-56320)+65536,!0}e.pos=n,e.lastIntValue=i}return!0}if(t&&e.eat(123)&&this.regexp_eatHexDigits(e)&&e.eat(125)&&Ee(e.lastIntValue))return!0;t&&e.raise("Invalid unicode escape"),e.pos=r}return!1},c.regexp_eatIdentityEscape=function(e){var t;return e.switchU?!!this.regexp_eatSyntaxCharacter(e)||!!e.eat(47)&&(e.lastIntValue=47,!0):!(99===(t=e.current())||e.switchN&&107===t||(e.lastIntValue=t,e.advance(),0))},c.regexp_eatDecimalEscape=function(e){e.lastIntValue=0;var t=e.current();if(49<=t&&t<=57){for(;e.lastIntValue=10*e.lastIntValue+(t-48),e.advance(),48<=(t=e.current())&&t<=57;);return!0}return!1},c.regexp_eatCharacterClassEscape=function(e){var t=e.current();if(ve(t))return e.lastIntValue=-1,e.advance(),!0;if(e.switchU&&9<=this.options.ecmaVersion&&(80===t||112===t)){if(e.lastIntValue=-1,e.advance(),e.eat(123)&&this.regexp_eatUnicodePropertyValueExpression(e)&&e.eat(125))return!0;e.raise("Invalid property name")}return!1},c.regexp_eatUnicodePropertyValueExpression=function(e){var t=e.pos;if(this.regexp_eatUnicodePropertyName(e)&&e.eat(61)){var r,i=e.lastStringValue;if(this.regexp_eatUnicodePropertyValue(e))return r=e.lastStringValue,this.regexp_validateUnicodePropertyNameAndValue(e,i,r),!0}return e.pos=t,!!this.regexp_eatLoneUnicodePropertyNameOrValue(e)&&(i=e.lastStringValue,this.regexp_validateUnicodePropertyNameOrValue(e,i),!0)},c.regexp_validateUnicodePropertyNameAndValue=function(e,t,r){m(e.unicodeProperties.nonBinary,t)||e.raise("Invalid property name"),e.unicodeProperties.nonBinary[t].test(r)||e.raise("Invalid property value")},c.regexp_validateUnicodePropertyNameOrValue=function(e,t){e.unicodeProperties.binary.test(t)||e.raise("Invalid property name")},c.regexp_eatUnicodePropertyName=function(e){var t;for(e.lastStringValue="";be(t=e.current());)e.lastStringValue+=x(t),e.advance();return""!==e.lastStringValue},c.regexp_eatUnicodePropertyValue=function(e){var t;for(e.lastStringValue="";Se(t=e.current());)e.lastStringValue+=x(t),e.advance();return""!==e.lastStringValue},c.regexp_eatLoneUnicodePropertyNameOrValue=function(e){return this.regexp_eatUnicodePropertyValue(e)},c.regexp_eatCharacterClass=function(e){if(e.eat(91)){if(e.eat(94),this.regexp_classRanges(e),e.eat(93))return!0;e.raise("Unterminated character class")}return!1},c.regexp_classRanges=function(e){for(;this.regexp_eatClassAtom(e);){var t,r=e.lastIntValue;e.eat(45)&&this.regexp_eatClassAtom(e)&&(t=e.lastIntValue,!e.switchU||-1!==r&&-1!==t||e.raise("Invalid character class"),-1!==r)&&-1!==t&&t<r&&e.raise("Range out of order in character class")}},c.regexp_eatClassAtom=function(e){var t=e.pos;if(e.eat(92)){if(this.regexp_eatClassEscape(e))return!0;e.switchU&&(99!==(r=e.current())&&!we(r)||e.raise("Invalid class escape"),e.raise("Invalid escape")),e.pos=t}var r=e.current();return 93!==r&&(e.lastIntValue=r,e.advance(),!0)},c.regexp_eatClassEscape=function(e){var t=e.pos;if(e.eat(98))return e.lastIntValue=8,!0;if(e.switchU&&e.eat(45))return e.lastIntValue=45,!0;if(!e.switchU&&e.eat(99)){if(this.regexp_eatClassControlLetter(e))return!0;e.pos=t}return this.regexp_eatCharacterClassEscape(e)||this.regexp_eatCharacterEscape(e)},c.regexp_eatClassControlLetter=function(e){var t=e.current();return!(!O(t)&&95!==t||(e.lastIntValue=t%32,e.advance(),0))},c.regexp_eatHexEscapeSequence=function(e){var t=e.pos;if(e.eat(120)){if(this.regexp_eatFixedHexDigits(e,2))return!0;e.switchU&&e.raise("Invalid escape"),e.pos=t}return!1},c.regexp_eatDecimalDigits=function(e){var t,r=e.pos;for(e.lastIntValue=0;O(t=e.current());)e.lastIntValue=10*e.lastIntValue+(t-48),e.advance();return e.pos!==r},c.regexp_eatHexDigits=function(e){var t,r=e.pos;for(e.lastIntValue=0;De(t=e.current());)e.lastIntValue=16*e.lastIntValue+Ae(t),e.advance();return e.pos!==r},c.regexp_eatLegacyOctalEscapeSequence=function(e){var t,r;return!!this.regexp_eatOctalDigit(e)&&(t=e.lastIntValue,this.regexp_eatOctalDigit(e)?(r=e.lastIntValue,t<=3&&this.regexp_eatOctalDigit(e)?e.lastIntValue=64*t+8*r+e.lastIntValue:e.lastIntValue=8*t+r):e.lastIntValue=t,!0)},c.regexp_eatOctalDigit=function(e){var t=e.current();return we(t)?(e.lastIntValue=t-48,e.advance(),!0):(e.lastIntValue=0,!1)},c.regexp_eatFixedHexDigits=function(e,t){for(var r=e.pos,i=e.lastIntValue=0;i<t;++i){var n=e.current();if(!De(n))return e.pos=r,!1;e.lastIntValue=16*e.lastIntValue+Ae(n),e.advance()}return!0},(t=A.prototype).next=function(e){!e&&this.type.keyword&&this.containsEsc&&this.raiseRecoverable(this.start,"Escape sequence in keyword "+this.type.keyword),this.options.onToken&&this.options.onToken(new N(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},t.getToken=function(){return this.next(),new N(this)},"undefined"!=typeof Symbol&&(t[Symbol.iterator]=function(){var t=this;return{next:function(){var e=t.getToken();return{done:e.type===g.eof,value:e}}}}),t.nextToken=function(){var e=this.curContext();return e&&e.preserveSpace||this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length?this.finishToken(g.eof):e.override?e.override(this):void this.readToken(this.fullCharCodeAtPos())},t.readToken=function(e){return o(e,6<=this.options.ecmaVersion)||92===e?this.readWord():this.getTokenFromCode(e)},t.fullCharCodeAtPos=function(){var e,t=this.input.charCodeAt(this.pos);return t<=55295||56320<=t||(e=this.input.charCodeAt(this.pos+1))<=56319||57344<=e?t:(t<<10)+e-56613888},t.skipBlockComment=function(){var e=this.options.onComment&&this.curPosition(),t=this.pos,r=this.input.indexOf("*/",this.pos+=2);if(-1===r&&this.raise(this.pos-2,"Unterminated comment"),this.pos=r+2,this.options.locations)for(var i,n=t;-1<(i=G(this.input,n,this.pos));)++this.curLine,n=this.lineStart=i;this.options.onComment&&this.options.onComment(!0,this.input.slice(t+2,r),t,this.pos,e,this.curPosition())},t.skipLineComment=function(e){for(var t=this.pos,r=this.options.onComment&&this.curPosition(),i=this.input.charCodeAt(this.pos+=e);this.pos<this.input.length&&!p(i);)i=this.input.charCodeAt(++this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(t+e,this.pos),t,this.pos,r,this.curPosition())},t.skipSpace=function(){e:for(;this.pos<this.input.length;){var e=this.input.charCodeAt(this.pos);switch(e){case 32:case 160:++this.pos;break;case 13:10===this.input.charCodeAt(this.pos+1)&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break e}break;default:if(!(8<e&&e<14||5760<=e&&f.test(String.fromCharCode(e))))break e;++this.pos}}},t.finishToken=function(e,t){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var r=this.type;this.type=e,this.value=t,this.updateContext(r)},t.readToken_dot=function(){var e,t=this.input.charCodeAt(this.pos+1);return 48<=t&&t<=57?this.readNumber(!0):(e=this.input.charCodeAt(this.pos+2),6<=this.options.ecmaVersion&&46===t&&46===e?(this.pos+=3,this.finishToken(g.ellipsis)):(++this.pos,this.finishToken(g.dot)))},t.readToken_slash=function(){var e=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):61===e?this.finishOp(g.assign,2):this.finishOp(g.slash,1)},t.readToken_mult_modulo_exp=function(e){var t=this.input.charCodeAt(this.pos+1),r=1,i=42===e?g.star:g.modulo;return 7<=this.options.ecmaVersion&&42===e&&42===t&&(++r,i=g.starstar,t=this.input.charCodeAt(this.pos+2)),61===t?this.finishOp(g.assign,r+1):this.finishOp(i,r)},t.readToken_pipe_amp=function(e){var t=this.input.charCodeAt(this.pos+1);if(t!==e)return 61===t?this.finishOp(g.assign,2):this.finishOp(124===e?g.bitwiseOR:g.bitwiseAND,1);if(12<=this.options.ecmaVersion&&61===this.input.charCodeAt(this.pos+2))return this.finishOp(g.assign,3);return this.finishOp(124===e?g.logicalOR:g.logicalAND,2)},t.readToken_caret=function(){return 61===this.input.charCodeAt(this.pos+1)?this.finishOp(g.assign,2):this.finishOp(g.bitwiseXOR,1)},t.readToken_plus_min=function(e){var t=this.input.charCodeAt(this.pos+1);return t===e?45!==t||this.inModule||62!==this.input.charCodeAt(this.pos+2)||0!==this.lastTokEnd&&!l.test(this.input.slice(this.lastTokEnd,this.pos))?this.finishOp(g.incDec,2):(this.skipLineComment(3),this.skipSpace(),this.nextToken()):61===t?this.finishOp(g.assign,2):this.finishOp(g.plusMin,1)},t.readToken_lt_gt=function(e){var t=this.input.charCodeAt(this.pos+1),r=1;return t===e?(r=62===e&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+r)?this.finishOp(g.assign,r+1):this.finishOp(g.bitShift,r)):33!==t||60!==e||this.inModule||45!==this.input.charCodeAt(this.pos+2)||45!==this.input.charCodeAt(this.pos+3)?this.finishOp(g.relational,r=61===t?2:r):(this.skipLineComment(4),this.skipSpace(),this.nextToken())},t.readToken_eq_excl=function(e){var t=this.input.charCodeAt(this.pos+1);return 61===t?this.finishOp(g.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===e&&62===t&&6<=this.options.ecmaVersion?(this.pos+=2,this.finishToken(g.arrow)):this.finishOp(61===e?g.eq:g.prefix,1)},t.readToken_question=function(){var e=this.options.ecmaVersion;if(11<=e){var t=this.input.charCodeAt(this.pos+1);if(46===t){var r=this.input.charCodeAt(this.pos+2);if(r<48||57<r)return this.finishOp(g.questionDot,2)}if(63===t){if(12<=e)if(61===this.input.charCodeAt(this.pos+2))return this.finishOp(g.assign,3);return this.finishOp(g.coalesce,2)}}return this.finishOp(g.question,1)},t.readToken_numberSign=function(){var e=this.options.ecmaVersion,t=35;if(13<=e&&(++this.pos,o(t=this.fullCharCodeAtPos(),!0)||92===t))return this.finishToken(g.privateId,this.readWord1());this.raise(this.pos,"Unexpected character '"+x(t)+"'")},t.getTokenFromCode=function(e){switch(e){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(g.parenL);case 41:return++this.pos,this.finishToken(g.parenR);case 59:return++this.pos,this.finishToken(g.semi);case 44:return++this.pos,this.finishToken(g.comma);case 91:return++this.pos,this.finishToken(g.bracketL);case 93:return++this.pos,this.finishToken(g.bracketR);case 123:return++this.pos,this.finishToken(g.braceL);case 125:return++this.pos,this.finishToken(g.braceR);case 58:return++this.pos,this.finishToken(g.colon);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(g.backQuote);case 48:var t=this.input.charCodeAt(this.pos+1);if(120===t||88===t)return this.readRadixNumber(16);if(6<=this.options.ecmaVersion){if(111===t||79===t)return this.readRadixNumber(8);if(98===t||66===t)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(e);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(e);case 124:case 38:return this.readToken_pipe_amp(e);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(e);case 60:case 62:return this.readToken_lt_gt(e);case 61:case 33:return this.readToken_eq_excl(e);case 63:return this.readToken_question();case 126:return this.finishOp(g.prefix,1);case 35:return this.readToken_numberSign()}this.raise(this.pos,"Unexpected character '"+x(e)+"'")},t.finishOp=function(e,t){var r=this.input.slice(this.pos,this.pos+t);return this.pos+=t,this.finishToken(e,r)},t.readRegexp=function(){for(var e,t,r=this.pos;;){this.pos>=this.input.length&&this.raise(r,"Unterminated regular expression");var i=this.input.charAt(this.pos);if(l.test(i)&&this.raise(r,"Unterminated regular expression"),e)e=!1;else{if("["===i)t=!0;else if("]"===i&&t)t=!1;else if("/"===i&&!t)break;e="\\"===i}++this.pos}var n=this.input.slice(r,this.pos),s=(++this.pos,this.pos),o=this.readWord1(),s=(this.containsEsc&&this.unexpected(s),this.regexpState||(this.regexpState=new I(this))),s=(s.reset(r,n,o),this.validateRegExpFlags(s),this.validateRegExpPattern(s),null);try{s=new RegExp(n,o)}catch(e){}return this.finishToken(g.regexp,{pattern:n,flags:o,value:s})},t.readInt=function(e,t,r){for(var i=12<=this.options.ecmaVersion&&void 0===t,n=r&&48===this.input.charCodeAt(this.pos),r=this.pos,s=0,o=0,a=0,c=null==t?1/0:t;a<c;++a,++this.pos){var u=this.input.charCodeAt(this.pos),h=void 0;if(i&&95===u)n&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed in legacy octal numeric literals"),95===o&&this.raiseRecoverable(this.pos,"Numeric separator must be exactly one underscore"),0===a&&this.raiseRecoverable(this.pos,"Numeric separator is not allowed at the first of digits"),o=u;else{if(e<=(h=97<=u?u-97+10:65<=u?u-65+10:48<=u&&u<=57?u-48:1/0))break;o=u,s=s*e+h}}return i&&95===o&&this.raiseRecoverable(this.pos-1,"Numeric separator is not allowed at the last of digits"),this.pos===r||null!=t&&this.pos-r!==t?null:s},t.readRadixNumber=function(e){var t=this.pos,r=(this.pos+=2,this.readInt(e));return null==r&&this.raise(this.start+2,"Expected number in radix "+e),11<=this.options.ecmaVersion&&110===this.input.charCodeAt(this.pos)?(r=_e(this.input.slice(t,this.pos)),++this.pos):o(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(g.num,r)},t.readNumber=function(e){var t=this.pos,r=(e||null!==this.readInt(10,void 0,!0)||this.raise(t,"Invalid number"),2<=this.pos-t&&48===this.input.charCodeAt(t)),i=(r&&this.strict&&this.raise(t,"Invalid number"),this.input.charCodeAt(this.pos));if(!r&&!e&&11<=this.options.ecmaVersion&&110===i)return e=_e(this.input.slice(t,this.pos)),++this.pos,o(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(g.num,e);r&&/[89]/.test(this.input.slice(t,this.pos))&&(r=!1),46!==i||r||(++this.pos,this.readInt(10),i=this.input.charCodeAt(this.pos)),69!==i&&101!==i||r||(43!==(i=this.input.charCodeAt(++this.pos))&&45!==i||++this.pos,null===this.readInt(10)&&this.raise(t,"Invalid number")),o(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");e=Ce(this.input.slice(t,this.pos),r);return this.finishToken(g.num,e)},t.readCodePoint=function(){var e,t;return 123===this.input.charCodeAt(this.pos)?(this.options.ecmaVersion<6&&this.unexpected(),e=++this.pos,t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,1114111<t&&this.invalidStringToken(e,"Code point out of bounds")):t=this.readHexChar(4),t},t.readString=function(e){for(var t="",r=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var i=this.input.charCodeAt(this.pos);if(i===e)break;92===i?(t=(t+=this.input.slice(r,this.pos))+this.readEscapedChar(!1),r=this.pos):8232===i||8233===i?(this.options.ecmaVersion<10&&this.raise(this.start,"Unterminated string constant"),++this.pos,this.options.locations&&(this.curLine++,this.lineStart=this.pos)):(p(i)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return t+=this.input.slice(r,this.pos++),this.finishToken(g.string,t)};var ke={},R=(t.tryReadTemplateToken=function(){this.inTemplateElement=!0;try{this.readTmplToken()}catch(e){if(e!==ke)throw e;this.readInvalidTemplateToken()}this.inTemplateElement=!1},t.invalidStringToken=function(e,t){if(this.inTemplateElement&&9<=this.options.ecmaVersion)throw ke;this.raise(e,t)},t.readTmplToken=function(){for(var e="",t=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var r=this.input.charCodeAt(this.pos);if(96===r||36===r&&123===this.input.charCodeAt(this.pos+1))return this.pos!==this.start||this.type!==g.template&&this.type!==g.invalidTemplate?(e+=this.input.slice(t,this.pos),this.finishToken(g.template,e)):36===r?(this.pos+=2,this.finishToken(g.dollarBraceL)):(++this.pos,this.finishToken(g.backQuote));if(92===r)e=(e+=this.input.slice(t,this.pos))+this.readEscapedChar(!0),t=this.pos;else if(p(r)){switch(e+=this.input.slice(t,this.pos),++this.pos,r){case 13:10===this.input.charCodeAt(this.pos)&&++this.pos;case 10:e+="\n";break;default:e+=String.fromCharCode(r)}this.options.locations&&(++this.curLine,this.lineStart=this.pos),t=this.pos}else++this.pos}},t.readInvalidTemplateToken=function(){for(;this.pos<this.input.length;this.pos++)switch(this.input[this.pos]){case"\\":++this.pos;break;case"$":if("{"!==this.input[this.pos+1])break;case"`":return this.finishToken(g.invalidTemplate,this.input.slice(this.start,this.pos))}this.raise(this.start,"Unterminated template")},t.readEscapedChar=function(e){var t,r,i=this.input.charCodeAt(++this.pos);switch(++this.pos,i){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return x(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:10===this.input.charCodeAt(this.pos)&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";case 56:case 57:this.strict&&this.invalidStringToken(this.pos-1,"Invalid escape sequence"),e&&(t=this.pos-1,this.invalidStringToken(t,"Invalid escape sequence in template string"));default:return 48<=i&&i<=55?(t=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],255<(r=parseInt(t,8))&&(t=t.slice(0,-1),r=parseInt(t,8)),this.pos+=t.length-1,i=this.input.charCodeAt(this.pos),"0"===t&&56!==i&&57!==i||!this.strict&&!e||this.invalidStringToken(this.pos-1-t.length,e?"Octal literal in template string":"Octal literal in strict mode"),String.fromCharCode(r)):p(i)?"":String.fromCharCode(i)}},t.readHexChar=function(e){var t=this.pos,e=this.readInt(16,e);return null===e&&this.invalidStringToken(t,"Bad character escape sequence"),e},t.readWord1=function(){for(var e="",t=!(this.containsEsc=!1),r=this.pos,i=6<=this.options.ecmaVersion;this.pos<this.input.length;){var n=this.fullCharCodeAtPos();if(a(n,i))this.pos+=n<=65535?1:2;else{if(92!==n)break;this.containsEsc=!0,e+=this.input.slice(r,this.pos);var n=this.pos,s=(117!==this.input.charCodeAt(++this.pos)&&this.invalidStringToken(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos,this.readCodePoint());(t?o:a)(s,i)||this.invalidStringToken(n,"Invalid Unicode escape"),e+=x(s),r=this.pos}t=!1}return e+this.input.slice(r,this.pos)},t.readWord=function(){var e=this.readWord1(),t=g.name;return this.keywords.test(e)&&(t=u[e]),this.finishToken(t,e)},"8.8.2");function Fe(e,t){return A.parse(e,t)}function Pe(e,t,r){return A.parseExpressionAt(e,t,r)}function Te(e,t){return A.tokenizer(e,t)}A.acorn={Parser:A,version:"8.8.2",defaultOptions:S,Position:E,SourceLocation:v,getLineInfo:b,Node:T,TokenType:i,tokTypes:g,keywordTypes:u,TokContext:F,tokContexts:P,isIdentifierChar:a,isIdentifierStart:o,Token:N,isNewLine:p,lineBreak:l,lineBreakG:L,nonASCIIwhitespace:f},e.Node=T,e.Parser=A,e.Position=E,e.SourceLocation=v,e.TokContext=F,e.Token=N,e.TokenType=i,e.defaultOptions=S,e.getLineInfo=b,e.isIdentifierChar=a,e.isIdentifierStart=o,e.isNewLine=p,e.keywordTypes=u,e.lineBreak=l,e.lineBreakG=L,e.nonASCIIwhitespace=f,e.parse=Fe,e.parseExpressionAt=Pe,e.tokContexts=P,e.tokTypes=g,e.tokenizer=Te,e.version="8.8.2"}(),{}),walk={get exports(){return walkExports},set exports(e){walkExports=e}};!function(){function r(t){return"string"==typeof t?function(e){return e===t}:t||function(){return!0}}function o(e,t){var r,i=Object.create(t||u);for(r in e)i[r]=e[r];return i}function e(e,t,r){r(e,t)}function t(e,t,r){}var i,c,u;i=walkExports,c=function(e,t){this.node=e,this.state=t},(u={}).Program=u.BlockStatement=u.StaticBlock=function(e,t,r){for(var i=0,n=e.body;i<n.length;i+=1)r(n[i],t,"Statement")},u.Statement=e,u.EmptyStatement=t,u.ExpressionStatement=u.ParenthesizedExpression=u.ChainExpression=function(e,t,r){return r(e.expression,t,"Expression")},u.IfStatement=function(e,t,r){r(e.test,t,"Expression"),r(e.consequent,t,"Statement"),e.alternate&&r(e.alternate,t,"Statement")},u.LabeledStatement=function(e,t,r){return r(e.body,t,"Statement")},u.BreakStatement=u.ContinueStatement=t,u.WithStatement=function(e,t,r){r(e.object,t,"Expression"),r(e.body,t,"Statement")},u.SwitchStatement=function(e,t,r){r(e.discriminant,t,"Expression");for(var i=0,n=e.cases;i<n.length;i+=1){var s=n[i];s.test&&r(s.test,t,"Expression");for(var o=0,a=s.consequent;o<a.length;o+=1)r(a[o],t,"Statement")}},u.SwitchCase=function(e,t,r){e.test&&r(e.test,t,"Expression");for(var i=0,n=e.consequent;i<n.length;i+=1)r(n[i],t,"Statement")},u.ReturnStatement=u.YieldExpression=u.AwaitExpression=function(e,t,r){e.argument&&r(e.argument,t,"Expression")},u.ThrowStatement=u.SpreadElement=function(e,t,r){return r(e.argument,t,"Expression")},u.TryStatement=function(e,t,r){r(e.block,t,"Statement"),e.handler&&r(e.handler,t),e.finalizer&&r(e.finalizer,t,"Statement")},u.CatchClause=function(e,t,r){e.param&&r(e.param,t,"Pattern"),r(e.body,t,"Statement")},u.WhileStatement=u.DoWhileStatement=function(e,t,r){r(e.test,t,"Expression"),r(e.body,t,"Statement")},u.ForStatement=function(e,t,r){e.init&&r(e.init,t,"ForInit"),e.test&&r(e.test,t,"Expression"),e.update&&r(e.update,t,"Expression"),r(e.body,t,"Statement")},u.ForInStatement=u.ForOfStatement=function(e,t,r){r(e.left,t,"ForInit"),r(e.right,t,"Expression"),r(e.body,t,"Statement")},u.ForInit=function(e,t,r){"VariableDeclaration"===e.type?r(e,t):r(e,t,"Expression")},u.DebuggerStatement=t,u.FunctionDeclaration=function(e,t,r){return r(e,t,"Function")},u.VariableDeclaration=function(e,t,r){for(var i=0,n=e.declarations;i<n.length;i+=1)r(n[i],t)},u.VariableDeclarator=function(e,t,r){r(e.id,t,"Pattern"),e.init&&r(e.init,t,"Expression")},u.Function=function(e,t,r){e.id&&r(e.id,t,"Pattern");for(var i=0,n=e.params;i<n.length;i+=1)r(n[i],t,"Pattern");r(e.body,t,e.expression?"Expression":"Statement")},u.Pattern=function(e,t,r){"Identifier"===e.type?r(e,t,"VariablePattern"):"MemberExpression"===e.type?r(e,t,"MemberPattern"):r(e,t)},u.VariablePattern=t,u.MemberPattern=e,u.RestElement=function(e,t,r){return r(e.argument,t,"Pattern")},u.ArrayPattern=function(e,t,r){for(var i=0,n=e.elements;i<n.length;i+=1){var s=n[i];s&&r(s,t,"Pattern")}},u.ObjectPattern=function(e,t,r){for(var i=0,n=e.properties;i<n.length;i+=1){var s=n[i];"Property"===s.type?(s.computed&&r(s.key,t,"Expression"),r(s.value,t,"Pattern")):"RestElement"===s.type&&r(s.argument,t,"Pattern")}},u.Expression=e,u.ThisExpression=u.Super=u.MetaProperty=t,u.ArrayExpression=function(e,t,r){for(var i=0,n=e.elements;i<n.length;i+=1){var s=n[i];s&&r(s,t,"Expression")}},u.ObjectExpression=function(e,t,r){for(var i=0,n=e.properties;i<n.length;i+=1)r(n[i],t)},u.FunctionExpression=u.ArrowFunctionExpression=u.FunctionDeclaration,u.SequenceExpression=function(e,t,r){for(var i=0,n=e.expressions;i<n.length;i+=1)r(n[i],t,"Expression")},u.TemplateLiteral=function(e,t,r){for(var i=0,n=e.quasis;i<n.length;i+=1)r(n[i],t);for(var s=0,o=e.expressions;s<o.length;s+=1)r(o[s],t,"Expression")},u.TemplateElement=t,u.UnaryExpression=u.UpdateExpression=function(e,t,r){r(e.argument,t,"Expression")},u.BinaryExpression=u.LogicalExpression=function(e,t,r){r(e.left,t,"Expression"),r(e.right,t,"Expression")},u.AssignmentExpression=u.AssignmentPattern=function(e,t,r){r(e.left,t,"Pattern"),r(e.right,t,"Expression")},u.ConditionalExpression=function(e,t,r){r(e.test,t,"Expression"),r(e.consequent,t,"Expression"),r(e.alternate,t,"Expression")},u.NewExpression=u.CallExpression=function(e,t,r){if(r(e.callee,t,"Expression"),e.arguments)for(var i=0,n=e.arguments;i<n.length;i+=1)r(n[i],t,"Expression")},u.MemberExpression=function(e,t,r){r(e.object,t,"Expression"),e.computed&&r(e.property,t,"Expression")},u.ExportNamedDeclaration=u.ExportDefaultDeclaration=function(e,t,r){e.declaration&&r(e.declaration,t,"ExportNamedDeclaration"===e.type||e.declaration.id?"Statement":"Expression"),e.source&&r(e.source,t,"Expression")},u.ExportAllDeclaration=function(e,t,r){e.exported&&r(e.exported,t),r(e.source,t,"Expression")},u.ImportDeclaration=function(e,t,r){for(var i=0,n=e.specifiers;i<n.length;i+=1)r(n[i],t);r(e.source,t,"Expression")},u.ImportExpression=function(e,t,r){r(e.source,t,"Expression")},u.ImportSpecifier=u.ImportDefaultSpecifier=u.ImportNamespaceSpecifier=u.Identifier=u.PrivateIdentifier=u.Literal=t,u.TaggedTemplateExpression=function(e,t,r){r(e.tag,t,"Expression"),r(e.quasi,t,"Expression")},u.ClassDeclaration=u.ClassExpression=function(e,t,r){return r(e,t,"Class")},u.Class=function(e,t,r){e.id&&r(e.id,t,"Pattern"),e.superClass&&r(e.superClass,t,"Expression"),r(e.body,t)},u.ClassBody=function(e,t,r){for(var i=0,n=e.body;i<n.length;i+=1)r(n[i],t)},u.MethodDefinition=u.PropertyDefinition=u.Property=function(e,t,r){e.computed&&r(e.key,t,"Expression"),e.value&&r(e.value,t,"Expression")},i.ancestor=function(e,o,a,t,r){var c=[];a=a||u;!function e(t,r,i){var i=i||t.type,n=o[i],s=t!==c[c.length-1];s&&c.push(t),a[i](t,r,e),n&&n(t,r||c,c),s&&c.pop()}(e,t,r)},i.base=u,i.findNodeAfter=function(e,n,s,o,t){s=r(s),o=o||u;try{!function e(t,r,i){if(!(t.end<n)){i=i||t.type;if(t.start>=n&&s(i,t))throw new c(t,r);o[i](t,r,e)}}(e,t)}catch(e){if(e instanceof c)return e;throw e}},i.findNodeAround=function(e,n,s,o,t){s=r(s),o=o||u;try{!function e(t,r,i){i=i||t.type;if(!(t.start>n||t.end<n)&&(o[i](t,r,e),s(i,t)))throw new c(t,r)}(e,t)}catch(e){if(e instanceof c)return e;throw e}},i.findNodeAt=function(e,n,s,o,a,t){a=a||u;o=r(o);try{!function e(t,r,i){i=i||t.type;if((null==n||t.start<=n)&&(null==s||t.end>=s)&&a[i](t,r,e),(null==n||t.start===n)&&(null==s||t.end===s)&&o(i,t))throw new c(t,r)}(e,t)}catch(e){if(e instanceof c)return e;throw e}},i.findNodeBefore=function(e,n,s,o,t){s=r(s),o=o||u;var a;return function e(t,r,i){t.start>n||(i=i||t.type,t.end<=n&&(!a||a.node.end<t.end)&&s(i,t)&&(a=new c(t,r)),o[i](t,r,e))}(e,t),a},i.full=function(e,n,s,t,r){s=s||u;var o;!function e(t,r,i){i=i||t.type;s[i](t,r,e),o!==t&&(n(t,r,i),o=t)}(e,t,r)},i.fullAncestor=function(e,s,o,t){o=o||u;var a,c=[];!function e(t,r,i){var i=i||t.type,n=t!==c[c.length-1];n&&c.push(t),o[i](t,r,e),a!==t&&(s(t,r||c,c,i),a=t),n&&c.pop()}(e,t)},i.make=o,i.recursive=function(e,t,r,i,n){var s=r?o(r,i||void 0):i;!function e(t,r,i){s[i||t.type](t,r,e)}(e,t,n)},i.simple=function(e,s,o,t,r){o=o||u;!function e(t,r,i){var i=i||t.type,n=s[i];o[i](t,r,e),n&&n(t,r)}(e,t,r)},Object.defineProperty(i,"__esModule",{value:!0})}();const{Parser:AcornParser,isNewLine:acornIsNewLine,getLineInfo:acornGetLineInfo}=acornExports,{full:acornWalkFull}=walkExports,INTERNAL_STATE_NAME$1="VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL";function assertType(e,t){if(!e)throw new Error(`None existent node expected '${t}'`);if(e.type!==t)throw new Error(`Invalid node type '${e.type}' expected '${t}'`);return e}function makeNiceSyntaxError(e,t,r,i,n){var s=acornGetLineInfo(t,i);let o=i;for(;o<t.length&&!acornIsNewLine(t.charCodeAt(o));)o++;let a=n.start===i?n.end:i+1,c=(a=!a||a>o?o:a)-i;c<=0&&(c=1),"Unexpected token"===e&&("name"===(u=n.type).label||"privateId"===u.label?e="Unexpected identifier":"eof"===u.label?e="Unexpected end of input":"num"===u.label?e="Unexpected number":"string"===u.label?e="Unexpected string":"regexp"===u.label?(e="Unexpected token '/'",c=1):e=`Unexpected token '${n.value||u.label}'`);var u,n=new SyntaxError(e);return r&&(e=(u=t.slice(i-s.column,o)).slice(0,s.column).replace(/\S/g," ")+"^".repeat(c),n.stack=`${r}:${s.line}
${u}
${e}

`+n.stack),n}function transformer$3(e,r,t,i,n){let s,o;if(null===e){if(s=r,!/\b(?:catch|import|async)\b/.test(s))return{__proto__:null,code:s,hasAsync:!1}}else s=t?"(async function":"(function",i&&(s+="*"),s=s+" anonymous("+e,o=s.length,s=(s+="\n) {\n")+r+"\n})";i=new AcornParser({__proto__:null,ecmaVersion:2022,allowAwaitOutsideFunction:null===e&&t,allowReturnOutsideFunction:null===e},s);let a;try{a=i.parse()}catch(t){if(t instanceof SyntaxError&&void 0!==t.pos){let e=t.message;r=e.match(/^(.*) \(\d+:\d+\)$/);t=makeNiceSyntaxError(e=r?r[1]:e,s,n,t.pos,i)}throw t}if(null!==e){t=assertType(a,"Program").body;if(1!==t.length)throw new SyntaxError("Single function literal required");r=t[0];if("ExpressionStatement"!==r.type)throw new SyntaxError("Single function literal required");i=r.expression;if("FunctionExpression"!==i.type)throw new SyntaxError("Single function literal required");if(i.body.start!==o+3)throw new SyntaxError("Unexpected end of arg string")}const c=[];let u=!1;let h=void 0,l="VM2_INTERNAL_TMPNAME";if(acornWalkFull(a,(e,t,r)=>{"Function"===r&&e.async&&(u=!0);var i,n,r=e.type;"CatchClause"===r?(i=e.param)&&("ObjectPattern"===i.type?(c.push({__proto__:null,pos:e.start,order:100,code:`catch($tmpname){try{throw ${INTERNAL_STATE_NAME$1}.handleException($tmpname);}`}),c.push({__proto__:null,pos:e.body.end,order:-100,code:"}"})):(i=assertType(i,"Identifier").name,0<(n=assertType(e.body,"BlockStatement")).body.length&&c.push({__proto__:null,pos:n.body[0].start,order:-100,code:`${i}=${INTERNAL_STATE_NAME$1}.handleException(${i});`}))):"WithStatement"===r?(c.push({__proto__:null,pos:e.object.start,order:-100,code:INTERNAL_STATE_NAME$1+".wrapWith("}),c.push({__proto__:null,pos:e.object.end,order:100,code:")"})):"Identifier"===r?e.name===INTERNAL_STATE_NAME$1?(void 0===h||h.start>e.start)&&(h=e):e.name.startsWith(l)&&(l=e.name+"_UNIQUE"):"ImportExpression"===r&&c.push({__proto__:null,pos:e.start,order:100,code:INTERNAL_STATE_NAME$1+"."})}),h)throw makeNiceSyntaxError("Use of internal vm2 state variable",s,n,h.start,{__proto__:null,start:h.start,end:h.end});if(0===c.length)return{__proto__:null,code:s,hasAsync:u};c.sort((e,t)=>e.pos==t.pos?e.order-t.order:e.pos-t.pos);let p="",f=0;for(let e=0;e<c.length;e++){var d=c[e];p+=s.substring(f,d.pos)+d.code.replace(/\$tmpname/g,l),f=d.pos}return{__proto__:null,code:p+=s.substring(f),hasAsync:u}}transformer$4.INTERNAL_STATE_NAME=INTERNAL_STATE_NAME$1,transformer$4.transformer=transformer$3;const{Script:Script$2}=require$$2,{lookupCompiler:lookupCompiler$1,removeShebang}=compiler,{transformer:transformer$2}=transformer$4,objectDefineProperties$2=Object.defineProperties,MODULE_PREFIX$1="(function (exports, require, module, __filename, __dirname) { ",STRICT_MODULE_PREFIX$1=MODULE_PREFIX$1+'"use strict"; ',MODULE_SUFFIX$1="\n});";let VMScript$5=class VMScript{constructor(e,t){e=""+e;let r,i;2===arguments.length?r="object"==typeof t?(i=t||{__proto__:null}).filename:(i={__proto__:null},t):2<arguments.length?(i=arguments[2]||{__proto__:null},r=t||i.filename):i={__proto__:null};var{compiler:t="javascript",lineOffset:n=0,columnOffset:s=0}=i,o=lookupCompiler$1(t);objectDefineProperties$2(this,{__proto__:null,code:{__proto__:null,get(){return this._prefix+this._code+this._suffix},set(e){e=String(e);e===this._code&&""===this._prefix&&""===this._suffix||(this._code=e,this._prefix="",this._suffix="",this._compiledVM=null,this._compiledNodeVM=null,this._compiledCode=null)},enumerable:!0},filename:{__proto__:null,value:r||"vm.js",enumerable:!0},lineOffset:{__proto__:null,value:n,enumerable:!0},columnOffset:{__proto__:null,value:s,enumerable:!0},compiler:{__proto__:null,value:t,enumerable:!0},_code:{__proto__:null,value:e,writable:!0},_prefix:{__proto__:null,value:"",writable:!0},_suffix:{__proto__:null,value:"",writable:!0},_compiledVM:{__proto__:null,value:null,writable:!0},_compiledNodeVM:{__proto__:null,value:null,writable:!0},_compiledNodeVMStrict:{__proto__:null,value:null,writable:!0},_compiledCode:{__proto__:null,value:null,writable:!0},_hasAsync:{__proto__:null,value:!1,writable:!0},_compiler:{__proto__:null,value:o}})}wrap(e,t){e=""+e,t=""+t;return this._prefix===e&&this._suffix===t||(this._prefix=e,this._suffix=t,this._compiledVM=null,this._compiledNodeVM=null,this._compiledNodeVMStrict=null),this}compile(){return this._compileVM(),this}getCompiledCode(){var e;return this._compiledCode||(e=this._compiler(this._prefix+removeShebang(this._code)+this._suffix,this.filename),e=transformer$2(null,e,!1,!1,this.filename),this._compiledCode=e.code,this._hasAsync=e.hasAsync),this._compiledCode}_compile(e,t){return new Script$2(e+this.getCompiledCode()+t,{__proto__:null,filename:this.filename,displayErrors:!1,lineOffset:this.lineOffset,columnOffset:this.columnOffset})}_compileVM(){let e=this._compiledVM;return e||(this._compiledVM=e=this._compile("","")),e}_compileNodeVM(){let e=this._compiledNodeVM;return e||(this._compiledNodeVM=e=this._compile(MODULE_PREFIX$1,MODULE_SUFFIX$1)),e}_compileNodeVMStrict(){let e=this._compiledNodeVMStrict;return e||(this._compiledNodeVMStrict=e=this._compile(STRICT_MODULE_PREFIX$1,MODULE_SUFFIX$1)),e}};script.MODULE_PREFIX=MODULE_PREFIX$1,script.STRICT_MODULE_PREFIX=STRICT_MODULE_PREFIX$1,script.MODULE_SUFFIX=MODULE_SUFFIX$1,script.VMScript=VMScript$5;var vm={};function EventEmitter$2(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}var events=EventEmitter$2;function isFunction(e){return"function"==typeof e}function isNumber(e){return"number"==typeof e}function isObject(e){return"object"==typeof e&&null!==e}function isUndefined(e){return void 0===e}EventEmitter$2.EventEmitter=EventEmitter$2,EventEmitter$2.prototype._events=void 0,EventEmitter$2.prototype._maxListeners=void 0,EventEmitter$2.defaultMaxListeners=10,EventEmitter$2.prototype.setMaxListeners=function(e){if(!isNumber(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},EventEmitter$2.prototype.emit=function(e){var t,r,i,n,s,o,a;if((this._events||(this._events={}),"error"===e)&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length))throw(a=arguments[1])instanceof Error?a:((o=new Error('Uncaught, unspecified "error" event. ('+a+")")).context=a,o);if(isUndefined(t=this._events[e]))return!1;if(isFunction(t))switch(arguments.length){case 1:t.call(this);break;case 2:t.call(this,arguments[1]);break;case 3:t.call(this,arguments[1],arguments[2]);break;default:i=Array.prototype.slice.call(arguments,1),t.apply(this,i)}else if(isObject(t))for(i=Array.prototype.slice.call(arguments,1),r=(s=t.slice()).length,n=0;n<r;n++)s[n].apply(this,i);return!0},EventEmitter$2.prototype.addListener=function(e,t){if(isFunction(t))return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,isFunction(t.listener)?t.listener:t),this._events[e]?isObject(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,isObject(this._events[e])&&!this._events[e].warned&&(t=isUndefined(this._maxListeners)?EventEmitter$2.defaultMaxListeners:this._maxListeners)&&0<t&&this._events[e].length>t&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace)&&console.trace(),this;throw TypeError("listener must be a function")},EventEmitter$2.prototype.on=EventEmitter$2.prototype.addListener,EventEmitter$2.prototype.once=function(e,t){var r;if(isFunction(t))return r=!1,i.listener=t,this.on(e,i),this;throw TypeError("listener must be a function");function i(){this.removeListener(e,i),r||(r=!0,t.apply(this,arguments))}},EventEmitter$2.prototype.removeListener=function(e,t){var r,i,n,s;if(!isFunction(t))throw TypeError("listener must be a function");if(this._events&&this._events[e])if(n=(r=this._events[e]).length,i=-1,r===t||isFunction(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(isObject(r)){for(s=n;0<s--;)if(r[s]===t||r[s].listener&&r[s].listener===t){i=s;break}if(i<0)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},EventEmitter$2.prototype.removeAllListeners=function(e){var t,r;if(this._events)if(this._events.removeListener)if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);this.removeAllListeners("removeListener"),this._events={}}else{if(isFunction(r=this._events[e]))this.removeListener(e,r);else if(r)for(;r.length;)this.removeListener(e,r[r.length-1]);delete this._events[e]}else 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e];return this},EventEmitter$2.prototype.listeners=function(e){e=this._events&&this._events[e]?isFunction(this._events[e])?[this._events[e]]:this._events[e].slice():[];return e},EventEmitter$2.prototype.listenerCount=function(e){if(this._events){e=this._events[e];if(isFunction(e))return 1;if(e)return e.length}return 0},EventEmitter$2.listenerCount=function(e,t){return e.listenerCount(t)};const fs$2=require$$0,pa$2=require$$1,{Script:Script$1,createContext}=require$$2,{EventEmitter:EventEmitter$1}=events,{INSPECT_MAX_BYTES}=require$$4,{createBridge,VMError:VMError$4}=bridge,{transformer:transformer$1,INTERNAL_STATE_NAME}=transformer$4,{lookupCompiler}=compiler,{VMScript:VMScript$4}=script,objectDefineProperties$1=Object.defineProperties,HOST$1=Object.freeze({Buffer:Buffer,Function:Function,Object:Object,transformAndCheck:transformAndCheck,INSPECT_MAX_BYTES:INSPECT_MAX_BYTES,INTERNAL_STATE_NAME:INTERNAL_STATE_NAME});function compileScript$1(e,t){return new Script$1(t,{__proto__:null,filename:e,displayErrors:!1})}const DEFAULT_RUN_OPTIONS=Object.freeze({__proto__:null,displayErrors:!1});function checkAsync(e){if(!e)throw new VMError$4("Async not available")}function transformAndCheck(e,t,r,i,n){e=transformer$1(e,t,r,i,void 0);return checkAsync(n||!e.hasAsync),e.code}let cacheTimeoutContext=null,cacheTimeoutScript=null;function doWithTimeout(e,t){cacheTimeoutContext||(cacheTimeoutContext=createContext(),cacheTimeoutScript=new Script$1("fn()",{__proto__:null,filename:"timeout_bridge.js",displayErrors:!1})),cacheTimeoutContext.fn=e;try{return cacheTimeoutScript.runInContext(cacheTimeoutContext,{__proto__:null,displayErrors:!1,timeout:t})}finally{cacheTimeoutContext.fn=null}}const bridgeScript=compileScript$1(__dirname+"/bridge.js",`(function(global) {"use strict"; const exports = {};'use strict';

/**
 * __        ___    ____  _   _ ___ _   _  ____
 * \\ \\      / / \\  |  _ \\| \\ | |_ _| \\ | |/ ___|
 *  \\ \\ /\\ / / _ \\ | |_) |  \\| || ||  \\| | |  _
 *   \\ V  V / ___ \\|  _ <| |\\  || || |\\  | |_| |
 *    \\_/\\_/_/   \\_\\_| \\_\\_| \\_|___|_| \\_|\\____|
 *
 * This file is critical for vm2. It implements the bridge between the host and the sandbox.
 * If you do not know exactly what you are doing, you should NOT edit this file.
 *
 * The file is loaded in the host and sandbox to handle objects in both directions.
 * This is done to ensure that RangeErrors are from the correct context.
 * The boundary between the sandbox and host might throw RangeErrors from both contexts.
 * Therefore, thisFromOther and friends can handle objects from both domains.
 *
 * Method parameters have comments to tell from which context they came.
 *
 */

const globalsList = [
	'Number',
	'String',
	'Boolean',
	'Date',
	'RegExp',
	'Map',
	'WeakMap',
	'Set',
	'WeakSet',
	'Promise',
	'Function'
];

const errorsList = [
	'RangeError',
	'ReferenceError',
	'SyntaxError',
	'TypeError',
	'EvalError',
	'URIError',
	'Error'
];

const OPNA = 'Operation not allowed on contextified object.';

const thisGlobalPrototypes = {
	__proto__: null,
	Object: Object.prototype,
	Array: Array.prototype
};

for (let i = 0; i < globalsList.length; i++) {
	const key = globalsList[i];
	const g = global[key];
	if (g) thisGlobalPrototypes[key] = g.prototype;
}

for (let i = 0; i < errorsList.length; i++) {
	const key = errorsList[i];
	const g = global[key];
	if (g) thisGlobalPrototypes[key] = g.prototype;
}

const {
	getPrototypeOf: thisReflectGetPrototypeOf,
	setPrototypeOf: thisReflectSetPrototypeOf,
	defineProperty: thisReflectDefineProperty,
	deleteProperty: thisReflectDeleteProperty,
	getOwnPropertyDescriptor: thisReflectGetOwnPropertyDescriptor,
	isExtensible: thisReflectIsExtensible,
	preventExtensions: thisReflectPreventExtensions,
	apply: thisReflectApply,
	construct: thisReflectConstruct,
	set: thisReflectSet,
	get: thisReflectGet,
	has: thisReflectHas,
	ownKeys: thisReflectOwnKeys,
	enumerate: thisReflectEnumerate,
} = Reflect;

const thisObject = Object;
const {
	freeze: thisObjectFreeze,
	prototype: thisObjectPrototype
} = thisObject;
const thisObjectHasOwnProperty = thisObjectPrototype.hasOwnProperty;
const ThisProxy = Proxy;
const ThisWeakMap = WeakMap;
const {
	get: thisWeakMapGet,
	set: thisWeakMapSet
} = ThisWeakMap.prototype;
const ThisMap = Map;
const thisMapGet = ThisMap.prototype.get;
const thisMapSet = ThisMap.prototype.set;
const thisFunction = Function;
const thisFunctionBind = thisFunction.prototype.bind;
const thisArrayIsArray = Array.isArray;
const thisErrorCaptureStackTrace = Error.captureStackTrace;

const thisSymbolToString = Symbol.prototype.toString;
const thisSymbolToStringTag = Symbol.toStringTag;
const thisSymbolIterator = Symbol.iterator;
const thisSymbolNodeJSUtilInspectCustom = Symbol.for('nodejs.util.inspect.custom');

/**
 * VMError.
 *
 * @public
 * @extends {Error}
 */
class VMError extends Error {

	/**
	 * Create VMError instance.
	 *
	 * @public
	 * @param {string} message - Error message.
	 * @param {string} code - Error code.
	 */
	constructor(message, code) {
		super(message);

		this.name = 'VMError';
		this.code = code;

		thisErrorCaptureStackTrace(this, this.constructor);
	}
}

thisGlobalPrototypes['VMError'] = VMError.prototype;

function thisUnexpected() {
	return new VMError('Unexpected');
}

if (!thisReflectSetPrototypeOf(exports, null)) throw thisUnexpected();

function thisSafeGetOwnPropertyDescriptor(obj, key) {
	const desc = thisReflectGetOwnPropertyDescriptor(obj, key);
	if (!desc) return desc;
	if (!thisReflectSetPrototypeOf(desc, null)) throw thisUnexpected();
	return desc;
}

function thisThrowCallerCalleeArgumentsAccess(key) {
	'use strict';
	thisThrowCallerCalleeArgumentsAccess[key];
	return thisUnexpected();
}

function thisIdMapping(factory, other) {
	return other;
}

const thisThrowOnKeyAccessHandler = thisObjectFreeze({
	__proto__: null,
	get(target, key, receiver) {
		if (typeof key === 'symbol') {
			key = thisReflectApply(thisSymbolToString, key, []);
		}
		throw new VMError(\`Unexpected access to key '\${key}'\`);
	}
});

const emptyForzenObject = thisObjectFreeze({
	__proto__: null
});

const thisThrowOnKeyAccess = new ThisProxy(emptyForzenObject, thisThrowOnKeyAccessHandler);

function SafeBase() {}

if (!thisReflectDefineProperty(SafeBase, 'prototype', {
	__proto__: null,
	value: thisThrowOnKeyAccess
})) throw thisUnexpected();

function SHARED_FUNCTION() {}

const TEST_PROXY_HANDLER = thisObjectFreeze({
	__proto__: thisThrowOnKeyAccess,
	construct() {
		return this;
	}
});

function thisIsConstructor(obj) {
	// Note: obj@any(unsafe)
	const Func = new ThisProxy(obj, TEST_PROXY_HANDLER);
	try {
		// eslint-disable-next-line no-new
		new Func();
		return true;
	} catch (e) {
		return false;
	}
}

function thisCreateTargetObject(obj, proto) {
	// Note: obj@any(unsafe) proto@any(unsafe) returns@this(unsafe) throws@this(unsafe)
	let base;
	if (typeof obj === 'function') {
		if (thisIsConstructor(obj)) {
			// Bind the function since bound functions do not have a prototype property.
			base = thisReflectApply(thisFunctionBind, SHARED_FUNCTION, [null]);
		} else {
			base = () => {};
		}
	} else if (thisArrayIsArray(obj)) {
		base = [];
	} else {
		return {__proto__: proto};
	}
	if (!thisReflectSetPrototypeOf(base, proto)) throw thisUnexpected();
	return base;
}

function createBridge(otherInit, registerProxy) {

	const mappingOtherToThis = new ThisWeakMap();
	const protoMappings = new ThisMap();
	const protoName = new ThisMap();

	function thisAddProtoMapping(proto, other, name) {
		// Note: proto@this(unsafe) other@other(unsafe) name@this(unsafe) throws@this(unsafe)
		thisReflectApply(thisMapSet, protoMappings, [proto, thisIdMapping]);
		thisReflectApply(thisMapSet, protoMappings, [other,
			(factory, object) => thisProxyOther(factory, object, proto)]);
		if (name) thisReflectApply(thisMapSet, protoName, [proto, name]);
	}

	function thisAddProtoMappingFactory(protoFactory, other, name) {
		// Note: protoFactory@this(unsafe) other@other(unsafe) name@this(unsafe) throws@this(unsafe)
		let proto;
		thisReflectApply(thisMapSet, protoMappings, [other,
			(factory, object) => {
				if (!proto) {
					proto = protoFactory();
					thisReflectApply(thisMapSet, protoMappings, [proto, thisIdMapping]);
					if (name) thisReflectApply(thisMapSet, protoName, [proto, name]);
				}
				return thisProxyOther(factory, object, proto);
			}]);
	}

	const result = {
		__proto__: null,
		globalPrototypes: thisGlobalPrototypes,
		safeGetOwnPropertyDescriptor: thisSafeGetOwnPropertyDescriptor,
		fromArguments: thisFromOtherArguments,
		from: thisFromOther,
		fromWithFactory: thisFromOtherWithFactory,
		ensureThis: thisEnsureThis,
		mapping: mappingOtherToThis,
		connect: thisConnect,
		reflectSet: thisReflectSet,
		reflectGet: thisReflectGet,
		reflectDefineProperty: thisReflectDefineProperty,
		reflectDeleteProperty: thisReflectDeleteProperty,
		reflectApply: thisReflectApply,
		reflectConstruct: thisReflectConstruct,
		reflectHas: thisReflectHas,
		reflectOwnKeys: thisReflectOwnKeys,
		reflectEnumerate: thisReflectEnumerate,
		reflectGetPrototypeOf: thisReflectGetPrototypeOf,
		reflectIsExtensible: thisReflectIsExtensible,
		reflectPreventExtensions: thisReflectPreventExtensions,
		objectHasOwnProperty: thisObjectHasOwnProperty,
		weakMapSet: thisWeakMapSet,
		addProtoMapping: thisAddProtoMapping,
		addProtoMappingFactory: thisAddProtoMappingFactory,
		defaultFactory,
		protectedFactory,
		readonlyFactory,
		VMError
	};

	const isHost = typeof otherInit !== 'object';

	if (isHost) {
		otherInit = otherInit(result, registerProxy);
	}

	result.other = otherInit;

	const {
		globalPrototypes: otherGlobalPrototypes,
		safeGetOwnPropertyDescriptor: otherSafeGetOwnPropertyDescriptor,
		fromArguments: otherFromThisArguments,
		from: otherFromThis,
		mapping: mappingThisToOther,
		reflectSet: otherReflectSet,
		reflectGet: otherReflectGet,
		reflectDefineProperty: otherReflectDefineProperty,
		reflectDeleteProperty: otherReflectDeleteProperty,
		reflectApply: otherReflectApply,
		reflectConstruct: otherReflectConstruct,
		reflectHas: otherReflectHas,
		reflectOwnKeys: otherReflectOwnKeys,
		reflectEnumerate: otherReflectEnumerate,
		reflectGetPrototypeOf: otherReflectGetPrototypeOf,
		reflectIsExtensible: otherReflectIsExtensible,
		reflectPreventExtensions: otherReflectPreventExtensions,
		objectHasOwnProperty: otherObjectHasOwnProperty,
		weakMapSet: otherWeakMapSet
	} = otherInit;

	function thisOtherHasOwnProperty(object, key) {
		// Note: object@other(safe) key@prim throws@this(unsafe)
		try {
			return otherReflectApply(otherObjectHasOwnProperty, object, [key]) === true;
		} catch (e) { // @other(unsafe)
			throw thisFromOtherForThrow(e);
		}
	}

	function thisDefaultGet(handler, object, key, desc) {
		// Note: object@other(unsafe) key@prim desc@other(safe)
		let ret; // @other(unsafe)
		if (desc.get || desc.set) {
			const getter = desc.get;
			if (!getter) return undefined;
			try {
				ret = otherReflectApply(getter, object, [key]);
			} catch (e) {
				throw thisFromOtherForThrow(e);
			}
		} else {
			ret = desc.value;
		}
		return handler.fromOtherWithContext(ret);
	}

	function otherFromThisIfAvailable(to, from, key) {
		// Note: to@other(safe) from@this(safe) key@prim throws@this(unsafe)
		if (!thisReflectApply(thisObjectHasOwnProperty, from, [key])) return false;
		try {
			to[key] = otherFromThis(from[key]);
		} catch (e) { // @other(unsafe)
			throw thisFromOtherForThrow(e);
		}
		return true;
	}

	class BaseHandler extends SafeBase {

		constructor(object) {
			// Note: object@other(unsafe) throws@this(unsafe)
			super();
			this.objectWrapper = () => object;
		}

		getObject() {
			return this.objectWrapper();
		}

		getFactory() {
			return defaultFactory;
		}

		fromOtherWithContext(other) {
			// Note: other@other(unsafe) throws@this(unsafe)
			return thisFromOtherWithFactory(this.getFactory(), other);
		}

		doPreventExtensions(target, object, factory) {
			// Note: target@this(unsafe) object@other(unsafe) throws@this(unsafe)
			let keys; // @other(safe-array-of-prim)
			try {
				keys = otherReflectOwnKeys(object);
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i]; // @prim
				let desc;
				try {
					desc = otherSafeGetOwnPropertyDescriptor(object, key);
				} catch (e) { // @other(unsafe)
					throw thisFromOtherForThrow(e);
				}
				if (!desc) continue;
				if (!desc.configurable) {
					const current = thisSafeGetOwnPropertyDescriptor(target, key);
					if (current && !current.configurable) continue;
					if (desc.get || desc.set) {
						desc.get = this.fromOtherWithContext(desc.get);
						desc.set = this.fromOtherWithContext(desc.set);
					} else if (typeof object === 'function' && (key === 'caller' || key === 'callee' || key === 'arguments')) {
						desc.value = null;
					} else {
						desc.value = this.fromOtherWithContext(desc.value);
					}
				} else {
					if (desc.get || desc.set) {
						desc = {
							__proto__: null,
							configurable: true,
							enumerable: desc.enumerable,
							writable: true,
							value: null
						};
					} else {
						desc.value = null;
					}
				}
				if (!thisReflectDefineProperty(target, key, desc)) throw thisUnexpected();
			}
			if (!thisReflectPreventExtensions(target)) throw thisUnexpected();
		}

		get(target, key, receiver) {
			// Note: target@this(unsafe) key@prim receiver@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			switch (key) {
				case 'constructor': {
					const desc = otherSafeGetOwnPropertyDescriptor(object, key);
					if (desc) return thisDefaultGet(this, object, key, desc);
					const proto = thisReflectGetPrototypeOf(target);
					return proto === null ? undefined : proto.constructor;
				}
				case '__proto__': {
					const desc = otherSafeGetOwnPropertyDescriptor(object, key);
					if (desc) return thisDefaultGet(this, object, key, desc);
					return thisReflectGetPrototypeOf(target);
				}
				case thisSymbolToStringTag:
					if (!thisOtherHasOwnProperty(object, thisSymbolToStringTag)) {
						const proto = thisReflectGetPrototypeOf(target);
						const name = thisReflectApply(thisMapGet, protoName, [proto]);
						if (name) return name;
					}
					break;
				case 'arguments':
				case 'caller':
				case 'callee':
					if (typeof object === 'function' && thisOtherHasOwnProperty(object, key)) {
						throw thisThrowCallerCalleeArgumentsAccess(key);
					}
					break;
			}
			let ret; // @other(unsafe)
			try {
				ret = otherReflectGet(object, key);
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
			return this.fromOtherWithContext(ret);
		}

		set(target, key, value, receiver) {
			// Note: target@this(unsafe) key@prim value@this(unsafe) receiver@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			if (key === '__proto__' && !thisOtherHasOwnProperty(object, key)) {
				return this.setPrototypeOf(target, value);
			}
			try {
				value = otherFromThis(value);
				return otherReflectSet(object, key, value) === true;
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
		}

		getPrototypeOf(target) {
			// Note: target@this(unsafe)
			return thisReflectGetPrototypeOf(target);
		}

		setPrototypeOf(target, value) {
			// Note: target@this(unsafe) throws@this(unsafe)
			throw new VMError(OPNA);
		}

		apply(target, context, args) {
			// Note: target@this(unsafe) context@this(unsafe) args@this(safe-array) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			let ret; // @other(unsafe)
			try {
				context = otherFromThis(context);
				args = otherFromThisArguments(args);
				ret = otherReflectApply(object, context, args);
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
			return thisFromOther(ret);
		}

		construct(target, args, newTarget) {
			// Note: target@this(unsafe) args@this(safe-array) newTarget@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			let ret; // @other(unsafe)
			try {
				args = otherFromThisArguments(args);
				ret = otherReflectConstruct(object, args);
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
			return thisFromOtherWithFactory(this.getFactory(), ret, thisFromOther(object));
		}

		getOwnPropertyDescriptorDesc(target, prop, desc) {
			// Note: target@this(unsafe) prop@prim desc@other{safe} throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			if (desc && typeof object === 'function' && (prop === 'arguments' || prop === 'caller' || prop === 'callee')) desc.value = null;
			return desc;
		}

		getOwnPropertyDescriptor(target, prop) {
			// Note: target@this(unsafe) prop@prim throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			let desc; // @other(safe)
			try {
				desc = otherSafeGetOwnPropertyDescriptor(object, prop);
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}

			desc = this.getOwnPropertyDescriptorDesc(target, prop, desc);

			if (!desc) return undefined;

			let thisDesc;
			if (desc.get || desc.set) {
				thisDesc = {
					__proto__: null,
					get: this.fromOtherWithContext(desc.get),
					set: this.fromOtherWithContext(desc.set),
					enumerable: desc.enumerable === true,
					configurable: desc.configurable === true
				};
			} else {
				thisDesc = {
					__proto__: null,
					value: this.fromOtherWithContext(desc.value),
					writable: desc.writable === true,
					enumerable: desc.enumerable === true,
					configurable: desc.configurable === true
				};
			}
			if (!thisDesc.configurable) {
				const oldDesc = thisSafeGetOwnPropertyDescriptor(target, prop);
				if (!oldDesc || oldDesc.configurable || oldDesc.writable !== thisDesc.writable) {
					if (!thisReflectDefineProperty(target, prop, thisDesc)) throw thisUnexpected();
				}
			}
			return thisDesc;
		}

		definePropertyDesc(target, prop, desc) {
			// Note: target@this(unsafe) prop@prim desc@this(safe) throws@this(unsafe)
			return desc;
		}

		defineProperty(target, prop, desc) {
			// Note: target@this(unsafe) prop@prim desc@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			if (!thisReflectSetPrototypeOf(desc, null)) throw thisUnexpected();

			desc = this.definePropertyDesc(target, prop, desc);

			if (!desc) return false;

			let otherDesc = {__proto__: null};
			let hasFunc = true;
			let hasValue = true;
			let hasBasic = true;
			hasFunc &= otherFromThisIfAvailable(otherDesc, desc, 'get');
			hasFunc &= otherFromThisIfAvailable(otherDesc, desc, 'set');
			hasValue &= otherFromThisIfAvailable(otherDesc, desc, 'value');
			hasValue &= otherFromThisIfAvailable(otherDesc, desc, 'writable');
			hasBasic &= otherFromThisIfAvailable(otherDesc, desc, 'enumerable');
			hasBasic &= otherFromThisIfAvailable(otherDesc, desc, 'configurable');

			try {
				if (!otherReflectDefineProperty(object, prop, otherDesc)) return false;
				if (otherDesc.configurable !== true && (!hasBasic || !(hasFunc || hasValue))) {
					otherDesc = otherSafeGetOwnPropertyDescriptor(object, prop);
				}
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}

			if (!otherDesc.configurable) {
				let thisDesc;
				if (otherDesc.get || otherDesc.set) {
					thisDesc = {
						__proto__: null,
						get: this.fromOtherWithContext(otherDesc.get),
						set: this.fromOtherWithContext(otherDesc.set),
						enumerable: otherDesc.enumerable,
						configurable: otherDesc.configurable
					};
				} else {
					thisDesc = {
						__proto__: null,
						value: this.fromOtherWithContext(otherDesc.value),
						writable: otherDesc.writable,
						enumerable: otherDesc.enumerable,
						configurable: otherDesc.configurable
					};
				}
				if (!thisReflectDefineProperty(target, prop, thisDesc)) throw thisUnexpected();
			}
			return true;
		}

		deleteProperty(target, prop) {
			// Note: target@this(unsafe) prop@prim throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			try {
				return otherReflectDeleteProperty(object, prop) === true;
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
		}

		has(target, key) {
			// Note: target@this(unsafe) key@prim throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			try {
				return otherReflectHas(object, key) === true;
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
		}

		isExtensible(target) {
			// Note: target@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			try {
				if (otherReflectIsExtensible(object)) return true;
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
			if (thisReflectIsExtensible(target)) {
				this.doPreventExtensions(target, object, this);
			}
			return false;
		}

		ownKeys(target) {
			// Note: target@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			let res; // @other(unsafe)
			try {
				res = otherReflectOwnKeys(object);
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
			return thisFromOther(res);
		}

		preventExtensions(target) {
			// Note: target@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			try {
				if (!otherReflectPreventExtensions(object)) return false;
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
			if (thisReflectIsExtensible(target)) {
				this.doPreventExtensions(target, object, this);
			}
			return true;
		}

		enumerate(target) {
			// Note: target@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			let res; // @other(unsafe)
			try {
				res = otherReflectEnumerate(object);
			} catch (e) { // @other(unsafe)
				throw thisFromOtherForThrow(e);
			}
			return this.fromOtherWithContext(res);
		}

	}

	BaseHandler.prototype[thisSymbolNodeJSUtilInspectCustom] = undefined;
	BaseHandler.prototype[thisSymbolToStringTag] = 'VM2 Wrapper';
	BaseHandler.prototype[thisSymbolIterator] = undefined;

	function defaultFactory(object) {
		// Note: other@other(unsafe) returns@this(unsafe) throws@this(unsafe)
		return new BaseHandler(object);
	}

	class ProtectedHandler extends BaseHandler {

		getFactory() {
			return protectedFactory;
		}

		set(target, key, value, receiver) {
			// Note: target@this(unsafe) key@prim value@this(unsafe) receiver@this(unsafe) throws@this(unsafe)
			if (typeof value === 'function') {
				return thisReflectDefineProperty(receiver, key, {
					__proto__: null,
					value: value,
					writable: true,
					enumerable: true,
					configurable: true
				}) === true;
			}
			return super.set(target, key, value, receiver);
		}

		definePropertyDesc(target, prop, desc) {
			// Note: target@this(unsafe) prop@prim desc@this(safe) throws@this(unsafe)
			if (desc && (desc.set || desc.get || typeof desc.value === 'function')) return undefined;
			return desc;
		}

	}

	function protectedFactory(object) {
		// Note: other@other(unsafe) returns@this(unsafe) throws@this(unsafe)
		return new ProtectedHandler(object);
	}

	class ReadOnlyHandler extends BaseHandler {

		getFactory() {
			return readonlyFactory;
		}

		set(target, key, value, receiver) {
			// Note: target@this(unsafe) key@prim value@this(unsafe) receiver@this(unsafe) throws@this(unsafe)
			return thisReflectDefineProperty(receiver, key, {
				__proto__: null,
				value: value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}

		setPrototypeOf(target, value) {
			// Note: target@this(unsafe) throws@this(unsafe)
			return false;
		}

		defineProperty(target, prop, desc) {
			// Note: target@this(unsafe) prop@prim desc@this(unsafe) throws@this(unsafe)
			return false;
		}

		deleteProperty(target, prop) {
			// Note: target@this(unsafe) prop@prim throws@this(unsafe)
			return false;
		}

		isExtensible(target) {
			// Note: target@this(unsafe) throws@this(unsafe)
			return false;
		}

		preventExtensions(target) {
			// Note: target@this(unsafe) throws@this(unsafe)
			return false;
		}

	}

	function readonlyFactory(object) {
		// Note: other@other(unsafe) returns@this(unsafe) throws@this(unsafe)
		return new ReadOnlyHandler(object);
	}

	class ReadOnlyMockHandler extends ReadOnlyHandler {

		constructor(object, mock) {
			// Note: object@other(unsafe) mock:this(unsafe) throws@this(unsafe)
			super(object);
			this.mock = mock;
		}

		get(target, key, receiver) {
			// Note: target@this(unsafe) key@prim receiver@this(unsafe) throws@this(unsafe)
			const object = this.getObject(); // @other(unsafe)
			const mock = this.mock;
			if (thisReflectApply(thisObjectHasOwnProperty, mock, key) && !thisOtherHasOwnProperty(object, key)) {
				return mock[key];
			}
			return super.get(target, key, receiver);
		}

	}

	function thisFromOther(other) {
		// Note: other@other(unsafe) returns@this(unsafe) throws@this(unsafe)
		return thisFromOtherWithFactory(defaultFactory, other);
	}

	function thisProxyOther(factory, other, proto) {
		const target = thisCreateTargetObject(other, proto);
		const handler = factory(other);
		const proxy = new ThisProxy(target, handler);
		try {
			otherReflectApply(otherWeakMapSet, mappingThisToOther, [proxy, other]);
			registerProxy(proxy, handler);
		} catch (e) {
			throw new VMError('Unexpected error');
		}
		if (!isHost) {
			thisReflectApply(thisWeakMapSet, mappingOtherToThis, [other, proxy]);
			return proxy;
		}
		const proxy2 = new ThisProxy(proxy, emptyForzenObject);
		try {
			otherReflectApply(otherWeakMapSet, mappingThisToOther, [proxy2, other]);
			registerProxy(proxy2, handler);
		} catch (e) {
			throw new VMError('Unexpected error');
		}
		thisReflectApply(thisWeakMapSet, mappingOtherToThis, [other, proxy2]);
		return proxy2;
	}

	function thisEnsureThis(other) {
		const type = typeof other;
		switch (type) {
			case 'object':
				if (other === null) {
					return null;
				}
				// fallthrough
			case 'function':
				let proto = thisReflectGetPrototypeOf(other);
				if (!proto) {
					return other;
				}
				while (proto) {
					const mapping = thisReflectApply(thisMapGet, protoMappings, [proto]);
					if (mapping) {
						const mapped = thisReflectApply(thisWeakMapGet, mappingOtherToThis, [other]);
						if (mapped) return mapped;
						return mapping(defaultFactory, other);
					}
					proto = thisReflectGetPrototypeOf(proto);
				}
				return other;
			case 'undefined':
			case 'string':
			case 'number':
			case 'boolean':
			case 'symbol':
			case 'bigint':
				return other;

			default: // new, unknown types can be dangerous
				throw new VMError(\`Unknown type '\${type}'\`);
		}
	}

	function thisFromOtherForThrow(other) {
		for (let loop = 0; loop < 10; loop++) {
			const type = typeof other;
			switch (type) {
				case 'object':
					if (other === null) {
						return null;
					}
					// fallthrough
				case 'function':
					const mapped = thisReflectApply(thisWeakMapGet, mappingOtherToThis, [other]);
					if (mapped) return mapped;
					let proto;
					try {
						proto = otherReflectGetPrototypeOf(other);
					} catch (e) { // @other(unsafe)
						other = e;
						break;
					}
					if (!proto) {
						return thisProxyOther(defaultFactory, other, null);
					}
					for (;;) {
						const mapping = thisReflectApply(thisMapGet, protoMappings, [proto]);
						if (mapping) return mapping(defaultFactory, other);
						try {
							proto = otherReflectGetPrototypeOf(proto);
						} catch (e) { // @other(unsafe)
							other = e;
							break;
						}
						if (!proto) return thisProxyOther(defaultFactory, other, thisObjectPrototype);
					}
					break;
				case 'undefined':
				case 'string':
				case 'number':
				case 'boolean':
				case 'symbol':
				case 'bigint':
					return other;

				default: // new, unknown types can be dangerous
					throw new VMError(\`Unknown type '\${type}'\`);
			}
		}
		throw new VMError('Exception recursion depth');
	}

	function thisFromOtherWithFactory(factory, other, proto) {
		const type = typeof other;
		switch (type) {
			case 'object':
				if (other === null) {
					return null;
				}
				// fallthrough
			case 'function':
				const mapped = thisReflectApply(thisWeakMapGet, mappingOtherToThis, [other]);
				if (mapped) return mapped;
				if (proto) {
					return thisProxyOther(factory, other, proto);
				}
				try {
					proto = otherReflectGetPrototypeOf(other);
				} catch (e) { // @other(unsafe)
					throw thisFromOtherForThrow(e);
				}
				if (!proto) {
					return thisProxyOther(factory, other, null);
				}
				do {
					const mapping = thisReflectApply(thisMapGet, protoMappings, [proto]);
					if (mapping) return mapping(factory, other);
					try {
						proto = otherReflectGetPrototypeOf(proto);
					} catch (e) { // @other(unsafe)
						throw thisFromOtherForThrow(e);
					}
				} while (proto);
				return thisProxyOther(factory, other, thisObjectPrototype);
			case 'undefined':
			case 'string':
			case 'number':
			case 'boolean':
			case 'symbol':
			case 'bigint':
				return other;

			default: // new, unknown types can be dangerous
				throw new VMError(\`Unknown type '\${type}'\`);
		}
	}

	function thisFromOtherArguments(args) {
		// Note: args@other(safe-array) returns@this(safe-array) throws@this(unsafe)
		const arr = [];
		for (let i = 0; i < args.length; i++) {
			const value = thisFromOther(args[i]);
			thisReflectDefineProperty(arr, i, {
				__proto__: null,
				value: value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		return arr;
	}

	function thisConnect(obj, other) {
		// Note: obj@this(unsafe) other@other(unsafe) throws@this(unsafe)
		try {
			otherReflectApply(otherWeakMapSet, mappingThisToOther, [obj, other]);
		} catch (e) {
			throw new VMError('Unexpected error');
		}
		thisReflectApply(thisWeakMapSet, mappingOtherToThis, [other, obj]);
	}

	thisAddProtoMapping(thisGlobalPrototypes.Object, otherGlobalPrototypes.Object);
	thisAddProtoMapping(thisGlobalPrototypes.Array, otherGlobalPrototypes.Array);

	for (let i = 0; i < globalsList.length; i++) {
		const key = globalsList[i];
		const tp = thisGlobalPrototypes[key];
		const op = otherGlobalPrototypes[key];
		if (tp && op) thisAddProtoMapping(tp, op, key);
	}

	for (let i = 0; i < errorsList.length; i++) {
		const key = errorsList[i];
		const tp = thisGlobalPrototypes[key];
		const op = otherGlobalPrototypes[key];
		if (tp && op) thisAddProtoMapping(tp, op, 'Error');
	}

	thisAddProtoMapping(thisGlobalPrototypes.VMError, otherGlobalPrototypes.VMError, 'Error');

	result.BaseHandler = BaseHandler;
	result.ProtectedHandler = ProtectedHandler;
	result.ReadOnlyHandler = ReadOnlyHandler;
	result.ReadOnlyMockHandler = ReadOnlyMockHandler;

	return result;
}

exports.createBridge = createBridge;
exports.VMError = VMError;

return exports;})`),setupSandboxScript=compileScript$1(__dirname+"/setup-sandbox.js",`(function(global, host, bridge, data, context) { /* global host, bridge, data, context */

'use strict';

const {
	Object: localObject,
	Array: localArray,
	Error: LocalError,
	Reflect: localReflect,
	Proxy: LocalProxy,
	WeakMap: LocalWeakMap,
	Function: localFunction,
	Promise: localPromise,
	eval: localEval
} = global;

const {
	freeze: localObjectFreeze
} = localObject;

const {
	getPrototypeOf: localReflectGetPrototypeOf,
	apply: localReflectApply,
	deleteProperty: localReflectDeleteProperty,
	has: localReflectHas,
	defineProperty: localReflectDefineProperty,
	setPrototypeOf: localReflectSetPrototypeOf,
	getOwnPropertyDescriptor: localReflectGetOwnPropertyDescriptor
} = localReflect;

const {
	isArray: localArrayIsArray
} = localArray;

const {
	ensureThis,
	ReadOnlyHandler,
	from,
	fromWithFactory,
	readonlyFactory,
	connect,
	addProtoMapping,
	VMError,
	ReadOnlyMockHandler
} = bridge;

const {
	allowAsync,
	GeneratorFunction,
	AsyncFunction,
	AsyncGeneratorFunction
} = data;

const {
	get: localWeakMapGet,
	set: localWeakMapSet
} = LocalWeakMap.prototype;

function localUnexpected() {
	return new VMError('Should not happen');
}

// global is originally prototype of host.Object so it can be used to climb up from the sandbox.
if (!localReflectSetPrototypeOf(context, localObject.prototype)) throw localUnexpected();

Object.defineProperties(global, {
	global: {value: global, writable: true, configurable: true, enumerable: true},
	globalThis: {value: global, writable: true, configurable: true},
	GLOBAL: {value: global, writable: true, configurable: true},
	root: {value: global, writable: true, configurable: true},
	Error: {value: LocalError}
});

if (!localReflectDefineProperty(global, 'VMError', {
	__proto__: null,
	value: VMError,
	writable: true,
	enumerable: false,
	configurable: true
})) throw localUnexpected();

// Fixes buffer unsafe allocation
/* eslint-disable no-use-before-define */
class BufferHandler extends ReadOnlyHandler {

	apply(target, thiz, args) {
		if (args.length > 0 && typeof args[0] === 'number') {
			return LocalBuffer.alloc(args[0]);
		}
		return localReflectApply(LocalBuffer.from, LocalBuffer, args);
	}

	construct(target, args, newTarget) {
		if (args.length > 0 && typeof args[0] === 'number') {
			return LocalBuffer.alloc(args[0]);
		}
		return localReflectApply(LocalBuffer.from, LocalBuffer, args);
	}

}
/* eslint-enable no-use-before-define */

const LocalBuffer = fromWithFactory(obj => new BufferHandler(obj), host.Buffer);


if (!localReflectDefineProperty(global, 'Buffer', {
	__proto__: null,
	value: LocalBuffer,
	writable: true,
	enumerable: false,
	configurable: true
})) throw localUnexpected();

addProtoMapping(LocalBuffer.prototype, host.Buffer.prototype, 'Uint8Array');

/**
 *
 * @param {*} size Size of new buffer
 * @this LocalBuffer
 * @return {LocalBuffer}
 */
function allocUnsafe(size) {
	return LocalBuffer.alloc(size);
}

connect(allocUnsafe, host.Buffer.allocUnsafe);

/**
 *
 * @param {*} size Size of new buffer
 * @this LocalBuffer
 * @return {LocalBuffer}
 */
function allocUnsafeSlow(size) {
	return LocalBuffer.alloc(size);
}

connect(allocUnsafeSlow, host.Buffer.allocUnsafeSlow);

/**
 * Replacement for Buffer inspect
 *
 * @param {*} recurseTimes
 * @param {*} ctx
 * @this LocalBuffer
 * @return {string}
 */
function inspect(recurseTimes, ctx) {
	// Mimic old behavior, could throw but didn't pass a test.
	const max = host.INSPECT_MAX_BYTES;
	const actualMax = Math.min(max, this.length);
	const remaining = this.length - max;
	let str = this.hexSlice(0, actualMax).replace(/(.{2})/g, '$1 ').trim();
	if (remaining > 0) str += \` ... \${remaining} more byte\${remaining > 1 ? 's' : ''}\`;
	return \`<\${this.constructor.name} \${str}>\`;
}

connect(inspect, host.Buffer.prototype.inspect);

connect(localFunction.prototype.bind, host.Function.prototype.bind);

connect(localObject.prototype.__defineGetter__, host.Object.prototype.__defineGetter__);
connect(localObject.prototype.__defineSetter__, host.Object.prototype.__defineSetter__);
connect(localObject.prototype.__lookupGetter__, host.Object.prototype.__lookupGetter__);
connect(localObject.prototype.__lookupSetter__, host.Object.prototype.__lookupSetter__);

/*
 * PrepareStackTrace sanitization
 */

const oldPrepareStackTraceDesc = localReflectGetOwnPropertyDescriptor(LocalError, 'prepareStackTrace');

let currentPrepareStackTrace = LocalError.prepareStackTrace;
const wrappedPrepareStackTrace = new LocalWeakMap();
if (typeof currentPrepareStackTrace === 'function') {
	wrappedPrepareStackTrace.set(currentPrepareStackTrace, currentPrepareStackTrace);
}

let OriginalCallSite;
LocalError.prepareStackTrace = (e, sst) => {
	OriginalCallSite = sst[0].constructor;
};
new LocalError().stack;
if (typeof OriginalCallSite === 'function') {
	LocalError.prepareStackTrace = undefined;

	function makeCallSiteGetters(list) {
		const callSiteGetters = [];
		for (let i=0; i<list.length; i++) {
			const name = list[i];
			const func = OriginalCallSite.prototype[name];
			callSiteGetters[i] = {__proto__: null,
				name,
				propName: '_' + name,
				func: (thiz) => {
					return localReflectApply(func, thiz, []);
				}
			};
		}
		return callSiteGetters;
	}

	function applyCallSiteGetters(thiz, callSite, getters) {
		for (let i=0; i<getters.length; i++) {
			const getter = getters[i];
			localReflectDefineProperty(thiz, getter.propName, {
				__proto__: null,
				value: getter.func(callSite)
			});
		}
	}

	const callSiteGetters = makeCallSiteGetters([
		'getTypeName',
		'getFunctionName',
		'getMethodName',
		'getFileName',
		'getLineNumber',
		'getColumnNumber',
		'getEvalOrigin',
		'isToplevel',
		'isEval',
		'isNative',
		'isConstructor',
		'isAsync',
		'isPromiseAll',
		'getPromiseIndex'
	]);

	class CallSite {
		constructor(callSite) {
			applyCallSiteGetters(this, callSite, callSiteGetters);
		}
		getThis() {
			return undefined;
		}
		getFunction() {
			return undefined;
		}
		toString() {
			return 'CallSite {}';
		}
	}


	for (let i=0; i<callSiteGetters.length; i++) {
		const name = callSiteGetters[i].name;
		const funcProp = localReflectGetOwnPropertyDescriptor(OriginalCallSite.prototype, name);
		if (!funcProp) continue;
		const propertyName = callSiteGetters[i].propName;
		const func = {func() {
			return this[propertyName];
		}}.func;
		const nameProp = localReflectGetOwnPropertyDescriptor(func, 'name');
		if (!nameProp) throw localUnexpected();
		nameProp.value = name;
		if (!localReflectDefineProperty(func, 'name', nameProp)) throw localUnexpected();
		funcProp.value = func;
		if (!localReflectDefineProperty(CallSite.prototype, name, funcProp)) throw localUnexpected();
	}

	if (!localReflectDefineProperty(LocalError, 'prepareStackTrace', {
		configurable: false,
		enumerable: false,
		get() {
			return currentPrepareStackTrace;
		},
		set(value) {
			if (typeof(value) !== 'function') {
				currentPrepareStackTrace = value;
				return;
			}
			const wrapped = localReflectApply(localWeakMapGet, wrappedPrepareStackTrace, [value]);
			if (wrapped) {
				currentPrepareStackTrace = wrapped;
				return;
			}
			const newWrapped = (error, sst) => {
				if (localArrayIsArray(sst)) {
					for (let i=0; i < sst.length; i++) {
						const cs = sst[i];
						if (typeof cs === 'object' && localReflectGetPrototypeOf(cs) === OriginalCallSite.prototype) {
							sst[i] = new CallSite(cs);
						}
					}
				}
				return value(error, sst);
			};
			localReflectApply(localWeakMapSet, wrappedPrepareStackTrace, [value, newWrapped]);
			localReflectApply(localWeakMapSet, wrappedPrepareStackTrace, [newWrapped, newWrapped]);
			currentPrepareStackTrace = newWrapped;
		}
	})) throw localUnexpected();
} else if (oldPrepareStackTraceDesc) {
	localReflectDefineProperty(LocalError, 'prepareStackTrace', oldPrepareStackTraceDesc);
} else {
	localReflectDeleteProperty(LocalError, 'prepareStackTrace');
}

/*
 * Exception sanitization
 */

const withProxy = localObjectFreeze({
	__proto__: null,
	has(target, key) {
		if (key === host.INTERNAL_STATE_NAME) return false;
		return localReflectHas(target, key);
	}
});

const interanState = localObjectFreeze({
	__proto__: null,
	wrapWith(x) {
		if (x === null || x === undefined) return x;
		return new LocalProxy(localObject(x), withProxy);
	},
	handleException: ensureThis,
	import(what) {
		throw new VMError('Dynamic Import not supported');
	}
});

if (!localReflectDefineProperty(global, host.INTERNAL_STATE_NAME, {
	__proto__: null,
	configurable: false,
	enumerable: false,
	writable: false,
	value: interanState
})) throw localUnexpected();

/*
 * Eval sanitization
 */

function throwAsync() {
	return new VMError('Async not available');
}

function makeFunction(inputArgs, isAsync, isGenerator) {
	const lastArgs = inputArgs.length - 1;
	let code = lastArgs >= 0 ? \`\${inputArgs[lastArgs]}\` : '';
	let args = lastArgs > 0 ? \`\${inputArgs[0]}\` : '';
	for (let i = 1; i < lastArgs; i++) {
		args += \`,\${inputArgs[i]}\`;
	}
	try {
		code = host.transformAndCheck(args, code, isAsync, isGenerator, allowAsync);
	} catch (e) {
		throw bridge.from(e);
	}
	return localEval(code);
}

const FunctionHandler = {
	__proto__: null,
	apply(target, thiz, args) {
		return makeFunction(args, this.isAsync, this.isGenerator);
	},
	construct(target, args, newTarget) {
		return makeFunction(args, this.isAsync, this.isGenerator);
	}
};

const EvalHandler = {
	__proto__: null,
	apply(target, thiz, args) {
		if (args.length === 0) return undefined;
		let code = \`\${args[0]}\`;
		try {
			code = host.transformAndCheck(null, code, false, false, allowAsync);
		} catch (e) {
			throw bridge.from(e);
		}
		return localEval(code);
	}
};

const AsyncErrorHandler = {
	__proto__: null,
	apply(target, thiz, args) {
		throw throwAsync();
	},
	construct(target, args, newTarget) {
		throw throwAsync();
	}
};

function makeCheckFunction(isAsync, isGenerator) {
	if (isAsync && !allowAsync) return AsyncErrorHandler;
	return {
		__proto__: FunctionHandler,
		isAsync,
		isGenerator
	};
}

function overrideWithProxy(obj, prop, value, handler) {
	const proxy = new LocalProxy(value, handler);
	if (!localReflectDefineProperty(obj, prop, {__proto__: null, value: proxy})) throw localUnexpected();
	return proxy;
}

const proxiedFunction = overrideWithProxy(localFunction.prototype, 'constructor', localFunction, makeCheckFunction(false, false));
if (GeneratorFunction) {
	if (!localReflectSetPrototypeOf(GeneratorFunction, proxiedFunction)) throw localUnexpected();
	overrideWithProxy(GeneratorFunction.prototype, 'constructor', GeneratorFunction, makeCheckFunction(false, true));
}
if (AsyncFunction) {
	if (!localReflectSetPrototypeOf(AsyncFunction, proxiedFunction)) throw localUnexpected();
	overrideWithProxy(AsyncFunction.prototype, 'constructor', AsyncFunction, makeCheckFunction(true, false));
}
if (AsyncGeneratorFunction) {
	if (!localReflectSetPrototypeOf(AsyncGeneratorFunction, proxiedFunction)) throw localUnexpected();
	overrideWithProxy(AsyncGeneratorFunction.prototype, 'constructor', AsyncGeneratorFunction, makeCheckFunction(true, true));
}

global.Function = proxiedFunction;
global.eval = new LocalProxy(localEval, EvalHandler);

/*
 * Promise sanitization
 */

if (localPromise && !allowAsync) {

	const PromisePrototype = localPromise.prototype;

	overrideWithProxy(PromisePrototype, 'then', PromisePrototype.then, AsyncErrorHandler);
	// This seems not to work, and will produce
	// UnhandledPromiseRejectionWarning: TypeError: Method Promise.prototype.then called on incompatible receiver [object Object].
	// This is likely caused since the host.Promise.prototype.then cannot use the VM Proxy object.
	// Contextify.connect(host.Promise.prototype.then, Promise.prototype.then);

	if (PromisePrototype.finally) {
		overrideWithProxy(PromisePrototype, 'finally', PromisePrototype.finally, AsyncErrorHandler);
		// Contextify.connect(host.Promise.prototype.finally, Promise.prototype.finally);
	}
	if (Promise.prototype.catch) {
		overrideWithProxy(PromisePrototype, 'catch', PromisePrototype.catch, AsyncErrorHandler);
		// Contextify.connect(host.Promise.prototype.catch, Promise.prototype.catch);
	}

}

function readonly(other, mock) {
	// Note: other@other(unsafe) mock@other(unsafe) returns@this(unsafe) throws@this(unsafe)
	if (!mock) return fromWithFactory(readonlyFactory, other);
	const tmock = from(mock);
	return fromWithFactory(obj=>new ReadOnlyMockHandler(obj, tmock), other);
}

return {
	__proto__: null,
	readonly,
	global
};

})`),getGlobalScript=compileScript$1("get_global.js","this");let getGeneratorFunctionScript=null,getAsyncFunctionScript=null,getAsyncGeneratorFunctionScript=null;try{getGeneratorFunctionScript=compileScript$1("get_generator_function.js","(function*(){}).constructor")}catch(ex){}try{getAsyncFunctionScript=compileScript$1("get_async_function.js","(async function(){}).constructor")}catch(ex){}try{getAsyncGeneratorFunctionScript=compileScript$1("get_async_generator_function.js","(async function*(){}).constructor")}catch(ex){}let VM$5=class VM extends EventEmitter$1{constructor(e={}){super();var{timeout:t,sandbox:r,compiler:i="javascript",allowAsync:n=!0}=e,s=!1!==e.eval,o=!1!==e.wasm,n=n&&!e.fixAsync;if(r&&"object"!=typeof r)throw new VMError$4("Sandbox must be object.");e=lookupCompiler(i);const a=createContext(void 0,{__proto__:null,codeGeneration:{__proto__:null,strings:s,wasm:o}});s=getGlobalScript.runInContext(a,DEFAULT_RUN_OPTIONS),o=bridgeScript.runInContext(a,DEFAULT_RUN_OPTIONS)(s).createBridge;const c=createBridge(o,()=>{});o={__proto__:null,allowAsync:n};getGeneratorFunctionScript&&(o.GeneratorFunction=getGeneratorFunctionScript.runInContext(a,DEFAULT_RUN_OPTIONS)),getAsyncFunctionScript&&(o.AsyncFunction=getAsyncFunctionScript.runInContext(a,DEFAULT_RUN_OPTIONS)),getAsyncGeneratorFunctionScript&&(o.AsyncGeneratorFunction=getAsyncGeneratorFunctionScript.runInContext(a,DEFAULT_RUN_OPTIONS));const u=setupSandboxScript.runInContext(a,DEFAULT_RUN_OPTIONS)(s,HOST$1,c.other,o,a);objectDefineProperties$1(this,{__proto__:null,timeout:{__proto__:null,value:t,writable:!0,enumerable:!0},compiler:{__proto__:null,value:i,enumerable:!0},sandbox:{__proto__:null,value:c.from(s),enumerable:!0},_runScript:{__proto__:null,value:e=>{let t;try{t=e.runInContext(a,DEFAULT_RUN_OPTIONS)}catch(e){throw c.from(e)}return c.from(t)}},_makeReadonly:{__proto__:null,value:(e,t)=>{try{u.readonly(e,t)}catch(e){throw c.from(e)}return e}},_makeProtected:{__proto__:null,value:e=>{var t=c.other;try{t.fromWithFactory(t.protectedFactory,e)}catch(e){throw c.from(e)}return e}},_addProtoMapping:{__proto__:null,value:(e,t)=>{var r=c.other;let i;try{i=r.from(t),r.addProtoMapping(i,e)}catch(e){throw c.from(e)}c.addProtoMapping(e,i)}},_addProtoMappingFactory:{__proto__:null,value:(t,r)=>{var e=c.other,i=()=>{var e=r(this);return c.addProtoMapping(t,e),e};try{var n=e.from(i);e.addProtoMappingFactory(n,t)}catch(e){throw c.from(e)}}},_compiler:{__proto__:null,value:e},_allowAsync:{__proto__:null,value:n}}),r&&this.setGlobals(r)}setGlobals(e){for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(this.sandbox[t]=e[t]);return this}setGlobal(e,t){return this.sandbox[e]=t,this}getGlobal(e){return this.sandbox[e]}freeze(e,t){return this.readonly(e),t&&(this.sandbox[t]=e),e}readonly(e,t){return this._makeReadonly(e,t)}protect(e,t){return this._makeProtected(e),t&&(this.sandbox[t]=e),e}run(e,t){let r,i;var n;return i="object"==typeof t?t.filename:t,e instanceof VMScript$4?(r=e._compileVM(),checkAsync(this._allowAsync||!e._hasAsync)):(t=i||"vm.js",e=this._compiler(e,t),e=(n=transformer$1(null,e,!1,!1,t)).code,checkAsync(this._allowAsync||!n.hasAsync),r=new Script$1(e,{__proto__:null,filename:t,displayErrors:!1})),this.timeout?doWithTimeout(()=>this._runScript(r),this.timeout):this._runScript(r)}runFile(e){var t=pa$2.resolve(e);if(!fs$2.existsSync(t))throw new VMError$4(`Script '${e}' not found.`);if(fs$2.statSync(t).isDirectory())throw new VMError$4("Script must be file, got directory.");return this.run(fs$2.readFileSync(t,"utf8"),t)}};vm.VM=VM$5;var nodevm={};function commonjsRequire(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var resolverCompat={},util$1={},types={},shams$1=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"!=typeof Symbol.iterator){var e={},t=Symbol("test"),r=Object(t);if("string"==typeof t)return!1;if("[object Symbol]"!==Object.prototype.toString.call(t))return!1;if("[object Symbol]"!==Object.prototype.toString.call(r))return!1;for(t in e[t]=42,e)return!1;if("function"==typeof Object.keys&&0!==Object.keys(e).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(e).length)return!1;r=Object.getOwnPropertySymbols(e);if(1!==r.length||r[0]!==t)return!1;if(!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){r=Object.getOwnPropertyDescriptor(e,t);if(42!==r.value||!0!==r.enumerable)return!1}}return!0},hasSymbols$2=shams$1,shams=function(){return hasSymbols$2()&&!!Symbol.toStringTag},origSymbol="undefined"!=typeof Symbol&&Symbol,hasSymbolSham=shams$1,hasSymbols$1=function(){return"function"==typeof origSymbol&&"function"==typeof Symbol&&"symbol"==typeof origSymbol("foo")&&"symbol"==typeof Symbol("bar")&&hasSymbolSham()},ERROR_MESSAGE="Function.prototype.bind called on incompatible ",slice=Array.prototype.slice,toStr$3=Object.prototype.toString,funcType="[object Function]",implementation$1=function(t){var r=this;if("function"!=typeof r||toStr$3.call(r)!==funcType)throw new TypeError(ERROR_MESSAGE+r);for(var i,e,n=slice.call(arguments,1),s=Math.max(0,r.length-n.length),o=[],a=0;a<s;a++)o.push("$"+a);return i=Function("binder","return function ("+o.join(",")+"){ return binder.apply(this,arguments); }")(function(){var e;return this instanceof i?(e=r.apply(this,n.concat(slice.call(arguments))),Object(e)===e?e:this):r.apply(t,n.concat(slice.call(arguments)))}),r.prototype&&((e=function(){}).prototype=r.prototype,i.prototype=new e,e.prototype=null),i},implementation=implementation$1,functionBind=Function.prototype.bind||implementation,bind$1=functionBind,src$1=bind$1.call(Function.call,Object.prototype.hasOwnProperty),undefined$1,$SyntaxError=SyntaxError,$Function=Function,$TypeError=TypeError,getEvalledConstructor=function(e){try{return $Function('"use strict"; return ('+e+").constructor;")()}catch(e){}},$gOPD$1=Object.getOwnPropertyDescriptor,throwTypeError=function(){throw new $TypeError},ThrowTypeError=$gOPD$1?function(){try{return throwTypeError}catch(e){try{return $gOPD$1(arguments,"callee").get}catch(e){return throwTypeError}}}():throwTypeError,hasSymbols=hasSymbols$1(),getProto$1=Object.getPrototypeOf||function(e){return e.__proto__},needsEval={},TypedArray="undefined"==typeof Uint8Array?undefined$1:getProto$1(Uint8Array),INTRINSICS={"%AggregateError%":"undefined"==typeof AggregateError?undefined$1:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?undefined$1:ArrayBuffer,"%ArrayIteratorPrototype%":hasSymbols?getProto$1([][Symbol.iterator]()):undefined$1,"%AsyncFromSyncIteratorPrototype%":undefined$1,"%AsyncFunction%":needsEval,"%AsyncGenerator%":needsEval,"%AsyncGeneratorFunction%":needsEval,"%AsyncIteratorPrototype%":needsEval,"%Atomics%":"undefined"==typeof Atomics?undefined$1:Atomics,"%BigInt%":"undefined"==typeof BigInt?undefined$1:BigInt,"%BigInt64Array%":"undefined"==typeof BigInt64Array?undefined$1:BigInt64Array,"%BigUint64Array%":"undefined"==typeof BigUint64Array?undefined$1:BigUint64Array,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?undefined$1:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?undefined$1:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?undefined$1:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?undefined$1:FinalizationRegistry,"%Function%":$Function,"%GeneratorFunction%":needsEval,"%Int8Array%":"undefined"==typeof Int8Array?undefined$1:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?undefined$1:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?undefined$1:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":hasSymbols?getProto$1(getProto$1([][Symbol.iterator]())):undefined$1,"%JSON%":"object"==typeof JSON?JSON:undefined$1,"%Map%":"undefined"==typeof Map?undefined$1:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&hasSymbols?getProto$1((new Map)[Symbol.iterator]()):undefined$1,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?undefined$1:Promise,"%Proxy%":"undefined"==typeof Proxy?undefined$1:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?undefined$1:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?undefined$1:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&hasSymbols?getProto$1((new Set)[Symbol.iterator]()):undefined$1,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?undefined$1:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":hasSymbols?getProto$1(""[Symbol.iterator]()):undefined$1,"%Symbol%":hasSymbols?Symbol:undefined$1,"%SyntaxError%":$SyntaxError,"%ThrowTypeError%":ThrowTypeError,"%TypedArray%":TypedArray,"%TypeError%":$TypeError,"%Uint8Array%":"undefined"==typeof Uint8Array?undefined$1:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?undefined$1:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?undefined$1:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?undefined$1:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?undefined$1:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?undefined$1:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?undefined$1:WeakSet},doEval=function e(t){var r,i;return"%AsyncFunction%"===t?r=getEvalledConstructor("async function () {}"):"%GeneratorFunction%"===t?r=getEvalledConstructor("function* () {}"):"%AsyncGeneratorFunction%"===t?r=getEvalledConstructor("async function* () {}"):"%AsyncGenerator%"===t?(i=e("%AsyncGeneratorFunction%"))&&(r=i.prototype):"%AsyncIteratorPrototype%"===t&&(i=e("%AsyncGenerator%"))&&(r=getProto$1(i.prototype)),INTRINSICS[t]=r},LEGACY_ALIASES={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},bind=functionBind,hasOwn=src$1,$concat=bind.call(Function.call,Array.prototype.concat),$spliceApply=bind.call(Function.apply,Array.prototype.splice),$replace=bind.call(Function.call,String.prototype.replace),$strSlice=bind.call(Function.call,String.prototype.slice),$exec=bind.call(Function.call,RegExp.prototype.exec),rePropName=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,reEscapeChar=/\\(\\)?/g,stringToPath=function(e){var t=$strSlice(e,0,1),r=$strSlice(e,-1);if("%"===t&&"%"!==r)throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");if("%"===r&&"%"!==t)throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");var n=[];return $replace(e,rePropName,function(e,t,r,i){n[n.length]=r?$replace(i,reEscapeChar,"$1"):t||e}),n},getBaseIntrinsic=function(e,t){var r,i=e;if(hasOwn(LEGACY_ALIASES,i)&&(i="%"+(r=LEGACY_ALIASES[i])[0]+"%"),hasOwn(INTRINSICS,i)){var n=INTRINSICS[i];if(void 0!==(n=n===needsEval?doEval(i):n)||t)return{alias:r,name:i,value:n};throw new $TypeError("intrinsic "+e+" exists, but is not available. Please file an issue!")}throw new $SyntaxError("intrinsic "+e+" does not exist!")},getIntrinsic=function(e,t){if("string"!=typeof e||0===e.length)throw new $TypeError("intrinsic name must be a non-empty string");if(1<arguments.length&&"boolean"!=typeof t)throw new $TypeError('"allowMissing" argument must be a boolean');if(null===$exec(/^%?[^%]*%?$/,e))throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var r=stringToPath(e),i=0<r.length?r[0]:"",n=getBaseIntrinsic("%"+i+"%",t),s=(n.name,n.value),o=!1,n=n.alias;n&&(i=n[0],$spliceApply(r,$concat([0,1],n)));for(var a=1,c=!0;a<r.length;a+=1){var u=r[a],h=$strSlice(u,0,1),l=$strSlice(u,-1);if(('"'===h||"'"===h||"`"===h||'"'===l||"'"===l||"`"===l)&&h!==l)throw new $SyntaxError("property names with quotes must have matching quotes");if("constructor"!==u&&c||(o=!0),hasOwn(INTRINSICS,h="%"+(i+="."+u)+"%"))s=INTRINSICS[h];else if(null!=s){if(!(u in s)){if(t)return;throw new $TypeError("base intrinsic for "+e+" exists, but the property is not available.")}s=$gOPD$1&&a+1>=r.length?(c=!!(l=$gOPD$1(s,u)))&&"get"in l&&!("originalValue"in l.get)?l.get:s[u]:(c=hasOwn(s,u),s[u]),c&&!o&&(INTRINSICS[h]=s)}}return s},callBindExports={},callBind$1={get exports(){return callBindExports},set exports(e){callBindExports=e}},GetIntrinsic$1=(!function(e){var r=functionBind,t=getIntrinsic,i=t("%Function.prototype.apply%"),n=t("%Function.prototype.call%"),s=t("%Reflect.apply%",!0)||r.call(n,i),o=t("%Object.getOwnPropertyDescriptor%",!0),a=t("%Object.defineProperty%",!0),c=t("%Math.max%");if(a)try{a({},"a",{value:1})}catch(e){a=null}e.exports=function(e){var t=s(r,n,arguments);return o&&a&&o(t,"length").configurable&&a(t,"length",{value:1+c(0,e.length-(arguments.length-1))}),t};function u(){return s(r,i,arguments)}a?a(e.exports,"apply",{value:u}):e.exports.apply=u}(callBind$1),getIntrinsic),callBind=callBindExports,$indexOf$1=callBind(GetIntrinsic$1("String.prototype.indexOf")),callBound$3=function(e,t){t=GetIntrinsic$1(e,!!t);return"function"==typeof t&&-1<$indexOf$1(e,".prototype.")?callBind(t):t},hasToStringTag$4=shams(),callBound$2=callBound$3,$toString$2=callBound$2("Object.prototype.toString"),isStandardArguments=function(e){return!(hasToStringTag$4&&e&&"object"==typeof e&&Symbol.toStringTag in e)&&"[object Arguments]"===$toString$2(e)},isLegacyArguments=function(e){return!!isStandardArguments(e)||null!==e&&"object"==typeof e&&"number"==typeof e.length&&0<=e.length&&"[object Array]"!==$toString$2(e)&&"[object Function]"===$toString$2(e.callee)},supportsStandardArguments=function(){return isStandardArguments(arguments)}(),isArguments=(isStandardArguments.isLegacyArguments=isLegacyArguments,supportsStandardArguments?isStandardArguments:isLegacyArguments),toStr$2=Object.prototype.toString,fnToStr$1=Function.prototype.toString,isFnRegex=/^\s*(?:function)?\*/,hasToStringTag$3=shams(),getProto=Object.getPrototypeOf,getGeneratorFunc=function(){if(!hasToStringTag$3)return!1;try{return Function("return function*() {}")()}catch(e){}},GeneratorFunction,isGeneratorFunction=function(e){var t;return!("function"!=typeof e||!isFnRegex.test(fnToStr$1.call(e))&&(hasToStringTag$3?!getProto||(void 0===GeneratorFunction&&(t=getGeneratorFunc(),GeneratorFunction=!!t&&getProto(t)),getProto(e)!==GeneratorFunction):"[object GeneratorFunction]"!==toStr$2.call(e)))},fnToStr=Function.prototype.toString,reflectApply="object"==typeof Reflect&&null!==Reflect&&Reflect.apply,badArrayLike,isCallableMarker;if("function"==typeof reflectApply&&"function"==typeof Object.defineProperty)try{badArrayLike=Object.defineProperty({},"length",{get:function(){throw isCallableMarker}}),isCallableMarker={},reflectApply(function(){throw 42},null,badArrayLike)}catch(_){_!==isCallableMarker&&(reflectApply=null)}else reflectApply=null;var constructorRegex=/^\s*class\b/,isES6ClassFn=function(e){try{var t=fnToStr.call(e);return constructorRegex.test(t)}catch(e){return!1}},tryFunctionObject=function(e){try{return isES6ClassFn(e)?!1:(fnToStr.call(e),!0)}catch(e){return!1}},toStr$1=Object.prototype.toString,objectClass="[object Object]",fnClass="[object Function]",genClass="[object GeneratorFunction]",ddaClass="[object HTMLAllCollection]",ddaClass2="[object HTML document.all class]",ddaClass3="[object HTMLCollection]",hasToStringTag$2="function"==typeof Symbol&&!!Symbol.toStringTag,isIE68=!(0 in[,]),isDDA=function(){return!1},all,isCallable$1=("object"==typeof document&&(all=document.all,toStr$1.call(all)===toStr$1.call(document.all))&&(isDDA=function(e){if((isIE68||!e)&&(void 0===e||"object"==typeof e))try{var t=toStr$1.call(e);return(t===ddaClass||t===ddaClass2||t===ddaClass3||t===objectClass)&&null==e("")}catch(e){}return!1}),reflectApply?function(e){if(isDDA(e))return!0;if(!e)return!1;if("function"!=typeof e&&"object"!=typeof e)return!1;try{reflectApply(e,null,badArrayLike)}catch(e){if(e!==isCallableMarker)return!1}return!isES6ClassFn(e)&&tryFunctionObject(e)}:function(e){var t;return!!isDDA(e)||!!e&&("function"==typeof e||"object"==typeof e)&&(hasToStringTag$2||!(isES6ClassFn(e)||(t=toStr$1.call(e))!==fnClass&&t!==genClass&&!/^\[object HTML/.test(t)))&&tryFunctionObject(e)}),isCallable=isCallable$1,toStr=Object.prototype.toString,hasOwnProperty=Object.prototype.hasOwnProperty,forEachArray=function(e,t,r){for(var i=0,n=e.length;i<n;i++)hasOwnProperty.call(e,i)&&(null==r?t(e[i],i,e):t.call(r,e[i],i,e))},forEachString=function(e,t,r){for(var i=0,n=e.length;i<n;i++)null==r?t(e.charAt(i),i,e):t.call(r,e.charAt(i),i,e)},forEachObject=function(e,t,r){for(var i in e)hasOwnProperty.call(e,i)&&(null==r?t(e[i],i,e):t.call(r,e[i],i,e))},forEach$2=function(e,t,r){if(!isCallable(t))throw new TypeError("iterator must be a function");var i;3<=arguments.length&&(i=r),("[object Array]"===toStr.call(e)?forEachArray:"string"==typeof e?forEachString:forEachObject)(e,t,i)},forEach_1=forEach$2,possibleNames=["BigInt64Array","BigUint64Array","Float32Array","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Uint8Array","Uint8ClampedArray"],g$2="undefined"==typeof globalThis?commonjsGlobal:globalThis,availableTypedArrays$2=function(){for(var e=[],t=0;t<possibleNames.length;t++)"function"==typeof g$2[possibleNames[t]]&&(e[e.length]=possibleNames[t]);return e},GetIntrinsic=getIntrinsic,$gOPD=GetIntrinsic("%Object.getOwnPropertyDescriptor%",!0);if($gOPD)try{$gOPD([],"length")}catch(e){$gOPD=null}var gopd=$gOPD,forEach$1=forEach_1,availableTypedArrays$1=availableTypedArrays$2,callBound$1=callBound$3,$toString$1=callBound$1("Object.prototype.toString"),hasToStringTag$1=shams(),gOPD$1=gopd,g$1="undefined"==typeof globalThis?commonjsGlobal:globalThis,typedArrays$1=availableTypedArrays$1(),$indexOf=callBound$1("Array.prototype.indexOf",!0)||function(e,t){for(var r=0;r<e.length;r+=1)if(e[r]===t)return r;return-1},$slice$1=callBound$1("String.prototype.slice"),toStrTags$1={},getPrototypeOf$1=Object.getPrototypeOf,tryTypedArrays$1=(hasToStringTag$1&&gOPD$1&&getPrototypeOf$1&&forEach$1(typedArrays$1,function(e){var t,r=new g$1[e];Symbol.toStringTag in r&&(r=getPrototypeOf$1(r),(t=gOPD$1(r,Symbol.toStringTag))||(r=getPrototypeOf$1(r),t=gOPD$1(r,Symbol.toStringTag)),toStrTags$1[e]=t.get)}),function(r){var i=!1;return forEach$1(toStrTags$1,function(e,t){if(!i)try{i=e.call(r)===t}catch(e){}}),i}),isTypedArray$1=function(e){return!(!e||"object"!=typeof e)&&(hasToStringTag$1&&Symbol.toStringTag in e?!!gOPD$1&&tryTypedArrays$1(e):(e=$slice$1($toString$1(e),8,-1),-1<$indexOf(typedArrays$1,e)))},forEach=forEach_1,availableTypedArrays=availableTypedArrays$2,callBound=callBound$3,gOPD=gopd,$toString=callBound("Object.prototype.toString"),hasToStringTag=shams(),g="undefined"==typeof globalThis?commonjsGlobal:globalThis,typedArrays=availableTypedArrays(),$slice=callBound("String.prototype.slice"),toStrTags={},getPrototypeOf=Object.getPrototypeOf,tryTypedArrays=(hasToStringTag&&gOPD&&getPrototypeOf&&forEach(typedArrays,function(e){var t,r;"function"==typeof g[e]&&(t=new g[e],Symbol.toStringTag in t)&&(t=getPrototypeOf(t),(r=gOPD(t,Symbol.toStringTag))||(t=getPrototypeOf(t),r=gOPD(t,Symbol.toStringTag)),toStrTags[e]=r.get)}),function(i){var n=!1;return forEach(toStrTags,function(e,t){if(!n)try{var r=e.call(i);r===t&&(n=r)}catch(e){}}),n}),isTypedArray=isTypedArray$1,whichTypedArray=function(e){return!!isTypedArray(e)&&(hasToStringTag&&Symbol.toStringTag in e?tryTypedArrays(e):$slice($toString(e),8,-1))},isBuffer=(!function(t){var e=isArguments,r=isGeneratorFunction,i=whichTypedArray,n=isTypedArray$1;function s(e){return e.call.bind(e)}var o,a,c="undefined"!=typeof BigInt,u="undefined"!=typeof Symbol,h=s(Object.prototype.toString),l=s(Number.prototype.valueOf),p=s(String.prototype.valueOf),f=s(Boolean.prototype.valueOf);function d(e,t){if("object"!=typeof e)return!1;try{return t(e),!0}catch(e){return!1}}function m(e){return"[object Map]"===h(e)}function y(e){return"[object Set]"===h(e)}function g(e){return"[object WeakMap]"===h(e)}function x(e){return"[object WeakSet]"===h(e)}function E(e){return"[object ArrayBuffer]"===h(e)}function v(e){return"undefined"!=typeof ArrayBuffer&&(E.working?E(e):e instanceof ArrayBuffer)}function b(e){return"[object DataView]"===h(e)}function S(e){return"undefined"!=typeof DataView&&(b.working?b(e):e instanceof DataView)}c&&(o=s(BigInt.prototype.valueOf)),u&&(a=s(Symbol.prototype.valueOf)),t.isArgumentsObject=e,t.isGeneratorFunction=r,t.isTypedArray=n,t.isPromise=function(e){return"undefined"!=typeof Promise&&e instanceof Promise||null!==e&&"object"==typeof e&&"function"==typeof e.then&&"function"==typeof e.catch},t.isArrayBufferView=function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):n(e)||S(e)},t.isUint8Array=function(e){return"Uint8Array"===i(e)},t.isUint8ClampedArray=function(e){return"Uint8ClampedArray"===i(e)},t.isUint16Array=function(e){return"Uint16Array"===i(e)},t.isUint32Array=function(e){return"Uint32Array"===i(e)},t.isInt8Array=function(e){return"Int8Array"===i(e)},t.isInt16Array=function(e){return"Int16Array"===i(e)},t.isInt32Array=function(e){return"Int32Array"===i(e)},t.isFloat32Array=function(e){return"Float32Array"===i(e)},t.isFloat64Array=function(e){return"Float64Array"===i(e)},t.isBigInt64Array=function(e){return"BigInt64Array"===i(e)},t.isBigUint64Array=function(e){return"BigUint64Array"===i(e)},m.working="undefined"!=typeof Map&&m(new Map),t.isMap=function(e){return"undefined"!=typeof Map&&(m.working?m(e):e instanceof Map)},y.working="undefined"!=typeof Set&&y(new Set),t.isSet=function(e){return"undefined"!=typeof Set&&(y.working?y(e):e instanceof Set)},g.working="undefined"!=typeof WeakMap&&g(new WeakMap),t.isWeakMap=function(e){return"undefined"!=typeof WeakMap&&(g.working?g(e):e instanceof WeakMap)},x.working="undefined"!=typeof WeakSet&&x(new WeakSet),t.isWeakSet=x,E.working="undefined"!=typeof ArrayBuffer&&E(new ArrayBuffer),t.isArrayBuffer=v,b.working="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView&&b(new DataView(new ArrayBuffer(1),0,1)),t.isDataView=S;var D="undefined"!=typeof SharedArrayBuffer?SharedArrayBuffer:void 0;function A(e){return"[object SharedArrayBuffer]"===h(e)}function w(e){return void 0!==D&&((A.working=void 0===A.working?A(new D):A.working)?A(e):e instanceof D)}function C(e){return d(e,l)}function _(e){return d(e,p)}function k(e){return d(e,f)}function F(e){return c&&d(e,o)}function P(e){return u&&d(e,a)}t.isSharedArrayBuffer=w,t.isAsyncFunction=function(e){return"[object AsyncFunction]"===h(e)},t.isMapIterator=function(e){return"[object Map Iterator]"===h(e)},t.isSetIterator=function(e){return"[object Set Iterator]"===h(e)},t.isGeneratorObject=function(e){return"[object Generator]"===h(e)},t.isWebAssemblyCompiledModule=function(e){return"[object WebAssembly.Module]"===h(e)},t.isNumberObject=C,t.isStringObject=_,t.isBooleanObject=k,t.isBigIntObject=F,t.isSymbolObject=P,t.isBoxedPrimitive=function(e){return C(e)||_(e)||k(e)||F(e)||P(e)},t.isAnyArrayBuffer=function(e){return"undefined"!=typeof Uint8Array&&(v(e)||w(e))},["isProxy","isExternal","isModuleNamespaceObject"].forEach(function(e){Object.defineProperty(t,e,{enumerable:!1,value:function(){throw new Error(e+" is not supported in userland")}})})}(types),function(e){return e instanceof Buffer}),inheritsExports={},inherits={get exports(){return inheritsExports},set exports(e){inheritsExports=e}},inherits_browserExports={},inherits_browser={get exports(){return inherits_browserExports},set exports(e){inherits_browserExports=e}},hasRequiredInherits_browser,hasRequiredInherits,hasRequiredUtil;function requireInherits_browser(){return hasRequiredInherits_browser||(hasRequiredInherits_browser=1,"function"==typeof Object.create?inherits_browser.exports=function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:inherits_browser.exports=function(e,t){var r;t&&(e.super_=t,(r=function(){}).prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e)}),inherits_browserExports}function requireInherits(){if(!hasRequiredInherits){hasRequiredInherits=1;var t=inherits;try{var e=requireUtil();if("function"!=typeof e.inherits)throw"";t.exports=e.inherits}catch(e){t.exports=requireInherits_browser()}}return inheritsExports}function requireUtil(){var h,e,t,a,i,n,r,o;return hasRequiredUtil||(hasRequiredUtil=1,h=util$1,t=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),r={},i=0;i<t.length;i++)r[t[i]]=Object.getOwnPropertyDescriptor(e,t[i]);return r},a=/%[sdj%]/g,h.format=function(e){if(!x(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(c(arguments[r]));return t.join(" ")}for(var r=1,i=arguments,n=i.length,s=String(e).replace(a,function(e){if("%%"===e)return"%";if(n<=r)return e;switch(e){case"%s":return String(i[r++]);case"%d":return Number(i[r++]);case"%j":try{return JSON.stringify(i[r++])}catch(e){return"[Circular]"}default:return e}}),o=i[r];r<n;o=i[++r])y(o)||!b(o)?s+=" "+o:s+=" "+c(o);return s},h.deprecate=function(e,t){var r;return"undefined"!=typeof process&&!0===process.noDeprecation?e:"undefined"==typeof process?function(){return h.deprecate(e,t).apply(this,arguments)}:(r=!1,function(){if(!r){if(process.throwDeprecation)throw new Error(t);process.traceDeprecation?console.trace(t):console.error(t),r=!0}return e.apply(this,arguments)})},i={},n=/^$/,process.env.NODE_DEBUG&&(e=(e=process.env.NODE_DEBUG).replace(/[|\\{}()[\]^$+?.]/g,"\\$&").replace(/\*/g,".*").replace(/,/g,"$|^").toUpperCase(),n=new RegExp("^"+e+"$","i")),h.debuglog=function(t){var r;return t=t.toUpperCase(),i[t]||(n.test(t)?(r=process.pid,i[t]=function(){var e=h.format.apply(h,arguments);console.error("%s %d: %s",t,r,e)}):i[t]=function(){}),i[t]},(h.inspect=c).colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},c.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},h.types=types,h.isArray=d,h.isBoolean=m,h.isNull=y,h.isNullOrUndefined=function(e){return null==e},h.isNumber=g,h.isString=x,h.isSymbol=function(e){return"symbol"==typeof e},h.isUndefined=E,h.isRegExp=v,h.types.isRegExp=v,h.isObject=b,h.isDate=S,h.types.isDate=S,h.isError=D,h.types.isNativeError=D,h.isFunction=A,h.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},h.isBuffer=isBuffer,r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],h.log=function(){var e,t;console.log("%s - %s",(e=new Date,t=[C(e.getHours()),C(e.getMinutes()),C(e.getSeconds())].join(":"),[e.getDate(),r[e.getMonth()],t].join(" ")),h.format.apply(h,arguments))},h.inherits=requireInherits(),h._extend=function(e,t){if(t&&b(t))for(var r=Object.keys(t),i=r.length;i--;)e[r[i]]=t[r[i]];return e},o="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0,h.promisify=function(s){if("function"!=typeof s)throw new TypeError('The "original" argument must be of type Function');if(o&&s[o]){var e;if("function"!=typeof(e=s[o]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,o,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var r,i,e=new Promise(function(e,t){r=e,i=t}),t=[],n=0;n<arguments.length;n++)t.push(arguments[n]);t.push(function(e,t){e?i(e):r(t)});try{s.apply(this,t)}catch(e){i(e)}return e}return Object.setPrototypeOf(e,Object.getPrototypeOf(s)),o&&Object.defineProperty(e,o,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,t(s))},h.promisify.custom=o,h.callbackify=function(s){if("function"!=typeof s)throw new TypeError('The "original" argument must be of type Function');function e(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);var r=e.pop();if("function"!=typeof r)throw new TypeError("The last argument must be of type Function");function i(){return r.apply(n,arguments)}var n=this;s.apply(this,e).then(function(e){process.nextTick(i.bind(null,null,e))},function(e){process.nextTick(function(e,t){var r;return e||((r=new Error("Promise was rejected with a falsy value")).reason=e,e=r),t(e)}.bind(null,e,i))})}return Object.setPrototypeOf(e,Object.getPrototypeOf(s)),Object.defineProperties(e,t(s)),e}),util$1;function c(e,t){var r={seen:[],stylize:u};return 3<=arguments.length&&(r.depth=arguments[2]),4<=arguments.length&&(r.colors=arguments[3]),m(t)?r.showHidden=t:t&&h._extend(r,t),E(r.showHidden)&&(r.showHidden=!1),E(r.depth)&&(r.depth=2),E(r.colors)&&(r.colors=!1),E(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=s),l(r,e,r.depth)}function s(e,t){t=c.styles[t];return t?"["+c.colors[t][0]+"m"+e+"["+c.colors[t][1]+"m":e}function u(e,t){return e}function l(t,r,i){if(t.customInspect&&r&&A(r.inspect)&&r.inspect!==h.inspect&&(!r.constructor||r.constructor.prototype!==r))return x(e=r.inspect(i,t))?e:l(t,e,i);var e=function(e,t){if(E(t))return e.stylize("undefined","undefined");{var r;if(x(t))return r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'",e.stylize(r,"string")}return g(t)?e.stylize(""+t,"number"):m(t)?e.stylize(""+t,"boolean"):y(t)?e.stylize("null","null"):void 0}(t,r);if(e)return e;var n,e=Object.keys(r),s=(n={},e.forEach(function(e,t){n[e]=!0}),n);if(t.showHidden&&(e=Object.getOwnPropertyNames(r)),D(r)&&(0<=e.indexOf("message")||0<=e.indexOf("description")))return p(r);if(0===e.length){if(A(r))return o=r.name?": "+r.name:"",t.stylize("[Function"+o+"]","special");if(v(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(S(r))return t.stylize(Date.prototype.toString.call(r),"date");if(D(r))return p(r)}var o="",a=!1,c=["{","}"];if(d(r)&&(a=!0,c=["[","]"]),A(r)&&(o=" [Function"+(r.name?": "+r.name:"")+"]"),v(r)&&(o=" "+RegExp.prototype.toString.call(r)),S(r)&&(o=" "+Date.prototype.toUTCString.call(r)),D(r)&&(o=" "+p(r)),0===e.length&&(!a||0==r.length))return c[0]+o+c[1];if(i<0)return v(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special");t.seen.push(r),u=a?function(t,r,i,n,e){for(var s=[],o=0,a=r.length;o<a;++o)_(r,String(o))?s.push(f(t,r,i,n,String(o),!0)):s.push("");return e.forEach(function(e){e.match(/^\d+$/)||s.push(f(t,r,i,n,e,!0))}),s}(t,r,i,s,e):e.map(function(e){return f(t,r,i,s,e,a)}),t.seen.pop();var u;return 60<u.reduce(function(e,t){return t.indexOf("\n"),e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)?c[0]+(""===o?"":o+"\n ")+" "+u.join(",\n  ")+" "+c[1]:c[0]+o+" "+u.join(", ")+" "+c[1]}function p(e){return"["+Error.prototype.toString.call(e)+"]"}function f(e,t,r,i,n,s){var o,a,t=Object.getOwnPropertyDescriptor(t,n)||{value:t[n]};if(t.get?a=t.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):t.set&&(a=e.stylize("[Setter]","special")),_(i,n)||(o="["+n+"]"),a||(e.seen.indexOf(t.value)<0?-1<(a=y(r)?l(e,t.value,null):l(e,t.value,r-1)).indexOf("\n")&&(a=s?a.split("\n").map(function(e){return"  "+e}).join("\n").slice(2):"\n"+a.split("\n").map(function(e){return"   "+e}).join("\n")):a=e.stylize("[Circular]","special")),E(o)){if(s&&n.match(/^\d+$/))return a;o=(o=JSON.stringify(""+n)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.slice(1,-1),e.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),e.stylize(o,"string"))}return o+": "+a}function d(e){return Array.isArray(e)}function m(e){return"boolean"==typeof e}function y(e){return null===e}function g(e){return"number"==typeof e}function x(e){return"string"==typeof e}function E(e){return void 0===e}function v(e){return b(e)&&"[object RegExp]"===w(e)}function b(e){return"object"==typeof e&&null!==e}function S(e){return b(e)&&"[object Date]"===w(e)}function D(e){return b(e)&&("[object Error]"===w(e)||e instanceof Error)}function A(e){return"function"==typeof e}function w(e){return Object.prototype.toString.call(e)}function C(e){return e<10?"0"+e.toString(10):e.toString(10)}function _(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}var resolver={};const{VMError:VMError$3}=bridge,{VMScript:VMScript$3}=script,EXPORTS_PATTERN=/^((?:@[^/\\%]+\/)?[^/\\%]+)(\/.*)?$/;function isArrayIndex(e){var t=+e;return""+t===e&&0<=t&&t<4294967295}let Resolver$1=class Resolver{constructor(e,t,r,i){this.fs=e,this.builtinModules=t,this.globalPaths=r,this.hostRequire=i}init(e){}pathResolve(e){return this.fs.resolve(e)}pathIsRelative(e){var t;return""!==e&&"."===e[0]&&(1===e.length||(t="."===e[1]?2:1,!(e.length<=t)&&this.fs.isSeparator(e[t])))}pathIsAbsolute(e){return""!==e&&(this.fs.isSeparator(e[0])||this.fs.isAbsolute(e))}pathConcat(...e){return this.fs.join(...e)}pathBasename(e){return this.fs.basename(e)}pathDirname(e){return this.fs.dirname(e)}lookupPaths(e,t){if("string"==typeof t)throw new Error("Id is not a string");return this.pathIsRelative(t)?[e.path||"."]:[...e.paths,...this.globalPaths]}getBuiltinModulesList(){return Object.getOwnPropertyNames(this.builtinModules)}loadBuiltinModule(e,t){var r=this.builtinModules[t];return r&&r(this,e,t)}loadJS(e,t,r){throw new VMError$3(`Access denied to require '${r}'`,"EDENIED")}loadJSON(e,t,r){throw new VMError$3(`Access denied to require '${r}'`,"EDENIED")}loadNode(e,t,r){throw new VMError$3(`Access denied to require '${r}'`,"EDENIED")}registerModule(e,t,r,i,n){}resolve(e,t,r,i,n){if("string"!=typeof t)throw new Error("Id is not a string");return t.startsWith("node:")||this.builtinModules[t]?t:this.resolveFull(e,t,r,i,n)}resolveFull(e,t,r,i,n){throw new VMError$3(`Cannot find module '${t}'`,"ENOTFOUND")}genLookupPaths(e){for(var t=[];;){"node_modules"!==this.pathBasename(e)&&t.push(this.pathConcat(e,"node_modules"));var r=this.pathDirname(e);if(r==e)break;e=r}return t}},DefaultResolver$1=class DefaultResolver extends Resolver$1{constructor(e,t,r,i,n,s,o,a,c){super(e,t,i,o),this.checkPath=r,this.pathContext=n,this.customResolver=s,this.compiler=a,this.strict=c,this.packageCache={__proto__:null},this.scriptCache={__proto__:null}}isPathAllowed(e){return this.checkPath(e)}pathTestIsDirectory(e){try{var t=this.fs.statSync(e,{__proto__:null,throwIfNoEntry:!1});return t&&t.isDirectory()}catch(e){return!1}}pathTestIsFile(e){try{var t=this.fs.statSync(e,{__proto__:null,throwIfNoEntry:!1});return t&&t.isFile()}catch(e){return!1}}readFile(e){return this.fs.readFileSync(e,{encoding:"utf8"})}readFileWhenExists(e){return this.pathTestIsFile(e)?this.readFile(e):void 0}readScript(e){let t=this.scriptCache[e];return t||(t=new VMScript$3(this.readFile(e),{filename:e,compiler:this.compiler}),this.scriptCache[e]=t),t}checkAccess(e,t){if(!this.isPathAllowed(t))throw new VMError$3(`Module '${t}' is not allowed to be required. The path is outside the border!`,"EDENIED")}loadJS(e,t,r){var i;r=this.pathResolve(r),this.checkAccess(t,r),"sandbox"===this.pathContext(r,"js")?(i=this.readScript(r),e.run(i,{filename:r,strict:this.strict,module:t,wrapper:"none",dirname:t.path})):(i=this.hostRequire(r),t.exports=e.readonly(i))}loadJSON(e,t,r){r=this.pathResolve(r),this.checkAccess(t,r);r=this.readFile(r);t.exports=e._jsonParse(r)}loadNode(e,t,r){if(r=this.pathResolve(r),this.checkAccess(t,r),"sandbox"===this.pathContext(r,"node"))throw new VMError$3("Native modules can be required only with context set to 'host'.");r=this.hostRequire(r);t.exports=e.readonly(r)}resolveFull(e,t,r,i,n){var s=Object.getOwnPropertyNames(i),o=e.path||".";let a=this.loadPackageSelf(t,o,s);if(a)return a;if("#"===t[0]&&(a=this.loadPackageImports(t,o,s)))return a;if(this.pathIsAbsolute(t)){if(a=this.loadAsFileOrDirectory(t,s))return a;throw new VMError$3(`Cannot find module '${t}'`,"ENOTFOUND")}if(this.pathIsRelative(t)){if("object"==typeof r&&null!==r){var c=r.paths;if(Array.isArray(c)){for(let e=0;e<c.length;e++)if(a=this.loadAsFileOrDirectory(this.pathConcat(c[e],t),s))return a}else{if(void 0!==c)throw new VMError$3("Invalid options.paths option.");if(a=this.loadAsFileOrDirectory(this.pathConcat(o,t),s))return a}}else if(a=this.loadAsFileOrDirectory(this.pathConcat(o,t),s))return a;throw new VMError$3(`Cannot find module '${t}'`,"ENOTFOUND")}let u;if("object"==typeof r&&null!==r){var h=r.paths;if(Array.isArray(h)){u=[];for(let e=0;e<h.length;e++){var l=this.genLookupPaths(h[e]);for(let e=0;e<l.length;e++)u.includes(l[e])||u.push(l[e]);if(0===e){var p=this.globalPaths;for(let e=0;e<p.length;e++)u.includes(p[e])||u.push(p[e])}}}else{if(void 0!==h)throw new VMError$3("Invalid options.paths option.");u=[...e.paths,...this.globalPaths]}}else u=[...e.paths,...this.globalPaths];return(a=(a=this.loadNodeModules(t,u,s))||this.customResolver(this,t,o,s))||super.resolveFull(e,t,r,i,n)}loadAsFileOrDirectory(e,t){var r=this.loadAsFile(e,t);return r||this.loadAsDirectory(e,t)}tryFile(e){return e=this.pathResolve(e),this.isPathAllowed(e)&&this.pathTestIsFile(e)?e:void 0}tryWithExtension(t,r){for(let e=0;e<r.length;e++){var i=r[e];if(i===this.pathBasename(i)){i=this.tryFile(t+i);if(i)return i}}}readPackage(t){var t=this.pathResolve(this.pathConcat(t,"package.json")),r=this.packageCache[t];if(void 0!==r)return r;if(this.isPathAllowed(t)){r=this.readFileWhenExists(t);if(!r)return this.packageCache[t]=!1;let e;try{e=JSON.parse(r)}catch(e){throw e.path=t,e.message="Error parsing "+t+": "+e.message,e}r={name:e.name,main:e.main,exports:e.exports,imports:e.imports,type:e.type};return this.packageCache[t]=r}}readPackageScope(e){for(;;){var t=this.pathDirname(e);if(t===e)break;if("node_modules"===this.pathBasename(t))break;var r=this.readPackage(t);if(r)return{data:r,scope:t};e=t}return{data:void 0,scope:void 0}}loadAsFile(e,t){var r=this.tryFile(e);return r||this.tryWithExtension(e,t)}loadIndex(e,t){return this.tryWithExtension(this.pathConcat(e,"index"),t)}loadAsPackage(e,t,r){if(t&&"string"==typeof t.main){var t=this.pathConcat(e,t.main),i=this.loadAsFile(t,r);if(i)return i;if(i=this.loadIndex(t,r))return i;if(i=this.loadIndex(e,r))return i;throw new VMError$3(`Cannot find module '${e}'`,"ENOTFOUND")}return this.loadIndex(e,r)}loadAsDirectory(e,t){var r=this.readPackage(e);return this.loadAsPackage(e,r,t)}loadNodeModules(t,r,i){for(let e=0;e<r.length;e++){var n=r[e],s=this.loadPackageExports(t,n,i);if(s)return s;if(s=this.loadAsFile(n+"/"+t,i))return s;if(s=this.loadAsDirectory(n+"/"+t,i))return s}}loadPackageImports(e,t,r){var{data:t,scope:i}=this.readPackageScope(t);if(t&&"object"==typeof t.imports&&null!==t.imports&&!Array.isArray(t.imports)){if("#"===e||e.startsWith("#/"))throw new VMError$3(`Invalid module specifier '${e}'`,"ERR_INVALID_MODULE_SPECIFIER");t=this.packageImportsExportsResolve(e,t.imports,i,!0,["node","require"],r);if(t)return this.resolveEsmMatch(t,e,r);throw new VMError$3(`Package import not defined for '${e}'`,"ERR_PACKAGE_IMPORT_NOT_DEFINED")}}loadPackageExports(e,t,r){var i=e.match(EXPORTS_PATTERN);if(i){var t=this.pathConcat(t,i[1]),n=this.readPackage(t);if(n)if(n.exports)return t=this.packageExportsResolve(t,"."+(i[2]||""),n.exports,["node","require"],r),this.resolveEsmMatch(t,e,r)}}loadPackageSelf(e,t,r){var{data:t,scope:i}=this.readPackageScope(t);if(t&&(t.exports&&(e===t.name||e.startsWith(t.name+"/"))))return i=this.packageExportsResolve(i,"."+e.slice(t.name.length),t.exports,["node","require"],r),this.resolveEsmMatch(i,e,r)}resolveEsmMatch(e,t,r){e=this.tryFile(e);if(e)return e;throw new VMError$3(`Cannot find module '${t}'`,"ENOTFOUND")}packageExportsResolve(t,e,r,i,n){let s=!1;if("object"==typeof r&&!Array.isArray(r)){var o=Object.getOwnPropertyNames(r);if(0<o.length){s="."===o[0][0];for(let e=0;e<o.length;e++)if(s!==("."===o[e][0]))throw new VMError$3("Invalid package configuration","ERR_INVALID_PACKAGE_CONFIGURATION")}}if("."===e){let e=void 0;if("string"==typeof r||Array.isArray(r)||!s?e=r:s&&(e=r["."]),e){var a=this.packageTargetResolve(t,e,"",!1,!1,i,n);if(a)return a}}else if(s){a=this.packageImportsExportsResolve(e,r,t,!1,i,n);if(a)return a}throw new VMError$3(`Package path '${e}' is not exported`,"ERR_PACKAGE_PATH_NOT_EXPORTED")}packageImportsExportsResolve(t,r,e,i,n,s){let o=r[t];if(o&&-1===t.indexOf("*"))return this.packageTargetResolve(e,o,"",!1,i,n,s);var a=Object.getOwnPropertyNames(r);let c="",u;for(let e=0;e<a.length;e++){var h,l,p=a[e];t.length<p.length||-1!==(l=p.indexOf("*"))&&(h=p.slice(0,l),t.startsWith(h))&&-1===p.indexOf("*",l+1)&&(l=p.slice(l+1),t.endsWith(l))&&1===this.patternKeyCompare(c,p)&&(o=r[p],c=p,u=t.slice(h.length,t.length-l.length))}return u?this.packageTargetResolve(e,o,u,!0,i,n,s):null}patternKeyCompare(e,t){var r=e.indexOf("*"),i=-1===r?e.length:r+1,n=t.indexOf("*"),s=-1===n?t.length:n+1;return s<i?-1:i<s||-1===r?1:-1===n||e.length>t.length?-1:t.length>e.length?1:0}packageTargetResolve(i,n,s,o,a,c,u){if("string"==typeof n){if(!o&&0<s.length&&!n.endsWith("/"))throw new VMError$3(`Invalid package specifier '${s}'`,"ERR_INVALID_MODULE_SPECIFIER");if(!n.startsWith("./")){if(a&&!n.startsWith("../")&&!n.startsWith("/")){let e=!1;try{new URL(n),e=!0}catch(e){}if(!e)return o?this.packageResolve(n.replace(/\*/g,s),i,c,u):this.packageResolve(this.pathConcat(n,s),i,c,u)}throw new VMError$3(`Invalid package target for '${s}'`,"ERR_INVALID_PACKAGE_TARGET")}if(-1!==(n=decodeURI(n)).split(/[/\\]/).slice(1).findIndex(e=>"."===e||".."===e||"node_modules"===e.toLowerCase()))throw new VMError$3(`Invalid package target for '${s}'`,"ERR_INVALID_PACKAGE_TARGET");var e=this.pathConcat(i,n);if(-1!==(s=decodeURI(s)).split(/[/\\]/).findIndex(e=>"."===e||".."===e||"node_modules"===e.toLowerCase()))throw new VMError$3(`Invalid package specifier '${s}'`,"ERR_INVALID_MODULE_SPECIFIER");return o?e.replace(/\*/g,s):this.pathConcat(e,s)}if(Array.isArray(n)){if(0===n.length)return null;let r=void 0;for(let t=0;t<n.length;t++){var h=n[t];let e;try{e=this.packageTargetResolve(i,h,s,o,a,c,u)}catch(e){if("ERR_INVALID_PACKAGE_TARGET"!==e.code)throw e;r=e;continue}if(void 0!==e)return e;null===e&&(r=null)}if(void 0===r||null===r)return r;throw r}if("object"!=typeof n||null===n){if(null==n)return null;throw new VMError$3(`Invalid package target for '${s}'`,"ERR_INVALID_PACKAGE_TARGET")}var t=Object.getOwnPropertyNames(n);for(let e=0;e<t.length;e++)if(isArrayIndex(t[e]))throw new VMError$3(`Invalid package configuration for '${s}'`,"ERR_INVALID_PACKAGE_CONFIGURATION");for(let e=0;e<t.length;e++){var r=t[e];if("default"===r||c.includes(r)){r=n[r],r=this.packageTargetResolve(i,r,s,o,a,c,u);if(void 0!==r)return r}}}packageResolve(e,t,r,i){var n=void 0;if(""===e)throw new VMError$3(`Invalid package specifier '${e}'`,"ERR_INVALID_MODULE_SPECIFIER");if(this.builtinModules[e])return"node:"+e;let s=e.indexOf("/");if("@"===e[0]){if(-1===s)throw new VMError$3(`Invalid package specifier '${e}'`,"ERR_INVALID_MODULE_SPECIFIER");s=e.indexOf("/",s+1)}if(n=-1===s?e:e.slice(0,s),0!==s&&("."===n[0]||0<=n.indexOf("\\")||0<=n.indexOf("%")))throw new VMError$3(`Invalid package specifier '${e}'`,"ERR_INVALID_MODULE_SPECIFIER");var o="."+e.slice(n.length);if("/"===o[o.length-1])throw new VMError$3(`Invalid package specifier '${e}'`,"ERR_INVALID_MODULE_SPECIFIER");n=this.packageSelfResolve(n,o,t);if(n)return n;let a;for(;;){a=this.pathResolve(this.pathConcat(t,"node_modules",e));var c=this.pathDirname(t);if(this.isPathAllowed(a)&&this.pathTestIsDirectory(a))break;if(c===t)throw new VMError$3(`Cannot find module '${e}'`,"ENOTFOUND");t=c}n=this.readPackage(a);return n&&n.exports?this.packageExportsResolve(a,o,n.exports,r,i):"."==o?this.loadAsPackage(o,n,i):this.pathConcat(a,o)}};resolver.Resolver=Resolver$1,resolver.DefaultResolver=DefaultResolver$1;var filesystem={};const pa$1=require$$1,fs$1=require$$0;let DefaultFileSystem$1=class DefaultFileSystem{resolve(e){return pa$1.resolve(e)}isSeparator(e){return"/"===e||e===pa$1.sep}isAbsolute(e){return pa$1.isAbsolute(e)}join(...e){return pa$1.join(...e)}basename(e){return pa$1.basename(e)}dirname(e){return pa$1.dirname(e)}statSync(e,t){return fs$1.statSync(e,t)}readFileSync(e,t){return fs$1.readFileSync(e,t)}},VMFileSystem$1=class VMFileSystem{constructor({fs:e=fs$1,path:t=pa$1}={}){this.fs=e,this.path=t}resolve(e){return this.path.resolve(e)}isSeparator(e){return"/"===e||e===this.path.sep}isAbsolute(e){return this.path.isAbsolute(e)}join(...e){return this.path.join(...e)}basename(e){return this.path.basename(e)}dirname(e){return this.path.dirname(e)}statSync(e,t){return this.fs.statSync(e,t)}readFileSync(e,t){return this.fs.readFileSync(e,t)}};filesystem.DefaultFileSystem=DefaultFileSystem$1,filesystem.VMFileSystem=VMFileSystem$1;const nmod=require$$0$1,{EventEmitter}=events,util=requireUtil(),{Resolver,DefaultResolver}=resolver,{VMScript:VMScript$2}=script,{VM:VM$4}=vm,{VMError:VMError$2}=bridge,{DefaultFileSystem}=filesystem;function defaultRequire(e){return commonjsRequire(e)}function escapeRegExp(e){return e.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&")}function makeExternalMatcherRegex(e){return escapeRegExp(e).replace(/\\\\|\//g,"[\\\\/]").replace(/\\\*\\\*/g,".*").replace(/\\\*/g,"[^\\\\/]*").replace(/\\\?/g,"[^\\\\/]")}function makeExternalMatcher(e){e=makeExternalMatcherRegex(e);return new RegExp(`[\\\\/]node_modules[\\\\/]${e}(?:[\\\\/](?!(?:.*[\\\\/])?node_modules[\\\\/]).*)?$`)}class LegacyResolver extends DefaultResolver{constructor(e,t,r,i,n,s,o,a,c,u,h){super(e,t,r,i,n,s,o,a,c),this.externals=u,this.currMod=void 0,this.trustedMods=new WeakMap,this.allowTransitive=h}isPathAllowed(e){return this.isPathAllowedForModule(e,this.currMod)}isPathAllowedForModule(t,e){if(!super.isPathAllowed(t))return!1;if(e){if(e.allowTransitive)return!0;if(t.startsWith(e.path)){e=t.slice(e.path.length);if(!/(?:^|[\\\\/])node_modules(?:$|[\\\\/])/.test(e))return!0}}return this.externals.some(e=>e.test(t))}registerModule(e,t,r,i,n){i=this.trustedMods.get(i);this.trustedMods.set(e,{filename:t,path:r,paths:this.genLookupPaths(r),allowTransitive:this.allowTransitive&&(n&&i&&i.allowTransitive||this.externals.some(e=>e.test(t)))})}resolveFull(t,r,i,n,e){if(this.currMod=void 0,!e)return super.resolveFull(t,r,i,n,!1);var s=this.trustedMods.get(t);if(!s||t.path!==s.path)return super.resolveFull(t,r,i,n,!1);var o=[...t.paths];if(o.length===s.length)for(let e=0;e<o.length;e++)if(o[e]!==s.paths[e])return super.resolveFull(t,r,i,n,!1);e=Object.assign({__proto__:null},n);try{return this.currMod=s,super.resolveFull(s,r,void 0,e,!0)}finally{this.currMod=void 0}}checkAccess(e,t){e=this.trustedMods.get(e);if(!(e&&e.filename===t||this.isPathAllowedForModule(t,void 0)))throw new VMError$2(`Module '${t}' is not allowed to be required. The path is outside the border!`,"EDENIED")}loadJS(e,t,r){var i,n;r=this.pathResolve(r),this.checkAccess(t,r),"sandbox"===this.pathContext(r,"js")?(i=this.trustedMods.get(t),n=this.readScript(r),e.run(n,{filename:r,strict:!0,module:t,wrapper:"none",dirname:(i||t).path})):(n=this.hostRequire(r),t.exports=e.readonly(n))}}function defaultBuiltinLoader(e,t,r){e=e.hostRequire(r);return t.readonly(e)}const eventsModules=new WeakMap;function defaultBuiltinLoaderEvents(e,t,r){return eventsModules.get(t)}let cacheBufferScript;function defaultBuiltinLoaderBuffer(e,t,r){return cacheBufferScript=cacheBufferScript||new VMScript$2("return buffer=>({Buffer: buffer});",{__proto__:null,filename:"buffer.js"}),t.run(cacheBufferScript,{__proto__:null,strict:!0,wrapper:"none"})(Buffer)}let cacheUtilScript;function defaultBuiltinLoaderUtil(e,t,r){cacheUtilScript=cacheUtilScript||new VMScript$2(`return function inherits(ctor, superCtor) {
			ctor.super_ = superCtor;
			Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
		}`,{__proto__:null,filename:"util.js"});var i=t.run(cacheUtilScript,{__proto__:null,strict:!0,wrapper:"none"}),n=Object.assign({},util);return n.inherits=i,t.readonly(n)}const BUILTIN_MODULES=(nmod.builtinModules||Object.getOwnPropertyNames(process.binding("natives"))).filter(e=>!e.startsWith("internal/"));let EventEmitterReferencingAsyncResourceClass=null;if(EventEmitter.EventEmitterAsyncResource){const{AsyncResource}=require$$8,kEventEmitter=Symbol("kEventEmitter");class EventEmitterReferencingAsyncResource extends AsyncResource{constructor(e,t,r){super(t,r),this[kEventEmitter]=e}get eventEmitter(){return this[kEventEmitter]}}EventEmitterReferencingAsyncResourceClass=EventEmitterReferencingAsyncResource}let cacheEventsScript;const SPECIAL_MODULES={events(e){cacheEventsScript||(cacheEventsScript=new VMScript$2(`(function (fromhost) { const module = {}; module.exports={};{ // Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// Modified by the vm2 team to make this a standalone module to be loaded into the sandbox.

'use strict';

const host = fromhost;

const {
	Boolean,
  Error,
	String,
	Symbol
} = globalThis;

const ReflectApply = Reflect.apply;
const ReflectOwnKeys = Reflect.ownKeys;

const ErrorCaptureStackTrace = Error.captureStackTrace;

const NumberIsNaN = Number.isNaN;

const ObjectCreate = Object.create;
const ObjectDefineProperty = Object.defineProperty;
const ObjectDefineProperties = Object.defineProperties;
const ObjectGetPrototypeOf = Object.getPrototypeOf;

const SymbolFor = Symbol.for;

function uncurryThis(func) {
	return (thiz, ...args) => ReflectApply(func, thiz, args);
}

const ArrayPrototypeIndexOf = uncurryThis(Array.prototype.indexOf);
const ArrayPrototypeJoin = uncurryThis(Array.prototype.join);
const ArrayPrototypeSlice = uncurryThis(Array.prototype.slice);
const ArrayPrototypeSplice = uncurryThis(Array.prototype.splice);
const ArrayPrototypeUnshift = uncurryThis(Array.prototype.unshift);

const kRejection = SymbolFor('nodejs.rejection');

function inspect(obj) {
	return typeof obj === 'symbol' ? obj.toString() : \`\${obj}\`;
}

function spliceOne(list, index) {
	for (; index + 1 < list.length; index++)
		list[index] = list[index + 1];
	list.pop();
}

function assert(what, message) {
	if (!what) throw new Error(message);
}

function E(key, msg, Base) {
	return function NodeError(...args) {
	  const error = new Base();
	  const message = ReflectApply(msg, error, args);
	  ObjectDefineProperties(error, {
		message: {
		  value: message,
		  enumerable: false,
		  writable: true,
		  configurable: true,
		},
		toString: {
		  value() {
			return \`\${this.name} [\${key}]: \${this.message}\`;
		  },
		  enumerable: false,
		  writable: true,
		  configurable: true,
		},
	  });
	  error.code = key;
	  return error;
	};
}


const ERR_INVALID_ARG_TYPE = E('ERR_INVALID_ARG_TYPE',
  (name, expected, actual) => {
    assert(typeof name === 'string', "'name' must be a string");
    if (!ArrayIsArray(expected)) {
      expected = [expected];
    }

    let msg = 'The ';
    if (StringPrototypeEndsWith(name, ' argument')) {
      // For cases like 'first argument'
      msg += \`\${name} \`;
    } else {
      const type = StringPrototypeIncludes(name, '.') ? 'property' : 'argument';
      msg += \`"\${name}" \${type} \`;
    }
    msg += 'must be ';

    const types = [];
    const instances = [];
    const other = [];

    for (const value of expected) {
      assert(typeof value === 'string',
             'All expected entries have to be of type string');
      if (ArrayPrototypeIncludes(kTypes, value)) {
        ArrayPrototypePush(types, StringPrototypeToLowerCase(value));
      } else if (RegExpPrototypeTest(classRegExp, value)) {
        ArrayPrototypePush(instances, value);
      } else {
        assert(value !== 'object',
               'The value "object" should be written as "Object"');
        ArrayPrototypePush(other, value);
      }
    }

    // Special handle \`object\` in case other instances are allowed to outline
    // the differences between each other.
    if (instances.length > 0) {
      const pos = ArrayPrototypeIndexOf(types, 'object');
      if (pos !== -1) {
        ArrayPrototypeSplice(types, pos, 1);
        ArrayPrototypePush(instances, 'Object');
      }
    }

    if (types.length > 0) {
      if (types.length > 2) {
        const last = ArrayPrototypePop(types);
        msg += \`one of type \${ArrayPrototypeJoin(types, ', ')}, or \${last}\`;
      } else if (types.length === 2) {
        msg += \`one of type \${types[0]} or \${types[1]}\`;
      } else {
        msg += \`of type \${types[0]}\`;
      }
      if (instances.length > 0 || other.length > 0)
        msg += ' or ';
    }

    if (instances.length > 0) {
      if (instances.length > 2) {
        const last = ArrayPrototypePop(instances);
        msg +=
          \`an instance of \${ArrayPrototypeJoin(instances, ', ')}, or \${last}\`;
      } else {
        msg += \`an instance of \${instances[0]}\`;
        if (instances.length === 2) {
          msg += \` or \${instances[1]}\`;
        }
      }
      if (other.length > 0)
        msg += ' or ';
    }

    if (other.length > 0) {
      if (other.length > 2) {
        const last = ArrayPrototypePop(other);
        msg += \`one of \${ArrayPrototypeJoin(other, ', ')}, or \${last}\`;
      } else if (other.length === 2) {
        msg += \`one of \${other[0]} or \${other[1]}\`;
      } else {
        if (StringPrototypeToLowerCase(other[0]) !== other[0])
          msg += 'an ';
        msg += \`\${other[0]}\`;
      }
    }

    if (actual == null) {
      msg += \`. Received \${actual}\`;
    } else if (typeof actual === 'function' && actual.name) {
      msg += \`. Received function \${actual.name}\`;
    } else if (typeof actual === 'object') {
      if (actual.constructor && actual.constructor.name) {
        msg += \`. Received an instance of \${actual.constructor.name}\`;
      } else {
        const inspected = inspect(actual, { depth: -1 });
        msg += \`. Received \${inspected}\`;
      }
    } else {
      let inspected = inspect(actual, { colors: false });
      if (inspected.length > 25)
        inspected = \`\${StringPrototypeSlice(inspected, 0, 25)}...\`;
      msg += \`. Received type \${typeof actual} (\${inspected})\`;
    }
    return msg;
  }, TypeError);

const ERR_INVALID_THIS = E('ERR_INVALID_THIS', s => \`Value of "this" must be of type \${s}\`, TypeError);

const ERR_OUT_OF_RANGE = E('ERR_OUT_OF_RANGE',
  (str, range, input, replaceDefaultBoolean = false) => {
    assert(range, 'Missing "range" argument');
    let msg = replaceDefaultBoolean ? str :
      \`The value of "\${str}" is out of range.\`;
    const received = inspect(input);
    msg += \` It must be \${range}. Received \${received}\`;
    return msg;
  }, RangeError);

const ERR_UNHANDLED_ERROR = E('ERR_UNHANDLED_ERROR',
  err => {
    const msg = 'Unhandled error.';
    if (err === undefined) return msg;
    return \`\${msg} (\${err})\`;
  }, Error);

function validateBoolean(value, name) {
  if (typeof value !== 'boolean')
    throw new ERR_INVALID_ARG_TYPE(name, 'boolean', value);
}

function validateFunction(value, name) {
  if (typeof value !== 'function')
    throw new ERR_INVALID_ARG_TYPE(name, 'Function', value);
}

function validateString(value, name) {
  if (typeof value !== 'string')
    throw new ERR_INVALID_ARG_TYPE(name, 'string', value);
}

function nc(cond, e) {
	return cond === undefined || cond === null ? e : cond;
}

function oc(base, key) {
	return base === undefined || base === null ? undefined : base[key];
}

const kCapture = Symbol('kCapture');
const kErrorMonitor = host.kErrorMonitor || Symbol('events.errorMonitor');
const kMaxEventTargetListeners = Symbol('events.maxEventTargetListeners');
const kMaxEventTargetListenersWarned =
  Symbol('events.maxEventTargetListenersWarned');

const kIsEventTarget = SymbolFor('nodejs.event_target');

function isEventTarget(obj) {
	return oc(oc(obj, 'constructor'), kIsEventTarget);
}

/**
 * Creates a new \`EventEmitter\` instance.
 * @param {{ captureRejections?: boolean; }} [opts]
 * @constructs {EventEmitter}
 */
function EventEmitter(opts) {
  EventEmitter.init.call(this, opts);
}
module.exports = EventEmitter;
if (host.once) module.exports.once = host.once;
if (host.on) module.exports.on = host.on;
if (host.getEventListeners) module.exports.getEventListeners = host.getEventListeners;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.captureRejectionSymbol = kRejection;
ObjectDefineProperty(EventEmitter, 'captureRejections', {
  get() {
    return EventEmitter.prototype[kCapture];
  },
  set(value) {
    validateBoolean(value, 'EventEmitter.captureRejections');

    EventEmitter.prototype[kCapture] = value;
  },
  enumerable: true
});

if (host.EventEmitterReferencingAsyncResource) {
	const kAsyncResource = Symbol('kAsyncResource');
	const EventEmitterReferencingAsyncResource = host.EventEmitterReferencingAsyncResource;

	class EventEmitterAsyncResource extends EventEmitter {
		/**
		 * @param {{
		 *   name?: string,
		 *   triggerAsyncId?: number,
		 *   requireManualDestroy?: boolean,
		 * }} [options]
		 */
		constructor(options = undefined) {
			let name;
			if (typeof options === 'string') {
				name = options;
				options = undefined;
			} else {
				if (new.target === EventEmitterAsyncResource) {
					validateString(oc(options, 'name'), 'options.name');
				}
				name = oc(options, 'name') || new.target.name;
			}
			super(options);

			this[kAsyncResource] =
				new EventEmitterReferencingAsyncResource(this, name, options);
		}

		/**
		 * @param {symbol,string} event
		 * @param  {...any} args
		 * @returns {boolean}
		 */
		emit(event, ...args) {
			if (this[kAsyncResource] === undefined)
				throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
			const { asyncResource } = this;
			ArrayPrototypeUnshift(args, super.emit, this, event);
			return ReflectApply(asyncResource.runInAsyncScope, asyncResource,
													args);
		}

		/**
		 * @returns {void}
		 */
		emitDestroy() {
			if (this[kAsyncResource] === undefined)
				throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
			this.asyncResource.emitDestroy();
		}

		/**
		 * @type {number}
		 */
		get asyncId() {
			if (this[kAsyncResource] === undefined)
				throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
			return this.asyncResource.asyncId();
		}

		/**
		 * @type {number}
		 */
		get triggerAsyncId() {
			if (this[kAsyncResource] === undefined)
				throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
			return this.asyncResource.triggerAsyncId();
		}

		/**
		 * @type {EventEmitterReferencingAsyncResource}
		 */
		get asyncResource() {
			if (this[kAsyncResource] === undefined)
				throw new ERR_INVALID_THIS('EventEmitterAsyncResource');
			return this[kAsyncResource];
		}
	}
	EventEmitter.EventEmitterAsyncResource = EventEmitterAsyncResource;
}

EventEmitter.errorMonitor = kErrorMonitor;

// The default for captureRejections is false
ObjectDefineProperty(EventEmitter.prototype, kCapture, {
  value: false,
  writable: true,
  enumerable: false
});

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
let defaultMaxListeners = 10;

function checkListener(listener) {
  validateFunction(listener, 'listener');
}

ObjectDefineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new ERR_OUT_OF_RANGE('defaultMaxListeners',
                                 'a non-negative number',
                                 arg);
    }
    defaultMaxListeners = arg;
  }
});

ObjectDefineProperties(EventEmitter, {
  kMaxEventTargetListeners: {
    value: kMaxEventTargetListeners,
    enumerable: false,
    configurable: false,
    writable: false,
  },
  kMaxEventTargetListenersWarned: {
    value: kMaxEventTargetListenersWarned,
    enumerable: false,
    configurable: false,
    writable: false,
  }
});

/**
 * Sets the max listeners.
 * @param {number} n
 * @param {EventTarget[] | EventEmitter[]} [eventTargets]
 * @returns {void}
 */
EventEmitter.setMaxListeners =
  function(n = defaultMaxListeners, ...eventTargets) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n))
      throw new ERR_OUT_OF_RANGE('n', 'a non-negative number', n);
    if (eventTargets.length === 0) {
      defaultMaxListeners = n;
    } else {
      for (let i = 0; i < eventTargets.length; i++) {
        const target = eventTargets[i];
        if (isEventTarget(target)) {
          target[kMaxEventTargetListeners] = n;
          target[kMaxEventTargetListenersWarned] = false;
        } else if (typeof target.setMaxListeners === 'function') {
          target.setMaxListeners(n);
        } else {
          throw new ERR_INVALID_ARG_TYPE(
            'eventTargets',
            ['EventEmitter', 'EventTarget'],
            target);
        }
      }
    }
  };

// If you're updating this function definition, please also update any
// re-definitions, such as the one in the Domain module (lib/domain.js).
EventEmitter.init = function(opts) {

  if (this._events === undefined ||
      this._events === ObjectGetPrototypeOf(this)._events) {
    this._events = ObjectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;


  if (oc(opts, 'captureRejections')) {
    validateBoolean(opts.captureRejections, 'options.captureRejections');
    this[kCapture] = Boolean(opts.captureRejections);
  } else {
    // Assigning the kCapture property directly saves an expensive
    // prototype lookup in a very sensitive hot path.
    this[kCapture] = EventEmitter.prototype[kCapture];
  }
};

function addCatch(that, promise, type, args) {
  if (!that[kCapture]) {
    return;
  }

  // Handle Promises/A+ spec, then could be a getter
  // that throws on second use.
  try {
    const then = promise.then;

    if (typeof then === 'function') {
      then.call(promise, undefined, function(err) {
        // The callback is called with nextTick to avoid a follow-up
        // rejection from this promise.
        process.nextTick(emitUnhandledRejectionOrErr, that, err, type, args);
      });
    }
  } catch (err) {
    that.emit('error', err);
  }
}

function emitUnhandledRejectionOrErr(ee, err, type, args) {
  if (typeof ee[kRejection] === 'function') {
    ee[kRejection](err, type, ...args);
  } else {
    // We have to disable the capture rejections mechanism, otherwise
    // we might end up in an infinite loop.
    const prev = ee[kCapture];

    // If the error handler throws, it is not catchable and it
    // will end up in 'uncaughtException'. We restore the previous
    // value of kCapture in case the uncaughtException is present
    // and the exception is handled.
    try {
      ee[kCapture] = false;
      ee.emit('error', err);
    } finally {
      ee[kCapture] = prev;
    }
  }
}

/**
 * Increases the max listeners of the event emitter.
 * @param {number} n
 * @returns {EventEmitter}
 */
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new ERR_OUT_OF_RANGE('n', 'a non-negative number', n);
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

/**
 * Returns the current max listener value for the event emitter.
 * @returns {number}
 */
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

/**
 * Synchronously calls each of the listeners registered
 * for the event.
 * @param {string | symbol} type
 * @param {...any} [args]
 * @returns {boolean}
 */
EventEmitter.prototype.emit = function emit(type, ...args) {
  let doError = (type === 'error');

  const events = this._events;
  if (events !== undefined) {
    if (doError && events[kErrorMonitor] !== undefined)
      this.emit(kErrorMonitor, ...args);
    doError = (doError && events.error === undefined);
  } else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    let er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      try {
        const capture = {};
        ErrorCaptureStackTrace(capture, EventEmitter.prototype.emit);
      } catch (e) {}

      // Note: The comments on the \`throw\` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }

    let stringifiedEr;
    try {
      stringifiedEr = inspect(er);
    } catch (e) {
      stringifiedEr = er;
    }

    // At least give some kind of context to the user
    const err = new ERR_UNHANDLED_ERROR(stringifiedEr);
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  const handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    const result = handler.apply(this, args);

    // We check if result is undefined first because that
    // is the most common case so we do not pay any perf
    // penalty
    if (result !== undefined && result !== null) {
      addCatch(this, result, type, args);
    }
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler);
    for (let i = 0; i < len; ++i) {
      const result = listeners[i].apply(this, args);

      // We check if result is undefined first because that
      // is the most common case so we do not pay any perf
      // penalty.
      // This code is duplicated because extracting it away
      // would make it non-inlineable.
      if (result !== undefined && result !== null) {
        addCatch(this, result, type, args);
      }
    }
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  let m;
  let events;
  let existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = ObjectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  nc(listener.listener, listener));

      // Re-assign \`events\` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      const w = new Error('Possible EventEmitter memory leak detected. ' +
                          \`\${existing.length} \${String(type)} listeners \` +
                          \`added to \${inspect(target, { depth: -1 })}. Use \` +
                          'emitter.setMaxListeners() to increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      process.emitWarning(w);
    }
  }

  return target;
}

/**
 * Adds a listener to the event emitter.
 * @param {string | symbol} type
 * @param {Function} listener
 * @returns {EventEmitter}
 */
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

/**
 * Adds the \`listener\` function to the beginning of
 * the listeners array.
 * @param {string | symbol} type
 * @param {Function} listener
 * @returns {EventEmitter}
 */
EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  const state = { fired: false, wrapFn: undefined, target, type, listener };
  const wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

/**
 * Adds a one-time \`listener\` function to the event emitter.
 * @param {string | symbol} type
 * @param {Function} listener
 * @returns {EventEmitter}
 */
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);

  this.on(type, _onceWrap(this, type, listener));
  return this;
};

/**
 * Adds a one-time \`listener\` function to the beginning of
 * the listeners array.
 * @param {string | symbol} type
 * @param {Function} listener
 * @returns {EventEmitter}
 */
EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);

      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };


/**
 * Removes the specified \`listener\` from the listeners array.
 * @param {string | symbol} type
 * @param {Function} listener
 * @returns {EventEmitter}
 */
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      checkListener(listener);

      const events = this._events;
      if (events === undefined)
        return this;

      const list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = ObjectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        let position = -1;

        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

/**
 * Removes all listeners from the event emitter. (Only
 * removes listeners for a specific event name if specified
 * as \`type\`).
 * @param {string | symbol} [type]
 * @returns {EventEmitter}
 */
EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      const events = this._events;
      if (events === undefined)
        return this;

      // Not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = ObjectCreate(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = ObjectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // Emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        for (const key of ReflectOwnKeys(events)) {
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = ObjectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      const listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (let i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  const events = target._events;

  if (events === undefined)
    return [];

  const evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener);
}

/**
 * Returns a copy of the array of listeners for the event name
 * specified as \`type\`.
 * @param {string | symbol} type
 * @returns {Function[]}
 */
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

/**
 * Returns a copy of the array of listeners and wrappers for
 * the event name specified as \`type\`.
 * @param {string | symbol} type
 * @returns {Function[]}
 */
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

/**
 * Returns the number of listeners listening to the event name
 * specified as \`type\`.
 * @deprecated since v3.2.0
 * @param {EventEmitter} emitter
 * @param {string | symbol} type
 * @returns {number}
 */
EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  }
  return emitter.listenerCount(type);
};

EventEmitter.prototype.listenerCount = listenerCount;

/**
 * Returns the number of listeners listening to event name
 * specified as \`type\`.
 * @param {string | symbol} type
 * @returns {number}
 */
function listenerCount(type) {
  const events = this._events;

  if (events !== undefined) {
    const evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

/**
 * Returns an array listing the events for which
 * the emitter has registered listeners.
 * @returns {any[]}
 */
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr) {
  // At least since V8 8.3, this implementation is faster than the previous
  // which always used a simple for-loop
  switch (arr.length) {
    case 2: return [arr[0], arr[1]];
    case 3: return [arr[0], arr[1], arr[2]];
    case 4: return [arr[0], arr[1], arr[2], arr[3]];
    case 5: return [arr[0], arr[1], arr[2], arr[3], arr[4]];
    case 6: return [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]];
  }
  return ArrayPrototypeSlice(arr);
}

function unwrapListeners(arr) {
  const ret = arrayClone(arr);
  for (let i = 0; i < ret.length; ++i) {
    const orig = ret[i].listener;
    if (typeof orig === 'function')
      ret[i] = orig;
  }
  return ret;
}

} return module.exports;})`,{filename:"events.js"}));var t=VM$4.prototype.run.call(e,cacheEventsScript)(e.readonly({kErrorMonitor:EventEmitter.errorMonitor,once:EventEmitter.once,on:EventEmitter.on,getEventListeners:EventEmitter.getEventListeners,EventEmitterReferencingAsyncResource:EventEmitterReferencingAsyncResourceClass}));return eventsModules.set(e,t),e._addProtoMapping(EventEmitter.prototype,t.EventEmitter.prototype),defaultBuiltinLoaderEvents},buffer(e){return defaultBuiltinLoaderBuffer},util(e){return defaultBuiltinLoaderUtil}};function addDefaultBuiltin(e,t,r){var i;e[t]||(i=SPECIAL_MODULES[t],e[t]=i?i(r):defaultBuiltinLoader)}function genBuiltinsFromOptions(t,r,i,n){var s={__proto__:null};if(i){var o=Object.getOwnPropertyNames(i);for(let e=0;e<o.length;e++){const p=o[e];s[p]=(e,t,r)=>t.readonly(i[p])}}if(n){var a=Object.getOwnPropertyNames(n);for(let e=0;e<a.length;e++){var c=a[e];s[c]=n[c]}}if(Array.isArray(r))if(0<=r.indexOf("*"))for(let e=0;e<BUILTIN_MODULES.length;e++){var u=BUILTIN_MODULES[e];-1===r.indexOf("-"+u)&&addDefaultBuiltin(s,u,t)}else for(let e=0;e<BUILTIN_MODULES.length;e++){var h=BUILTIN_MODULES[e];-1!==r.indexOf(h)&&addDefaultBuiltin(s,h,t)}else if(r)for(let e=0;e<BUILTIN_MODULES.length;e++){var l=BUILTIN_MODULES[e];r[l]&&addDefaultBuiltin(s,l,t)}return s}function defaultCustomResolver(){}const DEFAULT_FS=new DefaultFileSystem,DENY_RESOLVER=new Resolver(DEFAULT_FS,{__proto__:null},[],e=>{throw new VMError$2(`Access denied to require '${e}'`,"EDENIED")});function resolverFromOptions$1(e,t,r,i){if(!t){if(!r)return DENY_RESOLVER;const f=genBuiltinsFromOptions(e,void 0,void 0,r);return new Resolver(DEFAULT_FS,f,[],defaultRequire)}const{builtin:n,mock:s,external:o,root:a,resolve:c,customRequire:u=defaultRequire,context:h="host",strict:l=!0,fs:p=DEFAULT_FS}=t,f=genBuiltinsFromOptions(e,n,s,r);if(!o)return new Resolver(p,f,[],u);let d;if(a){const E=(Array.isArray(a)?a:[a]).map(e=>p.resolve(e));d=r=>E.some(e=>{var t;return!!r.startsWith(e)&&(t=e.length,!!(r.length===t||0<t&&p.isSeparator(e[t-1]))||p.isSeparator(r[t]))})}else d=()=>!0;let m=defaultCustomResolver,y=void 0,g=void 0;if(c){let s;m=(e,t,r,i)=>{if(!g||e.pathIsAbsolute(t)||e.pathIsRelative(t)||(s=s||g.map(e=>new RegExp(makeExternalMatcherRegex(e)))).some(e=>e.test(t))){var n,r=c(t,r);if(r)return"string"==typeof r?(y&&y.push(new RegExp("^"+escapeRegExp(r))),e.loadAsFileOrDirectory(r,i)):({module:r=t,path:n}=r,y&&y.push(new RegExp("^"+escapeRegExp(n))),e.loadNodeModules(r,[n],i))}}}if("object"!=typeof o)return new DefaultResolver(p,f,d,[],()=>h,m,u,i,l);let x=!1;return Array.isArray(o)?g=o:(g=o.modules,x="sandbox"===h&&o.transitive),y=g.map(makeExternalMatcher),new LegacyResolver(p,f,d,[],()=>h,m,u,i,l,y,x)}resolverCompat.resolverFromOptions=resolverFromOptions$1;const fs=require$$0,pa=require$$1,{Script}=require$$2,{VMError:VMError$1}=bridge,{VMScript:VMScript$1,MODULE_PREFIX,STRICT_MODULE_PREFIX,MODULE_SUFFIX}=script,{transformer}=transformer$4,{VM:VM$3}=vm,{resolverFromOptions}=resolverCompat,objectDefineProperty=Object.defineProperty,objectDefineProperties=Object.defineProperties,HOST=Object.freeze({__proto__:null,version:parseInt(process.versions.node.split(".")[0]),process:process,console:console,setTimeout:setTimeout,setInterval:setInterval,setImmediate:setImmediate,clearTimeout:clearTimeout,clearInterval:clearInterval,clearImmediate:clearImmediate});function compileScript(e,t){return new Script(t,{__proto__:null,filename:e,displayErrors:!1})}let cacheSandboxScript=null,cacheMakeNestingScript=null;const NESTING_OVERRIDE=Object.freeze({__proto__:null,vm2:vm2NestingLoader});let NodeVM$1=class NodeVM extends VM$3{constructor(e={}){var{compiler:e,eval:t,wasm:r,console:i="inherit",require:n=!1,nesting:s=!1,wrapper:o="commonjs",sourceExtensions:a=["js"],argv:c,env:u,strict:h=!1,sandbox:l}=e;if(l&&"object"!=typeof l)throw new VMError$1("Sandbox must be an object.");super({__proto__:null,compiler:e,eval:t,wasm:r}),objectDefineProperty(this,"options",{__proto__:null,value:{console:i,require:n,nesting:s,wrapper:o,sourceExtensions:a,strict:h}});const p=resolverFromOptions(this,n,s&&NESTING_OVERRIDE,this._compiler);objectDefineProperty(this,"_resolver",{__proto__:null,value:p}),cacheSandboxScript=cacheSandboxScript||compileScript(__dirname+"/setup-node-sandbox.js",`(function (host, data) { /* global host, data, VMError */

'use strict';

const LocalError = Error;
const LocalTypeError = TypeError;
const LocalWeakMap = WeakMap;

const {
	apply: localReflectApply,
	defineProperty: localReflectDefineProperty
} = Reflect;

const {
	set: localWeakMapSet,
	get: localWeakMapGet
} = LocalWeakMap.prototype;

const {
	isArray: localArrayIsArray
} = Array;

function uncurryThis(func) {
	return (thiz, ...args) => localReflectApply(func, thiz, args);
}

const localArrayPrototypeSlice = uncurryThis(Array.prototype.slice);
const localArrayPrototypeIncludes = uncurryThis(Array.prototype.includes);
const localArrayPrototypePush = uncurryThis(Array.prototype.push);
const localArrayPrototypeIndexOf = uncurryThis(Array.prototype.indexOf);
const localArrayPrototypeSplice = uncurryThis(Array.prototype.splice);
const localStringPrototypeStartsWith = uncurryThis(String.prototype.startsWith);
const localStringPrototypeSlice = uncurryThis(String.prototype.slice);
const localStringPrototypeIndexOf = uncurryThis(String.prototype.indexOf);

const {
	argv: optionArgv,
	env: optionEnv,
	console: optionConsole,
	vm,
	resolver,
	extensions
} = data;

function ensureSandboxArray(a) {
	return localArrayPrototypeSlice(a);
}

const globalPaths = ensureSandboxArray(resolver.globalPaths);

class Module {

	constructor(id, path, parent) {
		this.id = id;
		this.filename = id;
		this.path = path;
		this.parent = parent;
		this.loaded = false;
		this.paths = path ? ensureSandboxArray(resolver.genLookupPaths(path)) : [];
		this.children = [];
		this.exports = {};
	}

	_updateChildren(child, isNew) {
		const children = this.children;
		if (children && (isNew || !localArrayPrototypeIncludes(children, child))) {
			localArrayPrototypePush(children, child);
		}
	}

	require(id) {
		return requireImpl(this, id, false);
	}

}

const originalRequire = Module.prototype.require;
const cacheBuiltins = {__proto__: null};

function requireImpl(mod, id, direct) {
	if (direct && mod.require !== originalRequire) {
		return mod.require(id);
	}
	const filename = resolver.resolve(mod, id, undefined, Module._extensions, direct);
	if (localStringPrototypeStartsWith(filename, 'node:')) {
		id = localStringPrototypeSlice(filename, 5);
		let nmod = cacheBuiltins[id];
		if (!nmod) {
			nmod = resolver.loadBuiltinModule(vm, id);
			if (!nmod) throw new VMError(\`Cannot find module '\${filename}'\`, 'ENOTFOUND');
			cacheBuiltins[id] = nmod;
		}
		return nmod;
	}

	const cachedModule = Module._cache[filename];
	if (cachedModule !== undefined) {
		mod._updateChildren(cachedModule, false);
		return cachedModule.exports;
	}

	let nmod = cacheBuiltins[id];
	if (nmod) return nmod;
	nmod = resolver.loadBuiltinModule(vm, id);
	if (nmod) {
		cacheBuiltins[id] = nmod;
		return nmod;
	}

	const path = resolver.fs.dirname(filename);
	const module = new Module(filename, path, mod);
	resolver.registerModule(module, filename, path, mod, direct);
	mod._updateChildren(module, true);
	try {
		Module._cache[filename] = module;
		const handler = findBestExtensionHandler(filename);
		handler(module, filename);
		module.loaded = true;
	} catch (e) {
		delete Module._cache[filename];
		const children = mod.children;
		if (localArrayIsArray(children)) {
			const index = localArrayPrototypeIndexOf(children, module);
			if (index !== -1) {
				localArrayPrototypeSplice(children, index, 1);
			}
		}
		throw e;
	}

	return module.exports;
}

Module.builtinModules = ensureSandboxArray(resolver.getBuiltinModulesList());
Module.globalPaths = globalPaths;
Module._extensions = {__proto__: null};
Module._cache = {__proto__: null};

{
	const keys = Object.getOwnPropertyNames(extensions);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const handler = extensions[key];
		Module._extensions[key] = (mod, filename) => handler(mod, filename);
	}
}

function findBestExtensionHandler(filename) {
	const name = resolver.fs.basename(filename);
	for (let i = 0; (i = localStringPrototypeIndexOf(name, '.', i + 1)) !== -1;) {
		const ext = localStringPrototypeSlice(name, i);
		const handler = Module._extensions[ext];
		if (handler) return handler;
	}
	const js = Module._extensions['.js'];
	if (js) return js;
	const keys = Object.getOwnPropertyNames(Module._extensions);
	if (keys.length === 0) throw new VMError(\`Failed to load '\${filename}': Unknown type.\`, 'ELOADFAIL');
	return Module._extensions[keys[0]];
}

function createRequireForModule(mod) {
	// eslint-disable-next-line no-shadow
	function require(id) {
		return requireImpl(mod, id, true);
	}
	function resolve(id, options) {
		return resolver.resolve(mod, id, options, Module._extensions, true);
	}
	require.resolve = resolve;
	function paths(id) {
		return ensureSandboxArray(resolver.lookupPaths(mod, id));
	}
	resolve.paths = paths;

	require.extensions = Module._extensions;

	require.cache = Module._cache;

	return require;
}

/**
 * Prepare sandbox.
 */

const TIMERS = new LocalWeakMap();

class Timeout {
}

class Interval {
}

class Immediate {
}

function clearTimer(timer) {
	const obj = localReflectApply(localWeakMapGet, TIMERS, [timer]);
	if (obj) {
		obj.clear(obj.value);
	}
}

// This is a function and not an arrow function, since the original is also a function
// eslint-disable-next-line no-shadow
global.setTimeout = function setTimeout(callback, delay, ...args) {
	if (typeof callback !== 'function') throw new LocalTypeError('"callback" argument must be a function');
	const obj = new Timeout(callback, args);
	const cb = () => {
		localReflectApply(callback, null, args);
	};
	const tmr = host.setTimeout(cb, delay);

	const ref = {
		__proto__: null,
		clear: host.clearTimeout,
		value: tmr
	};

	localReflectApply(localWeakMapSet, TIMERS, [obj, ref]);
	return obj;
};

// eslint-disable-next-line no-shadow
global.setInterval = function setInterval(callback, interval, ...args) {
	if (typeof callback !== 'function') throw new LocalTypeError('"callback" argument must be a function');
	const obj = new Interval();
	const cb = () => {
		localReflectApply(callback, null, args);
	};
	const tmr = host.setInterval(cb, interval);

	const ref = {
		__proto__: null,
		clear: host.clearInterval,
		value: tmr
	};

	localReflectApply(localWeakMapSet, TIMERS, [obj, ref]);
	return obj;
};

// eslint-disable-next-line no-shadow
global.setImmediate = function setImmediate(callback, ...args) {
	if (typeof callback !== 'function') throw new LocalTypeError('"callback" argument must be a function');
	const obj = new Immediate();
	const cb = () => {
		localReflectApply(callback, null, args);
	};
	const tmr = host.setImmediate(cb);

	const ref = {
		__proto__: null,
		clear: host.clearImmediate,
		value: tmr
	};

	localReflectApply(localWeakMapSet, TIMERS, [obj, ref]);
	return obj;
};

// eslint-disable-next-line no-shadow
global.clearTimeout = function clearTimeout(timeout) {
	clearTimer(timeout);
};

// eslint-disable-next-line no-shadow
global.clearInterval = function clearInterval(interval) {
	clearTimer(interval);
};

// eslint-disable-next-line no-shadow
global.clearImmediate = function clearImmediate(immediate) {
	clearTimer(immediate);
};

const localProcess = host.process;

function vmEmitArgs(event, args) {
	const allargs = [event];
	for (let i = 0; i < args.length; i++) {
		if (!localReflectDefineProperty(allargs, i + 1, {
			__proto__: null,
			value: args[i],
			writable: true,
			enumerable: true,
			configurable: true
		})) throw new LocalError('Unexpected');
	}
	return localReflectApply(vm.emit, vm, allargs);
}

const LISTENERS = new LocalWeakMap();
const LISTENER_HANDLER = new LocalWeakMap();

/**
 *
 * @param {*} name
 * @param {*} handler
 * @this process
 * @return {this}
 */
function addListener(name, handler) {
	if (name !== 'beforeExit' && name !== 'exit') {
		throw new LocalError(\`Access denied to listen for '\${name}' event.\`);
	}

	let cb = localReflectApply(localWeakMapGet, LISTENERS, [handler]);
	if (!cb) {
		cb = () => {
			handler();
		};
		localReflectApply(localWeakMapSet, LISTENER_HANDLER, [cb, handler]);
		localReflectApply(localWeakMapSet, LISTENERS, [handler, cb]);
	}

	localProcess.on(name, cb);

	return this;
}

/**
 *
 * @this process
 * @return {this}
 */
// eslint-disable-next-line no-shadow
function process() {
	return this;
}

const baseUptime = localProcess.uptime();

// FIXME wrong class structure
global.process = {
	__proto__: process.prototype,
	argv: optionArgv !== undefined ? optionArgv : [],
	title: localProcess.title,
	version: localProcess.version,
	versions: localProcess.versions,
	arch: localProcess.arch,
	platform: localProcess.platform,
	env: optionEnv !== undefined ? optionEnv : {},
	pid: localProcess.pid,
	features: localProcess.features,
	nextTick: function nextTick(callback, ...args) {
		if (typeof callback !== 'function') {
			throw new LocalError('Callback must be a function.');
		}

		localProcess.nextTick(()=>{
			localReflectApply(callback, null, args);
		});
	},
	hrtime: function hrtime(time) {
		return localProcess.hrtime(time);
	},
	uptime: function uptime() {
		return localProcess.uptime() - baseUptime;
	},
	cwd: function cwd() {
		return localProcess.cwd();
	},
	addListener,
	on: addListener,

	once: function once(name, handler) {
		if (name !== 'beforeExit' && name !== 'exit') {
			throw new LocalError(\`Access denied to listen for '\${name}' event.\`);
		}

		let triggered = false;
		const cb = () => {
			if (triggered) return;
			triggered = true;
			localProcess.removeListener(name, cb);
			handler();
		};
		localReflectApply(localWeakMapSet, LISTENER_HANDLER, [cb, handler]);

		localProcess.on(name, cb);

		return this;
	},

	listeners: function listeners(name) {
		if (name !== 'beforeExit' && name !== 'exit') {
			// Maybe add ({__proto__:null})[name] to throw when name fails in https://tc39.es/ecma262/#sec-topropertykey.
			return [];
		}

		// Filter out listeners, which were not created in this sandbox
		const all = localProcess.listeners(name);
		const filtered = [];
		let j = 0;
		for (let i = 0; i < all.length; i++) {
			const h = localReflectApply(localWeakMapGet, LISTENER_HANDLER, [all[i]]);
			if (h) {
				if (!localReflectDefineProperty(filtered, j, {
					__proto__: null,
					value: h,
					writable: true,
					enumerable: true,
					configurable: true
				})) throw new LocalError('Unexpected');
				j++;
			}
		}
		return filtered;
	},

	removeListener: function removeListener(name, handler) {
		if (name !== 'beforeExit' && name !== 'exit') {
			return this;
		}

		const cb = localReflectApply(localWeakMapGet, LISTENERS, [handler]);
		if (cb) localProcess.removeListener(name, cb);

		return this;
	},

	umask: function umask() {
		if (arguments.length) {
			throw new LocalError('Access denied to set umask.');
		}

		return localProcess.umask();
	}
};

if (optionConsole === 'inherit') {
	global.console = host.console;
} else if (optionConsole === 'redirect') {
	global.console = {
		debug(...args) {
			vmEmitArgs('console.debug', args);
		},
		log(...args) {
			vmEmitArgs('console.log', args);
		},
		info(...args) {
			vmEmitArgs('console.info', args);
		},
		warn(...args) {
			vmEmitArgs('console.warn', args);
		},
		error(...args) {
			vmEmitArgs('console.error', args);
		},
		dir(...args) {
			vmEmitArgs('console.dir', args);
		},
		time() {},
		timeEnd() {},
		trace(...args) {
			vmEmitArgs('console.trace', args);
		}
	};
}

return {
	__proto__: null,
	Module,
	jsonParse: JSON.parse,
	createRequireForModule,
	requireImpl
};

})`);var e=this._runScript(cacheSandboxScript),f={__proto__:null},d=(e,t)=>p.loadJS(this,e,t);for(let e=0;e<a.length;e++)f["."+a[e]]=d;f[".json"]||(f[".json"]=(e,t)=>p.loadJSON(this,e,t)),f[".node"]||(f[".node"]=(e,t)=>p.loadNode(this,e,t)),this.readonly(HOST),this.readonly(p),this.readonly(this);var{Module:t,jsonParse:r,createRequireForModule:o,requireImpl:h}=e(HOST,{__proto__:null,argv:c,env:u,console:i,vm:this,resolver:p,extensions:f});if(objectDefineProperties(this,{__proto__:null,_Module:{__proto__:null,value:t},_jsonParse:{__proto__:null,value:r},_createRequireForModule:{__proto__:null,value:o},_requireImpl:{__proto__:null,value:h},_cacheRequireModule:{__proto__:null,value:null,writable:!0}}),p.init(this),l&&this.setGlobals(l),n&&n.import)if(Array.isArray(n.import))for(let e=0,t=n.import.length;e<t;e++)this.require(n.import[e]);else this.require(n.import)}call(e,...t){if("function"==typeof e)return e(...t);throw new VMError$1("Unrecognized method type.")}require(e){var t,r=this._resolver.pathResolve(".");let i=this._cacheRequireModule;return i&&i.path===r||(t=this._resolver.pathConcat(r,"/vm.js"),i=new this._Module(t,r),this._resolver.registerModule(i,t,r,null,!1),this._cacheRequireModule=i),this._requireImpl(i,e,!0)}run(e,t){let r,i;"object"==typeof t?i=t.filename:(i=t,t={__proto__:null});var{strict:t=this.options.strict,wrapper:n=this.options.wrapper,module:s,require:o,dirname:a=null}=t;let c=s,u=a;e instanceof VMScript$1?(r=t?e._compileNodeVMStrict():e._compileNodeVM(),c||(s=this._resolver.pathResolve(e.filename),u=this._resolver.pathDirname(s),c=new this._Module(s,u),this._resolver.registerModule(c,s,u,null,!1))):(a=i||"vm.js",c||(i?(s=this._resolver.pathResolve(i),u=this._resolver.pathDirname(s),c=new this._Module(s,u),this._resolver.registerModule(c,s,u,null,!1)):(c=new this._Module(null,null)).id=a),s=t?STRICT_MODULE_PREFIX:MODULE_PREFIX,t=this._compiler(e,a),t=transformer(null,t,!1,!1,a).code,r=new Script(s+t+MODULE_SUFFIX,{__proto__:null,filename:a,displayErrors:!1}));e=this._runScript(r),s=o||this._createRequireForModule(c),t=Reflect.apply(e,this.sandbox,[c.exports,s,c,i,u]);return"commonjs"===n?c.exports:t}static code(e,t,r){let i;if(null!=t)if("object"==typeof t)r=t,i=r.filename;else{if("string"!=typeof t)throw new VMError$1("Invalid arguments.");i=t}else"object"==typeof r&&(i=r.filename);if(3<arguments.length)throw new VMError$1("Invalid number of arguments.");t="string"==typeof i?pa.resolve(i):void 0;return new NodeVM(r).run(e,t)}static file(e,t){var r=pa.resolve(e);if(!fs.existsSync(r))throw new VMError$1(`Script '${e}' not found.`);if(fs.statSync(r).isDirectory())throw new VMError$1("Script must be file, got directory.");return new NodeVM(t).run(fs.readFileSync(r,"utf8"),r)}};function vm2NestingLoader(e,t,r){return cacheMakeNestingScript=cacheMakeNestingScript||compileScript("nesting.js","(vm, nodevm) => ({VM: vm, NodeVM: nodevm})"),t._runScript(cacheMakeNestingScript)(t.readonly(VM$3),t.readonly(NodeVM$1))}nodevm.NodeVM=NodeVM$1;const{VMError}=bridge,{VMScript}=script,{VM:VM$2}=vm,{NodeVM}=nodevm,{VMFileSystem}=filesystem;main.VMError=VMError,main.VMScript=VMScript,main.NodeVM=NodeVM,main.VM=VM$2,main.VMFileSystem=VMFileSystem,!function(e){if(parseInt(process.versions.node.split(".")[0])<6)throw new Error("vm2 requires Node.js version 6 or newer.");e.exports=main}(vm2);var esprimaExports={},esprima$1={get exports(){return esprimaExports},set exports(e){esprimaExports=e}};!function(){var e;e=function(){return i=[function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var c=r(1),u=r(3),h=r(8),o=r(15);function i(e,t,r){function i(e,t){r&&r(e,t),n&&n.visit(e,t)}var n=null,s="function"==typeof r?i:null,o=!1,a=(t&&(o="boolean"==typeof t.comment&&t.comment,a="boolean"==typeof t.attachComment&&t.attachComment,o||a)&&((n=new c.CommentHandler).attach=a,t.comment=!0,s=i),!1),e=(t&&"string"==typeof t.sourceType&&(a="module"===t.sourceType),new(t&&"boolean"==typeof t.jsx&&t.jsx?u.JSXParser:h.Parser)(e,t,s)),t=a?e.parseModule():e.parseScript();return o&&n&&(t.comments=n.comments),e.config.tokens&&(t.tokens=e.tokens),e.config.tolerant&&(t.errors=e.errorHandler.errors),t}t.parse=i,t.parseModule=function(e,t,r){return(t=t||{}).sourceType="module",i(e,t,r)},t.parseScript=function(e,t,r){return(t=t||{}).sourceType="script",i(e,t,r)},t.tokenize=function(e,t,r){var i=new o.Tokenizer(e,t),n=[];try{for(;;){var s=i.getNextToken();if(!s)break;r&&(s=r(s)),n.push(s)}}catch(e){i.errorHandler.tolerate(e)}return i.errorHandler.tolerant&&(n.errors=i.errors()),n};r=r(2);t.Syntax=r.Syntax,t.version="4.0.1"},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var s=r(2);function i(){this.attach=!1,this.comments=[],this.stack=[],this.leading=[],this.trailing=[]}i.prototype.insertInnerComments=function(e,t){if(e.type===s.Syntax.BlockStatement&&0===e.body.length){for(var r=[],i=this.leading.length-1;0<=i;--i){var n=this.leading[i];t.end.offset>=n.start&&(r.unshift(n.comment),this.leading.splice(i,1),this.trailing.splice(i,1))}r.length&&(e.innerComments=r)}},i.prototype.findTrailingComments=function(e){var t=[];if(0<this.trailing.length){for(var r=this.trailing.length-1;0<=r;--r){var i=this.trailing[r];i.start>=e.end.offset&&t.unshift(i.comment)}this.trailing.length=0}else{var n,s=this.stack[this.stack.length-1];s&&s.node.trailingComments&&(n=s.node.trailingComments[0])&&n.range[0]>=e.end.offset&&(t=s.node.trailingComments,delete s.node.trailingComments)}return t},i.prototype.findLeadingComments=function(e){for(var t,r=[];0<this.stack.length&&((s=this.stack[this.stack.length-1])&&s.start>=e.start.offset);)t=s.node,this.stack.pop();if(t){for(var i=(t.leadingComments?t.leadingComments.length:0)-1;0<=i;--i){var n=t.leadingComments[i];n.range[1]<=e.start.offset&&(r.unshift(n),t.leadingComments.splice(i,1))}t.leadingComments&&0===t.leadingComments.length&&delete t.leadingComments}else for(var s,i=this.leading.length-1;0<=i;--i)(s=this.leading[i]).start<=e.start.offset&&(r.unshift(s.comment),this.leading.splice(i,1));return r},i.prototype.visitNode=function(e,t){var r,i;e.type===s.Syntax.Program&&0<e.body.length||(this.insertInnerComments(e,t),r=this.findTrailingComments(t),0<(i=this.findLeadingComments(t)).length&&(e.leadingComments=i),0<r.length&&(e.trailingComments=r),this.stack.push({node:e,start:t.start.offset}))},i.prototype.visitComment=function(e,t){var r="L"===e.type[0]?"Line":"Block",i={type:r,value:e.value};e.range&&(i.range=e.range),e.loc&&(i.loc=e.loc),this.comments.push(i),this.attach&&(i={comment:{type:r,value:e.value,range:[t.start.offset,t.end.offset]},start:t.start.offset},e.loc&&(i.comment.loc=e.loc),e.type=r,this.leading.push(i),this.trailing.push(i))},i.prototype.visit=function(e,t){"LineComment"===e.type||"BlockComment"===e.type?this.visitComment(e,t):this.attach&&this.visitNode(e,t)},t.CommentHandler=i},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Syntax={AssignmentExpression:"AssignmentExpression",AssignmentPattern:"AssignmentPattern",ArrayExpression:"ArrayExpression",ArrayPattern:"ArrayPattern",ArrowFunctionExpression:"ArrowFunctionExpression",AwaitExpression:"AwaitExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ClassBody:"ClassBody",ClassDeclaration:"ClassDeclaration",ClassExpression:"ClassExpression",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExportAllDeclaration:"ExportAllDeclaration",ExportDefaultDeclaration:"ExportDefaultDeclaration",ExportNamedDeclaration:"ExportNamedDeclaration",ExportSpecifier:"ExportSpecifier",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForOfStatement:"ForOfStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",ImportDeclaration:"ImportDeclaration",ImportDefaultSpecifier:"ImportDefaultSpecifier",ImportNamespaceSpecifier:"ImportNamespaceSpecifier",ImportSpecifier:"ImportSpecifier",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",MetaProperty:"MetaProperty",MethodDefinition:"MethodDefinition",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",ObjectPattern:"ObjectPattern",Program:"Program",Property:"Property",RestElement:"RestElement",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SpreadElement:"SpreadElement",Super:"Super",SwitchCase:"SwitchCase",SwitchStatement:"SwitchStatement",TaggedTemplateExpression:"TaggedTemplateExpression",TemplateElement:"TemplateElement",TemplateLiteral:"TemplateLiteral",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement",YieldExpression:"YieldExpression"}},function(e,t,r){var i,n=this&&this.__extends||(i=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(e,t){e.__proto__=t}:function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])}),function(e,t){function r(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),c=(Object.defineProperty(t,"__esModule",{value:!0}),r(4)),o=r(5),a=r(6),s=r(7),u=r(8),h=r(13),l=r(14);function p(e){switch(e.type){case a.JSXSyntax.JSXIdentifier:var t=e.name;break;case a.JSXSyntax.JSXNamespacedName:var r=e;t=p(r.namespace)+":"+p(r.name);break;case a.JSXSyntax.JSXMemberExpression:r=e;t=p(r.object)+"."+p(r.property)}return t}h.TokenName[100]="JSXIdentifier",h.TokenName[101]="JSXText";f=u.Parser,n(d,f),d.prototype.parsePrimaryExpression=function(){return this.match("<")?this.parseJSXRoot():f.prototype.parsePrimaryExpression.call(this)},d.prototype.startJSX=function(){this.scanner.index=this.startMarker.index,this.scanner.lineNumber=this.startMarker.line,this.scanner.lineStart=this.startMarker.index-this.startMarker.column},d.prototype.finishJSX=function(){this.nextToken()},d.prototype.reenterJSX=function(){this.startJSX(),this.expectJSX("}"),this.config.tokens&&this.tokens.pop()},d.prototype.createJSXNode=function(){return this.collectComments(),{index:this.scanner.index,line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart}},d.prototype.createJSXChildNode=function(){return{index:this.scanner.index,line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart}},d.prototype.scanXHTMLEntity=function(e){for(var t,r="&",i=!0,n=!1,s=!1,o=!1;!this.scanner.eof()&&i&&!n;){var a=this.scanner.source[this.scanner.index];if(a===e)break;if(n=";"===a,r+=a,++this.scanner.index,!n)switch(r.length){case 2:s="#"===a;break;case 3:s&&(i=(o="x"===a)||c.Character.isDecimalDigit(a.charCodeAt(0)),s=s&&!o);break;default:i=(i=i&&!(s&&!c.Character.isDecimalDigit(a.charCodeAt(0))))&&!(o&&!c.Character.isHexDigit(a.charCodeAt(0)))}}return i&&n&&2<r.length&&(t=r.substr(1,r.length-2),s&&1<t.length?r=String.fromCharCode(parseInt(t.substr(1),10)):o&&2<t.length?r=String.fromCharCode(parseInt("0"+t.substr(1),16)):s||o||!l.XHTMLEntities[t]||(r=l.XHTMLEntities[t])),r},d.prototype.lexJSX=function(){var e,t,r,i=this.scanner.source.charCodeAt(this.scanner.index);if(60===i||62===i||47===i||58===i||61===i||123===i||125===i)return{type:7,value:r=this.scanner.source[this.scanner.index++],lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:this.scanner.index-1,end:this.scanner.index};if(34===i||39===i){for(var n=this.scanner.index,s=this.scanner.source[this.scanner.index++],o="";!this.scanner.eof();){if((a=this.scanner.source[this.scanner.index++])===s)break;o+="&"===a?this.scanXHTMLEntity(s):a}return{type:8,value:o,lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:n,end:this.scanner.index}}if(46===i)return e=this.scanner.source.charCodeAt(this.scanner.index+1),t=this.scanner.source.charCodeAt(this.scanner.index+2),n=this.scanner.index,this.scanner.index+=(r=46===e&&46===t?"...":".").length,{type:7,value:r,lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:n,end:this.scanner.index};if(96===i)return{type:10,value:"",lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:this.scanner.index,end:this.scanner.index};if(c.Character.isIdentifierStart(i)&&92!==i){n=this.scanner.index;for(++this.scanner.index;!this.scanner.eof();){var a=this.scanner.source.charCodeAt(this.scanner.index);if((!c.Character.isIdentifierPart(a)||92===a)&&45!==a)break;++this.scanner.index}return{type:100,value:this.scanner.source.slice(n,this.scanner.index),lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:n,end:this.scanner.index}}return this.scanner.lex()},d.prototype.nextJSXToken=function(){this.collectComments(),this.startMarker.index=this.scanner.index,this.startMarker.line=this.scanner.lineNumber,this.startMarker.column=this.scanner.index-this.scanner.lineStart;var e=this.lexJSX();return this.lastMarker.index=this.scanner.index,this.lastMarker.line=this.scanner.lineNumber,this.lastMarker.column=this.scanner.index-this.scanner.lineStart,this.config.tokens&&this.tokens.push(this.convertToken(e)),e},d.prototype.nextJSXText=function(){this.startMarker.index=this.scanner.index,this.startMarker.line=this.scanner.lineNumber,this.startMarker.column=this.scanner.index-this.scanner.lineStart;for(var e=this.scanner.index,t="";!this.scanner.eof();){var r=this.scanner.source[this.scanner.index];if("{"===r||"<"===r)break;++this.scanner.index,t+=r,c.Character.isLineTerminator(r.charCodeAt(0))&&(++this.scanner.lineNumber,"\r"===r&&"\n"===this.scanner.source[this.scanner.index]&&++this.scanner.index,this.scanner.lineStart=this.scanner.index)}this.lastMarker.index=this.scanner.index,this.lastMarker.line=this.scanner.lineNumber,this.lastMarker.column=this.scanner.index-this.scanner.lineStart;e={type:101,value:t,lineNumber:this.scanner.lineNumber,lineStart:this.scanner.lineStart,start:e,end:this.scanner.index};return 0<t.length&&this.config.tokens&&this.tokens.push(this.convertToken(e)),e},d.prototype.peekJSXToken=function(){var e=this.scanner.saveState(),t=(this.scanner.scanComments(),this.lexJSX());return this.scanner.restoreState(e),t},d.prototype.expectJSX=function(e){var t=this.nextJSXToken();7===t.type&&t.value===e||this.throwUnexpectedToken(t)},d.prototype.matchJSX=function(e){var t=this.peekJSXToken();return 7===t.type&&t.value===e},d.prototype.parseJSXIdentifier=function(){var e=this.createJSXNode(),t=this.nextJSXToken();return 100!==t.type&&this.throwUnexpectedToken(t),this.finalize(e,new o.JSXIdentifier(t.value))},d.prototype.parseJSXElementName=function(){var e=this.createJSXNode(),t=this.parseJSXIdentifier();if(this.matchJSX(":"))var r=t,i=(this.expectJSX(":"),this.parseJSXIdentifier()),t=this.finalize(e,new o.JSXNamespacedName(r,i));else if(this.matchJSX("."))for(;this.matchJSX(".");){var n=t,s=(this.expectJSX("."),this.parseJSXIdentifier());t=this.finalize(e,new o.JSXMemberExpression(n,s))}return t},d.prototype.parseJSXAttributeName=function(){var e,t,r=this.createJSXNode(),i=this.parseJSXIdentifier();return this.matchJSX(":")?(e=i,this.expectJSX(":"),t=this.parseJSXIdentifier(),this.finalize(r,new o.JSXNamespacedName(e,t))):i},d.prototype.parseJSXStringLiteralAttribute=function(){var e=this.createJSXNode(),t=this.nextJSXToken(),r=(8!==t.type&&this.throwUnexpectedToken(t),this.getTokenRaw(t));return this.finalize(e,new s.Literal(t.value,r))},d.prototype.parseJSXExpressionAttribute=function(){var e=this.createJSXNode(),t=(this.expectJSX("{"),this.finishJSX(),this.match("}")&&this.tolerateError("JSX attributes must only be assigned a non-empty expression"),this.parseAssignmentExpression());return this.reenterJSX(),this.finalize(e,new o.JSXExpressionContainer(t))},d.prototype.parseJSXAttributeValue=function(){return this.matchJSX("{")?this.parseJSXExpressionAttribute():this.matchJSX("<")?this.parseJSXElement():this.parseJSXStringLiteralAttribute()},d.prototype.parseJSXNameValueAttribute=function(){var e=this.createJSXNode(),t=this.parseJSXAttributeName(),r=null;return this.matchJSX("=")&&(this.expectJSX("="),r=this.parseJSXAttributeValue()),this.finalize(e,new o.JSXAttribute(t,r))},d.prototype.parseJSXSpreadAttribute=function(){var e=this.createJSXNode(),t=(this.expectJSX("{"),this.expectJSX("..."),this.finishJSX(),this.parseAssignmentExpression());return this.reenterJSX(),this.finalize(e,new o.JSXSpreadAttribute(t))},d.prototype.parseJSXAttributes=function(){for(var e=[];!this.matchJSX("/")&&!this.matchJSX(">");){var t=this.matchJSX("{")?this.parseJSXSpreadAttribute():this.parseJSXNameValueAttribute();e.push(t)}return e},d.prototype.parseJSXOpeningElement=function(){var e=this.createJSXNode(),t=(this.expectJSX("<"),this.parseJSXElementName()),r=this.parseJSXAttributes(),i=this.matchJSX("/");return i&&this.expectJSX("/"),this.expectJSX(">"),this.finalize(e,new o.JSXOpeningElement(t,i,r))},d.prototype.parseJSXBoundaryElement=function(){var e,t,r,i=this.createJSXNode();return this.expectJSX("<"),this.matchJSX("/")?(this.expectJSX("/"),e=this.parseJSXElementName(),this.expectJSX(">"),this.finalize(i,new o.JSXClosingElement(e))):(e=this.parseJSXElementName(),t=this.parseJSXAttributes(),(r=this.matchJSX("/"))&&this.expectJSX("/"),this.expectJSX(">"),this.finalize(i,new o.JSXOpeningElement(e,r,t)))},d.prototype.parseJSXEmptyExpression=function(){var e=this.createJSXChildNode();return this.collectComments(),this.lastMarker.index=this.scanner.index,this.lastMarker.line=this.scanner.lineNumber,this.lastMarker.column=this.scanner.index-this.scanner.lineStart,this.finalize(e,new o.JSXEmptyExpression)},d.prototype.parseJSXExpressionContainer=function(){var e,t=this.createJSXNode();return this.expectJSX("{"),this.matchJSX("}")?(e=this.parseJSXEmptyExpression(),this.expectJSX("}")):(this.finishJSX(),e=this.parseAssignmentExpression(),this.reenterJSX()),this.finalize(t,new o.JSXExpressionContainer(e))},d.prototype.parseJSXChildren=function(){for(var e=[];!this.scanner.eof();){var t,r=this.createJSXChildNode(),i=this.nextJSXText();if(i.start<i.end&&(t=this.getTokenRaw(i),r=this.finalize(r,new o.JSXText(i.value,t)),e.push(r)),"{"!==this.scanner.source[this.scanner.index])break;i=this.parseJSXExpressionContainer();e.push(i)}return e},d.prototype.parseComplexJSXElement=function(e){for(var t=[];!this.scanner.eof();){e.children=e.children.concat(this.parseJSXChildren());var r,i=this.createJSXChildNode(),n=this.parseJSXBoundaryElement();if(n.type===a.JSXSyntax.JSXOpeningElement&&((r=n).selfClosing?(s=this.finalize(i,new o.JSXElement(r,[],null)),e.children.push(s)):(t.push(e),e={node:i,opening:r,closing:null,children:[]})),n.type===a.JSXSyntax.JSXClosingElement){e.closing=n;i=p(e.opening.name);if(i!==p(e.closing.name)&&this.tolerateError("Expected corresponding JSX closing tag for %0",i),!(0<t.length))break;var s=this.finalize(e.node,new o.JSXElement(e.opening,e.children,e.closing));(e=t[t.length-1]).children.push(s),t.pop()}}return e},d.prototype.parseJSXElement=function(){var e,t=this.createJSXNode(),r=this.parseJSXOpeningElement(),i=[],n=null;return r.selfClosing||(i=(e=this.parseComplexJSXElement({node:t,opening:r,closing:n,children:i})).children,n=e.closing),this.finalize(t,new o.JSXElement(r,i,n))},d.prototype.parseJSXRoot=function(){this.config.tokens&&this.tokens.pop(),this.startJSX();var e=this.parseJSXElement();return this.finishJSX(),e},d.prototype.isStartOfExpression=function(){return f.prototype.isStartOfExpression.call(this)||this.match("<")};var f,r=d;function d(e,t,r){return f.call(this,e,t,r)||this}t.JSXParser=r},function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r={NonAsciiIdentifierStart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,NonAsciiIdentifierPart:/[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/};t.Character={fromCodePoint:function(e){return e<65536?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10))+String.fromCharCode(56320+(e-65536&1023))},isWhiteSpace:function(e){return 32===e||9===e||11===e||12===e||160===e||5760<=e&&0<=[5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(e)},isLineTerminator:function(e){return 10===e||13===e||8232===e||8233===e},isIdentifierStart:function(e){return 36===e||95===e||65<=e&&e<=90||97<=e&&e<=122||92===e||128<=e&&r.NonAsciiIdentifierStart.test(t.Character.fromCodePoint(e))},isIdentifierPart:function(e){return 36===e||95===e||65<=e&&e<=90||97<=e&&e<=122||48<=e&&e<=57||92===e||128<=e&&r.NonAsciiIdentifierPart.test(t.Character.fromCodePoint(e))},isDecimalDigit:function(e){return 48<=e&&e<=57},isHexDigit:function(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102},isOctalDigit:function(e){return 48<=e&&e<=55}}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});function i(e,t,r){this.type=f.JSXSyntax.JSXElement,this.openingElement=e,this.children=t,this.closingElement=r}function n(){this.type=f.JSXSyntax.JSXEmptyExpression}function s(e){this.type=f.JSXSyntax.JSXExpressionContainer,this.expression=e}function o(e){this.type=f.JSXSyntax.JSXIdentifier,this.name=e}function a(e,t){this.type=f.JSXSyntax.JSXMemberExpression,this.object=e,this.property=t}function c(e,t){this.type=f.JSXSyntax.JSXAttribute,this.name=e,this.value=t}function u(e,t){this.type=f.JSXSyntax.JSXNamespacedName,this.namespace=e,this.name=t}function h(e,t,r){this.type=f.JSXSyntax.JSXOpeningElement,this.name=e,this.selfClosing=t,this.attributes=r}function l(e){this.type=f.JSXSyntax.JSXSpreadAttribute,this.argument=e}function p(e,t){this.type=f.JSXSyntax.JSXText,this.value=e,this.raw=t}var f=r(6);t.JSXClosingElement=function(e){this.type=f.JSXSyntax.JSXClosingElement,this.name=e},t.JSXElement=i,t.JSXEmptyExpression=n,t.JSXExpressionContainer=s,t.JSXIdentifier=o,t.JSXMemberExpression=a,t.JSXAttribute=c,t.JSXNamespacedName=u,t.JSXOpeningElement=h,t.JSXSpreadAttribute=l;t.JSXText=p},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.JSXSyntax={JSXAttribute:"JSXAttribute",JSXClosingElement:"JSXClosingElement",JSXElement:"JSXElement",JSXEmptyExpression:"JSXEmptyExpression",JSXExpressionContainer:"JSXExpressionContainer",JSXIdentifier:"JSXIdentifier",JSXMemberExpression:"JSXMemberExpression",JSXNamespacedName:"JSXNamespacedName",JSXOpeningElement:"JSXOpeningElement",JSXSpreadAttribute:"JSXSpreadAttribute",JSXText:"JSXText"}},function(M,e,t){Object.defineProperty(e,"__esModule",{value:!0});function r(e){this.type=R.Syntax.ArrayPattern,this.elements=e}function i(e,t,r){this.type=R.Syntax.ArrowFunctionExpression,this.id=null,this.params=e,this.body=t,this.generator=!1,this.expression=r,this.async=!1}function n(e,t,r){this.type=R.Syntax.AssignmentExpression,this.operator=e,this.left=t,this.right=r}function s(e,t){this.type=R.Syntax.AssignmentPattern,this.left=e,this.right=t}function o(e,t,r){this.type=R.Syntax.ArrowFunctionExpression,this.id=null,this.params=e,this.body=t,this.generator=!1,this.expression=r,this.async=!0}function a(e,t,r){this.type=R.Syntax.FunctionDeclaration,this.id=e,this.params=t,this.body=r,this.generator=!1,this.expression=!1,this.async=!0}function c(e,t,r){this.type=R.Syntax.FunctionExpression,this.id=e,this.params=t,this.body=r,this.generator=!1,this.expression=!1,this.async=!0}function u(e){this.type=R.Syntax.AwaitExpression,this.argument=e}function h(e,t,r){this.type="||"===e||"&&"===e?R.Syntax.LogicalExpression:R.Syntax.BinaryExpression,this.operator=e,this.left=t,this.right=r}function l(e){this.type=R.Syntax.BlockStatement,this.body=e}function p(e){this.type=R.Syntax.BreakStatement,this.label=e}function f(e,t){this.type=R.Syntax.CallExpression,this.callee=e,this.arguments=t}function d(e,t){this.type=R.Syntax.CatchClause,this.param=e,this.body=t}function m(e){this.type=R.Syntax.ClassBody,this.body=e}function y(e,t,r){this.type=R.Syntax.ClassDeclaration,this.id=e,this.superClass=t,this.body=r}function g(e,t,r){this.type=R.Syntax.ClassExpression,this.id=e,this.superClass=t,this.body=r}function x(e,t){this.type=R.Syntax.MemberExpression,this.computed=!0,this.object=e,this.property=t}function E(e,t,r){this.type=R.Syntax.ConditionalExpression,this.test=e,this.consequent=t,this.alternate=r}function v(e){this.type=R.Syntax.ContinueStatement,this.label=e}function b(){this.type=R.Syntax.DebuggerStatement}function S(e,t){this.type=R.Syntax.ExpressionStatement,this.expression=e,this.directive=t}function D(e,t){this.type=R.Syntax.DoWhileStatement,this.body=e,this.test=t}function A(){this.type=R.Syntax.EmptyStatement}function w(e){this.type=R.Syntax.ExportAllDeclaration,this.source=e}function C(e){this.type=R.Syntax.ExportDefaultDeclaration,this.declaration=e}function _(e,t,r){this.type=R.Syntax.ExportNamedDeclaration,this.declaration=e,this.specifiers=t,this.source=r}function k(e,t){this.type=R.Syntax.ExportSpecifier,this.exported=t,this.local=e}function F(e){this.type=R.Syntax.ExpressionStatement,this.expression=e}function P(e,t,r){this.type=R.Syntax.ForInStatement,this.left=e,this.right=t,this.body=r,this.each=!1}function T(e,t,r){this.type=R.Syntax.ForOfStatement,this.left=e,this.right=t,this.body=r}function I(e,t,r,i){this.type=R.Syntax.ForStatement,this.init=e,this.test=t,this.update=r,this.body=i}function O(e,t,r,i){this.type=R.Syntax.FunctionDeclaration,this.id=e,this.params=t,this.body=r,this.generator=i,this.expression=!1,this.async=!1}function N(e,t,r,i){this.type=R.Syntax.FunctionExpression,this.id=e,this.params=t,this.body=r,this.generator=i,this.expression=!1,this.async=!1}function B(e){this.type=R.Syntax.Identifier,this.name=e}function L(e,t,r){this.type=R.Syntax.IfStatement,this.test=e,this.consequent=t,this.alternate=r}function j(e,t){this.type=R.Syntax.ImportDeclaration,this.specifiers=e,this.source=t}function $(e){this.type=R.Syntax.ImportDefaultSpecifier,this.local=e}function U(e){this.type=R.Syntax.ImportNamespaceSpecifier,this.local=e}function V(e,t){this.type=R.Syntax.ImportSpecifier,this.local=e,this.imported=t}function G(e,t){this.type=R.Syntax.LabeledStatement,this.label=e,this.body=t}function W(e,t){this.type=R.Syntax.Literal,this.value=e,this.raw=t}function z(e,t){this.type=R.Syntax.MetaProperty,this.meta=e,this.property=t}function X(e,t,r,i,n){this.type=R.Syntax.MethodDefinition,this.key=e,this.computed=t,this.value=r,this.kind=i,this.static=n}function H(e){this.type=R.Syntax.Program,this.body=e,this.sourceType="module"}function J(e,t){this.type=R.Syntax.NewExpression,this.callee=e,this.arguments=t}function q(e){this.type=R.Syntax.ObjectExpression,this.properties=e}function K(e){this.type=R.Syntax.ObjectPattern,this.properties=e}function Y(e,t,r,i,n,s){this.type=R.Syntax.Property,this.key=t,this.computed=r,this.value=i,this.kind=e,this.method=n,this.shorthand=s}function Q(e,t,r,i){this.type=R.Syntax.Literal,this.value=e,this.raw=t,this.regex={pattern:r,flags:i}}function Z(e){this.type=R.Syntax.RestElement,this.argument=e}function ee(e){this.type=R.Syntax.ReturnStatement,this.argument=e}function te(e){this.type=R.Syntax.Program,this.body=e,this.sourceType="script"}function re(e){this.type=R.Syntax.SequenceExpression,this.expressions=e}function ie(e){this.type=R.Syntax.SpreadElement,this.argument=e}function ne(e,t){this.type=R.Syntax.MemberExpression,this.computed=!1,this.object=e,this.property=t}function se(){this.type=R.Syntax.Super}function oe(e,t){this.type=R.Syntax.SwitchCase,this.test=e,this.consequent=t}function ae(e,t){this.type=R.Syntax.SwitchStatement,this.discriminant=e,this.cases=t}function ce(e,t){this.type=R.Syntax.TaggedTemplateExpression,this.tag=e,this.quasi=t}function ue(e,t){this.type=R.Syntax.TemplateElement,this.value=e,this.tail=t}function he(e,t){this.type=R.Syntax.TemplateLiteral,this.quasis=e,this.expressions=t}function le(){this.type=R.Syntax.ThisExpression}function pe(e){this.type=R.Syntax.ThrowStatement,this.argument=e}function fe(e,t,r){this.type=R.Syntax.TryStatement,this.block=e,this.handler=t,this.finalizer=r}function de(e,t){this.type=R.Syntax.UnaryExpression,this.operator=e,this.argument=t,this.prefix=!0}function me(e,t,r){this.type=R.Syntax.UpdateExpression,this.operator=e,this.argument=t,this.prefix=r}function ye(e,t){this.type=R.Syntax.VariableDeclaration,this.declarations=e,this.kind=t}function ge(e,t){this.type=R.Syntax.VariableDeclarator,this.id=e,this.init=t}function xe(e,t){this.type=R.Syntax.WhileStatement,this.test=e,this.body=t}function Ee(e,t){this.type=R.Syntax.WithStatement,this.object=e,this.body=t}function ve(e,t){this.type=R.Syntax.YieldExpression,this.argument=e,this.delegate=t}var R=t(2);e.ArrayExpression=function(e){this.type=R.Syntax.ArrayExpression,this.elements=e},e.ArrayPattern=r,e.ArrowFunctionExpression=i,e.AssignmentExpression=n,e.AssignmentPattern=s,e.AsyncArrowFunctionExpression=o,e.AsyncFunctionDeclaration=a,e.AsyncFunctionExpression=c,e.AwaitExpression=u,e.BinaryExpression=h,e.BlockStatement=l,e.BreakStatement=p,e.CallExpression=f,e.CatchClause=d,e.ClassBody=m,e.ClassDeclaration=y,e.ClassExpression=g,e.ComputedMemberExpression=x,e.ConditionalExpression=E,e.ContinueStatement=v,e.DebuggerStatement=b,e.Directive=S,e.DoWhileStatement=D,e.EmptyStatement=A,e.ExportAllDeclaration=w,e.ExportDefaultDeclaration=C,e.ExportNamedDeclaration=_,e.ExportSpecifier=k,e.ExpressionStatement=F,e.ForInStatement=P,e.ForOfStatement=T,e.ForStatement=I,e.FunctionDeclaration=O,e.FunctionExpression=N,e.Identifier=B,e.IfStatement=L,e.ImportDeclaration=j,e.ImportDefaultSpecifier=$,e.ImportNamespaceSpecifier=U,e.ImportSpecifier=V,e.LabeledStatement=G,e.Literal=W,e.MetaProperty=z,e.MethodDefinition=X,e.Module=H,e.NewExpression=J,e.ObjectExpression=q,e.ObjectPattern=K,e.Property=Y,e.RegexLiteral=Q,e.RestElement=Z,e.ReturnStatement=ee,e.Script=te,e.SequenceExpression=re,e.SpreadElement=ie,e.StaticMemberExpression=ne,e.Super=se,e.SwitchCase=oe,e.SwitchStatement=ae,e.TaggedTemplateExpression=ce,e.TemplateElement=ue,e.TemplateLiteral=he,e.ThisExpression=le,e.ThrowStatement=pe,e.TryStatement=fe,e.UnaryExpression=de,e.UpdateExpression=me,e.VariableDeclaration=ye,e.VariableDeclarator=ge,e.WhileStatement=xe,e.WithStatement=Ee;e.YieldExpression=ve},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var s=r(9),i=r(10),f=r(11),m=r(7),n=r(12),p=r(2),o=r(13),d="ArrowParameterPlaceHolder";function a(e,t,r){this.config={range:"boolean"==typeof(t=void 0===t?{}:t).range&&t.range,loc:"boolean"==typeof t.loc&&t.loc,source:null,tokens:"boolean"==typeof t.tokens&&t.tokens,comment:"boolean"==typeof t.comment&&t.comment,tolerant:"boolean"==typeof t.tolerant&&t.tolerant},this.config.loc&&t.source&&null!==t.source&&(this.config.source=String(t.source)),this.delegate=r,this.errorHandler=new i.ErrorHandler,this.errorHandler.tolerant=this.config.tolerant,this.scanner=new n.Scanner(e,this.errorHandler),this.scanner.trackComment=this.config.comment,this.operatorPrecedence={")":0,";":0,",":0,"=":0,"]":0,"||":1,"&&":2,"|":3,"^":4,"&":5,"==":6,"!=":6,"===":6,"!==":6,"<":7,">":7,"<=":7,">=":7,"<<":8,">>":8,">>>":8,"+":9,"-":9,"*":11,"/":11,"%":11},this.lookahead={type:2,value:"",lineNumber:this.scanner.lineNumber,lineStart:0,start:0,end:0},this.hasLineTerminator=!1,this.context={isModule:!1,await:!1,allowIn:!0,allowStrictDirective:!0,allowYield:!0,firstCoverInitializedNameError:null,isAssignmentTarget:!1,isBindingElement:!1,inFunctionBody:!1,inIteration:!1,inSwitch:!1,labelSet:{},strict:!1},this.tokens=[],this.startMarker={index:0,line:this.scanner.lineNumber,column:0},this.lastMarker={index:0,line:this.scanner.lineNumber,column:0},this.nextToken(),this.lastMarker={index:this.scanner.index,line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart}}a.prototype.throwError=function(e){var r=Array.prototype.slice.call(arguments,1),e=e.replace(/%(\d)/g,function(e,t){return s.assert(t<r.length,"Message reference must be in range"),r[t]}),t=this.lastMarker.index,i=this.lastMarker.line,n=this.lastMarker.column+1;throw this.errorHandler.createError(t,i,n,e)},a.prototype.tolerateError=function(e){var r=Array.prototype.slice.call(arguments,1),e=e.replace(/%(\d)/g,function(e,t){return s.assert(t<r.length,"Message reference must be in range"),r[t]}),t=this.lastMarker.index,i=this.scanner.lineNumber,n=this.lastMarker.column+1;this.errorHandler.tolerateError(t,i,n,e)},a.prototype.unexpectedTokenError=function(e,t){var r,i,n=t||f.Messages.UnexpectedToken,t=e?(t||(n=2===e.type?f.Messages.UnexpectedEOS:3===e.type?f.Messages.UnexpectedIdentifier:6===e.type?f.Messages.UnexpectedNumber:8===e.type?f.Messages.UnexpectedString:10===e.type?f.Messages.UnexpectedTemplate:f.Messages.UnexpectedToken,4===e.type&&(this.scanner.isFutureReservedWord(e.value)?n=f.Messages.UnexpectedReserved:this.context.strict&&this.scanner.isStrictModeReservedWord(e.value)&&(n=f.Messages.StrictReservedWord))),e.value):"ILLEGAL",n=n.replace("%0",t);return e=e&&"number"==typeof e.lineNumber?(r=e.start,i=e.lineNumber,t=this.lastMarker.index-this.lastMarker.column,e.start-t+1):(r=this.lastMarker.index,i=this.lastMarker.line,this.lastMarker.column+1),this.errorHandler.createError(r,i,e,n)},a.prototype.throwUnexpectedToken=function(e,t){throw this.unexpectedTokenError(e,t)},a.prototype.tolerateUnexpectedToken=function(e,t){this.errorHandler.tolerate(this.unexpectedTokenError(e,t))},a.prototype.collectComments=function(){if(this.config.comment){var e=this.scanner.scanComments();if(0<e.length&&this.delegate)for(var t=0;t<e.length;++t){var r=e[t],i=void 0,i={type:r.multiLine?"BlockComment":"LineComment",value:this.scanner.source.slice(r.slice[0],r.slice[1])},r=(this.config.range&&(i.range=r.range),this.config.loc&&(i.loc=r.loc),{start:{line:r.loc.start.line,column:r.loc.start.column,offset:r.range[0]},end:{line:r.loc.end.line,column:r.loc.end.column,offset:r.range[1]}});this.delegate(i,r)}}else this.scanner.scanComments()},a.prototype.getTokenRaw=function(e){return this.scanner.source.slice(e.start,e.end)},a.prototype.convertToken=function(e){var t,r={type:o.TokenName[e.type],value:this.getTokenRaw(e)};return this.config.range&&(r.range=[e.start,e.end]),this.config.loc&&(r.loc={start:{line:this.startMarker.line,column:this.startMarker.column},end:{line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart}}),9===e.type&&(t=e.pattern,e=e.flags,r.regex={pattern:t,flags:e}),r},a.prototype.nextToken=function(){var e=this.lookahead,t=(this.lastMarker.index=this.scanner.index,this.lastMarker.line=this.scanner.lineNumber,this.lastMarker.column=this.scanner.index-this.scanner.lineStart,this.collectComments(),this.scanner.index!==this.startMarker.index&&(this.startMarker.index=this.scanner.index,this.startMarker.line=this.scanner.lineNumber,this.startMarker.column=this.scanner.index-this.scanner.lineStart),this.scanner.lex());return this.hasLineTerminator=e.lineNumber!==t.lineNumber,t&&this.context.strict&&3===t.type&&this.scanner.isStrictModeReservedWord(t.value)&&(t.type=4),this.lookahead=t,this.config.tokens&&2!==t.type&&this.tokens.push(this.convertToken(t)),e},a.prototype.nextRegexToken=function(){this.collectComments();var e=this.scanner.scanRegExp();return this.config.tokens&&(this.tokens.pop(),this.tokens.push(this.convertToken(e))),this.lookahead=e,this.nextToken(),e},a.prototype.createNode=function(){return{index:this.startMarker.index,line:this.startMarker.line,column:this.startMarker.column}},a.prototype.startNode=function(e,t){void 0===t&&(t=0);var r=e.start-e.lineStart,i=e.lineNumber;return r<0&&(r+=t,i--),{index:e.start,line:i,column:r}},a.prototype.finalize=function(e,t){return this.config.range&&(t.range=[e.index,this.lastMarker.index]),this.config.loc&&(t.loc={start:{line:e.line,column:e.column},end:{line:this.lastMarker.line,column:this.lastMarker.column}},this.config.source)&&(t.loc.source=this.config.source),this.delegate&&(e={start:{line:e.line,column:e.column,offset:e.index},end:{line:this.lastMarker.line,column:this.lastMarker.column,offset:this.lastMarker.index}},this.delegate(t,e)),t},a.prototype.expect=function(e){var t=this.nextToken();7===t.type&&t.value===e||this.throwUnexpectedToken(t)},a.prototype.expectCommaSeparator=function(){var e;this.config.tolerant?7===(e=this.lookahead).type&&","===e.value?this.nextToken():7===e.type&&";"===e.value?(this.nextToken(),this.tolerateUnexpectedToken(e)):this.tolerateUnexpectedToken(e,f.Messages.UnexpectedToken):this.expect(",")},a.prototype.expectKeyword=function(e){var t=this.nextToken();4===t.type&&t.value===e||this.throwUnexpectedToken(t)},a.prototype.match=function(e){return 7===this.lookahead.type&&this.lookahead.value===e},a.prototype.matchKeyword=function(e){return 4===this.lookahead.type&&this.lookahead.value===e},a.prototype.matchContextualKeyword=function(e){return 3===this.lookahead.type&&this.lookahead.value===e},a.prototype.matchAssign=function(){var e;return 7===this.lookahead.type&&("="===(e=this.lookahead.value)||"*="===e||"**="===e||"/="===e||"%="===e||"+="===e||"-="===e||"<<="===e||">>="===e||">>>="===e||"&="===e||"^="===e||"|="===e)},a.prototype.isolateCoverGrammar=function(e){var t=this.context.isBindingElement,r=this.context.isAssignmentTarget,i=this.context.firstCoverInitializedNameError,e=(this.context.isBindingElement=!0,this.context.isAssignmentTarget=!0,this.context.firstCoverInitializedNameError=null,e.call(this));return null!==this.context.firstCoverInitializedNameError&&this.throwUnexpectedToken(this.context.firstCoverInitializedNameError),this.context.isBindingElement=t,this.context.isAssignmentTarget=r,this.context.firstCoverInitializedNameError=i,e},a.prototype.inheritCoverGrammar=function(e){var t=this.context.isBindingElement,r=this.context.isAssignmentTarget,i=this.context.firstCoverInitializedNameError,e=(this.context.isBindingElement=!0,this.context.isAssignmentTarget=!0,this.context.firstCoverInitializedNameError=null,e.call(this));return this.context.isBindingElement=this.context.isBindingElement&&t,this.context.isAssignmentTarget=this.context.isAssignmentTarget&&r,this.context.firstCoverInitializedNameError=i||this.context.firstCoverInitializedNameError,e},a.prototype.consumeSemicolon=function(){this.match(";")?this.nextToken():this.hasLineTerminator||(2===this.lookahead.type||this.match("}")||this.throwUnexpectedToken(this.lookahead),this.lastMarker.index=this.startMarker.index,this.lastMarker.line=this.startMarker.line,this.lastMarker.column=this.startMarker.column)},a.prototype.parsePrimaryExpression=function(){var e,t,r,i=this.createNode();switch(this.lookahead.type){case 3:(this.context.isModule||this.context.await)&&"await"===this.lookahead.value&&this.tolerateUnexpectedToken(this.lookahead),e=this.matchAsyncFunction()?this.parseFunctionExpression():this.finalize(i,new m.Identifier(this.nextToken().value));break;case 6:case 8:this.context.strict&&this.lookahead.octal&&this.tolerateUnexpectedToken(this.lookahead,f.Messages.StrictOctalLiteral),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,t=this.nextToken(),r=this.getTokenRaw(t),e=this.finalize(i,new m.Literal(t.value,r));break;case 1:this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,t=this.nextToken(),r=this.getTokenRaw(t),e=this.finalize(i,new m.Literal("true"===t.value,r));break;case 5:this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,t=this.nextToken(),r=this.getTokenRaw(t),e=this.finalize(i,new m.Literal(null,r));break;case 10:e=this.parseTemplateLiteral();break;case 7:switch(this.lookahead.value){case"(":this.context.isBindingElement=!1,e=this.inheritCoverGrammar(this.parseGroupExpression);break;case"[":e=this.inheritCoverGrammar(this.parseArrayInitializer);break;case"{":e=this.inheritCoverGrammar(this.parseObjectInitializer);break;case"/":case"/=":this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,this.scanner.index=this.startMarker.index,t=this.nextRegexToken(),r=this.getTokenRaw(t),e=this.finalize(i,new m.RegexLiteral(t.regex,r,t.pattern,t.flags));break;default:e=this.throwUnexpectedToken(this.nextToken())}break;case 4:e=!this.context.strict&&this.context.allowYield&&this.matchKeyword("yield")?this.parseIdentifierName():!this.context.strict&&this.matchKeyword("let")?this.finalize(i,new m.Identifier(this.nextToken().value)):(this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,this.matchKeyword("function")?this.parseFunctionExpression():this.matchKeyword("this")?(this.nextToken(),this.finalize(i,new m.ThisExpression)):this.matchKeyword("class")?this.parseClassExpression():this.throwUnexpectedToken(this.nextToken()));break;default:e=this.throwUnexpectedToken(this.nextToken())}return e},a.prototype.parseSpreadElement=function(){var e=this.createNode(),t=(this.expect("..."),this.inheritCoverGrammar(this.parseAssignmentExpression));return this.finalize(e,new m.SpreadElement(t))},a.prototype.parseArrayInitializer=function(){var e,t=this.createNode(),r=[];for(this.expect("[");!this.match("]");)this.match(",")?(this.nextToken(),r.push(null)):this.match("...")?(e=this.parseSpreadElement(),this.match("]")||(this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,this.expect(",")),r.push(e)):(r.push(this.inheritCoverGrammar(this.parseAssignmentExpression)),this.match("]")||this.expect(","));return this.expect("]"),this.finalize(t,new m.ArrayExpression(r))},a.prototype.parsePropertyMethod=function(e){this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1;var t=this.context.strict,r=this.context.allowStrictDirective,i=(this.context.allowStrictDirective=e.simple,this.isolateCoverGrammar(this.parseFunctionSourceElements));return this.context.strict&&e.firstRestricted&&this.tolerateUnexpectedToken(e.firstRestricted,e.message),this.context.strict&&e.stricted&&this.tolerateUnexpectedToken(e.stricted,e.message),this.context.strict=t,this.context.allowStrictDirective=r,i},a.prototype.parsePropertyMethodFunction=function(){var e=this.createNode(),t=this.context.allowYield,r=(this.context.allowYield=!0,this.parseFormalParameters()),i=this.parsePropertyMethod(r);return this.context.allowYield=t,this.finalize(e,new m.FunctionExpression(null,r.params,i,!1))},a.prototype.parsePropertyMethodAsyncFunction=function(){var e=this.createNode(),t=this.context.allowYield,r=this.context.await,i=(this.context.allowYield=!1,this.context.await=!0,this.parseFormalParameters()),n=this.parsePropertyMethod(i);return this.context.allowYield=t,this.context.await=r,this.finalize(e,new m.AsyncFunctionExpression(null,i.params,n))},a.prototype.parseObjectPropertyKey=function(){var e=this.createNode(),t=this.nextToken();switch(t.type){case 8:case 6:this.context.strict&&t.octal&&this.tolerateUnexpectedToken(t,f.Messages.StrictOctalLiteral);var r=this.getTokenRaw(t),i=this.finalize(e,new m.Literal(t.value,r));break;case 3:case 1:case 5:case 4:i=this.finalize(e,new m.Identifier(t.value));break;case 7:"["===t.value?(i=this.isolateCoverGrammar(this.parseAssignmentExpression),this.expect("]")):i=this.throwUnexpectedToken(t);break;default:i=this.throwUnexpectedToken(t)}return i},a.prototype.isPropertyKey=function(e,t){return e.type===p.Syntax.Identifier&&e.name===t||e.type===p.Syntax.Literal&&e.value===t},a.prototype.parseObjectProperty=function(e){var t,r,i=this.createNode(),n=this.lookahead,s=null,o=null,a=!1,c=!1,u=!1,h=!1,l=(3===n.type?(r=n.value,this.nextToken(),a=this.match("["),s=(h=!(this.hasLineTerminator||"async"!==r||this.match(":")||this.match("(")||this.match("*")||this.match(",")))?this.parseObjectPropertyKey():this.finalize(i,new m.Identifier(r))):this.match("*")?this.nextToken():(a=this.match("["),s=this.parseObjectPropertyKey()),this.qualifiedPropertyName(this.lookahead));return 3===n.type&&!h&&"get"===n.value&&l?(t="get",a=this.match("["),s=this.parseObjectPropertyKey(),this.context.allowYield=!1,o=this.parseGetterMethod()):3===n.type&&!h&&"set"===n.value&&l?(t="set",a=this.match("["),s=this.parseObjectPropertyKey(),o=this.parseSetterMethod()):7===n.type&&"*"===n.value&&l?(t="init",a=this.match("["),s=this.parseObjectPropertyKey(),o=this.parseGeneratorMethod(),c=!0):(s||this.throwUnexpectedToken(this.lookahead),t="init",this.match(":")&&!h?(!a&&this.isPropertyKey(s,"__proto__")&&(e.value&&this.tolerateError(f.Messages.DuplicateProtoProperty),e.value=!0),this.nextToken(),o=this.inheritCoverGrammar(this.parseAssignmentExpression)):this.match("(")?(o=h?this.parsePropertyMethodAsyncFunction():this.parsePropertyMethodFunction(),c=!0):3===n.type?(r=this.finalize(i,new m.Identifier(n.value)),o=this.match("=")?(this.context.firstCoverInitializedNameError=this.lookahead,this.nextToken(),u=!0,l=this.isolateCoverGrammar(this.parseAssignmentExpression),this.finalize(i,new m.AssignmentPattern(r,l))):(u=!0,r)):this.throwUnexpectedToken(this.nextToken())),this.finalize(i,new m.Property(t,s,a,o,c,u))},a.prototype.parseObjectInitializer=function(){for(var e=this.createNode(),t=(this.expect("{"),[]),r={value:!1};!this.match("}");)t.push(this.parseObjectProperty(r)),this.match("}")||this.expectCommaSeparator();return this.expect("}"),this.finalize(e,new m.ObjectExpression(t))},a.prototype.parseTemplateHead=function(){s.assert(this.lookahead.head,"Template literal must start with a template head");var e=this.createNode(),t=this.nextToken(),r=t.value,i=t.cooked;return this.finalize(e,new m.TemplateElement({raw:r,cooked:i},t.tail))},a.prototype.parseTemplateElement=function(){10!==this.lookahead.type&&this.throwUnexpectedToken();var e=this.createNode(),t=this.nextToken(),r=t.value,i=t.cooked;return this.finalize(e,new m.TemplateElement({raw:r,cooked:i},t.tail))},a.prototype.parseTemplateLiteral=function(){var e=this.createNode(),t=[],r=[],i=this.parseTemplateHead();for(r.push(i);!i.tail;)t.push(this.parseExpression()),i=this.parseTemplateElement(),r.push(i);return this.finalize(e,new m.TemplateLiteral(r,t))},a.prototype.reinterpretExpressionAsPattern=function(e){switch(e.type){case p.Syntax.Identifier:case p.Syntax.MemberExpression:case p.Syntax.RestElement:case p.Syntax.AssignmentPattern:break;case p.Syntax.SpreadElement:e.type=p.Syntax.RestElement,this.reinterpretExpressionAsPattern(e.argument);break;case p.Syntax.ArrayExpression:e.type=p.Syntax.ArrayPattern;for(var t=0;t<e.elements.length;t++)null!==e.elements[t]&&this.reinterpretExpressionAsPattern(e.elements[t]);break;case p.Syntax.ObjectExpression:e.type=p.Syntax.ObjectPattern;for(t=0;t<e.properties.length;t++)this.reinterpretExpressionAsPattern(e.properties[t].value);break;case p.Syntax.AssignmentExpression:e.type=p.Syntax.AssignmentPattern,delete e.operator,this.reinterpretExpressionAsPattern(e.left)}},a.prototype.parseGroupExpression=function(){if(this.expect("("),this.match(")"))this.nextToken(),this.match("=>")||this.expect("=>"),s={type:d,params:[],async:!1};else{var e=this.lookahead,t=[];if(this.match("..."))s=this.parseRestElement(t),this.expect(")"),this.match("=>")||this.expect("=>"),s={type:d,params:[s],async:!1};else{var r=!1;if(this.context.isBindingElement=!0,s=this.inheritCoverGrammar(this.parseAssignmentExpression),this.match(",")){var i=[];for(this.context.isAssignmentTarget=!1,i.push(s);2!==this.lookahead.type&&this.match(",");){if(this.nextToken(),this.match(")")){this.nextToken();for(var n=0;n<i.length;n++)this.reinterpretExpressionAsPattern(i[n]);s={type:d,params:i,async:!(r=!0)}}else if(this.match("...")){this.context.isBindingElement||this.throwUnexpectedToken(this.lookahead),i.push(this.parseRestElement(t)),this.expect(")"),this.match("=>")||this.expect("=>"),this.context.isBindingElement=!1;for(n=0;n<i.length;n++)this.reinterpretExpressionAsPattern(i[n]);s={type:d,params:i,async:!(r=!0)}}else i.push(this.inheritCoverGrammar(this.parseAssignmentExpression));if(r)break}r||(s=this.finalize(this.startNode(e),new m.SequenceExpression(i)))}if(!r){if(this.expect(")"),this.match("=>")&&(s.type===p.Syntax.Identifier&&"yield"===s.name&&(s={type:d,params:[s],async:!(r=!0)}),!r)){if(this.context.isBindingElement||this.throwUnexpectedToken(this.lookahead),s.type===p.Syntax.SequenceExpression)for(n=0;n<s.expressions.length;n++)this.reinterpretExpressionAsPattern(s.expressions[n]);else this.reinterpretExpressionAsPattern(s);var e=s.type===p.Syntax.SequenceExpression?s.expressions:[s],s={type:d,params:e,async:!1}}this.context.isBindingElement=!1}}}return s},a.prototype.parseArguments=function(){this.expect("(");var e=[];if(!this.match(")"))for(;;){var t=this.match("...")?this.parseSpreadElement():this.isolateCoverGrammar(this.parseAssignmentExpression);if(e.push(t),this.match(")"))break;if(this.expectCommaSeparator(),this.match(")"))break}return this.expect(")"),e},a.prototype.isIdentifierName=function(e){return 3===e.type||4===e.type||1===e.type||5===e.type},a.prototype.parseIdentifierName=function(){var e=this.createNode(),t=this.nextToken();return this.isIdentifierName(t)||this.throwUnexpectedToken(t),this.finalize(e,new m.Identifier(t.value))},a.prototype.parseNewExpression=function(){var e,t,r=this.createNode(),i=this.parseIdentifierName();return s.assert("new"===i.name,"New expression must start with `new`"),this.match(".")?(this.nextToken(),3===this.lookahead.type&&this.context.inFunctionBody&&"target"===this.lookahead.value?(e=this.parseIdentifierName(),e=new m.MetaProperty(i,e)):this.throwUnexpectedToken(this.lookahead)):(i=this.isolateCoverGrammar(this.parseLeftHandSideExpression),t=this.match("(")?this.parseArguments():[],e=new m.NewExpression(i,t),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1),this.finalize(r,e)},a.prototype.parseAsyncArgument=function(){var e=this.parseAssignmentExpression();return this.context.firstCoverInitializedNameError=null,e},a.prototype.parseAsyncArguments=function(){this.expect("(");var e=[];if(!this.match(")"))for(;;){var t=this.match("...")?this.parseSpreadElement():this.isolateCoverGrammar(this.parseAsyncArgument);if(e.push(t),this.match(")"))break;if(this.expectCommaSeparator(),this.match(")"))break}return this.expect(")"),e},a.prototype.parseLeftHandSideExpressionAllowCall=function(){var e=this.lookahead,t=this.matchContextualKeyword("async"),r=this.context.allowIn;for(this.context.allowIn=!0,this.matchKeyword("super")&&this.context.inFunctionBody?(n=this.createNode(),this.nextToken(),n=this.finalize(n,new m.Super),this.match("(")||this.match(".")||this.match("[")||this.throwUnexpectedToken(this.lookahead)):n=this.inheritCoverGrammar(this.matchKeyword("new")?this.parseNewExpression:this.parsePrimaryExpression);;)if(this.match(".")){this.context.isBindingElement=!1,this.context.isAssignmentTarget=!0,this.expect(".");var i=this.parseIdentifierName(),n=this.finalize(this.startNode(e),new m.StaticMemberExpression(n,i))}else if(this.match("(")){var s=t&&e.lineNumber===this.lookahead.lineNumber,o=(this.context.isBindingElement=!1,this.context.isAssignmentTarget=!1,s?this.parseAsyncArguments():this.parseArguments());if(n=this.finalize(this.startNode(e),new m.CallExpression(n,o)),s&&this.match("=>")){for(var a=0;a<o.length;++a)this.reinterpretExpressionAsPattern(o[a]);n={type:d,params:o,async:!0}}}else if(this.match("[")){this.context.isBindingElement=!1,this.context.isAssignmentTarget=!0,this.expect("[");i=this.isolateCoverGrammar(this.parseExpression);this.expect("]"),n=this.finalize(this.startNode(e),new m.ComputedMemberExpression(n,i))}else{if(10!==this.lookahead.type||!this.lookahead.head)break;s=this.parseTemplateLiteral();n=this.finalize(this.startNode(e),new m.TaggedTemplateExpression(n,s))}return this.context.allowIn=r,n},a.prototype.parseSuper=function(){var e=this.createNode();return this.expectKeyword("super"),this.match("[")||this.match(".")||this.throwUnexpectedToken(this.lookahead),this.finalize(e,new m.Super)},a.prototype.parseLeftHandSideExpression=function(){s.assert(this.context.allowIn,"callee of new expression always allow in keyword.");for(var e=this.startNode(this.lookahead),t=this.matchKeyword("super")&&this.context.inFunctionBody?this.parseSuper():this.inheritCoverGrammar(this.matchKeyword("new")?this.parseNewExpression:this.parsePrimaryExpression);;)if(this.match("[")){this.context.isBindingElement=!1,this.context.isAssignmentTarget=!0,this.expect("[");var r=this.isolateCoverGrammar(this.parseExpression);this.expect("]"),t=this.finalize(e,new m.ComputedMemberExpression(t,r))}else if(this.match(".")){this.context.isBindingElement=!1,this.context.isAssignmentTarget=!0,this.expect(".");r=this.parseIdentifierName(),t=this.finalize(e,new m.StaticMemberExpression(t,r))}else{if(10!==this.lookahead.type||!this.lookahead.head)break;var i=this.parseTemplateLiteral();t=this.finalize(e,new m.TaggedTemplateExpression(t,i))}return t},a.prototype.parseUpdateExpression=function(){var e,t,r,i=this.lookahead;return this.match("++")||this.match("--")?(r=this.startNode(i),t=this.nextToken(),e=this.inheritCoverGrammar(this.parseUnaryExpression),this.context.strict&&e.type===p.Syntax.Identifier&&this.scanner.isRestrictedWord(e.name)&&this.tolerateError(f.Messages.StrictLHSPrefix),this.context.isAssignmentTarget||this.tolerateError(f.Messages.InvalidLHSInAssignment),e=this.finalize(r,new m.UpdateExpression(t.value,e,r=!0)),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1):(e=this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall),this.hasLineTerminator||7!==this.lookahead.type||(this.match("++")||this.match("--"))&&(this.context.strict&&e.type===p.Syntax.Identifier&&this.scanner.isRestrictedWord(e.name)&&this.tolerateError(f.Messages.StrictLHSPostfix),this.context.isAssignmentTarget||this.tolerateError(f.Messages.InvalidLHSInAssignment),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,t=this.nextToken().value,r=!1,e=this.finalize(this.startNode(i),new m.UpdateExpression(t,e,r)))),e},a.prototype.parseAwaitExpression=function(){var e=this.createNode(),t=(this.nextToken(),this.parseUnaryExpression());return this.finalize(e,new m.AwaitExpression(t))},a.prototype.parseUnaryExpression=function(){var e,t,r;return this.match("+")||this.match("-")||this.match("~")||this.match("!")||this.matchKeyword("delete")||this.matchKeyword("void")||this.matchKeyword("typeof")?(e=this.startNode(this.lookahead),t=this.nextToken(),r=this.inheritCoverGrammar(this.parseUnaryExpression),r=this.finalize(e,new m.UnaryExpression(t.value,r)),this.context.strict&&"delete"===r.operator&&r.argument.type===p.Syntax.Identifier&&this.tolerateError(f.Messages.StrictDelete),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1):r=this.context.await&&this.matchContextualKeyword("await")?this.parseAwaitExpression():this.parseUpdateExpression(),r},a.prototype.parseExponentiationExpression=function(){var e,t,r=this.lookahead,i=this.inheritCoverGrammar(this.parseUnaryExpression);return i.type!==p.Syntax.UnaryExpression&&this.match("**")&&(this.nextToken(),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,e=i,t=this.isolateCoverGrammar(this.parseExponentiationExpression),i=this.finalize(this.startNode(r),new m.BinaryExpression("**",e,t))),i},a.prototype.binaryPrecedence=function(e){var t=e.value,e=7===e.type?this.operatorPrecedence[t]||0:4===e.type&&("instanceof"===t||this.context.allowIn&&"in"===t)?7:0;return e},a.prototype.parseBinaryExpression=function(){var e=this.lookahead,t=this.inheritCoverGrammar(this.parseExponentiationExpression),r=this.lookahead,i=this.binaryPrecedence(r);if(0<i){this.nextToken(),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1;for(var n=[e,this.lookahead],s=t,o=this.isolateCoverGrammar(this.parseExponentiationExpression),a=[s,r.value,o],c=[i];;){if((i=this.binaryPrecedence(this.lookahead))<=0)break;for(;2<a.length&&i<=c[c.length-1];){var o=a.pop(),u=a.pop(),h=(c.pop(),s=a.pop(),n.pop(),this.startNode(n[n.length-1]));a.push(this.finalize(h,new m.BinaryExpression(u,s,o)))}a.push(this.nextToken().value),c.push(i),n.push(this.lookahead),a.push(this.isolateCoverGrammar(this.parseExponentiationExpression))}for(var l=a.length-1,p=(t=a[l],n.pop());1<l;){var f=n.pop(),d=p&&p.lineStart,h=this.startNode(f,d),u=a[l-1],t=this.finalize(h,new m.BinaryExpression(u,a[l-2],t));l-=2,p=f}}return t},a.prototype.parseConditionalExpression=function(){var e,t,r=this.lookahead,i=this.inheritCoverGrammar(this.parseBinaryExpression);return this.match("?")&&(this.nextToken(),t=this.context.allowIn,this.context.allowIn=!0,e=this.isolateCoverGrammar(this.parseAssignmentExpression),this.context.allowIn=t,this.expect(":"),t=this.isolateCoverGrammar(this.parseAssignmentExpression),i=this.finalize(this.startNode(r),new m.ConditionalExpression(i,e,t)),this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1),i},a.prototype.checkPatternParam=function(e,t){switch(t.type){case p.Syntax.Identifier:this.validateParam(e,t,t.name);break;case p.Syntax.RestElement:this.checkPatternParam(e,t.argument);break;case p.Syntax.AssignmentPattern:this.checkPatternParam(e,t.left);break;case p.Syntax.ArrayPattern:for(var r=0;r<t.elements.length;r++)null!==t.elements[r]&&this.checkPatternParam(e,t.elements[r]);break;case p.Syntax.ObjectPattern:for(r=0;r<t.properties.length;r++)this.checkPatternParam(e,t.properties[r].value)}e.simple=e.simple&&t instanceof m.Identifier},a.prototype.reinterpretAsCoverFormalsList=function(e){var t=[e],r=!1;switch(e.type){case p.Syntax.Identifier:break;case d:t=e.params,r=e.async;break;default:return null}for(var i,n={simple:!0,paramSet:{}},s=0;s<t.length;++s)(o=t[s]).type===p.Syntax.AssignmentPattern?o.right.type===p.Syntax.YieldExpression&&(o.right.argument&&this.throwUnexpectedToken(this.lookahead),o.right.type=p.Syntax.Identifier,o.right.name="yield",delete o.right.argument,delete o.right.delegate):r&&o.type===p.Syntax.Identifier&&"await"===o.name&&this.throwUnexpectedToken(this.lookahead),this.checkPatternParam(n,o),t[s]=o;if(this.context.strict||!this.context.allowYield)for(var o,s=0;s<t.length;++s)(o=t[s]).type===p.Syntax.YieldExpression&&this.throwUnexpectedToken(this.lookahead);return n.message===f.Messages.StrictParamDupe&&(i=this.context.strict?n.stricted:n.firstRestricted,this.throwUnexpectedToken(i,n.message)),{simple:n.simple,params:t,stricted:n.stricted,firstRestricted:n.firstRestricted,message:n.message}},a.prototype.parseAssignmentExpression=function(){var e,t,r,i,n,s,o,a,c,u,h,l;return!this.context.allowYield&&this.matchKeyword("yield")?l=this.parseYieldExpression():(t=e=this.lookahead,l=this.parseConditionalExpression(),3!==t.type||t.lineNumber!==this.lookahead.lineNumber||"async"!==t.value||3!==this.lookahead.type&&!this.matchKeyword("yield")||(c=this.parsePrimaryExpression(),this.reinterpretExpressionAsPattern(c),l={type:d,params:[c],async:!0}),l.type===d||this.match("=>")?(this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1,c=l.async,(h=this.reinterpretAsCoverFormalsList(l))&&(this.hasLineTerminator&&this.tolerateUnexpectedToken(this.lookahead),this.context.firstCoverInitializedNameError=null,r=this.context.strict,i=this.context.allowStrictDirective,this.context.allowStrictDirective=h.simple,n=this.context.allowYield,s=this.context.await,this.context.allowYield=!0,this.context.await=c,u=this.startNode(e),o=void this.expect("=>"),this.match("{")?(a=this.context.allowIn,this.context.allowIn=!0,o=this.parseFunctionSourceElements(),this.context.allowIn=a):o=this.isolateCoverGrammar(this.parseAssignmentExpression),a=o.type!==p.Syntax.BlockStatement,this.context.strict&&h.firstRestricted&&this.throwUnexpectedToken(h.firstRestricted,h.message),this.context.strict&&h.stricted&&this.tolerateUnexpectedToken(h.stricted,h.message),l=c?this.finalize(u,new m.AsyncArrowFunctionExpression(h.params,o,a)):this.finalize(u,new m.ArrowFunctionExpression(h.params,o,a)),this.context.strict=r,this.context.allowStrictDirective=i,this.context.allowYield=n,this.context.await=s)):this.matchAssign()&&(this.context.isAssignmentTarget||this.tolerateError(f.Messages.InvalidLHSInAssignment),this.context.strict&&l.type===p.Syntax.Identifier&&(c=l,this.scanner.isRestrictedWord(c.name)&&this.tolerateUnexpectedToken(t,f.Messages.StrictLHSAssignment),this.scanner.isStrictModeReservedWord(c.name))&&this.tolerateUnexpectedToken(t,f.Messages.StrictReservedWord),this.match("=")?this.reinterpretExpressionAsPattern(l):(this.context.isAssignmentTarget=!1,this.context.isBindingElement=!1),u=(t=this.nextToken()).value,h=this.isolateCoverGrammar(this.parseAssignmentExpression),l=this.finalize(this.startNode(e),new m.AssignmentExpression(u,l,h)),this.context.firstCoverInitializedNameError=null)),l},a.prototype.parseExpression=function(){var e=this.lookahead,t=this.isolateCoverGrammar(this.parseAssignmentExpression);if(this.match(",")){var r=[];for(r.push(t);2!==this.lookahead.type&&this.match(",");)this.nextToken(),r.push(this.isolateCoverGrammar(this.parseAssignmentExpression));t=this.finalize(this.startNode(e),new m.SequenceExpression(r))}return t},a.prototype.parseStatementListItem=function(){var e;if(this.context.isAssignmentTarget=!0,this.context.isBindingElement=!0,4===this.lookahead.type)switch(this.lookahead.value){case"export":this.context.isModule||this.tolerateUnexpectedToken(this.lookahead,f.Messages.IllegalExportDeclaration),e=this.parseExportDeclaration();break;case"import":this.context.isModule||this.tolerateUnexpectedToken(this.lookahead,f.Messages.IllegalImportDeclaration),e=this.parseImportDeclaration();break;case"const":e=this.parseLexicalDeclaration({inFor:!1});break;case"function":e=this.parseFunctionDeclaration();break;case"class":e=this.parseClassDeclaration();break;case"let":e=this.isLexicalDeclaration()?this.parseLexicalDeclaration({inFor:!1}):this.parseStatement();break;default:e=this.parseStatement()}else e=this.parseStatement();return e},a.prototype.parseBlock=function(){for(var e=this.createNode(),t=(this.expect("{"),[]);!this.match("}");)t.push(this.parseStatementListItem());return this.expect("}"),this.finalize(e,new m.BlockStatement(t))},a.prototype.parseLexicalBinding=function(e,t){var r=this.createNode(),i=this.parsePattern([],e),n=(this.context.strict&&i.type===p.Syntax.Identifier&&this.scanner.isRestrictedWord(i.name)&&this.tolerateError(f.Messages.StrictVarName),null);return"const"===e?this.matchKeyword("in")||this.matchContextualKeyword("of")||(this.match("=")?(this.nextToken(),n=this.isolateCoverGrammar(this.parseAssignmentExpression)):this.throwError(f.Messages.DeclarationMissingInitializer,"const")):(!t.inFor&&i.type!==p.Syntax.Identifier||this.match("="))&&(this.expect("="),n=this.isolateCoverGrammar(this.parseAssignmentExpression)),this.finalize(r,new m.VariableDeclarator(i,n))},a.prototype.parseBindingList=function(e,t){for(var r=[this.parseLexicalBinding(e,t)];this.match(",");)this.nextToken(),r.push(this.parseLexicalBinding(e,t));return r},a.prototype.isLexicalDeclaration=function(){var e=this.scanner.saveState(),t=(this.scanner.scanComments(),this.scanner.lex());return this.scanner.restoreState(e),3===t.type||7===t.type&&"["===t.value||7===t.type&&"{"===t.value||4===t.type&&"let"===t.value||4===t.type&&"yield"===t.value},a.prototype.parseLexicalDeclaration=function(e){var t=this.createNode(),r=this.nextToken().value,e=(s.assert("let"===r||"const"===r,"Lexical declaration must be either let or const"),this.parseBindingList(r,e));return this.consumeSemicolon(),this.finalize(t,new m.VariableDeclaration(e,r))},a.prototype.parseBindingRestElement=function(e,t){var r=this.createNode(),e=(this.expect("..."),this.parsePattern(e,t));return this.finalize(r,new m.RestElement(e))},a.prototype.parseArrayPattern=function(e,t){for(var r=this.createNode(),i=(this.expect("["),[]);!this.match("]");)if(this.match(","))this.nextToken(),i.push(null);else{if(this.match("...")){i.push(this.parseBindingRestElement(e,t));break}i.push(this.parsePatternWithDefault(e,t)),this.match("]")||this.expect(",")}return this.expect("]"),this.finalize(r,new m.ArrayPattern(i))},a.prototype.parsePropertyPattern=function(e,t){var r,i,n,s,o=this.createNode(),a=!1,c=!1;return s=3===this.lookahead.type?(r=this.lookahead,i=this.parseVariableIdentifier(),n=this.finalize(o,new m.Identifier(r.value)),this.match("=")?(e.push(r),c=!0,this.nextToken(),s=this.parseAssignmentExpression(),this.finalize(this.startNode(r),new m.AssignmentPattern(n,s))):this.match(":")?(this.expect(":"),this.parsePatternWithDefault(e,t)):(e.push(r),c=!0,n)):(a=this.match("["),i=this.parseObjectPropertyKey(),this.expect(":"),this.parsePatternWithDefault(e,t)),this.finalize(o,new m.Property("init",i,a,s,!1,c))},a.prototype.parseObjectPattern=function(e,t){var r=this.createNode(),i=[];for(this.expect("{");!this.match("}");)i.push(this.parsePropertyPattern(e,t)),this.match("}")||this.expect(",");return this.expect("}"),this.finalize(r,new m.ObjectPattern(i))},a.prototype.parsePattern=function(e,t){e=this.match("[")?this.parseArrayPattern(e,t):this.match("{")?this.parseObjectPattern(e,t):(!this.matchKeyword("let")||"const"!==t&&"let"!==t||this.tolerateUnexpectedToken(this.lookahead,f.Messages.LetInLexicalBinding),e.push(this.lookahead),this.parseVariableIdentifier(t));return e},a.prototype.parsePatternWithDefault=function(e,t){var r,i=this.lookahead,e=this.parsePattern(e,t);return this.match("=")&&(this.nextToken(),t=this.context.allowYield,this.context.allowYield=!0,r=this.isolateCoverGrammar(this.parseAssignmentExpression),this.context.allowYield=t,e=this.finalize(this.startNode(i),new m.AssignmentPattern(e,r))),e},a.prototype.parseVariableIdentifier=function(e){var t=this.createNode(),r=this.nextToken();return 4===r.type&&"yield"===r.value?this.context.strict?this.tolerateUnexpectedToken(r,f.Messages.StrictReservedWord):this.context.allowYield||this.throwUnexpectedToken(r):3!==r.type?this.context.strict&&4===r.type&&this.scanner.isStrictModeReservedWord(r.value)?this.tolerateUnexpectedToken(r,f.Messages.StrictReservedWord):!this.context.strict&&"let"===r.value&&"var"===e||this.throwUnexpectedToken(r):(this.context.isModule||this.context.await)&&3===r.type&&"await"===r.value&&this.tolerateUnexpectedToken(r),this.finalize(t,new m.Identifier(r.value))},a.prototype.parseVariableDeclaration=function(e){var t=this.createNode(),r=this.parsePattern([],"var"),i=(this.context.strict&&r.type===p.Syntax.Identifier&&this.scanner.isRestrictedWord(r.name)&&this.tolerateError(f.Messages.StrictVarName),null);return this.match("=")?(this.nextToken(),i=this.isolateCoverGrammar(this.parseAssignmentExpression)):r.type===p.Syntax.Identifier||e.inFor||this.expect("="),this.finalize(t,new m.VariableDeclarator(r,i))},a.prototype.parseVariableDeclarationList=function(e){var t={inFor:e.inFor},r=[];for(r.push(this.parseVariableDeclaration(t));this.match(",");)this.nextToken(),r.push(this.parseVariableDeclaration(t));return r},a.prototype.parseVariableStatement=function(){var e=this.createNode(),t=(this.expectKeyword("var"),this.parseVariableDeclarationList({inFor:!1}));return this.consumeSemicolon(),this.finalize(e,new m.VariableDeclaration(t,"var"))},a.prototype.parseEmptyStatement=function(){var e=this.createNode();return this.expect(";"),this.finalize(e,new m.EmptyStatement)},a.prototype.parseExpressionStatement=function(){var e=this.createNode(),t=this.parseExpression();return this.consumeSemicolon(),this.finalize(e,new m.ExpressionStatement(t))},a.prototype.parseIfClause=function(){return this.context.strict&&this.matchKeyword("function")&&this.tolerateError(f.Messages.StrictFunction),this.parseStatement()},a.prototype.parseIfStatement=function(){var e,t=this.createNode(),r=null,i=(this.expectKeyword("if"),this.expect("("),this.parseExpression());return!this.match(")")&&this.config.tolerant?(this.tolerateUnexpectedToken(this.nextToken()),e=this.finalize(this.createNode(),new m.EmptyStatement)):(this.expect(")"),e=this.parseIfClause(),this.matchKeyword("else")&&(this.nextToken(),r=this.parseIfClause())),this.finalize(t,new m.IfStatement(i,e,r))},a.prototype.parseDoWhileStatement=function(){var e=this.createNode(),t=(this.expectKeyword("do"),this.context.inIteration),r=(this.context.inIteration=!0,this.parseStatement()),t=(this.context.inIteration=t,this.expectKeyword("while"),this.expect("("),this.parseExpression());return!this.match(")")&&this.config.tolerant?this.tolerateUnexpectedToken(this.nextToken()):(this.expect(")"),this.match(";")&&this.nextToken()),this.finalize(e,new m.DoWhileStatement(r,t))},a.prototype.parseWhileStatement=function(){var e,t,r=this.createNode(),i=(this.expectKeyword("while"),this.expect("("),this.parseExpression());return!this.match(")")&&this.config.tolerant?(this.tolerateUnexpectedToken(this.nextToken()),e=this.finalize(this.createNode(),new m.EmptyStatement)):(this.expect(")"),t=this.context.inIteration,this.context.inIteration=!0,e=this.parseStatement(),this.context.inIteration=t),this.finalize(r,new m.WhileStatement(i,e))},a.prototype.parseForStatement=function(){var e,t,r=null,i=null,n=null,s=!0,o=this.createNode();if(this.expectKeyword("for"),this.expect("("),this.match(";"))this.nextToken();else if(this.matchKeyword("var")){r=this.createNode(),this.nextToken();var a,c=this.context.allowIn,u=(this.context.allowIn=!1,this.parseVariableDeclarationList({inFor:!0}));this.context.allowIn=c,1===u.length&&this.matchKeyword("in")?((a=u[0]).init&&(a.id.type===p.Syntax.ArrayPattern||a.id.type===p.Syntax.ObjectPattern||this.context.strict)&&this.tolerateError(f.Messages.ForInOfLoopInitializer,"for-in"),r=this.finalize(r,new m.VariableDeclaration(u,"var")),this.nextToken(),a=r,e=this.parseExpression(),r=null):1===u.length&&null===u[0].init&&this.matchContextualKeyword("of")?(r=this.finalize(r,new m.VariableDeclaration(u,"var")),this.nextToken(),a=r,e=this.parseAssignmentExpression(),r=null,s=!1):(r=this.finalize(r,new m.VariableDeclaration(u,"var")),this.expect(";"))}else if(this.matchKeyword("const")||this.matchKeyword("let")){var r=this.createNode(),h=this.nextToken().value;this.context.strict||"in"!==this.lookahead.value?(c=this.context.allowIn,this.context.allowIn=!1,u=this.parseBindingList(h,{inFor:!0}),this.context.allowIn=c,1===u.length&&null===u[0].init&&this.matchKeyword("in")?(r=this.finalize(r,new m.VariableDeclaration(u,h)),this.nextToken(),a=r,e=this.parseExpression(),r=null):1===u.length&&null===u[0].init&&this.matchContextualKeyword("of")?(r=this.finalize(r,new m.VariableDeclaration(u,h)),this.nextToken(),a=r,e=this.parseAssignmentExpression(),r=null,s=!1):(this.consumeSemicolon(),r=this.finalize(r,new m.VariableDeclaration(u,h)))):(r=this.finalize(r,new m.Identifier(h)),this.nextToken(),a=r,e=this.parseExpression(),r=null)}else{u=this.lookahead,c=this.context.allowIn;if(this.context.allowIn=!1,r=this.inheritCoverGrammar(this.parseAssignmentExpression),this.context.allowIn=c,this.matchKeyword("in"))this.context.isAssignmentTarget&&r.type!==p.Syntax.AssignmentExpression||this.tolerateError(f.Messages.InvalidLHSInForIn),this.nextToken(),this.reinterpretExpressionAsPattern(r),a=r,e=this.parseExpression(),r=null;else if(this.matchContextualKeyword("of"))this.context.isAssignmentTarget&&r.type!==p.Syntax.AssignmentExpression||this.tolerateError(f.Messages.InvalidLHSInForLoop),this.nextToken(),this.reinterpretExpressionAsPattern(r),a=r,e=this.parseAssignmentExpression(),r=null,s=!1;else{if(this.match(",")){for(var l=[r];this.match(",");)this.nextToken(),l.push(this.isolateCoverGrammar(this.parseAssignmentExpression));r=this.finalize(this.startNode(u),new m.SequenceExpression(l))}this.expect(";")}}return void 0===a&&(this.match(";")||(i=this.parseExpression()),this.expect(";"),this.match(")")||(n=this.parseExpression())),!this.match(")")&&this.config.tolerant?(this.tolerateUnexpectedToken(this.nextToken()),t=this.finalize(this.createNode(),new m.EmptyStatement)):(this.expect(")"),h=this.context.inIteration,this.context.inIteration=!0,t=this.isolateCoverGrammar(this.parseStatement),this.context.inIteration=h),void 0===a?this.finalize(o,new m.ForStatement(r,i,n,t)):s?this.finalize(o,new m.ForInStatement(a,e,t)):this.finalize(o,new m.ForOfStatement(a,e,t))},a.prototype.parseContinueStatement=function(){var e,t,r=this.createNode(),i=(this.expectKeyword("continue"),null);return 3!==this.lookahead.type||this.hasLineTerminator||(t="$"+(i=e=this.parseVariableIdentifier()).name,Object.prototype.hasOwnProperty.call(this.context.labelSet,t))||this.throwError(f.Messages.UnknownLabel,e.name),this.consumeSemicolon(),null!==i||this.context.inIteration||this.throwError(f.Messages.IllegalContinue),this.finalize(r,new m.ContinueStatement(i))},a.prototype.parseBreakStatement=function(){var e,t,r=this.createNode(),i=(this.expectKeyword("break"),null);return 3!==this.lookahead.type||this.hasLineTerminator||(t="$"+(e=this.parseVariableIdentifier()).name,Object.prototype.hasOwnProperty.call(this.context.labelSet,t)||this.throwError(f.Messages.UnknownLabel,e.name),i=e),this.consumeSemicolon(),null!==i||this.context.inIteration||this.context.inSwitch||this.throwError(f.Messages.IllegalBreak),this.finalize(r,new m.BreakStatement(i))},a.prototype.parseReturnStatement=function(){this.context.inFunctionBody||this.tolerateError(f.Messages.IllegalReturn);var e=this.createNode();this.expectKeyword("return");var t=!this.match(";")&&!this.match("}")&&!this.hasLineTerminator&&2!==this.lookahead.type||8===this.lookahead.type||10===this.lookahead.type?this.parseExpression():null;return this.consumeSemicolon(),this.finalize(e,new m.ReturnStatement(t))},a.prototype.parseWithStatement=function(){this.context.strict&&this.tolerateError(f.Messages.StrictModeWith);var e=this.createNode(),t=(this.expectKeyword("with"),this.expect("("),this.parseExpression()),r=!this.match(")")&&this.config.tolerant?(this.tolerateUnexpectedToken(this.nextToken()),this.finalize(this.createNode(),new m.EmptyStatement)):(this.expect(")"),this.parseStatement());return this.finalize(e,new m.WithStatement(t,r))},a.prototype.parseSwitchCase=function(){var e=this.createNode(),t=this.matchKeyword("default")?(this.nextToken(),null):(this.expectKeyword("case"),this.parseExpression());this.expect(":");for(var r=[];!(this.match("}")||this.matchKeyword("default")||this.matchKeyword("case"));)r.push(this.parseStatementListItem());return this.finalize(e,new m.SwitchCase(t,r))},a.prototype.parseSwitchStatement=function(){var e=this.createNode(),t=(this.expectKeyword("switch"),this.expect("("),this.parseExpression()),r=(this.expect(")"),this.context.inSwitch),i=[],n=!(this.context.inSwitch=!0);for(this.expect("{");;){if(this.match("}"))break;var s=this.parseSwitchCase();null===s.test&&(n&&this.throwError(f.Messages.MultipleDefaultsInSwitch),n=!0),i.push(s)}return this.expect("}"),this.context.inSwitch=r,this.finalize(e,new m.SwitchStatement(t,i))},a.prototype.parseLabelledStatement=function(){var e,t,r,i,n=this.createNode(),s=this.parseExpression(),o=s.type===p.Syntax.Identifier&&this.match(":")?(this.nextToken(),t="$"+(e=s).name,Object.prototype.hasOwnProperty.call(this.context.labelSet,t)&&this.throwError(f.Messages.Redeclaration,"Label",e.name),i=void(this.context.labelSet[t]=!0),i=this.matchKeyword("class")?(this.tolerateUnexpectedToken(this.lookahead),this.parseClassDeclaration()):this.matchKeyword("function")?(o=this.lookahead,r=this.parseFunctionDeclaration(),this.context.strict?this.tolerateUnexpectedToken(o,f.Messages.StrictFunction):r.generator&&this.tolerateUnexpectedToken(o,f.Messages.GeneratorInLegacyContext),r):this.parseStatement(),delete this.context.labelSet[t],new m.LabeledStatement(e,i)):(this.consumeSemicolon(),new m.ExpressionStatement(s));return this.finalize(n,o)},a.prototype.parseThrowStatement=function(){var e=this.createNode(),t=(this.expectKeyword("throw"),this.hasLineTerminator&&this.throwError(f.Messages.NewlineAfterThrow),this.parseExpression());return this.consumeSemicolon(),this.finalize(e,new m.ThrowStatement(t))},a.prototype.parseCatchClause=function(){for(var e=this.createNode(),t=(this.expectKeyword("catch"),this.expect("("),this.match(")")&&this.throwUnexpectedToken(this.lookahead),[]),r=this.parsePattern(t),i={},n=0;n<t.length;n++){var s="$"+t[n].value;Object.prototype.hasOwnProperty.call(i,s)&&this.tolerateError(f.Messages.DuplicateBinding,t[n].value),i[s]=!0}this.context.strict&&r.type===p.Syntax.Identifier&&this.scanner.isRestrictedWord(r.name)&&this.tolerateError(f.Messages.StrictCatchVariable),this.expect(")");var o=this.parseBlock();return this.finalize(e,new m.CatchClause(r,o))},a.prototype.parseFinallyClause=function(){return this.expectKeyword("finally"),this.parseBlock()},a.prototype.parseTryStatement=function(){var e=this.createNode(),t=(this.expectKeyword("try"),this.parseBlock()),r=this.matchKeyword("catch")?this.parseCatchClause():null,i=this.matchKeyword("finally")?this.parseFinallyClause():null;return r||i||this.throwError(f.Messages.NoCatchOrFinally),this.finalize(e,new m.TryStatement(t,r,i))},a.prototype.parseDebuggerStatement=function(){var e=this.createNode();return this.expectKeyword("debugger"),this.consumeSemicolon(),this.finalize(e,new m.DebuggerStatement)},a.prototype.parseStatement=function(){switch(this.lookahead.type){case 1:case 5:case 6:case 8:case 10:case 9:t=this.parseExpressionStatement();break;case 7:var e=this.lookahead.value,t="{"===e?this.parseBlock():"("!==e&&";"===e?this.parseEmptyStatement():this.parseExpressionStatement();break;case 3:t=this.matchAsyncFunction()?this.parseFunctionDeclaration():this.parseLabelledStatement();break;case 4:switch(this.lookahead.value){case"break":t=this.parseBreakStatement();break;case"continue":t=this.parseContinueStatement();break;case"debugger":t=this.parseDebuggerStatement();break;case"do":t=this.parseDoWhileStatement();break;case"for":t=this.parseForStatement();break;case"function":t=this.parseFunctionDeclaration();break;case"if":t=this.parseIfStatement();break;case"return":t=this.parseReturnStatement();break;case"switch":t=this.parseSwitchStatement();break;case"throw":t=this.parseThrowStatement();break;case"try":t=this.parseTryStatement();break;case"var":t=this.parseVariableStatement();break;case"while":t=this.parseWhileStatement();break;case"with":t=this.parseWithStatement();break;default:t=this.parseExpressionStatement()}break;default:t=this.throwUnexpectedToken(this.lookahead)}return t},a.prototype.parseFunctionSourceElements=function(){var e=this.createNode(),t=(this.expect("{"),this.parseDirectivePrologues()),r=this.context.labelSet,i=this.context.inIteration,n=this.context.inSwitch,s=this.context.inFunctionBody;for(this.context.labelSet={},this.context.inIteration=!1,this.context.inSwitch=!1,this.context.inFunctionBody=!0;2!==this.lookahead.type&&!this.match("}");)t.push(this.parseStatementListItem());return this.expect("}"),this.context.labelSet=r,this.context.inIteration=i,this.context.inSwitch=n,this.context.inFunctionBody=s,this.finalize(e,new m.BlockStatement(t))},a.prototype.validateParam=function(e,t,r){var i="$"+r;this.context.strict?(this.scanner.isRestrictedWord(r)&&(e.stricted=t,e.message=f.Messages.StrictParamName),Object.prototype.hasOwnProperty.call(e.paramSet,i)&&(e.stricted=t,e.message=f.Messages.StrictParamDupe)):e.firstRestricted||(this.scanner.isRestrictedWord(r)?(e.firstRestricted=t,e.message=f.Messages.StrictParamName):this.scanner.isStrictModeReservedWord(r)?(e.firstRestricted=t,e.message=f.Messages.StrictReservedWord):Object.prototype.hasOwnProperty.call(e.paramSet,i)&&(e.stricted=t,e.message=f.Messages.StrictParamDupe)),"function"==typeof Object.defineProperty?Object.defineProperty(e.paramSet,i,{value:!0,enumerable:!0,writable:!0,configurable:!0}):e.paramSet[i]=!0},a.prototype.parseRestElement=function(e){var t=this.createNode(),e=(this.expect("..."),this.parsePattern(e));return this.match("=")&&this.throwError(f.Messages.DefaultRestParameter),this.match(")")||this.throwError(f.Messages.ParameterAfterRestParameter),this.finalize(t,new m.RestElement(e))},a.prototype.parseFormalParameter=function(e){for(var t=[],r=this.match("...")?this.parseRestElement(t):this.parsePatternWithDefault(t),i=0;i<t.length;i++)this.validateParam(e,t[i],t[i].value);e.simple=e.simple&&r instanceof m.Identifier,e.params.push(r)},a.prototype.parseFormalParameters=function(e){var t={simple:!0,params:[],firstRestricted:e};if(this.expect("("),!this.match(")"))for(t.paramSet={};2!==this.lookahead.type&&(this.parseFormalParameter(t),!this.match(")"))&&(this.expect(","),!this.match(")")););return this.expect(")"),{simple:t.simple,params:t.params,stricted:t.stricted,firstRestricted:t.firstRestricted,message:t.message}},a.prototype.matchAsyncFunction=function(){var e,t,r=this.matchContextualKeyword("async");return r&&(e=this.scanner.saveState(),this.scanner.scanComments(),t=this.scanner.lex(),this.scanner.restoreState(e),r=e.lineNumber===t.lineNumber&&4===t.type&&"function"===t.value),r},a.prototype.parseFunctionDeclaration=function(e){var t,r=this.createNode(),i=this.matchContextualKeyword("async"),n=(i&&this.nextToken(),this.expectKeyword("function"),!i&&this.match("*")),s=(n&&this.nextToken(),null),o=null,e=(e&&this.match("(")||(e=this.lookahead,s=this.parseVariableIdentifier(),this.context.strict?this.scanner.isRestrictedWord(e.value)&&this.tolerateUnexpectedToken(e,f.Messages.StrictFunctionName):this.scanner.isRestrictedWord(e.value)?(o=e,t=f.Messages.StrictFunctionName):this.scanner.isStrictModeReservedWord(e.value)&&(o=e,t=f.Messages.StrictReservedWord)),this.context.await),a=this.context.allowYield,c=(this.context.await=i,this.context.allowYield=!n,this.parseFormalParameters(o)),u=c.params,h=c.stricted,o=c.firstRestricted,l=(c.message&&(t=c.message),this.context.strict),p=this.context.allowStrictDirective,c=(this.context.allowStrictDirective=c.simple,this.parseFunctionSourceElements());return this.context.strict&&o&&this.throwUnexpectedToken(o,t),this.context.strict&&h&&this.tolerateUnexpectedToken(h,t),this.context.strict=l,this.context.allowStrictDirective=p,this.context.await=e,this.context.allowYield=a,i?this.finalize(r,new m.AsyncFunctionDeclaration(s,u,c)):this.finalize(r,new m.FunctionDeclaration(s,u,c,n))},a.prototype.parseFunctionExpression=function(){var e,t=this.createNode(),r=this.matchContextualKeyword("async"),i=(r&&this.nextToken(),this.expectKeyword("function"),!r&&this.match("*")),n=(i&&this.nextToken(),null),s=this.context.await,o=this.context.allowYield,a=(this.context.await=r,this.context.allowYield=!i,this.match("(")||(a=this.lookahead,n=this.context.strict||i||!this.matchKeyword("yield")?this.parseVariableIdentifier():this.parseIdentifierName(),this.context.strict?this.scanner.isRestrictedWord(a.value)&&this.tolerateUnexpectedToken(a,f.Messages.StrictFunctionName):this.scanner.isRestrictedWord(a.value)?(h=a,e=f.Messages.StrictFunctionName):this.scanner.isStrictModeReservedWord(a.value)&&(h=a,e=f.Messages.StrictReservedWord)),this.parseFormalParameters(h)),c=a.params,u=a.stricted,h=a.firstRestricted,l=(a.message&&(e=a.message),this.context.strict),p=this.context.allowStrictDirective,a=(this.context.allowStrictDirective=a.simple,this.parseFunctionSourceElements());return this.context.strict&&h&&this.throwUnexpectedToken(h,e),this.context.strict&&u&&this.tolerateUnexpectedToken(u,e),this.context.strict=l,this.context.allowStrictDirective=p,this.context.await=s,this.context.allowYield=o,r?this.finalize(t,new m.AsyncFunctionExpression(n,c,a)):this.finalize(t,new m.FunctionExpression(n,c,a,i))},a.prototype.parseDirective=function(){var e=this.lookahead,t=this.createNode(),r=this.parseExpression(),e=r.type===p.Syntax.Literal?this.getTokenRaw(e).slice(1,-1):null;return this.consumeSemicolon(),this.finalize(t,e?new m.Directive(r,e):new m.ExpressionStatement(r))},a.prototype.parseDirectivePrologues=function(){for(var e=null,t=[];;){var r=this.lookahead;if(8!==r.type)break;var i=this.parseDirective(),i=(t.push(i),i.directive);if("string"!=typeof i)break;"use strict"===i?(this.context.strict=!0,e&&this.tolerateUnexpectedToken(e,f.Messages.StrictOctalLiteral),this.context.allowStrictDirective||this.tolerateUnexpectedToken(r,f.Messages.IllegalLanguageModeDirective)):!e&&r.octal&&(e=r)}return t},a.prototype.qualifiedPropertyName=function(e){switch(e.type){case 3:case 8:case 1:case 5:case 6:case 4:return!0;case 7:return"["===e.value}return!1},a.prototype.parseGetterMethod=function(){var e=this.createNode(),t=this.context.allowYield,r=(this.context.allowYield=!0,this.parseFormalParameters()),i=(0<r.params.length&&this.tolerateError(f.Messages.BadGetterArity),this.parsePropertyMethod(r));return this.context.allowYield=t,this.finalize(e,new m.FunctionExpression(null,r.params,i,!1))},a.prototype.parseSetterMethod=function(){var e=this.createNode(),t=this.context.allowYield,r=(this.context.allowYield=!0,this.parseFormalParameters()),i=(1!==r.params.length?this.tolerateError(f.Messages.BadSetterArity):r.params[0]instanceof m.RestElement&&this.tolerateError(f.Messages.BadSetterRestParameter),this.parsePropertyMethod(r));return this.context.allowYield=t,this.finalize(e,new m.FunctionExpression(null,r.params,i,!1))},a.prototype.parseGeneratorMethod=function(){var e=this.createNode(),t=this.context.allowYield,r=(this.context.allowYield=!0,this.parseFormalParameters()),i=(this.context.allowYield=!1,this.parsePropertyMethod(r));return this.context.allowYield=t,this.finalize(e,new m.FunctionExpression(null,r.params,i,!0))},a.prototype.isStartOfExpression=function(){var e=!0,t=this.lookahead.value;switch(this.lookahead.type){case 7:e="["===t||"("===t||"{"===t||"+"===t||"-"===t||"!"===t||"~"===t||"++"===t||"--"===t||"/"===t||"/="===t;break;case 4:e="class"===t||"delete"===t||"function"===t||"let"===t||"new"===t||"super"===t||"this"===t||"typeof"===t||"void"===t||"yield"===t}return e},a.prototype.parseYieldExpression=function(){var e,t=this.createNode(),r=(this.expectKeyword("yield"),null),i=!1;return this.hasLineTerminator||(e=this.context.allowYield,this.context.allowYield=!1,(i=this.match("*"))?(this.nextToken(),r=this.parseAssignmentExpression()):this.isStartOfExpression()&&(r=this.parseAssignmentExpression()),this.context.allowYield=e),this.finalize(t,new m.YieldExpression(r,i))},a.prototype.parseClassElement=function(e){var t=this.lookahead,r=this.createNode(),i="",n=null,s=null,o=!1,a=!1,c=!1,u=!1,h=(this.match("*")?this.nextToken():(o=this.match("["),"static"===(n=this.parseObjectPropertyKey()).name&&(this.qualifiedPropertyName(this.lookahead)||this.match("*"))&&(t=this.lookahead,c=!0,o=this.match("["),this.match("*")?this.nextToken():n=this.parseObjectPropertyKey()),3!==t.type||this.hasLineTerminator||"async"!==t.value||":"!==(h=this.lookahead.value)&&"("!==h&&"*"!==h&&(u=!0,t=this.lookahead,n=this.parseObjectPropertyKey(),3===t.type)&&"constructor"===t.value&&this.tolerateUnexpectedToken(t,f.Messages.ConstructorIsAsync)),this.qualifiedPropertyName(this.lookahead));return 3===t.type?"get"===t.value&&h?(i="get",o=this.match("["),n=this.parseObjectPropertyKey(),this.context.allowYield=!1,s=this.parseGetterMethod()):"set"===t.value&&h&&(i="set",o=this.match("["),n=this.parseObjectPropertyKey(),s=this.parseSetterMethod()):7===t.type&&"*"===t.value&&h&&(i="init",o=this.match("["),n=this.parseObjectPropertyKey(),s=this.parseGeneratorMethod(),a=!0),!i&&n&&this.match("(")&&(i="init",s=u?this.parsePropertyMethodAsyncFunction():this.parsePropertyMethodFunction(),a=!0),i||this.throwUnexpectedToken(this.lookahead),"init"===i&&(i="method"),o||(c&&this.isPropertyKey(n,"prototype")&&this.throwUnexpectedToken(t,f.Messages.StaticPrototype),!c&&this.isPropertyKey(n,"constructor")&&(("method"!==i||!a||s&&s.generator)&&this.throwUnexpectedToken(t,f.Messages.ConstructorSpecialMethod),e.value?this.throwUnexpectedToken(t,f.Messages.DuplicateConstructor):e.value=!0,i="constructor")),this.finalize(r,new m.MethodDefinition(n,o,s,i,c))},a.prototype.parseClassElementList=function(){var e=[],t={value:!1};for(this.expect("{");!this.match("}");)this.match(";")?this.nextToken():e.push(this.parseClassElement(t));return this.expect("}"),e},a.prototype.parseClassBody=function(){var e=this.createNode(),t=this.parseClassElementList();return this.finalize(e,new m.ClassBody(t))},a.prototype.parseClassDeclaration=function(e){var t=this.createNode(),r=this.context.strict,e=(this.context.strict=!0,this.expectKeyword("class"),e&&3!==this.lookahead.type?null:this.parseVariableIdentifier()),i=null,n=(this.matchKeyword("extends")&&(this.nextToken(),i=this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall)),this.parseClassBody());return this.context.strict=r,this.finalize(t,new m.ClassDeclaration(e,i,n))},a.prototype.parseClassExpression=function(){var e=this.createNode(),t=this.context.strict,r=(this.context.strict=!0,this.expectKeyword("class"),3===this.lookahead.type?this.parseVariableIdentifier():null),i=null,n=(this.matchKeyword("extends")&&(this.nextToken(),i=this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall)),this.parseClassBody());return this.context.strict=t,this.finalize(e,new m.ClassExpression(r,i,n))},a.prototype.parseModule=function(){this.context.strict=!0,this.context.isModule=!0,this.scanner.isModule=!0;for(var e=this.createNode(),t=this.parseDirectivePrologues();2!==this.lookahead.type;)t.push(this.parseStatementListItem());return this.finalize(e,new m.Module(t))},a.prototype.parseScript=function(){for(var e=this.createNode(),t=this.parseDirectivePrologues();2!==this.lookahead.type;)t.push(this.parseStatementListItem());return this.finalize(e,new m.Script(t))},a.prototype.parseModuleSpecifier=function(){var e=this.createNode(),t=(8!==this.lookahead.type&&this.throwError(f.Messages.InvalidModuleSpecifier),this.nextToken()),r=this.getTokenRaw(t);return this.finalize(e,new m.Literal(t.value,r))},a.prototype.parseImportSpecifier=function(){var e,t,r=this.createNode();return 3===this.lookahead.type?(t=e=this.parseVariableIdentifier(),this.matchContextualKeyword("as")&&(this.nextToken(),t=this.parseVariableIdentifier())):(t=e=this.parseIdentifierName(),this.matchContextualKeyword("as")?(this.nextToken(),t=this.parseVariableIdentifier()):this.throwUnexpectedToken(this.nextToken())),this.finalize(r,new m.ImportSpecifier(t,e))},a.prototype.parseNamedImports=function(){this.expect("{");for(var e=[];!this.match("}");)e.push(this.parseImportSpecifier()),this.match("}")||this.expect(",");return this.expect("}"),e},a.prototype.parseImportDefaultSpecifier=function(){var e=this.createNode(),t=this.parseIdentifierName();return this.finalize(e,new m.ImportDefaultSpecifier(t))},a.prototype.parseImportNamespaceSpecifier=function(){var e=this.createNode(),t=(this.expect("*"),this.matchContextualKeyword("as")||this.throwError(f.Messages.NoAsAfterImportNamespace),this.nextToken(),this.parseIdentifierName());return this.finalize(e,new m.ImportNamespaceSpecifier(t))},a.prototype.parseImportDeclaration=function(){this.context.inFunctionBody&&this.throwError(f.Messages.IllegalImportDeclaration);var e=this.createNode(),t=(this.expectKeyword("import"),[]),r=(8===this.lookahead.type||(this.match("{")?t=t.concat(this.parseNamedImports()):this.match("*")?t.push(this.parseImportNamespaceSpecifier()):this.isIdentifierName(this.lookahead)&&!this.matchKeyword("default")?(t.push(this.parseImportDefaultSpecifier()),this.match(",")&&(this.nextToken(),this.match("*")?t.push(this.parseImportNamespaceSpecifier()):this.match("{")?t=t.concat(this.parseNamedImports()):this.throwUnexpectedToken(this.lookahead))):this.throwUnexpectedToken(this.nextToken()),this.matchContextualKeyword("from")||(r=this.lookahead.value?f.Messages.UnexpectedToken:f.Messages.MissingFromClause,this.throwError(r,this.lookahead.value)),this.nextToken()),this.parseModuleSpecifier());return this.consumeSemicolon(),this.finalize(e,new m.ImportDeclaration(t,r))},a.prototype.parseExportSpecifier=function(){var e=this.createNode(),t=this.parseIdentifierName(),r=t;return this.matchContextualKeyword("as")&&(this.nextToken(),r=this.parseIdentifierName()),this.finalize(e,new m.ExportSpecifier(t,r))},a.prototype.parseExportDeclaration=function(){this.context.inFunctionBody&&this.throwError(f.Messages.IllegalExportDeclaration);var e,t=this.createNode();if(this.expectKeyword("export"),this.matchKeyword("default"))this.nextToken(),e=(this.matchKeyword("function")?i=this.parseFunctionDeclaration(!0):this.matchKeyword("class")?i=this.parseClassDeclaration(!0):this.matchContextualKeyword("async")?i=this.matchAsyncFunction()?this.parseFunctionDeclaration(!0):this.parseAssignmentExpression():(this.matchContextualKeyword("from")&&this.throwError(f.Messages.UnexpectedToken,this.lookahead.value),i=this.match("{")?this.parseObjectInitializer():this.match("[")?this.parseArrayInitializer():this.parseAssignmentExpression(),this.consumeSemicolon()),this.finalize(t,new m.ExportDefaultDeclaration(i)));else if(this.match("*")){this.nextToken(),this.matchContextualKeyword("from")||(n=this.lookahead.value?f.Messages.UnexpectedToken:f.Messages.MissingFromClause,this.throwError(n,this.lookahead.value)),this.nextToken();var r=this.parseModuleSpecifier();this.consumeSemicolon(),e=this.finalize(t,new m.ExportAllDeclaration(r))}else if(4===this.lookahead.type){var i=void 0;switch(this.lookahead.value){case"let":case"const":i=this.parseLexicalDeclaration({inFor:!1});break;case"var":case"class":case"function":i=this.parseStatementListItem();break;default:this.throwUnexpectedToken(this.lookahead)}e=this.finalize(t,new m.ExportNamedDeclaration(i,[],null))}else if(this.matchAsyncFunction()){i=this.parseFunctionDeclaration();e=this.finalize(t,new m.ExportNamedDeclaration(i,[],null))}else{var n,s=[],r=null,o=!1;for(this.expect("{");!this.match("}");)o=o||this.matchKeyword("default"),s.push(this.parseExportSpecifier()),this.match("}")||this.expect(",");this.expect("}"),this.matchContextualKeyword("from")?(this.nextToken(),r=this.parseModuleSpecifier(),this.consumeSemicolon()):o?(n=this.lookahead.value?f.Messages.UnexpectedToken:f.Messages.MissingFromClause,this.throwError(n,this.lookahead.value)):this.consumeSemicolon(),e=this.finalize(t,new m.ExportNamedDeclaration(null,s,r))}return e},t.Parser=a},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.assert=function(e,t){if(!e)throw new Error("ASSERT: "+t)}},function(e,t){function r(){this.errors=[],this.tolerant=!1}Object.defineProperty(t,"__esModule",{value:!0}),r.prototype.recordError=function(e){this.errors.push(e)},r.prototype.tolerate=function(e){if(!this.tolerant)throw e;this.recordError(e)},r.prototype.constructError=function(t,r){t=new Error(t);try{throw t}catch(e){Object.create&&Object.defineProperty&&(t=Object.create(e),Object.defineProperty(t,"column",{value:r}))}return t},r.prototype.createError=function(e,t,r,i){r=this.constructError("Line "+t+": "+i,r);return r.index=e,r.lineNumber=t,r.description=i,r},r.prototype.throwError=function(e,t,r,i){throw this.createError(e,t,r,i)},r.prototype.tolerateError=function(e,t,r,i){e=this.createError(e,t,r,i);if(!this.tolerant)throw e;this.recordError(e)},t.ErrorHandler=r},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Messages={BadGetterArity:"Getter must not have any formal parameters",BadSetterArity:"Setter must have exactly one formal parameter",BadSetterRestParameter:"Setter function argument must not be a rest parameter",ConstructorIsAsync:"Class constructor may not be an async method",ConstructorSpecialMethod:"Class constructor may not be an accessor",DeclarationMissingInitializer:"Missing initializer in %0 declaration",DefaultRestParameter:"Unexpected token =",DuplicateBinding:"Duplicate binding %0",DuplicateConstructor:"A class may only have one constructor",DuplicateProtoProperty:"Duplicate __proto__ fields are not allowed in object literals",ForInOfLoopInitializer:"%0 loop variable declaration may not have an initializer",GeneratorInLegacyContext:"Generator declarations are not allowed in legacy contexts",IllegalBreak:"Illegal break statement",IllegalContinue:"Illegal continue statement",IllegalExportDeclaration:"Unexpected token",IllegalImportDeclaration:"Unexpected token",IllegalLanguageModeDirective:"Illegal 'use strict' directive in function with non-simple parameter list",IllegalReturn:"Illegal return statement",InvalidEscapedReservedWord:"Keyword must not contain escaped characters",InvalidHexEscapeSequence:"Invalid hexadecimal escape sequence",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",InvalidLHSInForLoop:"Invalid left-hand side in for-loop",InvalidModuleSpecifier:"Unexpected token",InvalidRegExp:"Invalid regular expression",LetInLexicalBinding:"let is disallowed as a lexically bound name",MissingFromClause:"Unexpected token",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NewlineAfterThrow:"Illegal newline after throw",NoAsAfterImportNamespace:"Unexpected token",NoCatchOrFinally:"Missing catch or finally after try",ParameterAfterRestParameter:"Rest parameter must be last formal parameter",Redeclaration:"%0 '%1' has already been declared",StaticPrototype:"Classes may not have static property named prototype",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictDelete:"Delete of an unqualified identifier in strict mode.",StrictFunction:"In strict mode code, functions can only be declared at top level or inside a block",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode",StrictModeWith:"Strict mode code may not include a with statement",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode",StrictReservedWord:"Use of future reserved word in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",TemplateOctalLiteral:"Octal literals are not allowed in template strings.",UnexpectedEOS:"Unexpected end of input",UnexpectedIdentifier:"Unexpected identifier",UnexpectedNumber:"Unexpected number",UnexpectedReserved:"Unexpected reserved word",UnexpectedString:"Unexpected string",UnexpectedTemplate:"Unexpected quasi %0",UnexpectedToken:"Unexpected token %0",UnexpectedTokenIllegal:"Unexpected token ILLEGAL",UnknownLabel:"Undefined label '%0'",UnterminatedRegExp:"Invalid regular expression: missing /"}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var a=r(9),u=r(4),h=r(11);function n(e){return"0123456789abcdef".indexOf(e.toLowerCase())}function i(e){return"01234567".indexOf(e)}function s(e,t){this.source=e,this.errorHandler=t,this.trackComment=!1,this.isModule=!1,this.length=e.length,this.index=0,this.lineNumber=0<e.length?1:0,this.lineStart=0,this.curlyStack=[]}s.prototype.saveState=function(){return{index:this.index,lineNumber:this.lineNumber,lineStart:this.lineStart}},s.prototype.restoreState=function(e){this.index=e.index,this.lineNumber=e.lineNumber,this.lineStart=e.lineStart},s.prototype.eof=function(){return this.index>=this.length},s.prototype.throwUnexpectedToken=function(e){return void 0===e&&(e=h.Messages.UnexpectedTokenIllegal),this.errorHandler.throwError(this.index,this.lineNumber,this.index-this.lineStart+1,e)},s.prototype.tolerateUnexpectedToken=function(e){void 0===e&&(e=h.Messages.UnexpectedTokenIllegal),this.errorHandler.tolerateError(this.index,this.lineNumber,this.index-this.lineStart+1,e)},s.prototype.skipSingleLineComment=function(e){var t,r,i=[];for(this.trackComment&&(i=[],t=this.index-e,r={start:{line:this.lineNumber,column:this.index-this.lineStart-e},end:{}});!this.eof();){var n,s=this.source.charCodeAt(this.index);if(++this.index,u.Character.isLineTerminator(s))return this.trackComment&&(n={multiLine:!(r.end={line:this.lineNumber,column:this.index-this.lineStart-1}),slice:[t+e,this.index-1],range:[t,this.index-1],loc:r},i.push(n)),13===s&&10===this.source.charCodeAt(this.index)&&++this.index,++this.lineNumber,this.lineStart=this.index,i}return this.trackComment&&(n={multiLine:!(r.end={line:this.lineNumber,column:this.index-this.lineStart}),slice:[t+e,this.index],range:[t,this.index],loc:r},i.push(n)),i},s.prototype.skipMultiLineComment=function(){var e,t,r=[];for(this.trackComment&&(r=[],e=this.index-2,t={start:{line:this.lineNumber,column:this.index-this.lineStart-2},end:{}});!this.eof();){var i,n=this.source.charCodeAt(this.index);if(u.Character.isLineTerminator(n))13===n&&10===this.source.charCodeAt(this.index+1)&&++this.index,++this.lineNumber,++this.index,this.lineStart=this.index;else{if(42===n&&47===this.source.charCodeAt(this.index+1))return this.index+=2,this.trackComment&&(t.end={line:this.lineNumber,column:this.index-this.lineStart},i={multiLine:!0,slice:[e+2,this.index-2],range:[e,this.index],loc:t},r.push(i)),r;++this.index}}return this.trackComment&&(t.end={line:this.lineNumber,column:this.index-this.lineStart},i={multiLine:!0,slice:[e+2,this.index],range:[e,this.index],loc:t},r.push(i)),this.tolerateUnexpectedToken(),r},s.prototype.scanComments=function(){this.trackComment&&(e=[]);for(var e,t=0===this.index;!this.eof();){var r=this.source.charCodeAt(this.index);if(u.Character.isWhiteSpace(r))++this.index;else if(u.Character.isLineTerminator(r))++this.index,13===r&&10===this.source.charCodeAt(this.index)&&++this.index,++this.lineNumber,this.lineStart=this.index,t=!0;else if(47===r)if(47===(r=this.source.charCodeAt(this.index+1))){this.index+=2;var i=this.skipSingleLineComment(2);this.trackComment&&(e=e.concat(i)),t=!0}else{if(42!==r)break;this.index+=2;i=this.skipMultiLineComment();this.trackComment&&(e=e.concat(i))}else{if(t&&45===r){if(45!==this.source.charCodeAt(this.index+1)||62!==this.source.charCodeAt(this.index+2))break;this.index+=3;i=this.skipSingleLineComment(3)}else{if(60!==r||this.isModule)break;if("!--"!==this.source.slice(this.index+1,this.index+4))break;this.index+=4;i=this.skipSingleLineComment(4)}this.trackComment&&(e=e.concat(i))}}return e},s.prototype.isFutureReservedWord=function(e){switch(e){case"enum":case"export":case"import":case"super":return!0;default:return!1}},s.prototype.isStrictModeReservedWord=function(e){switch(e){case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0;default:return!1}},s.prototype.isRestrictedWord=function(e){return"eval"===e||"arguments"===e},s.prototype.isKeyword=function(e){switch(e.length){case 2:return"if"===e||"in"===e||"do"===e;case 3:return"var"===e||"for"===e||"new"===e||"try"===e||"let"===e;case 4:return"this"===e||"else"===e||"case"===e||"void"===e||"with"===e||"enum"===e;case 5:return"while"===e||"break"===e||"catch"===e||"throw"===e||"const"===e||"yield"===e||"class"===e||"super"===e;case 6:return"return"===e||"typeof"===e||"delete"===e||"switch"===e||"export"===e||"import"===e;case 7:return"default"===e||"finally"===e||"extends"===e;case 8:return"function"===e||"continue"===e||"debugger"===e;case 10:return"instanceof"===e;default:return!1}},s.prototype.codePointAt=function(e){var t=this.source.charCodeAt(e);return t=55296<=t&&t<=56319&&56320<=(e=this.source.charCodeAt(e+1))&&e<=57343?1024*(t-55296)+e-56320+65536:t},s.prototype.scanHexEscape=function(e){for(var t="u"===e?4:2,r=0,i=0;i<t;++i){if(this.eof()||!u.Character.isHexDigit(this.source.charCodeAt(this.index)))return null;r=16*r+n(this.source[this.index++])}return String.fromCharCode(r)},s.prototype.scanUnicodeCodePointEscape=function(){var e=this.source[this.index],t=0;for("}"===e&&this.throwUnexpectedToken();!this.eof()&&(e=this.source[this.index++],u.Character.isHexDigit(e.charCodeAt(0)));)t=16*t+n(e);return(1114111<t||"}"!==e)&&this.throwUnexpectedToken(),u.Character.fromCodePoint(t)},s.prototype.getIdentifier=function(){for(var e=this.index++;!this.eof();){var t=this.source.charCodeAt(this.index);if(92===t)return this.index=e,this.getComplexIdentifier();if(55296<=t&&t<57343)return this.index=e,this.getComplexIdentifier();if(!u.Character.isIdentifierPart(t))break;++this.index}return this.source.slice(e,this.index)},s.prototype.getComplexIdentifier=function(){var e,t=this.codePointAt(this.index),r=u.Character.fromCodePoint(t);for(this.index+=r.length,92===t&&(117!==this.source.charCodeAt(this.index)&&this.throwUnexpectedToken(),++this.index,"{"===this.source[this.index]?(++this.index,e=this.scanUnicodeCodePointEscape()):null!==(e=this.scanHexEscape("u"))&&"\\"!==e&&u.Character.isIdentifierStart(e.charCodeAt(0))||this.throwUnexpectedToken(),r=e);!this.eof()&&(t=this.codePointAt(this.index),u.Character.isIdentifierPart(t));)r+=e=u.Character.fromCodePoint(t),this.index+=e.length,92===t&&(r=r.substr(0,r.length-1),117!==this.source.charCodeAt(this.index)&&this.throwUnexpectedToken(),++this.index,"{"===this.source[this.index]?(++this.index,e=this.scanUnicodeCodePointEscape()):null!==(e=this.scanHexEscape("u"))&&"\\"!==e&&u.Character.isIdentifierPart(e.charCodeAt(0))||this.throwUnexpectedToken(),r+=e);return r},s.prototype.octalToDecimal=function(e){var t="0"!==e,r=i(e);return{code:r=!this.eof()&&u.Character.isOctalDigit(this.source.charCodeAt(this.index))&&(t=!0,r=8*r+i(this.source[this.index++]),0<="0123".indexOf(e))&&!this.eof()&&u.Character.isOctalDigit(this.source.charCodeAt(this.index))?8*r+i(this.source[this.index++]):r,octal:t}},s.prototype.scanIdentifier=function(){var e,t=this.index,r=92===this.source.charCodeAt(t)?this.getComplexIdentifier():this.getIdentifier(),i=1===r.length?3:this.isKeyword(r)?4:"null"===r?5:"true"===r||"false"===r?1:3;return 3!==i&&t+r.length!==this.index&&(e=this.index,this.index=t,this.tolerateUnexpectedToken(h.Messages.InvalidEscapedReservedWord),this.index=e),{type:i,value:r,lineNumber:this.lineNumber,lineStart:this.lineStart,start:t,end:this.index}},s.prototype.scanPunctuator=function(){var e=this.index,t=this.source[this.index];switch(t){case"(":case"{":"{"===t&&this.curlyStack.push("{"),++this.index;break;case".":++this.index,"."===this.source[this.index]&&"."===this.source[this.index+1]&&(this.index+=2,t="...");break;case"}":++this.index,this.curlyStack.pop();break;case")":case";":case",":case"[":case"]":case":":case"?":case"~":++this.index;break;default:">>>="===(t=this.source.substr(this.index,4))?this.index+=4:"==="===(t=t.substr(0,3))||"!=="===t||">>>"===t||"<<="===t||">>="===t||"**="===t?this.index+=3:"&&"===(t=t.substr(0,2))||"||"===t||"=="===t||"!="===t||"+="===t||"-="===t||"*="===t||"/="===t||"++"===t||"--"===t||"<<"===t||">>"===t||"&="===t||"|="===t||"^="===t||"%="===t||"<="===t||">="===t||"=>"===t||"**"===t?this.index+=2:(t=this.source[this.index],0<="<>=!+-*%&|^/".indexOf(t)&&++this.index)}return this.index===e&&this.throwUnexpectedToken(),{type:7,value:t,lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},s.prototype.scanHexLiteral=function(e){for(var t="";!this.eof()&&u.Character.isHexDigit(this.source.charCodeAt(this.index));)t+=this.source[this.index++];return 0===t.length&&this.throwUnexpectedToken(),u.Character.isIdentifierStart(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(),{type:6,value:parseInt("0x"+t,16),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},s.prototype.scanBinaryLiteral=function(e){for(var t,r="";!this.eof()&&("0"===(t=this.source[this.index])||"1"===t);)r+=this.source[this.index++];return 0===r.length&&this.throwUnexpectedToken(),!this.eof()&&(t=this.source.charCodeAt(this.index),u.Character.isIdentifierStart(t)||u.Character.isDecimalDigit(t))&&this.throwUnexpectedToken(),{type:6,value:parseInt(r,2),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},s.prototype.scanOctalLiteral=function(e,t){var r="",i=!1;for(u.Character.isOctalDigit(e.charCodeAt(0))?(i=!0,r="0"+this.source[this.index++]):++this.index;!this.eof()&&u.Character.isOctalDigit(this.source.charCodeAt(this.index));)r+=this.source[this.index++];return i||0!==r.length||this.throwUnexpectedToken(),(u.Character.isIdentifierStart(this.source.charCodeAt(this.index))||u.Character.isDecimalDigit(this.source.charCodeAt(this.index)))&&this.throwUnexpectedToken(),{type:6,value:parseInt(r,8),octal:i,lineNumber:this.lineNumber,lineStart:this.lineStart,start:t,end:this.index}},s.prototype.isImplicitOctalLiteral=function(){for(var e=this.index+1;e<this.length;++e){var t=this.source[e];if("8"===t||"9"===t)return!1;if(!u.Character.isOctalDigit(t.charCodeAt(0)))return!0}return!0},s.prototype.scanNumericLiteral=function(){var e=this.index,t=this.source[e],r=(a.assert(u.Character.isDecimalDigit(t.charCodeAt(0))||"."===t,"Numeric literal must start with a decimal digit or a decimal point"),"");if("."!==t){if(r=this.source[this.index++],t=this.source[this.index],"0"===r){if("x"===t||"X"===t)return++this.index,this.scanHexLiteral(e);if("b"===t||"B"===t)return++this.index,this.scanBinaryLiteral(e);if("o"===t||"O"===t)return this.scanOctalLiteral(t,e);if(t&&u.Character.isOctalDigit(t.charCodeAt(0))&&this.isImplicitOctalLiteral())return this.scanOctalLiteral(t,e)}for(;u.Character.isDecimalDigit(this.source.charCodeAt(this.index));)r+=this.source[this.index++];t=this.source[this.index]}if("."===t){for(r+=this.source[this.index++];u.Character.isDecimalDigit(this.source.charCodeAt(this.index));)r+=this.source[this.index++];t=this.source[this.index]}if("e"===t||"E"===t)if(r+=this.source[this.index++],"+"!==(t=this.source[this.index])&&"-"!==t||(r+=this.source[this.index++]),u.Character.isDecimalDigit(this.source.charCodeAt(this.index)))for(;u.Character.isDecimalDigit(this.source.charCodeAt(this.index));)r+=this.source[this.index++];else this.throwUnexpectedToken();return u.Character.isIdentifierStart(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(),{type:6,value:parseFloat(r),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},s.prototype.scanStringLiteral=function(){for(var e=this.index,t=this.source[e],r=(a.assert("'"===t||'"'===t,"String literal must starts with a quote"),++this.index,!1),i="";!this.eof();){var n,s=this.source[this.index++];if(s===t){t="";break}if("\\"===s)if((s=this.source[this.index++])&&u.Character.isLineTerminator(s.charCodeAt(0)))++this.lineNumber,"\r"===s&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index;else switch(s){case"u":"{"===this.source[this.index]?(++this.index,i+=this.scanUnicodeCodePointEscape()):(null===(o=this.scanHexEscape(s))&&this.throwUnexpectedToken(),i+=o);break;case"x":var o=this.scanHexEscape(s);null===o&&this.throwUnexpectedToken(h.Messages.InvalidHexEscapeSequence),i+=o;break;case"n":i+="\n";break;case"r":i+="\r";break;case"t":i+="\t";break;case"b":i+="\b";break;case"f":i+="\f";break;case"v":i+="\v";break;case"8":case"9":i+=s,this.tolerateUnexpectedToken();break;default:s&&u.Character.isOctalDigit(s.charCodeAt(0))?(r=(n=this.octalToDecimal(s)).octal||r,i+=String.fromCharCode(n.code)):i+=s}else{if(u.Character.isLineTerminator(s.charCodeAt(0)))break;i+=s}}return""!==t&&(this.index=e,this.throwUnexpectedToken()),{type:8,value:i,octal:r,lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},s.prototype.scanTemplate=function(){var e="",t=!1,r=this.index,i="`"===this.source[r],n=!1,s=2;for(++this.index;!this.eof();){var o,a=this.source[this.index++];if("`"===a){s=1,t=n=!0;break}if("$"===a){if("{"===this.source[this.index]){this.curlyStack.push("${"),++this.index,t=!0;break}e+=a}else if("\\"===a)if(a=this.source[this.index++],u.Character.isLineTerminator(a.charCodeAt(0)))++this.lineNumber,"\r"===a&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index;else switch(a){case"n":e+="\n";break;case"r":e+="\r";break;case"t":e+="\t";break;case"u":"{"===this.source[this.index]?(++this.index,e+=this.scanUnicodeCodePointEscape()):(o=this.index,null!==(c=this.scanHexEscape(a))?e+=c:(this.index=o,e+=a));break;case"x":var c=this.scanHexEscape(a);null===c&&this.throwUnexpectedToken(h.Messages.InvalidHexEscapeSequence),e+=c;break;case"b":e+="\b";break;case"f":e+="\f";break;case"v":e+="\v";break;default:"0"===a?(u.Character.isDecimalDigit(this.source.charCodeAt(this.index))&&this.throwUnexpectedToken(h.Messages.TemplateOctalLiteral),e+="\0"):u.Character.isOctalDigit(a.charCodeAt(0))?this.throwUnexpectedToken(h.Messages.TemplateOctalLiteral):e+=a}else u.Character.isLineTerminator(a.charCodeAt(0))?(++this.lineNumber,"\r"===a&&"\n"===this.source[this.index]&&++this.index,this.lineStart=this.index,e+="\n"):e+=a}return t||this.throwUnexpectedToken(),i||this.curlyStack.pop(),{type:10,value:this.source.slice(r+1,this.index-s),cooked:e,head:i,tail:n,lineNumber:this.lineNumber,lineStart:this.lineStart,start:r,end:this.index}},s.prototype.testRegExp=function(e,t){var r=e,i=this;0<=t.indexOf("u")&&(r=r.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g,function(e,t,r){t=parseInt(t||r,16);return 1114111<t&&i.throwUnexpectedToken(h.Messages.InvalidRegExp),t<=65535?String.fromCharCode(t):"￿"}).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"￿"));try{return new RegExp(e,t)}catch(e){return null}},s.prototype.scanRegExpBody=function(){for(var e=this.source[this.index],t=(a.assert("/"===e,"Regular expression literal must start with a slash"),this.source[this.index++]),r=!1,i=!1;!this.eof();)if(t+=e=this.source[this.index++],"\\"===e)e=this.source[this.index++],u.Character.isLineTerminator(e.charCodeAt(0))&&this.throwUnexpectedToken(h.Messages.UnterminatedRegExp),t+=e;else if(u.Character.isLineTerminator(e.charCodeAt(0)))this.throwUnexpectedToken(h.Messages.UnterminatedRegExp);else if(r)"]"===e&&(r=!1);else{if("/"===e){i=!0;break}"["===e&&(r=!0)}return i||this.throwUnexpectedToken(h.Messages.UnterminatedRegExp),t.substr(1,t.length-2)},s.prototype.scanRegExpFlags=function(){for(var e="";!this.eof();){var t=this.source[this.index];if(!u.Character.isIdentifierPart(t.charCodeAt(0)))break;if(++this.index,"\\"!==t||this.eof())e+=t,0;else{if("u"===(t=this.source[this.index])){++this.index;var r=this.index,t=this.scanHexEscape("u");if(null!==t)for(e+=t,0;r<this.index;++r)this.source[r];else this.index=r,e+="u",0}else 0;this.tolerateUnexpectedToken()}}return e},s.prototype.scanRegExp=function(){var e=this.index,t=this.scanRegExpBody(),r=this.scanRegExpFlags();return{type:9,value:"",pattern:t,flags:r,regex:this.testRegExp(t,r),lineNumber:this.lineNumber,lineStart:this.lineStart,start:e,end:this.index}},s.prototype.lex=function(){var e;return this.eof()?{type:2,value:"",lineNumber:this.lineNumber,lineStart:this.lineStart,start:this.index,end:this.index}:(e=this.source.charCodeAt(this.index),u.Character.isIdentifierStart(e)?this.scanIdentifier():40===e||41===e||59===e?this.scanPunctuator():39===e||34===e?this.scanStringLiteral():46===e?u.Character.isDecimalDigit(this.source.charCodeAt(this.index+1))?this.scanNumericLiteral():this.scanPunctuator():u.Character.isDecimalDigit(e)?this.scanNumericLiteral():96===e||125===e&&"${"===this.curlyStack[this.curlyStack.length-1]?this.scanTemplate():55296<=e&&e<57343&&u.Character.isIdentifierStart(this.codePointAt(this.index))?this.scanIdentifier():this.scanPunctuator())},t.Scanner=s},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.TokenName={},t.TokenName[1]="Boolean",t.TokenName[2]="<end>",t.TokenName[3]="Identifier",t.TokenName[4]="Keyword",t.TokenName[5]="Null",t.TokenName[6]="Numeric",t.TokenName[7]="Punctuator",t.TokenName[8]="String",t.TokenName[9]="RegularExpression",t.TokenName[10]="Template"},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.XHTMLEntities={quot:'"',amp:"&",apos:"'",gt:">",nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",times:"×",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",divide:"÷",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",fnof:"ƒ",circ:"ˆ",tilde:"˜",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",bull:"•",hellip:"…",permil:"‰",prime:"′",Prime:"″",lsaquo:"‹",rsaquo:"›",oline:"‾",frasl:"⁄",euro:"€",image:"ℑ",weierp:"℘",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪",int:"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦",lang:"⟨",rang:"⟩"}},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var i=r(10),n=r(12),a=r(13),s=(o.prototype.beforeFunctionExpression=function(e){return 0<=["(","{","[","in","typeof","instanceof","new","return","case","delete","throw","void","=","+=","-=","*=","**=","/=","%=","<<=",">>=",">>>=","&=","|=","^=",",","+","-","*","**","/","%","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","===","==",">=","<=","<",">","!=","!=="].indexOf(e)},o.prototype.isRegexStart=function(){var e,t=this.values[this.values.length-1],r=null!==t;switch(t){case"this":case"]":r=!1;break;case")":var i=this.values[this.paren-1],r="if"===i||"while"===i||"for"===i||"with"===i;break;case"}":r=!1,"function"===this.values[this.curly-3]?r=!!(e=this.values[this.curly-4])&&!this.beforeFunctionExpression(e):"function"===this.values[this.curly-4]&&(r=!(e=this.values[this.curly-5])||!this.beforeFunctionExpression(e))}return r},o.prototype.push=function(e){7===e.type||4===e.type?("{"===e.value?this.curly=this.values.length:"("===e.value&&(this.paren=this.values.length),this.values.push(e.value)):this.values.push(null)},o);function o(){this.values=[],this.curly=this.paren=-1}function c(e,t){this.errorHandler=new i.ErrorHandler,this.errorHandler.tolerant=!!t&&"boolean"==typeof t.tolerant&&t.tolerant,this.scanner=new n.Scanner(e,this.errorHandler),this.scanner.trackComment=!!t&&"boolean"==typeof t.comment&&t.comment,this.trackRange=!!t&&"boolean"==typeof t.range&&t.range,this.trackLoc=!!t&&"boolean"==typeof t.loc&&t.loc,this.buffer=[],this.reader=new s}c.prototype.errors=function(){return this.errorHandler.errors},c.prototype.getNextToken=function(){if(0===this.buffer.length){var e,t,r,i=this.scanner.scanComments();if(this.scanner.trackComment)for(var n=0;n<i.length;++n){var s=i[n],o=this.scanner.source.slice(s.slice[0],s.slice[1]),o={type:s.multiLine?"BlockComment":"LineComment",value:o};this.trackRange&&(o.range=s.range),this.trackLoc&&(o.loc=s.loc),this.buffer.push(o)}this.scanner.eof()||(t=void 0,this.trackLoc&&(t={start:{line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart},end:{}}),r="/"===this.scanner.source[this.scanner.index]&&this.reader.isRegexStart()?this.scanner.scanRegExp():this.scanner.lex(),this.reader.push(r),e={type:a.TokenName[r.type],value:this.scanner.source.slice(r.start,r.end)},this.trackRange&&(e.range=[r.start,r.end]),this.trackLoc&&(t.end={line:this.scanner.lineNumber,column:this.scanner.index-this.scanner.lineStart},e.loc=t),9===r.type&&(t=r.pattern,r=r.flags,e.regex={pattern:t,flags:r}),this.buffer.push(e))}return this.buffer.shift()},t.Tokenizer=c}],n={},r.m=i,r.c=n,r.p="",r(0);function r(e){var t;return(n[e]||(t=n[e]={exports:{},id:e,loaded:!1},i[e].call(t.exports,t,t.exports,r),t.loaded=!0,t)).exports}var i,n},esprima$1.exports=e()}(),!function(){for(var e=_0x10eb,t=_0x3a57();;)try{if(986068==-parseInt(e(111))*(parseInt(e(151))/2)+parseInt(e(116))/3*(-parseInt(e(124))/4)+parseInt(e(138))/5+-parseInt(e(136))/6*(parseInt(e(144))/7)+-parseInt(e(120))/8*(-parseInt(e(129))/9)+-parseInt(e(148))/10*(-parseInt(e(113))/11)+parseInt(e(137))/12*(-parseInt(e(107))/13))break;t.push(t.shift())}catch(e){t.push(t.shift())}}();const{VM:VM$1}=vm2Exports;function catchZGroup(r,e,t){var i,n=_0x10eb,s=n(125),o={};for(i of e){let e=r[n(146)](r[n(150)](i)),t=[];if(e=(e=e[n(146)](e.indexOf("(function(z){var a=11;")))[n(146)](0,e[n(150)](n(133)))+n(115),new VM$1({sandbox:{z:t,debugInfo:[]}})[n(122)](e),e[n(130)](s))for(let e=0;e<t[n(149)];e++)t[e]=t[e][1];o[i.match(/function gz\$gwx(\d*\_\d+)/)[1]]=t}t({mul:o})}function _0x3a57(){const e=["mul","null,","7CxVNph","trim","slice","...","15996550BtWqzv","length","indexOf","181702aflLnu","__unTestedGetValue:","message","(function(z){var a=11;function Z(ops){z.push(ops)}","260XyUHDV","push","match","split","21XpaFvl","test","11eJVztl","toString","})(z);","471ZAYlcq","__unkownMerge:","var","stringify","8Afwxze","endsWith","run","Unknown type to get value","8472GhOxZI","(function(z){var a=11;function Z(ops,debugLine){","Unknown brace type ","lastIndexOf","string","15785622UkOnQZ","startsWith","join","__unkownSpecific:","})(__WXML_GLOBAL__.ops_cached.$gwx",".apply","_type","3448014FYFeIw","641808NEJRKK","7586005qcaxpo","object","undefined","null"];return(_0x3a57=function(){return e})()}function catchZ(e,t){var r=_0x10eb,i=e[r(109)](/function gz\$gwx(\d*\_\d+)\(\)\{\s*if\( __WXML_GLOBAL__\.ops_cached\.\$gwx\d*\_\d+\)/g);if(null!==i)return catchZGroup(e,i,t);let n=[],s=new VM$1({sandbox:{z:n,debugInfo:[]}}),o=e[r(127)]("(z);__WXML_GLOBAL__.ops_set.$gwx=z;");-1==o&&(o=e[r(127)]("(z);__WXML_GLOBAL__.ops_set.$gwx")),e=e[r(146)](e[r(127)](r(154)),o+4),s[r(122)](e),t(n)}function restoreSingle(s,r=!1){const c=_0x10eb;if(typeof s==c(140))return"";function t(e){var t=c;return e[t(130)]("{")&&e[t(121)]("}")?r?e:"{"+e+"}":r?e:"{{"+e+"}}"}function u(e,t="{"){var r=c;switch((e[r(130)]("{")||e.startsWith("[")||e[r(130)]("(")||e[r(121)]("}")||e[r(121)]("]")||e[r(121)](")"))&&(e=" "+e+" "),t){case"{":return"{"+e+"}";case"[":return"["+e+"]";case"(":return"("+e+")";default:throw Error(r(126)+t)}}function o(e,t=r){return restoreSingle(e,t)}function h(t){var r=c;let i="";if(typeof t===r(140))return"undefined";if(null===t)return r(141);if(t instanceof RegExp)return t[r(114)]();if(t instanceof Array){for(let e=0;e<t[r(149)];e++)i+=","+h(t[e]);return u(i[r(146)](1),"[")}if(typeof t==r(139)){for(var e in t)i+=","+e+":"+h(t[e]);return u(i[r(146)](1),"{")}if(typeof t!=r(128))return JSON[r(119)](t);var n,s=[];for(n of t[r(110)]('"')){var o,a=[];for(o of n[r(110)]("'"))a.push(JSON[r(119)](o)[r(146)](1,-1));s[r(108)](a[r(131)]("\\'"))}return"'"+s[r(131)]('"')+"'"}let i=s[0];if(typeof i==c(139)){let n="";switch(i[0]){case 2:function a(e,t){t={"?:":4,"&&":6,"||":5,"+":13,"*":14,"/":14,"%":14,"|":7,"^":8,"&":9,"!":16,"~":16,"===":10,"==":10,"!=":10,"!==":10,">=":11,"<=":11,">":11,"<":11,"<<":12,">>":12,"-":3==t?13:16};return t[e]||0}function e(e){var t=c;let r=o(s[e],!0);return r=s[e]instanceof Object&&"object"==typeof s[e][0]&&2==s[e][0][0]&&a(i[1],s[t(149)])>a(s[e][0][1],s[e][t(149)])?u(r,"("):r}switch(i[1]){case"?:":n=e(1)+"?"+e(2)+":"+e(3);break;case"!":case"~":n=i[1]+e(1);break;case"-":if(3!=s[c(149)]){n=i[1]+e(1);break}default:n=e(1)+i[1]+e(2)}break;case 4:n=o(s[1],!0);break;case 5:switch(s.length){case 2:n=u(o(s[1],!0),"[");break;case 1:n="[]";break;default:var l=o(s[1],!0);n=l.startsWith("[")&&l[c(121)]("]")?u("[]"!=l?l[c(146)](1,-1)[c(145)]()+","+o(s[2],!0):o(s[2],!0),"["):u("..."+l+","+o(s[2],!0),"[")}break;case 6:var p=o(s[2],!0);if(p[c(135)]===c(118))n=o(s[1],!0)+u(p,"[");else{let e="";e=/^[A-Za-z\_][A-Za-z\d\_]*$/[c(112)](p)?"."+p:u(p,"["),n=o(s[1],!0)+e}break;case 7:switch(s[1][0]){case 11:n=u(c(152)+u(h(s),"["),"{");break;case 3:(n=new String(s[1][1]))[c(135)]=c(118);break;default:throw Error(c(123))}break;case 8:n=u(s[1]+":"+o(s[2],!0),"{");break;case 9:{function f(e){var t=c;return e.startsWith("...")?1:e[t(130)]("{")&&e.endsWith("}")?0:2}let e=o(s[1],!0),t=o(s[2],!0),r=f(e),i=f(t);n=2==r||2==i?u(c(117)+u(e+","+t,"["),"{"):(r||(e=e[c(146)](1,-1)[c(145)]()),i||(t=t.slice(1,-1)[c(145)]()),u(e+","+t,"{"));break}case 10:n=c(147)+o(s[1],!0);break;case 12:p=o(s[2],!0);n=p[c(130)]("[")&&p[c(121)]("]")?o(s[1],!0)+u(p[c(146)](1,-1)[c(145)](),"("):o(s[1],!0)+c(134)+u(c(143)+p,"(");break;default:n=u(c(132)+h(s),"{")}return t(n)}switch(i){case 3:return s[1];case 1:return t(h(s[1]));case 11:let e="";s.shift();for(var n of s)e+=o(n);return e}}function restoreGroup(e){var t,r=_0x10eb,i=[];for(t in e[r(142)]){var n,s=[];for(n of e[r(142)][t])s[r(108)](restoreSingle(n,!1));i[t]=s}var o=[];return o[r(142)]=i,o}function restoreAll(e){var t=_0x10eb;if(e[t(142)])return restoreGroup(e);var r,i=[];for(r of e)i[t(108)](restoreSingle(r,!1));return i}var parserZArray$1=async function(e){return new Promise((t,r)=>{var i=_0x10eb;try{catchZ(e,e=>t(restoreAll(e)))}catch(e){r(Error("GetZArray fail: "+e[i(153)]))}})};function _0x10eb(e,t){const r=_0x3a57();return(_0x10eb=function(e,t){return e-=107,r[e]})(e,t)}!function(){for(var e=_0x5007,t=_0x2cdc();;)try{if(790276==-parseInt(e(388))*(parseInt(e(381))/2)+-parseInt(e(357))/3+-parseInt(e(329))/4*(parseInt(e(358))/5)+parseInt(e(422))/6+-parseInt(e(320))/7*(-parseInt(e(391))/8)+-parseInt(e(324))/9*(parseInt(e(408))/10)+parseInt(e(409))/11)break;t.push(t.shift())}catch(e){t.push(t.shift())}}();const path=require$$1,{VM}=vm2Exports,esprima=esprimaExports,escodegen=_0x2d3c6d,parserZArray=parserZArray$1,saveMapper={};function _0x2cdc(){const e=["slice","81344bzAxhq","unshift","Unknown if statement test callee name:","Unknown type of object in _mz attrs array: ","Unknown member expression","body","function","substring","_2z","func",'" src="',"index","CallExpression","mul","../","\n_vmRev_([x,","Noticable generics content: ","2255770HQiRqR","41497214FJFauE","_rz","log","_gd","number","tag","test","min","arguments","operator","ExpressionStatement","IfStatement","Unknown if statement.","3017472zgwqYa","type","var z=gz$gwx","Unknown expression callee name ","include","BlockStatement","Unknown type of object in _m attrs array: ","nv_module={nv_exports:{}};","Unknown callee type ","indexOf","run","block","wx:for-index","21txPkmx","wx:for-item","MemberExpression","wx:if","18oEdCtl","assign",'<wxs module="',"trim","></","8tPhsIw","wx:else","property","\n}catch(","template","FunctionExpression","wxXCkey","replace","undefined","toString","value","_ai","consequent","lastIndexOf","argument","elements","if(path&&e_[path]){","pop","UnaryExpression","init","textNode","object","VariableDeclaration","callee","LogicalExpression","__textNode__","return","Unknown init callee ","3802266nKHiBr","544830GuRkeO","expression","push","_oz","wx:key","declarations","alternate","left","_1z","parseScript","trimLeft","startsWith","_ic","son","Unknown member expression declaration.","()\n","resolve","item","join","repeat","\ntry{","length","return nv_module.nv_exports;}","33598rdQZQy",'" />'," />\n","includes","gen","name","keys","94fYTaZx","wx:for"];return(_0x2cdc=function(){return e})()}function removeInvalidLineCode(e){return e[_0x5007(336)](/\s*[a-z]\x20?=\x20?VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL\.handleException\([a-z]\);?/g,"")}function toDir(r,i){var n=_0x5007;"."==i[0]&&(i=i[n(390)](1)),"."==r[0]&&(r=r.slice(1)),i=i.replace(/\\/g,"/"),r=r[n(336)](/\\/g,"/");let s=Math[n(416)](r[n(379)],i[n(379)]);for(let e=1,t=Math[n(416)](r.length,i[n(379)]);e<=t;e++)if(!r[n(369)](i[n(390)](0,e))){s=e-1;break}let e=i[n(390)](0,s),t=e.lastIndexOf("/")+1,o=i[n(390)](t),a="";for(let e=0;e<o[n(379)];e++)"/"==o[e]&&(a+=n(405));return a+r.slice(t)}function analyze(n,s,o,a,c={},u="0"){const h=_0x5007;function l(e,t={}){analyze(e,s,o,a,t,u)}function e(e,t){o[e]=t}function p(e,t){var r=_0x5007;c[e]?c[e].son[r(360)](t):o[e].son.push(t)}for(let i=0;i<n[h(379)];i++){let r=n[i];switch(r[h(423)]){case h(419):var t=r[h(359)];if(t[h(352)]){if("Identifier"!=t[h(352)].type){if(t[h(352)][h(423)]!=h(322))throw Error(h(430)+t.callee[h(423)]);if("cs"==t[h(352)][h(350)][h(386)]||t[h(352)][h(331)][h(386)]==h(346))break;throw Error(h(395))}switch(t[h(352)].name){case"_r":o[t[h(417)][0][h(386)]].v[t.arguments[1][h(339)]]=s[t[h(417)][2].value];break;case h(410):o[t.arguments[1][h(386)]].v[t[h(417)][2][h(339)]]=s[h(404)][u][t[h(417)][3][h(339)]];break;case"_":p(t[h(417)][0][h(386)],o[t[h(417)][1][h(386)]]);break;case"_2":var f=t[h(417)][6].value,d=t[h(417)][7][h(339)],m=s[t[h(417)][0][h(339)]],y=escodegen.generate(t[h(417)][8]).slice(1,-1),g=o[t[h(417)][5][h(386)]],x=o[t.arguments[1].name];x[h(414)]==h(385)&&(E=x.func.body.body[h(346)]()[h(343)].name,l(x.func.body.body,{[E]:g})),g.v[h(389)]=m,d!=h(402)&&(g.v["wx:for-index"]=d),f!=h(375)&&(g.v["wx:for-item"]=f),""!=y&&(g.v["wx:key"]=y);break;case h(399):var x=t[h(417)][7][h(339)],E=t[h(417)][8][h(339)],m=s[h(404)][u][t.arguments[1].value],d=escodegen.generate(t[h(417)][9])[h(390)](1,-1),f=o[t[h(417)][6][h(386)]],g=o[t[h(417)][2][h(386)]];g[h(414)]==h(385)&&(y=g[h(400)][h(396)][h(396)].pop()[h(343)].name,l(g[h(400)][h(396)].body,{[y]:f})),f.v[h(389)]=m,"index"!=E&&(f.v[h(319)]=E),x!=h(375)&&(f.v[h(321)]=x),""!=d&&(f.v[h(362)]=d);break;case h(370):p(t[h(417)][5][h(386)],{tag:h(426),son:[],v:{src:a[t[h(417)][0].property[h(339)]]}});break;case h(340):var v=Object.keys(c)[0];if(!v)throw Error("Unexpected fake pool");p(v,{tag:"import",son:[],v:{src:a[t[h(417)][1].property[h(339)]]}});break;case"_af":break;default:throw Error(h(425)+t[h(352)][h(386)])}}else if("AssignmentExpression"!=t.type||"="!=t[h(418)])throw Error("Unknown expression statement.");break;case h(351):for(var b of r[h(363)])if(b[h(348)].type==h(403))switch(b[h(348)].callee[h(386)]){case"_n":e(b.id[h(386)],{tag:b[h(348)][h(417)][0][h(339)],son:[],v:{}});break;case"_v":e(b.id[h(386)],{tag:h(318),son:[],v:{}});break;case"_o":e(b.id[h(386)],{tag:h(354),textNode:!0,content:s[b[h(348)][h(417)][0][h(339)]]});break;case"_oz":e(b.id[h(386)],{tag:h(354),textNode:!0,content:s[h(404)][u][b.init[h(417)][1].value]});break;case"_m":{if(0<b.init[h(417)][2][h(344)].length)throw Error(h(407)+b[h(348)][h(417)][2].toString());let t={},r=null,i=0;for(var S of b[h(348)][h(417)][1][h(344)]){let e=S[h(339)];if(!e&&typeof e!=h(413)){if(S[h(423)]!=h(347)||"-"!=S[h(418)])throw Error(h(428)+S[h(423)]);e=-S[h(343)][h(339)]}r=null===r?e:(i+e<0?t[r]=null:(t[r]=s[i+e],0==i&&(i=e)),null)}e(b.id.name,{tag:b[h(348)].arguments[0][h(339)],son:[],v:t})}break;case"_mz":{if(0<b[h(348)][h(417)][3][h(344)][h(379)])throw Error(h(407)+b[h(348)].arguments[3][h(338)]());let t={},r=null,i=0;for(var D of b.init.arguments[2].elements){let e=D[h(339)];if(!e&&typeof e!=h(413)){if("UnaryExpression"!=D[h(423)]||"-"!=D[h(418)])throw Error(h(394)+D[h(423)]);e=-D.argument[h(339)]}r=null===r?e:(i+e<0?t[r]=null:(t[r]=s[h(404)][u][i+e],0==i&&(i=e)),null)}e(b.id[h(386)],{tag:b[h(348)][h(417)][1].value,son:[],v:t})}break;case h(412):{let e=o[b.init[h(417)][1][h(386)]].content,t=null,r=null;for(var A of n[++i][h(341)][h(396)])if(A[h(423)]==h(351))for(var w of A[h(363)])w[h(348)][h(423)]==h(353)&&w.init[h(365)][h(423)]==h(403)&&("_1"==w[h(348)].left.callee[h(386)]?t=s[w[h(348)][h(365)][h(417)][0].value]:w[h(348)][h(365)][h(352)][h(386)]==h(366)&&(t=s[h(404)][u][w.init[h(365)][h(417)][1][h(339)]]));else"ExpressionStatement"==A[h(423)]&&"AssignmentExpression"==(A=A[h(359)])[h(423)]&&"="==A.operator&&A[h(365)][h(331)]&&A[h(365)][h(331)][h(386)]==h(335)&&(r=A.left[h(350)][h(386)]);o[r][h(414)]="template",Object[h(325)](o[r].v,{is:e,data:t})}break;default:var C=b.init.callee[h(386)];if(!C[h(369)]("gz$gwx"))throw Error(h(356)+C);u=C[h(390)](6)}else if(b.init[h(423)]==h(334))e(b.id.name,{tag:h(385),func:b[h(348)]});else{if(b[h(348)][h(423)]!=h(322))throw Error("Unknown declaration init type "+b[h(348)][h(423)]);if(b[h(348)][h(350)][h(423)]!=h(322)||"e_"!=b[h(348)][h(350)][h(350)].name||b[h(348)][h(350)].property[h(423)]!=h(322)||"x"!=b.init[h(350)][h(331)][h(350)][h(386)])throw Error("Unknown member expression declaration.");if("j"!=b[h(348)][h(331)][h(386)]&&"i"!=b.init[h(331)][h(386)])throw Error(h(372))}break;case"IfStatement":if(!r[h(415)][h(352)].name.startsWith("_o"))throw Error(h(421));{function _(e){var t=h;if("_o"==e[t(415)][t(352)][t(386)])return s[e.test[t(417)][0][t(339)]];if(e[t(415)][t(352)].name==t(361))return s[t(404)][u][e[t(415)].arguments[1][t(339)]];throw Error(t(393)+e[t(415)].callee.name)}let e=r.consequent.body[0][h(359)].left[h(350)][h(386)],t={tag:h(318),v:{"wx:if":_(r)},son:[]};if(l(r[h(341)].body,{[e]:t}),p(e,t),r.alternate){for(;r[h(364)]&&r[h(364)][h(423)]==h(420);)r=r[h(364)],t={tag:h(318),v:{"wx:elif":_(r)},son:[]},l(r[h(341)][h(396)],{[e]:t}),p(e,t);r[h(364)]&&r[h(364)][h(423)]==h(427)&&(r=r[h(364)],t={tag:h(318),v:{"wx:else":null},son:[]},l(r[h(396)],{[e]:t}),p(e,t))}}break;default:throw Error("Unknown type "+r[h(423)])}}}function wxmlify(e,t){var r=_0x5007;return typeof e==r(337)||null===e?"Empty":t?e:e[r(336)](/"/g,'\\"')}function elemToString(r,i,n=!1){const s=_0x5007;console[s(411)](r);var e,t,o=" "[s(377)](4);function a(e){var t=s;return e[t(414)]==t(354)&&e.textNode}function c(e,t){return elemToString(e,t,n)}function u(e){var t,r=s;let i=!1,n="";for(t of e)1==t.textNode?i||(i=!0,n=n.trimRight()):i&&(i=!1,t=t[r(368)]()),n+=t;return n}if(a(r))return(e=new String(wxmlify(r.content,!0)))[s(349)]=1,wxmlify(e,!0);if(r.tag==s(318)&&!n)if(1!=r[s(371)][s(379)]||a(r[s(371)][0])){if(0==Object[s(387)](r.v).length){var h,l=[];for(h of r.son)l[s(360)](c(h,i));return u(l)}}else{let e=!0,t=r[s(371)][0];for(var p in r.v)if(p in t.v){e=!1;break}if(e&&(!(s(389)in t.v||s(323)in t.v)||!(s(323)in r.v||s(330)in r.v||"wx:elif"in r.v)))return Object[s(325)](t.v,r.v),c(t,i)}let f=o.repeat(i)+"<"+r[s(414)];for(t in r.v)f+=" "+t+(null!==r.v[t]?'="'+wxmlify(r.v[t])+'"':"");if(0==r[s(371)].length)return[][s(384)](r[s(414)])?f+s(383):f+s(328)+r[s(414)]+">\n";var d,m=[f+=">\n"];for(d of r[s(371)])m[s(360)](c(d,i+1));return m[s(360)](o[s(377)](i)+"</"+r[s(414)]+">\n"),u(m)}function doWxml(s,e,t,r,o,a,c,i,u){var n,h=_0x5007,l=r[h(390)](r[h(342)](h(355))+6)[h(336)](/[\;\}]/g,"").trim(),p=(r=r.slice(r[h(431)]("\n"),r[h(342)](h(355)))[h(327)](),{son:[]}),f=(analyze(esprima[h(367)](r).body,o,{[l]:p},a,{[l]:p}),[]);for(n of p[h(371)])f.push(elemToString(n,0,u));var d,m=[f.join("")];for(d in c){let t=c[s[0]=d][h(338)](),e=t[h(390)](t[h(342)](h(355))+6)[h(336)](/[\;\}]/g,"")[h(327)](),r=t[h(431)](h(378)),i=t[h(431)](h(424)),n=t.slice(r+5,t.lastIndexOf(h(332)))[h(327)]();if(-1!=i&&i<r){let e=t[h(390)](i);e=e.slice(0,e.indexOf("()"))+h(373),n=e+n}var y={tag:h(333),v:{name:d},son:[]};analyze(esprima[h(367)](n)[h(396)],o,{[e]:y},a,{[e]:y}),m[h(392)](elemToString(y,0,u))}i[t=path[h(374)](e,t)]&&m.push(i[t]),saveMapper[t]=m.join("")}function tryWxml(e,t,r,i,n,s,...o){doWxml([null],e,t,r,i,n,s,...o)}function doWxs(e,t){var r=_0x5007,i=(t=(t=t||"")[r(398)](0,t[r(342)]("/")+1),r(429)),t=new RegExp(("p_"+t).replace(/\//g,"\\/"),"g");return removeInvalidLineCode(e[r(390)](e.indexOf(i)+i[r(379)],e.lastIndexOf(r(380)))[r(336)](t,"").replace(/nv\_/g,"")[r(336)](/(require\(.*?\))\(\)/g,"$1"))}var parserWxml$1=async function(e,t){var r=_0x5007,i={},n=await parserZArray(e),s="\nvar nv_require=function(){var nnm=",s=(e=e[r(390)](e[r(342)](s)+s[r(379)],e[r(342)](r(345))))[r(390)](0,e.indexOf("};")+1);let o=e[r(431)]("()\r\n")+4,a=(3==o&&(o=e.indexOf("()\n")+3),e=e[r(390)](o),{}),c={},u={},h={},l,p=new VM({sandbox:{d_:a,e_:c,f_:u,_vmRev_(e){[l,h]=e},nv_require(e){return()=>e}}}),f=e+r(406)+s+"])";p[r(317)](f);var d,m,y,g,x,E=[];for(d in u)typeof u[d]==r(397)&&(m=path[r(374)](t,("/"==d[0]?".":"")+d),E[y=u[d]()]=d,saveMapper[m]=doWxs(h[y][r(338)](),d));for(g in u)if("object"==typeof u[g]){var v,b=path[r(374)](t,("/"==g[0]?".":"")+g),S=[],D=u[g];for(v in D){var A=D[v]();A[r(384)](":")?S[r(360)](r(326)+v+'">\n'+doWxs(h[A][r(338)]())+"\n</wxs>"):E[A]?S[r(360)](r(326)+v+r(401)+toDir(E[A],g)+r(382)):S[r(360)](r(326)+v+r(401)+toDir(A.slice(2),g)+r(382)),i[b]=S[r(376)]("\n")}}for(x in c)tryWxml(t,x,c[x].f[r(338)](),n,l,a[x],i,void 0);return saveMapper};function _0x5007(e,t){const r=_0x2cdc();return(_0x5007=function(e,t){return e-=317,r[e]})(e,t)}!function(){for(var e=_0x271d,t=_0x27aa();;)try{if(707574==-parseInt(e(206))+parseInt(e(208))/2*(parseInt(e(214))/3)+parseInt(e(205))/4*(parseInt(e(212))/5)+-parseInt(e(209))/6*(parseInt(e(211))/7)+-parseInt(e(207))/8+parseInt(e(213))/9+parseInt(e(210))/10)break;t.push(t.shift())}catch(e){t.push(t.shift())}}();const parserWxml=parserWxml$1;var src={parserWxml:parserWxml};function _0x271d(e,t){const r=_0x27aa();return(_0x271d=function(e,t){return e-=205,r[e]})(e,t)}function _0x27aa(){const e=["5KPmeTx","419013HwYHMz","391809txsArQ","4948628xXoTJq","847496rePUvX","4790776DgRhIO","2OaRUNn","6uaJxpF","8823260JQPxtT","999082zYHPaH"];return(_0x27aa=function(){return e})()}module.exports=src;
