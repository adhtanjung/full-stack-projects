const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
	/*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	/*
    Instead of user this function usually recives the id
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
	done(null, user);
});
passport.use(
	new GoogleStrategy(
		{
			clientID:
				"414985155471-np2sdlh50bfkk5ptam9km2qfb3opi109.apps.googleusercontent.com",
			clientSecret: "lKh8_nWGM_gNZdV5U5HrIGis",
			callbackURL: "http://localhost:2002/google/callback",
		}
		// function (accessToken, refreshToken, profile, cb) {
		// 	User.findOrCreate({ googleId: profile.id }, function (err, user) {
		// 		return cb(err, user);
		// 	});
		// }
	)
);
