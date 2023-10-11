import { createSlice } from "@reduxjs/toolkit";
import Food from "./food";
import mockData from "./mock-data.json";

interface SearchState {
  foods: Food[]; // Array for mock data
}

const initialState: SearchState = {
  foods: JSON.parse(JSON.stringify(mockData))
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
  }
});

export default searchSlice.reducer;
