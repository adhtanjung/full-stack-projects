import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { resetPasswordAction } from "../redux/actions";

const input = {
	password: "",
	confirmPassword: "",
};
function ResetPassword(props) {
	const [password, setPassword] = useState(input);
	const [tokenAvailable, setTokenAvailable] = useState("");

	const handleInput = (e) => {
		setPassword({
			...password,
			[e.target.id]: e.target.value,
		});
	};
	const handleNewPassword = (e) => {
		e.preventDefault();
		const token = props.location.search.split("=").pop();
		props.resetPasswordAction(password, token);
	};

	useEffect(() => {
		setTokenAvailable(props.location.search.split("=").pop());
	}, []);
	console.log(props.location.search.split("=").pop());
	console.log(tokenAvailable);
	if (props.resetPassword) {
		return <Redirect to="/" />;
	}
	return (
		<div className="container-card m-5">
			<h1>Reset Password</h1>
			<form onSubmit={handleNewPassword}>
				<div>
					<label>Input New Password</label>
					<Input type="password" id="password" onChange={handleInput} />
				</div>
				<div className="my-3">
					<label>Confirm New Password</label>
					<Input type="password" id="confirmPassword" onChange={handleInput} />
				</div>
				<Button color="warning">Set new password</Button>
			</form>
		</div>
	);
}
const mapStateToProps = ({ user }) => {
	return {
		resetPassword: user.resetPassword,
	};
};

export default connect(mapStateToProps, { resetPasswordAction })(ResetPassword);
