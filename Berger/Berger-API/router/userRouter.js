const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const { query } = require("../database");
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const {
	createJWTToken,
	checkToken,
	transporter,
	html,
	html2,
	googleAuth,
} = require("../helpers");
const jwt = require("jsonwebtoken");
const hash = require("../helpers/hash");

// GET USERS DATA
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	const encryptedPassword = hash(password);
	let sql = `SELECT id,email,role_id,isverified FROM users WHERE email='${email}' and password = '${encryptedPassword}'`;
	try {
		query(sql, (err, data) => {
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
		query(sql, (err, data) => {
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
	const encryptedPassword = hash(password);
	try {
		let sql = `INSERT INTO users`;
		query(
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
					html: html(email, token),
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
					email,
					token,
					isLoggedInWithGoogle: 0,
				});
			}
		);
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

router.get("/:condition", (req, res) => {
	if (req.params.condition === "userdetail") {
		if (req.query.email) {
			query(
				`SELECT id,email,role_id,isverified FROM users WHERE email='${req.query.email}' AND isLoggedInWithGoogle =0`,
				(err, data) => {
					if (err) {
						return res.status(500).send(err.message);
					}
					return res.status(200).send(data);
				}
			);
		}
	} else if (req.params.condition === "verification") {
		const { verify } = req.query;

		if (verify) {
			const userData = jwt.verify(verify, "keyrahasia", (err, decoded) => {
				if (err) {
					return res.status(401).send({
						message: err.message,
						status: "Unauthorized",
					});
				}
				return decoded;
			});
			query(
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
		query(sql, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
		});
	}
});

// GET USERS EMAIL THRU QUERY
// router.get("/userdetail", (req, res) => {
// 	if (req.query.email) {
// 		query(
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
		query(
			`UPDATE users SET email='${req.body.email}' WHERE id=${id}`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				query(`SELECT * FROM users WHERE id=${id}`, (err, data) => {
					return res.status(201).send(data[0]);
				});
			}
		);
	} else if (req.body.password) {
		query(
			`UPDATE users SET password ='${req.body.password}' WHERE id=${id}`,
			(err, data) => {
				if (err) {
					return status(500).send(err.message);
				}
				query(`SELECT * FROM users WHERE id=${id}`, (err, data) => {
					return res.status(201).send(data[0]);
				});
			}
		);
	}
});

// USER VERIFICATION
router.post("/verification", checkToken, (req, res) => {
	console.log("masuk verif");
	try {
		if (req.user) {
			const { id, email, role_id } = req.user;
			query(`UPDATE users SET isverified = 1 WHERE id =${id}`, (err, data) => {
				if (err) {
					return res.send(err.message);
				}
				return res.status(200).send({ id, email, role_id, isverified: 1 });
			});
		}
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
		html: html(email, token),
	};

	console.log(req.body.email);
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

// HANDLE FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
	try {
		const { email } = req.body;
		const data = await query(
			`SELECT id FROM users WHERE email='${email}' AND isLoggedInWithGoogle = 0`
		);
		console.log(data);
		if (data.length > 0) {
			const token = createJWTToken({ ...data[0] });
			let mailOptions = {
				from: "Berger.inc <adhtanjung@gmail.com>",
				to: email,
				subject: "Email Verification",

				html: html2(token),
			};

			transporter.sendMail(mailOptions, (err, res2) => {
				if (err) {
					console.log("Something's went wrong");
				} else {
					console.log("Email sent");
				}
			});
			return res.status(200).send("ok");
		} else {
			return res.send(data);
		}
	} catch (err) {
		console.log(err.message);
		return res.send(err.message);
	}
});

// RESET PASSWORD
router.post("/reset-password", checkToken, (req, res) => {
	const { password } = req.body;

	const encryptedPassword = hash(password);
	const { id } = req.user;
	console.log(encryptedPassword);
	query(
		`UPDATE users SET password='${encryptedPassword}' WHERE id=${id}`,
		(err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			console.log("masukkk");
			return res.status(200).send({
				message: "PASSWORD_UPDATED",
				status: "UPDATED",
			});
		}
	);
});

// login with google
router.post("/google/login", async (req, res) => {
	try {
		console.log("masuk google");
		const { token } = req.body;
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});
		const { name, email, picture, sub } = ticket.getPayload();
		const response = await query(
			`SELECT u.id, u.email, u.role_id, u.isverified, u.isLoggedInWithGoogle FROM google_users gu
			JOIN users u ON gu.google_id = u.google_id WHERE u.google_id = '${sub}';`
		);
		if (response.length > 0) {
			const token = createJWTToken({ ...response[0] });
			console.log(token);
			return res.status(200).send({ ...response[0], token });
		} else {
			await query(`INSERT INTO google_users (google_id) VALUES ('${sub}')`);
			await query(
				`INSERT INTO users (email,isverified,google_id,isLoggedInWithGoogle) VALUES ('${email}', 1, '${sub}', 1)`
			);

			const google_register = await query(
				`SELECT id, email, role_id, isverified, isLoggedInWithGoogle FROM users WHERE google_id = '${sub}'`
			);
			const token = createJWTToken({ ...google_register[0] });
			return res.send({ ...google_register[0], token });
		}
		// res.length == 0
		// insert into google_users (google_id ) values (${sub})
		// insert into users () values

		// if (response.length > 0) {
		// 	return res.send(response[0]);
		// }
		console.log(sub);
		res.status(201);
		// res.json(user);
	} catch (err) {
		console.log(err.message);
		return res.send(err.message);
	}
});

module.exports = router;
