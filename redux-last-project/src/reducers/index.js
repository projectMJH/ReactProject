import {combineReducers} from "redux";

// combineReducers : reduce 여러개를 모아서 한번에 저장
import mainReducer  from "./mainReducer";
import foodReducer  from "./foodReducer";
// mains.main_data mains.main_detail => 변수 선택
export default combineReducers({
  mains: mainReducer,
  foods: foodReducer
})