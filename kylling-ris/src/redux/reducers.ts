import { combineReducers } from "redux";
import searchReducer from "../features/food-search/search-results/search-reducer";
import logReducer from "../features/food-log/log-reducer";

const rootReducer = combineReducers({
  search: searchReducer,
  log: logReducer
});

export default rootReducer;