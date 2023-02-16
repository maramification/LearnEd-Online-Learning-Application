const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const courseRequestSchema = new Schema({
  
    CourseId:{
        type: mongoose.Types.ObjectId,
        ref:'course'
      },

      CorporateTraineeId:{
        type: mongoose.Types.ObjectId,
        ref:'corporateTrainees'
      },
  
    CourseTitle:{
    type: String,
    required: true
  },
  TUsername: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    required: true
  }
}, { timestamps: true });

const CourseRequests = mongoose.model('courseRequests', courseRequestSchema);
module.exports = CourseRequests;