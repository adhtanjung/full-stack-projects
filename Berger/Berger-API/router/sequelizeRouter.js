const router = require("express").Router();
const { getAllUsers, insertNewUser } = require("../controller/UserController");

router.get("/", getAllUsers);
router.post("/", insertNewUser);

module.exports = router;
