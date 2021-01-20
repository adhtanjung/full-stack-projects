import React from "react";
import { Button, CustomInput, Input } from "reactstrap";
import { api_url } from "../helpers/api_url";

function ManageDataProducts(props) {
	const renderProduct = () => {
		const {
			productList,
			selected,
			handleEditInput,
			productEditInput,
			handleConfirmEdit,
			handleCancelEdit,
			handleEdit,
			handleDelete,
			handleFileInput,
		} = props;

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
							<CustomInput
								type="file"
								onChange={handleFileInput}
								id="editFile"
							/>
							{/* <Input
								type="text"
								onChange={handleEditInput}
								id="image"
								value={productEditInput.image}
							/> */}
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
						<img src={`${api_url}${val.image}`} alt="not found" width="70px" />
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
	return <>{renderProduct()}</>;
}

export default ManageDataProducts;
