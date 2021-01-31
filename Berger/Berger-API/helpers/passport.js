// // const passport = require("passport");
// // const GoogleStrategy = require("passport-google-oauth20").Strategy;

// // passport.serializeUser(function (user, done) {
// // 	/*
// //     From the user take just the id (to minimize the cookie size) and just pass the id of the user
// //     to the done callback
// //     PS: You dont have to do it like this its just usually done like this
// //     */
// // 	done(null, user);
// // });

// // passport.deserializeUser(function (user, done) {
// // 	/*
// //     Instead of user this function usually recives the id
// //     then you use the id to select the user from the db and pass the user obj to the done callback
// //     PS: You can later access this data in any routes in: req.user
// //     */
// // 	done(null, user);
// // });
// // passport.use(
// // 	new GoogleStrategy(
// // 		{
// // 			clientID:
// // 				"414985155471-np2sdlh50bfkk5ptam9km2qfb3opi109.apps.googleusercontent.com",
// // 			clientSecret: "lKh8_nWGM_gNZdV5U5HrIGis",
// // 			callbackURL: "http://localhost:2002/google/callback",
// // 		},
// // 		function (accessToken, refreshToken, profile, done) {
// // 			/*
// // 			 use the profile info (mainly profile id) to check if the user is registerd in ur db
// // 			 If yes select the user and pass him to the done callback
// // 			 If not create the user and then select him and pass to callback
// // 			*/
// // 			return done(null, profile);
// // 		}
// // 	)
// // );
// // import * as queryString from "query-string";

// // const stringifiedParams = queryString.stringify({
// // 	client_id:
// // 		"414985155471-np2sdlh50bfkk5ptam9km2qfb3opi109.apps.googleusercontent.com",
// // 	redirect_uri: "http://localhost:2002/google",
// // 	scope: ["email", "profile"].join(" "), // space seperated string
// // 	response_type: "code",
// // 	access_type: "offline",
// // 	prompt: "consent",
// // });

// // const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
// import { google } from 'googleapis';

// /*******************/
// /** CONFIGURATION **/
// /*******************/

// const googleConfig = {
//   clientId: "414985155471-np2sdlh50bfkk5ptam9km2qfb3opi109.apps.googleusercontent.com", // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
//   clientSecret: "lKh8_nWGM_gNZdV5U5HrIGis", // e.g. _ASDFA%DFASDFASDFASD#FAD-
//   redirect: "http://localhost:2002/google/callback", // this must match your google api settings
// };

// const defaultScope = [
//   'https://www.googleapis.com/auth/plus.me',
//   'https://www.googleapis.com/auth/userinfo.email',
// ];

// /*************/
// /** HELPERS **/
// /*************/

// function createConnection() {
//   return new google.auth.OAuth2(
//     googleConfig.clientId,
//     googleConfig.clientSecret,
//     googleConfig.redirect
//   );
// }

// function getConnectionUrl(auth) {
//   return auth.generateAuthUrl({
//     access_type: 'offline',
//     prompt: 'consent',
//     scope: defaultScope
//   });
// }

// function getGooglePlusApi(auth) {
//   return google.plus({ version: 'v1', auth });
// }

// /**********/
// /** MAIN **/
// /**********/

// /**
//  * Part 1: Create a Google URL and send to the client to log in the user.
//  */
// function urlGoogle() {
//   const auth = createConnection();
//   const url = getConnectionUrl(auth);
//   return url;
// }

// /**
//  * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
//  */
// function getGoogleAccountFromCode(code) {
//   const data = await auth.getToken(code);
//   const tokens = data.tokens;
//   const auth = createConnection();
//   auth.setCredentials(tokens);
//   const plus = getGooglePlusApi(auth);
//   const me = await plus.people.get({ userId: 'me' });
//   const userGoogleId = me.data.id;
//   const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
//   return {
//     id: userGoogleId,
//     email: userGoogleEmail,
//     tokens: tokens,
//   };
// }
