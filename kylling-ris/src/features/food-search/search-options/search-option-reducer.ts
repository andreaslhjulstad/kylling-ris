import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showGluten: true,
    showMilk: true,
    showSoya: true,
    sortOption: "name-ascending"
}

const searchOptionSlice = createSlice({
    name: "searchOption",
    initialState,
    reducers:{
        toggleGluten:(state) => {
            state.showGluten = !state.showGluten
        },
        toggleMilk:(state) => {
            state.showMilk = !state.showMilk
        },
        toggleSoya:(state) => {
            state.showSoya = !state.showSoya
        },
        changeSort: (state, action) => {
            state.sortOption = action.payload;
        }
    },
})

export const {toggleGluten, toggleMilk, toggleSoya, changeSort} = searchOptionSlice.actions

export default searchOptionSlice.reducer