import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginWithGoogleAction } from "../redux/actions";

function LoginWithGoogle(props) {
	useEffect(() => {
		props.loginWithGoogleAction();
	}, []);
	return <div>Login with google</div>;
}

export default connect(null, { loginWithGoogleAction })(LoginWithGoogle);
