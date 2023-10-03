import { combineReducers } from "redux";
import foodReducer from "../features/food-search/search-results/food-reducer";

const rootReducer = combineReducers({
  food: foodReducer
});

export default rootReducer;
