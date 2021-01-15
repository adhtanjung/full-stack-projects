import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Input, Button } from "reactstrap";
import { signupAction, fetchCartByUserIdAction } from "../redux/actions";

let loginInfo = {
	email: "",
	password: "",
	confirm: "",
};

function SignUp(props) {
	const [signUp, setsignUp] = useState(loginInfo);
	const handleInput = (e) => {
		setsignUp({
			...signUp,
			[e.target.id]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		props.signupAction(signUp);
		// localStorage.setItem("id", props.id);
	};
	const emailCheck = useRef();

	if (props.id !== 0) {
		props.fetchCartByUserIdAction(props.id);
		return <Redirect to="/" />;
	}
	return (
		<div>
			<h2>Join our community!</h2>
			<form className="input-field" onSubmit={handleSubmit}>
				<h6>Email</h6>
				<Input
					type="email"
					id="email"
					onChange={handleInput}
					ref={emailCheck}
					value={signUp.email}
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
					required
				/>
				<h6>Password</h6>
				<Input
					type="password"
					id="password"
					onChange={handleInput}
					value={signUp.password}
					pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
					required
				/>
				<h6>Confirm Password</h6>
				<Input
					type="password"
					id="confirm"
					onChange={handleInput}
					value={signUp.confirm}
					required
				/>
				<Button>Sign Up</Button>
			</form>
		</div>
	);
}
const mapStatetoProps = ({ user }) => {
	return { id: user.id };
};

export default connect(mapStatetoProps, {
	signupAction,
	fetchCartByUserIdAction,
})(SignUp);
