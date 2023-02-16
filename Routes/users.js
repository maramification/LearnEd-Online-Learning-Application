const router = require("express").Router();
const { Individual_Trainee, validate } = require("../Models/Individual Trainee");
const {Token} = require("../Models/Token");
const crypto = require("crypto");
const sendEmail = require("./Emailer");
const bcrypt = require("bcrypt");
const countryToCurrency = require('iso-country-currency');
const  corporateTrainees  = require("../Models/corporateTrainees");
const  Instructors  = require("../Models/Instructor");
const  Administrator  = require("../Models/Administrator");

router.post("/", async (req, res) => {
	console.log(req.body);
	try {
		const { error } = validate(req.body);
		console.log(error);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		if(req.body.Password !== req.body.confirmPassword){
			return res.status(401).send({ message: "Password dosen't match confirm password !" });
		}
		let user = await Individual_Trainee.findOne({ Email: req.body.Email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exists!" });
		user =await corporateTrainees.findOne({ Email: req.body.Email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exists!" });
		user =await Instructors.findOne({ Email: req.body.Email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given Email already Exists!" });
		user = await Individual_Trainee.findOne({ Username: req.body.Username });
		if (user)
				return res
					.status(409)
					.send({ message: "User with given Username already Exists!" });
		user = await corporateTrainees.findOne({ Username: req.body.Username });
		if (user)
				return res
					.status(409)
					.send({ message: "User with given Username already Exists!" });		
		user = await Instructors.findOne({ Username: req.body.Username });
		if (user)
				return res
					.status(409)
					.send({ message: "User with given Username already Exists!" });	
		user = await Administrator.findOne({ Username: req.body.Username });
		if (user)
				return res
					.status(409)
					.send({ message: "User with given Username already Exists!" });	
				const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(req.body.Password, salt);

		user = await new Individual_Trainee({ ...req.body, Password: hashPassword }).save();
		user.Currency = await countryToCurrency.getParamByParam('countryName', user.Country, 'currency');
		user.save();
		console.log("currency"+user.Currency);
	//	console.log(user);
		const token = await new Token({
			individualId:user._id,	
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `localhost:3000/users/${user.id}/verify/${token.token}`;
		await sendEmail(user.Email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await Individual_Trainee.findOne({ _id: req.params.id });
	//	console.log("object");
		// if(!user){
		// 	user = await Individual_Trainee.findOne({ _id: req.params.id });
		// }
		//console.log("user:"+user);
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			individualId: user._id,
			token: req.params.token,
		});
		console.log("user"+user);
		console.log("tokenID"+token);
		if(!token){
			token = await Token.findOne({
				instructorId: user._id,
				token: req.params.token,
			});
		}
		if(!token){
			token = await Token.findOne({
				corporateId: user._id,
				token: req.params.token,
			});
		}
		
		if (!token) return res.status(400).send({ message: "Invalid link" });

		user.verified = true;
		user.save();
				console.log("user:");

		await token.remove();
		res.status(200).send({ message: "Email verified successfully" });
		
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;