import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    clearFeed: () => {
      return [];
    },
    removeCardFromFeed: (state, action) => {
        const cardId = action.payload;
        const newState = state.filter(card => {
            return card._id !== cardId;
        });
        return newState;
    },
  },
});

export const { addFeed, clearFeed, removeCardFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
