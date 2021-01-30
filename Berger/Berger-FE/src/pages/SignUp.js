import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Input, Button, FormGroup, Label, Spinner } from "reactstrap";
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
		<div className="d-flex user-container align-items-center justify-content-center">
			<div className="user-card">
				<h4>CREATE AN ACCOUNT TO GET STARTED</h4>
				<div className="already-box">
					Already have an account?
					<Link to="/login">
						<Button color="danger" className="ml-3">
							SIGN IN
						</Button>
					</Link>
				</div>
				<form className="input-field mt-3" onSubmit={handleSubmit}>
					<div>
						<h6>Email</h6>
						<Input
							className="user-input"
							type="email"
							id="email"
							onChange={handleInput}
							ref={emailCheck}
							value={signUp.email}
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
							required
						/>
					</div>

					<div className="my-4">
						<h6>Password</h6>
						<Input
							className="user-input"
							type="password"
							id="password"
							onChange={handleInput}
							value={signUp.password}
							pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
							required
						/>
					</div>
					<div>
						<h6>Confirm Password</h6>
						<Input
							className="user-input"
							type="password"
							id="confirm"
							onChange={handleInput}
							value={signUp.confirm}
							required
						/>
					</div>
					<FormGroup check>
						<Label check style={{ fontSize: "12px" }}>
							<Input type="checkbox" required /> I agree to the following:
							Privacy Policy Terms of Service
						</Label>
					</FormGroup>
					<Button color="warning" className="my-4">
						{props.loading ? <Spinner /> : "SIGN UP"}
					</Button>
					<p style={{ fontSize: "12px" }}>
						Not your computer? Please make sure to log out before you leave
					</p>
				</form>
			</div>
		</div>
	);
}
const mapStatetoProps = ({ user }) => {
	return { id: user.id, loading: user.loading };
};

export default connect(mapStatetoProps, {
	signupAction,
	fetchCartByUserIdAction,
})(SignUp);
