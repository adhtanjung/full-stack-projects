import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Input, Table } from "reactstrap";
import AddProductModal from "../components/AddProductModal";
import { addProductAction, fetchProductsAction } from "../redux/actions";

let input = {
	name: "",
	image: "",
	category: 0,
	price: 0,
};
function ManageData(props) {
	const [productInput, setproductInput] = useState(input);

	useEffect(() => {
		props.fetchProductsAction();
	}, []);
	const renderProduct = () => {
		const { productList } = props;

		return productList.map((val) => {
			return (
				<tr>
					<td>{val.id}</td>
					<td>{val.name}</td>
					<td>
						<img src={val.image} alt="not found" width="70px" />
					</td>
					<td>{val.category}</td>
					<td>{val.price}</td>
					<td>
						<Button>Edit</Button>
					</td>
					<td>
						<Button>Delete</Button>
					</td>
				</tr>
			);
		});
	};

	const handleInput = (e) => {
		setproductInput({
			...productInput,
			[e.target.id]: e.target.value,
		});
	};
	const handleAdd = () => {
		props.addProductAction(productInput);
	};
	const inputs = () => {
		return (
			<div className="d-flex mb-3">
				<Input
					type="text"
					placeholder="Product_Name"
					onChange={handleInput}
					id="name"
					value={name}
				/>
				<Input
					type="text"
					placeholder="Product_Image"
					className="mx-3"
					onChange={handleInput}
					id="image"
					value={image}
				/>
				<Input
					type="number"
					placeholder="Product_Category_ID"
					onChange={handleInput}
					id="category"
					value={category}
				/>
				<Input
					type="number"
					placeholder="Product_Price"
					className="mx-3"
					onChange={handleInput}
					id="price"
					value={price}
				/>
				<Button onClick={handleAdd}>Add</Button>
			</div>
		);
	};
	const { name, image, category, price } = productInput;
	console.log(productInput);
	if (props.userID === 0) {
		return <Redirect to="/" />;
	}
	return (
		<div className="px-4 mt-5">
			<center>
				<div className="d-flex rounded-box align-items-center mb-5">
					<h5>Would like to add new products? Click Here!</h5>
					<AddProductModal
						input={inputs()}
						buttonLabel="Add Product"
						className="modal-style"
					/>
				</div>
			</center>
			<div>
				<center>
					<h1 style={{ textDecoration: "underline" }}>Manage Data</h1>
				</center>
				<Table dark>
					<thead style={{ textAlign: "center" }}>
						<tr>
							<th>#</th>
							<th>Product_Name</th>
							<th>Product_Image</th>
							<th>Product_Category_ID</th>
							<th>Product_Price</th>
							<th colSpan="2">Actions</th>
						</tr>
					</thead>
					<tbody style={{ textAlign: "center" }}>{renderProduct()}</tbody>
				</Table>
			</div>
		</div>
	);
}
const mapStateToProps = ({ product, user }) => {
	return {
		userID: user.id,
		productList: product.productList,
	};
};

export default connect(mapStateToProps, {
	addProductAction,
	fetchProductsAction,
})(ManageData);
