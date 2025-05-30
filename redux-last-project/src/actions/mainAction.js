// Controller 저장 => 메서드 => 구분해서 처리
// MainController
/*
    Action : 데이터 읽기/쓰기 (CRUD) => 서버연결
    1) 어떤 기능이 있는지 설계
      types.js
      export const AA='AA' => 내부 프로토콜
      => public final static int LOGIN=100
    2) Reducer : 데이터를 어떤 변수에 저장해 둘지 설정
          | 자동으로 store에 전송
    3) component는 store에 있는 데이터를 읽어서 출력

    실행 순서
                      요청
    React(USER 화면) ========================
                                연결 (Controller)
    component단위     dispatch(action함수호출)  ====== Reducer ====== store
    ---------------                                                   |
                                                                 React에서 읽기
                                                                 Model : 데이터 관리
                                                                 VO, DAO, 전송
      View (JSP)

   JSP => 오라클 연동
   ----------------

      HTML+JAVA
      ---------
      분리
      HTML (View) => React
          => 연결 (Contoller) Action+Reducer
      JAVA (Model) => Store

      React / Vue
        |      |
 MVC  Redux   Vuex
      -----   ----
              Pinia
      Mobx/Saga
      -------------
      | 통합 : TanStack-Query
              -------------- Next / Nuxt
   => JQuery : 4,5 출시

 */
// idspatch(fetchMainData())
import axios from "axios";
export const fetchMainData = ()=> dispatch => {
  // 서버에서 데이터를 읽어서 => reducer로 전송
  axios.get("http://localhost/main_react").then(res=>{
    const action={
      type:'FETCH_MAIN_DATA',
      payload:res.data
    }
    console.log(res.data);
    dispatch(action); // reducer로 전송
  })
}

export const fetchNewsData = (fd)=> dispatch => {
  axios.get("http://localhost:3355/news/list",{
    params:{
      query:fd
    }
  }).then(res=>{
    const action={
      type:'FETCH_NEWS_LIST',
      payload:res.data
    }
    dispatch(action);
  })
}