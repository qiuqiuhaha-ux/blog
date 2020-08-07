<template>
  <div class="left">
    <section v-for="item in articlist">
      <div class="title">
        <h3>【{{item.type}}】</h3>
        <router-link @click.native="pvAdd(item._id)" :to="'/article/'+item._id">{{item.title}}</router-link>
        <hr>
      </div>
      <div class="time">
        <p class="date">{{item.date | date}}</p>
        <span class="month">{{item.date | month}}月</span>
        <span class="year">{{item.date | year}}</span>
      </div>
      <div class="pic">
        <router-link :to="'/article/'+item._id" :style="{backgroundImage:'url('+item.surface+')'}">
          <i></i>
        </router-link>
        <span v-html="item.content"></span>
      </div>
      <div class="continue">
        <span class="continue-reading"><router-link :to="'/article/'+item._id">继续阅读</router-link></span>
        <hr>
      </div>
      <div class="tag">
        <img src="../icon/icon1.png" alt="">
        <span>{{item.tag}}</span>
      </div>
      <div class="message">
        <span class="left">
          <img src="../icon/icon3.png" alt="">
          <span>{{item.pv}}</span>
        </span>
        <span class="right">
          <img src="../icon/icon2.png" alt="">
          <span>{{item.comment.length}}</span>
        </span>
      </div>
    </section>
    <p v-if="nomore" class="foot">我可是有底线的~</p>
    <div v-if="loding" class="lodding">
      <span>加载中，稍等哦亲...</span>
    </div>
  </div>
</template>
<script>
import request from '../ajax/axios'
const getArticleShow = request.getArticleShow
const getPv = request.getPv
export default {
  name:"left",
  data(){
    return {
      //文章的显示
      articlist:[],
      //底线的显示与否
      nomore : false,
      //loding的显示
      loding : false,
      router:""
    }
  },
  //处理日期,过滤
  filters:{
    date(value){
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3]
    },
    month(value){
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2]
    },
    year(value){
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1]
    }
  },
  //处理完返回给data
  computed: {
    id(){
      return this.$route.params.id
    }
  },
  //刷新页面的时候执行
  watch: {
    id(){
      //当id发生变化的时候，刷新页面
      this.getArticleShowFresh()
      document.documentElement.scrollTop = 0;
    }
  },
  //执行函数
  methods: {
    getArticleShowFresh(){
      this.nomore = this.loding = false
      getArticleShow(this.id,true).then(res=>{
        this.articlist = res.data.data
      })
    },
    //滚轮滚动的时候往下面加载新的页面
    handleScroll(){
      // if (this.nomore || this.loding)return;

      //滚动的高度
      let a = document.documentElement.scrollTop
      //可视区域的高度
      let b = document.documentElement.clientHeight
      //页面底部的距离
      let c = document.documentElement.offsetHeight
      if(a+b >= c-100){
        this.loding = true
        getArticleShow(this.id,false).then(res=>{
          this.loding = false
          let data = res.data.data
          if(data.length){
            this.articlist.push(...res.data.data)
          }else{
            this.nomore = true
          }
        })
      }
    },
    //点击增加pv
    pvAdd(id){
      getPv(id).then(data=>{
      })
    }
  },
  mounted(){
    //根据当前id发送请求
    this.getArticleShowFresh()
    window.addEventListener("scroll",this.handleScroll)
  },
  destroyed() {
      //移除监听滚动事件
      window.removeEventListener("scroll",this.handleScroll);
  }
}
</script>
<style lang="less" scoped>
.left{
  section{
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    max-width: 935px;
    width: 100%;
    padding: 20px 10px 25px;
    margin-bottom: 20px;
    background-color: beige;
    animation:show 2s 1;
    animation-fill-mode: forwards;
    @keyframes show{
      from{opacity: 0; transform: scale(.5)}
      to{opacity: 1; transform: scale(1);}
    }
    .title{
      box-sizing: border-box;
      padding: 0 0 0 40px;
      width: 100%;
      height: 60px;
      line-height: 60px;
      hr{
        width: 80%;
        margin: -8px 0 0 0;
        opacity: .5;
      }
      h3{
        width:70px;
        color: rgb(13, 250, 250);
      }
      a{
        display: block;
        float: left;
        width: 100%;
        margin: -60px 0 0 80px;
        font-size: 20px;
        color: #000;
        &:hover{
          color: #6bc30d;
        }
      }
    }
    .time{
      position: absolute;
      right: 55px;
      top: 20px;
      width: 90px;
      height: 70px;
      .date{
        width: 20px;
        height: 40px;
        margin: 0 0 0 26px;
        color: rgb(107,195,13);
        font-size: 30px;
        font-weight: 800;
        line-height: 40px;
      }
      .month{
        color: gray;
      }
      .year{
        position: absolute;
        right: 10px;
        color: gray;
      }
    }
    .pic{
      height: 180px;
      margin: 15px 0 0 40px;
      a{
        overflow: hidden;
        position: relative;
        display: inline-block;
        width: 300px;
        height: 180px;
        background-position: center;
        background-size: cover;
        i{
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 0;
          height: 100%;
          transform: translateX(-100px) skew(-40deg);
          box-shadow: 0 0 30px 20px rgba(255,255,255,.4);
        }
        &:hover i{
          transition: .5s;
          transform: translateX(1000px) skew(-40deg);
        }
      }
      span{
        overflow: hidden;
        position: absolute;
        left: 365px;
        height: 16px;
        width: 40%;
        display: inline-block;
        word-wrap:break-word;
        white-space: nowrap;
        text-overflow:ellipsis;
        -webkit-line-clamp: 1;
      }
    }
    .continue{
      .continue-reading{
        display: inline-block;
        margin: 12px 0 0 40px;
        font-weight: 800;
        cursor: pointer;      
      }
       hr{
          margin: -8px 0 0 140px;
          width: 80%;
          opacity: .5;
        }
    }
    .tag{
      position: relative;
      margin: 25px 0 0 60px;
      width: 150px;
      text-align: center;
      img{
        position: absolute;
        top: -6px;
        left: -3px;
        width: 40px;
        height: 35px;
      }
      span{
        box-sizing: border-box;
        display: inline-block;
        padding: 2px 8px;
        background-color: gray;
        opacity: .6;
        transition: .3s;
        &:hover{
          background-color: rgb(107,195,13);
          opacity: .8;
        }
      }
    }
    .message{
      position: absolute;
      right: 60px;
      top: 327px;
      width: 110px;
      height: 60px;
      .left{
        height: 40px;
        width: 65px;
        img{
          width: 20px;
          height: 15px;
        }
        span{
          position: absolute;
          top: 1px;
          width: 35px;
        }
      }
      .right{
        display: inline-block;
        float: right;
        img{
          width: 20px;
          height: 15px;
        }
        span{
          position: absolute;
          top: 1px;
          display: inline-block;
          cursor: pointer;
          transition: .5s;
          &:hover{
            color: rgb(107,195,13);
            cursor: pointer;
            border-bottom: 1px solid rgb(107,195,13);
          }
        }
      }
    }
  }
  p.foot{
    width: 300px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: rgb(48, 51, 51);
    border-radius: 30%;
    margin: 0 auto;
    background-color: darkgrey;
  }
  .lodding{
    position: relative;
    width: 130px;
    height: 80px;
    margin: 0 auto;
  }
}
 
</style>