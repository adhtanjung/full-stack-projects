const uploader = require("./uploader");
const transporter = require("./nodemailer");
const { html, html2 } = require("./html");
const { checkToken, createJWTToken } = require("./jwt");
const googleAuth = require("./googleAuth");

module.exports = {
	uploader,
	checkToken,
	createJWTToken,
	transporter,
	html,
	html2,
	googleAuth,
};
