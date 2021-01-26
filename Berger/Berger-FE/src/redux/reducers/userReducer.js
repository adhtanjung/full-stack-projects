const INTIAL_STATE = {
	id: 0,
	email: "",
	role_id: null,
	isverified: null,
	resetPassword: false,
};

export const userReducer = (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case "SIGNUP":
			return {
				...state,
				...action.payload,
			};
		case "LOGOUT":
			return {
				...INTIAL_STATE,
			};
		case "LOGIN":
			return {
				...state,
				...action.payload,
			};
		case "RESET_PASSWORD_START":
			return {
				...state,
				resetPassword: true,
			};
		case "RESET_PASSWORD_SUCCESS":
			return {
				...state,
				resetPassword: true,
			};
		default:
			return state;
	}
};
