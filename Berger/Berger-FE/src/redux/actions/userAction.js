import axios from "axios";
import { api_url } from "../../helpers/api_url";
import swal from "sweetalert";
import SHA256 from "crypto-js/sha256";

export const signupAction = (data) => {
	return (dispatch) => {
		axios
			.post(`${api_url}/users/signup`, {
				email: data.email,
				password: data.password,
			})
			.then((res) => {
				dispatch({
					type: "SIGNUP",
					payload: res.data,
				});
				localStorage.setItem("token", res.data.token);
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
export const loginAction = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api_url}/users/login`, data);

			const { id, email, role_id, isverified, token } = response.data;
			localStorage.setItem("token", token);
			dispatch({
				type: "LOGIN",
				payload: { id, email, role_id, isverified },
			});
		} catch (err) {
			console.log(err);
		}
	};
};
export const logoutAction = () => {
	return {
		type: "LOGOUT",
	};
};
export const keepLoginAction = (token) => {
	return async (dispatch) => {
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axios.post(`${api_url}/users/keep-login`, {}, headers);
			dispatch({
				type: "LOGIN",
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};
};
export const changeUserEmailAction = (email, id) => {
	return async (dispatch) => {
		try {
			const users = await axios.get(`${api_url}/users?email=${email}`);
			if (users.data.length > 0) {
				swal({
					title: "oops email has already taken",
					icon: "warning",
				});
			} else {
				const userspatch = await axios.patch(`${api_url}/users/${id}`, {
					email: email,
				});
				dispatch({
					type: "LOGIN",
					payload: userspatch.data,
				});
				swal({
					title: "Email has changed. You'll be redirected to home in 2 seconds",
					icon: "success",
					timer: 3000,
				}).then(() => {
					dispatch((window.location.href = "/"));
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const changerUserPasswordAction = (email, password) => {
	return async (dispatch) => {
		const { currentPassword, newPassword } = password;
		const encryptedCurrPassword = SHA256(currentPassword).toString();
		const encryptedNewPassword = SHA256(newPassword).toString();
		if (encryptedCurrPassword === encryptedNewPassword) {
			alert("You can use the same password!");
		} else {
			try {
				const res = await axios.get(
					`${api_url}/users?email=${email}&password=${encryptedCurrPassword}`
				);
				if (res.data.length === 0) {
					alert("incorrect password");
				} else if (res.data.length === 1) {
					const res2 = await axios.patch(`${api_url}/users/${res.data[0].id}`, {
						password: encryptedNewPassword,
					});

					dispatch({
						type: "LOGIN",
						payload: res2.data,
					});
					swal({
						title: "Your password has changed",
						text: "You'll be redirected to home shortly",
						icon: "success",
						timer: 3000,
					}).then(() => {
						window.location.href = "/";
					});
				}
			} catch (err) {}
		}
	};
};
