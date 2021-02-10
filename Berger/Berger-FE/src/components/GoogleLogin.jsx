import React from "react";
import { useGoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../helpers/refreshToken";
import googleicon from "../assets/google-icon.svg";
import { connect } from "react-redux";
import { loginWithGoogleAction } from "../redux/actions";
import "dotenv/config";
import { Button } from "reactstrap";
const clientId = process.env.GOOGLE_ID;

function GoogleLogin(props) {
	const onSuccess = (res) => {
		// console.log("Login Success: currentUser:", res.profileObj);

		const token = res.tokenId;
		props.loginWithGoogleAction(token);
		refreshTokenSetup(res);
	};
	const onFailure = (res) => {
		console.log("Login failed: res:", res);
		alert(`Failed to login.`);
	};
	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: "offline",
		// responseType: 'code',
		// prompt: 'consent',
	});
	return (
		<Button onClick={signIn} className="button" color="light">
			<img src={googleicon} alt="google login" className="icon" height="18px" />

			<span className="buttonText "> Continue with Google</span>
		</Button>
	);
}

export default connect(null, { loginWithGoogleAction })(GoogleLogin);
