import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cartItems: localStorage.getItem('cartItems') ? [...JSON.parse(localStorage.getItem('cartItems'))] : [],

	shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem('shippingInfo')): null,
	payment: localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem('paymentMethod')): null,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		CART_ADD_ITEM(state, action) {
			const item = action.payload

			const itemExist = state.cartItems.find((x) => x._id === item._id)

			if(!itemExist){
				localStorage.setItem('cartItems', JSON.stringify([...state.cartItems, item]))
				state.cartItems = [...state.cartItems, item]
			}
		},
		REMOVE_CART_ITEM(state, action){
			const itemId = action.payload

			const findItem = state.cartItems.find((x) => x._id === itemId)

			if(findItem){
				const newCartItems = state.cartItems.filter((x) => x._id !== itemId)
				state.cartItems = newCartItems
			}
		},
		SAVE_SHIPPING_INFO(state, action){
			if(!state.shippingInfo){
				localStorage.setItem("shippingInfo", JSON.stringify(action.payload))
			}
		},
		SAVE_PAYMENT_METHOD(state, action){
			if(!state.payment){
				localStorage.setItem("paymentMethod", JSON.stringify(action.payload))
			}
		}
		
	},
});

export const { CART_ADD_ITEM, REMOVE_CART_ITEM , SAVE_SHIPPING_INFO} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartState = (state) => state.cart