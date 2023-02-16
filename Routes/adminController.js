
        
        const pendingInstructors = require ('../Models/pendingInstructors');
        const Administrator = require ('../Models/Administrator');
        const corporateTrainees = require ('../Models/corporateTrainees');
        const {Individual_Trainee} = require ('../Models/Individual Trainee');
        const Instructors = require ('../Models/Instructor');
        const InstructorReports = require ('../Models/InstructorReports');
        const TraineeReports = require ('../Models/TraineeReports');
        const CTraineeReports = require ('../Models/CorporateTraineeReports');
        
        const mongoose = require('mongoose');
        const courseRequests = require("../Models/CourseRequests");
        const course = require('../Models/Course');
        const refund = require("../Models/TraineeRefunds");
        const TraineeProgress=require("../Models/TraineeProgress");
        const crypto = require("crypto");
        const bcrypt = require("bcrypt");
        const countryToCurrency = require('iso-country-currency');
        const Subtitles = require('../Models/Subtitles');


        //to view admins from instructors
        const viewAdmins = async (req, res) => {
        const data = await Administrator.find({})
        res.status(200).json(data)
        // console.log(data)
        
        };



        //adding a new Admin
        const addAdmin = async (req, res) => {
            
        const {Username, Password} = req.body
        let user = await Individual_Trainee.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given Username already exists."})
		user = await corporateTrainees.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given Username already exists."})
		user = await Instructors.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given Username already exists."})
        if(req.body.Password !== req.body.confirmPassword){
            return res.status(400).json({error: "Passwords are not compatible."})
		}
        user = await Administrator.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given Username already exists."})
        let emptyFields = []
        if (!Username) {
            emptyFields.push('Username')
        }

        if (!Password) {
            emptyFields.push('Password')
        }

        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in the missing fields.', emptyFields})
        }



        try {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(req.body.Password, salt);
            console.log("USERNAME: " + req.body.Username)
            console.log("pass 3ady " + req.body.Password)
            console.log("hashed " + hashPassword)
         //   const admin = await Administrator.create({Username, hashPassword})        
		const admin = await new Administrator({ Username: req.body.Username, Password: hashPassword }).save();
            res.status(200).json(admin)
        }
        catch(error) {
            res.status(400).json({error: error.message})
        }
        
        // const data = req.body 
        // console.log(data)
        // if (!data) {
        //   res.status(400).json('Please insert in required text fields.')
        //   throw new Error('Please insert in required text fields.')
        // }
        // else {
        // const insertData = Administrator.create(req.body)
        // res.status(200).json('Admin added successfully.')
        // }

        };



        //deleting an admin

        const deleteAdmin = async (req, res) => {
        const { id } = req.params

        const deletedAdmin = await Administrator.findOneAndDelete({_id: id})

        if(!deletedAdmin) {
            return res.status(400).json({error: 'No such admin'})
        }

        res.status(200).json(deletedAdmin)


        // const deleteAdmin = async (req, res) => {
        //   const data = await Administrator.findById(req.params.id)
        //   console.log("hereeee")
        //   if (!data) {
        //     res.status(400).json('Record not found.')
        //     throw new Error('Record not found.')
        //   }
        //   await data.remove()
        //   res.status(200).json({id: req.params.id})
        // }
        }





        //updating admin
        const updateAdmin = async (req, res) => {
        const admoona = await Administrator.findById(req.params.id) 
        if (!admoona) {
            res.status(400).json('Admin not found')
            throw new Error('Admin not found.')
        }

        const updatedAdmin = await Administrator.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json(updatedAdmin)

        }




        //to view pending requests from instructors
        const viewPendingInstructors = async (req, res) => {
        const data = await pendingInstructors.find({})
        res.status(200).json(data)
        console.log(data)


        // const viewPendingInstructors = async (req, res) => {
        //   const data = await pendingInstructors.find({})
        //   console.log(data)
        //   if (data.length == 0) {
        //     res.status(400).json("No records found.")
        //   }
        //   res.status(200).json(data)
        // };
        }



        //adding a pending instructor
        const registerPendingInstructor = async (req, res) => {
        const {Username, Password, First_Name, Last_Name, Email, Gender} = req.body

        let emptyFields = []
        if (!Username) {
            emptyFields.push('Username')
        }

        if (!Password) {
            emptyFields.push('Password')
        }

        if (!First_Name) {
            emptyFields.push('First_Name')
        }

        if (!Last_Name) {
            emptyFields.push('Last_Name')
        }

        if (!Email) {
            emptyFields.push('Email')
        }

        if (!Gender) {
            emptyFields.push('Gender')
        }

        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in the missing fields.', emptyFields})
        }



        try {
            const pendingI = await pendingInstructors.create({Username, Password, First_Name, Last_Name, Email, Gender})
            res.status(200).json(pendingI)
        }
        catch(error) {
            res.status(400).json({error: error.message})
        }
        // const registerPendingInstructor = async (req,res) => {
        //   const data = pendingInstructors.create(req.body);
        //   res.status(200).json('Pending instructor added successfully.')
        }



        //deleting a pending instructor

        const deletePendingInstructor = async (req, res) => {
        const { id } = req.params

        const deletedPendingInstructor = await pendingInstructors.findOneAndDelete({_id: id})

        if(!deletedPendingInstructor) {
            return res.status(400).json({error: 'No such pending Instructor'})
        }

        res.status(200).json(deletedPendingInstructor)

        // const deletePendingInstructor = async (req, res) => {
        //   const data = await pendingInstructors.findById(req.params.id)
        //   console.log(data)
        //   if (!data) {
        //     res.status(400).json('Record not found.')
        //     throw new Error('Record not found.')
        //   }
        //   await data.remove()
        //   res.status(200).json({id: req.params.id})
        }



        //to view instructors
        const viewInstructors = async (req, res) => {
        const data = await Instructors.find({})
        console.log(data)
        if (data.length == 0) {
            res.status(400).json("No records found.")
        }
        res.status(200).json(data)
        };



        //adding a pending instructor
        const addPendingInstructor = async (req, res) => {
        const data = await pendingInstructors.findById(req.params.id)
        const {Username, Password, First_Name, Last_Name, Email, Gender} = data
        const setData = Instructors.create({Username, Password, First_Name, Last_Name, Email, Gender})

        res.json(Username)

        }


        //adding an instructor

        const addInstructor = async (req, res) => {
        const {Username, Password, First_Name, Last_Name, Email, Gender,Bio} = req.body
        if(req.body.Password !== req.body.confirmPassword){
            return res.status(400).json({error: "Passwords are not compatible."})
		}
        let user = await Individual_Trainee.findOne({ Email: req.body.Email });
		if (user)
        return res.status(400).json({error: "User with given email already exists."})
		user =await corporateTrainees.findOne({ Email: req.body.Email });
		if (user)
        return res.status(400).json({error: "User with given email already exists."})

		user =await Instructors.findOne({ Email: req.body.Email });
		if (user)
        return res.status(400).json({error: "User with given email already exists."})

		user = await Individual_Trainee.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given username already exists."})

		user = await corporateTrainees.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given username already exists."})
	
		user = await Instructors.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given username already exists."})
		user = await Administrator.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given username already exists."})
			

        let emptyFields = []
        if (!Username) {
            emptyFields.push('Username')
        }

        if (!Password) {
            emptyFields.push('Password')
        }

        if (!First_Name) {
            emptyFields.push('First_Name')
        }

        if (!Last_Name) {
            emptyFields.push('Last_Name')
        }

        if (!Email) {
            emptyFields.push('Email')
        }

        if (!Gender) {
            emptyFields.push('Gender')
        }
        // if(!Bio){
        //     emptyFields.push('Bio')
        // }

        if(emptyFields.length > 0) {
            console.log(emptyFields.length)
            return res.status(400).json({error: 'Please fill in the missing fields.', emptyFields})
        }



        try {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(req.body.Password, salt);
          //  const instructor = await Instructors.create({Username, Password, First_Name, Last_Name, Email, Gender,Bio})
            const instructor = await new Instructors({ ...req.body, Password: hashPassword}).save();

            res.status(200).json(instructor)
        }
        catch(error) {
            res.status(400).json({error: error.message})
        }
        // const addInstructor = async (req, res) => {
        //   const data = Instructors.create(req.body)
        //   res.status(200).json('Instructor added successfully.')
        // }
        }




        //deleting an instructor

        const deleteInstructor = async (req, res) => {
        const { id } = req.params

        const deletedInstructor = await Instructors.findOneAndDelete({_id: id})

        if(!deletedInstructor) {
            return res.status(400).json({error: 'No such pending Instructor'})
        }

        res.status(200).json(deletedInstructor)
        // const deleteInstructor = async (req, res) => {
        //   const data = await Instructors.findById(req.params.id)
        //   console.log(data)
        //   if (!data) {
        //     res.status(400).json('Record not found.')
        //     throw new Error('Record not found.')
        //   }
        //   await data.remove()
        //   res.status(200).json({id: req.params.id})
        }


        //updating an instructor
        const updateInstructor = async (req, res) => {
        const admoona = await Instructors.findById(req.params.id) 
        if (!admoona) {
            res.status(400).json('Admin not found')
            throw new Error('Admin not found.')
        }

        const updatedAdmin = await Instructors.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json(updatedAdmin)

        }



        //to view corporate trainees
        const viewCT = async (req, res) => {
        const data = await corporateTrainees.find({})
        res.status(200).json(data)
        console.log(data)

        // const viewCT = async (req, res) => {
        //   const data = await corporateTrainees.find({})
        //   console.log(data)
        //   if (data.length == 0) {
        //     res.status(400).json("No records found.")
        //   }
        //   res.status(200).json(data)
        // };
        }



        //adding a corporate Trainee

        const addCorporateTrainee = async (req, res) => {
        const {Username, Password,confirmPassword, First_Name, Last_Name, Email, Gender, Corporate, Country} = req.body
        let user = await Individual_Trainee.findOne({ Email: req.body.Email });
		if (user)
        return res.status(400).json({error: "User with given email already exists."})
		user =await corporateTrainees.findOne({ Email: req.body.Email });
		if (user)
        return res.status(400).json({error: "User with given email already exists."})

		user =await Instructors.findOne({ Email: req.body.Email });
		if (user)
        return res.status(400).json({error: "User with given email already exists."})

		user = await Individual_Trainee.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given username already exists."})

		user = await corporateTrainees.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given username already exists."})
	
		user = await Instructors.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given username already exists."})
		user = await Administrator.findOne({ Username: req.body.Username });
		if (user)
        return res.status(400).json({error: "User with given username already exists."})
			
        if(req.body.Password !== req.body.confirmPassword){
           
            return res.status(400).json({error: "Passwords are not compatible."})		}

        let emptyFields = []
        if (!Username) {
            emptyFields.push('Username')
        }

        if (!Password) {
            emptyFields.push('Password')
        }

        if (!First_Name) {
            emptyFields.push('First_Name')
        }

        if (!Last_Name) {
            emptyFields.push('Last_Name')
        }

        if (!Email) {
            emptyFields.push('Email')
        }

        if (!Gender) {
            emptyFields.push('Gender')
        }

        if (!Corporate) {
            emptyFields.push('Corporate')
        }
        if (!confirmPassword) {
            emptyFields.push('confirmPassword')
        }

        if (!Country) {
            emptyFields.push('Country')
        }

        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in the missing fields.', emptyFields})
        }



        try {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(req.body.Password, salt);
          //  const ct = await corporateTrainees.create({Username, hashPassword, First_Name, Last_Name, Email, Gender, Corporate,"Role":"Corporate Trainee"})
            const ct = await new corporateTrainees({ ...req.body, Password: hashPassword,"Role":"Corporate Trainee" }).save();
            ct.Currency = await countryToCurrency.getParamByParam('countryName', ct.Country, 'currency');
            ct.save();
            res.status(200).json(ct)
          

        }
        catch(error) {
            res.status(400).json({error: error.message})
        }

        // const addCorporateTrainee = async (req, res) => {
        //   const data = corporateTrainees.create(req.body)
        //   res.status(200).json('Trainee added.')
        // }
        }


        //deleting a corporate trainee

        const deleteCT = async (req, res) => {
        const { id } = req.params

        const deletedCT = await corporateTrainees.findOneAndDelete({_id: id})

        if(!deletedCT) {
            return res.status(400).json({error: 'No such trainee.'})
        }

        res.status(200).json(deletedCT)
        // const deleteCT = async (req, res) => {
        //   const data = await corporateTrainees.findById(req.params.id)
        //   console.log(data)
        //   if (!data) {
        //     res.status(400).json('Record not found.')
        //     throw new Error('Record not found.')
        //   }
        //   await data.remove()
        //   res.status(200).json({id: req.params.id})
        // }
        }


        //updating a corporate trainee
        const updateCT = async (req, res) => {
        const admoona = await corporateTrainees.findById(req.params.id) 
        if (!admoona) {
            res.status(400).json('Admin not found')
            throw new Error('Admin not found.')
        }

        const updatedAdmin = await corporateTrainees.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json(updatedAdmin)

        }


        //REPORTS
        // const viewInstructorReports = async (req, res) => {
        //     const data = await InstructorReports.find({})
        //     console.log(data)
        //     if (data.length == 0) {
        //         res.status(400).json("No reports found.")
        //     }
        //     res.status(200).json(data)
        //     };

        // const fetchInstructorAllPendingReports = async(req,res) => {
        
        //     try{
        //     const pendingReports = await InstructorReports.find({Status:"Pending"}).populate()
        //     res.status(200).json(pendingReports)
        //     // for (let i = 0; i < pendingProblems.length; i++) {
        //     //             pendingReports.push(pendingProblems[i]);
        //     //             console.log(pendingReports)
        //     // }
        
        // }
        //     catch(error){
        //         res.status(400).json({error:error.message});
        //     }
        // }


        const fetchSeenReports = async(req,res) => {

            const allReports=[];
        
            try{
            const iResolvedProblems = await InstructorReports.find({Status:"Resolved"}).populate();
            const iPendingProblems = await InstructorReports.find({Status:"Pending"}).populate();

            const tResolvedProblems = await TraineeReports.find({Status:"Resolved"}).populate();
            const tPendingProblems = await TraineeReports.find({Status:"Pending"}).populate();

            const ctResolvedProblems = await CTraineeReports.find({Status:"Resolved"}).populate();
            const ctPendingProblems = await CTraineeReports.find({Status:"Pending"}).populate();

            for (let i = 0; i < iResolvedProblems.length; i++) {
                        allReports.push(iResolvedProblems[i]);
                }
        
            for (let i = 0; i < iPendingProblems.length; i++) {
                        allReports.push(iPendingProblems[i]);
                }


                for (let i = 0; i < tResolvedProblems.length; i++) {
                    allReports.push(tResolvedProblems[i]);
            }

        for (let i = 0; i < tPendingProblems.length; i++) {
                    allReports.push(tPendingProblems[i]);
            }


            for (let i = 0; i < ctResolvedProblems.length; i++) {
                        allReports.push(ctResolvedProblems[i]);
                }
        
            for (let i = 0; i < ctPendingProblems.length; i++) {
                        allReports.push(ctPendingProblems[i]);
                }
        
        
            console.log(allReports)
            res.status(200).json(allReports)
            }
            catch(error){
                res.status(400).json({error:error.message});
            }
        }


        const fetchAllDeliveredReports = async(req,res) => {
        const allReports = [];
            try{
            const iDeliveredReports = await InstructorReports.find({Status:"Delivered"}).populate()
            const tDeliveredReports = await TraineeReports.find({Status:"Delivered"}).populate()
            const ctDeliveredReports = await CTraineeReports.find({Status:"Delivered"}).populate()
            for (let i = 0; i < iDeliveredReports.length; i++) {
                allReports.push(iDeliveredReports[i]);
        }


        for (let i = 0; i < tDeliveredReports.length; i++) {
            allReports.push(tDeliveredReports[i]);
    }

    for (let i = 0; i < ctDeliveredReports.length; i++) {
        allReports.push(ctDeliveredReports[i]);
    }
            res.status(200).json(allReports)
            // for (let i = 0; i < pendingProblems.length; i++) {
            //             pendingReports.push(pendingProblems[i]);
            //             console.log(pendingReports)
            // }
            
        
        }
            catch(error){
                res.status(400).json({error:error.message});
            }
        }

        const viewIReport = async (req, res) => {
            const RID = req.query.RID;
            //console.log(repId)

            if(RID)
            {
                const currRep = await InstructorReports.find({_id:RID}).populate();
            // console.log(currRep.length)
                if (currRep.length > 0) {
                // console.log("here0")
                    res.status(200).json(currRep)
                }

                if (currRep == 0) {
                // console.log("here1")
                    const currRep1 = await TraineeReports.find({_id:RID}).populate();
                    if (currRep1.length > 0) {
                        res.status(200).json(currRep1)
                    }

                    if(currRep1.length == 0 ) {
                        const currRep2 = await CTraineeReports.find({_id:RID}).populate();
                        res.status(200).json(currRep2)
                    }
                }
            }
            
        } 
        


        //updating status from delivered to pending
        const updateReportStatus = async (req, res) => {
        const RID = req.query.RID

        if(RID)
        {
            const currRep = await InstructorReports.find({_id:RID}).populate();
            // console.log(currRep.length)
            if (currRep.length > 0) {
                const updatedIR = await InstructorReports.findByIdAndUpdate({_id:RID}, {Status:"Pending"}, {new : true})
                res.status(200).json(updatedIR)
            }

            if (currRep == 0) {
                // console.log("here1")
                const currRep1 = await TraineeReports.find({_id:RID}).populate();
                if (currRep1.length > 0) {
                    const updatedTR = await TraineeReports.findByIdAndUpdate({_id:RID}, {Status:"Pending"}, {new : true})
                    res.status(200).json(updatedTR)
                }

                if(currRep1.length == 0 ) {
                    const updatedCTR = await CTraineeReports.findByIdAndUpdate({_id:RID}, {Status:"Pending"}, {new : true})
                res.status(200).json(updatedCTR)
                }
            }
        }

        }




        const updateR = async (req, res) => {
            const RID = req.query.RID
            const {Status} = req.body
            let emptyFields = []
            if (!Status) {
            emptyFields.push('Status')
            }

            if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in the missing fields.', emptyFields})
        }
        

        if (Status) {if(RID)
            {
            const currRep = await InstructorReports.find({_id:RID}).populate();
            // console.log(currRep.length)
            if (currRep.length > 0) {
                const updatedIR = await InstructorReports.findByIdAndUpdate({_id:RID},{Status}, {new : true})
                res.status(200).json(updatedIR)
            }
    
            if (currRep == 0) {
                // console.log("here1")
                const currRep1 = await TraineeReports.find({_id:RID}).populate();
                if (currRep1.length > 0) {
                    const updatedTR = await TraineeReports.findByIdAndUpdate({_id:RID}, {Status}, {new : true})
                    res.status(200).json(updatedTR)
                }
    
                if(currRep1.length == 0 ) {
                    const updatedCTR = await CTraineeReports.findByIdAndUpdate({_id:RID}, {Status}, {new : true})
                res.status(200).json(updatedCTR)
                }
            }
        }

        }}


        const adminResponse = async (req, res) => { 
            const RID = req.query.RID
            const {Admin_Response} = req.body
            let emptyFieldz = []
        if (!Admin_Response) {
            emptyFieldz.push('Admin_Response')
            }

            if(emptyFieldz.length > 0) {
                return res.status(400).json({error1: 'Please fill in the missing fields.', emptyFieldz})
            }
    

            if (Admin_Response) { if(RID)
                {
                const currRep = await InstructorReports.find({_id:RID}).populate();
                // console.log(currRep.length)
                if (currRep.length > 0) {
                    const updatedIR = await InstructorReports.findByIdAndUpdate({_id:RID},{Admin_Response}, {new : true})
                    res.status(200).json(updatedIR)
                }
                if (currRep == 0) {
                    // console.log("here1")
                    const currRep1 = await TraineeReports.find({_id:RID}).populate();
                    if (currRep1.length > 0) {
                        const updatedTR = await TraineeReports.findByIdAndUpdate({_id:RID}, {Admin_Response}, {new : true})
                        res.status(200).json(updatedTR)
                    }
        
                    if(currRep1.length == 0 ) {
                        const updatedCTR = await CTraineeReports.findByIdAndUpdate({_id:RID}, {Admin_Response}, {new : true})
                    res.status(200).json(updatedCTR)
                    }
                }
            }}
        
    }
            
           const deleteRequest = async (req, res) => {
        const { id } = req.params

        const deletedRequest = await courseRequests.findOneAndDelete({_id: id})

        if(!deletedRequest) {
            return res.status(400).json({error: 'No such request'})
        }

        res.status(200).json(deletedRequest)
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
        const grantAccess = async (req, res) => {

            const { id } = req.params //id of the request
            const request = await courseRequests.findById({_id:id}).populate();
            var c;
            var already=[];
            let a=[];
            let i;
            let j;
            var sub;
            console.log(request)
            const courseId = request.CourseId;
            const traineeId = request.CorporateTraineeId;
            const trainee=traineeId.toString();
            const currTrainee =  await corporateTrainees.findById({_id:traineeId}).populate();
            const updatedArray = currTrainee.Registered_Courses;
        // console.log(updatedArray);
            updatedArray.push(courseId);
        // console.log(updatedArray);
            try{
            const updatedTrainee =  await corporateTrainees.findByIdAndUpdate({_id:traineeId},{Registered_Courses:updatedArray},{new:true});
            console.log(updatedTrainee)
            console.log("Traineee Id------->>>>",traineeId);
        //creating Progress

             sub = await Subtitles.find({CourseId:mongoose.Types.ObjectId(courseId)});
             console.log("SUB ARRAY------->>>>",sub)
            //check if this corporate has this course or not
            const cop=await corporateTrainees.findById({_id:traineeId})
            const coursesArray =  cop.Registered_Courses;
       
            console.log("CourseArray",coursesArray)
            
            if(coursesArray.length>0){
            for ( i = 0; i < coursesArray.length; i++) {
                //Check if this course is already in traineeProgress DB
            already=await TraineeProgress.find({"Trainee_Id":trainee,CourseId:mongoose.Types.ObjectId(coursesArray[i])});
            console.log(arrayIsEmpty(already));
            //console.log(arrayIsEmpty(already.length));
            console.log("ASLUN!!!!")

            if(!arrayIsEmpty(already) ){
             //coursesArray1.push(await course.findById({_id:coursesArray[i]},{_id:1}));
             console.log("Hi, et3ml abl keda")
            } 
            else{  
                for ( j = 0; j < (sub.length); j++) {
                old= await TraineeProgress.create({"Trainee_Id":trainee,"SubtitleId":mongoose.Types.ObjectId(sub[j]._id),"CourseId":mongoose.Types.ObjectId(coursesArray[i])});
                console.log(" NEW here,Bye")
                }  
                 
         const bb= await course.findById({_id:courseId},{NumberOfPaid:1})
         const b=(bb.NumberOfPaid)+1;
         console.log("Number of people ------->>>>>>>>>>>",bb);
         const counter=await course.findByIdAndUpdate({_id:courseId},{NumberOfPaid:b}); 
                }
         }

         }
         
        
        
            res.status(200).json(updatedTrainee);
            //res.status(200).json(old)

    
         }
            catch(error){
                res.status(400).json({error:error.message});
            }
        }
        


        const viewRequests = async (req, res) => {
            const data = await courseRequests.find({})
            console.log("DATA"+data)
            // if (data.length == 0) {
            //     res.status(400).json("No new requests.")
            // }
            res.status(200).json(data)
            };

        //add course discounts to all courses
        const addCourseDiscountToAllCourses = async(req,res)=>{

        const {Discount,Discount_Start_Date,Discount_End_Date}= req.body;
        const courseId=req.query.CourseId;
        
    try{

        const allCourses = await course.find({});

        for(let i = 0;i<allCourses.length;i++)
        {
            const currCourse = await course.findById({_id:allCourses[i]._id});
            console.log(currCourse.Discount);
            if(currCourse.Discount==null||currCourse.Discount=="")
            {
                console.log("jj")
                const updatedDiscount= await course.findByIdAndUpdate({_id:allCourses[i]._id}, { Discount: Discount,Discount_Start_Date:Discount_Start_Date,Discount_End_Date:Discount_End_Date},{new:true});
                console.log(updatedDiscount);
                
            }
            // else
            // {
            //     console.log("ll");
            //     res.status(400).json({error:"There is a discount already defined for this course! Please try at a later time."});
            // }
        }
        res.status(200).json("Done");

        
        
    }
    catch(error){
        res.status(400).json({error:error.message});
    }

}

//add course discounts to selected courses
const addCourseDiscountToSelectedCourses = async(req,res)=>{

        const coursesArray = req.body.coursesArray;
        
        const {Discount,Discount_Start_Date,Discount_End_Date}= req.body;
        
        
    try{

        //const allCourses = await course.find({});

        for(let i = 0;i<coursesArray.length;i++)
        {
            const currCourse = await course.findById({_id:coursesArray[i]._id});
            console.log(currCourse.Discount);
            if(currCourse.Discount==null||currCourse.Discount=="")
            {
                console.log("jj")
                const updatedDiscount= await course.findByIdAndUpdate({_id:coursesArray[i]._id}, { Discount: Discount,Discount_Start_Date:Discount_Start_Date,Discount_End_Date:Discount_End_Date},{new:true});
                console.log(updatedDiscount);
                
            }
        }
        res.status(200).json("Done");

        
        
    }
    catch(error){
        res.status(400).json({error:error.message});
    }

}

const fetchAdminProfileDetails = async(req,res) => {

    const adminId = req.query.AdminId;

    try{
    const currAdmin = await Administrator.findById({_id:adminId});
    console.log(currAdmin)
    res.status(200).json(currAdmin)
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}


const acceptRefund = async(req,res)=>{
    const refid = req.query.refId
    const currRefund = await refund.findById({_id: refid})
    // console.log("REFUND " + currRefund)
    const currCourse = currRefund.Course_Id +"";
    const trainee = currRefund.Trainee_Id
    const currTrainee = await Individual_Trainee.findById({_id: trainee})
    // console.log("currCourse"+currCourse)
    const wallet = currTrainee.Wallet
    
    const amountToBeRefunded = currRefund.Amount
    const updatedWallet = wallet + amountToBeRefunded
    
    try {
        const updatedTrainee = await Individual_Trainee.findByIdAndUpdate({_id: trainee}, {Wallet: updatedWallet}, {new: true})
        const oldCourses = updatedTrainee.Registered_Courses;
        let newArray = [];
        for(let i=0;i<oldCourses.length;i++)
        {
            if(oldCourses[i]._id!=currCourse)
            {
                newArray.push(oldCourses[i])
            }
        }
        // console.log("newArray"+newArray);
        const updatedTrainee2 = await Individual_Trainee.findByIdAndUpdate({_id: trainee}, {Registered_Courses: newArray}, {new: true})
        // console.log("updatedTrainee2"+updatedTrainee2);
        const updatedRefund = await refund.findByIdAndUpdate({_id: refid}, {Status:"Accepted"}, {new: true})
        //decrement Number of people for this Course
        const old= await course.findById({_id:currCourse},{NumberOfPaid:1})
        old=(old.NumberOfPaid)--;
        const counter=await course.findByIdAndUpdate({_id:currCourse},{NumberOfPaid:old});
      
        //deduct Money From
        const inst=await course.find({"_id":currCourse},{"Instructor":1});
        const inst2=await Instructors.findById({_id:inst.Instructor},{Money:1});

        const moneydeducted= inst2.Money-(amountToBeRefunded-(amountToBeRefunded*30/100));
        const inst3=await Instructors.findByIdAndUpdate({_id:inst.Instructor},{Money:moneydeducted});
    
        res.status(200).json(updatedRefund);
    }
    
    catch(error) {
        res.status(400).json({error:error.message});
    }
    
    
    
    }


const rejectRefund = async(req,res)=>{
    const refid = req.query.refId
    const currRefund = await refund.findById({_id: refid})
    //console.log("REFUND " + currRefund)
    const Admin_Response = req.body
    // const trainee = currRefund.Trainee_Id
    // const currTrainee = await Individual_Trainee.findById({_id: trainee})
    // const wallet = currTrainee.Wallet
    // const amountToBeRefunded = currRefund.Amount
    // const updatedWallet = wallet + amountToBeRefunded
    
    try {
       // const updatedTrainee = await Individual_Trainee.findByIdAndUpdate({_id: trainee}, {Wallet: updatedWallet}, {new: true})
      // const updatedRefund1 = await refund.findByIdAndUpdate({_id: id}, {Admin_Response:Admin_Response}, {new: true})
        const updatedRefund = await refund.findByIdAndUpdate({_id: refid}, {Status:"Rejected"}, {new: true})
        res.status(200).json(updatedRefund);
    }
    
    catch(error) {
        res.status(400).json({error:error.message});
    }
    
    
    
    }


    const viewPendingRefunds = async (req, res) => {
        const data = await refund.find({Status: "Pending"})
        res.status(200).json(data)
        // console.log(data)
        
        };


    const viewAcceptedRefunds = async (req, res) => {
            const data = await refund.find({Status: "Accepted"})
            res.status(200).json(data)
            // console.log(data)
            
            };


    const viewRejectedRefunds = async (req, res) => {
                const data = await refund.find({Status: "Rejected"})
                res.status(200).json(data)
                // console.log(data)
                
                };


const viewSingleRefund = async(req,res) => {
    const id = req.query.refId
    const data = await refund.findById({_id: id})
    res.status(200).json(data)
}




const fetchAllPendingReports = async(req,res) => {
    const allReports = [];
        try{
        const iPendingReports = await InstructorReports.find({Status:"Pending"}).populate()
        const tPendingReports = await TraineeReports.find({Status:"Pending"}).populate()
        const ctPendingReports = await CTraineeReports.find({Status:"Pending"}).populate()
        for (let i = 0; i < iPendingReports.length; i++) {
            allReports.push(iPendingReports[i]);
    }


    for (let i = 0; i < tPendingReports.length; i++) {
        allReports.push(tPendingReports[i]);
}

for (let i = 0; i < ctPendingReports.length; i++) {
    allReports.push(ctPendingReports[i]);
}
        res.status(200).json(allReports)
    
    }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

   
    const fetchAllResolvedReports = async(req,res) => {
        const allReports = [];
            try{
            const iResolvedReports = await InstructorReports.find({Status:"Resolved"}).populate()
            const tResolvedReports = await TraineeReports.find({Status:"Resolved"}).populate()
            const ctResolvedReports = await CTraineeReports.find({Status:"Resolved"}).populate()
            for (let i = 0; i < iResolvedReports.length; i++) {
                allReports.push(iResolvedReports[i]);
        }


        for (let i = 0; i < tResolvedReports.length; i++) {
            allReports.push(tResolvedReports[i]);
    }

    for (let i = 0; i < ctResolvedReports.length; i++) {
        allReports.push(ctResolvedReports[i]);
    }
            res.status(200).json(allReports)
        
        }
            catch(error){
                res.status(400).json({error:error.message});
            }
        }


        
        
        module.exports = {addAdmin, addCorporateTrainee, viewPendingInstructors, registerPendingInstructor, addInstructor, deletePendingInstructor, viewAdmins, deleteAdmin, viewInstructors, deleteInstructor, viewCT, deleteCT, updateAdmin, updateInstructor, updateCT, addPendingInstructor, fetchSeenReports, fetchAllDeliveredReports, viewIReport, updateReportStatus, updateR, adminResponse, deleteRequest, grantAccess, viewRequests,addCourseDiscountToAllCourses,addCourseDiscountToSelectedCourses,fetchAdminProfileDetails,acceptRefund, rejectRefund, viewPendingRefunds, viewAcceptedRefunds, viewRejectedRefunds, viewSingleRefund, fetchAllPendingReports, fetchAllResolvedReports}