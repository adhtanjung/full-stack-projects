const INTIAL_STATE = {
	id: 0,
	email: "",
};

export const userReducer = (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case "SIGNUP":
			return {
				...state,
				id: action.payload.id,
				email: action.payload.email,
			};
		case "LOGOUT":
			return {
				...INTIAL_STATE,
			};
		case "LOGIN":
			return {
				...state,
				id: action.payload.id,
				email: action.payload.email,
			};
		default:
			return state;
	}
};
