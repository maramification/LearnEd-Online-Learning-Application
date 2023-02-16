const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
    
  Num:{
    type: Number,
    required: true
  },

   Score:{
      type: Number,
      required: true
    },
    
    WeekID:
    {
        type: mongoose.Types.ObjectId,
        ref:'weeks'
    }
  }, { timestamps: true });
  
  const exercise = mongoose.model('exercise', exerciseSchema);
  module.exports = exercise;