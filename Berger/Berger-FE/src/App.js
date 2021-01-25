import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import VerificationAlert from "./components/VerificationAlert";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageData from "./pages/ManageData";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import { keepLoginAction, fetchCartByUserIdAction } from "./redux/actions";

function App(props) {
	useEffect(() => {
		let token = localStorage.getItem("token");
		if (token) {
			// if (props.userID !== 0) {
			// 	props.fetchCartByUserIdAction(props.userID);
			// }
			props.keepLoginAction(token);
		}
	}, [props, props.userID]);

	return (
		<div className="appjs">
			{props.verified === 0 ? <VerificationAlert /> : null}
			<Header />
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={SignUp} />
			<Route exact path="/cart" component={Cart} />
			<Route exact path="/product-detail" component={ProductDetail} />
			<Route exact path="/profile" component={Profile} />
			<Route exact path="/manage-data" component={ManageData} />
			<Route exact path="/verification" component={Verification} />
		</div>
	);
}
const mapStateToProps = ({ user, cart }) => {
	return {
		userID: user.id,
		cartList: cart.cartList,
		verified: user.isverified,
	};
};

export default connect(mapStateToProps, {
	keepLoginAction,
	fetchCartByUserIdAction,
})(App);
