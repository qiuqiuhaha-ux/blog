const mongoose = require("mongoose")
let Schema=mongoose.Schema
let article = mongoose.model("article",new Schema({
  type : {type: String,required: true},
  title : {type: String,required: true},
  content : {type:String,required: true},
  tag : {type: String,required: true},
  date : {type: Date, default: Date.now()},
  surface : {type:String,default: 'http://121.40.239.63:8888/img/defaultSurface.jpg'},
  pv : {type: Number,default: 0},
  comment : [{type:Schema.Types.ObjectID,ref:"comment"}]
}));
/*假数据*/
// for (let i=0;i<10;i++){
//   article.create({
//     type : ["原创","转载"][(Math.random()*2)|0],
//     title : `第${i+1}篇文章`,
//     content : (""+i+i+i+i+i+"哈哈哈哈哈我是文章的内容"),
//     pv : Math.random()*99999|0,
//     tag : ["HTML&Css","JavaScript","Node","Vue&React","Other"][(Math.random()*5)|0]
//   });
// }
module.exports = article