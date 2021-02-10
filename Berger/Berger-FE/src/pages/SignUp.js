import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Input, Button, FormGroup, Label, Spinner } from "reactstrap";
import { signupAction, fetchCartByUserIdAction } from "../redux/actions";
import GoogleLogin from "../components/GoogleLogin";

let loginInfo = {
	email: "",
	password: "",
	confirm: "",
};
// const regex = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/;
function SignUp(props) {
	const reUppercase = /[A-Z]/;
	const re6Chars = /^.{6,}$/;
	const reSpecialChar = /\W|_/;
	const [signUp, setsignUp] = useState(loginInfo);
	const handleInput = (e) => {
		setsignUp({
			...signUp,
			[e.target.id]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const { confirm, password } = signUp;
		if (
			reUppercase.test(password) &&
			re6Chars.test(password) &&
			reSpecialChar.test(password)
		) {
			if (confirm === password) {
				props.signupAction(signUp);
			} else {
				alert("Please match the requested format");
			}
		} else {
			alert("Please match the requested format");
		}

		// localStorage.setItem("id", props.id);
	};
	const emailCheck = useRef();

	if (props.id !== 0) {
		// props.fetchCartByUserIdAction(props.id);
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
				<span className="my-2">OR</span>
				<GoogleLogin />
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

					<div className="mt-4 mb-1">
						<h6>Password</h6>
						<Input
							className="user-input"
							type="password"
							id="password"
							onChange={handleInput}
							value={signUp.password}
							required
						/>
						<div style={{ fontSize: "12px" }}>
							<ul className="d-flex justify-content-between p-1 pl-3">
								<li
									style={{
										color: reUppercase.test(signUp.password)
											? "#7dbf5c"
											: "red",
									}}
								>
									An uppercase letter
								</li>
								<li
									style={{
										color: re6Chars.test(signUp.password) ? "#7dbf5c" : "red",
									}}
								>
									Min 6 chars
								</li>
								<li
									style={{
										color: reSpecialChar.test(signUp.password)
											? "#7dbf5c"
											: "red",
									}}
								>
									A special char
								</li>
							</ul>
						</div>
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
						<ul className="p-1 pl-3" style={{ fontSize: "12px" }}>
							<li
								style={{
									color:
										signUp.confirm === signUp.password && signUp.password !== ""
											? "#7dbf5c"
											: "red",
								}}
							>
								{signUp.confirm === signUp.password && signUp.password !== ""
									? "Password matched"
									: "Password not matched"}
							</li>
						</ul>
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
