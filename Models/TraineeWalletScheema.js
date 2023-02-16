const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const traineeWalletSchema = new Schema({
  TraineeId:{
    type:mongoose.Types.ObjectId,
    ref:'individualTrainee',
    required:true
  },  
  Balance:{
        type:Number,
        required:true,
        default:0
    }
}, { timestamps: true });

const TraineeWalletSchema = mongoose.model('traineeWallet', traineeWalletSchema);
module.exports = TraineeWalletSchema;