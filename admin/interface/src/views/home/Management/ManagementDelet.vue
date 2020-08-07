<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="时间"
        width="200"
        prop="date">
      </el-table-column>
      <el-table-column
        label="用户"
        width="180"
        prop="user.user">
      </el-table-column>
      <el-table-column
        label="留言"
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
  </div>
</template>
<script>
import request from "../../../api/index"
let contentDelet = request.contentDelet
export default {
  name:"artive",
  data(){
    return {
      tableData:[]
    }
  },
  methods: {
    handleDelete(index,row){
      contentDelet(row._id).then((res)=>{
        if(res.data.code===0){
          this.$message({
            message:"删除成功",
            type:"success",
            duration:2000
          })
          setTimeout(()=>{
            window.location.reload()
          },1000)
        }
      })
    },
  },
  mounted() {
    contentDelet().then((res)=>{
      this.tableData = res.data.data
    })
  },
}
</script>
<style lang="less" scoped>
  
</style>