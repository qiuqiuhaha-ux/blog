<template>
   <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="时间"
      width="200"
      prop="date">
    </el-table-column>
    <el-table-column
      label="内容"
      width="180"
      prop="content">
    </el-table-column>
    <el-table-column
      label="图片"
      width="180">
      <template slot-scope="scope">
        <img v-if="scope.row.surface" :src="scope.row.surface" alt="">
      </template>
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
let diaryDelet = request.diaryDelet
export default {
  name:"diaryDelet",
  data(){
    return {
      tableData:[]
    }
  },
  methods: {
    handleDelete(index,row){
      diaryDelet(row._id).then((res)=>{
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
    diaryDelet().then((res)=>{
      this.tableData = res.data.data
    })
  },
}
</script>
<style lang="less" scoped>
  img{
    width: 80px;
    height: 80px;
  }
</style>