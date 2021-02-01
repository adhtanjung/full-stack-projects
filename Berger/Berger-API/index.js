const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cookieSession = require("cookie-session");
const {
	userRouter,
	cartRouter,
	productRouter,
	imageRouter,
	mongoRouter,
	sequelizeRouter,
} = require("./router");
const bearerToken = require("express-bearer-token");
const port = 2002;
require("./helpers/passport");

app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static("public"));

// app.use(
// 	cookieSession({
// 		name: "tuto-session",
// 		keys: ["key1", "key2"],
// 	})
// );
let userCount = 0;
app.io = io;
app.userCount = userCount;

io.on("connection", (socket) => {
	userCount++;
	console.log(userCount);
	io.emit("JumlahUser", userCount);
	socket.on("disconnect", () => {
		userCount--;
		console.log(userCount);
	});
});

app.get("/", (req, res) => {
	res.status(200).send("<h1>Berger API ok!</h1>");
});

app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/products", productRouter);
app.use("/images", imageRouter);
app.use("/mongo", mongoRouter);
app.use("/sequelize", sequelizeRouter);
// app.use("/google", googleRouter);

server.listen(port, () => console.log(`Server listening at port ${port}`));
