import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../redux/actions";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";

import { useGoogleLogout } from "react-google-login";
const clientId =
	"414985155471-ece9j71a5hm6p798baff9ki6f11aqm7r.apps.googleusercontent.com";

function Header(props) {
	const logout = async () => {
		localStorage.clear();
		// localStorage.removeItem("id");
		await props.logoutAction();
		signOut();
	};
	// const [cartList, setCartList] = useState([]);
	// useEffect(() => {
	// 	props.fetchCartByUserIdAction(props.id);
	// }, []);

	const onLogoutSuccess = (res) => {
		console.log("Logged out Success");
	};

	const onFailure = () => {
		console.log("Handle failure cases");
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure,
	});
	const renderHeader = () => {
		const { id, role_id } = props;
		if (id > 1 && role_id === 2) {
			return (
				<UserHeader
					logout={logout}
					cartLength={props.cartList.length}
					email={props.email.split("@")[0]}
				/>
			);
		} else {
			return (
				<AdminHeader
					logout={logout}
					cartLength={props.cartList.length}
					email={props.email.split("@")[0]}
				/>
			);
		}
	};

	return (
		<div className="d-flex align-items-center justify-content-between p-3 main-header">
			<div className="header-left d-flex">
				<Link to="/" className="clickable">
					<label style={{ fontWeight: "bolder", fontSize: "2vw" }}>
						<b>berger.</b>
					</label>
				</Link>
			</div>
			{props.id !== 0 ? (
				renderHeader()
			) : (
				<div className="header-right d-flex justify-content-end">
					<Link to="/login" className="clickable">
						<h4 className="mr-3">login</h4>
					</Link>
					<Link to="/signup" className="clickable">
						<h4>sign up</h4>
					</Link>
				</div>
			)}
		</div>
	);
}
const mapStateToProps = ({ user, cart }) => {
	return {
		id: user.id,
		email: user.email,
		cartList: cart.cartList,
		role_id: user.role_id,
	};
};
export default connect(mapStateToProps, {
	logoutAction,
})(Header);
