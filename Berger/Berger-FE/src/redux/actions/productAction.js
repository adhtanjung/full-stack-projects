import axios from "axios";
import { api_url } from "../../helpers/api_url";

export const fetchProductsAction = () => {
	return (dispatch) => {
		axios
			.get(`${api_url}/products`)
			.then((res) => {
				dispatch({
					type: "FETCH_PRODUCTS",
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
export const addProductAction = (data) => {
	return async (dispatch) => {
		try {
			await axios.post(`${api_url}/products`, data);
		} catch (err) {
			console.log(err);
		}
		dispatch(fetchProductsAction());
	};
};
