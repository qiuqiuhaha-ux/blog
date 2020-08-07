<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="标题"
        width="180"
        prop="title">
      </el-table-column>
      <el-table-column
        label="时间"
        width="200"
        prop="date">
      </el-table-column>
      <el-table-column
        label="类型"
        width="180"
        prop="type">
      </el-table-column>
      <el-table-column
        label="分类"
        width="180"
        prop="tag">
      </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)" :lockScroll='false'>编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="5"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import change from '../../../components/changed'
import request from '../../../api/index'
let articleChanged = request.articleChanged
let articleDelet = request.articleDelet
let articleRedactA = request.articleRedactA
export default {
  name:"artiveDelet",
  data() {
    return {
      tableData: [],
      total:0
    }
  },
  components:{change},
  methods: {
    //编辑
    handleEdit(index, row) {
      const h = this.$createElement;
      this.$msgbox({
        message: h(change),
        showCancelButton: false,
        showConfirmButton:false,
      })
      articleRedactA(row._id).then(res=>{
      })
    },
    //点击删除
    handleDelete(index, row) {
      articleDelet(row._id).then((res)=>{
        if(res.data.code === 0){
          this.$message({
            message:"删除成功",
            type:"success",
            duration:2000
          })
          this.tableData.splice(index,1)
        }
      })
    },
    //分页
    currentChange(skip){
      articleChanged(5*(skip-1)).then(res=>{
        this.tableData = res.data.data
      })
    }
  },
  mounted() {
    articleChanged().then((res)=>{
        this.tableData = res.data.data
        this.total = res.data.num
    })
    
  },
}
</script>
<style lang="less" scoped>
  /deep/.el-button--primary{
  position: absolute;
  top: -620px;
  right: 0;

}
</style>