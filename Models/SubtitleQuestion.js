const { required } = require('joi');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const subtitleQuestionSchema = new Schema({

  

  SubtitleId:
  {
      type: mongoose.Types.ObjectId,
      ref:'subtitles'
  },

  Q: {
    type: String,
    default: ''
  },
  
  Answers: {
    type: [String],
    default:[]
  },
  correctAnswer:{
    type: String,
    default:''
  }
   
  }, { timestamps: true });
  
  const subtitleQuestion = mongoose.model('subtitleQuestion', subtitleQuestionSchema);
  module.exports = subtitleQuestion;