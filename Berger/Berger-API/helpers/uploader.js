const multer = require("multer");
const fs = require("fs");

const uploader = (destination, filenamePrefix) => {
	let defaultPath = "./public";

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			const dir = defaultPath + destination;
			if (fs.existsSync(dir)) {
				console.log(dir, "dir exists ");
				cb(null, dir);
			} else {
				fs.mkdirSync(dir, { recursive: true }, (err) => cb(err, dir));
			}
		},
		filename: (req, file, cb) => {
			let originalname = file.originalname;
			let ext = originalname.split(".").pop();
			let filename = filenamePrefix + Date.now() + "." + ext;
			cb(null, filename);
		},
	});

	const fileFilter = (req, file, cb) => {
		console.log(file.originalname);
		const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

		if (!regex.test(file.originalname.toLowerCase())) {
			return cb(new Error("only selected files allowed"), false);
		}
		cb(null, true);
	};
	return multer({
		storage,
		fileFilter,
	});
};
module.exports = uploader;
