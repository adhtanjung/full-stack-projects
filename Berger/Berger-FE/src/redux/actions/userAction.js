import axios from "axios";
import { api_url } from "../../helpers/api_url";
import swal from "sweetalert";

export const signupAction = (data) => {
	return (dispatch) => {
		axios
			.post(`${api_url}/users`, { email: data.email, password: data.password })
			.then((res) => {
				console.log(res.data);
				dispatch({
					type: "SIGNUP",
					payload: res.data,
				});
				localStorage.setItem("id", res.data.id);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
export const loginAction = (data) => {
	return (dispatch) => {
		console.log(data.email);
		axios
			.get(`${api_url}/users?email=${data.email}&password=${data.password}`)
			.then((res) => {
				console.log(res.data);
				if (res.data.length === 1) {
					dispatch({
						type: "LOGIN",
						payload: res.data[0],
					});
					localStorage.setItem("id", res.data[0].id);
				} else {
					alert("invalid data");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
export const logoutAction = () => {
	return {
		type: "LOGOUT",
	};
};
export const keepLoginAction = (id) => {
	return (dispatch) => {
		axios
			.get(`${api_url}/users/${id}`)
			.then((res) => {
				dispatch({
					type: "LOGIN",
					payload: res.data,
				});
			})
			.catch((err) => {});
	};
};
export const changeUserEmailAction = (email, id) => {
	return (dispatch) => {
		axios
			.get(`${api_url}/users?email=${email}`)
			.then((res) => {
				if (res.data.length > 0) {
					swal({
						title: "oops email has already taken",
						icon: "warning",
					});
				} else {
					axios
						.patch(`${api_url}/users/${id}`, { email: email })
						.then((res) => {
							dispatch({
								type: "LOGIN",
								payload: res.data,
							});
							swal({
								title: "Email has changed.",
								icon: "success",
							});
							window.location.href = "/";
						})
						.catch((err) => {
							console.log(err);
						});
				}
			})
			.catch((err) => {});
	};
};
