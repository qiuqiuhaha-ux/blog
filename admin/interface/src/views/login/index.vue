<template>
  <div class="register">
    <h1>后台登录界面</h1>
    <div :class="['reg',{'re': show}]">{{text}}</div>
    <!-- ref是可以通过$refs获取这个dom元素 -->
    <el-form  ref="form"  :model="form"  label-width="80px"  :rules="rules">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('form')">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import request from '../../api/index'
  let login = request.login
  export default {
    name:"Register",
    //数据
    data() {
      return {
        form:{
          user:"",
          pwd:"",
        },
        show:false,
        text:"",
        rules:{
          //用户名验证
          user:[
            {required:true,message:'请输入您霸气的名字୧(๑•̀◡•́๑)૭',trigger:'blur'},
            {
              //数据类型
              type:'string',
              // 正则规则
              pattern:/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
              message:'2-7位，数字 字母 下划线 中日韩文ᶘ ͡°ᴥ͡°ᶅ',
              trigger:["blur","change"]
            }
          ],
          //密码验证
          pwd:{
            required:true,
            validator:(rule,value,cb)=>{
              if (value){
                if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)) {
                  cb();
                }else{
                  cb(new Error("6-18位，不允许出现奇怪的字符哦⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄"));
                }
              }else{
                cb(new Error("没密码可不能登录Σ(⊙▽⊙\""));
              }
              this.form.checkPwd && this.$refs.form.validateField("checkPwd");
            },
            type:"string", 
            trigger: ['blur','change'],
          },
        },
      } 
    },
    //事件
    methods:{
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            login(this.form.user,this.form.pwd).then((res)=>{
              if(res.data.code===0){
                this.$message({
                  message:"登录成功",
                  type:"success",
                  duration:2000
                })
                this.$router.push("/admin")
                setTimeout(()=>{
                  window.location.reload()
                },1000)
              }else{
                this.$message({
                  message:res.data.msg,
                  type:"error",
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
.register{
  height: 100%;
  overflow: hidden;
  background-color: rgba(0,0,0,0.7);
  h1{
    position: relative;
    top: 100px;
    left: 30px;
    text-align: center;
    color: seashell;
  }
  .el-form{
    margin: 200px auto 31%;
    width: 300px;
    /deep/.el-form-item__label{
      color: seashell;
    }
  }
}

.reg{
   position: relative;
   top: -80px;
   width: 200px;
   margin: 0 auto;
   text-align: center;
   color: blanchedalmond;
   background-color: black;
   border-radius: 10%;
   opacity: .6;
   transition: 1S;
   &.re{
     top: -40px;
   }
 }
</style>