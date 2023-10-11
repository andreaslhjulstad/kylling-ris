import { combineReducers } from "redux";
import foodLogReducer from "../features/food-log/food-log-reducer";
import searchOptionReducer from "../features/food-search/search-options/search-option-reducer";
import searchResultsReducer from "../features/food-search/search-results/search-results-reducer";

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
  foodLog: foodLogReducer,
  searchOption: searchOptionReducer
});

export default rootReducer;
