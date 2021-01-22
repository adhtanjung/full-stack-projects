const nodemailer = require("nodemailer");
const xoauth2 = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: "adhtanjung@gmail.com",
		clientId:
			"414985155471-np2sdlh50bfkk5ptam9km2qfb3opi109.apps.googleusercontent.com",
		clientSecret: "lKh8_nWGM_gNZdV5U5HrIGis",
		refreshToken:
			"1//04UNb-qxmSc3YCgYIARAAGAQSNwF-L9IrAtbCfMyp31ZsyAsluqW3VXjpqkjHg6vPOJ4pNVF21hy2sS4tbUYd6SkDdEgrRu_iUMk",
	},
});

module.exports = transporter;
