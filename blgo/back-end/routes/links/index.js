const express = require("express")
const linkDB = require("../../db/link")
let router = express.Router()
router.post("/",(req,res)=>{
  console.log(req.body)
  linkDB.find({}).then((data)=>{
    res.send({
      code:0,
      msg:"查找成功",
      data
    })
  })
})
module.exports = router