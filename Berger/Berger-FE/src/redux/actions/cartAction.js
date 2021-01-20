import axios from "axios";
import { api_url } from "../../helpers/api_url";

export const fetchCartByUserIdAction = (id) => {
	return (dispatch) => {
		axios
			.get(`${api_url}/cart?userID=${id}`)
			.then((res) => {
				console.log(res);
				dispatch({
					type: "FETCH_CART_BY_USERID",
					payload: res.data,
				});
			})
			.catch((err) => {
				console.log(err, "Looks like your cart is empty");
			});
	};
};
export const addToCartAction = (index) => {
	return (dispatch) => {
		axios.get(`${api_url}/products/${index}`).then((res) => {
			console.log(res.data);
			const id = localStorage.getItem("id");

			axios
				.post(`${api_url}/cart`, {
					name: res.data.name,
					image: res.data.image,
					category: res.data.category,
					price: res.data.price,
					userID: id,
				})
				.then((res) => {
					dispatch(fetchCartByUserIdAction(id));
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};
};
