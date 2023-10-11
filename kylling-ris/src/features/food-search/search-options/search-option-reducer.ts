import { createSlice } from "@reduxjs/toolkit";

//allergens are the filtered away allergens.
export interface SearchOption {
  allergens: string[];
  sortOption: string;
}

const initialState: SearchOption = {
  allergens: JSON.parse(localStorage.getItem("allergens") ?? "[]"),
  sortOption: JSON.parse(localStorage.getItem("sort") ?? "[]")
};

const searchOptionSlice = createSlice({
  name: "searchOption",
  initialState,
  reducers: {
    setAllergens: (state, action) => {
      state.allergens = action.payload;
      localStorage.setItem("allergens", JSON.stringify(action.payload));
    },
    changeSort: (state, action) => {
      state.sortOption = action.payload;
      localStorage.setItem("sort", JSON.stringify(action.payload));
    }
  }
});

export const { setAllergens, changeSort } = searchOptionSlice.actions;

export default searchOptionSlice.reducer;
