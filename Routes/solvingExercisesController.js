const Course = require ('../Models/Course');
const Question = require('../Models/Question');
const Result = require('../Models/Result');
const subtitleQuestion = require('../Models/SubtitleQuestion');

const mongoose = require('mongoose');


//adding a new Course
const addCourse = async (req, res) => {
    const {Title, Subject, Course_Total_Hours, Price, Rating, Instructor_Name, discount, Course_Description} = req.body
  
    let emptyFields = []
    if (!Title) {
      emptyFields.push('Title')
    }
  
    if (!Subject) {
      emptyFields.push('Subject')
    }

      if (!Course_Total_Hours) {
        emptyFields.push('Course_Total_Hours')
      }

      if (!Price) {
        emptyFields.push('Price')
      }


      if (!Rating) {
        emptyFields.push('Rating')
      }

      if (!Instructor_Name) {
        emptyFields.push('Instructor_Name')
      }

      if (!discount) {
        emptyFields.push('discount')
      }

      if (!Course_Description) {
        emptyFields.push('Course_Description')
      }
  
    if(emptyFields.length > 0) {
      return res.status(400).json({error: 'Please fill in the missing fields.', emptyFields})
    }


    try {
        const courseAdded = await Course.create({Title, Subject, Course_Total_Hours, Price, Rating, Instructor_Name, discount, Course_Description})
        res.status(200).json(courseAdded)
      }
      catch(error) {
        res.status(400).json({error: error.message})
      }
}



//to view Courses
const viewCourses = async (req, res) => {
    const data = await Course.find({})
    res.status(200).json(data)
   // console.log(data)
   
  };


  //adding a question
  const insertQuestions = async (req, res) => {
    const courseId = req.query.CourseId;
    console.log("courseid"+courseId);
    const{QNumber,Q,Answer1,Answer2,Answer3,Answer4,correctAnswer} = req.body;
    let emptyFields = []
        if (!QNumber) {
            emptyFields.push('QNumber')
        }

        if (!Q) {
            emptyFields.push('Q')
        }

        if (!Answer1) {
          emptyFields.push('A1')
      }

      if (!Answer2) {
        emptyFields.push('A2')
    }

    if (!Answer3) {
      emptyFields.push('A3')
     }

    if (!Answer4) {
    emptyFields.push('A4')
    }


    if (!correctAnswer) {
      emptyFields.push('correctAns')
      }

        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in the missing fields.', emptyFields})
        }


    
    try{
        const questionId = (await Question.create({QNumber,Q,correctAnswer,CourseId:req.query.CourseId}))._id;
        const currQuestion = await Question.findById({_id:questionId});
        const answersArray = currQuestion.Answers;
        answersArray.push(Answer1);
        answersArray.push(Answer2);
        answersArray.push(Answer3);
        answersArray.push(Answer4);
        console.log(answersArray)
        const newQuestion = await Question.findByIdAndUpdate({_id:questionId},{Answers:answersArray},{new:true});
        
        res.status(200).json(newQuestion);
    }catch(error){
        res.status(400).json({error:error.message});
    }
 
 }



//to view the questions
const viewQuestions = async (req, res) => {
    const data = await Question.find({})
    res.status(200).json(data)
 
   
  };


  //viewing questions of a specific exercise
  const fetchQuestionsByCID = async(req,res) => {

    const courseId = req.query.CourseId;
    console.log("courseid"+courseId);

    if(courseId){
    const result = await Question.find({CourseId:mongoose.Types.ObjectId(courseId)}).populate('CourseId');
    res.status(200).json(result)
    console.log(result)
    }else{
        res.status(400).json({error:"courseId is required"})
    }
}

const viewAnswers = async(req,res) => {

  const courseId = req.query.CourseId;
  console.log("courseid"+courseId);

  if(courseId){
  const data = await Question.find({CourseId:mongoose.Types.ObjectId(courseId)}).populate('CourseId');
  const t = []
    for (let i = 0; i < data.length; i++) {
        t[i]=data[i].correctAnswer
        console.log(t);
    }
    res.status(200).json(t)
 
  }else{
      res.status(400).json({error:"courseId is required"})
  }
}



const viewSubtitleAnswer = async(req,res) => {

  // const subtitleId = req.query.SubtitleId;
  // console.log("subtitleid: "+subtitleId);

  // if(courseId){
  // const data = await Question.find({CourseId:mongoose.Types.ObjectId(courseId)}).populate('CourseId');
  // const t = []
  //   for (let i = 0; i < data.length; i++) {
  //       t[i]=data[i].correctAnswer
  //       console.log(t);
  //   }
  //   res.status(200).json(t)
 
  // }else{
  //     res.status(400).json({error:"courseId is required"})
  // }
}


  // const viewAnswers = async (req, res) => {
  //   const data = await Question.find({})
  //   const t = []
  //   for (let i = 0; i < data.length; i++) {
  //       t[i]=data[i].correctAnswer
  //       console.log(t);
  //   }
  //   res.status(200).json(t)
 
   
  // };





  const deleteQuestion = async (req, res) => {
    const { id } = req.params

    const deletedQuestion = await Question.findOneAndDelete({_id: id})

    if(!deletedQuestion) {
        return res.status(400).json({error: 'No such question'})
    }

    res.status(200).json(deletedQuestion) 
  }

// to add results
const addResults = async (req, res) => {
    const{Res, Attempts, Points, Achieved} = req.body;

    try {
        Result.insertMany({ "UserID":req.query.id, "EID":req.query.Ei , Res, Attempts, Points, Achieved }, function(err, data){
            res.json({ msg: "Data Saved Successfully...!"})
        })
    } catch (error) {
        res.json({ error })
    }
}

// to view results
const viewResults = async (req, res) => {
  const data = await Result.find({})
  res.status(200).json(data)
 // console.log(data)
 
};




//SUBTITLES



// view question of a specific subtitle
const fetchSubtitleQuestion = async(req,res) => {

  const subtitleId = req.query.SubtitleId;
 // console.log("subtitleid: "+subtitleId);

  if(subtitleId){
  const result = await subtitleQuestion.find({SubtitleId:mongoose.Types.ObjectId(subtitleId)}).populate('SubtitleId');
  res.status(200).json(result)
  //console.log(result)
  }else{
      res.status(400).json({error:"subtitleId is required"})
  }
}


// view subtitle question right answer
const subtitleQuestionAnswer = async(req,res) => {

  const subtitleId = req.query.SubtitleId;
  console.log("subtitleid: "+subtitleId);

  if(subtitleId){
  const result = await subtitleQuestion.findOne({SubtitleId:mongoose.Types.ObjectId(subtitleId)});
  //console.log(result)
  const ans =  result.correctAnswer
  //console.log(ans)
  if(ans) {
    res.status(200).json(ans)
    //console.log(result)
  }
  else {
    res.status(400).json({error:"No answer found."})
  }

  }else{
      res.status(400).json({error:"subtitleId is required"})
  }
}


 const quizSize = async(req,res) => {

  const courseid = req.query.CourseId;
  console.log("courseid: "+courseid);

  if(courseid){
  const result = await Question.find({CourseId:mongoose.Types.ObjectId(courseid)}).populate('CourseId');
  console.log(result)
  if (result.length < 3) {
    res.status(400).json({error1:"An exam of a minimum of 3 questions should be created for each course."})
  }

  else {
    res.json({ msg: "Quiz questions are enough."})
  }

  }
}
//VIEW ALL QUESTIONS OF BIG EXAM WITH CORRECT ANSWERS
const viewAllQuestions=async(req,res)=>{
  const courseId=req.query.CourseId
  try{
    const data=await Question.find({"CourseId":mongoose.Types.ObjectId(courseId)},{QNumber:1,Q:1,Answers:1,correctAnswer:1,_id:0});
    res.status(200).json(data);
  }
  catch(error){
    res.status(400).json({error:"No Questions Found"})
  }
}



// const routeCheck = async(req,res) => {
//   const currRole = req.session.user.Role;
//   console.log("ROLE:  " + currRole)
//   if(currRole=="Individual Trainee")
//   {
//    res.status(400).json({error:"TRAINEE"})
//   }
//   else
//   {
//    if (currRole == "Corporate Trainee") {
//     res.status(200).json(currRole)
//    }
      
//   }
  const routeCheck = async(req,res) => {
    const currRole = req.session.user.Role;
    console.log("ROLE:  " + currRole)
    if(currRole=="Individual Trainee")
    {
     res.status(400).json({error:"TRAINEE"})
    }
    else
    {
     if (currRole == "Corporate Trainee") {
      res.status(200).json(currRole)
     }
        
    }
  }

  module.exports = {addCourse, viewCourses, insertQuestions, viewQuestions, addResults, viewResults, viewAnswers, fetchQuestionsByCID, fetchSubtitleQuestion, subtitleQuestionAnswer, deleteQuestion, quizSize,viewAllQuestions, routeCheck}