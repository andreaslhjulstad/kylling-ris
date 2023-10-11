import { createSlice } from "@reduxjs/toolkit";
import FoodInfo from "./food-info";
import mockData from "./mock-data.json";

interface SearchState {
  foods: FoodInfo[];
}

const initialState: SearchState = {
  foods: JSON.parse(JSON.stringify(mockData))
};

const searchSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {}
});

export default searchSlice.reducer;
