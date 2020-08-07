const visitor = require("../../db/visitor")
const express = require("express")
let router = express.Router()
router.post("/",(req,res)=>{
  visitor.find({},{},{skip:0,limit:12,sort:{date:-1}})
    .populate("user",{_id:1,user:1,photo:1})
    .then((data)=>{
      res.send({
        code:1,
        msg:"访问成功",
        data
      })
    })
    .catch(()=>{
      res.send({
        code:2,
        msg:"服务器错误",
        data:[]
      })
    })
})
module.exports=router