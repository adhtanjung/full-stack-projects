const uploader = require("./uploader");
const transporter = require("./nodemailer");
const { html, html2 } = require("./html");
const { checkToken, createJWTToken } = require("./jwt");

module.exports = {
	uploader,
	checkToken,
	createJWTToken,
	transporter,
	html,
	html2,
};
