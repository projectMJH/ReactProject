import {FETCH_FOOD_LIST} from "../actions/types"
// Map => {}, VO|Entity => {}, list => {}

const foodState = {
  food_list: {},
  find_list: {},
  food_detail: {}
}
/*
    1. types.js => 구분 (내부 프로토콜)
        export const FETCH_BOARD_LIST='FETCH_BOARD_LIST'
    2. action 함수
        export const fetchBoardList=>()=>dispatch=>{
          axios...
          fetch...

          const action={
            type: FETCH_BOARD_LIST,
            data: res_data
          }
          // reducer에 값을 전송
          dispatch(action)
        }

        => 종류별로 처리
           types는 동시 처리
           actions는 따로 처리
           reducer는 따로 처리
 */
export default function(state=foodState, action){
  switch(action.type){
    case FETCH_FOOD_LIST:
      return {
        ...state,
        food_list: action.payload
      }
    default:
      return state
  }
}