import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Food from "./food";
import mockData from "./mock-data.json";

interface FoodState {
  foods: Food[]; // Array for mock data
  currentDate: string; // currentently selected date, set to current date as default
  dateFoodMap: { [date: string]: Food[] }; // Map between dates and logged food
}

const initialState: FoodState = {
  foods: JSON.parse(JSON.stringify(mockData)),
  currentDate: new Date().toISOString().split("T")[0],
  dateFoodMap: {}
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    // Update date given user input
    updateDate: ({ currentDate }, action: PayloadAction<{ date: string }>) => {
      const { date } = action.payload;
      currentDate = date;
    },
    // Add food clicked on by user
    addFoodElement: (
      { currentDate, dateFoodMap },
      action: PayloadAction<{ food: Food; weight: number }>
    ) => {
      const date = currentDate;
      const { food, weight } = action.payload;

      // If the user has not set a custom weight, the default weight will be used
      let newWeight = food.weight;
      if (weight != food.weight && weight != 0) {
        newWeight = weight;
      }

      // Update protein and calorie values (rounded to 1 decimal), remains the same if no change in weight
      let newCalories = Number(
        Number(
          Math.round(((food.calories * newWeight) / food.weight) * 100) / 100
        ).toFixed(1)
      );
      let newProtein = Number(
        Number(
          Math.round(((food.protein * newWeight) / food.weight) * 100) / 100
        ).toFixed(1)
      );

      const foodWithWeight = {
        ...food,
        weight: newWeight,
        calories: newCalories,
        protein: newProtein
      };

      if (!dateFoodMap[date]) {
        dateFoodMap[date] = [];
      }
      dateFoodMap[date].push(foodWithWeight);
    },
    // Function for removing food selected by user. Takes in a food id and weight as payload
    removeFoodElement: (
      { currentDate, dateFoodMap },
      action: PayloadAction<{ id: number; weight: number }>
    ) => {
      const date = currentDate;
      if (dateFoodMap[date]) {
        // Finds a food object with the given ID and weight, and removes it
        const indexToRemove = dateFoodMap[date].findIndex(
          (food) =>
            food.id === action.payload.id &&
            food.weight === action.payload.weight
        );
        if (indexToRemove !== -1) {
          dateFoodMap[date].splice(indexToRemove, 1);
        }
      }
    }
  }
});
export const { addFoodElement, updateDate, removeFoodElement } =
  foodSlice.actions;
export default foodSlice.reducer;
