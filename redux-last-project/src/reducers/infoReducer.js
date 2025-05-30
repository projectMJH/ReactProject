import {FETCH_INFO_DETAIL,FETCH_INFO_LIST,FETCH_INFO_FIND} from "../actions/types";
// Map => {}, List => [], VO = {}
const infoState = {
  info_data: {},
  info_detail:{},
  info_find:[]
}
// infos.info_detail
// dispatch(action) => 자동 호출
// dispatch({type:찾기, payload:데이터}
// ... : 복제
/*
    데이터 변경, 추가에 대한 관리 => state
                                  |
                                React 화면을 갱신
 */
export default function(state = infoState, action) {
  console.log("reducer call"+action.payload);
  switch (action.type) {
    case FETCH_INFO_LIST:
      return {
        ...state,
        info_data: action.payload
      }
    case FETCH_INFO_DETAIL:
      return {
        ...state,
        info_detail: action.payload
      }
    case FETCH_INFO_FIND:
      return {
        ...state,
        info_find: action.payload
      }
    default:
      return state;
  }
};