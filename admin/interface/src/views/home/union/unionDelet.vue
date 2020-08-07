<template>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="名字"
      width="180"
      prop="title">
    </el-table-column>
    <el-table-column
      label="图片地址"
      width="180"
      prop="img">
    </el-table-column>
    <el-table-column
      label="网址"
      width="180"
      prop="guide">
    </el-table-column>
    <el-table-column
      label="描述"
      width="180"
      prop="content">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import request from '../../../api/index'
let linkDelet = request.linkDelet
export default {
  name:"artive",
  data(){
    return {
      tableData:[]
    }
  },
  methods: {
    handleDelete(index,row){
      linkDelet(row._id).then((res)=>{
        if(res.data.code===0){
          this.$message({
            message:"删除成功",
            type:"success",
            duration:2000
          })
          setTimeout(()=>{
            window.location.reload()
          },1000)
        }else{
          this.$message({
            message:data.data.msg,
            type:"success",
            duration:2000
          })
        }
      })
    }
  },
  mounted() {
    linkDelet().then((res)=>{
      this.tableData = res.data.data
    })
  },
}
</script>
<style lang="less" scoped>
  
</style>