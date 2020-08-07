const article = require("../../db/article")
const articleInfo = require("../../db/articleInfo")
const express = require("express")

let router = express.Router()

//文章内容
router.post("/",(req,res)=>{
  let {id} = req.body
  article.findById(id,{content:1,_id:1,pv:1,date:1})
    .then(data=>{
      if(data){
        article.find({}).then((val)=>{
          article.find({},{title:1},{skip:Math.floor(Math.random()*val.length),limit:2,sort:{age:1}})
            .then((value)=>{
              res.send({
                code:1,
                msg:"查找成功",
                data,
                value
              })
            })
        })
      }else{
        res.send({
          code:2,
          msg:"查找失败"
        })
      }
    })
    .catch(()=>{
      res.send({
        code:2,
        msg:"服务器错误"
      })
    })
})

//文章搜索框
router.post("/search",(req,res)=>{
 let {value} = req.body
 if(!value){return}
 let reg = new RegExp(value)
 article.find(
   {$or:[{title:reg},{tag:reg}]},
   {_id:1,title:1},
   {sort:0,limit:8,sort:{pv:-1}}
  )
  .then(data=>{
    if(data){
      res.send({
        code:1,
        msg:"查找成功",
        data
      })
    }else{
      res.send({
        code:0,
        msg:"查找失败"
      })
    }
  })
  .catch(()=>{
    res.send({
      code:3,
      msg:"服务器错误"
    })
  })
})

/*文章数据接口*/
router.post("/getInfo",(req,res)=>{
  articleInfo.findOne({},{__v:0})
  .then(data=>{
    res.send({
      code:0,
      msg:"请求成功",
      data
    })
  })
  .catch(()=>{
    res.send({
      code : 4,
      msg : "服务器错误",
      data : null
    });
  })
})

//热门数据接口
router.post("/getHot",(req,res)=>{
  article.find({},{__v:0},{sort:{pv:-1},skip:0,limit:8})
    .then(data=>{
      res.send({
        code : 0,
        data
      });
    })
    .catch(()=>{
      res.send({
        code : 4,
        msg : "服务器错误",
        data : null
      });
    })
});

//接受前端传来的id，给前端返回
router.post("/getShow",(req,res)=>{
  let {skip,limit,tag} = req.body
  let options = tag?{tag}:{}
  article.find(options,{__v:0},{skip,limit,sort:{pv:-1}})
  .then(data=>{
    res.send({
      code : 0,
      data
    });
  }).catch(()=>{
    res.send({
      code : 4,
      msg : "服务器错误",
      data : null
    });
  })
})

//pv
router.post("/pv",(req,res)=>{
  let login = req.session.login
  if(login){
    let {_id} = req.body 
    article.updateOne({_id},{$inc:{pv:1}}).then(()=>{
    })
  }else{
  }
})
module.exports = router