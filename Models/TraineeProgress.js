const mongoose = require('mongoose');
//const { getNumberofSubtitlies } = require('../Routes/coursesController');
const Schema = mongoose.Schema;

const TraineeProgress = new Schema({
    Trainee_Id:{
        type:String,
        required:true
    },
    SubtitleId:{
        type:mongoose.Types.ObjectId,
        ref:'subtitles',
        required:false,
        default:""
    },
    ProgressStatus:{
        type:Boolean,
        default:false
    },
    Progress:{
        type:Number,
        default:0
    },
    CourseId:{
        type: mongoose.Types.ObjectId,
        ref:'course',
        required:true
    },
     Finished:{
        type:Boolean,
        default:false
        },
    
}, { timestamps: true });

const traineeProgress = mongoose.model('corporateTraineeProgress', TraineeProgress);
module.exports = traineeProgress;