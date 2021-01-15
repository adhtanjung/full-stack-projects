import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction, fetchCartByUserIdAction } from "../redux/actions";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	NavbarToggler,
	UncontrolledDropdown,
	Collapse,
} from "reactstrap";

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

	return (
		<div className="d-flex align-items-center justify-content-between p-3 main-header">
			<div className="header-left d-flex">
				<Link to="/" className="clickable">
					<h3 style={{ fontWeight: "bolder" }}>
						<b>berger.</b>
					</h3>
				</Link>
			</div>
			{props.id !== 0 ? (
				<div className="header-right d-flex justify-content-end align-items-center">
					<div className="d-flex align-items-center">
						<div className="d-flex mx-3">
							<Link to="/cart" className="clickable ">
								<FiShoppingCart />
							</Link>
							<span className="badge">{props.cartList.length}</span>
						</div>
					</div>

					<UncontrolledDropdown inNavbar>
						<DropdownToggle nav caret className="clickable">
							{props.email}
						</DropdownToggle>
						<DropdownMenu right nav>
							<DropdownItem>
								Profile <RiAccountCircleLine />
							</DropdownItem>

							<DropdownItem divider />
							<DropdownItem onClick={logout}>
								Logout <FiLogOut />
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</div>
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
