const express = require("express")
const linkDB = require("../../db/link")
let router = express.Router()
//添加友联
router.post("/",(req,res)=>{
  let {title,guide,img,content} = req.body
  if(title || guide || img || content){
    linkDB.create({title,guide,img,content}).then(()=>{
      res.send({
        code:0,
        msg:"添加成功"
      })
    }).catch(()=>{
      res.send({
        code:1,
        msg:"服务器错误"
      })
    })
  }
})
//删除友联
router.post("/Delet",(req,res)=>{
  let {_id} = req.body
  if(_id){
    linkDB.deleteOne({_id}).then(()=>{
      res.send({
        code:0,
        msg:"删除成功"
      })
    }).catch(()=>{
      res.send({
        code:1,
        msg:"服务器出错"
      })
    })
  }else{
    linkDB.find({}).then((data)=>{
      res.send({
        code:0,
        msg:"查找成功",
        data
      })
    })
  }
})
module.exports = router