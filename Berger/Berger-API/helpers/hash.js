const crypto = require("crypto");
const hash = (pass) => {
	return crypto.createHmac("sha256", "bergerHash").update(pass).digest("hex");
};

module.exports = hash;
