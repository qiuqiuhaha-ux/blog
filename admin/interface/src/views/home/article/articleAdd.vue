<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <el-form-item label="类型" prop="type">
      <el-select v-model="form.type" placeholder="请选择活动区域">
        <el-option label="原创" value="原创"></el-option>
        <el-option label="转载" value="转载"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="分类" prop="region">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="HTML&CSS" value="HTML&CSS"></el-option>
        <el-option label="JavaScript" value="JavaScript"></el-option>
        <el-option label="Node.js" value="Node.js"></el-option>
        <el-option label="Vue.js" value="Vue.js"></el-option>
        <el-option label="Other" value="Other"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <TextA ref="richText" :value="form.content"></TextA>
    </el-form-item>
    <el-form-item label="上传图片" prop="pic">
      <Upload @uploadSuccess="uploadSuccess"></Upload>
    </el-form-item>
    <el-form-item>
    <el-button id="button" type="primary" @click="submitForm('form')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import TextA from '../../../components/TextA'
import Upload from '../../../components/Upload'
import request from '../../../api/index'
let article = request.article
export default {
  name:"artive",
  data(){
    return {
      form:{
        title:"",
        region:"",
        type:"",
        content:"",
        pic:""
      },
      rules:{
        type:[{required:true,message:'请选择类型'}],
        title:[{required:true,message:'请选择标题'}],
        region:[{required:true,message:'请选择类型'}],
        content : {
          validator : (rule,value,cb)=>{
            (function(){
              if (this.layedit.getContent(this.index)) {
                cb();
              }else{
                cb(new Error("请输入文章内容！"));
              }
            }).call(this.$refs.richText);
          },
          required : true
        },

      }
    }
  },
  components:{
    TextA,Upload
  },
  methods: {
    uploadSuccess(url){
      this.form.pic = url;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          article({
            type:this.form.type,
            title:this.form.title,
            content:(function(){
              return this.layedit.getContent(this.index)
            }).call(this.$refs.richText),
            region:this.form.region,
            pic:this.form.pic
          }).then(data=>{
            if(data.data.code===0){
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
                message:data.data.msg,
                type:"success",
                duration:2000
              })
            }
          })
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    
  },
}
</script>
<style lang="less" scoped>
</style>