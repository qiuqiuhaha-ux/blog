<template>
    <div class="nav">
      <div class="nav-main">
          <div class="n-m-logo">
              <img src="../assets/img/1.jpg" alt="">
          </div>
          <div class="n-m-right">
            <ul class="n-m-nav" :class="'list'+add">
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/blog/0">博客</router-link></li>
              <li><router-link to="/message">留言</router-link></li>
              <li><router-link to="/diary">日记</router-link></li>
              <li><router-link to="/links">友联</router-link></li>
              <li><router-link to="/about">关于</router-link></li>
           </ul>
           <el-row class="button">
             <div v-if="iflogin" class="user">
               <ul>
                 <li><p>{{login.user}}</p></li>
                 <li><img :src="login.img" alt=""></li>
                 <li class="list">
                   <p><change></change></p>
                   <p @click="out">退出登录</p>
                 </li>
               </ul>
             </div>
             <div v-else>
               <el-button type="primary" @click="sign">登录</el-button>
               <el-button type="success" @click="open">注册</el-button>
             </div>
           </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import request from '../ajax/axios'
import Register from "./Register"
import Login from "./login"
import change from '../components/change'
let getIfLogin = request.getIfLogin
let getOut = request.getOut
export default {
    name:"Nav",
    data(){
      return {
        /*路由信息*/
        routerList:["Home","Blog","Message","Diary","Links","About"],

        //弹窗key值
        alertKey : 0,
        //是否登录
        iflogin:false,
        login :{
          user:"",
          img:""
        }
        //退出登录
      }
    },
    computed:{
      add(){
        /*获取点击路由的序号*/
        let index=this.routerList.indexOf(this.$route.name)
        return index+1
      }
    },
    components:{
      Register,change
    },
    methods:{
      //注册
      open() {
        const h = this.$createElement;
        this.$msgbox({
          title: '注册',
          message: h(Register,{key:this.alertKey++}),
          showCancelButton: false,
          showConfirmButton : false,
          closeOnClickModal : false
        }).then(()=>{}).catch(()=>{});
      },
      //登录
      sign(){
        const h = this.$createElement;
        this.$msgbox({
          title: '登录',
          message: h(Login,{key:this.alertKey++}),
          showCancelButton: false,
          showConfirmButton : false,
          closeOnClickModal : false
        }).then(()=>{}).catch(()=>{});
      },
      //退出
      out(){
        getOut().then((res)=>{
          setTimeout(()=>{
            window.location.reload()
          },100)
        })
      }
    },
    created(){
      getIfLogin().then(res=>{
        if(res.data.userInfo){
          this.iflogin = true
          this.login.user = res.data.userInfo.user
          this.login.img = res.data.userInfo.photo 
        }else{
          this.iflogin = false
        }
      }).catch()
    },
  }
</script>
<style lang="less" scoped>
 .nav{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #e8e9e7;
    .nav-main{   
        width: 100%;
        max-width: 1350px;
        height: 60px;
        margin: 0 auto;
        padding: 0 50px;
        .n-m-logo{
            float: left;
            width: 60px;
            height: 60px;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
        }
        .n-m-right{
            display: flex;
            float:right;
            width: 900px;
            .n-m-nav{
                width: 600px;
                height: 60px;
                margin-right: 18px;
                li{
                    position: relative;
                    float: left;
                    width: 100px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    cursor: pointer;
                    &:hover a{
                        color:#6bc30d
                    }
                    a{              
                        color: black;
                        font-size: 14px;
                        font-weight: 500;
                        transition: .6s;                 
                    }
                    &::after{
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        margin: 0 auto 0;
                        content: "";
                        width: 0;
                        height: 2px;
                        background-color: #6bc30d;
                        transition:  width .5s;
                        }      
                    &:hover{
                        color: #6bc30d;
                        &::after{
                            width: 100%;
                        }
                    }
                }
                &.list1 li:nth-child(1),
                &.list2 li:nth-child(2),
                &.list3 li:nth-child(3),
                &.list4 li:nth-child(4),
                &.list5 li:nth-child(5),
                &.list6 li:nth-child(6){
                    a{
                        color:#6bc30d;
                    }
                    &::after{
                        width: 100%;
                        content:"";
                    }   
                }
            }
            .button{
              position: absolute;
              right: 28px;
              height: 60px;
              line-height: 60px;
              .user{
                position: relative;
                right: 40px;
                cursor: pointer;
                text-align: center;
                ul{
                  overflow: hidden;
                  &:hover li.list{
                    display: block;
                  }
                  li.list{
                    display: none;
                    overflow: hidden;
                    position: absolute;
                    top: 60px;
                    right: -30px;
                    width: 100px;
                    height: 60px;
                    background-color: cornsilk;
                    user-select: none;
                    p{
                      position: relative;
                      top: 20px;
                      width: 100%;
                      height: 30px;
                      margin-bottom: 20px;
                      text-align: center;
                      line-height: 30px;
                      &:hover{
                        background-color: cornflowerblue;
                        opacity: .9;
                      }
                    }
                  }
                  li{
                    p{
                      margin: -20px 0 0 0;
                      font-size: 12px;
                      height: 20px;
                    }
                    img{
                      margin: 18px 0 0 0;
                      width: 40px;
                      height: 40px;
                      border-radius: 50%;
                    }
                  }
                }
              }
            }
        }
    }
    @media all and (max-width: 977px){
      .nav-main{
        padding: 0 20px;
        .n-m-logo{
          display: none;
          float: none;
        }
        .n-m-right{
          position: relative;
          width: 100%;
          box-sizing: border-box;
          padding: 0 20px;
          .n-m-nav{
            position: absolute;
            top: 0;
            right: 0;
            width: 60px;
            text-align: center;
            border-radius: 50%;
            &::before{
              content:"导航";
              height: 60px;
              width: 60px;
              line-height: 60px;
            };
            li{
              position: relative;
              margin: 0;
              display: none;
              width: 100%;
              background-color: #fff;
              float: none;
            }
            &:hover li{
              display: block;
            }
          }
          .button{
            position: relative;
            right: 10px;
            top: 0;
            .user{
              position: relative;
              right: -10px;
              top: 0px;
            }
          }
        }
      }
    }
 }
</style>