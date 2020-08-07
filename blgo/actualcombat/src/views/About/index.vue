<template>
    <div class="about">
        <Nav></Nav>
        <div class="title">
            <div class="txt">
                <h2>关于</h2>
                <h3>剑气纵横三万里,一剑光寒十九洲</h3>
            </div>
            <Yinshi></Yinshi>
        </div>
        <div class="main">
            <h2>关于我</h2>
            <p>毕业后一直在家沉迷学习，日渐消瘦</p>
            <ul class="apply">
                <li>联系我可以通过以下方式</li>
                <li>QQ : 545405376</li>
                <li>邮箱 : 545405376@qq.com</li>
            </ul>
            <h2>关于本站</h2>
            <ul class="apply">
                <li>本站结构 :</li>
                <li>前端 : html css js vue element-ui</li>
                <li>后端 : nodejs mongodb</li>
            </ul>
            <h2>特别说明</h2>
            <ul class="apply">
                <li>本站文章仅代表个人观点，和任何组织或个人无关</li>
                <li>本站前端开发代码没有考虑对IE浏览器的兼容</li>
            </ul>
        </div>
    </div>
</template>
<script>
import Nav from "../../components/Nav"
import Yinshi from "../../components/Yinshi"
export default {
    name:"about",
    components:{
        Nav,Yinshi
    }
}
</script>
<style lang="less" scoped>
    .about{
        width: 100%;
        height: 100%;
        padding: 60px 0;
        .title{
            width: 100%;
            height: 260px;
            background-color: black;
            #canvas{
                margin-top: -88px;
            }
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
            }
        }
        .main{
            margin: 20px 3%;
            max-width: 1350px;
            padding: 30px 30px;
            background-color: rgb(255,255,255);
            color:black;
            opacity: .7;
            .apply{
                margin-top: 20px;
                margin-bottom: 40px;
            }
        }
    }
</style>