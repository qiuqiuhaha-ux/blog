const express = require("express")
const messageDB = require("../../db/message")
let router = express.Router()
router.post("/",(req,res)=>{
  let {_id} = req.body
  if(_id){
    messageDB.deleteMany({_id}).then((data)=>{
      res.send({
        code:0,
        msg:"删除成功"
      })
    })
  }else{
    messageDB.find({},{user:1,content:1,_id:1,date:1}).populate("user",{_id:0,user:1}).then((data)=>{
      res.send({
        code:1,
        msg:"查找成功",
        data
      })
    }).catch(()=>{
      res.send({
        code:2,
        msg:"服务器出错"
      })
    })
  }
})
module.exports = router