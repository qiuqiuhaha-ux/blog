(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21e175"],{d3a1:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{label:"时间",width:"200",prop:"date"}}),a("el-table-column",{attrs:{label:"用户",width:"180",prop:"user.user"}}),a("el-table-column",{attrs:{label:"留言",width:"180",prop:"content"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1)},l=[],o=a("365c"),c=o["a"].contentDelet,i={name:"artive",data:function(){return{tableData:[]}},methods:{handleDelete:function(t,e){var a=this;c(e._id).then((function(t){0===t.data.code&&(a.$message({message:"删除成功",type:"success",duration:2e3}),setTimeout((function(){window.location.reload()}),1e3))}))}},mounted:function(){var t=this;c().then((function(e){t.tableData=e.data.data}))}},u=i,r=a("2877"),s=Object(r["a"])(u,n,l,!1,null,"165e18c0",null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d21e175.98bf94a3.js.map