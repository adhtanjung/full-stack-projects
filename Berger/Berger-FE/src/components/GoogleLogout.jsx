import React from "react";
import { useGoogleLogout } from "react-google-login";
import googleicon from "../assets/google-icon.svg";

const clientId =
	"414985155471-ece9j71a5hm6p798baff9ki6f11aqm7r.apps.googleusercontent.com";

function GoogleLogout() {
	const onLogoutSuccess = (res) => {
		console.log("Logged out Success");
		alert("Logged out Successfully ✌");
	};

	const onFailure = () => {
		console.log("Handle failure cases");
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure,
	});
	return (
		<button onClick={signOut} className="button">
			<img
				src={googleicon}
				alt="google login"
				className="icon"
				height="18px"
			></img>

			<span className="buttonText">Sign out</span>
		</button>
	);
}

export default GoogleLogout;
