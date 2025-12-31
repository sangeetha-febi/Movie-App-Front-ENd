const mongoose = require("mongoose");

const UserCommend = new mongoose.Schema({
   
    username: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    createdAt: {
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required: true
    }
});
  module.exports = mongoose.model("comment", UserCommend);