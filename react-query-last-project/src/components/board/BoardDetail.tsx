import {useParams,useNavigate,Link,useNavigationType} from "react-router";
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {useEffect,Fragment} from "react";

interface BoardDetailResponse {
  no:number;
  name:string;
  subject:string;
  content:string;
  dbday:string;
  hit:number;
}
// => function / return을 제거할 수 있다
function BoardDetail() {
  const {no} = useParams<{no:string}>();
  const nav=useNavigate();  // path: PUSH, -1: POP
  const {isLoading,isError,error,data,refetch:boardDetail}=useQuery<{data:BoardDetailResponse}>({
    queryKey:["board-detail",no],
    queryFn:async()=>apiClient.get(`/board/detail/${no}`)
  })

  const navType=useNavigationType();
  useEffect(()=>{
    if(navType!=='POP'){
      boardDetail()
    }
  },[])

  if(isLoading)
    return <h3>서버 데이터 전송 지연...</h3>
  if(isError)
    return <h3>서버 에러 발생:{`${error}`}</h3>

  const board=data?.data
  if(!board) return null;

  console.log(board)
  return (
    <Fragment>
      <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>내용 보기</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="archive-area section_padding_80">
        <div className="container">
          <div className="row">
            <table className="table">
              <tbody>
              <tr>
                <th className={"text-center"} style={{"width":"20%"}}>번호</th>
                <td className={"text-center"} style={{"width":"30%"}}>{board.no}</td>
                <th className={"text-center"} style={{"width":"20%"}}>작성일</th>
                <td className={"text-center"} style={{"width":"30%"}}>{board.dbday}</td>
              </tr>
              <tr>
                <th className={"text-center"} style={{"width":"20%"}}>이름</th>
                <td className={"text-center"} style={{"width":"30%"}}>{board.name}</td>
                <th className={"text-center"} style={{"width":"20%"}}>조회수</th>
                <td className={"text-center"} style={{"width":"30%"}}>{board.hit}</td>
              </tr>
              <tr>
                <th className={"text-center"} style={{"width":"20%"}}></th>
                <td colSpan={3}>{board.subject}</td>
              </tr>
              <tr>
                <td colSpan={4} className={"text-left"} valign={"top"}
                    height={"200"}>
                  <pre style={{"whiteSpace": "pre-wrap","border":"none"}}>{board.content}</pre>
                </td>
              </tr>
              <tr>
                <td colSpan={4} className={"text-right"}>
                  <Link to={"/board/update/"+board.no} className={"btn btn-xs btn-danger"}>수정</Link>
                  <Link to={"/board/delete/"+board.no} className={"btn btn-xs btn-primary"}>삭제</Link>
                  <Link to={"/board/list"} className={"btn btn-xs btn-success"}>목록</Link>
                </td>
              </tr>
              </tbody>
            </table>

          </div>
        </div>
      </section>
    </Fragment>
  )
}
export default BoardDetail;
