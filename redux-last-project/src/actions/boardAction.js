import {BOARD_LIST,BOARD_INSERT,BOARD_DELETE,BOARD_UPDATE,
  BOARD_DETAIL,BOARD_UPDATE_OK,RESET} from "./types";
import axios from "axios";

/*
    React : 화면 구현 => View 기능만 수행
          |
        dispatch(boardList(1)) => 사용자 요청

        => action 함수에서 처리
                 |
              reducer
                 | state에 저장
                   -----------
                      | store에 저장 => 공통데이터를 모아서 관리
                            |
                          모든 react에서 사용이 가능
                                | 필요한 데이터만 사용
                                  useSelector()
                      | store를 사용하는 목적
                        => 단방향 통신

    Redux : 사용이 복잡 => 분석이 어렵다
            분업화 => 데이터 관리 / 화면 출력
            재사용이 좋다
            ----------------------------- + 사용 편리
            | react-query
              ----------- 사용이 많다 => facebook 에서 open source 그룹으로 관리
              => tanStack-query : typescript
            | Front의 단점 : 버전이 변경에 따른 호환성이 없다
            | Back-End :
            | vo => recoil
            | jobKorea, 사람인 => 80% react, aws

            ?page=1 => params
            /1 =>
 */
export const boardList = (page) => dispatch => {
  axios.get(`http://localhost/board/list_react/${page}`)
  .then(res => {
    const action = {
      type: BOARD_LIST, // bload_list: []
      payload: res.data
    }
    dispatch(action);
    // reducer => 자동으로 모든 데이터를 store에 저장
  })
}

export const boardInsert = (insertData) => dispatch => {
  axios({
    method: 'POST',
    baseURL: 'http://localhost',
    url:'/board/insert_react',
    data: insertData,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    const action = {
      type: BOARD_INSERT,
      payload: res.data
    }
    dispatch(action);
  })
}
// detail
export const boardDetail = (no) => dispatch => {
  axios.get(`http://localhost/board/detail_react/${no}`)
  .then(res => {
    const action = {
      type: BOARD_DETAIL,
      payload: res.data
    }
    dispatch(action); // reducer
  })
}
// update-data
export const boardUpdate = (no) => dispatch => {
  axios.get(`http://localhost/board/update_react/${no}`)
  .then(res => {
    const action = {
      type: BOARD_UPDATE,
      payload: res.data
    }
    dispatch(action);
  })
}
// update
export const boardUpdateOk = (updateData) => dispatch => {
  axios({
    method: 'put',
    baseURL: 'http://localhost',
    url: `board/update_react_ok`,
    data:updateData,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    const action = {
      type: BOARD_UPDATE_OK,
      payload: res.data
    }
    dispatch(action);
  })
}
// delete
export const boardDelete = (no,pwd) => dispatch => {
  axios.delete(`http://localhost/board/delete_react/${no}/${pwd}`)
  .then(res => {
    const action = {
      type: BOARD_DELETE,
      payload: res.data
    }
    dispatch(action);
  })
}

export const boardReset=() => dispatch => {
  const action = {
    type: RESET,
    payload:{}
  }
  dispatch(action);
}