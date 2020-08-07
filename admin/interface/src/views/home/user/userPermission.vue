<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="用户"
      width="180"
      prop="user"
      >
    </el-table-column>
    <el-table-column
      label="是否禁言"
      width="180">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.disabled" @change="disable(scope.row.disabled,scope.$index)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="是否为管理员"
      width="180">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.admin" @change="admin(scope.row.admin,scope.$index)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">保存</el-button>
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
let userJurisdiction = request.userJurisdiction
let userDelet = request.userDelet
export default {
  name:"artive",
  data(){
    return {
      tableData:[],
    }
  },
  methods: {
    //保存时候的操作
    handleEdit(index,row){
      userJurisdiction(row._id,row.disabled,row.admin).then((res)=>{
        if(res.data.code === 0){
          this.$message({
            message:res.data.msg,
            type:"success",
            duration:2000
          })
        }else{
          this.$message({
            message:res.data.msg,
            type:"success",
            duration:2000
          })
        }
      })
    },
    disable(valus,index){
      this.tableData.disabled = valus
    },
    admin(valus,index){   
      this.tableData.admin = valus
    },
    //删除的操作
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userDelet(row._id).then(res=>{
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration:2000
          });
          setTimeout(()=>{
            window.location.reload()
          },1000)  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  mounted() {
    userJurisdiction().then((res)=>{
      this.tableData =JSON.parse(JSON.stringify(res.data.data))
    })
  },
}
</script>
<style lang="less" scoped>
  
</style>