const mongoose = require("mongoose");

const libroSchema = new mongoose.Schema({
   isbn : {
      type : String,
      default : null,
      unique : true
   },
   titulo : {
      type : String,
      default : null
   },
   autor : {
      type : String,
      default : null
   }
});

module.exports = mongoose.model("libro", libroSchema);