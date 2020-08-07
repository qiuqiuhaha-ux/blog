const express = require("express")
const diaryDB = require("../../db/diary")
let router = express.Router()
//添加日记
router.post("/Add",(req,res)=>{
  let {content,surface} = req.body
  if(content || surface){
    diaryDB.create({content,surface}).then((data)=>{
      res.send({
        code:0,
        msg:"提交成功"
      })
    }).catch(()=>{
      res.send({
        code:1,
        msg:"服务器出错"
      })
    })
  }
})
//删除日记
router.post("/Delet",(req,res)=>{
  let {_id} = req.body
  if(_id){
    diaryDB.deleteOne({_id}).then(()=>{
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
    diaryDB.find({}).then((data)=>{
      res.send({
        code:0,
        msg:"查找成功",
        data
      })
    })
  }
})
module.exports = router