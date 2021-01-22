const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
	userRouter,
	cartRouter,
	productRouter,
	imageRouter,
} = require("./router");
const bearerToken = require("express-bearer-token");
const port = 2002;

const app = express();

app.use(bearerToken());
app.use(bodyParser());
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.status(200).send("<h1>Berger API ok!</h1>");
});

app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/products", productRouter);
app.use("/images", imageRouter);

app.listen(port, () => console.log(`Server listens at port ${port}`));
