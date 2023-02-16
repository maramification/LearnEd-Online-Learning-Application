// const mongoose = require('mongoose');


// const Schema = mongoose.Schema;


// const followupTraineeSchema = new Schema({
//     Report_Id:{
//         type:mongoose.Types.ObjectId,
//         required:true,
//         ref:'traineeReports'
//     },
//     Report_Title:{
//         type:String,
//         required:false
//     },
//     Username:{
//         type:String,
//         required:false
//     },
//     Reported_Problem:{
//         type:String,
//         required:false
//     },
//     Report_Status:{
//         type:String,
//         required:false
//     },
//     Followups:{
//         type:[String],
        
//     }

// }, { timestamps: true });

// const FollowupsTrainee = mongoose.model('followupsTrainee', followupTraineeSchema);
// module.exports = Followups;