const express = require("express");
const router = express.Router();
const db = require("../database");

// GET CART BY USERID
router.get("/", (req, res) => {
	if (req.query.userID) {
		console.log("masuk");
		let sql = `SELECT * FROM cart WHERE userID=${req.query.userID}`;
		db.query(sql, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return res.status(200).send(data);
		});
	} else {
		db.query(`SELECT * FROM cart`, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return res.status(200).send(data);
		});
	}
});

// POST TO CART
router.post("/", (req, res) => {
	let sql = `INSERT INTO cart SET ?`;
	db.query(sql, req.body, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res.status(201).send(data);
	});
});

module.exports = router;
