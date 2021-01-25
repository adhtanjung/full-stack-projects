import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction, fetchCartByUserIdAction } from "../redux/actions";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";

function Header(props) {
	const logout = () => {
		localStorage.clear();
		// localStorage.removeItem("id");
		props.logoutAction();
	};
	// const [cartList, setCartList] = useState([]);
	// useEffect(() => {
	// 	props.fetchCartByUserIdAction(props.id);
	// }, []);
	const renderHeader = () => {
		const { id } = props;
		if (id > 1) {
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
	};
};
export default connect(mapStateToProps, {
	logoutAction,
	fetchCartByUserIdAction,
})(Header);
