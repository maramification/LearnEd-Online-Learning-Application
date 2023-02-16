const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const traineeRefundSchema = new Schema({
    Trainee_Id:{
        type:mongoose.Types.ObjectId,
        ref:'individualTrainee',
        required:true
    },
    Course_Id:{
        type:mongoose.Types.ObjectId,
        ref:'course',
        required:true
    },
    Title:{
        type:String,
        required:false
    },
    Problem:{
        type:String,
        required:false
    },
    Amount:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        required:false
    },
    Username:{
        type:String,
        required:false
    },
    Role:{
        type:String,
        required:false
    }
}, { timestamps: true });

const TraineeRefundSchema = mongoose.model('traineeRefund', traineeRefundSchema);
module.exports = TraineeRefundSchema;