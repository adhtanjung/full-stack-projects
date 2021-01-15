const INITIAL_STATE = {
	cartList: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "FETCH_CART_BY_USERID":
			return {
				...state,
				cartList: action.payload,
			};
		default:
			return state;
	}
};
