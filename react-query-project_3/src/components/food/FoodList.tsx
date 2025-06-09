import {Link} from "react-router-dom";
import apiClient from "../../http-commons";
import {useState,useEffect} from "react";

interface Food{
  fno:number;
  name:string;
  poster:string;
}
interface FoodListResponse{
  list:Food[];
  curpage:number;
  totalpage:number;
  startPage:number;
  endPage:number;
}

// Cookie / Session => TypeScript
// JavaScript => 가독성

function FoodList(){
  return (
    <div className={"container"}>
      <div className={"row"}>
        <h3>Food List</h3>
      </div>
    </div>
  )
}
export default FoodList;