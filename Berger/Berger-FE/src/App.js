import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/SignUp";
import { keepLoginAction, fetchCartByUserIdAction } from "./redux/actions";

function App(props) {
	// const [id, setID] = useState(0);

	useEffect(() => {
		let id = localStorage.getItem("id");
		if (id !== 0) {
			if (props.userID !== 0) {
				props.fetchCartByUserIdAction(props.userID);
			}
			props.keepLoginAction(id);
		}
	}, [props.userID]);

	return (
		<div className="appjs">
			<Header />
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={SignUp} />
			<Route exact path="/cart" component={Cart} />
			<Route exact path="/product-detail" component={ProductDetail} />
		</div>
	);
}
const mapStateToProps = ({ user, cart }) => {
	return {
		userID: user.id,
		cartList: cart.cartList,
	};
};

export default connect(mapStateToProps, {
	keepLoginAction,
	fetchCartByUserIdAction,
})(App);
