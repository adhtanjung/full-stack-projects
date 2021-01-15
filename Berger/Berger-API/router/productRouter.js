const express = require("express");
const router = express.Router();
const db = require("../database");
const _ = require("lodash");

// GET PRODUCTS DATA
router.get("/", (req, res) => {
	let sql = `SELECT * FROM products`;
	if (!_.isEmpty(req.query.category)) {
		db.query(
			`${sql} WHERE category = ${parseInt(req.query.category)}`,
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

// GET PRODUCT BY ID
router.get("/:id", (req, res) => {
	const id = req.params.id;
	let sql = `SELECT * FROM products WHERE id=${id}`;
	db.query(sql, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res.status(200).send(data);
	});
});

// POST NEW PRODUCT
router.post("/", (req, res) => {
	const { name, image, category, price } = req.body;
	db.query(
		`INSERT INTO products (name,image,category,price) VALUES ('${name}','${image}',${category},${price})`,
		(err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return res.status(201).send({
				id: data.insertId,
				...req.body,
			});
		}
	);
});

module.exports = router;
