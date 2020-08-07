<template>
    <div class="diary">
        <Nav></Nav>
        <el-timeline>
            <el-timeline-item v-for="item in falseData" :timestamp="item.date | getDate" placement="top">
                <el-card>
                    <h4>{{item.content}}</h4>
                    <img v-for="i in item.surface" :src="i" alt="">
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script>
import request from '../../ajax/axios'
import Nav from '../../components/Nav'
let diary = request.diary
export default {
    name:"diary",
    data(){
        return {
            falseData:[]
        }
    },
    components:{
      Nav
    },
    filters:{
        getDate(value){
            let date = new Date(value)
            return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()
        },
    },
    mounted() {
        diary().then((res)=>{           
            this.falseData = res.data.data
        })
    },
}
</script>
<style lang="less" scoped>
    .diary{
        box-sizing: border-box;
        width: 100%;
        padding: 80px 40px;
        .el-timeline{
            position: relative;
            box-sizing: border-box;
            padding: 4% 10%;
            width: 100%;
            margin: 0 auto;
            max-width: 1300px;
            background-color: beige;
            /deep/ .el-timeline-item__timestamp{
                position: absolute;
                top: -2px;
                left: -80px;
                font-size: 15px;
            }
            /deep/ .el-timeline-item__content{
                display: inline-block;
                .el-card__body{
                    background-color: rgb(72,67,72);
                    color: beige;
                    img{
                        width: 60%;
                    }
                }
            }
        }
    }
</style>