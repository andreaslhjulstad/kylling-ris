import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import FoodInfo from "../food-search/search-results/food-info";
import FoodItem, { foodItem } from "./food-item";

interface FoodLogState {
  selectedDate: string; // today's date selected by default
  foodLogs: { [date: string]: FoodItem[] };
  selectedFoodLog: FoodItem[];
}

const getFoodLogsFromLocalStorage = (): { [date: string]: FoodItem[] } =>
  JSON.parse(localStorage.getItem("foodLogs") ?? "{}");

function setFoodLogsInLocalStorage(foodLogs: { [date: string]: FoodItem[] }) {
  localStorage.setItem("foodLogs", JSON.stringify(foodLogs));
}

const dateToday = () => new Date().toISOString().split("T")[0];
const initialState: FoodLogState = {
  selectedDate: dateToday(),
  foodLogs: getFoodLogsFromLocalStorage(),
  selectedFoodLog: getFoodLogsFromLocalStorage()[dateToday()] ?? []
};

const logSlice = createSlice({
  name: "foodLog",
  initialState,
  reducers: {
    selectDate: (state, action: PayloadAction<{ date: string }>) => {
      const { date } = action.payload;
      return {
        ...state,
        selectedDate: date,
        selectedFoodLog: state.foodLogs[date] ?? []
      };
    },

    addFood: (
      state,
      action: PayloadAction<{ foodInfo: FoodInfo; weight: number }>
    ) => {
      const { foodInfo, weight } = action.payload;
      const { selectedDate, foodLogs, selectedFoodLog } = state;

      //Temporary - server will later assign id.
      const largestId: number = selectedFoodLog.reduce(
        (largest, { id }) => Math.max(id, largest),
        0
      );

      const newFoodItem: FoodItem | null = foodItem(
        foodInfo,
        weight,
        largestId + 1
      );
      if (newFoodItem === null) return state;

      const newSelectedFoodLog = [...selectedFoodLog, newFoodItem];
      const newFoodLogs = { ...foodLogs, [selectedDate]: newSelectedFoodLog };
      setFoodLogsInLocalStorage(newFoodLogs);

      return {
        ...state,
        foodLogs: newFoodLogs,
        selectedFoodLog: newSelectedFoodLog
      };
    },

    removeFood: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const { selectedDate, selectedFoodLog, foodLogs } = state;

      const newSelectedFoodLog = selectedFoodLog.filter(
        (food) => food.id !== id
      );
      const newFoodLogs = {
        ...foodLogs,
        [selectedDate]: newSelectedFoodLog
      };
      setFoodLogsInLocalStorage(newFoodLogs);
      return {
        ...state,
        foodLogs: newFoodLogs,
        selectedFoodLog: newSelectedFoodLog
      };
    }
  }
});

export const { addFood, selectDate, removeFood } = logSlice.actions;
export default logSlice.reducer;
