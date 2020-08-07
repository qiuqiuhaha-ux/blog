const mongoose = require("mongoose")
let Schema=mongoose.Schema
let link = mongoose.model("link",new Schema({
  content :{type: String,require:true},
  date : {type: Date, default: Date.now},
  img : {type: String,require:true},
  title:{type: String,require:true},
  guide:{type: String,require:true}
}));
module.exports = link