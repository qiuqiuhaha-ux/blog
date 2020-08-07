<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <h1>添加友情链接</h1>
    <el-form-item label="名称" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="网址" prop="guide">
      <el-input v-model="form.guide"></el-input>
    </el-form-item>
    <el-form-item label="图片地址" prop="img">
      <el-input v-model="form.img"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="content">
      <el-input v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button id="button" type="primary" @click="submitForm('form')">发表</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import request from '../../../api/index'
let linkAdd = request.linkAdd
export default {
  name:"linkS",
  data(){
    return {
      form:{
        title:"",
        guide:"",
        img:"",
        content:""
      },
      rules:{
        title:[{required:true,message:'请输入名称'}],
        guide:[{required:true,message:'请输入网址'}],
        img:[{required:true,message:'请输入图片地址'}],
        content:[{required:true,message:'请输入描述'}]
      }
    }
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          linkAdd({
            title:this.form.title,
            guide:this.form.guide,
            img:this.form.img,
            content:this.form.content
          }).then((res)=>{
            if(res.data.code===0){
              this.$message({
                message:"发表成功",
                type:"success",
                duration:2000
              })
              setTimeout(()=>{
                window.location.reload()
              },1000)
            }else{
              this.$message({
                message:res.data.msg,
                type:"success",
                duration:2000
              })
            }
          })
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
  
</style>