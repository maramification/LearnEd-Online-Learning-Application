const { appendFile } = require('fs');
const passwordResetRoutes = require("./Routes/passwordReset");
const changePasswordRoutes = require("./Routes/changePassword");
const bp = require('body-parser')
const userRoutes = require("./Routes/users");
const authRoutes = require("./Routes/auth");
const session = require('express-session');
const express = require("express");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();
const MongoURI = process.env.MONGO_URI;
// const MongoURI = 'mongodb+srv://roka:roka@cluster0.9sdu6uc.mongodb.net/test' ;
//const MongoURI = 'mongodb+srv://ACL123:ACL123@aclcluster.1uihlnr.mongodb.net/ACL?retryWrites=true&w=majority' ;

//'mongodb+srv://nour:nour@cluster1.yxlcle2.mongodb.net/test'
//mongodb+srv://roka:roka@cluster0.9sdu6uc.mongodb.net/test
//mongodb+srv://nour:nour@cluster1.yxlcle2.mongodb.net/cluster1?retryWrites=true&w=majority
const fetch = require("node-fetch");
var path = require('path');
const user = require('./Models/User');





const countryToCurrency = require('iso-country-currency');

const app = express();
const port = "4000";
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(session( 
  {
    secret : 'secret-key',
    resave : false ,
    saveUninitialized : true,
  }));
  app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/passwordReset", passwordResetRoutes);
app.use("/changePassword", changePasswordRoutes);
app.use(express.static("ACL Project/views/"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('ejs').__express);


const course = require('./Models/Course');
const instructor = require('./Models/Instructor');
const userRating = require('./Models/UserRating');
const courseDiscount = require('./Models/CourseDiscount');
const admins = require('./Models/Administrator');
const pendingInstructors = require('./Models/pendingInstructors');
const corporate_Trainee = require('./Models/corporateTrainees');
const {Individual_Trainee}=require('./Models/Individual Trainee');
const progress = require("./Models/TraineeProgress");
const Subtitles = require('./Models/Subtitles');
const TraineeProgress=require("./Models/TraineeProgress");
// const individual_Trainee=require('./Models/Individual Trainee');
const {View_All_Courses, Filter_By_Subject, Filter_By_Rate, Filter_By_Price,data,createCourse,Search_By_Title,Search_By_Instructor_Name,Filter_By_Subject_And_Price,Filter_By_Subject_And_Rating,Filter_By_Subject_And_Rating_And_Price,viewMyInstructorCoursesById,getCurrentCourseDetails,getCurrentCourseInformation,addCourseDiscount,fetchCourseDiscountsByCourseId,addSubtitle,fetchSubtitlesByCourseId,fetchInstructorById,fetchCoursePreviewLink,addANewInstructor,getCurrentCourseInstructor,fetchCurrentCourseInstructorByInstructorId,fetchCurrentCourseInstructorCoursesByInstructorId,ratingACourse,fetchTheSubtitleBySubtitleId,isCurrentCourseRegistered,FilteredCourses,isDiscountViable,displayCourseDiscount,UpdateProgressOfSubtitlie,getStatusOfSubtitlie,fetchThePreviewByCourseId,isCourseFree, checkFinished, updateFinished,fetchInstructorCoursesByIdForGuest} = require('./Routes/coursesController');

const {addUserRating,saveUserRating} = require('./Routes/usersController');

const {insttitles,filterTitles2,getInstructorInformation,editInstructorProfileEmailAndBio,ratingAnInstructor,reviewingAnInstructor,getInstructorRatings,instructorSendReport,fetchInstructorAllPreviousReports,fetchInstructorDeliveredReports,fetchInstructorPendingReports,fetchInstructorResolvedReports,
  fetchInstructorProblem,instructorSendFollowup,AllmoneyOwed, fetchAcceptedContracts, UpdateAcceptedContracts,editInstProfileDetails} = require('./Routes/instructorController');

const {addAdmin, addCorporateTrainee, viewPendingInstructors, registerPendingInstructor, addInstructor, deletePendingInstructor, viewAdmins, deleteAdmin, viewInstructors, deleteInstructor, viewCT, deleteCT, updateAdmin, updateInstructor, updateCT, addPendingInstructor, fetchSeenReports, fetchAllDeliveredReports, viewIReport, updateReportStatus, updateR, adminResponse, deleteRequest, grantAccess, viewRequests,addCourseDiscountToAllCourses,addCourseDiscountToSelectedCourses,fetchAdminProfileDetails, acceptRefund, rejectRefund, viewPendingRefunds, viewAcceptedRefunds, viewRejectedRefunds, viewSingleRefund, fetchAllPendingReports, fetchAllResolvedReports} = require('./Routes/adminController');

//solving exercises
const {addCourse, viewCourses, insertQuestions, viewQuestions,
  addResults, viewResults, viewAnswers, fetchQuestionsByCID, 
  fetchSubtitleQuestion, subtitleQuestionAnswer, deleteQuestion,
   quizSize,viewAllQuestions, routeCheck} = require('./Routes/solvingExercisesController');

const {addIndividualTrainee,indiviualTraineeRegisterCourse,viewMyRegisteredCourses,traineeSendReport,fetchTraineeAllPreviousReports,fetchTraineeProfileDetails,fetchTraineeDeliveredReports,fetchTraineePendingReports,fetchTraineeResolvedReports,fetchProblem,fetchNonRegisteredTraineeCoursesForInstructor,checkIfAdminRespondedTrainee,updateReportStatusFromPendingToResolvedTrainee,traineeSendFollowup,getWalletBalance,viewMyWalletBalance,payByWalletBalance,traineeRefundRequest,fetchTraineePendingRequests,fetchCurrentRequest,getCurrentCourse,fetchTraineeResolvedRequests,editProfileDetails,checkIfRefundEligible} = require('./Routes/individualTraineeController');

const {corporateTraineeSendReport,fetchCorporateTraineeAllPreviousReports,corporateViewMyRegisteredCourses,corporateTraineeRegisterCourse,fetchCorporateTraineeProfileDetails,fetchCorporateTraineeDeliveredReports,fetchCorporateTraineePendingReports,fetchCorporateTraineeResolvedReports,fetchCorporateProblem,fetchNonRegisteredCorporateTraineeCoursesForInstructor, requestCourseAccess,corporateTraineeSendFollowup,AddNotes,getNotes, courseRequestCheck,check,fetchInstCoursesCT} = require('./Routes/corporateTraineeController');




const { isNumberObject } = require('util/types');


const cs1 = new course({
    Title: "cs1",
    Subject: "Computer",
    Instructor_Name: "Slim",
    Course_Total_Hours: 61,
    Subtitles:"5 weeks",
    Subtitles_Total_Hours:14,
    Exercises:"blalba",
    Price: 8000,
    Rating:5,
    discount: 2
  });
  const cs5 = new course({
    Title: "cs5",
    Subject: "Computer",
    Instructor_Name: "Mervat",
    Course_Total_Hours: 48,
    Subtitles:"5 weeks",
    Subtitles_Total_Hours:14,
    Exercises:"blalba",
    Price: 5800,
    Rating:5,
    discount: 29
  })
  const calculus = new course({
    Title: "calculus",
    Subject: "Math",
    Instructor_Name: "Ramy",
    Course_Total_Hours: 89,
    Subtitles:"5 weeks",
    Subtitles_Total_Hours:14,
    Exercises:"blalba",
    Price: 10000,
    Rating:5,
    discount: 50
  })
  const math5 = new course({
    Title: "math5",
    Subject: "Math",
    Instructor_Name: "Slim",
    Course_Total_Hours: 42,
    Subtitles:"5 weeks",
    Subtitles_Total_Hours:14,
    Exercises:"blalba",
    Price: 4600,
    Rating:5,
    discount: 50
  });
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));



  var database
mongoose.connect(MongoURI)
.then(()=>{
    console.log("MongoDB is now connected!")
// Starting server
    app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:4000`);
    })
})
.catch(err => console.log(err));

  app.get("/", (req, res) => {
    
    res.sendFile('/Users/Dell/Desktop/ACL Project/ACL Project/views/index.html');
    cs1.save(function(err, savedUser){
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    });
    cs5.save(function(err, savedUser){
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    });
    math5.save(function(err, savedUser){
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    });
    calculus.save(function(err, savedUser){
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    });
  
  });
  app.post("/", (req, res) => {
    console.log(req.body);
    const x = new user(req.body);
    console.log(countryToCurrency.getParamByParam('countryName', x.Country, 'currency')); // USD
    x.Currency = countryToCurrency.getParamByParam('countryName', x.Country, 'currency');
    x.save(function (err, savedUser) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return res.status(200).send();
    });
  })
  app.get('/search', async function (req, res) {
    
      course.find().then((result) => {
        res.render("coursesList",{array : result,searchKey:"req.body.Search"});
    //  console.log(result);
      }).catch((err) => {console.log(err);
    
      });
      
  
    
    });
    
    
    
    app.post("/search", async (req, res) => {
    
      // var u = req.body.Search;
      // var z = await search(u);
      course.find().then((result) => {
      res.render("coursesList",{array : result,searchKey:req.body.Search});
    //  console.log(result);
      }).catch((err) => {console.log(err);
    
      });
      

  
  
  })
app.get("/home", data);
//app.get("/View_All_Courses/", View_All_Courses);

// app.get("/View_All_Courses/",async (req,res)=>{


//   const q = req.query.q;
  

//   const keys=["Title","Subject","Instructor_Name"];
//   const search = (data)=>{
//     return data.filter((item)=>
//     keys.some((key)=>item[key].toLowerCase().includes(q))
//     );
//   };

//   // if(parseInt(q))
//   // {
    
//   //   const allCourses = await course.find({"Rating":q}, {Title: 1, Subject: 1,Subtitles_Total_Hours:1, Course_Total_Hours:1,Price:1,Discount:1,Rating:1,Course_Description:1 }).sort({createdAt:-1}) ;
    
//   //   res.status(200).json(allCourses);
//   // }
//   // else{
//     const allCourses = await course.find({}, {Title: 1, Subject: 1,Subtitles_Total_Hours:1, Course_Total_Hours:1,Price:1,Discount:1,Instructor_Name:1,Course_Description:1 }).sort({createdAt:-1}) ;
//     res.status(200).json(search(allCourses));
//   //}



// });

app.get("/View_All_Courses/",async (req,res)=>{
  const currSession = req.session.user;
  // if(currSession==null||currSession==undefined)
  // {
  //   req.session.user.Currency="USD";
  // }
  
  // const endpoint = "https://api.exchangerate-api.com/v4/latest/USD";
  // const result = await fetch(`${endpoint}?base=${req.session.user.Currency}`);
  var endpoint=null;
  var result = null; 
  var isGuest = false;
  if(currSession==null||currSession==undefined||currSession.Role=="Adminstrator")
  {
      endpoint = "https://api.exchangerate-api.com/v4/latest/USD";
      result = await fetch(`${endpoint}?base=USD`);
      isGuest=true;
  }
  else
  {
      endpoint = "https://api.exchangerate-api.com/v4/latest/USD";
      result = await fetch(`${endpoint}?base=${req.session.user.Currency}`);
  }
 
  const rates = await result.json();
  const q = req.query.q;
  const keys=["Title","Subject"];
  const search = (data)=>{
    return data.filter((item)=>
    keys.some((key)=>item[key].toLowerCase().includes(q))
    );
  };
  const allCourses = await course.find({}, {Title: 1, Subject: 1,Subtitles_Total_Hours:1, Course_Total_Hours:1,Price:1,Discount:1,Instructor_Name:1,Course_Description:1,Rating:1 }).sort({createdAt:-1}) ;
  const allCourses2 = allCourses.map(async coursaya => {
    //  let insCurrency= await Instructors.findOne({_id : coursaya.Instructor})
      const x= rates.rates.USD;
   //   console.log(coursaya.Instructor.Currency);
   if(isGuest==true)
   {
    if(coursaya.Price=="0"||coursaya.Price==0)
    {
      coursaya.Price = "Free";
    }
    else
    {
      coursaya.Price = coursaya.Price/x + "USD";
    }
    
   }
   else
   {
    if(coursaya.Price=="0"||coursaya.Price==0)
    {
      coursaya.Price = "Free";
    }
    else
    {
      coursaya.Price = coursaya.Price/x + "USD";
    }
   }
      
      //Do somethign with the user
  });
  res.status(200).json(search(allCourses));
});
app.get("/View_Most_Viewed/",async (req,res)=>{
 // console.log(req.session.user.Currency);
 // const x= await fetchRates(req.session.user.Currency);
 
 const currSession = req.session.user;
 var endpoint=null;
 var result = null; 
 var isGuest = false;
  if(currSession==null||currSession==undefined)
  {
      endpoint = "https://api.exchangerate-api.com/v4/latest/USD";
      result = await fetch(`${endpoint}?base=USD`);
      isGuest = true;
  }
  else
  {
      endpoint = "https://api.exchangerate-api.com/v4/latest/USD";
      result = await fetch(`${endpoint}?base=${req.session.user.Currency}`);
  }
 
  const rates = await result.json();
 // console.log("object");
  //console.log(rates.rates[req.session.user.Currency]);
  const q = req.query.q;
  

  const keys=["Title","Subject"];
  const search = (data)=>{
    return data.filter((item)=>
    keys.some((key)=>item[key].toLowerCase().includes(q))
    );
  };

    const allCourses = await course.find({}, {Title: 1, Subject: 1,Subtitles_Total_Hours:1, Course_Total_Hours:1,Price:1,Discount:1,Course_Description:1,Instructor:1,Instructor_Name:1,Rating:1 }).sort({Views:-1}).limit(5) ;
    const allCourses2 = allCourses.map(async coursaya => {
   //   let insCurrency= await Instructors.findById({_id : coursaya.Instructor})
    //  const currCurrency = insCurrency.Currency;
   //   console.log(currCurrency)
      const x= rates.rates.USD;
    //  console.log(x);
      
    if(isGuest==true)
   {
    if(coursaya.Price=="0"||coursaya.Price==0)
    {
      coursaya.Price = "Free";
    }
    else
    {
      coursaya.Price = coursaya.Price/x + "USD";
    }
    
   }
   else
   {
    if(coursaya.Price=="0"||coursaya.Price==0)
    {
      coursaya.Price = "Free";
    }
    else
    {
      coursaya.Price = coursaya.Price/x + "USD";
    }
   }

      
      //Do somethign with the user
  });
    // //allCourses2=allCourses2.Price*rates.rates.USD;
   //  console.log("all courses"+allCourses2);
    
    res.status(200).json(search(allCourses));
    
  //}



});



app.get("/FilteredCourses",async (req,res)=>{


  const q = req.query.q;
  

  const keys=["Title","Subject","Instructor_Name"];
  const search = (data)=>{
    return data.filter((item)=>
    keys.some((key)=>item[key].toLowerCase().includes(q))
    );
  };

            const subject = req.query.Subject;
            const rating = req.query.Rating;
            const price = req.query.Price;
            // const filteredCourses=null;
            console.log("subject"+subject);
            console.log("rating"+rating);
            console.log("rating"+rating);

            if(subject==null||subject=="")
            {
                if(rating==null||rating=="")
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
                else
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Rating:rating});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Rating:rating,Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
            }
            else
            {
                if(rating==null||rating=="")
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Subject:subject});
                        console.log("filteredCourses"+filteredCourses);
                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Subject:subject,Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
                else
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Subject:subject,Rating:rating});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Subject:subject,Rating:rating,Price:price});

                        res.status(200).json(search(filteredCourses));

                    }
                }
            }

});

app.get("/FilteredGuestCourses",async (req,res)=>{


  const q = req.query.q;
  

  const keys=["Title","Subject","Instructor_Name"];
  const search = (data)=>{
    return data.filter((item)=>
    keys.some((key)=>item[key].toLowerCase().includes(q))
    );
  };

            const subject = req.query.Subject;
            const rating = req.query.Rating;
            const price = req.query.Price;
            // const filteredCourses=null;
            console.log("subject"+subject);
            console.log("rating"+rating);
            console.log("rating"+rating);

            if(subject==null||subject=="")
            {
                if(rating==null||rating=="")
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
                else
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Rating:rating});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Rating:rating,Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
            }
            else
            {
                if(rating==null||rating=="")
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Subject:subject});
                        console.log("filteredCourses"+filteredCourses);
                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Subject:subject,Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
                else
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Subject:subject,Rating:rating});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Subject:subject,Rating:rating,Price:price});

                        res.status(200).json(search(filteredCourses));

                    }
                }
            }

});


app.get("/FilteredCoursesAdmin" , async (req,res) => {
            const subject = req.query.Subject;
            const rating = req.query.Rating;
            const price = req.query.Price;
            var filteredCourses=null;

            const q = req.query.q;
  

  const keys=["Title","Subject","Instructor_Name"];
  const search = (data)=>{
    return data.filter((item)=>
    keys.some((key)=>item[key].toLowerCase().includes(q))
    );
  };

            if(subject==null||subject=="")
            {
                if(rating==null||rating=="")
                {
                    if(price==null||price=="")
                    {
                        filteredCourses = await course.find({});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        filteredCourses = await course.find({Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
                else
                {
                    if(price==null||price=="")
                    {
                        filteredCourses = await course.find({Rating:rating});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        filteredCourses = await course.find({Rating:rating,Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
            }
            else
            {
                if(rating==null||rating=="")
                {
                    if(price==null||price=="")
                    {
                        filteredCourses = await course.find({Subject:subject});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        filteredCourses = await course.find({Subject:subject,Price:price});

                        res.status(200).json(search(filteredCourses));
                    }
                }
                else
                {
                    if(price==null||price=="")
                    {
                        filteredCourses = await course.find({Subject:subject,Rating:rating});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        filteredCourses = await course.find({Subject:subject,Rating:rating,Price:price});

                        res.status(200).json(search(filteredCourses));

                    }
                }
            }
            }); 

app.get("/FilterMyCourses",async (req,res)=>{


  const q = req.query.q;
  // const instructorId= req.query.id;
  const instructorId= req.session.user._id;
  // const instData=await course.find({Instructor:mongoose.Types.ObjectId(instructorId),"Price":p},{}).sort({createdAt:-1});
  

  const keys=["Title","Subject"];
  const search = (data)=>{
    return data.filter((item)=>
    keys.some((key)=>item[key].toLowerCase().includes(q))
    );
  };

            const subject = req.query.Subject;
            const rating = req.query.Rating;
            const price = req.query.Price;
            // const filteredCourses=null;

            if(subject==null||subject=="")
            {
                if(rating==null||rating=="")
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId)}).sort({createdAt:-1});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId),Price:price}).sort({createdAt:-1});

                        res.status(200).json(search(filteredCourses));
                    }
                }
                else
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId),Rating:rating}).sort({createdAt:-1});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId),Rating:rating,Price:price}).sort({createdAt:-1});

                        res.status(200).json(search(filteredCourses));
                    }
                }
            }
            else
            {
                if(rating==null||rating=="")
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId),Subject:subject}).sort({createdAt:-1});
                        console.log("filteredCourses"+filteredCourses)

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId),Subject:subject,Price:price}).sort({createdAt:-1});

                        res.status(200).json(search(filteredCourses));
                    }
                }
                else
                {
                    if(price==null||price=="")
                    {
                        const filteredCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId),Subject:subject,Rating:rating}).sort({createdAt:-1});

                        res.status(200).json(search(filteredCourses));
                    }
                    else
                    {
                        const filteredCourses = await course.find({Instructor:mongoose.Types.ObjectId(instructorId),Subject:subject,Rating:rating,Price:price}).sort({createdAt:-1});

                        res.status(200).json(search(filteredCourses));

                    }
                }
            }

});

app.get("/GetUserRole",async (req,res)=>{
  const currRole = req.session.user.Role;

  try{
    if(currRole==null || currRole==undefined)
    {
        res.status(400).json({error:"User not found"});
    }
    else
    {
      res.status(200).json(currRole);
    }
    
  }catch(error)
  {
      res.status(400).json({error:error.message});
  }

});

app.get("/CurrentCourse/",getCurrentCourseDetails);

app.get("/fetchInstructorCoursesByIdForGuest",fetchInstructorCoursesByIdForGuest);

app.get("/isCourseFree",isCourseFree);

app.post("/addUserCourseRating/",addUserRating);

app.post("/addCourseDiscount/",addCourseDiscount);

app.post("/addSubtitle/",addSubtitle);

app.post("/addANewInstructor",addANewInstructor);

app.post("/addIndividualTrainee",addIndividualTrainee);

app.get("/ratingACourse",ratingACourse);

app.get("/ratingAnInstructor",ratingAnInstructor);

app.get("/reviewingAnInstructor",reviewingAnInstructor);

app.get("/getInstructorRatings",getInstructorRatings);

app.get("/fetchInstructorAllPreviousReports",fetchInstructorAllPreviousReports);

app.post("/traineeSendFollowup",traineeSendFollowup);

app.get("/fetchTraineeDeliveredReports",fetchTraineeDeliveredReports);

app.get("/fetchTraineePendingReports",fetchTraineePendingReports);

app.get("/fetchTraineeResolvedReports",fetchTraineeResolvedReports);

app.get("/checkIfAdminRespondedTrainee",checkIfAdminRespondedTrainee);

app.get("/updateReportStatusFromPendingToResolvedTrainee",updateReportStatusFromPendingToResolvedTrainee);

app.get("/fetchProblem",fetchProblem);

app.get("/fetchCorporateTraineeDeliveredReports",fetchCorporateTraineeDeliveredReports);

app.get("/fetchCorporateTraineePendingReports",fetchCorporateTraineePendingReports);

app.get("/fetchCorporateTraineeResolvedReports",fetchCorporateTraineeResolvedReports);

app.get("/fetchCorporateProblem",fetchCorporateProblem);

app.post("/corporateTraineeSendFollowup",corporateTraineeSendFollowup);

app.get("/fetchInstructorDeliveredReports",fetchInstructorDeliveredReports);

app.get("/fetchInstructorPendingReports",fetchInstructorPendingReports);

app.get("/fetchInstructorResolvedReports",fetchInstructorResolvedReports);

app.get("/fetchInstructorProblem",fetchInstructorProblem);

app.post("/instructorSendFollowup",instructorSendFollowup);

app.post("/editInstProfileDetails",editInstProfileDetails);



app.get("/indiviualTraineeRegisterCourse",indiviualTraineeRegisterCourse);

app.get("/corporateTraineeRegisterCourse",corporateTraineeRegisterCourse);

app.get("/fetchCorporateTraineeProfileDetails",fetchCorporateTraineeProfileDetails);


app.get("/fetchAdminProfileDetails",fetchAdminProfileDetails);

// app.get("/viewMyRegisteredCourses",viewMyRegisteredCourses);

// app.get("/corporateViewMyRegisteredCourses",corporateViewMyRegisteredCourses);

app.get("/viewMyRegisteredCourses" , async(req,res) => {
    
      
        const currSession = req.session.user;
  
  var endpoint=null;
  var result = null; 
  var isGuest = false;
  if(currSession==null||currSession==undefined)
  {
      endpoint = "https://api.exchangerate-api.com/v4/latest/USD";
      result = await fetch(`${endpoint}?base=USD`);
      isGuest=true;
  }
  else
  {
      endpoint = "https://api.exchangerate-api.com/v4/latest/USD";
      result = await fetch(`${endpoint}?base=${req.session.user.Currency}`);
  }
 
  const rates = await result.json();
  const q = req.query.q;
  const keys=["Title","Subject","Instructor_Name"];
        const search = (data)=>{
          return data.filter((item)=>
          keys.some((key)=>item[key].toLowerCase().includes(q))
          );
        };

  const individualTraineeId = req.session.user._id;
  const currTrainee = await Individual_Trainee.findById({_id:individualTraineeId});
    const coursesArray = currTrainee.Registered_Courses;
    const coursesArray1 = [];
    console.log("coursesarray"+coursesArray)

    for (let i = 0; i < coursesArray.length; i++) {
            coursesArray1.push(await course.findById({_id:coursesArray[i]}));
        }

  const allCourses2 = coursesArray1.map(async coursaya => {
    //  let insCurrency= await Instructors.findOne({_id : coursaya.Instructor})
      const x= rates.rates.USD;
   //   console.log(coursaya.Instructor.Currency);
   if(isGuest==true)
   {
    if(coursaya.Price=="0"||coursaya.Price==0)
    {
      coursaya.Price = "Free";
    }
    else
    {
      coursaya.Price = coursaya.Price/x + "USD";
    }
    
   }
   else
   {
    if(coursaya.Price=="0"||coursaya.Price==0)
    {
      coursaya.Price = "Free";
    }
    else
    {
      coursaya.Price = coursaya.Price/x + "USD";
    }
   }
   });
    // //allCourses2=allCourses2.Price*rates.rates.USD;
   //  console.log("all courses"+allCourses2);
    
    res.status(200).json(search(coursesArray1));
   //-------------------------------
    //     const individualTraineeId = req.session.user._id;

    //     const q = req.query.q;
  

    //     const keys=["Title","Subject","Instructor_Name"];
    //     const search = (data)=>{
    //       return data.filter((item)=>
    //       keys.some((key)=>item[key].toLowerCase().includes(q))
    //       );
    //     };

    // try{
    // const currTrainee = await Individual_Trainee.findById({_id:individualTraineeId});
    // const coursesArray = currTrainee.Registered_Courses;
    // const coursesArray1 = [];
    // console.log("coursesarray"+coursesArray)

    // for (let i = 0; i < coursesArray.length; i++) {
    //         coursesArray1.push(await course.findById({_id:coursesArray[i]}));
    //     }

    // console.log("coursesArray1"+coursesArray1)
    // res.status(200).json(search(coursesArray1));
    // }
    // catch(error){
    //     res.status(400).json({error:error.message});
    // }
});

app.get("/corporateViewMyRegisteredCourses" , async(req,res) => {
    
        //const corporateTrainee = req.query.CorporateTraineeId;
        const corporateTrainee = req.session.user._id;

        const q = req.query.q;
  

        const keys=["Title","Subject","Instructor_Name"];
        const search = (data)=>{
          return data.filter((item)=>
          keys.some((key)=>item[key].toLowerCase().includes(q))
          );
        };
        

    try{
    const currTrainee = await corporate_Trainee.findById({_id:corporateTrainee});
    const coursesArray = currTrainee.Registered_Courses;
    const coursesArray1 = [];
    console.log(coursesArray)

    for (let i = 0; i < coursesArray.length; i++) {
            coursesArray1.push(await course.findById({_id:coursesArray[i]}));
        }
    
    console.log(coursesArray1)
    res.status(200).json(search(coursesArray1));
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
});

app.get("/fetchTheSubtitleBySubtitleId",fetchTheSubtitleBySubtitleId);

app.get("/fetchTraineeAllPreviousReports",fetchTraineeAllPreviousReports);

app.get("/fetchTraineeProfileDetails",fetchTraineeProfileDetails);

app.get("/fetchCorporateTraineeAllPreviousReports",fetchCorporateTraineeAllPreviousReports);

app.get("/fetchNonRegisteredTraineeCoursesForInstructor",fetchNonRegisteredTraineeCoursesForInstructor);

app.get("/fetchNonRegisteredCorporateTraineeCoursesForInstructor",fetchNonRegisteredCorporateTraineeCoursesForInstructor);

app.get("/fetchInstCoursesCT",fetchInstCoursesCT);

app.get("/isCurrentCourseRegistered",isCurrentCourseRegistered);

app.post("/traineeSendReport",traineeSendReport);

app.post("/corporateTraineeSendReport",corporateTraineeSendReport);

app.post("/instructorSendReport",instructorSendReport);

// app.post("/addQuestion",addQuestion);

app.post("/editProfileDetails",editProfileDetails);


app.post("/Filter_By_Subject/", Filter_By_Subject);
app.post("/Filter_By_Price/",Filter_By_Price);
app.post("/Filter_By_Rate/",Filter_By_Rate);
app.post("/Search_By_Instructor_Name/",Search_By_Instructor_Name);
app.post("/Search_By_Title/",Search_By_Title);
app.post("/Filter_By_Subject_And_Price/",Filter_By_Subject_And_Price);
app.post("/Filter_By_Subject_And_Rating/",Filter_By_Subject_And_Rating);
app.post("/Filter_By_Subject_And_Rating_And_Price/",Filter_By_Subject_And_Rating_And_Price);

app.post("/createCourse/", createCourse);

app.get("/isDiscountViable",isDiscountViable);
app.get("/displayCourseDiscount",displayCourseDiscount);


app.get("/MyCourses",async (req,res)=>{

  const q = req.query.q;
  // const instructorId = req.params.id;
  const instructorId = req.session.user._id;
  console.log(q);

  const keys=["Title","Subject"];
  const search = (data)=>{
    return data.filter((item)=>
    keys.some((key)=>item[key].toLowerCase().includes(q))
    );
  };

  // if(parseInt(p))
  // {
  //   const instData=await course.find({Instructor:mongoose.Types.ObjectId(instructorId),"Price":p},{}).sort({createdAt:-1});
  //   console.log(instData)
  //   console.log(instData)
  //   res.status(200).json(instData);
  // }
  // else
  // {
    const instData=await course.find({Instructor:mongoose.Types.ObjectId(instructorId)},{});
    //console.log(instData)
    console.log(search(instData))
    res.status(200).json(search(instData));
  //}
  

});


app.get("/MyProfile/",getInstructorInformation);

app.post("/EditMyProfile/",editInstructorProfileEmailAndBio);

app.post("/saveUserRating/",saveUserRating);

app.get("/CurrentCourse/",getCurrentCourseInformation);

app.get("/fetchCourseDiscounts",fetchCourseDiscountsByCourseId);

app.get("/fetchSubtitlesByCourseId",fetchSubtitlesByCourseId);

app.get("/fetchInstructorById",fetchInstructorById);

app.get("/fetchCoursePreviewLink",fetchCoursePreviewLink);

app.get("/fetchThePreviewByCourseId",fetchThePreviewByCourseId);

app.get("/getCurrentCourseInstructor",getCurrentCourseInstructor);

app.get("/fetchCurrentCourseInstructorByInstructorId",fetchCurrentCourseInstructorByInstructorId);

app.get("/fetchCurrentCourseInstructorCoursesByInstructorId",fetchCurrentCourseInstructorCoursesByInstructorId);

app.get("/viewMyWalletBalance",viewMyWalletBalance);

app.get("/payByWalletBalance",payByWalletBalance);

app.get("/fetchTraineePendingRequests",fetchTraineePendingRequests);

app.get("/fetchTraineeResolvedRequests",fetchTraineeResolvedRequests);


app.get("/fetchCurrentRequest",fetchCurrentRequest);

app.get("/getCurrentCourse",getCurrentCourse);

app.get("/checkIfRefundEligible",checkIfRefundEligible);


app.post("/traineeRefundRequest",traineeRefundRequest);




app.get("/Filter_By_Price_And_Subject/:Price/:Subject",filterTitles2);

app.get("/adminHome/admins", viewAdmins);

app.get("/adminHome/pendingInstructors", viewPendingInstructors);

app.get("/adminHome/instructors", viewInstructors);

app.get("/adminHome/corporateTrainees", viewCT);

app.post("/adminHome/addAdmin", addAdmin);

app.post("/adminHome/addCorporateTrainee", addCorporateTrainee);

app.post("/adminHome/registerInstructorRequest", registerPendingInstructor);

app.post("/acceptPendingInstructor/:id", addPendingInstructor)

app.post("/adminHome/addInstructor", addInstructor);

app.put("/adminHome/update/admins/:id", updateAdmin);

app.put("/adminHome/update/instructors/:id", updateInstructor);

app.put("/adminHome/update/corporateTrainees/:id", updateCT);

app.delete('/adminHome/pendingInstructors/:id', deletePendingInstructor);

app.delete('/adminHome/delete/admins/:id', deleteAdmin);

app.delete('/adminHome/delete/instructors/:id', deleteInstructor);

app.delete('/adminHome/delete/corporateTrainees/:id', deleteCT);


// WEEKS
// app.post('/addWeek', addWeek);
// app.get('/viewWeeks', viewWeeks);

//EXERCISES
// app.post('/addExercise', addExercise);
// app.get('/viewExercises', viewExercises);

///QUESTIONS
app.post('/addQ', insertQuestions);
app.get('/fetchQ', fetchQuestionsByCID);
app.get('/viewQuestions', viewQuestions);
app.get('/viewAnswers', viewAnswers);
app.delete('/deleteQ/:id', deleteQuestion);


//RESULTS
app.post('/addResults' , addResults);
app.get('/viewResults', viewResults);
app.get('/routeCheck', routeCheck);


//ADMIN SIDE REPORTS
//app.get('/pendingInstructorReports', fetchInstructorAllPendingReports);
app.get('/seenReports', fetchSeenReports);
app.get('/pendingReports', fetchAllPendingReports);
app.get('/resolvedReports', fetchAllResolvedReports);
app.get('/unseenReports', fetchAllDeliveredReports);
app.get('/viewReport', viewIReport);
app.put('/updatePending', updateReportStatus);
app.put('/manualStatus', updateR);
app.put('/adminRes', adminResponse);


//REQUEST COURSE ACCESS
app.post('/reqAccess', requestCourseAccess);
app.delete('/deleteReq/:id', deleteRequest);
app.put('/grantAccess/:id', grantAccess);
app.get('/viewRequests', viewRequests);
app.get('/req', courseRequestCheck);

//UPDATE ALL COURSE DISCOUNTS
app.post("/addCourseDiscountToAllCourses",addCourseDiscountToAllCourses);
app.post("/addCourseDiscountToSelectedCourses",addCourseDiscountToSelectedCourses);

//SUBTITLE QUESTIONS
app.get('/getSubQ', fetchSubtitleQuestion);
app.get('/subQAnswer', subtitleQuestionAnswer);

//ADMIN REFUNDS
app.put('/acceptRefund', acceptRefund);
app.put('/rejectRefund', rejectRefund);
app.get('/pendingRefunds', viewPendingRefunds);
app.get('/acceptedRefunds', viewAcceptedRefunds);
app.get('/rejectedRefunds', viewRejectedRefunds);
app.get('/refund', viewSingleRefund);
app.get('/quizSize', quizSize);




//BASBOSAAAAAA
//test
app.get("/checkCourseFinished",checkFinished)
app.get("/updateFinished",updateFinished);

app.get("/checkTest",check);
app.get("/viewAllQuestions",viewAllQuestions)
app.get("/allMoneyOwed",AllmoneyOwed)

app.get("/fetchCorporateTraineeNotes",getNotes);
app.get("/getSubtitlesStatus",getStatusOfSubtitlie);
app.get("/updatetSubtitlesStatus",UpdateProgressOfSubtitlie);
app.post("/fetchCorporateTraineeAddNotes",AddNotes);

app.get("/fetchContract",fetchAcceptedContracts);
app.get("/updateContract",UpdateAcceptedContracts);

//HANA
const TraineeWalletSchema = require("./Models/TraineeWalletScheema");
const course_price=require('./Models/Course');


//app.get('/ViewBalance', getWalletBalance);


// app.post("/api/stripe-payment", (req, res) => {
//   const stripe = require("stripe")(
//     "sk_test_51MDnmRA1yEL5EJbENdbcmKmYkqssvZWFhhRFlgGEL4wfhyqQ940KHCYXEq0CbQ12Phm6qGln9DP5bpO8sxPhNI30006fYbIEV7"
//   );


//   const { email} = req.body;
//   const token = req.query.TraineeId;
//   const courseId = req.query.CourseId;
//   const coursePrice = course_price.findById({_id:courseId},{Price:1,_id:0})
//   const traineebalance = TraineeWalletSchema.findById({_id:mongoose.Types.ObjectId(req.query.TraineeId)},{Balance:1,_id:0})
//   let alert=require('alert');

//   if(coursePrice<traineebalance){

//     alert("Amount withdrawn from wallet");
//     traineebalance -= coursePrice

//   }
//   else{

//     if(traineebalance !=0){

//       alert("Amount withdrawn partially from wallet");
//       traineebalance = 0;

//       stripe.customers
//     .create({
//       email: email,
//       source: token.id,
//       name: token.card.name,
//     })
//     .then((customer) => {
//       return stripe.charges.create({
//         // amount: parseFloat(amount) * 100,
//         // description: `Payment for USD ${amount}`,
//         currency: "USD",
//         customer: customer.id,
//       });
//     })
//     .then((charge) => res.status(200).send(charge))
//     .catch((err) => console.log(err));
//   }
//   else{

//     stripe.customers
//     .create({
//       email: email,
//       source: token.id,
//       name: token.card.name,
//     })
//     .then((customer) => {
//       return stripe.charges.create({
//         // amount: parseFloat(amount) * 100,
//         // description: `Payment for USD ${amount}`,
//         currency: "USD",
//         customer: customer.id,
//       });
//     })
//     .then((charge) => res.status(200).send(charge))
//     .catch((err) => console.log(err));
//   }
   
// } 
//   const new_balance = TraineeWalletSchema.findByIdAndUpdate({_id:mongoose.Types.ObjectId(req.query.TraineeId)},{Balance:traineebalance})

// });

//NOUR
// const env = require("dotenv").config({ path: "./.env" });

// app.use(express.static(process.env.STATIC_DIR));

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-08-01",
// });

// app.get("/config", (req, res) => {
//   res.send({
//     publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//   });
// });



       
        //HANA
       // const TraineeWalletSchema = require("./Models/TraineeWalletScheema");
        //const course_price=require('./Models/Course');
        
        
        app.get('/ViewBalance', getWalletBalance);
        
        
        // app.post("/api/stripe-payment", (req, res) => {
        //   const stripe = require("stripe")(
        //     "sk_test_51MDnmRA1yEL5EJbENdbcmKmYkqssvZWFhhRFlgGEL4wfhyqQ940KHCYXEq0CbQ12Phm6qGln9DP5bpO8sxPhNI30006fYbIEV7"
        //   );
        
        
        //   const { email} = req.body;
        //   const token = req.query.TraineeId;
        //   const courseId = req.query.CourseId;
        //   const coursePrice = course_price.findById({_id:courseId},{Price:1,_id:0})
        //   const traineebalance = TraineeWalletSchema.findById({_id:mongoose.Types.ObjectId(req.query.TraineeId)},{Balance:1,_id:0})
        //   let alert=require('alert');
        
        //   if(coursePrice<traineebalance){
        
        //     alert("Amount withdrawn from wallet");
        //     traineebalance -= coursePrice
        
        //   }
        //   else{
        
        //     if(traineebalance !=0){
        
        //       alert("Amount withdrawn partially from wallet");
        //       traineebalance = 0;
        
        //       stripe.customers
        //     .create({
        //       email: email,
        //       source: token.id,
        //       name: token.card.name,
        //     })
        //     .then((customer) => {
        //       return stripe.charges.create({
        //         // amount: parseFloat(amount) * 100,
        //         // description: `Payment for USD ${amount}`,
        //         currency: "USD",
        //         customer: customer.id,
        //       });
        //     })
        //     .then((charge) => res.status(200).send(charge))
        //     .catch((err) => console.log(err));
        //   }
        //   else{
        
        //     stripe.customers
        //     .create({
        //       email: email,
        //       source: token.id,
        //       name: token.card.name,
        //     })
        //     .then((customer) => {
        //       return stripe.charges.create({
        //         // amount: parseFloat(amount) * 100,
        //         // description: `Payment for USD ${amount}`,
        //         currency: "USD",
        //         customer: customer.id,
        //       });
        //     })
        //     .then((charge) => res.status(200).send(charge))
        //     .catch((err) => console.log(err));
        //   }
           
        // } 
        //   const new_balance = TraineeWalletSchema.findByIdAndUpdate({_id:mongoose.Types.ObjectId(req.query.TraineeId)},{Balance:traineebalance})
        
        // });
        
        const env = require("dotenv").config({ path: "./.env" });
        
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
          apiVersion: "2022-08-01",
        });
        app.use(express.static(process.env.STATIC_DIR));
        
        
  app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
        
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

                app.post("/createpayment", async (req, res) => {
                  const traineeId = req.session.user._id;
                  console.log("-------->>>>>>",traineeId);
                  var c;
                  var already=[];
                  let a=[];
                  let i;
                  let j;
                  var sub;
                  try{
          
                        const paymentIntent = await stripe.paymentIntents.create({
                          amount:90,
                          automatic_payment_methods:{
                            enabled:true,
                          },
                          currency:"usd",
                        })
                        res.send({clientSecret:paymentIntent.client_secret});     
                      }
                      catch(e){
                        return res.status(400).send({
                          error:{message:e.message,}
                        })
                      }
              
              });
        
        // app.post("/create-payment", async (req, res) => {
        
        //     const courseId = req.query.CourseId;
        //     //const traineeId = req.query.TraineeId;
        //     const traineeId = req.session.user._id;
        //     console.log("-------->>>>>>",traineeId);
        //     var c;
        //     var already=[];
        //     let a=[];
        //     let i;
        //     let j;
        //     var sub;
        //     //const traineeId = req.session.user._id;
        //     const Course = await course.findById({_id:courseId});
        //     const Price = parseInt(Course.Price);
        //     console.log(Price);
        //   try{
        //     const paymentIntent = await stripe.paymentIntents.create({
        //       amount:Price,
        //       automatic_payment_methods:{
        //         enabled:true,
        //       },
        //       currency:"usd",
        //     }) 
        //     //creating Progress
        // //     sub = await Subtitles.find({CourseId:mongoose.Types.ObjectId(courseId)});
        // //     console.log("SUB ARRAY------->>>>",sub)
        // //     //check if this corporate has this course or not
        // //     const cop=await Individual_Trainee.findById({_id:traineeId})
        // //     const coursesArray =  cop.Registered_Courses;
    
        // //     console.log("CourseArray",coursesArray)
            
        // //     if(coursesArray.length>0){
        // //         console.log("dakhalt")
        // //     for ( i = 0; i < coursesArray.length; i++) {
        // //         //Check if this course is already in traineeProgress DB
        // //     already=await TraineeProgress.find({"Trainee_Id":traineeId,CourseId:mongoose.Types.ObjectId(coursesArray[i])});
        // //     console.log(arrayIsEmpty(already));
        // //     //console.log(arrayIsEmpty(already.length));
        // //     console.log("ASLUN!!!!")

        // //     if(!arrayIsEmpty(already) ){
        // //     //coursesArray1.push(await course.findById({_id:coursesArray[i]},{_id:1}));
        // //     console.log("Hi, et3ml abl keda")
        // //     } 
        // //     else{  
        // //         for ( j = 0; j < (sub.length); j++) {
        // //         old= await TraineeProgress.create({"Trainee_Id":traineeId,"SubtitleId":mongoose.Types.ObjectId(sub[j]._id),"CourseId":mongoose.Types.ObjectId(coursesArray[i])});
        // //         console.log(" NEW here,Bye")
        // //         }  
        // // const bb= await course.findById({_id:courseId},{NumberOfPaid:1})
        // // const b=(bb.NumberOfPaid)+1;
        // // console.log("Number of people ------->>>>>>>>>>>",bb);
        // // const counter=await course.findByIdAndUpdate({_id:courseId},{NumberOfPaid:b}); 
        // //         }
        // // }
        // // }

        //     res.send({clientSecret:paymentIntent.client_secret});
        //   }
        //   catch(error){
        //     return res.status(400).send({
        //      error:error.message
        //     })
        //   }
        
        // });



// function arrayIsEmpty(array) {
//             //If it's not an array, return FALSE.
//             if (!Array.isArray(array)) {
//                 return FALSE;
//             }
//             //If it is an array, check its length property
//             if (array.length == 0) {
//                 //Return TRUE if the array is empty
//                 return true;
//             }
//             //Otherwise, return FALSE.
//             return false;
//         }






 //NOUR       
// app.post("/create-payment-intent", async (req, res) => {

//     const courseId = req.query.CourseId;
//     // const traineeId = req.query.TraineeId;
//     const traineeId = req.session.user._id;
//     var c;
//     var already=[];
//     let a=[];
//     let i;
//     let j;
//     var sub;
//     //const traineeId = req.session.user._id;
//     const currCourse = await course.findById({_id:courseId});
//     const currPrice = parseInt(currCourse.Price);
//     console.log(currPrice);

//     //creating Progress

//                 sub = await Subtitles.find({CourseId:mongoose.Types.ObjectId(courseId)});
//                 console.log("SUB ARRAY------->>>>",sub)
//                 //check if this corporate has this course or not
//                 const cop=await Individual_Trainee.findById({_id:traineeId})
//                 const coursesArray =  cop.Registered_Courses;
        
//                 console.log("CourseArray",coursesArray)
                
//                 if(coursesArray.length>0){
//                     console.log("dakhalt")
//                 for ( i = 0; i < coursesArray.length; i++) {
//                     //Check if this course is already in traineeProgress DB
//                 already=await TraineeProgress.find({"Trainee_Id":traineeId,CourseId:mongoose.Types.ObjectId(coursesArray[i])});
//                 console.log(arrayIsEmpty(already));
//                 //console.log(arrayIsEmpty(already.length));
//                 console.log("ASLUN!!!!")

//                 if(!arrayIsEmpty(already) ){
//                 //coursesArray1.push(await course.findById({_id:coursesArray[i]},{_id:1}));
//                 console.log("Hi, et3ml abl keda")
//                 } 
//                 else{  
//                     for ( j = 0; j < (sub.length); j++) {
//                     old= await TraineeProgress.create({"Trainee_Id":traineeId,"SubtitleId":mongoose.Types.ObjectId(sub[j]._id),"CourseId":mongoose.Types.ObjectId(coursesArray[i])});
//                     console.log(" NEW here,Bye")
//                     }  
                    
//             const bb= await course.findById({_id:courseId},{NumberOfPaid:1})
//             const b=(bb.NumberOfPaid)+1;
//             console.log("Number of people ------->>>>>>>>>>>",bb);
//             const counter=await course.findByIdAndUpdate({_id:courseId},{NumberOfPaid:b}); 
//                     }
//             }

//             }
    

//   try{
    
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency:"usd",
//       amount:currPrice,
//       automatic_payment_methods:{
//         enabled:true,
//       },
//     })
    
//     res.send({clientSecret:paymentIntent.client_secret});
    
//   }
//   catch(e){
//     return res.status(400).send({
//       error:{message:e.message,}
//     })
//   }

// });
