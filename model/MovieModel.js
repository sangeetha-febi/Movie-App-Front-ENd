const mongoose = require("mongoose");

const MovieModel = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required: true
    },
    release_date:{
        type: String,
        required: true
    },
    duration_minutes:{
        type: Number,
        required: true

    },
    poster:{
        type: String
    }

}, {timestamps: true});
module.exports = mongoose.model("Movie",MovieModel);
