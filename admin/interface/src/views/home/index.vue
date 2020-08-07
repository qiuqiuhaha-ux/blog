<template>
  <el-row class="tac">
    <el-container>
      <el-aside width="200px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-row>
</template>
<script>
import Menu from '../home/list/index'
export default {
  name:"home",
  components:{
    Menu
  }
  // methods: {
  //   handleOpen(key, keyPath) {
  //     console.log(key, keyPath);
  //   },
  //   handleClose(key, keyPath) {
  //     console.log(key, keyPath);
  //   }
  // }
}
</script>
<style lang="less" scoped>
  .el-aside{
   height: 100vh;
   background-color: rgb(84,92,100);
   .el-col{
     width: 100%;
   }
  }
</style>