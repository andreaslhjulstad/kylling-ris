import { combineReducers } from "redux";
import foodLogReducer from "../features/food-log/food-log-reducer";
import searchOptionReducer from "../features/food-search/search-options/search-option-reducer";
import currentUserReducer from "../pages/loginpage/current-user-reducer";

const rootReducer = combineReducers({
  foodLog: foodLogReducer,
  searchOption: searchOptionReducer,
  user: currentUserReducer
});

export default rootReducer;
