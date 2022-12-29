import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("eubondUser")
	? JSON.parse(localStorage.getItem("eubondUser"))
	: null;

const initialState = {
	user: savedUser ? savedUser : null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		SET_USER(state, action) {
			localStorage.setItem("eubondUser", JSON.stringify(action.payload));

			state.user = action.payload;
		},

		LOGOUT_USER(state, action) {
			localStorage.removeItem("eubondUser");
			state.user = null;
		},
	},
});

export const { SET_USER, LOGOUT_USER } = authSlice.actions;

export default authSlice.reducer;
