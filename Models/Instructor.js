const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const InstructorSchema = new Schema({
    Username: {
      type: String,
      required: true, 
      unique: true
    },
    Password:{
      type: String,
      required: true
    },
    First_Name:{
      type: String,
      required: true
    },
    Last_Name:{
      type: String,
      required: true
    },
    Email:{
        type: String,
        required: true
    },
    Gender: {
      type: String,
      required: true
    },
    Bio:{
      type:String,
      required:false
    },
    Rating:{
      type:Number,
      required:false
    },
    Instructor_Ratings:{
      type:[Number],
      required:false
    },
    Instructor_Reviews:{
      type:[String],
      required:false
    },
    Role:{
      type:String,
      default:"Instructor"
    },
    verified: { type: Boolean, default: true },
     Money:{
    type:Number,
    default:0
    },
    Contract:{
    type:Boolean,
    default:false
    },
    Currency: {
      type: String,
      required: false,
      default:"USD"
    }
  }, { timestamps: true });

InstructorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, "secret", {
      expiresIn: "7d",
    });
    return token;
  };

  const Instructors = mongoose.model('instructor', InstructorSchema);
module.exports = Instructors;