import axios from "axios";
export const fetchMainData=()=> dispatch => {
  axios.get("https://localhost/main/main_react").then(res=>{
    const action={
      type:'FETCH_MAIN_DATA',
      payload:res.data
    }
    console.log(res.data);
    dispatch(action);
  })
}