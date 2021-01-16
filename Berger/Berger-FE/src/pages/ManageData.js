import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Input, Table } from "reactstrap";
import AddProductModal from "../components/AddProductModal";
import {
	addProductAction,
	fetchProductsAction,
	deleteProductAction,
	editProductAction,
} from "../redux/actions";

let input = {
	name: "",
	image: "",
	category: 0,
	price: 0,
};
let input2 = {
	id: 0,
	name: "",
	image: "",
	category: 0,
	price: 0,
};
function ManageData(props) {
	const [productInput, setproductInput] = useState(input);
	const [productEditInput, setproductEditInput] = useState(input2);
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		props.fetchProductsAction();
	}, []);

	// RENDER PRODUCTS
	const renderProduct = () => {
		const { productList } = props;

		return productList.map((val, index) => {
			if (selected === index) {
				return (
					<tr>
						<td>
							<td>{val.id}</td>
						</td>
						<td>
							<Input
								type="text"
								onChange={handleEditInput}
								id="name"
								value={productEditInput.name}
							/>
						</td>
						<td>
							<Input
								type="text"
								onChange={handleEditInput}
								id="image"
								value={productEditInput.image}
							/>
						</td>
						<td>
							<Input
								type="text"
								onChange={handleEditInput}
								id="category"
								value={productEditInput.category}
							/>
						</td>
						<td>
							<Input
								type="text"
								onChange={handleEditInput}
								id="price"
								value={productEditInput.price}
							/>
						</td>

						<td>
							<Button onClick={() => handleConfirmEdit(val.id)}>Confirm</Button>
						</td>
						<td>
							<Button onClick={handleCancelEdit}>Cancel</Button>
						</td>
					</tr>
				);
			}

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
						<Button onClick={() => handleEdit(index, val)}>Edit</Button>
					</td>
					<td>
						<Button onClick={() => handleDelete(val.id)}>Delete</Button>
					</td>
				</tr>
			);
		});
	};

	// EDIT PRODUCT FUNCTIONS
	////////////////////////////
	////////////////////////////
	const handleEdit = (index, val) => {
		setSelected(index); //set selected product using product's index
		const { name, image, category, price } = val; // retrieve object keys and destructuring it
		setproductEditInput({
			//set value obtained from above
			name: name,
			image: image,
			category: category,
			price: price,
		});
	};
	const handleCancelEdit = () => {
		setSelected(null);
	};
	const handleConfirmEdit = (id) => {
		props.editProductAction(productEditInput, id); //value determined after you clicked edit button or,and value obtained from onchange function
		setSelected(null);
	};
	////////////////////////////
	////////////////////////////

	// DELETE PRODUCT FUNCTION
	////////////////////////////
	////////////////////////////
	const handleDelete = (id) => {
		props.deleteProductAction(id);
	};
	////////////////////////////
	////////////////////////////

	// HANDLE INPUT, ADD & EDIT
	////////////////////////////
	////////////////////////////
	const handleInput = (e) => {
		setproductInput({
			...productInput,
			[e.target.id]: e.target.value,
		});
	};
	const handleEditInput = (e) => {
		setproductEditInput({
			...productEditInput,
			[e.target.id]: e.target.value,
		});
	};
	////////////////////////////
	////////////////////////////

	// ADD FUNCTION
	////////////////////////////
	////////////////////////////
	const handleAdd = () => {
		props.addProductAction(productInput);
		setproductInput(input);
	};
	////////////////////////////
	////////////////////////////

	// CLEAR INPUT FIELD EVERYTIME YOU DECIDED TO CANCEL
	////////////////////////////
	////////////////////////////
	const handleClearInput = () => {
		setproductInput(input);
	};
	////////////////////////////
	////////////////////////////

	// INPUT FIELDS GIVEN AS A PROP >> ADD PRODUCT MODAL
	////////////////////////////
	////////////////////////////
	const inputs = () => {
		return (
			<div className="d-flex flex-column mb-3">
				<div>
					<h6>Product Name</h6>
					<Input
						type="text"
						placeholder="Product_Name"
						onChange={handleInput}
						id="name"
						value={name}
						className="input-style"
					/>
				</div>
				<div className="my-3">
					<h6>Product Image</h6>
					<Input
						type="text"
						placeholder="Product_Image"
						className="input-style"
						onChange={handleInput}
						id="image"
						value={image}
					/>
				</div>
				<div>
					<h6>Product CategoryID</h6>
					<Input
						type="number"
						placeholder="Product_Category_ID"
						onChange={handleInput}
						id="category"
						value={category}
						className="input-style"
					/>
				</div>

				<div className="my-3">
					<h6>Product Price</h6>
					<Input
						type="number"
						placeholder="Product_Price"
						className="input-style"
						onChange={handleInput}
						id="price"
						value={price}
					/>
				</div>
			</div>
		);
	};
	////////////////////////////
	////////////////////////////

	const { name, image, category, price } = productInput;
	if (props.userID === 0) {
		return <Redirect to="/" />;
	}
	return (
		<div className="px-4 mt-5">
			<center>
				<div className="d-flex rounded-box align-items-center mb-5">
					<h5>Would you like to add new products? Click Here!</h5>
					<AddProductModal
						input={inputs()}
						buttonLabel="Add Product"
						className="modal-style ml-2"
						handleAdd={handleAdd}
						clearInput={handleClearInput}
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
	deleteProductAction,
	editProductAction,
})(ManageData);
