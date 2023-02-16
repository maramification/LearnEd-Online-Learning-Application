const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema({
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
    // required: true
  },
  Last_Name:{
    type: String,
    // required: true
  },
  Gender:{
    type: String,
    // required: true
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
      verified: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, "secret", {
		expiresIn: "7d",
	});
	return token;
};


const User = mongoose.model('User', userSchema);
const validate = (data) => {
	const schema = Joi.object({
		Email: Joi.string().email().required().label("Email"),
		Password: passwordComplexity().required().label("Password"),
		First_Name: Joi.string().required().label("First_Name"),
		Last_Name: Joi.string().required().label("Last_Name"),
    Gender: Joi.string().required().label("Gender"),
    Country: Joi.string().required().label("Country"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };