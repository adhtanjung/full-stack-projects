const express = require("express");
const models = require("../models");

const getAllUsers = async (req, res) => {
	const User = await models.User.findAll();
	console.log("masuk");

	res.status(200).send(User);
};

const insertNewUser = async (req, res) => {
	const { firstName, lastName } = req.body;
	const response = await models.User.create({
		firstName,
		lastName,
	});
	return res.send({ message: "New user created" });
};
module.exports = { getAllUsers, insertNewUser };
