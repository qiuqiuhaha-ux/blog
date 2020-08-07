<template>
  <div class="register">
    <div :class="['reg',{'re': show}]">{{text}}</div>
    <!-- ref是可以通过$refs获取这个dom元素 -->
    <el-form  ref="form"  :model="form"  label-width="80px"  :rules="rules">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input v-model="form.checkPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verification"  class="code">
        <el-input v-model="form.verification" type="input"></el-input>
        <div class="svg" v-html="register.svg"></div>
        <el-link type="primary" @click="Refresh" :disabled="register.disabled">{{register.refreshText}}</el-link>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('form')">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import request from '../ajax/axios'
  let getVerification = request.getVerification
  let getVcode = request.getVcode
  let getRegister = request.getRegister
  export default {
    name:"Register",
    //数据
    data() {
      return {
        show:false,
        text:"",
        form:{
          user:"",
          pwd:"",
          checkPwd:"",
          verification:"",
        },
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
          //确认密码
          checkPwd:{
            validator:(rule,value,cb)=>{
              if (value){
                if (value === this.form.pwd) {
                  cb();
                }else{
                  cb(new Error("您两次密码都不一样[○･｀Д´･ ○]"));
                }
              }else{
                cb(new Error("请再次输入密码( ´◔ ‸◔`)"));
              }
            },
            required:true
          },
          //验证码
          verification:{
             validator:(rule,value,cb)=>{
              if(!value){
                cb(new Error("请输入验证码哦~"))
              }else{
                getVcode(value).then(res=>{
                  if(res.data.code === 2){
                    cb()
                  }else{
                    cb(new Error("验证码错了哦Ծ‸Ծ"))
                  }
                })
              }
            }
          }
        },
        //注册相关的数据
        register : {
          svg : "loading...",
          refreshText : "刷新",
          disabled : true,
          timer : null,
          submitDisabled : false
        }
      } 
    },
    //事件
    methods:{
      //刷新验证码
      Refresh(){
        getVerification().then((res=>{
          clearTimeout(this.register.timer);
          let t = 0;
          let fn = ()=>{
            t+=1000;
            if (t > res.data.time){
              clearTimeout(this.register.timer);
              this.register.disabled = false;
              this.register.refreshText = "刷新";
            }else{
              this.register.disabled = true;
              this.register.refreshText = (((res.data.time - t)/1000)|0) + "s后可以刷新";
            }
          };
          this.register.timer = setInterval(fn,1000);
          fn();
          this.register.svg = res.data.data
        }))
      },
      //注册点击事件
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {  
          if (valid) {
            getRegister(this.form).then(res=>{
              if(res.data.code === 2){
                setTimeout(()=>{
                  this.text="用户名重复"
                  this.show=true
                },100)
                setTimeout(()=>{
                  this.show=false
                },4000)
              }else{
                setTimeout(()=>{
                    this.text="注册成功"
                    this.show=true
                },100)
                setTimeout(()=>{
                  window.location.reload()
                },2000)
              }
            })
          } else {
            if(!this.form.user||!this.form.pwd||!this.form.checkPwd||!this.form.verification){
              alert("请输入")
            }return
          }
        });
      },
    },
    //组件加载的时候执行
    mounted(){
      this.Refresh()
    },
    destroyed() {
      clearTimeout(this.register.timer);
    }
  }
</script>
<style lang="less" scoped>

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
  .code{
    .el-input{
      width: 30%;
    }
    div{
      float: left;
      width: 30%;
      height: 40px;
      text-align: center;
    }
    /deep/ svg{
      width: 100%;
      height: 40px;
    }
    p{
      user-select: none;
      float: left;
      width: 25%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      cursor: pointer;
    }
    /deep/ #elastic{
      width: 100px;
      height: 20px;
      background-color: black;
    }
  }
</style>