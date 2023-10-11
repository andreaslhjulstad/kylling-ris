import { combineReducers } from "redux";
import searchReducer from "../features/food-search/search-results/search-reducer";
import logReducer from "../features/food-log/log-reducer";
import searchOptionReducer from "../features/food-search/search-options/search-option-reducer";

const rootReducer = combineReducers({
  search: searchReducer,
  log: logReducer,
  searchOption: searchOptionReducer,
});

export default rootReducer;