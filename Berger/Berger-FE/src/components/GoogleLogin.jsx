import React from "react";
import { useGoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../helpers/refreshToken";
import googleicon from "../assets/google-icon.svg";
import axios from "axios";
import { api_url } from "../helpers/api_url";

const clientId =
	"414985155471-ece9j71a5hm6p798baff9ki6f11aqm7r.apps.googleusercontent.com";

function GoogleLogin() {
	const onSuccess = (res) => {
		console.log("Login Success: currentUser:", res.profileObj);
		console.log("email: ", res.profileObj.email, res.profileObj.googleId);
		alert(
			`Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
		);
		axios
			.post(`${api_url}/users/google/login`, {
				googleId: res.profileObj.googleId,
				email: res.profileObj.email,
			})
			.then((res) => {
				console.log("masuk google");
			})
			.catch((err) => {
				console.log(err);
			});
		refreshTokenSetup(res);
	};
	const onFailure = (res) => {
		console.log("Login failed: res:", res);
		alert(`Failed to login. `);
	};
	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: false,
		accessType: "offline",
		// responseType: 'code',
		// prompt: 'consent',
	});
	return (
		<button onClick={signIn} className="button">
			<img src={googleicon} alt="google login" className="icon" height="18px" />

			<span className="buttonText">Sign in with Google</span>
		</button>
	);
}

export default GoogleLogin;
