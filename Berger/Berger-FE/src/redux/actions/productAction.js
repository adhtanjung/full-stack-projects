import axios from "axios";
import { api_url } from "../../helpers/api_url";
import {
	API_PRODUCT_FAILED,
	API_PRODUCT_START,
	API_PRODUCT_SUCCESS,
} from "../types/productType";

export const fetchProductsAction = () => {
	return async (dispatch) => {
		dispatch({
			type: API_PRODUCT_START,
		});
		try {
			const products = await axios.get(`${api_url}/products`);
			dispatch({
				type: "FETCH_PRODUCTS",
				payload: products.data,
			});
			dispatch({
				type: API_PRODUCT_SUCCESS,
			});
		} catch (err) {
			console.log(err);
			dispatch({
				type: API_PRODUCT_FAILED,
				payload: err,
			});
		}
	};
};
export const addProductAction = (data) => {
	return async (dispatch) => {
		try {
			let { name, image, category, price, file } = data;
			const value = JSON.stringify({ name, image, category, price });
			const formData = new FormData();

			formData.append("data", value);
			formData.append("image", file.image);

			const headers = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			await axios.post(`${api_url}/products`, formData, headers);
		} catch (err) {
			console.log(err, "error");
		}
		dispatch(fetchProductsAction());
	};
};

export const deleteProductAction = (id) => {
	return async (dispatch) => {
		try {
			await axios.delete(`${api_url}/products/${id}`);
		} catch (err) {
			console.log(err);
		}
		dispatch(fetchProductsAction());
	};
};

export const editProductAction = (data, index) => {
	return async (dispatch) => {
		try {
			const { id, name, category, price, file } = data;
			const value = JSON.stringify({ id, name, category, price });
			const formData = new FormData();
			formData.append("image", file.image);
			formData.append("data", value);

			const headers = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			await axios.patch(`${api_url}/products/${index}`, formData, headers);
		} catch (err) {
			console.log(err);
		}
		dispatch(fetchProductsAction());
	};
};
