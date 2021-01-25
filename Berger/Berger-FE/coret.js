// let loginInfo = {
// 	email: "",
// 	password: "",
// };
// loginInfo.password = "asd123";
// console.log(loginInfo);
const a = () => {
	return (dispatch) => {
		dispatch({
			type: "LOGOUT",
		});
	};
};
a();
