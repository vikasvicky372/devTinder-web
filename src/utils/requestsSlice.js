import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        },
        clearRequests: () => {
            return [];
        },
        removeRequest: (state, action) => {
            const requestId = action.payload;
            let newArray = [...state];
            return newArray.filter((request) => {
                return request._id !== requestId;
            });
        },
    },
});

export const { addRequests, clearRequests, removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;