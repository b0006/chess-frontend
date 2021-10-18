(this["webpackJsonpreact-typescript-mobx-boilerplate"]=this["webpackJsonpreact-typescript-mobx-boilerplate"]||[]).push([[0],{34:function(e,t,r){},36:function(e,t,r){},41:function(e,t,r){},49:function(e,t,r){"use strict";r.r(t);var n,l,o,a=r(0),i=r.n(a),c=r(14),s=r.n(c),f=(r(34),r(25)),u=r(2),p=r(28),d=r(21),b=r.n(d),m=r(24),y=r(8),h=r(16),O=r(3),j={isAuth:!1,name:"SuperUser",error:null},v=new function e(){var t=this;Object(h.a)(this,e),this.user=j,this.signIn=function(){t.user=Object(y.a)(Object(y.a)({},t.user),{},{isAuth:!0})},this.changeUserName=function(e){t.user=Object(y.a)(Object(y.a)({},t.user),{},{name:e})},this.logout=Object(m.a)(b.a.mark((function e(){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){e(!0)}));case 2:return(r=e.sent)&&(t.user=j),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)}))),Object(O.d)(this)},L={isRotate:!1},k=(new function e(){var t=this;Object(h.a)(this,e),this.board=L,this.rotate=function(){t.board=Object(y.a)(Object(y.a)({},t.board),{},{isRotate:!t.board.isRotate})},Object(O.d)(this)},r.p+"static/media/logo.2d27ead7.svg"),g=(r(36),r(1)),E=Object(p.a)((function(){var e=v;return Object(g.jsx)("div",{className:"Example",children:Object(g.jsxs)("header",{className:"Example-header",children:[Object(g.jsx)("img",{src:k,className:"Example-logo",alt:"logo"}),Object(g.jsx)("p",{children:"Edit Example.tsx and save to reload."}),Object(g.jsxs)("p",{children:["Default name of user from mobx store: ",Object(g.jsx)("i",{children:e.user.name})]}),Object(g.jsx)("button",{onClick:function(){return e.changeUserName("NEW NAME TEST")},children:"Change user name"}),Object(g.jsx)("a",{className:"Example-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})})),w=function(){return Object(g.jsx)(E,{})},C=function(){return Object(g.jsx)("div",{children:"Oops, page not found :("})},x=r(10),M=r(18),I=r(9),_=r.n(I),P=[].concat(["1","2","3","4","5","6","7","8"]).reverse(),R=["a","b","c","d","e","f","g","h"],S=([].concat(R).reverse(),function(e){var t=e.isRotate;return Object(g.jsx)("div",{className:"chessboard__vertical-panel",children:P.map((function(e){return Object(g.jsx)("div",{className:_()("chessboard__digit-symbol",{"chessboard__digit-symbol--rotate":t}),children:e.toUpperCase()},e)}))})}),z=r(15),N=r(29),W=["title","titleId"];function A(){return A=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},A.apply(this,arguments)}function B(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function D(e,t){var r=e.title,i=e.titleId,c=B(e,W);return a.createElement("svg",A({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":i},c),r?a.createElement("title",{id:i},r):null,a.createElement("g",{style:{opacity:1,fill:"none",fillRule:"evenodd",fillOpacity:1,stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}},a.createElement("g",{style:{fill:"#000000",stroke:"#000000",strokeLinecap:"butt"}},n||(n=a.createElement("path",{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"})),l||(l=a.createElement("path",{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"})),o||(o=a.createElement("path",{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"}))),a.createElement("path",{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18",style:{fill:"none",stroke:"#ffffff",strokeLinejoin:"miter"}})))}var T,U,q,H=a.forwardRef(D),J=(r.p,["title","titleId"]);function K(){return K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},K.apply(this,arguments)}function $(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function F(e,t){var r=e.title,n=e.titleId,l=$(e,J);return a.createElement("svg",K({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{opacity:1,fill:"none",fillRule:"evenodd",fillOpacity:1,stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}},a.createElement("g",{style:{fill:"#ffffff",stroke:"#000000",strokeLinecap:"butt"}},T||(T=a.createElement("path",{d:"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"})),U||(U=a.createElement("path",{d:"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"})),q||(q=a.createElement("path",{d:"M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"}))),a.createElement("path",{d:"M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18",style:{fill:"none",stroke:"#000000",strokeLinejoin:"miter"}})))}var G=a.forwardRef(F),Q=(r.p,["title","titleId"]);function V(){return V=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},V.apply(this,arguments)}function X(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function Y(e,t){var r=e.title,n=e.titleId,l=X(e,Q);return a.createElement("svg",V({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{fill:"none",fillOpacity:1,fillRule:"evenodd",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}},a.createElement("path",{d:"M 22.5,11.63 L 22.5,6",style:{fill:"none",stroke:"#000000",strokeLinejoin:"miter"},id:"path6570"}),a.createElement("path",{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25",style:{fill:"#000000",fillOpacity:1,strokeLinecap:"butt",strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37",style:{fill:"#000000",stroke:"#000000"}}),a.createElement("path",{d:"M 20,8 L 25,8",style:{fill:"none",stroke:"#000000",strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5",style:{fill:"none",stroke:"#ffffff"}}),a.createElement("path",{d:"M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37",style:{fill:"none",stroke:"#ffffff"}})))}var Z=a.forwardRef(Y),ee=(r.p,["title","titleId"]);function te(){return te=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},te.apply(this,arguments)}function re(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function ne(e,t){var r=e.title,n=e.titleId,l=re(e,ee);return a.createElement("svg",te({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{fill:"none",fillOpacity:1,fillRule:"evenodd",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}},a.createElement("path",{d:"M 22.5,11.63 L 22.5,6",style:{fill:"none",stroke:"#000000",strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 20,8 L 25,8",style:{fill:"none",stroke:"#000000",strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25",style:{fill:"#ffffff",stroke:"#000000",strokeLinecap:"butt",strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37",style:{fill:"#ffffff",stroke:"#000000"}}),a.createElement("path",{d:"M 12.5,30 C 18,27 27,27 32.5,30",style:{fill:"none",stroke:"#000000"}}),a.createElement("path",{d:"M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5",style:{fill:"none",stroke:"#000000"}}),a.createElement("path",{d:"M 12.5,37 C 18,34 27,34 32.5,37",style:{fill:"none",stroke:"#000000"}})))}var le=a.forwardRef(ne),oe=(r.p,["title","titleId"]);function ae(){return ae=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},ae.apply(this,arguments)}function ie(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function ce(e,t){var r=e.title,n=e.titleId,l=ie(e,oe);return a.createElement("svg",ae({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{opacity:1,fill:"none",fillOpacity:1,fillRule:"evenodd",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}},a.createElement("path",{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18",style:{fill:"#000000",stroke:"#000000"}}),a.createElement("path",{d:"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10",style:{fill:"#000000",stroke:"#000000"}}),a.createElement("path",{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z",style:{fill:"#ffffff",stroke:"#ffffff"}}),a.createElement("path",{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)",style:{fill:"#ffffff",stroke:"#ffffff"}}),a.createElement("path",{d:"M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z ",style:{fill:"#ffffff",stroke:"none"}})))}var se=a.forwardRef(ce),fe=(r.p,["title","titleId"]);function ue(){return ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},ue.apply(this,arguments)}function pe(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function de(e,t){var r=e.title,n=e.titleId,l=pe(e,fe);return a.createElement("svg",ue({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{opacity:1,fill:"none",fillOpacity:1,fillRule:"evenodd",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}},a.createElement("path",{d:"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18",style:{fill:"#ffffff",stroke:"#000000"}}),a.createElement("path",{d:"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10",style:{fill:"#ffffff",stroke:"#000000"}}),a.createElement("path",{d:"M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z",style:{fill:"#000000",stroke:"#000000"}}),a.createElement("path",{d:"M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",transform:"matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)",style:{fill:"#000000",stroke:"#000000"}})))}var be=a.forwardRef(de),me=(r.p,["title","titleId"]);function ye(){return ye=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},ye.apply(this,arguments)}function he(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function Oe(e,t){var r=e.title,n=e.titleId,l=he(e,me);return a.createElement("svg",ye({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("path",{d:"m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z",style:{opacity:1,fill:"#000000",fillOpacity:1,fillRule:"nonzero",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"miter",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}}))}var je=a.forwardRef(Oe),ve=(r.p,["title","titleId"]);function Le(){return Le=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Le.apply(this,arguments)}function ke(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function ge(e,t){var r=e.title,n=e.titleId,l=ke(e,ve);return a.createElement("svg",Le({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("path",{d:"m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z",style:{opacity:1,fill:"#ffffff",fillOpacity:1,fillRule:"nonzero",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"miter",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}}))}var Ee,we,Ce,xe,Me,Ie,_e,Pe,Re,Se,ze,Ne,We=a.forwardRef(ge),Ae=(r.p,["title","titleId"]);function Be(){return Be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Be.apply(this,arguments)}function De(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function Te(e,t){var r=e.title,n=e.titleId,l=De(e,Ae);return a.createElement("svg",Be({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{fill:"#000000",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"}},a.createElement("path",{d:"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z",style:{strokeLinecap:"butt",fill:"#000000"}}),Ee||(Ee=a.createElement("path",{d:"m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z"})),we||(we=a.createElement("path",{d:"M 11.5,30 C 15,29 30,29 33.5,30"})),Ce||(Ce=a.createElement("path",{d:"m 12,33.5 c 6,-1 15,-1 21,0"})),xe||(xe=a.createElement("circle",{cx:6,cy:12,r:2})),Me||(Me=a.createElement("circle",{cx:14,cy:9,r:2})),Ie||(Ie=a.createElement("circle",{cx:22.5,cy:8,r:2})),_e||(_e=a.createElement("circle",{cx:31,cy:9,r:2})),Pe||(Pe=a.createElement("circle",{cx:39,cy:12,r:2})),a.createElement("path",{d:"M 11,38.5 A 35,35 1 0 0 34,38.5",style:{fill:"none",stroke:"#000000",strokeLinecap:"butt"}}),a.createElement("g",{style:{fill:"none",stroke:"#ffffff"}},Re||(Re=a.createElement("path",{d:"M 11,29 A 35,35 1 0 1 34,29"})),Se||(Se=a.createElement("path",{d:"M 12.5,31.5 L 32.5,31.5"})),ze||(ze=a.createElement("path",{d:"M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"})),Ne||(Ne=a.createElement("path",{d:"M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"})))))}var Ue,qe,He,Je,Ke,$e,Fe,Ge=a.forwardRef(Te),Qe=(r.p,["title","titleId"]);function Ve(){return Ve=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Ve.apply(this,arguments)}function Xe(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function Ye(e,t){var r=e.title,n=e.titleId,l=Xe(e,Qe);return a.createElement("svg",Ve({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{fill:"#ffffff",stroke:"#000000",strokeWidth:1.5,strokeLinejoin:"round"}},Ue||(Ue=a.createElement("path",{d:"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"})),qe||(qe=a.createElement("path",{d:"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"})),a.createElement("path",{d:"M 11.5,30 C 15,29 30,29 33.5,30",style:{fill:"none"}}),a.createElement("path",{d:"M 12,33.5 C 18,32.5 27,32.5 33,33.5",style:{fill:"none"}}),He||(He=a.createElement("circle",{cx:6,cy:12,r:2})),Je||(Je=a.createElement("circle",{cx:14,cy:9,r:2})),Ke||(Ke=a.createElement("circle",{cx:22.5,cy:8,r:2})),$e||($e=a.createElement("circle",{cx:31,cy:9,r:2})),Fe||(Fe=a.createElement("circle",{cx:39,cy:12,r:2}))))}var Ze=a.forwardRef(Ye),et=(r.p,["title","titleId"]);function tt(){return tt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},tt.apply(this,arguments)}function rt(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function nt(e,t){var r=e.title,n=e.titleId,l=rt(e,et);return a.createElement("svg",tt({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{opacity:1,fill:"#000000",fillOpacity:1,fillRule:"evenodd",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}},a.createElement("path",{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ",style:{strokeLinecap:"butt"}}),a.createElement("path",{d:"M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z ",style:{strokeLinecap:"butt"}}),a.createElement("path",{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ",style:{strokeLinecap:"butt"}}),a.createElement("path",{d:"M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z ",style:{strokeLinecap:"butt",strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z ",style:{strokeLinecap:"butt"}}),a.createElement("path",{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z ",style:{strokeLinecap:"butt"}}),a.createElement("path",{d:"M 12,35.5 L 33,35.5 L 33,35.5",style:{fill:"none",stroke:"#ffffff",strokeWidth:1,strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 13,31.5 L 32,31.5",style:{fill:"none",stroke:"#ffffff",strokeWidth:1,strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 14,29.5 L 31,29.5",style:{fill:"none",stroke:"#ffffff",strokeWidth:1,strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 14,16.5 L 31,16.5",style:{fill:"none",stroke:"#ffffff",strokeWidth:1,strokeLinejoin:"miter"}}),a.createElement("path",{d:"M 11,14 L 34,14",style:{fill:"none",stroke:"#ffffff",strokeWidth:1,strokeLinejoin:"miter"}})))}var lt,ot,at=a.forwardRef(nt),it=(r.p,["title","titleId"]);function ct(){return ct=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},ct.apply(this,arguments)}function st(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}function ft(e,t){var r=e.title,n=e.titleId,l=st(e,it);return a.createElement("svg",ct({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 45 45",ref:t,"aria-labelledby":n},l),r?a.createElement("title",{id:n},r):null,a.createElement("g",{style:{opacity:1,fill:"#ffffff",fillOpacity:1,fillRule:"evenodd",stroke:"#000000",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:4,strokeDasharray:"none",strokeOpacity:1}},a.createElement("path",{d:"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ",style:{strokeLinecap:"butt"}}),a.createElement("path",{d:"M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ",style:{strokeLinecap:"butt"}}),a.createElement("path",{d:"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14",style:{strokeLinecap:"butt"}}),lt||(lt=a.createElement("path",{d:"M 34,14 L 31,17 L 14,17 L 11,14"})),a.createElement("path",{d:"M 31,17 L 31,29.5 L 14,29.5 L 14,17",style:{strokeLinecap:"butt",strokeLinejoin:"miter"}}),ot||(ot=a.createElement("path",{d:"M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"})),a.createElement("path",{d:"M 11,14 L 34,14",style:{fill:"none",stroke:"#000000",strokeLinejoin:"miter"}})))}var ut=a.forwardRef(ft),pt=(r.p,{b:{q:Ge,b:H,r:at,p:je,n:se,k:Z},w:{q:Ze,b:G,r:ut,p:We,n:be,k:le}}),dt=function(e){var t=e.isRotate,r=e.board,n=e.getLegalMoves,l=e.getTurn,o=e.setMove,i=Object(a.useState)({}),c=Object(x.a)(i,2),s=c[0],f=c[1],u=Object(a.useState)(null),p=Object(x.a)(u,2),d=p[0],b=p[1],m=function(){b(null),f({})};return Object(g.jsx)("div",{className:"chessboard__board",children:R.map((function(e,a){return Object(g.jsx)("div",{className:"chessboard__row",children:P.map((function(e,i){var c,u,p="".concat(R[i]).concat(P[a]),h=r[a]?r[a][i]:null,O=h?pt[h.color][h.type]:null,j=function(e){return function(e,t,r){s[t]&&d&&(e.preventDefault(),o({from:d,to:t}),m()),r&&(e.preventDefault(),m())}(e,p,!O)};return Object(g.jsx)("div",{tabIndex:0,onKeyDown:j,onClick:j,id:p,className:_()("chessboard__cell",{"chessboard__cell--move":s[p],"chessboard__cell--active":d===p,"chessboard__cell--rotate":t,"chessboard__cell--light":(a+i)%2===0,"chessboard__cell--dark":(a+i)%2!==0}),children:O&&h&&Object(g.jsx)("button",{className:"chessboard__button",type:"button",onClick:(c=p,u=h.color,function(){var e=l();if(d!==c&&e===u){if(e===u){b(c);var t=n({verbose:!0,square:c}),r=Object(N.a)(t).reduce((function(e,t){return"string"!==typeof t?Object(y.a)(Object(y.a)({},e),{},Object(z.a)({},t.to,t)):e}),{});f(r)}}else m()}),children:Object(g.jsx)(O,{className:"chessboard__icon"})})},p)}))},e)}))})},bt=function(e){var t=e.isRotate;return Object(g.jsx)("div",{className:"chessboard__horizontal-panel",children:R.map((function(e){return Object(g.jsx)("div",{className:_()("chessboard__alphabet-symbol",{"chessboard__alphabet-symbol--rotate":t}),children:e.toUpperCase()},e)}))})},mt=(r(41),function(e){var t=e.isRotate,r=e.initBoard,n=e.getLegalMoves,l=e.getTurn,o=e.setMove,i=e.getBoardState,c=Object(a.useState)(r),s=Object(x.a)(c,2),f=s[0],u=s[1];return Object(a.useEffect)((function(){u(r)}),[r]),Object(g.jsx)("div",{className:"chessboard",children:Object(g.jsxs)("div",{className:_()("chessboard__inner",{"chessboard__inner--rotate":t}),children:[Object(g.jsx)(bt,{isRotate:t}),Object(g.jsxs)("div",{className:"chessboard__game",children:[Object(g.jsx)(S,{isRotate:t}),Object(g.jsx)(dt,{isRotate:t,board:f,getLegalMoves:n,getTurn:l,setMove:function(e){o(e),u(i())}}),Object(g.jsx)(S,{isRotate:t})]}),Object(g.jsx)(bt,{isRotate:t})]})})}),yt="function"===typeof M?M:M.Chess,ht=function(){var e=Object(a.useState)(!1),t=Object(x.a)(e,2),r=t[0],n=t[1],l=Object(a.useState)(null),o=Object(x.a)(l,2),i=o[0],c=o[1];return Object(g.jsxs)("div",{children:[i&&Object(g.jsx)(mt,{isRotate:r,initBoard:i.board(),getLegalMoves:i.moves,getTurn:i.turn,setMove:i.move,getBoardState:i.board}),Object(g.jsx)("button",{onClick:function(){var e=new yt;c(e)},children:"Start a new game"}),Object(g.jsxs)("button",{onClick:function(){return n(!r)},children:["Rotate board [",String(r),"]"]})]})},Ot=function(){return Object(g.jsx)(f.a,{children:Object(g.jsxs)(u.c,{children:[Object(g.jsx)(u.a,{exact:!0,path:"/",component:w}),Object(g.jsx)(u.a,{exact:!0,path:"/board",component:ht}),Object(g.jsx)(u.a,{path:"*",component:C})]})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(Ot,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.570a3836.chunk.js.map