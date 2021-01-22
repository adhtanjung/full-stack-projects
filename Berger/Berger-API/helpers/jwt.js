const jwt = require("jsonwebtoken");

const createJWTToken = (payload) => {
	return jwt.sign(payload, "keyrahasia", { expiresIn: "24h" });
};
const checkToken = (req, res, next) => {
	if (req.method !== "OPTIONS") {
		jwt.verify(req.token, "keyrahasia", (err, decoded) => {
			if (err) {
				return res.status(401).send({
					message: err.message,
					status: "Unauthorized",
				});
			}
			req.user = decoded;
			console.log(decoded);
		});
		next();
	}
};
module.exports = {
	createJWTToken,
	checkToken,
};
