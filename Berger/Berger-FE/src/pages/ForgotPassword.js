import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Input, Spinner } from "reactstrap";
import { forgotPasswordAction } from "../redux/actions";

function ForgotPassword(props) {
	const [email, setEmail] = useState("");
	const [emailSent, setEmailSent] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleEmail = (e) => {
		e.preventDefault();
		props.forgotPasswordAction(email);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setEmailSent(true);
		}, 1200);
	};

	const handleChange = (e) => {
		setEmail(e.target.value);
	};
	return (
		<div className="container-card m-5">
			<h1>FORGET PASSWORD</h1>
			<p>
				Please fill in your email address below and we'll send you an email with
				instructions on how to reset your password.
			</p>
			<div>
				<form className="input-style input " onSubmit={handleEmail}>
					<Input type="email" onChange={handleChange} placeholder="email" />
					<Button color="warning" className="mt-3" disabled={emailSent}>
						{loading ? <Spinner /> : null}
						{emailSent ? "Email sent" : "Send email password request"}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default connect(null, { forgotPasswordAction })(ForgotPassword);
