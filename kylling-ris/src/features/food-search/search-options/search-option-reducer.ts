import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showGluten: true,
    showMilk: true,
    showSoya: true
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
    },
})

export const {toggleGluten, toggleMilk, toggleSoya} = searchOptionSlice.actions

export default searchOptionSlice.reducer