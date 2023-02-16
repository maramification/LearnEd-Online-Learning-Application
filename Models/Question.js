const { required } = require('joi');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const questionSchema = new Schema({


  CourseId:
  {
      type: mongoose.Types.ObjectId,
      ref:'course'
  },

  QNumber: {
    type: Number,
    default: 0
  },


  Q: {
    type: String,
    default: ''
  },
  
  Answers: {
    type: [String],
    required:false
  },
  correctAnswer:{
    type: Number,
    default:0
  }
   
  }, { timestamps: true });
  
  const question = mongoose.model('question', questionSchema);
  module.exports = question;