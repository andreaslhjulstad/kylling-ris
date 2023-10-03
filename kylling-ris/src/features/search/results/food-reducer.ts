import { createSlice } from "@reduxjs/toolkit";
import Food from "./food";
import mockData from "./mock-data.json";

interface FoodState {
  foods: Food[];
}

const initialState: FoodState = {
  foods: JSON.parse(JSON.stringify(mockData))
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    // We can add reducers here later when we need them
  }
});

export default foodSlice.reducer;
