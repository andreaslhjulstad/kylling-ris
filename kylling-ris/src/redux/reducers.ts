import { combineReducers } from "redux";
import foodReducer from "../features/search/results/food-reducer";

const rootReducer = combineReducers({
  food: foodReducer
});

export default rootReducer;
