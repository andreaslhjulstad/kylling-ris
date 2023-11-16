import { combineReducers } from "redux";
import foodLogReducer from "../features/food-log/food-log-reducer";
import searchOptionReducer from "../features/food-search/search-options/search-option-reducer";

const rootReducer = combineReducers({
  foodLog: foodLogReducer,
  searchOption: searchOptionReducer
});

export default rootReducer;
