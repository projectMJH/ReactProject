const express=require('express');
const app = express();

// 0~65535 => 0~1023 사용중 => 1024 => port 허용
app.all('*', function(req, res, next)
{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
// 서버 대기중
const server=app.listen(3355,() =>{
  console.log(`Server started on http://localhost:3355`);
});

const oracledb=require('oracledb');
oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT

app.get('/food/find',function (req,res){
  busanFoodFind(req,res);
})
// http://localhost:3355/food/find?fd=맛집
async function busanFoodFind(request, response){
  // 검색어 받기
  let fd=request.query.fd;  // request.getParameter("fd")
  let connection
  try {
    // 오라클 연동
    connection=await oracledb.getConnection({
      username: "hr",
      password: "happy",
      connectionString: "localhost:1521/xe"
    })
    // sql 문장을 전송 => 결과값 받기
    const result=await connection.execute(
      `SELECT fno,poster,name,score,type,hit,jjimcount,likecount
       FROM busan_food
       WHERE name LIKE '%'||:name||'%'`,
       [fd]
    );
    console.log(result);
    response.json(result.rows);
  }catch(err){
    console.log(err);
  }
  finally{
    try{
      if(connection){
        connection.close();
      }
    }catch(err){}
  }
}

// 부산 명소
app.get('/info/find',(req,res)=>{
  busanInfoFind(req,res);
})

async function busanInfoFind(request, response){
  // 검색어 받기
  let fd=request.query.fd;  // request.getParameter("fd")
  let connection
  try {
    // 오라클 연동
    connection=await oracledb.getConnection({
      username: "hr",
      password: "happy",
      connectionString: "localhost:1521/xe"
    })
    // sql 문장을 전송 => 결과값 받기
    const result=await connection.execute(
      `SELECT no,title,poster
       FROM busan_info
       WHERE title LIKE '%'||:title||'%'`,
      [fd]
    );
    console.log(result);
    response.json(result.rows);
  }catch(err){
    console.log(err);
  }
  finally{
    try{
      if(connection){
        connection.close();
      }
    }catch(err){}
  }
}

// 부산 = 뉴스 읽기
var client_id = 'GZc84b3o536QflrTcQpN';
var client_secret = 'GHnbTXM_py';
app.get('/news/list', function (req, res) {
  var api_url = 'https://openapi.naver.com/v1/search/news.json?display=100&query=' + encodeURI(req.query.query); // JSON 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
  var request = require('request');
  var options = {
    url: api_url,
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});
