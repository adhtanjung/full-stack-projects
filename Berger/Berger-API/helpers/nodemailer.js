const nodemailer = require("nodemailer");
const xoauth2 = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "adhtanjung@gmail.com",
		pass: "tcbvyjikftpwpfqi",
	},
});

module.exports = transporter;
