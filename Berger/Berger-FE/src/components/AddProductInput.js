import React from "react";
import { Input, CustomInput, Label } from "reactstrap";

function AddProductInput(props) {
	const { handleInput, productInput, handleFileInput } = props;
	const inputs = () => {
		return (
			<div className="d-flex flex-column mb-3">
				<div>
					<Label>Product Name</Label>
					<Input
						type="text"
						placeholder="Product_Name"
						onChange={handleInput}
						id="name"
						value={productInput.name}
						className="input-style"
					/>
				</div>
				{/* <div className="my-3">
					<Label>Product Image</Label> */}
				{/* <Input
						type="text"
						placeholder="Product_Image"
						className="input-style"
						onChange={handleInput}
						id="image"
						value={productInput.image}
					/> */}
				{/* </div> */}
				<div>
					<Label>Product CategoryID</Label>
					<Input
						type="number"
						placeholder="Product_Category_ID"
						onChange={handleInput}
						id="category"
						value={productInput.category}
						className="input-style"
					/>
				</div>

				<div className="my-3">
					<Label>Product Price</Label>
					<Input
						type="number"
						placeholder="Product_Price"
						className="input-style"
						onChange={handleInput}
						id="price"
						value={productInput.price}
					/>
				</div>
				<div className="my-3">
					<Label>Image</Label>
					<CustomInput
						type="file"
						label={productInput.file.label}
						onChange={handleFileInput}
						id="addFile"
					/>
				</div>
			</div>
		);
	};
	return <>{inputs()}</>;
}

export default AddProductInput;
