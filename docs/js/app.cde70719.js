(function(t){function e(e){for(var r,i,s=e[0],u=e[1],c=e[2],p=0,d=[];p<s.length;p++)i=s[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);l&&l(e);while(d.length)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,s=1;s<n.length;s++){var u=n[s];0!==a[u]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},2707:function(t,e,n){function r(t){var e,n=regeneratorRuntime.mark(r);function r(t){var r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:for(e=16807*e%2147483647,r=15&e,a=0;a<=r;++a)e=16807*e%2147483647;return o=(e-1)/2147483646,n.next=6,Math.floor(o*t);case 6:case"end":return n.stop()}}),n)}function a(t){e=t%2147483647,e<=0&&(e+=2147483646);for(var n=r(1),a=0;a<128;++a)n.next()}return a(t),r.reseed=function(t){a(t)},r}function a(t){return function(e){for(var n=e.length;n>0;--n){var r=n-1,a=t(n).next().value;if(a!==r){var o=e[a];e[a]=e[r],e[r]=o}}return e}}function o(t){return function(){for(var e=t("bbbbbbbbggggggggkkkkkkkkrrrrrrrrwwwwwwwwzzz".split("")),n=0,r=[42,38,31,25,18,12,5,1];n<r.length;n++){var a=r[n];e.splice(a,0,"/")}return e.join("")}}function i(t){return t.split("").map((function(t){return t.charCodeAt(0)})).reduce((function(t,e){return(16807*t+e)%2147483647}),1234567890)}function s(t){var e=Math.trunc(2147483647*Math.random());return t?""+ +t===t?(e=+t,console.log("Using numeric seed: ".concat(e))):(e=i(t),console.log("Using seed: ".concat(e,' (from: "').concat(t,'")'))):console.log("Using random seed: ".concat(e)),e}n("99af"),n("a15b"),n("d81d"),n("13d5"),n("a434"),n("b65f"),n("ac1f"),n("1276"),n("96cf");var u=s("langk"),c=r(u),l=a(c),p=o(l);t.exports={boardGenerator:p}},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{attrs:{id:"app"}},[n("link",{attrs:{href:"https://fonts.googleapis.com/css?family=Inconsolata&display=swap",rel:"stylesheet"}}),n("div",{staticClass:"control-panel"},[n("HelloWorld",{attrs:{msg:"LYNGK Replay Tool"}}),n("button",[t.showInput?n("span",{on:{click:function(e){t.showInput=!t.showInput}}},[t._v("Go To Playback Mode")]):t._e(),t.showInput?t._e():n("span",{on:{click:function(e){t.showInput=!t.showInput}}},[t._v("Go To Record/Edit Mode")])]),n("br"),n("br"),t.showInput?n("div",[n("label",[t._v("Initial board state")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.input.boardInput,expression:"input.boardInput"}],attrs:{type:"text",size:"52"},domProps:{value:t.input.boardInput},on:{change:t.updateInputs,input:function(e){e.target.composing||t.$set(t.input,"boardInput",e.target.value)}}}),n("br"),n("button",{on:{click:t.generateRandomBoard}},[t._v(" Generate Random Board ")]),n("br"),n("label",[t._v("First Mover")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.input.p1,expression:"input.p1"}],attrs:{type:"text",size:"16",maxlength:"16"},domProps:{value:t.input.p1},on:{change:t.updateInputs,input:function(e){e.target.composing||t.$set(t.input,"p1",e.target.value)}}}),n("br"),n("label",[t._v("Second Mover")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.input.p2,expression:"input.p2"}],attrs:{type:"text",size:"16",maxlength:"16"},domProps:{value:t.input.p2},on:{change:t.updateInputs,input:function(e){e.target.composing||t.$set(t.input,"p2",e.target.value)}}}),n("br"),n("label",[t._v("Move History")]),n("br"),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.input.moveInput,expression:"input.moveInput"}],attrs:{cols:"8",rows:"16"},domProps:{value:t.input.moveInput},on:{change:t.updateInputs,keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.updateInputs(e))},input:function(e){e.target.composing||t.$set(t.input,"moveInput",e.target.value)}}}),n("br")]):t._e(),t.showInput?t._e():n("div",[n("h2",[t._v("Players")]),n("h3",[t._v(t._s(t.input.p1))]),n("span",[t._v("picks:")]),n("div",{staticClass:"picks"},[n("span",[t._v("picks:")]),t._l(t.gameState.p1Picks,(function(e){return n("div",{key:e,staticClass:"pick-container"},[n("div",{staticClass:"pick",class:e},[t._v(t._s(e))])])}))],2),n("br"),n("span",[t._v("stacks: "+t._s(t.gameState.p1Stacks.length))]),n("h3",[t._v(t._s(t.input.p2))]),n("span",[t._v("picks:")]),n("div",{staticClass:"picks"},[n("span",[t._v("picks:")]),t._l(t.gameState.p2Picks,(function(e){return n("div",{key:e,staticClass:"pick-container"},[n("div",{staticClass:"pick",class:e},[t._v(t._s(e))])])}))],2),n("br"),n("span",[t._v("stacks: "+t._s(t.gameState.p2Stacks.length))]),n("h2",[t._v("Moves")]),n("ul",[t._l(t.moveHistory,(function(e,r){return n("li",{key:e},[r%2===0?n("span",[t._v(t._s(t.input.p1))]):t._e(),r%2===1?n("span",[t._v(t._s(t.input.p2))]):t._e(),n("span",[t._v(t._s(e))])])})),n("li",[t._v("👀")]),t._l(t.moveFuture,(function(e,r){return n("li",{key:e,staticClass:"future"},[(r+t.moveHistory.length)%2===0?n("span",[t._v(t._s(t.input.p1))]):t._e(),(r+t.moveHistory.length)%2===1?n("span",[t._v(t._s(t.input.p2))]):t._e(),n("span",[t._v(t._s(e))])])}))],2),n("button",{attrs:{disabled:t.moveHistory.length<1},on:{click:t.stepBack}},[t._v("Step Back")]),n("button",{attrs:{disabled:t.moveHistory.length<1},on:{click:t.goToStart}},[t._v("Start")]),n("br"),n("button",{attrs:{disabled:t.moveFuture.length<1},on:{click:t.stepForward}},[t._v("Step Forward")]),n("button",{attrs:{disabled:t.moveFuture.length<1},on:{click:t.goToEnd}},[t._v("End")]),n("br")])],1),n("svg",{attrs:{viewBox:"0 0 800 893",xmlns:"http://www.w3.org/2000/svg"}},[n("text",{attrs:{x:"1",y:"086.6"}},[t._v("A1")]),n("text",{attrs:{x:"777",y:"086.6"}},[t._v("A1")]),n("text",{attrs:{x:"1",y:"173.2"}},[t._v("B1")]),n("text",{attrs:{x:"777",y:"173.2"}},[t._v("B4")]),n("text",{attrs:{x:"1",y:"259.8"}},[t._v("C1")]),n("text",{attrs:{x:"777",y:"259.8"}},[t._v("C7")]),n("text",{attrs:{x:"1",y:"346.4"}},[t._v("D1")]),n("text",{attrs:{x:"777",y:"346.4"}},[t._v("D6")]),n("text",{attrs:{x:"1",y:"433.0"}},[t._v("E1")]),n("text",{attrs:{x:"777",y:"433.0"}},[t._v("E7")]),n("text",{attrs:{x:"1",y:"519.6"}},[t._v("F1")]),n("text",{attrs:{x:"777",y:"519.6"}},[t._v("F6")]),n("text",{attrs:{x:"1",y:"606.2"}},[t._v("G1")]),n("text",{attrs:{x:"777",y:"606.2"}},[t._v("G7")]),n("text",{attrs:{x:"1",y:"692.8"}},[t._v("H1")]),n("text",{attrs:{x:"777",y:"692.8"}},[t._v("H4")]),n("text",{attrs:{x:"1",y:"779.4"}},[t._v("I1")]),n("text",{attrs:{x:"777",y:"779.4"}},[t._v("I1")]),n("polygon",{attrs:{points:"400,86.6 450,173.2 550,173.2 600,259.8 700,259.8 650,346.4 700,433.0, 650,519.6 700,606.2 600,606.2 550,692.8 450,692.8\n            400,779.4 350,692.8 250,692.8 200,606.2 100,606.2 150,519.6, 100,433.0 150,346.4 100,259.8 200,259.8 250,173.2 350,173.2"}}),n("line",{attrs:{x1:"250",y1:"173.2",x2:"550",y2:"173.2"}}),n("line",{attrs:{x1:"100",y1:"259.8",x2:"700",y2:"259.8"}}),n("line",{attrs:{x1:"150",y1:"346.4",x2:"650",y2:"346.4"}}),n("line",{attrs:{x1:"100",y1:"433.0",x2:"700",y2:"433.0"}}),n("line",{attrs:{x1:"150",y1:"519.6",x2:"650",y2:"519.6"}}),n("line",{attrs:{x1:"100",y1:"606.2",x2:"700",y2:"606.2"}}),n("line",{attrs:{x1:"250",y1:"692.8",x2:"550",y2:"692.8"}}),n("line",{attrs:{x1:"400",y1:"086.6",x2:"700",y2:"606.2"}}),n("line",{attrs:{x1:"250",y1:"173.2",x2:"550",y2:"692.8"}}),n("line",{attrs:{x1:"350",y1:"173.2",x2:"600",y2:"606.2"}}),n("line",{attrs:{x1:"550",y1:"173.2",x2:"700",y2:"433.0"}}),n("line",{attrs:{x1:"100",y1:"259.8",x2:"400",y2:"779.4"}}),n("line",{attrs:{x1:"200",y1:"259.8",x2:"450",y2:"692.8"}}),n("line",{attrs:{x1:"100",y1:"433.0",x2:"250",y2:"692.8"}}),n("line",{attrs:{x1:"400",y1:"086.6",x2:"100",y2:"606.2"}}),n("line",{attrs:{x1:"250",y1:"173.2",x2:"100",y2:"433.0"}}),n("line",{attrs:{x1:"450",y1:"173.2",x2:"200",y2:"606.2"}}),n("line",{attrs:{x1:"550",y1:"173.2",x2:"250",y2:"692.8"}}),n("line",{attrs:{x1:"600",y1:"259.8",x2:"350",y2:"692.8"}}),n("line",{attrs:{x1:"700",y1:"259.8",x2:"400",y2:"779.4"}}),n("line",{attrs:{x1:"700",y1:"433.0",x2:"550",y2:"692.8"}}),t._l(t.gameState.boardPlayState,(function(e,r){return t._l(e,(function(e){return n("circle",{key:""+e.x+e.y,class:e.colour,attrs:{cx:e.x,cy:e.y,r:"35"},on:{click:function(e){return t.clickPiece(r)}}})}))})),n("text",{attrs:{x:"780",y:"883"}},[t._v(t._s(t.lastClickedPosition))])],2)])},o=[],i=(n("ac1f"),n("466d"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))])])}),s=[],u={name:"HelloWorld",props:{msg:String}},c=u,l=n("2877"),p=Object(l["a"])(c,i,s,!1,null,"13ae08e0",null),d=p.exports,v=n("ae41"),h=n("2707"),f={name:"App",components:{HelloWorld:d},data:function(){return{input:{boardInput:"",moveInput:"e3d3\n^k c4d3\n^g f2d3\n^w g2d3",p1:"Alf",p2:"Betty"},gameState:{boardPlayState:{},p1Picks:[],p2Picks:[],p1Stacks:[],p2Stacks:[]},showInput:!1,boardStartState:{},moveHistory:[],moveFuture:[],lastClickedPosition:""}},created:function(){var t=JSON.parse(localStorage.getItem("input"));t?this.input=t:this.input.boardInput=Object(h["boardGenerator"])(),this.boardStartState=Object(v["buildStartState"])(this.input.boardInput),this.buildHistory(),this.gameState=Object(v["hydrateBoard"])(this.boardStartState,this.moveHistory)},methods:{buildHistory:function(){this.moveHistory=this.input.moveInput.match(/([^\r\n]+)/g)||[],this.moveFuture=[]},buildFuture:function(){this.moveFuture=this.input.moveInput.match(/([^\r\n]+)/g)||[],this.moveHistory=[]},updateInputs:function(){localStorage.setItem("input",JSON.stringify(this.input)),this.boardStartState=Object(v["buildStartState"])(this.input.boardInput),this.buildHistory(),this.gameState=Object(v["hydrateBoard"])(this.boardStartState,this.moveHistory)},stepBack:function(){this.moveFuture.unshift(this.moveHistory.pop()),this.gameState=Object(v["hydrateBoard"])(this.boardStartState,this.moveHistory)},stepForward:function(){this.moveHistory.push(this.moveFuture.shift()),this.gameState=Object(v["hydrateBoard"])(this.boardStartState,this.moveHistory)},goToStart:function(){this.buildFuture(),this.gameState=Object(v["hydrateBoard"])(this.boardStartState,this.moveHistory)},goToEnd:function(){this.buildHistory(),this.gameState=Object(v["hydrateBoard"])(this.boardStartState,this.moveHistory)},generateRandomBoard:function(){this.input.boardInput=Object(h["boardGenerator"])(),this.input.moveInput="",this.updateInputs()},clickPiece:function(t){this.lastClickedPosition=t}}},y=f,g=(n("034f"),Object(l["a"])(y,a,o,!1,null,null,null)),b=g.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(b)}}).$mount("#app")},"85ec":function(t,e,n){},ae41:function(t,e,n){n("99af"),n("4160"),n("caad"),n("13d5"),n("ac1f"),n("2532"),n("466d"),n("1276"),n("159b");var r=n("448a"),a=function(t,e){var n=[t[0],t[1]],r=n[0],a=n[1],o={a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9},i=[400,250,100,150,100,150,100,250,400],s=8,u=i[o[r]-1]+100*(a-1),c=Math.sin(1.0472)*o[r]*100-s*(e-1);return{x:u,y:Math.round(10*c)/10}},o={a1:[],b1:[],b2:[],b3:[],b4:[],c1:[],c2:[],c3:[],c4:[],c5:[],c6:[],c7:[],d1:[],d2:[],d3:[],d4:[],d5:[],d6:[],e1:[],e2:[],e3:[],e4:[],e5:[],e6:[],e7:[],f1:[],f2:[],f3:[],f4:[],f5:[],f6:[],g1:[],g2:[],g3:[],g4:[],g5:[],g6:[],g7:[],h1:[],h2:[],h3:[],h4:[],i1:[]},i=function(t){var e=t.match(/([^/]+)/g),n=JSON.parse(JSON.stringify(o));return e.forEach((function(t,e){var r="abcdefghi"[e];t.split("").forEach((function(t,e){var o="".concat(r).concat(e+1),i=a(o,1),s=i.x,u=i.y;n[o].push({colour:t,x:s,y:u})}))})),n},s=function(t){var e=t.boardState,n=t.picks,a=t.pick,o=t.origin,i=t.destination,s=JSON.parse(JSON.stringify(e)),u=s[o],c=s[o].length,l=s[o][c-1].colour,p=s[i],d=[].concat(r(p),r(u)),v=[];if("z"===l)return"Invalid move ".concat(o).concat(i,": the player may not move a wild");if(d.length>5)return"Invalid move ".concat(o).concat(i,": The resulting stack would be ").concat(d.length," pieces tall");if(a){if(n.includes(a))return"Invalid colour pick ".concat(a,": the player has already picked this colour");if(n.length>=2)return"Invalid colour pick ".concat(a,": the player may not pick more than 2 colours")}for(var h=0;h<d.length;h++){if(v.includes(d[h].colour))return"Invalid move ".concat(o).concat(i,": The resulting stack would contain duplicate colours");v.push(d[h].colour)}return null},u=function(t,e){for(var n=JSON.parse(JSON.stringify(t)),r=[],o=[],i=[],u=[],c=0;c<e.length;c++){var l=e[c];if("-"!==l){var p=function(){var t=c%2===0?1:2,e=l.substring(l.length-4,l.length-2),p=l.substring(l.length-2,l.length),d=l.substring(l.length-6,l.length-5),v=null;if(1===t?v=s({boardState:n,picks:r,pick:d,origin:e,destination:p}):2===t&&(v=s({boardState:n,picks:o,pick:d,origin:e,destination:p})),v)return alert(v),"break";if(d&&1===t?r.push(d):d&&2===t&&o.push(d),n[e].forEach((function(t){n[p].push(t)})),n[e]=[],n[p].length>4){var h=n[p][n[p].length-1].colour;c%2===0&&r.includes(h)?(i.push(n[p].reduce((function(t,e){return t+e.colour}),"")),n[p]=[]):c%2===1&&o.includes(h)&&(u.push(n[p].reduce((function(t,e){return t+e.colour}),"")),n[p]=[])}n[p].forEach((function(t,e){var n=a(p,e+1),r=n.x,o=n.y;t.x=r,t.y=o}))}();if("break"===p)break}}return{boardPlayState:n,p1Picks:r,p2Picks:o,p1Stacks:i,p2Stacks:u}};t.exports={pieceDisplayPosition:a,buildStartState:i,validateMove:s,hydrateBoard:u}}});
//# sourceMappingURL=app.cde70719.js.map