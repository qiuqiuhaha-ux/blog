const express = require("express")
const articleDB = require("../../db/article")
let router = express.Router()
//文章发表
router.post("/",(req,res)=>{
  let {type,title,content,region,pic}=req.body
  let surface = pic
  let tag = region
  if (!type||!title||!tag||!content){
    res.send({
      code : 1,
      msg : "数据不完整",
    });
    return;
  }
  articleDB.create({
    type,title,content,tag,surface
    }).then(data=>{
      res.send({
          code : 0,
          msg : "发表成功"
      })
    }).catch((e)=>{
        res.send({
          code : 4,
          msg : "发表失败，请稍后再试"
        })
    })
}),
//查找文章
router.post("/changed",(req,res)=>{
  let {skip,limit} = req.body
  articleDB.find({})
  .then((num)=>{
    articleDB.find({},{},{skip,limit}).then((data)=>{
      res.send({
        code:0,
        msg:"查找成功",
        data,
        num:num.length
      })
    }).catch(()=>{
      res.send({
        code:1,
        msg:"服务器出错"
      })
    })
  })
  
})
//删除修改文章
router.post("/delet",(req,res)=>{
  let {id} = req.body
  let _id = id
  //删除
  articleDB.deleteOne({_id}).then(()=>{
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
  //修改
})
//编辑文章
let _id = {}
router.post("/redact",(req,res)=>{
  let {id} = req.body 
  _id=id
})
router.post("/redactA",(req,res)=>{
  let {type,title,tag,surface,content} = req.body
    articleDB.updateOne({_id:_id},surface?{type,title,tag,surface,content}:{type,title,tag,surface,content})
    .then(()=>{
      res.send({
        code:0,
        msg:"修改成功"
      })
    }).catch((e)=>{
      res.send({
        code:1,
        msg:"服务器出错"
      })
    })
})
module.exports=router