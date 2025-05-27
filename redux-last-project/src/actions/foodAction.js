import {FETCH_FOOD_LIST,FETCH_FOOD_FIND,FETCH_FOOD_DETAIL} from './types'
import axios from "axios";

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