const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	individualId: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: "individualTrainee",
		unique: false,
	},
	corporateId: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: "corporateTrainees",
		unique: false,
	},
	instructorId: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: "Instructor",
		unique: false,
	},
	
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

const Token= mongoose.model("Token", tokenSchema);
module.exports = {Token};