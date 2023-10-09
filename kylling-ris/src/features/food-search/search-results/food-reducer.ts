import { createSlice } from "@reduxjs/toolkit";
import Food from "./food";
import mockData from "./mock-data.json";

interface FoodState {
  foods: Food[];  // Array for mock data
  currentDate: string;  // currentently selected date, set to current date as default
  dateFoodMap: { [date: string]: Food[] };  // Map between dates and logged food
}

const initialState: FoodState = {
  foods: JSON.parse(JSON.stringify(mockData)),
  currentDate: new Date().toISOString().split('T')[0], 
  dateFoodMap: {}
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    // Update date given user input
    updateDate: (state, action) => {
      state.currentDate = action.payload;
    },
    // Add food clicked on by user
    addFoodElement: (state, action) => {
      const date = state.currentDate;
      const { food, weight } = action.payload;

      // If the user has not set a custom weight, the default weight will be used
      let newWeight = 0;
      if (weight == 0 || weight == null) {
        newWeight = food.default_weight;
      }
      else {
        newWeight = weight;
      }
    
      const foodWithWeight = {
        ...food,
        weight: newWeight
      };
    
      if (!state.dateFoodMap[date]) {
        state.dateFoodMap[date] = [];
      }
      state.dateFoodMap[date].push(foodWithWeight);
    },
    // Function for removing food selected by user. Takes in a food id and weight as payload
    removeFoodElement: (state, action) => {
      const date = state.currentDate;
      if (state.dateFoodMap[date]) {
        // Finds a food object with the given ID and weight, and removes it
        const indexToRemove = state.dateFoodMap[date].findIndex(food => food.id === action.payload.id && food.weight === action.payload.weight);
        if (indexToRemove !== -1) {
          state.dateFoodMap[date].splice(indexToRemove, 1);
        }
      }
      
    }
  }
});

export const { addFoodElement, updateDate, removeFoodElement } = foodSlice.actions
export default foodSlice.reducer;
