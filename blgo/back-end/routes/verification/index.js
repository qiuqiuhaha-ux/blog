const express = require("express");
const svgCaptcha = require("svg-captcha");
const userName = require("../../db/register")
let router = express.Router();
//注册的时候验证
router.post("/",(req,res)=>{
  let {user,pwd,verification} = req.body
  //干掉req.session.registerVCodeTime
  req.session.registerVCodeTime = 0;
  //验证有没有数据
  if(!user||!pwd||!verification){
    res.send({
      code:1,
      msg:"验证无效,请检查后在注册"
    })
    return
  }
  //再次验证验证码
  if ( verification.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase()) {
    res.send({
      code : 2,
      msg : "验证码错误"
    });
    return;
  }
  //验证用户名和密码
  if (!/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(user) || !/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(pwd)){
    res.send({
      code : 2,
      msg : "用户名或密码不符合规则"
    });
    return;
  }
  //验证用户名是否重复
  userName.findOne({user})
    .then(data=>{
      if(data){
        res.send({
          code:2,
          msg:"用户名重复"
        })
      }else{
        userName.create({user,pwd})
          .then(data=>{
            send({
              code:1,
              msg:"注册成功"
            })
          })
          .catch(()=>{
            res.send({
              code:4,
              msg:"服务器错误"
            })
          })
        }
    })
    .catch(e=>{
      res,send({
        code:4,
        msg:"服务器错误"
      })
    })
})
//验证码请求接口
router.post("/vcode",(req,res)=>{
  //判断时间
  if(req.session.registerVCodeTime){
    let t = new Date - new Date(req.session.registerVCodeTime)
    if(t<=60000){
      res.send({
        code:2,
        data : req.session.registerVCode.data,
        msg:"请求过于频繁",
        time:60000-t
      })
      return
    }
  }
  //创建验证码
  let svg = svgCaptcha.create()
  //将正确答案存储到session
  req.session.registerVCode = svg
  req.session.registerVCodeTime = new Date()
  //将svg发送给前端
  res.send({
    code:0,
    data:svg.data,
    time:60000
  })
})
//验证码失去焦点的请求
router.post("/checkVcode",(req,res)=>{
  let {vcode} = req.body
  if(!vcode || (vcode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase())){
    res.send({
      code : 0,
      msg : "验证失败"
    })
  }else{
    res.send({
      code : 2,
      msg : "验证成功"
    })
  }
})

module.exports = router