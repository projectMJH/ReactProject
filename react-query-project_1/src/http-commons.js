// 공통모듈
import axios from "axios";
// => PathVariable => /food/list/1
export default axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json",
  }
})