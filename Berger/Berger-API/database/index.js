const mysql = require("mysql");
const { MongoClient, ObjectID } = require("mongodb");

// const db = mysql.createConnection({
// 	host: "db4free.net",
// 	user: "berger",
// 	password: "Asd12345",
// 	database: "berger",
// 	port: 3306,
// });

const db = mysql.createConnection({
	host: "localhost",
	user: "adhitanjung",
	password: "asd123",
	database: "berger",
	port: 3306,
});

const url =
	"mongodb+srv://adhtanjung:Asd12345@bergercluster.lnuli.mongodb.net/test?retryWrites=true&w=majority";

module.exports = { db, mongo: { MongoClient, ObjectID, url } };
