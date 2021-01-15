import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Input, Button } from "reactstrap";
import { loginAction, fetchCartByUserIdAction } from "../redux/actions";

const loginInfo = {
	email: "",
	password: "",
};
function Login(props) {
	const [login, setLogin] = useState(loginInfo);

	const handleInput = (e) => {
		setLogin({
			...login,
			[e.target.id]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		props.loginAction(login);
		// window.location.reload();

		console.log(props.userID);
	};
	if (props.userID !== 0) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<h2>Login</h2>
			<form className="input-field mt-3" onSubmit={handleSubmit}>
				<h6>Email</h6>
				<Input
					type="email"
					id="email"
					value={login.email}
					onChange={handleInput}
				/>
				<h6>Password</h6>
				<Input
					type="password"
					id="password"
					value={login.password}
					onChange={handleInput}
				/>
				<Button>login</Button>
			</form>
		</div>
	);
}
const mapStatetoProps = ({ user }) => {
	return {
		userID: user.id,
	};
};
export default connect(mapStatetoProps, {
	loginAction,
	fetchCartByUserIdAction,
})(Login);
