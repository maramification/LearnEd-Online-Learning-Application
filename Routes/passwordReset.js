const router = require("express").Router();
const { Individual_Trainee } = require("../Models/Individual Trainee");
const  corporateTrainees  = require("../Models/corporateTrainees");
const  Instructors  = require("../Models/Instructor");
const  Administrator  = require("../Models/Administrator");
const {Token} = require("../Models/Token");
const crypto = require("crypto");
const sendEmail = require("./Emailer");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// send password link
router.post("/", async (req, res) => {
	try {
		const emailSchema = Joi.object({
			Email: Joi.string().email().required().label("Email"),
		});
		
		const { error } = emailSchema.validate(req.body);
	//	console.log(error);
		if (error)
		{
		
		
		return res.status(400).send({ message: error.details[0].message });
		}
			
		const em = req.query.Email;
	//	console.log(em);
		let x = true;
		let user = await Individual_Trainee.findOne({Email:em});
		// let token = await new Token({
		// 	individualId: "6398f95eb1836d5d7c1d52d3",
		// 	token: crypto.randomBytes(32).toString("hex"),
		// 	}).save();
		let token = await Token.findOne();
			console.log(token);
		if(!user){
			user = await corporateTrainees.findOne({Email:em});
		}
		else{
			x=false;
			let token = await Token.findOne({ individualId: user._id });
			if(!token){
				token = await new Token({
					individualId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
					}).save();
			}
		}
		if(!user){
			user = await Instructors.findOne({Email:em});
		}
		else if(x==true){
			x=false;
			let token = await Token.findOne({ corporateId: user._id });
			if(!token){
				token = await new Token({
					corporateId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
					}).save();
			}
		}
		if (!user)
			return res.status(409).send({ message: "User with given email does not exist!" });				
		else if(x==true){
			x=false;
			let token = await Token.findOne({ instructorId: user._id });
			if(!token){
				token = await new Token({
					instructorId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
					}).save();
			}
		}			
		const url = `localhost:3000/passwordReset/${user._id}/${token.token}/`;
		await sendEmail(user.Email, "Password Reset", url);
		res.status(200).send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
		
	}
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
	try {
		let x = true;
		let user = await Individual_Trainee.findOne({ _id: req.params.id });
		let token = await Token.findOne();
		if(!user){
			user = await corporateTrainees.findOne({_id:req.params.id});
		}
		else{
			x=false;
			let token = await Token.findOne({ individualId: user._id });
			if(!token){
				token = await new Token({
					individualId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
					}).save();
			}
		}
		if(!user){
			user = await Instructors.findOne({_id:req.params.id});
		}
		else if(x==true){
			x=false;
			let token = await Token.findOne({ corporateId: user._id });
			if(!token){
				token = await new Token({
					corporateId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
					}).save();
			}
		}
		if (!user)
			return res.status(409).send({ message: "User with given email does not exist!" });				
		else if(x==true){
			x=false;
			let token = await Token.findOne({ instructorId: user._id });
			if(!token){
				token = await new Token({
					instructorId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
					}).save();
			}
		}			
		
		if (!user) return res.status(400).send({ message: "Invalid link" });

		// let token = await Token.findOne({
		// 	userId: user._id,
		// 	token: req.params.token,
		// });
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//  set new password
router.post("/:id/:token", async (req, res) => {
	try {
		const passwordSchema = Joi.object({
			Password: passwordComplexity().required().label("Password"),
			confirmPassword: passwordComplexity().required().label("confirmPassword"),
		});
		
		const { error } = passwordSchema.validate(req.body);
		if(req.body.Password !== req.body.confirmPassword){
			return res.status(401).send({ message: "Password dosen't match confirm password !" });
		}
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		
		let user = await Individual_Trainee.findOne({ _id: req.params.id });
		if(!user){
			user = await Instructors.findOne({ _id: req.params.id });
		}
		if(!user){
			user = await corporateTrainees.findOne({ _id: req.params.id });
		}
		
		if (!user) return res.status(400).send({ message: "Invalid link" });

		let token = await Token.findOne({individualId: user._id,token: req.params.token,});
		if(!token){
			token = await Token.findOne({corporateId: user._id,token: req.params.token,});
		}
		if(!token){
			token = await Token.findOne({instructorId: user._id,token: req.params.token,});
		}
		if (!token) return res.status(400).send({ message: "Invalid link" });
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(req.query.Password, salt);
		user.Password = hashPassword;
		await user.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;