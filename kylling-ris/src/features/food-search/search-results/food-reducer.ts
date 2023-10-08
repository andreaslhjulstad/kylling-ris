import { createSlice } from "@reduxjs/toolkit";
import Food from "./food";
import mockData from "./mock-data.json";

interface FoodState {
  foods: Food[];  // Array for mock data
  savedFoods: Food[]; // Array for food added by user
}

const initialState: FoodState = {
  foods: JSON.parse(JSON.stringify(mockData)),
  savedFoods: []
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addFoodElement: (state, action) => {
      state.savedFoods.push(action.payload)
    }
  }
});

export const { addFoodElement } = foodSlice.actions
export default foodSlice.reducer;
