import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	likes: [],
	dislikes: [],
};

export const navSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLikes: (state, action) => {
			state.likes = action.payload;
		},
		setDislikes: (state, action) => {
			state.dislikes = action.payload;
		},
	},
});

export const { setUser, setLikes, setDislikes } = navSlice.actions;

// Selectors

export const selectUser = (state) => state.nav.user;
export const selectLikes = (state) => state.nav.likes;
export const selectDislikes = (state) => state.nav.dislikes;

export default navSlice.reducer;
