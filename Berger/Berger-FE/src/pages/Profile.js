import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { changeUserEmailAction } from "../redux/actions";

function Profile(props) {
	const [email, setEmail] = useState(props.userEmail);
	const [toggle, setToggle] = useState(true);
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const toggleEmail = (e) => {
		setToggle(!toggle);
		e.preventDefault();
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		props.changeUserEmailAction(email, props.userID);
	};
	useEffect(() => {
		setEmail(props.userEmail);
	}, [props.userEmail]);
	console.log(email);
	return (
		<div className="container container-card">
			<h1 style={{ color: "#f64b3c" }}>Your Personal Information</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="exampleEmail">Email</Label>
					<div className="d-flex">
						<Button
							style={{ fontSize: "12px", width: "200px", marginRight: "10px" }}
							onClick={toggleEmail}
							color="danger"
						>
							Change my email
						</Button>
						<Input
							type="email"
							name="email"
							id="exampleEmail"
							placeholder="with a placeholder"
							value={email}
							onChange={handleEmail}
							disabled={toggle}
							className="disabled-input"
						/>
					</div>
				</FormGroup>
				<FormGroup>
					<Label for="examplePassword">Password</Label>
					<div className="d-flex">
						<Button
							style={{ fontSize: "12px", width: "200px", marginRight: "10px" }}
							onClick={toggleEmail}
							color="danger"
						>
							Change my password
						</Button>
						<Input
							type="password"
							name="password"
							id="examplePassword"
							placeholder="password placeholder"
						/>
					</div>
				</FormGroup>

				<Button color="warning">Submit</Button>
			</Form>
		</div>
	);
}

const mapStateToProps = ({ user }) => {
	return {
		userEmail: user.email,
		userID: user.id,
	};
};

export default connect(mapStateToProps, { changeUserEmailAction })(Profile);
