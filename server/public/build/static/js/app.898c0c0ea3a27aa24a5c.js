webpackJsonp([15],{"+/MR":function(e,n){},"G/KL":function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o={};t.d(o,"saveProductState",function(){return p}),t.d(o,"saveProductID",function(){return f});var r={};t.d(r,"productState",function(){return h}),t.d(r,"productIdVer",function(){return S});var u=t("7+uW"),i={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var a=t("VU/8")({name:"App",mounted:function(){}},i,!1,function(e){t("ZPMi")},null,null).exports,c=t("/ocq");u.default.use(c.a);var l=new c.a({routes:[{path:"/",name:"login",component:function(){return Promise.all([t.e(0),t.e(5)]).then(t.bind(null,"K31e"))}},{path:"/home",name:"home",component:function(){return t.e(9).then(t.bind(null,"wUZA"))},children:[{path:"/productControl",name:"productControl",component:function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,"S59Q"))}},{path:"/answerList",name:"answerList",component:function(){return Promise.all([t.e(0),t.e(8)]).then(t.bind(null,"kjrT"))}},{path:"/userControl",name:"userControl",component:function(){return Promise.all([t.e(0),t.e(2)]).then(t.bind(null,"kiIE"))}},{path:"/tryEditing",name:"tryEditing",component:function(){return Promise.all([t.e(0),t.e(11)]).then(t.bind(null,"oXKy"))}},{path:"/answerSheet",name:"answerSheet",component:function(){return Promise.all([t.e(0),t.e(4)]).then(t.bind(null,"3Pce"))}},{path:"/collectTab",name:"collectTab",component:function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,"TNyv"))}},{path:"/readControl",name:"readControl",component:function(){return Promise.all([t.e(0),t.e(10)]).then(t.bind(null,"96IA"))}},{path:"/readOver",name:"readOver",component:function(){return Promise.all([t.e(0),t.e(13)]).then(t.bind(null,"rW9q"))}},{path:"/scorePage",name:"scorePage",component:function(){return Promise.all([t.e(0),t.e(12)]).then(t.bind(null,"sSXB"))}},{path:"/showSwerSheet",name:"showSwerSheet",component:function(){return Promise.all([t.e(0),t.e(7)]).then(t.bind(null,"85J4"))}},{path:"/addStudent",name:"addStudent",component:function(){return Promise.all([t.e(0),t.e(3)]).then(t.bind(null,"1pta"))}}]}]}),d=t("zL8q"),s=t.n(d),m=(t("+/MR"),t("G/KL"),t("NYxO")),p=function(e,n){(0,e.commit)("SAVEPRODUCTSTATE",n)},f=function(e,n){var t=e.commit;e.state;t("SAVEPRODUCTID",n)},h=function(e){return e.productState},S=function(e){return e.productIdVer},P={productState:{},productIdVer:{},active:""},v={SAVEPRODUCTSTATE:function(e,n){e.productState=n},SAVEPRODUCTID:function(e,n){e.productIdVer=n},ACTIVE:function(e,n){e.active=n}};t("sax8");u.default.use(m.a);var b,w=new m.a.Store({actions:o,getters:r,state:P,mutations:v,strict:!1,plugins:[]});function E(){var e=document.documentElement,n=e.clientWidth*(140/1920);e.style.fontSize=n+"px",document.body.style.fontSize="20px"}u.default.config.productionTip=!1,u.default.use(s.a),new u.default({el:"#app",router:l,store:w,components:{App:a},template:"<App/>"}),u.default.prototype.resetSetItem=function(e,n){if("token"===e){var t=document.createEvent("StorageEvent");return{setItem:function(e,n){sessionStorage.setItem(e,n),t.initStorageEvent("setItem",!1,!1,e,null,n,null,null),window.dispatchEvent(t)}}.setItem(e,n)}},window.onresize=function(){clearTimeout(b),b=setTimeout(E,100)},E()},Pg0u:function(e,n){e.exports=echarts},ZPMi:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.898c0c0ea3a27aa24a5c.js.map