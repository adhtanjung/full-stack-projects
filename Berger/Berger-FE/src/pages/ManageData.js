import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Table } from "reactstrap";
import AddProductModal from "../components/AddProductModal";
import {
	addProductAction,
	fetchProductsAction,
	deleteProductAction,
	editProductAction,
} from "../redux/actions";
import ManageDataProducts from "../components/ManageDataProducts";
import AddProductInput from "../components/AddProductInput";
import swal from "sweetalert";

let input = {
	name: "",
	category: null,
	price: null,
	file: { label: "Choose File", image: null },
};
let input2 = {
	id: 0,
	name: "",
	category: 0,
	price: 0,
	file: { label: "Choose File", image: undefined },
};
function ManageData(props) {
	const [productInput, setproductInput] = useState(input);
	const [productEditInput, setproductEditInput] = useState(input2);
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		props.fetchProductsAction();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// EDIT PRODUCT FUNCTIONS
	////////////////////////////
	////////////////////////////
	const handleEdit = (index, val) => {
		setSelected(index); //set selected product using product's index
		const { name, category, price } = val; // retrieve object keys and destructuring it
		setproductEditInput({
			//set value obtained from above
			name: name,
			category: category,
			price: price,
			file: input2.file,
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
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this file!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				props.deleteProductAction(id);
				swal("Poof! Your imaginary file has been deleted!", {
					icon: "success",
				});
			} else {
				swal("Your imaginary file is safe!");
			}
		});
	};
	////////////////////////////
	////////////////////////////

	// HANDLE INPUT >> ADD & EDIT
	////////////////////////////
	////////////////////////////
	const handleFileInput = (e) => {
		if (e.target.id === "addFile") {
			if (e.target.files) {
				setproductInput({
					...productInput,
					file: { label: e.target.files[0].name, image: e.target.files[0] },
				});
			}
		} else if (e.target.id === "editFile") {
			if (e.target.files) {
				setproductEditInput({
					...productEditInput,
					file: { label: e.target.files[0].name, image: e.target.files[0] },
				});
			}
		}
	};
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
		// ini dikosongin lagi statenya
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

	if (props.userID === 0) {
		return <Redirect to="/" />;
	}
	return (
		<div className="px-4 mt-5">
			<center>
				<div className="d-flex rounded-box align-items-center mb-5">
					<h5>Would you like to add new products? Click Here!</h5>
					<AddProductModal
						input={
							<AddProductInput
								handleInput={handleInput}
								productInput={productInput}
								handleFileInput={handleFileInput}
							/>
						}
						buttonLabel="Add Product"
						className="modal-style ml-2"
						handleAdd={handleAdd}
						clearInput={handleClearInput}
						handleFileInput={handleFileInput}
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
					<tbody style={{ textAlign: "center" }}>
						<ManageDataProducts
							productList={props.productList}
							selected={selected}
							handleEditInput={handleEditInput}
							productEditInput={productEditInput}
							handleConfirmEdit={handleConfirmEdit}
							handleCancelEdit={handleCancelEdit}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
							handleFileInput={handleFileInput}
						/>
					</tbody>
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
