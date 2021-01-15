import React from "react";
import { connect } from "react-redux";
import { fetchCartByUserIdAction } from "../redux/actions";

function Cart(props) {
	// useEffect(() => {
	// 	props.fetchCartByUserIdAction(props.userID);
	// }, []);

	return (
		<div>
			{props.cartList.map((val) => (
				<div>{val.name}</div>
			))}
		</div>
	);
}
const mapStateToProps = ({ user, cart }) => {
	return {
		userID: user.id,
		cartList: cart.cartList,
	};
};
export default connect(mapStateToProps, { fetchCartByUserIdAction })(Cart);
