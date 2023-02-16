const express = require("express");
const mongoose = require('mongoose');
const instructor = require("../Models/Instructor");
const course = require("../Models/Course");
const reportedProblem = require("../Models/InstructorReports");
const corporate_Trainee = require("../Models/corporateTrainees");
const { update } = require("../Models/User");
const { Individual_Trainee } = require("../Models/Individual Trainee");
const Adminstrator = require("../Models/Administrator");

var instTitles = [];
let instname;




    const insttitles= async (req,res) => { 
        const instructorName = req.body;
        const instData=await course.find({ Instructor_Name: req.params.Instructor_Name },{});
        //Title:1,Instructor_Name:1
        console.log(instData)
        if (!instData){ 
            res.status(400)
            console.log("No instructors found")
        }
        // const data2= await instructor.find({ },{ _id: 0, Course: 1 } )
        res.status(200).json(instData);
        }; 


//Filter courses based on price or subject -->Works for both only
    const filterTitles2= async (req,res) => { 
        const data=await course.find( { "Price":req.params.Price,"Subject":req.params.Subject },{Title:1,Subject:1,Price:1,_id:0})
        //const data=await instructor.find( {or:[{ "Course.Price":req.params.Price,"Course.Subject":req.params.Subject }]},{Course:1,_id:0})
        
        if (!data){ 
            res.status(400)
            console.log("No instructors found")
        }
        // const data2= await instructor.find({ },{ _id: 0, Course: 1 } )
        res.status(200).json(data);
        }; 

        
        const getInstructorInformation= async (req,res) => { 
        try{
            // const data=await instructor.find( { "_id":req.query.id,},{})
            const data=await instructor.find( { "_id":req.session.user._id,},{})
            res.status(200).json(data);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }

        };
        
        const getInstructorRatings= async (req,res) => { 
        try{
            const instructorId = req.query.id;
            if(instructorId)
            {
                const currInstructor=await instructor.findById({_id:instructorId});
                console.log(currInstructor);
                const instructorRatings = currInstructor.Instructor_Ratings;
                console.log(instructorRatings);
                res.status(200).json(instructorRatings);
            }
            else
            {
                res.status(400).json({error:"instructorId is required"});
            }
            
        }
        catch(error){
            res.status(400).json({error:error.message});
        }

        };

        const editInstructorProfileEmailAndBio = async (req,res) => { 
        try{
            // const instructorId= req.query.id;
            const instructorId= req.session.user._id;

            if(req.body.Email ==null || req.body.Email=="")
            {
                const updatedprofile =await instructor.findByIdAndUpdate(instructorId,{First_Name:req.body.First_Name,Last_Name:req.body.Last_Name,Email:req.body.Email,Bio:req.body.Bio},{new:true});
                console.log(updatedprofile)
                res.status(200).json(updatedprofile);
            }
            else
            {
                let user = await instructor.findOne({ Email: req.body.Email });
            if (user)
                return res
                .status(409)
                .send({ error: "User with given email already Exist!" });
            else
            {
                user = await Individual_Trainee.findOne({ Email: req.body.Email });
                if(user)
                {
                    return res
                    .status(409)
                    .send({ error: "User with given email already Exist!" });
                }
                else
                {
                    user = await corporate_Trainee.findOne({ Email: req.body.Email });
                    if(user)
                    {
                        return res
                        .status(409)
                        .send({ error: "User with given email already Exist!" });
                    }
                    else
                    {
                        
                        const updatedprofile =await instructor.findByIdAndUpdate(instructorId,{First_Name:req.body.First_Name,Last_Name:req.body.Last_Name,Email:req.body.Email,Bio:req.body.Bio},{new:true});
                        console.log(updatedprofile)
                        res.status(200).json(updatedprofile);
                    }
                }
            }
            }

            
            

            
        }
        catch(error){
            res.status(400).json({error:error.message});
        }

        };
        
        
        const ratingAnInstructor = async (req,res) => { 
        try{

            const instructorId= req.query.id;
            const instructorRating = req.query.rating;
            const currInstructor = await instructor.findById({_id:instructorId});
            
            const array = currInstructor.Instructor_Ratings;
            console.log(array);
            array.push(instructorRating);
            console.log(array);
            const updatedInstructor =  await instructor.findByIdAndUpdate({_id:instructorId},{Instructor_Ratings:array},{new:true});
            const updatedarray = updatedInstructor.Instructor_Ratings;
            var x = 0;
            for (let i = 0; i < updatedarray.length; i++) {
                x += updatedarray[i];
            }
            x= x / updatedarray.length;
            console.log(x);
            const finalUpdatedInstructor = await instructor.findByIdAndUpdate({_id:instructorId},{"Rating":x},{new:true});
            res.status(200).json(finalUpdatedInstructor);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }

        };

        const reviewingAnInstructor = async (req,res) => { 
        try{

            const instructorId= req.query.id;
            const instructorReview = req.query.review;
            if(instructorReview==null||instructorReview==""||instructorReview==undefined)
            {
                res.status(400).json({error:"Please fill in the field to review the instructor!"});
            }
            else
            {
            const currInstructor = await instructor.findById({_id:instructorId});
            
            const array = currInstructor.Instructor_Reviews;
            console.log(array);
            array.push(instructorReview);
            console.log(array);
            const updatedInstructor =  await instructor.findByIdAndUpdate({_id:instructorId},{Instructor_Reviews:array},{new:true});

            res.status(200).json(updatedInstructor);
            }
            

        }
        catch(error){
            res.status(400).json({error:error.message});
        }

        };

const instructorSendReport = async(req,res) => {

// const instructorId = req.query.id;
const instructorId = req.session.user._id;

const currInstructor = await instructor.findById({_id:instructorId});
const currInstructorUsername = currInstructor.Username;

const {Report_Title,Reported_Problem,Report_Type} = req.body;


try{
const result = await reportedProblem.create({Instructor_Id:instructorId,Report_Title,Reported_Problem,Report_Type,Status:"Delivered",Username:currInstructorUsername,Role:"From Instructor"});
console.log(result)
res.status(200).json(result)
}
catch(error){
    res.status(400).json({error:error.message});
}
}

const instructorSendFollowup = async(req,res) => {

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

const fetchInstructorAllPreviousReports = async(req,res) => {

const instructorId = req.query.id;
const allReports=[];

try{
const resolvedProblems = await reportedProblem.find({Instructor_Id:mongoose.Types.ObjectId(instructorId),Status:"Resolved"}).populate('Trainee_Id');
const underSupervisionProblems = await reportedProblem.find({Instructor_Id:mongoose.Types.ObjectId(instructorId),Status:"Pending"}).populate('Trainee_Id');
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

const fetchInstructorDeliveredReports = async(req,res) => {

// const instructorId = req.query.id;
const instructorId = req.session.user._id;

try{
const deliveredProblems = await reportedProblem.find({Instructor_Id:mongoose.Types.ObjectId(instructorId),Status:"Delivered"}).populate('Instructor_Id');

console.log(deliveredProblems)
res.status(200).json(deliveredProblems)
}
catch(error){
    res.status(400).json({error:error.message});
}
}

const fetchInstructorPendingReports = async(req,res) => {

// const instructorId = req.query.id;
const instructorId = req.session.user._id;

try{
const pendingProblems = await reportedProblem.find({Instructor_Id:mongoose.Types.ObjectId(instructorId),Status:"Pending"}).populate('Instructor_Id');

console.log(pendingProblems)
res.status(200).json(pendingProblems)
}
catch(error){
    res.status(400).json({error:error.message});
}
}

const fetchInstructorResolvedReports = async(req,res) => {

// const instructorId = req.query.id;
const instructorId = req.session.user._id;

try{
const resolvedProblems = await reportedProblem.find({Instructor_Id:mongoose.Types.ObjectId(instructorId),Status:"Resolved"}).populate('Instructor_Id');

console.log(resolvedProblems)
res.status(200).json(resolvedProblems)
}
catch(error){
    res.status(400).json({error:error.message});
}
}

const fetchInstructorProblem = async(req,res) => {

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
const AllmoneyOwed = async (req,res)=>{
// const instId=req.query.id
const instId=req.session.user._id;
let Inst;
var C= await course.find({"Instructor":mongoose.Types.ObjectId(instId)},{NumberOfPaid:1,Price:1,Discount:1,Discount_Start_Date:1,Discount_End_Date:1,_id:0});
var money=0;
try{
    for(let i = 0; i < C.length;i++){
        var HmPeople=C[i].NumberOfPaid;
        var price=C[i].Price;
        var discount=C[i].Discount;
        var DiscountSart=C[i].Discount_Start_Date;
        var DiscountEnd=C[i].Discount_End_Date;
        console.log("All Courses--------->",C[i])
        if(discount==null){
        //----------------------->>>>>> WHO SET THIS DISCOUNT>????????????????
        //-------------------------------------------------->>>>>>>>>>>Do i Need to calculate for each month???????????
        //say that website take 30% from instructor
        money=money+((price) * (HmPeople) * (70/100));
        Inst=await instructor.findByIdAndUpdate({_id:instId},{Money:money});
        }
        else{
         money=money+((price)*(HmPeople)*((70/100)*((100-discount)/100)));
         Inst=await instructor.findByIdAndUpdate({_id:instId},{Money:money});

        }
    }
    res.status(200).json(money)
    //res.status(200).json(Inst)
}
catch(error){
    res.status(400).json({error:"No such Instructor"});
}



}

const fetchAcceptedContracts =async(req,res)=>{
const inst=req.session.user._id;
try{
const contract=await instructor.find({"_id":inst},{Contract:1});
const Cont=contract[0].Contract;   
 console.log(">>>>>>>>>>>>>>>>>>>>>>BEFORE",Cont)


res.status(200).json(Cont);
}
catch(error){
    res.status(400).json({error:"No such Instructor"});

}
}
const UpdateAcceptedContracts =async(req,res)=>{
const inst1=req.session.user._id;
const flag=true;
try{
const contract=await instructor.updateOne({_id:inst1},{"$set":{Contract: true}});
const contract2=await instructor.find({"_id":inst1},{Contract:1});
const Cont1=contract2[0].Contract;
console.log(">>>>>>>>>>>>>>>>>>>>>>",Cont1)
res.status(200).json(Cont1);

}
catch(error){
    res.status(400).json({error:"Cannot Update Contract"});
}
}


const editInstProfileDetails = async(req,res) => {

   
    const email=req.body.Email;
    const bio=req.body.Bio;
    const firstname=req.body.First_Name;
    const lastname = req.body.Last_Name;
    const instructorId = req.session.user._id;
    console.log("email"+email)
    console.log("bio"+bio)
    console.log("firstname"+firstname)
    console.log("lastname"+lastname)
    
    try{
        if((email==null&&bio==null&&firstname==null&&lastname==null)||(email==""&&bio==""&&firstname==""&&lastname=="")||(email==undefined&&bio==undefined&&firstname==undefined&&lastname==undefined))
        {
            return res.status(409).send({ error: "All the fields are empty!!" });
        }
        else
        {
            if(email==null||email==undefined||email=="")
            {
                if(bio==null||bio=="")
                {
                    if(firstname==null||firstname=="")
                    {
                        const updatedInst=await instructor.findByIdAndUpdate({"_id":instructorId},{Last_Name:lastname},{new:true});
                        console.log("updatedInst"+updatedInst)
                        res.status(200).json(updatedInst);
                    }
                    else
                    {
                        const updatedInst=await instructor.findByIdAndUpdate({"_id":instructorId},{First_Name:firstname,Last_Name:lastname},{new:true});
                        console.log("updatedInst"+updatedInst)
                        res.status(200).json(updatedInst);
                    }
                }
                else
                {
                    if(firstname==null||firstname=="")
                    {
                        const updatedInst=await instructor.findByIdAndUpdate({"_id":instructorId},{Bio:bio,Last_Name:lastname},{new:true});
                        console.log("updatedInst"+updatedInst)
                        res.status(200).json(updatedInst);
                    }
                    else
                    {
                        const updatedInst=await instructor.findByIdAndUpdate({"_id":instructorId},{Bio:bio,First_Name:firstname,Last_Name:lastname},{new:true});
                        console.log("updatedInst"+updatedInst)
                        res.status(200).json(updatedInst);
                    }
                }
            }
            else
            {
                    let user = await instructor.findOne({ Email: req.body.Email });
                    if (user) {
                        console.log("inst dakhalt")
                        return res
                        .status(409)
                        .send({ error: "User with given email already Exists." });
                    }
                    else
                    {
                        let user = await Individual_Trainee.findOne({ Email: req.body.Email });
                        if (user) {
                            console.log("trainee dakhalt")
                            return res
                            .status(409)
                            .send({ error: "User with given email already Exists." });
                        }
                        else
                        {
                            let user = await corporate_Trainee.findOne({ Email: req.body.Email });
                            if (user) {
                                console.log("ct dakhalt")
                                return res
                                .status(409)
                                .send({ error: "User with given email already Exists." });
                            }
                            else
                            {
                                if(bio==null||bio=="")
                {
                    if(firstname==null||firstname=="")
                    {
                        const updatedInst=await instructor.findByIdAndUpdate({"_id":instructorId},{Email:email,Last_Name:lastname},{new:true});
                        console.log("updatedInst"+updatedInst)
                        res.status(200).json(updatedInst);
                    }
                    else
                    {
                        const updatedInst=await instructor.findByIdAndUpdate({"_id":instructorId},{Email:email,First_Name:firstname,Last_Name:lastname},{new:true});
                        console.log("updatedInst"+updatedInst)
                        res.status(200).json(updatedInst);
                    }
                }
                else
                {
                    if(firstname==null||firstname=="")
                    {
                        const updatedInst=await instructor.findByIdAndUpdate({"_id":instructorId},{Email:email,Bio:bio,Last_Name:lastname},{new:true});
                        console.log("updatedInst"+updatedInst)
                        res.status(200).json(updatedInst);
                    }
                    else
                    {
                        const updatedInst=await instructor.findByIdAndUpdate({"_id":instructorId},{Email:email,Bio:bio,First_Name:firstname,Last_Name:lastname},{new:true});
                        console.log("updatedInst"+updatedInst)
                        res.status(200).json(updatedInst);
                    }
                }
                            }
                        }
                    }
                
            }
            
        }

        

    }
    catch(error){
        res.status(400).json({error:error.message});
    }
    }




module.exports ={insttitles,filterTitles2,getInstructorInformation,editInstructorProfileEmailAndBio,
    ratingAnInstructor,reviewingAnInstructor,getInstructorRatings,
    instructorSendReport,fetchInstructorAllPreviousReports,
    fetchInstructorDeliveredReports,fetchInstructorPendingReports,
    fetchInstructorResolvedReports,fetchInstructorProblem,
    instructorSendFollowup,AllmoneyOwed,fetchAcceptedContracts,UpdateAcceptedContracts,editInstProfileDetails};

// module.exports =filterTitles;
//module.exports =createinst;