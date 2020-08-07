<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules">
    <h1>添加日记</h1>
    <el-form-item label="内容" prop="content">
      <TextA ref="richText" :value="form.content"></TextA>
    </el-form-item>
    <el-form-item label="上传图片" prop="pic">
      <Upload @uploadSuccess="uploadSuccess"></Upload>
    </el-form-item>
    <el-form-item>
    <el-button id="button" type="primary" @click="submitForm('form')">发表</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import TextA from '../../../components/TextA'
import Upload from '../../../components/Upload'
import request from '../../../api/index'
let diaryAdd = request.diaryAdd
export default {
  data(){
    return {
      form:{ 
        content:"",
        pic:""
      },
      rules:{
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
          diaryAdd({
            content:(function(){
              return this.layedit.getContent(this.index)
            }).call(this.$refs.richText),
            surface:this.form.pic
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
}
</script>
<style lang="less" scoped>
  
</style>