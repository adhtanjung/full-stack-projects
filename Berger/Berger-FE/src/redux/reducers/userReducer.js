const INTIAL_STATE = {
	id: 0,
	email: "",
	role_id: null,
	isverified: null,
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
		default:
			return state;
	}
};
