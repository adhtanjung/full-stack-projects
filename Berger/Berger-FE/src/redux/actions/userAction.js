import axios from "axios";
import { api_url } from "../../helpers/api_url";
import swal from "sweetalert";
import SHA256 from "crypto-js/sha256";

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
	return async (dispatch) => {
		console.log(email);
		try {
			const users = await axios.get(`${api_url}/users?email=${email}`);
			console.log(users);
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
				// setTimeout(() => {

				// }, 2000);
			}
		} catch (err) {
			console.log(err);
		}
		// axios
		// 	.get(`${api_url}/users?email=${email}`)
		// 	.then((res) => {
		// 		if (res.data.length > 0) {
		// 			swal({
		// 				title: "oops email has already taken",
		// 				icon: "warning",
		// 			});
		// 		} else {
		// 			axios
		// 				.patch(`${api_url}/users/${id}`, { email: email })
		// 				.then((res) => {
		// 					dispatch({
		// 						type: "LOGIN",
		// 						payload: res.data,
		// 					});
		// 					swal({
		// 						title:
		// 							"Email has changed. You'll be redirected to home in 2 seconds",
		// 						icon: "success",
		// 					});
		// 					setTimeout(() => {
		// 						window.location.href = "/";
		// 					}, 2000);
		// 				})
		// 				.catch((err) => {
		// 					console.log(err);
		// 				});
		// 		}
		// 	})
		// 	.catch((err) => {});
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
