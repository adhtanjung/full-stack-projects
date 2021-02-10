import axios from "axios";
import { api_url } from "../../helpers/api_url";
import swal from "sweetalert";
import SHA256 from "crypto-js/sha256";
import {
	API_PRODUCT_SUCCESS,
	API_USER_FAILED,
	API_USER_START,
	API_USER_SUCCESS,
} from "../types";

export const signupAction = (data) => {
	return async (dispatch) => {
		dispatch({
			type: API_USER_START,
		});
		try {
			const res = await axios.get(
				`${api_url}/users/userdetail?email=${data.email}`
			);
			if (res.data.length === 0) {
				const response = await axios.post(`${api_url}/users/signup`, {
					email: data.email,
					password: data.password,
				});
				dispatch({
					type: "SIGNUP",
					payload: response.data,
				});
				dispatch({
					type: API_USER_SUCCESS,
				});
				localStorage.setItem("token", response.data.token);
			} else {
				dispatch({
					type: API_USER_FAILED,
					payload: "Email already taken",
				});
				swal({
					title: "Email already taken",
				});
			}
		} catch (err) {
			console.log(err);
			dispatch({
				type: API_USER_FAILED,
				payload: err,
			});
		}
	};
};
export const loginAction = (data) => {
	return async (dispatch) => {
		dispatch({
			type: API_USER_START,
		});
		try {
			const response = await axios.post(`${api_url}/users/login`, data);

			if (response.data.length === 0) {
				dispatch({
					type: API_USER_FAILED,
					payload: "User not found",
				});
				alert("User not found");
			} else {
				const { id, email, role_id, isverified, token } = response.data;
				localStorage.setItem("token", token);
				dispatch({
					type: "LOGIN",
					payload: { id, email, role_id, isverified },
				});
				dispatch({
					type: API_PRODUCT_SUCCESS,
				});
			}
		} catch (err) {
			dispatch({
				type: API_USER_FAILED,
				payload: err,
			});
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
		dispatch({
			type: API_USER_START,
		});
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
			dispatch({
				type: API_USER_SUCCESS,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const keepLoginGoogleAction = (token) => {
	return async (dispatch) => {
		console.log(token);
		try {
			dispatch(loginWithGoogleAction(token));
		} catch (err) {
			console.log(err);
		}
	};
};
export const changeUserEmailAction = (email, id) => {
	return async (dispatch) => {
		try {
			const users = await axios.get(
				`${api_url}/users/userdetail?email=${email}`
			);
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

export const userVerificationAction = (token) => {
	return async (dispatch) => {
		try {
			console.log(token);
			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const res = await axios.post(
				`${api_url}/users/verification`,
				{},
				headers
			);
			console.log(res.data);
			dispatch({
				type: "LOGIN",
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const resendEmailAction = (email, token) => {
	return async (dispatch) => {
		dispatch({
			type: API_USER_START,
		});
		try {
			await axios.post(`${api_url}/users/resend-email`, { email, token });
			dispatch({
				type: API_USER_SUCCESS,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const forgotPasswordAction = (email) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api_url}/users/forgot-password`, {
				email,
			});
			if (response.data.length === 0) {
				alert("Email not registered");
			}
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};
};

export const resetPasswordAction = (password, token) => {
	return async (dispatch) => {
		dispatch({
			type: "RESET_PASSWORD_START",
		});
		try {
			console.log(password);
			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios.post(`${api_url}/users/reset-password`, password, headers);
			// window.location.href("/");
			dispatch({
				type: "RESET_PASSWORD_SUCCESS",
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const loginWithGoogleAction = (token) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api_url}/users/google/login`, {
				token,
			});

			dispatch({
				type: "LOGIN",
				payload: response.data,
			});
			console.log(response.data);
			localStorage.setItem("token", response.data.token);
		} catch (err) {
			console.log(err);
		}
	};
};
