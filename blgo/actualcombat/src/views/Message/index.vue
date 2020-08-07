<template>
    <div class="message">
        <Nav></Nav>
        <div class="text">
            <div class="title">
                <h2>留言板</h2>
                <h4>沟通交流,拉近你我</h4>
            </div>
            <TextA @Sub="handleSubmit"></TextA>
        </div>
        <div class="comment">
            <div class="m-comment" v-for="(item,index) in commentList" :key="item._id">
                <div class="p-comment">
                <img :src="item.user.photo" alt="">
                <span class="user">{{item.user.user}}</span>
                <p v-html="item.content"></p>
                <div class="information">
                    <span class="time" >{{item.date | getTime}}</span>
                    <a @click="replyClick(index)">
                        {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===undefined)?"收起":"回复"}}
                    </a>
                </div>
                </div>
                <div class="c-comment" v-for="(value,dex) in item.children" :key="value.date + Math.random()">
                    <img :src="value.user.photo" alt="">
                    <span class="user">{{value.user.user}}  回复了  {{value.reUser}}</span>
                    <p v-html="value.content"></p>
                    <div class="information">
                        <span class="time">{{value.date | getTime}}</span>
                        <a  @click="replyClick(index,dex,value)">
                            {{(item.reply.lastIndexArr[0]===index && item.reply.lastIndexArr[1]===dex)?"收起":"回复"}}
                        </a>
                    </div>
                </div>
                <div :class="['text',{'show':item.reply.ifShow}]">
                    <textarea  :placeholder="'回复【'+item.reply.$user+'】'" v-model='item.reply.content'></textarea>
                    <button @click="childCommit(index,item)" type="button" class="layui-btn layui-btn-xs">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nav from '../../components/Nav'
import TextA from "../../components/TextA"
import request from "../../ajax/axios"
const getIfLogin = request.getIfLogin
const commitMessage = request.commitMessage
const getMessageList = request.getMessageList
const commitChildMessage = request.commitChildMessage
function toTwo(num){
    return (num<10?"0":"") + num;
}
export default {
    name:"message",
    data(){
        return {   
            commentList:[],
            skip:0,
            limit:0,
            ifLoding:false
        }
    },
    components:{
      Nav,TextA
    },
    filters:{
      getTime(val){
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
        handleSubmit(val){
            getIfLogin().then(res=>{
                if(res.data.userInfo){
                    commitMessage({
                        user : res.data.userInfo._id,
                        content:val
                    })
                    .then((res)=>{
                        if(res.data.code===10){
                            layer.msg(res.data.msg, {icon: 2})
                        }else{
                            layer.msg('留言成功', {icon: 1})
                            setTimeout(()=>{
                                window.location.reload()
                            },1000)
                        }                       
                    }).catch(()=>{
                        layer.msg('服务器错误~请稍后再试', {icon: 2});
                    })
                }else{
                    layer.msg('请先登录', {icon: 2})
                }
            }).catch(()=>{
                alert("服务器出错，稍后再试")
            })
        },
        //回复框的显示与隐藏
        replyClick(pIndex,cIndex){
            
            if (pIndex === undefined)return;
            let parentData = this.commentList[pIndex];

            //回复的谁
            if(cIndex !== undefined){
                this.commentList[pIndex].reply.$user = parentData.children[cIndex].user.user
            }else{
                this.commentList[pIndex].reply.$user = parentData.user.user
            }
            //两次点的同一个
            //不是同一个
            if ((pIndex === parentData.reply.lastIndexArr[0] && cIndex === parentData.reply.lastIndexArr[1])) {
                parentData.reply.ifShow = false;
                parentData.reply.lastIndexArr=[];
            }else{
                parentData.reply.ifShow = true;
                parentData.reply.lastIndexArr=[pIndex,cIndex];
            }
        },
        childCommit(pIndex,item){
            //判断是否登录
            getIfLogin()
                .then(res=>{
                    if(res.data.userInfo){
                        //登录成功以后就发送数据到后端执行
                        commitChildMessage({
                            parentId : this.commentList[pIndex]._id,
                            user : res.data.userInfo._id,
                            content: this.commentList[pIndex].reply.content,
                            reUser : this.commentList[pIndex].reply.$user 
                        }).then(res=>{
                            if(res.data.code){
                                //评论失败
                                layer.msg(res.data.msg,{icon:2})
                            }else{
                                //评论成功
                                layer.msg("评论成功",{icon:1})
                                setTimeout(()=>{
                                    window.location.reload();
                                },1000);
                            }
                        })
                    }else{
                        //未登录
                        layer.msg('请先登录', {icon: 2});
                    }
                })
                .catch(()=>{
                    //服务出错
                    layer.msg('服务器错误~请稍后再试', {icon: 2});
                });
        },
        //滚轮滚动的时候往下面加载新的页面
        handleScroll(){
            if(this.ifLoding)return

            //文档高
            let c = document.documentElement.offsetHeight;
            //滚动高
            let a = document.documentElement.scrollTop;
            //可视区高
            let b = document.documentElement.clientHeight;
            //滚动高和可视区域高加起来小于文档高减去200就执行
            if(a+b>=c-200){
              this.ifLoding = true
              this.getMessageList(()=>{
                  this.ifLoding = false
              })  
            }
        },
        getMessageList(cb){
            this.limit += 5
            getMessageList(this.skip,this.limit)
                .then((res)=>{
                        let data = res.data.data
                        data.forEach(item=>{
                            item.reply={
                            user : "",//id
                            content : "",//回复内容
                            reUser : "",//字符串
                            date : "",//日期
                            ifShow : false,
                            lastIndexArr : []
                            }
                        });
                        this.commentList = data;
                        cb && cb()
                })
        }
    },
    created(){
        this.getMessageList()
    },
    mounted() {
      //监听滚动事件
      window.addEventListener("scroll",this.handleScroll);
    },
    destroyed() {
      //移除监听滚动事件
      window.removeEventListener("scroll",this.handleScroll);
    }
}
</script>
<style lang="less" scoped>
    .message{
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        height: 100%;
        padding: 80px 20px 0 45px;
       .text{
           box-sizing: border-box;
           overflow: hidden;
           width: 100%;
           max-width: 1300px;
           margin: 0 auto;
           background-color: rgb(255,255,255);
           padding: 0 20px 10px;
           .title{
               margin: 20px 0;
               text-align: center;
               h2{
                   font-size: 25px;
                   font-weight: 900;
                   opacity: .8;
                   margin-bottom: 20px;
               }
               h4{
                   font-size: 18px;
                   opacity: .7;
               }
           }
        }
        .comment{
           margin-top: 25px;
           box-sizing: border-box;
           width: 100%;
           max-width: 1300px;
           margin: 20px auto;
           background-color: rgb(255,255,255);
           padding: 20px 0 0 70px; 
           .m-comment{
                width: 100%;
                margin: 0 0 30px -70px;
                border-bottom: 1px solid rgba(5,5,5,.6);
                padding: 20px 0 0 70px; 
                .p-comment{
                    img{
                        width: 40px;
                        height: 40px;
                        margin: 0 10px 0 -50px;
                        border-radius: 50%;
                    }
                    span.user{
                        color: rgb(47,185,240);
                        font-weight: 800;
                    }
                    .information{
                        padding: 0 0 10px 0;
                        margin: 10px 0 0 0;
                        border-bottom:1px solid rgba(5,5,5,.2);
                        span.time{
                            margin-right: 10px;
                        }
                        a{
                            color:cornflowerblue;
                            cursor: pointer;
                        }
                    }
                }
                .c-comment{
                    margin: 10px 0 0 50px;
                    img{
                        width: 40px;
                        height: 40px;
                        margin: 0 10px 0 -50px;
                        border-radius: 50%;
                    }
                    span.user{
                        color: rgb(47,185,240);
                        font-weight: 800;
                    }
                    .information{
                        height: 30px;
                        margin: 10px 0 20px 0;
                        span.time{
                            margin-right: 10px;
                        }
                        a{
                            color:cornflowerblue;
                            cursor: pointer;
                        }
                    }
                }
                .text{
                    overflow: hidden;
                    box-sizing: border-box;
                    width: 100%;
                    height: 0;
                    transition: height .3s;
                    margin: 0 0 0 -30px;
                    textarea{
                        display: none;
                        width: 100%;
                        height: 60px;
                        border-color: #aaa;
                        padding: 10px;
                        box-sizing: border-box;
                        resize: none;
                    }
                    button{
                        display: none;
                    }
                }
                div.show{
                    height: 90px;
                    textarea{
                        display: block;
                    }
                    button{
                        display: block;
                        margin: 4px 0 0 0;
                    }
                }               
           }
        }
    }
</style>