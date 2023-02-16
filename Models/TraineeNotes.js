const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const TraineeNotesSchema = new Schema({
  Trainee_Id:{
        type:String,
        required:true
    },
    SubtitleId:{
        type:mongoose.Types.ObjectId,
        ref:'subtitles',
        required:true
    },
    Notes:{
        type:String
    }
    
}, { timestamps: true });

const TraineeNotes = mongoose.model('traineeNotes', TraineeNotesSchema);
module.exports = TraineeNotes;