// 라이브러리 추가
// 서버 => 생성
const express = require('express');
const app = express();
// crossorigin
const cors = require('cors');
app.use(cors());
// 세부 설정
app.use(cors({
  origin: "*",
  method: ["GET","POST","PUT","DELETE"]
}))

// 서버 구동
const server=app.listen(3355,()=>{
  console.log("Server started on http://localhost:3355")
});

const oracledb=require('oracledb');
// import oracledb from 'oracledb'
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT
// 요청 받기
app.get('/recipe/find', (req,res)=>{
  recipeFind(req,res);
})
// 요청 처리 => req, 응답 처리 => res
// http://localhost:3355/recipe/find?fd=맛집
async function recipeFind(req,res){
  // 검색어 받기
  // String fd=request.getParameter("fd")
  let fd=req.query.fd||'간식';  // string
  let page=req.query.page||1;
  let rowSize=12
  let start=(parseInt(page)*rowSize)-(rowSize-1);
  let end=(parseInt(page)*rowSize);
  // 오라클 연동
  let connection;
  try {
    // getConnection() => 서버 연결
    connection=await oracledb.getConnection({
      username: "hr",
      password: "happy",
      connectionString: "localhost:1521/xe",
    });
    // SQL 문장 전송 => 결과값 받기 => COLUMN명 (키) => 대문자
    const result=await connection.execute(
      `SELECT no,poster,title,chef,hit,likecount,num
       FROM (SELECT no,poster,title,chef,hit,likecount,ROWNUM AS num
       FROM (SELECT no,poster,title,chef,hit,likecount
       FROM recipe WHERE title LIKE '%'||:1||'%'
       ORDER BY no ASC))
       WHERE num BETWEEN :2 AND :3`,
      [fd,start,end]
    );
    console.log(result);
    const result2=await connection.execute(
      `SELECT CEIL(COUNT(*)/12.0) as totalpage FROM recipe
            WHERE title LIKE '%'||:fd||'%' 
           `,
      [fd]
    )
    console.log(result2);
    const data={
      totalpage:result2.rows[0].TOTALPAGE,
      recipes:result.rows
    }
    res.json(data);
  }catch(err){
    console.log(err);
  }
  finally {
    try{
      if(connection){
        await connection.close();
      }
    }catch(err){}
  }
}
