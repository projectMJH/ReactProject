import axios from "axios";

// 공통 모듈
export default axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'content-type': 'application/json'
  }
})