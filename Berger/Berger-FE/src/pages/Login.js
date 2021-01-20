import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Input, Button } from "reactstrap";
import { loginAction, fetchCartByUserIdAction } from "../redux/actions";
import SHA256 from "crypto-js/sha256";

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
		const encryptedData = {
			email: login.email,
			password: SHA256(login.password).toString(),
		};
		props.loginAction(encryptedData);
		// window.location.reload();
	};
	if (props.userID !== 0) {
		return <Redirect to="/" />;
	}
	return (
		<div className="d-flex user-container align-items-center justify-content-center">
			<div className="user-card">
				<h2>SIGN IN</h2>
				<form className="input-field mt-3" onSubmit={handleSubmit}>
					<div>
						<h6>Email</h6>
						<Input
							type="email"
							id="email"
							value={login.email}
							onChange={handleInput}
							className="user-input"
						/>
					</div>
					<div className="my-4">
						<h6>Password</h6>
						<Input
							type="password"
							id="password"
							value={login.password}
							onChange={handleInput}
							className="user-input"
						/>
					</div>
					<Button className="w-100 mb-4 btn" color="warning">
						SIGN IN
					</Button>
					<center>
						<h6>Don't have an account yet?</h6>
					</center>
					<Link to="/signup">
						<Button className="w-100 mt-4 btn" color="danger">
							SIGN UP
						</Button>
					</Link>
				</form>
			</div>
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
