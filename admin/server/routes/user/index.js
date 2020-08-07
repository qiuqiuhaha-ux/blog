const express = require("express")
const userDB = require("../../db/register")
const visitorDB = require("../../db/visitor")
const messageDB = require("../../db/message")
let router = express.Router()
//查找用户
router.post("/",(req,res)=>{
  let {_id,disabled,admin} = req.body
  //改变管理员
  if(_id ||disabled && admin){
    userDB.updateMany({_id},{disabled,admin}).then((data)=>{
      res.send(({
        code:0,
        msg:"修改成功"
      }))
    }).catch(()=>{
      res.send({
        code:4,
        msg:"服务器出错"
      })
    })
    return
  }
  userDB.find({}).then((data)=>{
    res.send({
      code:0,
      msg:"查找成功",
      data
    })
  })
})
//删除用户
router.post("/delet",(req,res)=>{
  let {_id} = req.body
  userDB.deleteOne({_id}).then(data=>{
    if(data){
      visitorDB.deleteOne({user:_id}).then((val)=>{})
      messageDB.deleteMany({user:_id},()=>{})
      messageDB.updateMany({"children.user":_id},{$pull:{children:{user:_id}}},()=>{})
    }
  }).catch(()=>{
    res.send({
      code:2,
      code:"服务器出错"
    })
  })
})
module.exports = router