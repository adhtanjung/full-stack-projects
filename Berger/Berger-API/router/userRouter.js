const db = require("../database");
const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const { createJWTToken, checkToken, transporter } = require("../helpers");
const jwt = require("jsonwebtoken");
const { route } = require("./cartRouter");

// GET USERS DATA
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	let sql = `SELECT id,email,role_id,isverified FROM users WHERE email='${email}' and password = '${password}'`;
	try {
		db.query(sql, (err, data) => {
			console.log(data);
			let responseData = { ...data[0] };
			const token = createJWTToken(responseData);
			console.log(responseData);
			responseData.token = token;
			return res.status(200).send(responseData);
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
	const encryptedPassword = SHA256(password).toString();
	try {
		let sql = `INSERT INTO users`;
		db.query(
			`${sql}(email,password,role_id,isverified) VALUES ('${email}','${encryptedPassword}',2,0);`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				console.log(data.insertId);
				const token = createJWTToken({
					email,
					encryptedPassword,
					id: data.insertId,
				});
				console.log(token);
				let mailOptions = {
					from: "Berger.inc <adhtanjung@gmail.com>",
					to: email,
					subject: "Email Verification",
					text: "Halo Dunia!",
					html: `<a href="http://localhost:2002/users/verification?token=${token}" target="_blank">Click to verify</a>`,
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
	console.log(req.params.condition);
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
		console.log("masuk");
		const { token } = req.query;
		console.log(token);

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
			console.log(userData);
			db.query(
				`UPDATE users SET isverified =1 WHERE id=${userData.id}`,
				(err, data) => {
					return res
						.status(200)
						.send({ message: "ACCOUNT_VERIFIED", status: "VERIFIED" });
				}
			);
		}
	}
	// console.log("masuk get id");
	// const id = req.params.id;
	// let sql = `SELECT * FROM users WHERE id=${id}`;
	// db.query(sql, (err, data) => {
	// 	if (err) {
	// 		return res.status(500).send(err.message);
	// 	}
	// 	return res.status(200).send({ id: data[0].id, email: data[0].email });
	// });
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

module.exports = router;
