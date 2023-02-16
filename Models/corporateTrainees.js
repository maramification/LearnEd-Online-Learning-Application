    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const jwt = require("jsonwebtoken");
    const Joi = require("joi");
    const passwordComplexity = require("joi-password-complexity");

    const corporateTraineeSchema = new Schema({
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
    Corporate: {
        type: String,
        required: true
    },
    Registered_Courses:{
    type:[mongoose.Types.ObjectId],
    ref:'course',
    required:false
    },
    Role: {
        type: String,
        required: true
    },
    verified: { type: Boolean, default: true },
    Country: {
        type: String,
        required: true
    },
    Currency: {
        type: String,
        required: false,
        //default:"USD"
    }
    }, { timestamps: true });

    corporateTraineeSchema.methods.generateAuthToken = function () {
        const token = jwt.sign({ _id: this._id }, "secret", {
            expiresIn: "7d",
        });
        return token;
    };

    const corporateTrainees = mongoose.model('corporateTrainees', corporateTraineeSchema);
    module.exports = corporateTrainees;