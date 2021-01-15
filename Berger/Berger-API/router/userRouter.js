const db = require("../database");
const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");

// GET USERS DATA
router.get("/", (req, res) => {
	let sql = `SELECT * FROM users`;
	if (req.query.email && req.query.password) {
		db.query(
			`${sql} WHERE email = '${req.query.email}' and password = '${req.query.password}'`,
			(err, data) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res.status(200).send(data);
			}
		);
	} else {
		db.query(sql, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return res.status(200).send(data);
		});
	}
});

// GET USER DATA BY ID
router.get("/:id", (req, res) => {
	const id = req.params.id;
	let sql = `SELECT * FROM users WHERE id=${id}`;
	db.query(sql, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		console.log(data[0].email);
		return res.status(200).send({ id: data[0].id, email: data[0].email });
	});
});

// POST NEW USER
router.post("/", (req, res) => {
	const { email, password } = req.body;
	const encryptedPassword = SHA256(password).toString();

	let sql = `INSERT INTO users`;
	db.query(
		`${sql}(email,password,role_id) VALUES ('${email}','${encryptedPassword}',2);`,
		(err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return res.status(200).send({
				id: data.insertId,
				email: email,
			});
		}
	);
});

module.exports = router;
