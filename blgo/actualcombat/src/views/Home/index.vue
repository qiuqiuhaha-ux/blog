<template>
    <div class="home">
       <div class="bg" :style="{height:bgheight+'px'}">
           <div class="text">
                <div class="title">
                  <h3>努力改变命运,活出更精彩的人生</h3>
                </div>
                <button>
                   <router-link to="/blog/0">Enter Blog</router-link>
                </button>
           </div>
           <div :class="['list',{'lin':over}]" @click="move">
               <div class="text">
                   <span class="one"></span>
                   <span class="no"></span>
                   <span class="two"></span>
               </div>
           </div>
           <div :class="['show',{'listbg':over}]">
               <ul>
                   <li>
                       <i></i>
                       <router-link to="/">首页</router-link>
                    </li>
                   <li>
                       <i></i>
                       <router-link to="/blog/0">博客</router-link>
                    </li>
                   <li>
                       <i></i>
                       <router-link to="/message">留言</router-link>
                    </li>
               </ul>
           </div>
           <div class="anchor" @click="scroll">
               <span>^</span>
           </div>
       </div>
       <div id="hot">
           <div class="title">
               <h2>热门文章</h2>
               <hr>
               <p>很想给你写封信，告诉你这里的天气</p>
               <p>昨夜的那场电影，还有我的心情</p>
           </div>
           <ul class="list">
               <li v-for ="item in hot" >
                   <div  :class="['bgImg',{'show':name}]" :style="{backgroundImage:'url('+item.surface+')'}">
                        <i></i>
                   </div>
                   <h4>{{item.title}}</h4>
                   <div class="time">
                       <span class="year">{{item.date | year}}年</span>
                       <span class="month">{{item.date | month}}月</span>
                       <span class="date">{{item.date | date}}日</span>
                    </div>
                   <span id="contentSpan" v-html="item.content"></span>
                   <a>阅读更多</a>
               </li>
           </ul>
       </div>
       <div class="link">
           <div class="link1">
               <span>
                   <i></i>
                   <router-link to="/about">关于</router-link>
                </span>
               <span>
                   <i></i>
                   <router-link to="/links">+友情链接</router-link>
                </span>
           </div>
       </div>
       <div class="personality">
           <div>
               <h2>次元使者</h2>
               <p>爱号打游戏,看小说,闲着无聊的时候就爱打代码来度过无趣的时间</p>
           </div>
       </div>
       <div class="footer">
           <div class="introduce">
               <ul>
                   <li><h3>cyc</h3></li>
                   <li>剑气纵横三万里，一剑光寒十九洲</li>
                   <li><button><router-link to="/about">About Me</router-link></button></li>
               </ul>
           </div>
           <div class="relevant">
               <h3>相关链接</h3>
               <ul>
                   <li>留言</li>
                   <li>博文</li>
                   <li>日记</li>
                   <li>资源</li>
               </ul>
           </div>
           <div class="contact">
               <h3>联系方式</h3>
               <ul>
                   <li>地址：湖北省武汉市</li>
                   <li>QQ:545405376</li>
                   <li>邮箱:545405376@qq.com</li>
               </ul>
           </div>
       </div>
    </div>
</template>
<script>
import request from "../../ajax/axios"
let getArticle = request.getArticle
export default {
    name:"home",
    data(){
        return {
            bgheight : 0,
            //热门文章
            hot:[],
            //判断名字
            name:"",
            //判断显示与否
            over:false
        }
    },
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
    methods: {
        getWindowHeight(){
            this.bgheight = window.innerHeight
        },
        move(){
            if(!this.over){
                this.over=true
            }else{
                this.over=false
            }
        },
        scroll(){
            let h = window.innerHeight
            let scrollTop = document.documentElement.scrollTop
            function m(){
                scrollTop+=30
                if(scrollTop<h){
                    requestAnimationFrame(m)
                }else{
                    scrollTop = h
                }
                document.documentElement.scrollTop=scrollTop
            }
            m()
        }    
    },
    mounted() {
        this.getWindowHeight()
        window.addEventListener("resize",this.getWindowHeight)
        getArticle().then(res=>{
            this.hot = res.data.data
        })
    },
    destroyed() {
        window.removeEventListener("resize",this.getWindowHeight)
    },
}
</script>
<style lang="less" scoped>
    .home{
        background-color: beige;
        div.bg{
            width: 100%;
            background: url("../../icon/11.jpg") center center/cover no-repeat;
            .text,.anchor,.list{
                animation: small 2s;
                @keyframes small{
                    0%{transform: scale(0)}
                    100%{transform: scale(1)}
                }
            }
            .text{
                position: relative;
                top:40%;
                bottom: 50%;
                margin: 0 auto;
                width: 400px;
                height: 130px;
                user-select: none;
                .title{
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 75px;
                    text-align: center;
                    h1{
                        margin-bottom: 5px;
                        color: beige;
                    }
                    h3{
                        color: beige;
                    }
                }
                button{
                    position: relative;
                    left: 37%;
                    bottom: -85px;
                    width: 100px;
                    height: 40px;
                    border-radius: 10%;
                    background-color: cadetblue;
                    transition: .5S;
                    &:hover{
                        background-color: rgb(40, 167, 172);
                    }
                    a{
                        display: block;
                        width: 100%;
                        height: 40px;
                        color: beige;
                        line-height: 40px;
                        font-size: 16px;
                        text-align: center;
                        opacity: 1;
                    }
                }
            }
            .list{
                position: fixed;
                right: 0;
                margin: -50px 80px;
                width: 50px;
                height: 50px;   
                transition: 1S;
                z-index: 10;
                cursor: pointer;
                &.lin{
                    .text{
                        span{
                            transition: 1S;
                            display: block;
                            border-bottom: 3px solid  black ;
                        }
                        .one{
                            transform: rotate(50deg);
                        }
                        .two{
                            margin-top: -6px;
                            transform: rotate(130deg);
                        }
                        .no{
                            display: none;
                        }
                    }
                }        
                &:hover{
                    border-radius: 50%;
                    background-color: rgb(107,195,13);
                }
                .text{
                    width: 28px;
                    height: 20px;
                    span{
                        display:block;
                        margin-top: -2px;
                        margin-bottom: 5px;
                        border-bottom: 3px solid beige;
                        transition: 1S;
                    }
                }
            }
            div.show{
                user-select: none;
                overflow: hidden;
                position: fixed;
                right: -750px;
                top: -50px;
                background-color: rgb(254,254,242);
                transform: rotateZ(10deg);
                transition: 1S;
                z-index: 5;
                &.listbg{
                    display: block;
                    right: -100px;
                    width: 500px;
                    height: 130%;
                    transition: 1S;
                    ul{
                        width: 100px;
                        text-align: center;
                        margin: 250px 0 0 230px;
                        transform: rotateZ(-10deg);
                        li{
                            overflow: hidden;
                            position: relative;
                            width: 115px;
                            height: 66px;
                            transform: rotateZ(0deg);
                            i{
                                position: absolute;
                                display: inline-block;
                                right: 120px;
                                top: 13px;
                                width: 100%;
                                height: 1px;
                                transition: .5S;
                                border-bottom: 1px solid rgb(119,199,33);
                            }
                            &:hover{
                                i{
                                    right:0
                                } 
                            }
                            a{
                                width: 100%;
                                height: 100%;
                                display: inline-block;
                                text-shadow: black;
                                color: black;
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
            .anchor{
                position: relative;
                left: 48%;
                bottom: -65%;
                width: 55px;
                height: 55px;
                text-align: center;
                transition: 1S;
                cursor: pointer;
                user-select: none;
                &:hover{
                    border-radius: 50%;
                    background-color: chartreuse;
                    opacity: .8;
                }
                span{
                    display: block;
                    transform:rotate(180deg);
                    font-size: 40px;
                    line-height: 50px;
                    font-weight: 900;
                    color: beige;
                    transition: 1S;
                }
            }
        } 
        div#hot{
            width: 100%;
            margin-bottom: 100px;
            background-color: beige;
            .list li,.title{
                animation: small 2s;
                @keyframes small{
                    0%{transform: scale(0)}
                    100%{transform: scale(1)}
                }
            }
            .title{
                box-sizing: border-box;
                padding-top: 100px;
                width: 224px;
                text-align: center;
                margin: 0 auto 50px;
                h2{
                    font-size: 30px;
                    margin-bottom: 15px;
                }
                hr{
                    display: inline-block;
                    width: 50px;
                    border:1px solid cornflowerblue;
                    margin-bottom: 10px;
                }
                p{
                    opacity: .6;
                }
            }
            .list{
                display: flex;
                justify-content: space-between;
                max-width: 1135px;
                width: 100%;
                margin: 0 auto;
                li{
                    overflow: hidden;
                    width: 365px;
                    background-color: rgb(250,249,249);
                    .bgImg{
                        overflow: hidden;
                        width: 100%;
                        height: 245px;
                        background:center center/cover no-repeat;
                        i{
                            position: relative;
                            display: block;                     
                            width: 100%;
                            top:-245px;
                            height: 100%;
                            background-color: beige;
                            opacity: .4;
                            cursor: pointer;
                            &::before{
                                content: "";
                                background-image: url(../../icon/lianjie.png);
                                background-size: 40px;
                                position: absolute;
                                top: 45%;
                                left: 45%;
                                width: 40px;
                                height: 40px;
                                text-align: center;
                                opacity: 1;
                            }
                        }
                    }
                    .bgImg:hover i{
                        top: 0;
                        transition: .5S;
                    }
                    h4{
                        margin: 20px 0 0 20px;
                    }
                    span{
                        display:inline-block;
                        margin: 30px 0 0 20px;
                        opacity: .5;
                    }
                    div.time{
                        margin: 15px 0 0 9px;
                        opacity: .5;
                        span{
                            margin: 15px -5px 0 10px;
                        }
                    }
                    a{
                        display: block;
                        margin: 30px 0 0 20px;
                        opacity: .5;
                    }
                    #contentSpan{
                        height: 40px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                }
            }
        }
        .link{
            position: relative;
            width: 100%;
            height: 270px;
            background-size: 100px;
            background: url(https://yssimage.oss-cn-hangzhou.aliyuncs.com/22.jpg) center center/cover no-repeat;
            div.link1{
                animation: small 2s;
                @keyframes small{
                    0%{transform: scale(0)}
                    100%{transform: scale(1)}
                }
            }
            div.link1{
                display: flex;
                justify-content: space-between;
                position: absolute;
                top: 45%;
                left: 35%;
                width: 425px;
                height: 45px;             
                span{
                    position: relative;
                    display: inline-block;
                    width: 200px;
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 600;
                    border:1px solid beige;
                    &:hover i{
                        transition: 2s;
                        width: 100%;
                    }
                    i{
                        position: absolute;
                        left: 0px;
                        display: inline-block;
                        width: 0;
                        height: 100%;
                        background-color: cornflowerblue;
                    } 
                    a{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        color:cornsilk;
                    }
                }
            }
        }
        .personality{
            width: 100%;
            height: 275px;
            div{
                position: relative;
                top: 40%;
                margin: 0 auto;
                width: 400px;
                text-align: center;
                &{
                    animation: small 2s;
                    @keyframes small{
                        0%{transform: scale(0)}
                        100%{transform: scale(1)}
                    }
                }
                h2{
                    margin-bottom: 10px;
                }
                p{
                    font: 900;
                }
            }
        }
        .footer{
            box-sizing: border-box;
            padding: 90px 50px;
            width: 100%;
            height: 345px;
            background-color: rgb(35,35,40);
            color: beige;
            div{
                float: left;
                margin-right: 150px;
            }
            .introduce{
                ul{
                    li{
                        margin-bottom: 12px;
                        button{
                            height: 30px;
                            border-radius: 2px;
                            background-color: greenyellow;
                            transition: .3s;
                            cursor: pointer;
                            &:hover{
                                opacity: .8;
                            }
                            a{
                                color: black;
                            }
                        }
                        h3{
                            font-size: 20px;
                        }
                    }
                }
            }
            .relevant{
                h3{
                    margin-bottom: 10px;
                    font-size: 20px;
                }
                ul{
                    width: 266px;
                    li{
                        width: 133px;
                        float: left;
                    }
                }
            }
            .contact{
                h3{
                    margin-bottom: 10px;
                }
            }
        }
        @media all and (max-width: 977px){
            div.link{
                div.link1{
                    position:absolute;
                    left: 0;
                   top: 0;
                    span{
                        
                    }
                }
            }
        }
    }
</style>