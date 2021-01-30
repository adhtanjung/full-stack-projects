const express = require("express");
const router = express.Router();
const {
	mongo: { MongoClient, ObjectID, url },
} = require("../database");

router.get("/", (req, res) => {
	MongoClient.connect(url, (err, client) => {
		if (err) {
			return res.status(500).send(err);
		}
		const moviesCol = client.db("sample_mflix").collection("movies");
		moviesCol
			.find()
			.limit(10)
			.toArray((err, data) => {
				client.close();
				if (err) return res.send(err);
				return res.status(200).send(data);
			});
	});
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	MongoClient.connect(url, (err, client) => {
		if (err) return res.send(err);
		const moviesCol = client.db("sample_mflix").collection("movies");
		moviesCol.findOne(
			{
				_id: new ObjectID(id),
			},
			(err, data) => {
				client.close();
				if (err) return res.send(err);
				return res.send(data);
			}
		);
	});
});

//6011939580986e45d4e836fd
router.post("/", (req, res) => {
	MongoClient.connect(url, (err, client) => {
		if (err) return res.status(500).send(err);
		const moviesCol = client.db("sample_mflix").collection("movies");

		moviesCol.insertOne(req.body, (err, data) => {
			client.close();
			if (err) return res.status(500).send(err);

			return res.send(data);
		});
	});
});

router.patch("/:id", (req, res) => {
	const id = req.params.id;
	const { set } = req.body;
	MongoClient.connect(url, (err, client) => {
		if (err) return res.send(err);

		const moviesCol = client.db("sample_mflix").collection("movies");

		moviesCol.updateOne(
			{
				_id: new ObjectID(id),
			},
			{
				$set: set,
			},
			(err, data) => {
				client.close();
				if (err) return res.send(err);
				return res.send(data);
			}
		);
	});
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	MongoClient.connect(url, (err, client) => {
		if (err) return res.send(err);

		const moviesCol = client.db("sample_mflix").collection("movies");
		moviesCol.deleteOne(
			{
				_id: new ObjectID(id),
			},
			(err, data) => {
				client.close();
				if (err) return res.send(err);
				return res.send(data);
			}
		);
	});
});

module.exports = router;
