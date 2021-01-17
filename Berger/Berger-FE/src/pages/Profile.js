import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {
	changeUserEmailAction,
	changerUserPasswordAction,
} from "../redux/actions";

function Profile(props) {
	const [email, setEmail] = useState(props.userEmail);
	const [password, setPassword] = useState({
		currentPassword: "",
		newPassword: "",
	});
	const [toggleEmail, setToggleEmail] = useState(true);
	const [togglePassword, setTogglePassowd] = useState(true);

	const handlePassword = (e) => {
		setPassword({ ...password, [e.target.id]: e.target.value });
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const disableEmail = (e) => {
		setToggleEmail(!toggleEmail);
		e.preventDefault();
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email !== props.userEmail) {
			props.changeUserEmailAction(email, props.userID);
		}
		props.changerUserPasswordAction();
	};
	useEffect(() => {
		setEmail(props.userEmail);
	}, [props.userEmail]);
	console.log(email);
	console.log(password);
	// ! BLM SELESAI
	// TODO: PISAHIN FORM NYA BIKIN JADI 2
	return (
		<div className="container container-card">
			<h1 style={{ color: "#f64b3c" }}>Your Personal Information</h1>
			<Form onSubmit={handleSubmit} className="mt-3">
				<FormGroup
					style={{
						border: "1px solid black",
						padding: "20px",
						borderRadius: "15px",
						boxShadow: "1px 0px 8px 0px rgb(37, 37, 37)",
					}}
				>
					<Label
						for="exampleEmail"
						style={{
							fontSize: "20px",
							color: "#f64b3c",
							backgroundColor: "black",
							padding: "5px 10px 5px 10px",
						}}
					>
						Email
					</Label>
					<div className="d-flex mb-3">
						<Button
							style={{ fontSize: "12px", width: "200px", marginRight: "10px" }}
							onClick={disableEmail}
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
							disabled={toggleEmail}
							className="disabled-input"
						/>
					</div>
					<center>
						<Button color="warning" className="w-100 my-3">
							Submit
						</Button>
					</center>
				</FormGroup>
				<FormGroup
					style={{
						border: "1px solid black",
						padding: "20px",
						borderRadius: "15px",
						boxShadow: "1px 0px 8px 0px rgb(37, 37, 37)",
					}}
					className="mt-4"
				>
					<Label
						for="examplePassword"
						style={{
							fontSize: "20px",
							color: "#f64b3c",
							backgroundColor: "black",
							padding: "5px 10px 5px 10px",
						}}
					>
						Password
					</Label>
					<div className="d-flex flex-column mb-3">
						{/* <Button
							style={{ fontSize: "12px", width: "200px", marginRight: "10px" }}
							onClick={disablePassword}
							color="danger"
						>
							Change my password
						</Button> */}
						<p>Type your current password here</p>
						<Input
							type="password"
							name="password"
							id="examplePassword"
							placeholder="current password"
							className="disabled-input mb-3"
							onChange={handlePassword}
							value={password.currentPassword}
							id="currentPassword"
							required
						/>
						<p>Type your new password here</p>
						<Input
							type="password"
							name="password"
							id="examplePassword"
							placeholder="new password"
							className="disabled-input"
							onChange={handlePassword}
							value={password.newPassword}
							id="newPassword"
							required
						/>
					</div>
					<center>
						<Button color="warning" className="w-100 my-3">
							Submit
						</Button>
					</center>
				</FormGroup>
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

export default connect(mapStateToProps, {
	changeUserEmailAction,
	changerUserPasswordAction,
})(Profile);
