import {
	API_PRODUCT_FAILED,
	API_PRODUCT_START,
	API_PRODUCT_SUCCESS,
} from "../types/productType";

const INITIAL_STATE = {
	productList: [],
	loading: false,
	error: "",
};

export const productReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_PRODUCT_START:
			return {
				...state,
				loading: true,
			};
		case "FETCH_PRODUCTS":
			return {
				...state,
				productList: action.payload,
			};
		case API_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case API_PRODUCT_FAILED:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
