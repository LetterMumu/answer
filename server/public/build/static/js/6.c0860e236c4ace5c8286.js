webpackJsonp([6],{TNyv:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("P9l9"),a={props:{},data:function(){return{tableList:[],name:"",userId:sessionStorage.getItem("userId"),centerDialogVisible:!1}},computed:{},watch:{},mounted:function(){this._findCollect()},methods:{_findCollect:function(){var e=this;Object(s.g)({name:this.name,userId:this.userId}).then(function(t){0==t.code?e.tableList=t.data:e.$message.error(t.msg)})},toDeital:function(e){var t=this;this.centerDialogVisible=!0;var n=e,s="",a="",l="";for(var i in n)switch(i){case"name":s+="<p>题目&nbsp:&nbsp&nbsp"+n[i]+"</p>";break;case"list":for(var r in n[i])a+="<p>"+r+"&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp"+n[i][r]+"</p>";break;case"answer":l+="<p>答案&nbsp:&nbsp&nbsp"+n[i]+"</p>"}this.$nextTick(function(){return t.$refs.answerDiv.innerHTML=s+a+l})}}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("el-card",{attrs:{header:"题目收藏"}},[n("el-row",[n("el-form",{staticClass:"formStyle1"},[n("el-col",{attrs:{span:8}},[n("el-form-item",{attrs:{label:"题目名"}},[n("el-input",{attrs:{placeholder:"请输入题目",clearable:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1)],1),e._v(" "),n("el-col",{attrs:{offset:12,span:4}},[n("el-button",{attrs:{"mc-type":"column-el-button",size:"mini",type:"primary"},on:{click:function(t){return e._findCollect()}}},[e._v("查询")])],1)],1)],1)],1),e._v(" "),n("el-card",[n("el-table",{attrs:{data:e.tableList,fit:!0,"show-header":!0}},[n("el-table-column",{attrs:{prop:"name",label:"试题名"}}),e._v(" "),n("el-table-column",{attrs:{prop:"score",label:"分数"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",fixed:"right",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{"mc-type":"column-el-button",size:"mini",type:"primary"},on:{click:function(n){return e.toDeital(t.row)}}},[e._v("查看题目")])]}}])})],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"详情",visible:e.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(t){e.centerDialogVisible=t}}},[n("aside",{ref:"answerDiv",staticClass:"answerClass"}),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.centerDialogVisible=!1}}},[e._v("关 闭")])],1)])],1)},staticRenderFns:[]};var i=n("VU/8")(a,l,!1,function(e){n("u7sI")},"data-v-3fe8b162",null);t.default=i.exports},u7sI:function(e,t){}});
//# sourceMappingURL=6.c0860e236c4ace5c8286.js.map