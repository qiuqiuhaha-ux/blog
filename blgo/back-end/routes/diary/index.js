const express = require("express")
const diaryDB = require("../../db/diary")
let router = express.Router()
router.post("/",(req,res)=>{
  diaryDB.find({}).then((data)=>{
    res.send({
      code:0,
      msg:"查找成功",
      data
    })
  }).catch(()=>{
    res.send({
      code:1,
      msg:"服务器出错"
    })
  })
})
module.exports = router