<template>
    <div class="fl">
        <Nav></Nav>
        <div class="title">
            <div class="txt">
                <h2>友情链接</h2>
                <h3>剑气纵横三万里,一剑光寒十九洲</h3>
            </div>
            <Yinshi></Yinshi>
        </div>
        <div class="main">
            <h2>链接申请说明</h2>
            <div class="mainList">
                <ul class="add">
                    <li>×经常宕机</li>
                    <li>×不合法规</li>
                    <li>×擦边球网站</li>
                    <li>×红标报毒</li>
                    <li>√原创优先</li>
                    <li>√技术优先</li>
                </ul>
                <ul class="apply">
                    <li>交换友链可在留言板留言，本站链接如下:</li>
                    <li>名称 : cyc</li>
                    <li>网址 : https://www.4399.com</li>
                    <li>图标 : https://www.yanshisan.cn/logo.png</li>
                    <li>描述 : 燕十三一个人的江湖</li>
                </ul>
                <span>申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)</span>
            </div>
        </div>
        <div class="footer">
            <ul>
                <li v-for="item in arr" :key="item.title">
                    <a :href="item.guide">
                        <h3>{{item.content}}</h3>
                        <img :src="item.img" alt="">
                        <p>{{item.title}}</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Nav from "../../components/Nav.vue"
import Yinshi from "../../components/Yinshi";
import request from "../../ajax/axios"
let linkAdd = request.linkAdd
export default {
    name:"flink",
    data(){
        return {
            arr:[]
        }
    },
    components:{
        Nav,Yinshi
    },
    mounted() {
        linkAdd().then((res)=>{
            this.arr = res.data.data
        })
    },
}
</script>
<style lang="less" scoped>
    .fl{
        width: 100%;
        height: 100%;
        padding: 60px 0;
        .title{
            width: 100%;
            height: 260px;
            background-color: black;
            .txt{
                position: relative;
                top: 32%;
                overflow: hidden;
                margin: 0 auto;
                width: 100%;
                max-width: 308px;
                height: 90px;
                line-height: 90px;
                text-align: center;
                z-index: 1;
                color: rgb(255,255,255);
                h2{
                    position: absolute;
                    top: -30px;
                    right: 107px;
                    width: 100px;
                    height: 10px;
                }
                h3{
                    position: absolute;
                    top: 8px;
                    right: 40px;
                }
            };
            #canvas{
                margin-top: -88px;
            }
        }
        .main{
            margin: 20px 3%;
            max-width: 1350px;
            height: 250px;
            padding: 30px 30px;
            background-color: rgb(255,255,255);
            color:black;
            opacity: .7;
            .mainList{
                .add{
                    overflow: hidden;
                    margin-top: 20px;
                    li{
                        float: left;
                        margin-right: 10px;
                        font-weight: 600;
                    }
                }
                .apply{
                    margin-top: 20px;
                }
                span{
                    display: block;
                    margin-top: 20px;
                }
            }
        }
        .footer{
            margin: 20px 3%;
            max-width: 1350px;
            color:black;
            ul{
                display: flex;
                justify-content:space-between;
                flex-wrap: wrap;
                width: 100%;
                li{
                    overflow: hidden;
                    box-sizing: border-box;
                    width: 280px;
                    height: 158px;
                    margin-bottom: 20px;
                    padding:0 0 0 20px;
                    background-color: rgb(255,255,255);
                    transition: .5s;
                    cursor: pointer;
                    &:hover{
                        transform: translateY(-4px);
                    }
                    a{        
                        display: block;
                        width: 100%;
                        height: 100%;
                        h3{
                        margin:20px 0 0 40px;
                        }
                        img{
                            position: relative;
                            top: -30px;
                            left: 0;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                        p{
                            position: relative;
                            top: -20px;
                        }
                    }
                    
                }
            }
        }
    }
</style>