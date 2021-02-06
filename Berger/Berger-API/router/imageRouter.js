const express = require("express");
const { query } = require("../database");
const router = express.Router();
const { uploader } = require("../helpers");

router.post("/", (req, res) => {
	try {
		const path = "/images";
		const upload = uploader(path, "IMG").fields([{ name: "image" }]);
		upload(req, res, (err) => {
			const { image } = req.files;
			const imagePath = image ? `${path}/${image[0].filename}` : null;
			query(`INSERT INTO images (imagepath) VALUES ('${imagePath}')`, (err) => {
				if (err) {
					return res.status(500).send(err.message);
				}
				return res
					.status(201)
					.send({ message: "IMAGE_POSTED", status: "SUCCESS" });
			});
		});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

module.exports = router;
