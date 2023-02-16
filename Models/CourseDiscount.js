const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const discountSchema = new Schema({
    discountAmount:{
        type:Number,
        required:true
    },
    courseId:{
        type: mongoose.Types.ObjectId,
        ref:'course',
        required:true
    },
    createdAt:{type:Date,default:Date.now,expires:60*60*24*7}
}, { timestamps: true });

const Discount = mongoose.model('discount', discountSchema);
module.exports = Discount;