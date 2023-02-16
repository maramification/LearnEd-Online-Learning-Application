const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const weekSchema = new Schema({
    Title:{
      type: String,
      required: true
    },
    Hours:{
      type: Number,
      required: true
    },
    CourseID:
    {
        type: mongoose.Types.ObjectId,
        ref:'courses'
    }
  }, { timestamps: true });
  
  const week = mongoose.model('week', weekSchema);
  module.exports = week;