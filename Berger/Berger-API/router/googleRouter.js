// const router = require("express").Router();
// const passport = require("passport");
// // require("../helpers/passport");

// const isLoggedIn = (req, res, next) => {
// 	if (req.user) {
// 		next();
// 	} else {
// 		res.send("error");
// 	}
// };
// // Example protected and unprotected routes
// router.get("/failed", (req, res) => res.send("You Failed to log in!"));

// // In this route you can see that if the user is logged in u can acess his info in: req.user
// router.get("/good", isLoggedIn, (req, res) => {
// 	console.log(req);
// 	res.send(`Welcome mr ${req.user.displayName}!`);
// });

// // Auth Routes
// router.get(
// 	"/",
// 	passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
// 	"/callback",
// 	passport.authenticate("google", { failureRedirect: "google/failed" }),
// 	function (req, res) {
// 		// Successful authentication, redirect home.
// 		res.redirect("/google/good");
// 	}
// );

// router.get("/logout", (req, res) => {
// 	req.session = null;
// 	req.logout();
// 	res.redirect("/");
// });

// module.exports = router;
