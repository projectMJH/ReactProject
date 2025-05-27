import {combineReducers} from "redux";
import foodReducer from "./foodReducer";
// import boardReducer from "./boardReducer";
export default combineReducers({
  foods:foodReducer
})
