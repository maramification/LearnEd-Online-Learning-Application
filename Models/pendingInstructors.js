    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const pendingInstructorsSchema = new Schema({
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
        }
    }, { timestamps: true });

    const pendingInstructors = mongoose.model('pendingInstructors', pendingInstructorsSchema);
    module.exports = pendingInstructors;