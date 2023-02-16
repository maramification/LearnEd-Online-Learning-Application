const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userRating = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    userRating:{      
        type:Number,
        required:true
    },
    courseId:{
        type: mongoose.Types.ObjectId,
        ref:'courses'
    }
});

const UserRating = mongoose.model('userRating', userRating);
module.exports = UserRating;