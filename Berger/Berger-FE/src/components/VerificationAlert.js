import React, { useState } from "react";
import { Alert } from "reactstrap";
import { IoMdWarning } from "react-icons/io";
import { BsCheckAll } from "react-icons/bs";
import { connect } from "react-redux";
import { resendEmailAction } from "../redux/actions";

function VerificationAlert(props) {
	const [emailSent, setemailSent] = useState(false);
	const handleResendEmail = () => {
		const token = localStorage.getItem("token");
		props.resendEmailAction(props.email, token);
		setemailSent(true);
	};
	return (
		<Alert color="danger" className="d-flex align-items-center">
			<IoMdWarning /> &nbsp; Your account has not been verified yet!{" "}
			{emailSent ? (
				<span>
					Email sent! <BsCheckAll />
				</span>
			) : (
				<span onClick={handleResendEmail} className="resendemail-click">
					&nbsp; Click here to send a verification email
				</span>
			)}{" "}
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
