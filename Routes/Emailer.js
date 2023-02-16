const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const  transporter = nodemailer.createTransport({
			host: 'smtp.zoho.com',
   			port: 465,
    		secure: true, // use SSL
   			auth: {
       			user: 'strangerteam2@zohomail.com',
        		pass: 'Forgetmeplz'
    }
		  });

		await transporter.sendMail({
			from: 'strangerteam2@zohomail.com',
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};