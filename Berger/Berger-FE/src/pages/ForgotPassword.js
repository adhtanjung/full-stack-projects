import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Input, Label } from "reactstrap";
import { forgotPasswordAction } from "../redux/actions";

function ForgotPassword(props) {
	const [email, setEmail] = useState("");

	const handleEmail = (e) => {
		e.preventDefault();
		props.forgotPasswordAction(email);
	};

	const handleChange = (e) => {
		setEmail(e.target.value);
	};
	console.log(email);
	return (
		<div>
			<div>
				<form className="input-field" onSubmit={handleEmail}>
					<Label>Input your email</Label>
					<Input type="email" onChange={handleChange} />
					<Button>Send email password request</Button>
				</form>
			</div>
		</div>
	);
}

export default connect(null, { forgotPasswordAction })(ForgotPassword);
