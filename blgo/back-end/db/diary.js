const mongoose = require("mongoose")
let Schema=mongoose.Schema
let diary = mongoose.model("diary",new Schema({
  content :String,
  date : {type: Date, default: Date.now},
  surface : Array,
}));
module.exports = diary