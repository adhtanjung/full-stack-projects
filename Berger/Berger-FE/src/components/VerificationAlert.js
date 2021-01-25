import React from "react";
import { Alert, Button } from "reactstrap";
import { IoMdWarning } from "react-icons/io";
import { connect } from "react-redux";
import { resendEmailAction } from "../redux/actions";

function VerificationAlert(props) {
	const handleResendEmail = () => {
		const token = localStorage.getItem("token");
		props.resendEmailAction(props.email, token);
	};
	return (
		<Alert color="danger" className="d-flex align-items-center">
			<IoMdWarning /> &nbsp; Your account has not been verified yet!{" "}
			<Button onClick={handleResendEmail}>
				&nbsp; Click here to send a verification email
			</Button>{" "}
		</Alert>
	);
}
const mapStateToProps = ({ user }) => {
	return {
		email: user.email,
	};
};

export default connect(mapStateToProps, { resendEmailAction })(
	VerificationAlert
);
