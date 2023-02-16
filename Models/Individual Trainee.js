const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const Schema = mongoose.Schema;

const individualTraineeSchema = new Schema({
  Username: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
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
  Gender:{
    type: String,
    required: true
  },
  Registered_Courses:{
    type:[mongoose.Types.ObjectId],
    ref:'course',
    required:false
  },
  Role:{
    type:String,
    default:"Individual Trainee"
  },
  Wallet:{
        type:Number,
        required:true,
        default:0
    },
    Country: {
    type: String,
    required: true
  },
  Currency: {
      type: String,
      required: false,
      //default:"USD"
    },
    verified: { type: Boolean, default: false }
}, { timestamps: true });

individualTraineeSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ individualId: this._id }, "secret", {
		expiresIn: "7d",
	});
	return token;
};


const validate = (data) => {
	const schema = Joi.object({
    Username: Joi.string().required().label("Username"),
		Email: Joi.string().email().required().label("Email"),
		Password: passwordComplexity().required().label("Password"),
    confirmPassword: passwordComplexity().required().label("confirmPassword"),
		First_Name: Joi.string().required().label("First_Name"),
		Last_Name: Joi.string().required().label("Last_Name"),
    Gender: Joi.string().required().label("Gender"),
    Country: Joi.string().required().label("Country"),
	});
	return schema.validate(data);
};


const Individual_Trainee = mongoose.model('individualTrainee', individualTraineeSchema);
module.exports = {Individual_Trainee, validate};