import React from "react";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from "reactstrap";
import { addProductAction } from "../redux/actions";

function AdminHeader(props) {
	const { logout, cartLength, email } = props;
	return (
		<div className="header-right d-flex justify-content-end align-items-center">
			<div className="d-flex align-items-center">
				<div className="d-flex mx-3">
					<Link to="/cart" className="clickable ">
						<FiShoppingCart />
					</Link>
					<span className="badge">{cartLength}</span>
				</div>
			</div>

			<UncontrolledDropdown inNavbar>
				<DropdownToggle
					caret
					className="clickable"
					style={{ backgroundColor: "transparent", border: "none" }}
				>
					{email}
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem>
						<Link to="/manage-data">
							Manage Data <RiAccountCircleLine />
						</Link>
					</DropdownItem>
					<DropdownItem divider />
					<DropdownItem>
						<Link to="/profile">
							Profile <RiAccountCircleLine />
						</Link>
					</DropdownItem>

					<DropdownItem divider />
					<DropdownItem onClick={logout}>
						Logout <FiLogOut />
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		</div>
	);
}

export default connect(null, { addProductAction })(AdminHeader);
