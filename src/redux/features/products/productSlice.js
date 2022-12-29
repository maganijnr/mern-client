import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	product: null,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		GET_ALL_PRODUCTS(state, action) {
			state.products = action.payload;
		},
		GET_SINGLE_PRODUCT(state, action) {
			state.product = action.payload;
		},
	},
});

export const { GET_ALL_PRODUCTS, GET_SINGLE_PRODUCT } = productsSlice.actions;

export default productsSlice.reducer;
