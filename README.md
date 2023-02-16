# Stranger-Team
# LearnEd
The aim of our project is to implement a learning website that is user friendly with an ease of navigation to facilitate the online learning experience. 

# Behind This Project 
The main objective behind implementing this project is to help pave the way for us to learn more about developing an interactive website using MERN Stack and help enhance our skills further, preparing us for the real working world. Additionally, to help those who seek education by giving them a more accessible platform to learn.

# Build Status 
If the user is logged in as an instructor and they are adding a course, the course total hours and the subtitle total hours should be inserted manually since they are not calculated automatically. 
The filter components applied can only filter the results only once and the user can navigate and search through them further.
The navigation is not as easy as it should be since no back buttons that reroute to thr previous page are available in all pages, only in some. Moreover, there is no clear home button displayed on some of the navigation bars and the user has to figure out on their own that rerouting back to the main page is by clicking the logo displayed on their navigation bar.
If a user wants to view information about the instructor, they have to figure out how to do that by clicking on the instructor name in their current viewed course as it does not appear to be clickable.
An instructor is not able to view any ratings or reviews about themselves.
If the trainee/corporate trainee wishes to save their notes as a pdf and they click on the button, this will cause the website to lag and it will take an indefinite amount of time to save it.
When defining a discount as an admin/instructor, there are no restrictions that hinder the user from defining the start date as one that has already passed. It handles the case of the start date being at a later date than the end date by not displaying the discount placed when the instructor goes back to their course page after setting it but not by error handling which could be a little confusing for the user.
The instructor does not get a contract stating the terms and conditions/policies they have to abide by when becoming an instructor on the website when they log in for the first time.
Regarding the UI, the buttons are not placed in the most optimal position, and there is a great amount of white space that can be very displeasing to the eye.

# Code Style 
 Project is entirely coded using JavaScript and React. Our code style is standard and consistent throughout the entire project, with use of context and hooks in certain pages.

# Framework Used
The frameworks used in our project are MongoDB, Express, React, Node.js and BootStrap. 
# Features 
Our website's flow is smooth to navigate through and easy to understand. Everything is laid out in simplicity for the user to be able to understand and doesn't face problems while using the website. Our website includes all the general required features with the additional ability of the trainee/corporate trainee to retake any course exam before viewing its answers or if they failed it if they wish to do so. Additionally, an instructor is unable to remove or edit an already published course.
# Code Exmaples 
A snippet of our code: An admin adding another admin to the system. 
```javascript
const Administrator = require ('../Models/Administrator');
const corporateTrainees = require ('../Models/corporateTrainees');
const {Individual_Trainee} = require ('../Models/Individual Trainee');
const Instructors = require ('../Models/Instructor');
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

        };
const express = require("express");
const app = express();
app.post("/adminHome/addAdmin", addAdmin);


```

# ScreenShots

# Installation 
The following libraries were installed so that the website runs on javascript.

react-stripe-js": "^1.16.1",
    "@stripe/stripe-js": "^1.46.0",
    "alert": "^5.1.3",
    "bcrypt": "^5.1.0",
    "bootstrap": "^5.2.3",
    "crypto": "^1.0.1",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "emailer": "^0.0.0",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "final-form": "^4.20.7",
    "git": "^0.1.5",
    "install": "^0.13.0",
    "iso-country-currency": "^0.6.0",
    "joi": "^17.7.0",
    "joi-password-complexity": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "mdb-react-ui-kit": "^5.1.0",
    "mongoose": "^6.8.1",
    "nodemailer": "^6.8.0",
    "npm": "^9.2.0",
    "projection": "^1.1.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.6.0",
    "react-icons": "^4.7.1",
    "react-stripe": "^0.1.0",
    "stripe": "^11.5.0"

# API References 
We used a rate exchange API that converts the course's USD price to the user's country currency.
Rate Exchange API: "https://api.exchangerate-api.com/v4/latest/USD"
We also used the stripe API to simulate a payment transaction for the user. 
Stripe API:"https://stripe.com/"

# Tests
Testing was done using Postman.

Admin functions:
POST http://localhost:4000/adminHome/addCorporateTrainee
BODY: {
    "Username": "alyaa",
    "Password": "Hello@123",
    "confirmPassword": "Hello@123",
    "First_Name": "Alyaa",
    "Last_Name": "Ali",
    "Email": "aa@gmail.com",
    "Gender":"Female",
    "Corporate":"GUC",
    "Country":"Egypt"

}

RESPONSE: {
    "Username": "alyaa",
    "Password": "$2b$10$FJfsusvaMvl7EFo58HjSLO9OdP.CwE93TzJjbOJ1rX9H8.IV1/2IW",
    "First_Name": "Alyaa",
    "Last_Name": "Ali",
    "Email": "aa@gmail.com",
    "Gender": "Female",
    "Corporate": "GUC",
    "Registered_Courses": [],
    "Role": "Corporate Trainee",
    "verified": true,
    "Country": "Egypt",
    "_id": "63b84d4ab4b44a018aba650a",
    "createdAt": "2023-01-06T16:33:14.845Z",
    "updatedAt": "2023-01-06T16:33:14.845Z",
    "__v": 0,
    "Currency": "EGP"
}


GET http://localhost:4000/adminHome/corporateTrainees
RESPONSE: [
    {
        "_id": "63b2f46f6ee79942d46f9c78",
        "Username": "maram.a",
        "Password": "$2b$10$NYnZ5ytwJWBmOqjyDlAWZO3yWRRAgTGK0YjZZIQw.4CH/.TkBrjGO",
        "First_Name": "Maram",
        "Last_Name": "Ahmed",
        "Email": "maram.a@gmail.com",
        "Gender": "Female",
        "Corporate": "GUC",
        "Registered_Courses": [
            "63b2f2286ee79942d46f9c1a",
            "63b30d7275815936cf6ce8b6"
        ],
        "Role": "Corporate Trainee",
        "verified": true,
        "Country": "Bahrain",
        "createdAt": "2023-01-02T15:12:47.007Z",
        "updatedAt": "2023-01-04T11:42:34.601Z",
        "__v": 0,
        "Currency": "BHD"
    },
    {
        "_id": "63b84d4ab4b44a018aba650a",
        "Username": "alyaa",
        "Password": "$2b$10$FJfsusvaMvl7EFo58HjSLO9OdP.CwE93TzJjbOJ1rX9H8.IV1/2IW",
        "First_Name": "Alyaa",
        "Last_Name": "Ali",
        "Email": "aa@gmail.com",
        "Gender": "Female",
        "Corporate": "GUC",
        "Registered_Courses": [],
        "Role": "Corporate Trainee",
        "verified": true,
        "Country": "Egypt",
        "createdAt": "2023-01-06T16:33:14.845Z",
        "updatedAt": "2023-01-06T16:33:15.176Z",
        "__v": 0,
        "Currency": "EGP"
    }
]

GET http://localhost:4000/adminHome/instructors
RESPONSE: [
    {
        "_id": "63b2ee056ee79942d46f9c10",
        "Username": "nour.khaled",
        "Password": "$2b$10$IUdTQMpBwub1R24B5hRPe.oT4BB0bzqutu.Ats61YfS8gH4jCpY0W",
        "First_Name": "Nour",
        "Last_Name": "Elfaramawy",
        "Email": "nour.khaled@gmail.com",
        "Gender": "Female",
        "Instructor_Ratings": [
            5
        ],
        "Instructor_Reviews": [
            "yalahweeeeee"
        ],
        "Role": "Instructor",
        "verified": true,
        "Money": 48.355999999999995,
        "Contract": false,
        "Currency": "USD",
        "createdAt": "2023-01-02T14:45:25.784Z",
        "updatedAt": "2023-01-04T11:55:30.714Z",
        "__v": 0,
        "Rating": 5
    },
    {
        "_id": "63b3056e37114b029ef1e1ad",
        "Username": "salma.mohamed",
        "Password": "$2b$10$EhweHxCqiHn0rIwb94419.uMX6FwAtEtwsau6mDTozivajzkdQxqe",
        "First_Name": "Salma",
        "Last_Name": "Mohamed",
        "Email": "salma.a@gmail.com",
        "Gender": "Female",
        "Instructor_Ratings": [],
        "Instructor_Reviews": [],
        "Role": "Instructor",
        "verified": true,
        "Money": 0,
        "Contract": false,
        "Currency": "USD",
        "createdAt": "2023-01-02T16:25:18.179Z",
        "updatedAt": "2023-01-02T17:18:44.349Z",
        "__v": 0
    },
    {
        "_id": "63b305be37114b029ef1e1b6",
        "Username": "ahmed.hassan",
        "Password": "$2b$10$ppPaV45DIDh0Kj2HFjOEJuQZ2xEZlGpio9GdHAGlleqZAK7fDx/MK",
        "First_Name": "Ahmed",
        "Last_Name": "Hassan",
        "Email": "ahmed.a@gmail.com",
        "Gender": "Male",
        "Instructor_Ratings": [],
        "Instructor_Reviews": [],
        "Role": "Instructor",
        "verified": true,
        "Money": 0,
        "Contract": false,
        "Currency": "USD",
        "createdAt": "2023-01-02T16:26:38.896Z",
        "updatedAt": "2023-01-02T16:26:38.896Z",
        "__v": 0
    },
    {
        "_id": "63b569caf8e06433cada16ec",
        "Username": "mark1",
        "Password": "$2b$10$RU5GkEEG/.L9Y99t4zE6I.5DO5h7vs3bUVQgNzPYpXFVWPpHmrMZu",
        "First_Name": "Mark",
        "Last_Name": "Sherif",
        "Email": "markkk@gmail.com",
        "Gender": "Male",
        "Instructor_Ratings": [],
        "Instructor_Reviews": [],
        "Role": "Instructor",
        "verified": true,
        "Money": 0,
        "Contract": false,
        "Currency": "USD",
        "createdAt": "2023-01-04T11:58:02.307Z",
        "updatedAt": "2023-01-04T11:58:02.307Z",
        "__v": 0
    },
    {
        "_id": "63b6881c9e7f886daa074217",
        "Username": "aaa",
        "Password": "$2b$10$Fo7ZoW68IZGVSZmLYQDbS.7ehF/E8y89nWW2zaVKI8GbaM4jfKysC",
        "First_Name": "aaa",
        "Last_Name": "aaa",
        "Email": "aaa@gmail.com",
        "Gender": "Female",
        "Instructor_Ratings": [],
        "Instructor_Reviews": [],
        "Role": "Instructor",
        "verified": true,
        "Money": 0,
        "Contract": false,
        "Currency": "USD",
        "createdAt": "2023-01-05T08:19:40.208Z",
        "updatedAt": "2023-01-05T08:19:40.208Z",
        "__v": 0
    }
]

POST http://localhost:4000/adminHome/addInstructor
BODY: {
    "Username": "mk",
    "Password": "Hello@123",
    "confirmPassword": "Hello@123",
    "First_Name": "Mariam",
    "Last_Name": "kamel",
    "Email": "mkk@gmail.com",
    "Gender": "Female"

}
RESPONSE: {
    "Username": "mk",
    "Password": "$2b$10$texo0Wke9UYliHJpf1wRwuFWBmW5FIxMDd1tw.BpUw.Sy1PEoWEf2",
    "First_Name": "Mariam",
    "Last_Name": "kamel",
    "Email": "mkk@gmail.com",
    "Gender": "Female",
    "Instructor_Ratings": [],
    "Instructor_Reviews": [],
    "Role": "Instructor",
    "verified": true,
    "Money": 0,
    "Contract": false,
    "Currency": "USD",
    "_id": "63b851acb4b44a018aba6523",
    "createdAt": "2023-01-06T16:51:56.982Z",
    "updatedAt": "2023-01-06T16:51:56.982Z",
    "__v": 0
}


POST http://localhost:4000/adminHome/addAdmin
BODY: {
    "Username": "mkkkk1",
    "Password": "Hello@123",
    "confirmPassword": "Hello@123"

}
RESPONSE: {
    "Username": "mkkkk1",
    "Password": "$2b$10$0Fv9KLEbcg18JCdjOI1uleCoG9fL15.EinVaUewo5WOwBqR/IB.uK",
    "verified": true,
    "Role": "Adminstrator",
    "Currency": "USD",
    "_id": "63b85217b4b44a018aba6529",
    "createdAt": "2023-01-06T16:53:43.509Z",
    "updatedAt": "2023-01-06T16:53:43.509Z",
    "__v": 0
}


GET http://localhost:4000/seenReports
RESPONSE: [
    {
        "_id": "63b30a3d75815936cf6ce855",
        "Instructor_Id": "63b2ee056ee79942d46f9c10",
        "Report_Title": "Course Discount",
        "Reported_Problem": "I can't add a discount to my course.",
        "Report_Type": "Technical",
        "Status": "Pending",
        "Username": "nour.khaled",
        "Role": "From Instructor",
        "Followups": [],
        "createdAt": "2023-01-02T16:45:49.985Z",
        "updatedAt": "2023-01-04T11:43:25.336Z",
        "__v": 0
    },
    {
        "_id": "63b301d30aee8fed84809ac8",
        "Trainee_Id": "63b300760aee8fed848099cf",
        "Report_Title": "This course is a scam.",
        "Reported_Problem": "This course has very brief information about coding and gives rather vague examples and exercises and is simply just a waste of time.",
        "Report_Type": "Other",
        "Status": "Resolved",
        "Username": "sara.zeyada",
        "Role": "From Individual Trainee",
        "Followups": [],
        "createdAt": "2023-01-02T16:09:55.682Z",
        "updatedAt": "2023-01-02T16:21:33.306Z",
        "__v": 0
    }
]


GET http://localhost:4000/unseenReports
RESPONSE: [
    {
        "_id": "63b311e575815936cf6ce912",
        "Instructor_Id": "63b3056e37114b029ef1e1ad",
        "Report_Title": "I am not receiving any money for my courses",
        "Reported_Problem": "I can see that I have students enrolled in my courses, however I am not receiving any money from their enrollment and my courses are not free of charge.",
        "Report_Type": "Financial",
        "Status": "Delivered",
        "Username": "salma.mohamed",
        "Role": "From Instructor",
        "Followups": [],
        "createdAt": "2023-01-02T17:18:29.699Z",
        "updatedAt": "2023-01-02T17:18:29.699Z",
        "__v": 0
    },
    {
        "_id": "63b315e575815936cf6ce9b1",
        "Instructor_Id": "63b305be37114b029ef1e1b6",
        "Report_Title": "Discount",
        "Reported_Problem": "I can't seem to see any of my course discounts even though I am sure I've set ones on some of my courses.",
        "Report_Type": "Technical",
        "Status": "Delivered",
        "Username": "ahmed.hassan",
        "Role": "From Instructor",
        "Followups": [],
        "createdAt": "2023-01-02T17:35:33.385Z",
        "updatedAt": "2023-01-02T17:35:33.385Z",
        "__v": 0
    },
    {
        "_id": "63b5635df8e06433cada11ed",
        "Trainee_Id": "63b55903f8e06433cad9e85c",
        "Report_Title": "Followup on: Leh keda",
        "Reported_Problem": "too much white space ya gama3a ana hamoot min el abyad",
        "Report_Type": "Other",
        "Status": "Delivered",
        "Username": "nibrahim",
        "Role": "From Individual Trainee",
        "Followups": [
            "hhh"
        ],
        "createdAt": "2023-01-04T11:30:37.494Z",
        "updatedAt": "2023-01-04T12:06:02.939Z",
        "__v": 0
    },
    {
        "_id": "63b31d4075815936cf6cec35",
        "Corporate_Trainee_Id": "63b2f46f6ee79942d46f9c78",
        "Report_Title": "VIDEO WON'T PLAY",
        "Reported_Problem": "For some reason, the videos do not play whenever I try to watch any course subtitle. What can I do?",
        "Report_Type": "Technical",
        "Status": "Delivered",
        "Username": "maram.a",
        "Role": "Corporate Trainee",
        "Followups": [],
        "createdAt": "2023-01-02T18:06:56.749Z",
        "updatedAt": "2023-01-02T18:06:56.749Z",
        "__v": 0
    }
]

PUT http://localhost:4000/manualStatus?RID=63b5635df8e06433cada11ed
BODY: {
    "Status": "Pending"

}
RESPONSE: {
    "_id": "63b5635df8e06433cada11ed",
    "Trainee_Id": "63b55903f8e06433cad9e85c",
    "Report_Title": "Followup on: Leh keda",
    "Reported_Problem": "too much white space ya gama3a ana hamoot min el abyad",
    "Report_Type": "Other",
    "Status": "Pending",
    "Username": "nibrahim",
    "Role": "From Individual Trainee",
    "Followups": [
        "hhh"
    ],
    "createdAt": "2023-01-04T11:30:37.494Z",
    "updatedAt": "2023-01-06T17:03:37.479Z",
    "__v": 0
}


GET http://localhost:4000/viewRequests
RESPONSE: [
    {
        "_id": "63b31cd075815936cf6cec04",
        "CourseId": "63b319fe75815936cf6cea74",
        "CorporateTraineeId": "63b2f46f6ee79942d46f9c78",
        "CourseTitle": "Architecture Modeling",
        "TUsername": "maram.ahmed",
        "Role": "Corporate Trainee",
        "createdAt": "2023-01-02T18:05:04.693Z",
        "updatedAt": "2023-01-02T18:05:04.693Z",
        "__v": 0
    }
]


GET http://localhost:4000/pendingRefunds
RESPONSE: [
    {
        "_id": "63b304273272228fe69e3005",
        "Trainee_Id": "63b300760aee8fed848099cf",
        "Course_Id": "63b2f2286ee79942d46f9c1a",
        "Title": "Introduction To Computer Science",
        "Problem": "This course is a scam.",
        "Amount": 23,
        "Status": "Pending",
        "Username": "sara.zeyada",
        "Role": "Individual Trainee",
        "createdAt": "2023-01-02T16:19:51.347Z",
        "updatedAt": "2023-01-02T16:19:51.347Z",
        "__v": 0
    }
]


GET http://localhost:4000/acceptedRefunds
RESPONSE: [
    {
        "_id": "63b56108f8e06433cada0f90",
        "Trainee_Id": "63b55903f8e06433cad9e85c",
        "Course_Id": "63b3075c75815936cf6ce816",
        "Title": "Strategic Leadership",
        "Problem": "keifi",
        "Amount": 24,
        "Status": "Accepted",
        "Username": "nibrahim",
        "Role": "Individual Trainee",
        "createdAt": "2023-01-04T11:20:40.976Z",
        "updatedAt": "2023-01-04T11:43:44.207Z",
        "__v": 0
    }
]

PUT http://localhost:4000/rejectRefund?refId=63b56108f8e06433cada0f90
RESPONSE: {
    "_id": "63b56108f8e06433cada0f90",
    "Trainee_Id": "63b55903f8e06433cad9e85c",
    "Course_Id": "63b3075c75815936cf6ce816",
    "Title": "Strategic Leadership",
    "Problem": "keifi",
    "Amount": 24,
    "Status": "Rejected",
    "Username": "nibrahim",
    "Role": "Individual Trainee",
    "createdAt": "2023-01-04T11:20:40.976Z",
    "updatedAt": "2023-01-06T17:13:21.394Z",
    "__v": 0
}

GET http://localhost:4000/rejectedRefunds
[
    {
        "_id": "63b56108f8e06433cada0f90",
        "Trainee_Id": "63b55903f8e06433cad9e85c",
        "Course_Id": "63b3075c75815936cf6ce816",
        "Title": "Strategic Leadership",
        "Problem": "keifi",
        "Amount": 24,
        "Status": "Rejected",
        "Username": "nibrahim",
        "Role": "Individual Trainee",
        "createdAt": "2023-01-04T11:20:40.976Z",
        "updatedAt": "2023-01-06T17:13:21.394Z",
        "__v": 0
    }
]

GET http://localhost:4000/refund?refId=63b56108f8e06433cada0f90
RESPONSE: {
    "_id": "63b56108f8e06433cada0f90",
    "Trainee_Id": "63b55903f8e06433cad9e85c",
    "Course_Id": "63b3075c75815936cf6ce816",
    "Title": "Strategic Leadership",
    "Problem": "keifi",
    "Amount": 24,
    "Status": "Accepted",
    "Username": "nibrahim",
    "Role": "Individual Trainee",
    "createdAt": "2023-01-04T11:20:40.976Z",
    "updatedAt": "2023-01-06T17:16:10.480Z",
    "__v": 0
}

GET http://localhost:4000/pendingReports
RESPONSE: [
    {
        "_id": "63b30a3d75815936cf6ce855",
        "Instructor_Id": "63b2ee056ee79942d46f9c10",
        "Report_Title": "Course Discount",
        "Reported_Problem": "I can't add a discount to my course.",
        "Report_Type": "Technical",
        "Status": "Pending",
        "Username": "nour.khaled",
        "Role": "From Instructor",
        "Followups": [],
        "createdAt": "2023-01-02T16:45:49.985Z",
        "updatedAt": "2023-01-04T11:43:25.336Z",
        "__v": 0
    },
    {
        "_id": "63b5635df8e06433cada11ed",
        "Trainee_Id": "63b55903f8e06433cad9e85c",
        "Report_Title": "Followup on: Leh keda",
        "Reported_Problem": "too much white space ya gama3a ana hamoot min el abyad",
        "Report_Type": "Other",
        "Status": "Pending",
        "Username": "nibrahim",
        "Role": "From Individual Trainee",
        "Followups": [
            "hhh"
        ],
        "createdAt": "2023-01-04T11:30:37.494Z",
        "updatedAt": "2023-01-06T17:03:37.479Z",
        "__v": 0
    }
]

GET http://localhost:4000/resolvedReports
RESPONSE: [
    {
        "_id": "63b301d30aee8fed84809ac8",
        "Trainee_Id": "63b300760aee8fed848099cf",
        "Report_Title": "This course is a scam.",
        "Reported_Problem": "This course has very brief information about coding and gives rather vague examples and exercises and is simply just a waste of time.",
        "Report_Type": "Other",
        "Status": "Resolved",
        "Username": "sara.zeyada",
        "Role": "From Individual Trainee",
        "Followups": [],
        "createdAt": "2023-01-02T16:09:55.682Z",
        "updatedAt": "2023-01-02T16:21:33.306Z",
        "__v": 0
    }
]


PUT http://localhost:4000/grantAccess/63b31cd075815936cf6cec04
RESPONSE: {
    "_id": "63b2f46f6ee79942d46f9c78",
    "Username": "maram.a",
    "Password": "$2b$10$NYnZ5ytwJWBmOqjyDlAWZO3yWRRAgTGK0YjZZIQw.4CH/.TkBrjGO",
    "First_Name": "Maram",
    "Last_Name": "Ahmed",
    "Email": "maram.a@gmail.com",
    "Gender": "Female",
    "Corporate": "GUC",
    "Registered_Courses": [
        "63b2f2286ee79942d46f9c1a",
        "63b30d7275815936cf6ce8b6",
        "63b319fe75815936cf6cea74"
    ],
    "Role": "Corporate Trainee",
    "verified": true,
    "Country": "Bahrain",
    "createdAt": "2023-01-02T15:12:47.007Z",
    "updatedAt": "2023-01-06T17:22:49.944Z",
    "__v": 0,
    "Currency": "BHD"
}

POST http://localhost:4000/addQ?CourseId=63b310aa75815936cf6ce8ef
BODY: {
    "QNumber": 1,
    "Q": "What is 1+1?",
    "Answer1": "1",
    "Answer2": "2",
    "Answer3": "-3",
    "Answer4": "0",
    "correctAnswer": 1
}
RESPONSE: {
    "_id": "63b85bfb27f1c371299cb881",
    "CourseId": "63b310aa75815936cf6ce8ef",
    "QNumber": 1,
    "Q": "What is 1+1?",
    "Answers": [
        "1",
        "2",
        "-3",
        "0"
    ],
    "correctAnswer": 1,
    "createdAt": "2023-01-06T17:35:55.959Z",
    "updatedAt": "2023-01-06T17:35:56.218Z",
    "__v": 0
}

GET http://localhost:4000/fetchQ?CourseId=63b310aa75815936cf6ce8ef
RESPONSE: [
    {
        "_id": "63b310fe75815936cf6ce8f8",
        "CourseId": {
            "_id": "63b310aa75815936cf6ce8ef",
            "Title": "Intro to Trignometrey",
            "Subject": "Maths",
            "Subtitles_Total_Hours": 12,
            "Course_Total_Hours": 13,
            "Price": "22",
            "Discount": null,
            "Discount_Start_Date": null,
            "Discount_End_Date": null,
            "Course_Description": "",
            "PreviewLink": "PUB0TaZ7bhA",
            "Instructor_Name": "Salma Mohamed",
            "Instructor": "63b3056e37114b029ef1e1ad",
            "Course_Ratings": [],
            "NumberOfPaid": 0,
            "Views": 0,
            "createdAt": "2023-01-02T17:13:14.563Z",
            "updatedAt": "2023-01-02T17:13:14.563Z",
            "__v": 0
        },
        "QNumber": 1,
        "Q": "If tan θ + cot θ = 2, then what is the value of tan100 θ + cot100 θ?",
        "Answers": [
            "1",
            "3",
            "2",
            "None of the above"
        ],
        "correctAnswer": 2,
        "createdAt": "2023-01-02T17:14:38.827Z",
        "updatedAt": "2023-01-02T17:14:39.728Z",
        "__v": 0
    },
    {
        "_id": "63b3113075815936cf6ce8fc",
        "CourseId": {
            "_id": "63b310aa75815936cf6ce8ef",
            "Title": "Intro to Trignometrey",
            "Subject": "Maths",
            "Subtitles_Total_Hours": 12,
            "Course_Total_Hours": 13,
            "Price": "22",
            "Discount": null,
            "Discount_Start_Date": null,
            "Discount_End_Date": null,
            "Course_Description": "",
            "PreviewLink": "PUB0TaZ7bhA",
            "Instructor_Name": "Salma Mohamed",
            "Instructor": "63b3056e37114b029ef1e1ad",
            "Course_Ratings": [],
            "NumberOfPaid": 0,
            "Views": 0,
            "createdAt": "2023-01-02T17:13:14.563Z",
            "updatedAt": "2023-01-02T17:13:14.563Z",
            "__v": 0
        },
        "QNumber": 2,
        "Q": "If the value of α + β = 900, and α : β = 2 : 1, then what is the ratio of cos α to cos β ?",
        "Answers": [
            "1 : 3",
            "√3 : 1",
            "1 : √3",
            "None of the above"
        ],
        "correctAnswer": 2,
        "createdAt": "2023-01-02T17:15:28.934Z",
        "updatedAt": "2023-01-02T17:15:29.872Z",
        "__v": 0
    },
    {
        "_id": "63b3116275815936cf6ce900",
        "CourseId": {
            "_id": "63b310aa75815936cf6ce8ef",
            "Title": "Intro to Trignometrey",
            "Subject": "Maths",
            "Subtitles_Total_Hours": 12,
            "Course_Total_Hours": 13,
            "Price": "22",
            "Discount": null,
            "Discount_Start_Date": null,
            "Discount_End_Date": null,
            "Course_Description": "",
            "PreviewLink": "PUB0TaZ7bhA",
            "Instructor_Name": "Salma Mohamed",
            "Instructor": "63b3056e37114b029ef1e1ad",
            "Course_Ratings": [],
            "NumberOfPaid": 0,
            "Views": 0,
            "createdAt": "2023-01-02T17:13:14.563Z",
            "updatedAt": "2023-01-02T17:13:14.563Z",
            "__v": 0
        },
        "QNumber": 3,
        "Q": " If tan θ - cot θ = 0, what will be the value of sin θ + cos θ?",
        "Answers": [
            "1",
            "√2",
            "1/√2",
            "None of the above"
        ],
        "correctAnswer": 1,
        "createdAt": "2023-01-02T17:16:18.115Z",
        "updatedAt": "2023-01-02T17:16:19.163Z",
        "__v": 0
    },
    {
        "_id": "63b85bfb27f1c371299cb881",
        "CourseId": {
            "_id": "63b310aa75815936cf6ce8ef",
            "Title": "Intro to Trignometrey",
            "Subject": "Maths",
            "Subtitles_Total_Hours": 12,
            "Course_Total_Hours": 13,
            "Price": "22",
            "Discount": null,
            "Discount_Start_Date": null,
            "Discount_End_Date": null,
            "Course_Description": "",
            "PreviewLink": "PUB0TaZ7bhA",
            "Instructor_Name": "Salma Mohamed",
            "Instructor": "63b3056e37114b029ef1e1ad",
            "Course_Ratings": [],
            "NumberOfPaid": 0,
            "Views": 0,
            "createdAt": "2023-01-02T17:13:14.563Z",
            "updatedAt": "2023-01-02T17:13:14.563Z",
            "__v": 0
        },
        "QNumber": 1,
        "Q": "What is 1+1?",
        "Answers": [
            "1",
            "2",
            "-3",
            "0"
        ],
        "correctAnswer": 1,
        "createdAt": "2023-01-06T17:35:55.959Z",
        "updatedAt": "2023-01-06T17:35:56.218Z",
        "__v": 0
    }
]


GET http://localhost:4000/getSubQ?SubtitleId=63b2f2296ee79942d46f9c1c
RESPONSE: [
    {
        "_id": "63b2f2296ee79942d46f9c1e",
        "SubtitleId": {
            "_id": "63b2f2296ee79942d46f9c1c",
            "Subtitle_Title": "Week 1",
            "Link": "kqtD5dpn9C8",
            "Description": "Introduction to Python.",
            "CourseId": "63b2f2286ee79942d46f9c1a",
            "createdAt": "2023-01-02T15:03:05.123Z",
            "updatedAt": "2023-01-02T15:03:05.123Z",
            "__v": 0
        },
        "Q": "What is indentation used for?",
        "Answers": [
            "A replacement for curly brackets",
            " For clean code",
            "Nothing",
            "None of the above"
        ],
        "correctAnswer": "A replacement for curly brackets",
        "createdAt": "2023-01-02T15:03:05.336Z",
        "updatedAt": "2023-01-02T15:03:05.694Z",
        "__v": 0
    }
]

# How to Use?
There are four different types of users that can access the website. The user experience differs for each user. The four users are Admin, Instructor, Individual Trainee, and Corporate Trainee. Beginning with the admin, they are elgible to add and view instructors as well as corporate trainees, which otherwise do not have access to their role privilages. Beginning with the Admin Homepage, it is where the admin can choose where to navigate to and what to access next. Admin privilages include adding and removing users; admins can only add other admins, corporate trainees and instructors but not individual trainees, individual trainees will have to sign-up in order to gain access to the use of the website. Admins can also recieve requests from corporate trainees if they wish access to courses; the admin can either grant or block acccess to the corporate trainee for that course. Admins are also allowed to view and add discounts to any course given on the platform/website if there are no discounts previously added to said courses. Additionally, admins recieve reports from the different website users and view as well as edit the status of given reports. There are three report statuses; Delivered, Pending and Resolved. Delivered reports are categorised as unseen reports which are ones that are yet to be opened/viewed by the admin(s). Pending and Resolved reports fall under the category of seen/previously viewed reports. The main difference between pending and resolved reports is that pending reports are ones which have been viewed by the admin but are yet to be solved while resolved reports are ones that have been viewed by the admin and resolved therefore had their status changed to resolved. The admin is allowed to change the status of any sent report to either pending or resolved. Additionally, he can easily filter the view of the reports according to their status to his liking. Admins are granted the merit of delivered, pending and resolved reports separately according to their liking. Admins are also allowed to recieve refund requests from individual trainees for a certain course. They can either accept or reject these requests. If they accept the refund request, an amount equal to the price of the course is refunded to the wallet of the individual trainee that requested the refund, and the course is then removed from the registered courses of said trainee and they will no longer have access to that course. Admins can log in using their given username and password. They are also allowed to change their password but not their username. A navigation bar is placed atop the admin pages in order to facilitate the user experience and elevate the ease of flow of the website allowing the admin an unchallenging environment to use the website. The user experience and navigation differ vastly as in comparison. Firstly, as an instructor one is not allowed certain privilages relevant to the role of the instructor on the website unless they are registered by the admin; in other words instructors cannot sign up and will be given their account information in order to log into the website by the admin. At the beginning, when an instructor logs in for the very first time they are given a contract including the website policies, terms and conditions and are asked to either accept or reject these policies if they wish to continue to use the website. If an instructor rejects the contract they are re-routed to the login page and not granted access to their account. They can log in again and accept the contract in order to gain access to their account as well as its privilages. The instructor homepage includes a display of all their created courses as well as the option to create a new course. The homepage includes the option of filtering through their created courses by either rate, subject or price for ease of navigation. There is also a navigation bar included in all pages to traverse through the website with little to no difficulty. If an instructor wishes to add a new course they can simply click on the button that says so and they will be redirected to a page where they will be asked to insert information relevant to the course and essentially its content; the title of the course, its description, hours, pricing , relevant subtitles and their titles, subtitle hours, links to said subtitles for display purposes, subtitle questions, and subtitle descriptions. A discount can be applied to the course upon creation or can be added later according the instructor's liking. After the course creation the instructor is taken to a page where they can add more subtitles with questions if they wish to do so or they can skip this step and click on done and add more subtitles later; a course must have at least one subtitle and subtitle question upon creation. After clicking on done the Instructor is taken to a new page where they can edit their course exam; they are able to add MCQ questions with a restriction of four options per question and a correct answer. A course exam must have at least 3 questions or more and each course must have an exam. After creating/editing their course exam the instructor is taken back to their homepage where they can once again view their created courses as well as filter through them and create new ones. An instructor can view their account information including their first and last name, their associated email, gender, money owed to them by the other website users otherwise known as individual trainees in case they are registered to their created courses. Instructors are allowed to edit and update their profile information including first name, last name, bio and email. An instructor is allowed to report a problem relevant to the course and this problem can be categorised as type technical, financial or other. The report is sent to the admin and has 3 statuses; delivered, pending and resolved. The instructor can view their reports according to their status; meaning they can view their delivered, pending and resolved reports separately. The delivered reports are ones that have yet to be opened/viewed by the admin, pending ones have been opened by the admin but are yet to be resolved, and resolved reports are ones that have been settled/solved. An instructor can send a followup on any of their unresolved reports in case they wish to do so or if the admin has yet to respond. An instructor is also allowed to change their password. For a corporate trainee and individual trainee, the user experience is similar with minimal differences. Beginning with the similiarities, both types of trainees can access their registered courses' content; watch subtitles, solve their question subtitles, as well as solve a course exam and view its answers as well as their results after finishing it if they are registered to this course. For each registered trainee whether they be a corporate or individual, a progress for each registered course is created that records the development and progression of each trainee in their registered course. The progress increments with the individual/corporate trainee watching the provided course subtitles. The progress references and is strictly relevant to each trainee and their progress in their registered course meaning each trainee has a progress for each of their registered courses. Both trainees have the merit of writing and editing notes relevant to each subtitle and saving them as a PDF file if they wish to do so. Both individual and corporate trainees can report a problem relevant to a course and can view those reports separately according to their status; meaning they can view their delivered, pending and resolved reports separately. The delivered reports are ones that have yet to be opened/viewed by the admin, pending ones have been opened by the admin but are yet to be resolved, and resolved reports are ones that have been settled/solved. A corporate/individual trainee can send a followup on any of their unresolved reports in case they wish to do so or if the admin has yet to respond. A corporate/individual trainee can edit their profile information including their username, email and password. Differences between the individual and corporate trainee arise in their access to the course where the corporate trainee is registered by the admin and has privilages over the individual trainee as they do not have to pay to register for the course but instead only have to request access to it. Such requests are sent to the admin for them to approve of. Individual trainees must pay for the course in order to gain access to it unless it is free. An individual trainee can pay for a course in two ways; either by Visa where they are then taken another page to insert their credit card information and proceed with their payment, however, if they chose to pay by wallet which is where the amount refunded from previous accepted refund requests is added. An individual trainee can request refund for a registered course if  and only if their progress is less than 50%. Both trainees have a navigation bar included in all their pages for ease of navigation and an elevated online learning environment. Lastly, the guest user experience, which allows the non-registered user to navigate through the website and the services it offers which include vieweing the different courses offered on the website as well as the instructors giving these courses. A guest is able sign up and view the website terms, conditions and policies of LearnEd. When signing up, the guest is asked to insert their required information, and then recieves an email for verification. Once they are verified they are free to login and use LearnEd for a better online learning experience.

# Contribute 
If you wish to contribute in elevating this project you can do so by familirising yourself with React.js as well as Node.js, and Bootstrap. Fork the repository of this project. This will create a copy of this repository in your account, which you can clone. Create a branch, make the necessary changes to the files and commit those changes, and push them to GitHub.

# Credits
https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE
https://www.youtube.com/watch?v=BNN4o4gnSF4
https://www.youtube.com/watch?v=e-whXipfRvg
CyberWolves channel on youtube.

# License
Apache 2.0
