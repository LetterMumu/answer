webpackJsonp([2],{JZK7:function(e,t){},kiIE:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r("P9l9"),s={data:function(){return{tableList:[],userName:"",userId:"",newForm:{userName:"",userId:""},dialogFormVisible:!1}},mounted:function(){this._findUser()},methods:{_findUser:function(){var e=this;Object(l.j)({userName:this.userName,userId:this.userId}).then(function(t){0==t.code?e.tableList=t.data:e.$message.error(t.msg)})},_addUser:function(){var e=this;Object(l.b)(this.newForm).then(function(t){0==t.code?(e._findUser(),e.$message.success("创建成功"),e.dialogFormVisible=!1):e.$message.error(t.msg)})},_delUser:function(e){var t=this;Object(l.e)({userId:e}).then(function(e){0==e.code?t._findUser():t.$message.error(e.msg)})},toStudent:function(e){this.$router.push({name:"addStudent",params:{id:e}})}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",[r("el-card",{attrs:{header:"用户管理"}},[r("el-row",[r("el-form",{staticClass:"formStyle1"},[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"用户名"}},[r("el-input",{attrs:{placeholder:"请输入用户名",clearable:""},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"用户标识"}},[r("el-input",{attrs:{placeholder:"请输入用户标识",clearable:""},model:{value:e.userId,callback:function(t){e.userId=t},expression:"userId"}})],1)],1),e._v(" "),r("el-col",{attrs:{offset:4,span:4}},[r("el-button",{attrs:{"mc-type":"column-el-button",size:"mini",type:"primary"},on:{click:function(t){return e._findUser()}}},[e._v("查询")]),e._v(" "),r("el-button",{attrs:{"mc-type":"column-el-button",size:"mini",type:"primary"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("新增")])],1)],1)],1)],1),e._v(" "),r("el-card",[r("el-table",{attrs:{data:e.tableList,fit:!0,"show-header":!0,"max-height":"121px"}},[r("el-table-column",{attrs:{prop:"userName",label:"用户名"}}),e._v(" "),r("el-table-column",{attrs:{prop:"userId",label:"用户标识"}}),e._v(" "),r("el-table-column",{attrs:{label:"操作",fixed:"right",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{"mc-type":"column-el-button",size:"mini",type:"danger"},on:{click:function(r){return e._delUser(t.row.userId)}}},[e._v("删除")]),e._v(" "),r("el-button",{attrs:{"mc-type":"column-el-button",size:"mini",type:"primary"},on:{click:function(r){return e.toStudent(t.row.userId)}}},[e._v("查看学生")])]}}])})],1)],1),e._v(" "),r("el-dialog",{attrs:{title:"新增用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{attrs:{model:e.newForm}},[r("el-form-item",{attrs:{label:"用户名"}},[r("el-input",{attrs:{placeholder:"请输入用户名",clearable:""},model:{value:e.newForm.userName,callback:function(t){e.$set(e.newForm,"userName",t)},expression:"newForm.userName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"用户标识"}},[r("el-input",{attrs:{placeholder:"请输入用户标识",clearable:""},model:{value:e.newForm.userId,callback:function(t){e.$set(e.newForm,"userId",t)},expression:"newForm.userId"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e._addUser()}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var n=r("VU/8")(s,a,!1,function(e){r("JZK7")},"data-v-eb1b1be6",null);t.default=n.exports}});
//# sourceMappingURL=2.308ba53ebae957c0d128.js.map