const express = require("express");
const router = express.Router();
const db = require("../database");
const _ = require("lodash");
const { uploader } = require("../helpers");
const path = "/products";
const upload = uploader(path, "PRD").fields([{ name: "image" }]);
const fs = require("fs");

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
	try {
		upload(req, res, (err) => {
			const { name, category, price } = JSON.parse(req.body.data);
			const { image } = req.files;
			const imagePath = image ? `${path}/${image[0].filename}` : null;
			db.query(
				`INSERT INTO products (name,image,category,price,imagepath) VALUES ('${name}','${imagePath}',${category},${price},'${imagePath}')`,
				(err, data) => {
					if (err) {
						return res.status(500).send(err.message);
					}
					return res.status(201).send({ message: "posted" });
				}
			);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});

// DELETE PRODUCT
router.delete("/:id", (req, res) => {
	const id = req.params.id;
	db.query(`DELETE FROM products WHERE id=${id}`, (err, data) => {
		if (err) {
			return res.status(500).send(err.message);
		}
		return res.status(201).send({
			message: "DATA_DELETED",
			status: "DELETED",
		});
	});
});

// EDIT PRODUCT
router.patch("/:id", (req, res) => {
	try {
		const id = req.params.id;

		db.query(`SELECT * FROM products WHERE id=${id}`, (err, data) => {
			if (err) {
				return res.status(500).send(err.message);
			}
			const oldImagePath = data[0].imagepath;
			upload(req, res, (err) => {
				console.log(err);
				const { name, category, price } = JSON.parse(req.body.data);
				const { image } = req.files;
				const imagePath = image ? `${path}/${image[0].filename}` : oldImagePath;
				db.query(
					`UPDATE products SET name='${name}', image='${imagePath}',category=${category},price=${price}, imagepath='${imagePath}' WHERE id=${id}`,
					(err, data) => {
						if (err) {
							return res.status(500).send(err.message);
						}
						return res.status(201).send(data);
					}
				);
				if (image) {
					fs.unlinkSync(`public${oldImagePath}`);
				}
			});
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});

module.exports = router;
