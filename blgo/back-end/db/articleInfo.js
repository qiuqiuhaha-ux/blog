const mongoose = require("mongoose")

let Schema = mongoose.Schema
/*前端的右侧文章信息*/
let articlenInfo=mongoose.model("articleninfo",new Schema({
  type:[String],
  num:Number
}))
articlenInfo.create({
  type:["HTML&CSS","JavaScript","Node.js","Vue.js","其他"],
  num:100
})
module.exports = articlenInfo