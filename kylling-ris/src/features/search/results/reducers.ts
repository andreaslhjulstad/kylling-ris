import { combineReducers } from "redux";
import foodReducer from "./food-slice";

const rootReducer = combineReducers({
  food: foodReducer
});

export default rootReducer;
