const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const traineeReportSchema = new Schema({
    Trainee_Id:{
        type:mongoose.Types.ObjectId,
        ref:'individualTrainee',
        required:true
    },
    Report_Title:{
        type:String,
        required:true
    },
    Reported_Problem:{
        type:String,
        required:true
    },
    Report_Type:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:false
    },
    // Admin_Response:{
    //     type:String,
    //     required:false,
    //     default:""
    // },
    Username:{
        type:String,
        required:false
    },
    Role:{
        type:String,
        required:false
    },
    Followups:{
        type:[String],
        required:false
    }
}, { timestamps: true });

const TraineeReportSchema = mongoose.model('traineeReports', traineeReportSchema);
module.exports = TraineeReportSchema;