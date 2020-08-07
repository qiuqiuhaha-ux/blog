const express = require("express");
const userName = require("../../db/register")
const visitor = require("../../db/visitor")
let router = express.Router();
router.post("/",(req,res)=>{
    //已经登录就不需要往下走了
  if (req.session.login) {
    res.send({
      code : 2,
      msg : "已经登录，请退出之后再登录",
    });
      return;
  }
  let {user,pwd} = req.body
  //验证有没有数据
  if(!user||!pwd){
    res.send({
      code:1,
      msg:"验证无效,请检查后在注册"
    })
    return
  }
  //验证用户名和密码
  if (!/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(user) || !/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(pwd)){
    res.send({
      code : 2,
      msg : "用户名或密码不符合规则"
    });
    return;
  }
  //验证用户存在不
  userName.findOne({user})
    .then((data)=>{
      if(data){
          if(data.pwd === pwd){
            req.session.login = data
            res.send({
              code:0,
              msg:"验证通过"
            })
            visitor.deleteMany({user:data._id})
              .then(()=>{
                visitor.create({user:data._id})
                  .then(()=>{})
              })
              .catch(()=>{})
          }else{
            res.send({
              code:1,
              msg:"密码错误"
            })
          }
      }else{
          res.send({
            code:3,
            msg:"用户名不存在"
          })
      }
    })
    .catch(()=>{
      res.send({
        code:1,
        msg:"服务器出错"
      })
    })
})
//是否登录
router.post("/ifLogin",(req,res)=>{
  let data = req.session.login
  let resData = false
  if(data){
    delete data.pwd
    delete data._v
    resData = data  
  }
  
  res.send({
    userInfo : resData
  });
});
//登出
router.post("/getout",(req,res)=>{
  req.session.destroy()
  res.send({
    code:1,
    msg:"登出成功"
  })
})
module.exports = router