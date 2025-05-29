import {combineReducers} from "redux";

// combineReducers : reduce 여러개를 모아서 한번에 저장
// action 등록 => action 함수 => reducer => index에 등록 => store 에 전송
/*
      types.js : 구분자
      actions => 타입별로 
 */
import mainReducer  from "./mainReducer";
import foodReducer  from "./foodReducer";
import youtubeReducer  from "./youtubeReducer";
import infoReducer  from "./infoReducer";
import boardReducer  from "./boardReducer";

// mains.main_data mains.main_detail => 변수 선택
export default combineReducers({
  mains: mainReducer,
  foods: foodReducer,
  youtubes: youtubeReducer,
  infos: infoReducer,
  boards: boardReducer
})