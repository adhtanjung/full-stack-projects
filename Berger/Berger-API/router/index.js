const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");
const imageRouter = require("./imageRouter");
const mongoRouter = require("./mongoRouter");
const googleRouter = require("./googleRouter");
const sequelizeRouter = require("./sequelizeRouter");

module.exports = {
	userRouter,
	cartRouter,
	productRouter,
	imageRouter,
	mongoRouter,
	googleRouter,
	sequelizeRouter,
};
