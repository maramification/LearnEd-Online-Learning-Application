const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const subtitlesSchema = new Schema({
    Subtitle_Title:{
        type: String,
        required: true
    },
    Link:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    CourseId:{
        type: mongoose.Types.ObjectId,
        ref:'course',
        required:true
    },
}, { timestamps: true });

const Subtitles = mongoose.model('subtitles', subtitlesSchema);
module.exports = Subtitles;