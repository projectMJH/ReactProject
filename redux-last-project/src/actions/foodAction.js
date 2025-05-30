import {FETCH_FOOD_LIST,FETCH_FOOD_FIND,FETCH_FOOD_DETAIL} from './types'
import axios from "axios";
/*
    1. 구분자 생성 : types.js
    2. 데이터 처리 함수 : foodActions
       export const fetchFoodList = (page) => dispatch => {
          axios / fetch
       }
       => reducer 로 전송
          dispatch({
            type: types.js 에 등록된 상수
            payload: res.data
          })
    3. reducer 에서 처리
       = 저장할 변수 설정
       const foodState = {
        food_list: {},
        find_list: {},
        food_detail: {}
       }

       dispatch에서 호출
       export default function(state=foodState, action){
      
       }
      
       reducers/index.js에서
       export default combineReducers({
        mains: mainReducer,
        foods: foodReducer
       })

    4. store 에 저장 (한개만 사용이 가능)
      => 모든 데이터 첨부 reducer:rootReducer
    5. store에 있는 데이터를 읽어서 화면에 출력
      useSelector() => react에서 출력
      
      *** 데이터 관리 / 화면 출력
           dispatch           dispatch              dispatch
    React ---------- Action ------------ Reducer ------------- Store
      |                                                          |
      ------------------------------------------------------------
                                  | 데이터를 읽기
     JSP                       Controller                      Model

 */
export const fetchFoodList = (page) => dispatch => {
  axios.get('http://localhost/food/list_react',{
    params: {
      page: page
    }
  }).then((response) => {
    const action={
      type:'FETCH_FOOD_LIST',
      payload:response.data
    }
    dispatch(action)
  })
}

export const fetchFoodDetail = (fno) => dispatch => {
  axios.get('http://localhost/food/detail_react',{
    params: {
      fno: fno
    }
  }).then((response) => {
    const action={
      type:'FETCH_FOOD_DETAIL',
      payload:response.data
    }
    dispatch(action)
  })
}

export const fetchFoodFIND = (fd) => dispatch => {
  axios.get('http://localhost:3355/food/find',{
    params: {
      fd:fd
    }
  }).then((res) => {
    const action={
      type:'FETCH_FOOD_FIND',
      payload:res.data
    }
    dispatch(action)
  })
}