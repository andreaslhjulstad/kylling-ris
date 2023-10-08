import { combineReducers } from "redux";
import foodReducer from "../features/food-search/search-results/food-reducer";
import searchOptionReducer from "../features/food-search/search-options/search-option-reducer";

const rootReducer = combineReducers({
  food: foodReducer,
  searchOption: searchOptionReducer
});

export default rootReducer;
