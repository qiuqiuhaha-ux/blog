<template>
  <div class="Article">
    <Nav></Nav>
    <div class="main">
      <div class="mainList">
        <div class="title">
          <h2>模板分享</h2>
          <span>作者：<a>陈宇超</a> </span>
          <span>围观群众： <a>{{article.pv}}</a> </span>
          <span>更新于 <a>{{article.date | date}}</a> </span>
        </div>
        <div class="collating">
          <div class="collating-m">
            <p v-html="article.content"></p>
            <a>地址:暂时没有</a>
          </div>
          <ul class="collating-list">
            <li>非特殊说明，本文版权归 燕十三 所有，转载请注明出处.</li>
            <li>地址：暂时没有</li>
          </ul>
        </div>
        <div class="audio">
          <p>歌名：好久不见</p>
          <audio  src='../../assets/audio/1.mp3' controls="controls" autoplay="autoplay"></audio>
        </div>
        <div class="read">
          <p>延伸阅读</p>
          <div>
            <router-link @click.native="expan" :to="'/article/'+item._id" v-for="item in expand" :key=item._id>{{item.title}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from "../../components/Nav.vue"
  import requset from "../../ajax/axios"
  let getArticleSun = requset.getArticleSun
  function toTwo(num){
    return (num<10?"0":"") + num;
  }
  export default {  
    name:"Article",
    data(){
      return {
        article:{},
        expand:[],
      }
    },
    components:{
      Nav
    },
    filters:{
      date(val){
        let date = new Date(val);

        let YY = toTwo(date.getFullYear()),
          MM = toTwo(date.getMonth()+1),
          DD = toTwo(date.getDate()),
          h = toTwo(date.getHours()),
          m = toTwo(date.getMinutes()),
          s = toTwo(date.getSeconds());

        return `${YY}年${MM}月${DD}日 ${h}:${m}:${s}`;
      }
    },
    methods: {
        expan(){
          let id=this.$route.params.id
            getArticleSun(id).then(res=>{
            this.article=res.data.data
            this.expand = res.data.value
          })
          setTimeout(()=>{
            window.location.reload()
          },100)
        }
    },
    created() {
      let id=this.$route.params.id
      getArticleSun(id).then(res=>{
        if(res.data.code === 1){
          this.article=res.data.data
          this.expand = res.data.value
        }else{
          this.$router.push("/404") 
        }
      })
    },
  }
</script>
<style lang="less" scoped>
  .main{
    box-sizing: border-box;
    padding: 80px 10px 50px;
    width: 100%;
    .mainList{
      box-sizing: border-box;
      padding: 30px 25px 0 25px;
      width: 100%;
      margin: 0 auto;
      max-width: 1260px;
      background-color: rgb(255,255,255);
      .title{
        border-bottom:1px solid rgba(0,0,0,0.2);
        h2{
          margin-bottom: 3px;
        }
        span{
          display: inline-block;
          margin-right: 20px;
          margin-bottom: 3px;
          a{
            color: rgb(127,178,218);
            cursor: pointer;
          }

        }
      }
      .collating{
        margin-top: 20px;
        .collating-m{
          a{
            display: inline-block;
            margin-bottom: 40px;
            color: rgb(127,178,218);
          }
        }
        .collating-list{
          background-color: rgb(248,249,247);
          padding:20px 0 10px 40px;
          li{
            margin: 0 0 10px 0;
          }
        }
      }
      .audio{
        margin-top: 30px;
        p{
          margin-left: 10px;
        }
        audio{
          height: 40px;
          width: 100%;
        }
      }
      .read{
        padding:20px 0 30px 0;
        p{
          padding-left: 10px;
          margin-bottom: 25px;
          font-size: 18px;
          color: rgba(0,0,0,.6);
          border-left: 3px solid rgb(107,195,13);
        }
        a{
          display: block;
          margin-top: 10px;
          color: rgb(127,178,218);
          &::before{
            content: "◈";
            margin-right: 5px;
            color: #787977;
          }
        }
      }
    }
  }
</style>