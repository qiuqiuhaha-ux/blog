<template>
  <div class="Main">
    <div class="m-body">
      <div class="m-left">
        <LeftSidebar></LeftSidebar>
      </div>
      <div class="m-right">
        <div class="m-r-article">
          <div :class="{'coverList':roll}">
            <div class="m-r-search">
              <i class="img"></i>
              <input v-model="value" @input="searchCriteria()" type="text" placeholder="请输入搜索文章">
              <ul :class="{'search':articleSearch}">
                <li v-for="item in articleContent" :key="item._id"><router-link :to="'/article/'+item._id">{{item.title}}</router-link></li>
              </ul>
            </div>
            <div class="m-r-a-list">
              <ul :class="{'coverList':roll}" @mouseleave="handleMouseleave">
                <li class="list" @mouseenter="handleMouseenter(index)" v-for="(item,index) in getArticleTags"><router-link :to="'/blog/'+index">{{item}}</router-link></li>
                <li class='cover' :style="{top:coverTop*50+'px'}"></li>
              </ul>
            </div>
          </div>
          <div class="hot">
            <h3>热门文章</h3>
            <ul>
              <li v-for="(item,index) in articleHot">
                <span>{{index+1}}</span>
                <router-link :to="'/article/'+item._id">{{item.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="m-r-placement">
          <h3>置顶推荐</h3>
          <ul>
            <li v-if="!!getArticleHot.title">
              <i>{{1}}</i>
              <router-link :to="'/article/'+getArticleHot._id">{{getArticleHot.title}}</router-link>
            </li>
          </ul>
        </div>
        <div class="m-r-visitor">
          <h3>最近访客</h3>
          <ul>
            <li v-for="item in visitor" :key="item._id" :style="{backgroundImage:'url('+item.user.photo+')'}">
              <i>{{item.user.user}}</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import LeftSidebar from './LeftSidebar'
 import request from '../ajax/axios.js'
 let getArticleInfo = request.getArticleInfo
 let getArticleHot = request.getArticleHot
 let getArticleSearch = request.getArticleSearch
 let getVisitor = request.getVisitor
export default {
  name:"Main",
  components:{
    LeftSidebar
  },
  data(){
    return {
      /*文章分类*/
      articleTags:[],
      value:this.inputName,
      //搜索框的内容
      articleSearch:false,
      articleContent:[],
      /*判断侧边栏掉落，有没有名字*/
      roll:false,

      /*热门分类*/
      articleHot:[],
      
      /*距离顶部的位置*/
      coverTop:this.$route.params.id*1,
      /*访客的数据*/
      visitor:[]
    }
  },
  /*把data的数据提前处理好在给data*/
  computed:{
    /*接受生命周期里面传递来到的值*/
    getArticleTags(){
      return ["全部文章",...this.articleTags]
    },
    getArticleHot(){
      return this.articleHot[0] || {};
    }
  },
  /*事件函数*/
  methods:{
      /*移入的时候改变top*/
      handleMouseenter(index){
        this.coverTop=index
      },
      /*移出的时候回到顶部*/
      handleMouseleave(){
        this.coverTop=this.$route.params.id*1
      },
      getScroll(){
        this.roll = document.documentElement.scrollTop>=1350
      },
      //监听input事件
      searchCriteria(){
        let value = this.value
        setTimeout(()=>{
          if(value){
            getArticleSearch(value).then(res=>{
              this.articleContent = res.data.data
              this.articleSearch = true
            })
          }else{
            this.articleContent = []
            this.articleSearch = false
          }
        },1000)
      }
  },
  /*生命周期*/
  created(){
    /*从后端拿的数据*/
    getArticleInfo().then(res=>{
      this.articleTags = res.data.data.type
    });
    getArticleHot().then(res=>{
      this.articleHot = res.data.data
    })
    //访问人数
    getVisitor().then(res=>{
      this.visitor = res.data.data
    })
  },
  mounted() {
    this.getScroll()
    window.addEventListener("scroll",this.getScroll)
  },
}
</script>
<style lang="less">
  .Main{
    padding-top: 80px;
    width: 100%;
    user-select: none;
    .m-body{
      position: relative;
      display: flex;
      box-sizing: border-box;
      width: 100%;
      max-width: 1360px;
      margin: 0 auto;
      padding: 0 50px;
      .m-left{
        max-width: 925px;
        width: 100%;
        margin-left: -18px;
      }
      .m-right{
        position: relative;
        top: 0;
        right: -45px;
        width: 300px;
          .m-r-search{
            position: relative;
            width: 100%;
            height: 80px;
            line-height: 76px;
            text-align: center;
            background-color:rgb(128,128,128);
            z-index:12;
            i{
              position: absolute;
              top: -2px;
              right: 10px;
              background-image: url("../assets/img/sou.png");
              background-repeat: no-repeat;
              background-position: center center;
              width: 80px;
              height: 80px;
              background-size: 35px;
              transition: 1S;
              z-index: 3;
              cursor: pointer;
              &:hover{
                color: #67C23A;
              }
            }
            input{
              position: relative;
              height: 40px;
              width: 260px;
              text-indent: 1em;
              border-radius: 20px;
              outline: 0;
              border: 0;
              z-index: 2;
            }
            ul{
              position: relative;
              display: none;
              top: -38px;
              right: -20px;
              width: 86.5%;
              background-color:#fff;
              padding: 30px 0 0 0;
              li{
                width: 100%;
                height: 30px;
                line-height: 30px;
                margin-bottom: 1px;
                &:hover{
                  background-color: rgba(39, 199, 248,.1);
                  cursor: pointer;
                }
              }
            }
            ul.search{
              display: block;
            }
          }
          .m-r-a-list{
            width: 300px;
            text-indent: 2em;
            ul{
              position: relative;
              width: 100%;
              li{
              width: 300px;
              height: 50px;
              line-height: 50px;
              background-color: beige;
              cursor: pointer;
              list-style: none;
              z-index: 1;
              a{
                position: absolute;
                display: block;
                width: 100%;
                height: 50px;
                color: #000;
                z-index: 10;
                }
              }
              .cover{
                position: absolute;
                box-sizing: border-box;
                top:30px;
                width: 300px;
                height: 50px;
                background-color: rgb(120, 121, 119);
                border-right: 5px solid black;
                opacity: .3;
                transition: top .3s;
            }
            }
          }
          & .coverList{
              position: fixed;
              width: 300px;
              margin: -10px 0 0 0;
              animation: searchMove .8s 1 ease-in-out ;
              animation-fill-mode: forwards;
              ul{
                margin-top: -100px;
              }
            }
          @keyframes searchMove{
              0%{top : -440px}
              40%{top: 90px}
              75%{top: 65px}
              100%{top: 90px}
            }
          .hot{
            width: 300px;
            text-indent: 2em;
            margin-top: 20px;
            h3{
              width: 100%;
              height: 40px;
              line-height: 40px;
              background-color: coral;
              opacity: .7;
            }
            li{
              position: relative;
              width: 300px;
              height: 50px;
              line-height: 50px;
              background-color: beige;
              cursor: pointer;
              list-style: none;
              z-index: 1;
              a{
                display: inline-block;
                height: 50px;
                color: #000;
                z-index: 10;
              }
              span{
                position: absolute;
                top: 14px;
                display: block;
                width: 22px;
                height: 22px;
                font-style: normal;
                font-size: 12px;
                color: #666;
                line-height: 22px;
                text-align: center;
              }
              &:nth-child(1) span{
                color: red;
                font-size: 19px;
                font-weight: 800;
              }
              &:nth-child(2) span{
                color: #2ea7e0;
                font-size: 17px;
                font-weight: 600;
              }
              &:nth-child(3) span{
                color: #6bc30d;
                font-size: 16px;
                font-weight: 500;
              }
              &:nth-child(1) a{          
                color: red;
                font-size: 19px;
                font-weight: 800;
              }
              &:nth-child(2) a{
                color: #2ea7e0;
                font-size: 17px;
                font-weight: 600;
              }
              &:nth-child(3) a{
                color:  #6bc30d;
                font-size: 16px;
                font-weight: 500;
              }
            }
          }
           
        .m-r-placement{
          position: relative;
          top:20px;
          width: 300px;
          height: 140px;
          text-indent: 2em;
          h3{
            background-color: cadetblue;
            height: 70px;
            line-height: 70px;
            font-weight: 800;
            opacity: .7;
            font-size: 20px;
          }
          i{
            position: absolute;
            top: 85px;
            display: inline-block;
            margin: 0 0 0 -30px;
            width: 22px;
            height: 22px;
            font-size: 18px;
            line-height: 22px;
            text-align: right;
            font-weight: bolder;
            color: red;
            cursor: pointer;
          }
          a{
              display: inline-block;
              width: 100%;
              height: 50px;
              margin: 0 0 0 -28px;
              line-height: 50px;
              background-color: beige;
              color: red;
              font-size: 16px;
              font-weight: bolder;
              text-indent: 3em;
          }
        }
        .m-r-visitor{
          margin-top: 20px;
          width: 300px;
          background-color: beige;
          h3{
            height: 70px;
            text-indent: 2em;
            line-height: 70px;
            font-weight: 800;
            font-size: 20px;
            background-color: cornflowerblue;
          }
          ul{
            display: flex;
            flex-wrap:wrap;
            justify-content:space-between;
            height: 190px;
            width: 250px;
            margin: 0 auto;
            li{
              overflow: hidden;
              position: relative;
              height: 50px;
              width: 60px;
              text-align: center;
              background-position: center top;
              background-size: cover;
              background-repeat: no-repeat;
              i.user{
                font-size: 12px;
                text-align: center;
              }
            }
          }
        }
      }
    }
    @media all and (max-width: 977px) {
      .m-body{
        padding: 0;
        .m-left{
          width: 120%;
          margin-left: 0px;
          .title{
            h3{
              display: none;
            }
            a{
              margin: 0 0 0 -12px;
            }
            hr{
              display: none;
            }
          }
          .pic{
            a{
              display: block;
              margin: 0 0 0 -18px;
              width: 100%;
              background-position: center;
            }
            span{
              width: 100%;
              display:inline-block;
              margin: 6px 0 0 -334px;
            }
          }
          .continue{
            display: none;
          }
          .tag{
            margin: 42px 0 0 13px;
          }
          .message{
            display: none;
          }
        }
        .m-right{
          display: none;
        }
      }
    }
  }
</style>