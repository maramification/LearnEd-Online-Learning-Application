   //SESSIONS HERE DONE WITHOUT CHECKING ROLES
   ///////////////////////////////////////////////////////
   const express = require("express");
    const mongoose = require('mongoose');
    const instructor = require("../Models/Instructor");
    const course = require("../Models/Course");
    const corporate_Trainee = require("../Models/corporateTrainees");
    const reportedProblem = require("../Models/CorporateTraineeReports");
    const courseRequests = require("../Models/CourseRequests");
    const TraineeNotes=require("../Models/TraineeNotes");
    const TraineeProgress=require("../Models/TraineeProgress");
const corporateTrainees = require("../Models/corporateTrainees");
const Subtitles = require("../Models/Subtitles");


    const addCorporateTrainee = async(req,res) => {
    
    const {Username,Email,Password,First_Name,Last_Name,Gender,Corporate} = req.body;

    try{
    const result = await corporate_Trainee.create({Username,Email,Password,First_Name,Last_Name,Gender,Corporate, "Role":"Corporate Trainee"});
    console.log(result)
    res.status(200).json(result)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

    const corporateTraineeRegisterCourse = async(req,res) => {
    
        const corporateTrainee = req.session.user._id;
        const courseId = req.query.CourseId;
        console.log(courseId);

    try{
    const currTrainee = await corporate_Trainee.findById({_id:corporateTrainee});
    const updatedArray = currTrainee.Registered_Courses;
    console.log(updatedArray);
    updatedArray.push(courseId);
    console.log(updatedArray)

    const updatedTrainee =  await corporate_Trainee.findByIdAndUpdate({_id:corporateTrainee},{Registered_Courses:updatedArray},{new:true});
    console.log(updatedTrainee)
    res.status(200).json(updatedTrainee)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

    const corporateViewMyRegisteredCourses = async(req,res) => {
    
        const corporateTrainee = req.session.user._id;
        

    try{
    const currTrainee = await corporate_Trainee.findById({_id:corporateTrainee});
    const coursesArray = currTrainee.Registered_Courses;
    const coursesArray1 = [];
    console.log(coursesArray)

    for (let i = 0; i < coursesArray.length; i++) {
            coursesArray1.push(await course.findById({_id:coursesArray[i]}));
        }
    
    console.log(coursesArray1)
    res.status(200).json(coursesArray1)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}


const corporateTraineeSendReport = async(req,res) => {

    const traineeId = req.session.user._id;
    const {Report_Title,Reported_Problem,Report_Type} = req.body;
    const trainee = await corporate_Trainee.findById({_id:traineeId});
    const traineeUsername = trainee.Username;

    try{
    const result = await reportedProblem.create({Corporate_Trainee_Id:traineeId,Report_Title,Reported_Problem,Report_Type,Status:"Delivered", Username:traineeUsername,Role:"Corporate Trainee"});
    console.log(result)
    res.status(200).json(result)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const corporateTraineeSendFollowup = async(req,res) => {

    //const traineeId = req.query.TraineeId;
    const reportId = req.query.ReportId;
    const {Followup} = req.body;
    

    try{
    
    const currReport = await reportedProblem.findById({_id:reportId});
    const newtitle = "Followup on: "+currReport.Report_Title;
    const followupArray = currReport.Followups;
    followupArray.push(Followup);
    const updatedReport = await reportedProblem.findByIdAndUpdate({_id:reportId},{Report_Title:newtitle,Status:"Delivered",Followups:followupArray},{new:true})
    console.log(updatedReport)
    res.status(200).json(updatedReport)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}


const fetchCorporateTraineeAllPreviousReports = async(req,res) => {

    const corporateTraineeId = req.session.user._id;
    const allReports=[];

    try{
    const resolvedProblems = await reportedProblem.find({Corporate_Trainee_Id:mongoose.Types.ObjectId(corporateTraineeId),Status:"Resolved"}).populate('Corporate_Trainee_Id');
    const underSupervisionProblems = await reportedProblem.find({Corporate_Trainee_Id:mongoose.Types.ObjectId(corporateTraineeId),Status:"Pending"}).populate('Corporate_Trainee_Id');
    for (let i = 0; i < resolvedProblems.length; i++) {
                allReports.push(resolvedProblems[i]);
        }

    for (let i = 0; i < underSupervisionProblems.length; i++) {
                allReports.push(underSupervisionProblems[i]);
        }
    // allReports.push(resolvedProblems);
    // allReports.push(underSupervisionProblems)

    console.log(allReports)
    res.status(200).json(allReports)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const fetchCorporateTraineeProfileDetails = async(req,res) => {

    const corporateTraineeId = req.session.user._id;

    try{
    const trainee = await corporate_Trainee.findById({_id:corporateTraineeId});
    console.log(trainee)
    res.status(200).json(trainee)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}


const fetchCorporateTraineeDeliveredReports = async(req,res) => {

    const traineeId = req.session.user._id;

    try{
    const deliveredProblems = await reportedProblem.find({Corporate_Trainee_Id:mongoose.Types.ObjectId(traineeId),Status:"Delivered"}).populate('Corporate_Trainee_Id');

    console.log(deliveredProblems)
    res.status(200).json(deliveredProblems)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const fetchCorporateTraineePendingReports = async(req,res) => {

    const traineeId = req.session.user._id;

    try{
    const pendingProblems = await reportedProblem.find({Corporate_Trainee_Id:mongoose.Types.ObjectId(traineeId),Status:"Pending"}).populate('Corporate_Trainee_Id');

    console.log(pendingProblems)
    res.status(200).json(pendingProblems)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const fetchCorporateTraineeResolvedReports = async(req,res) => {

    const traineeId = req.session.user._id;

    try{
    const resolvedProblems = await reportedProblem.find({Corporate_Trainee_Id:mongoose.Types.ObjectId(traineeId),Status:"Resolved"}).populate('Corporate_Trainee_Id');

    console.log(resolvedProblems)
    res.status(200).json(resolvedProblems)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const fetchCorporateProblem = async(req,res) => {

    const problemId = req.query.ReportId;

    try{
    const problem = await reportedProblem.findById({_id:problemId});

    console.log(problem)
    res.status(200).json(problem)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const fetchNonRegisteredCorporateTraineeCoursesForInstructor = async(req,res) => {

    const traineeId = req.session.user._id;
    console.log("traineeId"+traineeId);
    const instructorId = req.query.id;


    try{
    const trainee = await corporate_Trainee.findById({_id:traineeId});
    console.log("traineeeee"+trainee);
    const traineeRegisteredCourses = trainee.Registered_Courses;
    const instructorCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId)}).populate('Instructor');
    console.log("instructorCourses"+instructorCourses)
    const traineeNonRegisteredCourses = [];

    if(traineeRegisteredCourses==null||traineeRegisteredCourses.length==0||traineeRegisteredCourses.length==null)
    {
        res.status(200).json(instructorCourses)
    }
    else
    {
        
    for (let i = 0; i < traineeRegisteredCourses.length; i++) {
        for(let j=0;j<instructorCourses.length;j++)
        {
            console.log(traineeRegisteredCourses[i]._id)
            console.log(instructorCourses[j]._id)
            if(traineeRegisteredCourses[i]._id != instructorCourses[j]._id)
            {
                traineeNonRegisteredCourses.push(instructorCourses[j])
            }
        }

    }

    console.log("traineeNonRegisteredCourses"+traineeNonRegisteredCourses);
    res.status(200).json(traineeNonRegisteredCourses)

    }

    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const fetchInstCoursesCT = async(req,res) => {

    const traineeId = req.session.user._id;
    console.log("traineeId"+traineeId);
    const instructorId = req.query.id;


    try{
    const trainee = await corporate_Trainee.findById({_id:traineeId});
    console.log("traineeeee"+trainee);
    const traineeRegisteredCourses = trainee.Registered_Courses;
    const instructorCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId)}).populate('Instructor');
    const traineeNonRegisteredCourses = [];

    for (let i = 0; i < traineeRegisteredCourses.length; i++) {
            for(let j=0;j<instructorCourses.length;j++)
            {
                console.log(traineeRegisteredCourses[i]._id)
                console.log(instructorCourses[j]._id)
                if(traineeRegisteredCourses[i]._id != instructorCourses[j]._id)
                {
                    traineeNonRegisteredCourses.push(instructorCourses[j])
                }
            }

        }

        console.log("traineeNonRegisteredCourses"+traineeNonRegisteredCourses);
        res.status(200).json(traineeNonRegisteredCourses)

    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}


const requestCourseAccess = async(req,res) => {
    const corporateTraineeId = req.session.user._id;
    console.log(corporateTraineeId)
    const courseId = req.query.CourseId;
    //console.log(courseId)
    const ct = await corporate_Trainee.findById({_id:corporateTraineeId}).populate();
    //console.log(ct)
    const c = await course.findById({_id:courseId}).populate();
    const CourseTitle = c.Title;
    const TUsername = ct.Username;
    const Role = ct.Role;

    try {
        const data = await courseRequests.create({"CourseId":courseId, "CorporateTraineeId":corporateTraineeId, "CourseTitle":CourseTitle, "TUsername":TUsername, "Role":Role })
        res.status(200).json(data)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }


}



const AddNotes = async(req,res) => {
    const {Notes} = req.body;
    const Trainee = req.session.user._id;
    const SubtitleId = req.query.SubtitleId;

    try{
    const currTrainee = await TraineeNotes.create({Trainee_Id:Trainee,SubtitleId:SubtitleId, Notes:Notes});
    res.status(200).json(currTrainee)
    console.log("Hello from notes",Notes)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}
    const getNotes = async(req,res) => {
   // const {Notes} = req.body;
    const Trainee = req.session.user._id;
    const SubtitleId = req.query.SubtitleId;
    try{
    const notes = await TraineeNotes.find({Trainee_Id:Trainee,SubtitleId:SubtitleId},{Notes:1});
    res.status(200).json(notes)
    //console.log("Hello from notes",notes)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

const courseRequestCheck = async(req,res) => {
    const corporateTraineeId = req.session.user._id;
   // console.log(corporateTraineeId)
    const courseId = req.query.CourseId;
    //console.log(courseId)
    

   
       const reqAvailable = await courseRequests.find({CorporateTraineeId:corporateTraineeId, CourseId:courseId})
     //  const reqAvailable =  allRequestedCourses.find({CourseId:courseId})

     if (reqAvailable.length == 0) {
        res.json({ msg: "REQUEST CAN BE SENT"})
     }

     else {
        res.status(400).json({error1:"REQUEST ALREADY SENT"})
     }

    }
    function arrayIsEmpty(array) {
        //If it's not an array, return FALSE.
        if (!Array.isArray(array)) {
            return FALSE;
        }
        //If it is an array, check its length property
        if (array.length == 0) {
            //Return TRUE if the array is empty
            return true;
        }
        //Otherwise, return FALSE.
        return false;
    }
    const check=async(req,res)=>{
        var already=[];
        let a=[];
        let i;
        let j;
        console.log(req.query.CourseId);
        try{
        const sub = await Subtitles.find({CourseId:mongoose.Types.ObjectId(req.query.CourseId)});
        //check if this corporate has this course or not
        const cop=await corporateTrainees.findById({_id:req.query.TraineeId})
        const coursesArray = cop.Registered_Courses;

        console.log(coursesArray)
        if(coursesArray.length>0){
        for ( i = 0; i < coursesArray.length; i++) {
            //Check if this course is already in traineeProgress DB
        already=await TraineeProgress.find({"Trainee_Id":req.query.TraineeId,CourseId:mongoose.Types.ObjectId(coursesArray[i])});
        console.log(already[0]);
        //console.log(arrayIsEmpty(already.length));
        console.log("ASLUN!!!!")
        if(!arrayIsEmpty(already) ){
         //coursesArray1.push(await course.findById({_id:coursesArray[i]},{_id:1}));
         res.status(200).json(already)
         console.log("Hi et3ml abl keda")
        } 
        else{  
            for ( j = 0; i < (sub.length); j++) {
            old= await TraineeProgress.create({"Trainee_Id":req.query.TraineeId,"SubtitleId":mongoose.Types.ObjectId(sub[j]._id),"CourseId":mongoose.Types.ObjectId(coursesArray[i])});
            console.log(" NEW here,Bye")
            }   
           res.status(200).json(old)
            }
     } }
     else{
        res.status(400).json({error:"There is no registred"})

     }
        }
        catch(error){
        res.status(400).json({error:error.message})

     }
    }

    module.exports ={check,corporateTraineeSendReport,fetchCorporateTraineeAllPreviousReports,corporateViewMyRegisteredCourses,corporateTraineeRegisterCourse,addCorporateTrainee,fetchCorporateTraineeProfileDetails,fetchCorporateTraineeDeliveredReports,fetchCorporateTraineePendingReports,fetchCorporateTraineeResolvedReports,fetchCorporateProblem,fetchNonRegisteredCorporateTraineeCoursesForInstructor, requestCourseAccess,corporateTraineeSendFollowup,AddNotes,getNotes, courseRequestCheck,fetchInstCoursesCT};
