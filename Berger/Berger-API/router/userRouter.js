const db = require("../database");
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { createJWTToken, checkToken, transporter } = require("../helpers");
const jwt = require("jsonwebtoken");

// GET USERS DATA
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	const encryptedPassword = crypto
		.createHmac("sha256", "bergerHash", password)
		.digest("hex");
	let sql = `SELECT id,email,role_id,isverified FROM users WHERE email='${email}' and password = '${encryptedPassword}'`;
	try {
		db.query(sql, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			if (data.length > 0) {
				let responseData = { ...data[0] };
				const token = createJWTToken(responseData);
				responseData.token = token;
				return res.status(200).send(responseData);
			}
			return res.send(data);
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

router.post("/keep-login", checkToken, (req, res) => {
	try {
		let sql = `SELECT id,email,role_id,isverified FROM users WHERE id=${req.user.id}`;
		db.query(sql, (err, data) => {
			return res.status(200).send(data[0]);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});

// POST NEW USER
router.post("/signup", (req, res) => {
	const { email, password } = req.body;
	const encryptedPassword = crypto
		.createHmac("sha256", "bergerHash", password)
		.digest("hex");
	try {
		let sql = `INSERT INTO users`;
		db.query(
			`${sql}(email,password,role_id,isverified) VALUES ('${email}','${encryptedPassword}',2,0);`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				const token = createJWTToken({
					email,
					encryptedPassword,
					id: data.insertId,
					role_id: 2,
				});
				let mailOptions = {
					from: "Berger.inc <adhtanjung@gmail.com>",
					to: email,
					subject: "Email Verification",
					text: "Halo Dunia!",
					html: `<a href="http://localhost:3000/verification?verify=${token}" target="_blank">Click to verify</a>`,
				};

				transporter.sendMail(mailOptions, (err, res2) => {
					if (err) {
						console.log("Something's went wrong");
						res.send("Something's went wrong");
					} else {
						console.log("Email sent");
						res.send("Email sent");
					}
				});
				return res.status(200).send({
					id: data.insertId,
					role_id: 2,
					isverified: 0,
					email: email,
					token: token,
				});
			}
		);
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

// EMAIL VERIFICATION
// router.get("/verification", (req, res) => {
// 	console.log("masuk");
// 	const { token } = req.query;
// 	console.log(token);

// 	if (token) {
// 		const userData = jwt.verify(token, "keyrahasia", (err, decoded) => {
// 			if (err) {
// 				return res.status(401).send({
// 					message: err.message,
// 					status: "Unauthorized",
// 				});
// 			}
// 			return decoded;
// 		});
// 		console.log(userData);
// 		db.query(
// 			`UPDATE users SET isverified =1 WHERE id=${userData.id}`,
// 			(err, data) => {
// 				return res
// 					.status(200)
// 					.send({ message: "ACCOUNT_VERIFIED", status: "VERIFIED" });
// 			}
// 		);
// 	}
// });
// GET USER DATA BY ID
router.get("/:condition", (req, res) => {
	if (req.params.condition === "userdetail") {
		if (req.query.email) {
			db.query(
				`SELECT id,email,role_id,isverified FROM users WHERE email='${req.query.email}'`,
				(err, data) => {
					if (err) {
						return res.status(500).send(err.message);
					}
					return res.status(200).send(data);
				}
			);
		}
	} else if (req.params.condition === "verification") {
		const { token } = req.query;

		if (token) {
			const userData = jwt.verify(token, "keyrahasia", (err, decoded) => {
				if (err) {
					return res.status(401).send({
						message: err.message,
						status: "Unauthorized",
					});
				}
				return decoded;
			});
			db.query(
				`UPDATE users SET isverified =1 WHERE id=${userData.id}`,
				(err, data) => {
					return res
						.status(200)
						.send({ message: "ACCOUNT_VERIFIED", status: "VERIFIED" });
				}
			);
		}
	} else {
		const id = req.params.condition;
		let sql = `SELECT * FROM users WHERE id=${id}`;
		db.query(sql, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
		});
	}
});

// GET USERS EMAIL THRU QUERY
// router.get("/userdetail", (req, res) => {
// 	if (req.query.email) {
// 		db.query(
// 			`SELECT id,email,role_id,isverified FROM users WHERE email='${req.query.email}'`,
// 			(err, data) => {
// 				if (err) {
// 					return res.status(500).send(err.message);
// 				}
// 				return res.status(200).send(data);
// 			}
// 		);
// 	}
// });

// PATCH USER DATA
router.patch("/:id", (req, res) => {
	const id = req.params.id;
	if (req.body.email) {
		db.query(
			`UPDATE users SET email='${req.body.email}' WHERE id=${id}`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				db.query(`SELECT * FROM users WHERE id=${id}`, (err, data) => {
					return res.status(201).send(data[0]);
				});
			}
		);
	} else if (req.body.password) {
		db.query(
			`UPDATE users SET password ='${req.body.password}' WHERE id=${id}`,
			(err, data) => {
				if (err) {
					return status(500).send(err.message);
				}
				db.query(`SELECT * FROM users WHERE id=${id}`, (err, data) => {
					return res.status(201).send(data[0]);
				});
			}
		);
	}
});

// USER VERIFICATION
router.post("/verification", checkToken, (req, res) => {
	console.log("masuk verif");
	const { id, email, role_id } = req.user;
	try {
		db.query(`UPDATE users SET isverified = 1 WHERE id =${id}`, (err, data) => {
			if (err) {
				return res.send(err.message);
			}
			return res.status(200).send({ id, email, role_id, isverified: 1 });
		});
	} catch (err) {
		console.log(err);
		return res.send(err);
	}
});

// RESEND EMAIL
router.post("/resend-email", (req, res) => {
	const { token, email } = req.body;
	let mailOptions = {
		from: "Berger.inc <adhtanjung@gmail.com>",
		to: email,
		subject: "Email Verification",
		text: "Halo Dunia!",
		html: `<a href="http://localhost:3000/verification?verify=${token}" target="_blank">Click to verify</a>`,
	};

	transporter.sendMail(mailOptions, (err, res2) => {
		if (err) {
			console.log("Something's went wrong");
			res.send("Something's went wrong");
		} else {
			console.log("Email sent");
			res.send("Email sent");
		}
	});
});

module.exports = router;
