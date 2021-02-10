import { API_USER_FAILED, API_USER_SUCCESS, API_USER_START } from "../types";

const INTIAL_STATE = {
	id: 0,
	email: "",
	role_id: null,
	isverified: null,
	resetPassword: false,
	error: "",
	loading: false,
	isLoggedInWithGoogle: null,
};

export const userReducer = (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case API_USER_START:
			return {
				...state,
				loading: true,
			};
		case API_USER_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case API_USER_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
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
