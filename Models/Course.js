const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const courseSchema = new Schema({
  Title:{
    type: String,
    required: true
  },
  Subject:{
    type: String,
    required: true
  },
  Subtitles_Total_Hours:{
    type: Number,
    required: true
  },
  Course_Total_Hours:{
    type: Number,
    required: true
  },
  Price: {
    type: String,
    required: true
  }, 
  Discount:{
    type: Number,
    required:false
  },
  Discount_Start_Date:{
    type: Date,
    required:false
  },
  Discount_End_Date:{
    type: Date,
    required:false
  },
  Course_Description:{
    type:String,
    required:false
  },
  PreviewLink:{
    type:String,
    required:true
  },
  Instructor_Name:{
    type:String,
    required:true,
    default:""
  },
  Instructor:{
        type: mongoose.Types.ObjectId,
        ref:'instructor'
  },
    Rating:{
      type:Number,
      required:false
    },
    Course_Ratings:{
      type:[Number],
      required:false
    },
    NumberOfPaid:{
      type:Number,
      default:0
    },
    Views:{
      type:Number,
      required:false,
      default:0
    },
}, { timestamps: true });

const Course = mongoose.model('course', courseSchema);
module.exports = Course;