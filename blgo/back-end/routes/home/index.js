const express = require("express")
const article = require("../../db/article")
let router = express.Router()

router.post("/h",(req,res)=>{
  article.find({},{},{skip:0,limit:3,sort:{pv:-1}})
  .then(data=>{
    res.send({
      data
    })
  }).catch((res)=>{
  })
  
})

module.exports = router