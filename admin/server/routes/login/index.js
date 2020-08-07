const express = require("express")
const registerDB = require("../../db/register")
let router = express.Router()
//登录
router.post("/",(req,res)=>{
  let {user,pwd} = req.body
  if(user || pwd){
    registerDB.findOne({user}).then((data)=>{
      if(user){
        if(data.pwd === pwd){
          if(data.admin){
            req.session.login = data
            res.send({
              code:0,
              msg:"登录成功"
            })
          }else{
            res.send({
              code:2,
              msg:"您不是管理员"
            })
          }
        }else{
          res.send({
            code:1,
            msg:"密码错误"
          })
        }
      }else{
        res.send({
          code:4,
          msg:"用户名不存在"
        })
      }    
    }).catch(()=>{
      res.send({
        code:3,
        msg:"服务器出错或用户名不存在"
      })
    })
  }
})
//判断有没有登录
router.post("/ifLogin",(req,res)=>{ 
    if(req.session.login.admin){
      res.send({
        code:0,
        msg:"登录成功"
      })
    }
})
module.exports = router