import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import { userVerificationAction } from "../redux/actions";

function Verification(props) {
	useEffect(() => {
		const token = props.location.search.split("=").pop();
		props.userVerificationAction(token);
	}, []);
	if (props.isverified === 1 || props.userID === 0) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<Button></Button>
		</div>
	);
}

const mapStateToProps = ({ user }) => {
	return {
		userID: user.id,
		isverified: user.isverified,
	};
};
export default connect(mapStateToProps, { userVerificationAction })(
	Verification
);
