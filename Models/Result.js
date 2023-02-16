const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const resultSchema = new Schema({
    
    CTrainee_Id:
    {
        type: mongoose.Types.ObjectId,
        ref:'corporatetrainees'
    },

    Trainee_Id:
    {
        type: mongoose.Types.ObjectId,
        ref:'individualTrainee'
    },

    Course_Id:
    {
        type: mongoose.Types.ObjectId,
        ref:'course'
    },

    Res: {
        type: Number,
        default: 0
    }
    
  }, { timestamps: true });
  
  const result = mongoose.model('result', resultSchema);
  module.exports = result;