import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Input, Button } from "reactstrap";
import { loginAction, fetchCartByUserIdAction } from "../redux/actions";
import { Spinner } from "reactstrap";
import GoogleLogin from "../components/GoogleLogin";

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
			password: login.password,
		};
		props.loginAction(encryptedData);
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
					<Button className="w-100  btn" color="warning">
						{props.loading ? <Spinner /> : "SIGN IN"}
					</Button>
					<center
						className="
						mt-3"
					>
						<span>OR</span>
					</center>
					<center className="mt-3">
						<div>
							<GoogleLogin />
						</div>
					</center>
					<center className="my-4">
						<Link to="/forgot-password">Forget password?</Link>
					</center>
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
		loading: user.loading,
	};
};
export default connect(mapStatetoProps, {
	loginAction,
	fetchCartByUserIdAction,
})(Login);
