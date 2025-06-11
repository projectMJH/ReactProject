import {Fragment,useEffect,useRef,useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import apiClient from "../../http-commons";
import FoodMap from "./FoodMap";
import {AxiosError, AxiosResponse} from "axios";

// react / vue => 화면 UI (HTML)
// 서버로부터 데이터를 어떻게 받을까? => 속도
// 같은 값을 가지고 오는 경우 => 어떻게 처리 : cache => 키
// => class 형식 : function 형식 => 값을 유지할 수 있는 변수 => useState() => Hooks => 16 버전
/*
    하위 태그에 전송 => props (태그의 속성값)
    -------- 많은 경우에 => 전송이 많다 ------ store => redux => 단순한 프로그램 react-query

    웹사이트 개발
    ----------- spring / db => 나올 수 있는 모든 내용이
                -----------
 */
interface FoodDetailData {
  fno: number;
  hit: number;
  jjimcount: number;
  likecount: number;
  replycount: number;
  score: number;
  name: string;
  type: string;
  phone: string;
  address: string;
  theme: string;
  poster: string;
  images: string;
  time: string;
  parking: string;
  content: string;
  price: string;
  rdays: string;
}
interface CommentData{
  no: number;
  fno: number;
  id: string;
  name: string;
  msg: string;
  dbday: string;
}
interface FoodResponse {
  data: {
    foods:FoodDetailData,
    comments:CommentData[]
  };

}
function FoodDetail() {
  // FoodList에서 들어오는 값을 받는다
  const {fno}=useParams<{fno:string}>();
  const nav = useNavigate();
  const [msg, setMsg] = useState<string>("");
  const [no, setNo] = useState<number>(0);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const [toggle, setToggle] = useState<boolean>(true);
  ////// 수정
  const [umsg, setUmsg] = useState<string>("");
  const umsgRef=useRef<HTMLTextAreaElement>(null);
  // link:PUSH, back:POP
  /*
      let a=10
      a=""

      let a:number=10
   */
  // 서버 연결
  const {isLoading,isError,error,data,refetch:foodDetailData}=useQuery<FoodResponse,Error>({
    queryKey:['food-detail',fno],
    queryFn:async () => await apiClient.get(`/food/detail/${fno}`),
    enabled:!!fno // fno가 존재할 때만 실행
  })

  const {mutate:commentInsert} = useMutation<FoodResponse>({
    mutationFn: async () => {
      const res:AxiosResponse<FoodResponse,Error> = await apiClient.post(`/comment/insert`,
      {
        fno: fno,
        id: sessionStorage.getItem("id"),
        name: sessionStorage.getItem("name"),
        msg: msg
      })
      return res.data;
    },
    onSuccess:(data:FoodResponse) => {
      foodDetailData()
      if (msgRef.current) {
        msgRef.current.value = '';
      }
    },
    onError:(err:Error) => {
      console.log("comment Error:", err.message);
    }
  })

  // 삭제
  const {mutate:commentDelete}=useMutation<FoodResponse>({
    mutationFn: async () => {
      const res:AxiosResponse<FoodResponse,Error> = await apiClient.delete(`/comment/delete/${no}/${fno}`)
      return res.data;
    },
    onSuccess:(data:FoodResponse) => {
      foodDetailData()
    },
    onError:(err:Error) => {
      console.log("comment Error:", err.message);
    }
  })
  // 수정
  const {mutate:commentUpdate}=useMutation<FoodResponse>({
    mutationFn: async () => {
      const res:AxiosResponse<FoodResponse,Error> = await apiClient.put(`/comment/update`,{
        no:no,
        msg:msg
      })
      return res.data;
    },
    onSuccess:(data:FoodResponse) => {
      foodDetailData()
      if (msgRef.current) {
        msgRef.current.value = '';
      }
      setToggle(true)
    },
    onError:(err:Error) => {
      console.log("comment Error:", err.message);
    }
  })

  if(isLoading)
    return <h3 className={"text-center"}>Loading.....</h3>;
  if(isError)
    return <h3 className={"text-center"}>{error?.message}</h3>


  const food:FoodDetailData|undefined=data?.data.foods
  console.log(food);
  const comment:CommentData[]|undefined=data?.data.comments;
  console.log(comment);

  const insert=():void=>{
    if(msg==="")
    {
      msgRef.current?.focus();
      return;
    }
    commentInsert()
  }

  const del=(no:number):void=>{
    setNo(no);
    commentDelete()
  }

  const updateData=(no:number,index:number):void=>{
    if(msgRef.current && comment){
      msgRef.current.value = comment[index].msg;
    }
    setToggle(false);
    setNo(no);
    console.log(comment && comment[index].msg);
  }
  const update=():void=>{
    if(msg==="")
    {
      msgRef.current?.focus();
      return;
    }
    commentUpdate()
  }
  return (
  <Fragment>
    <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-12">
            <div className="bradcumb-title text-center">
              <h2>맛집 상세보기</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="archive-area section_padding_80">
      <div className="container">
        <div className="row">
          <table className={"table table-striped"}>
          <tbody>
          <tr>
            <td width={"35%"} rowSpan={8} className={"text-center"}>
              <img src={"https://www.menupan.com"+food?.poster} style={{"width":"320px","height":"430px"}} alt={""} />
            </td>
            <td colSpan={2}>
              <h3>{food?.name}&nbsp;<span style={{"color":"orange"}}>{food?.score}</span></h3>
            </td>
          </tr>
          <tr>
            <td width={"15%"} style={{"color":"gray"}}>주소</td>
            <td width={"50%"}>{food?.address}</td>
          </tr>
          <tr>
            <td width={"15%"} style={{"color":"gray"}}>전화</td>
            <td width={"50%"}>{food?.phone}</td>
          </tr>
          <tr>
            <td width={"15%"} style={{"color":"gray"}}>음식종류</td>
            <td width={"50%"}>{food?.type}</td>
          </tr>
          <tr>
            <td width={"15%"} style={{"color":"gray"}}>가격대</td>
            <td width={"50%"}>{food?.price}</td>
          </tr>
          <tr>
            <td width={"15%"} style={{"color":"gray"}}>주차</td>
            <td width={"50%"}>{food?.parking}</td>
          </tr>
          <tr>
            <td width={"15%"} style={{"color":"gray"}}>영업시간</td>
            <td width={"50%"}>{food?.time}</td>
          </tr>
          <tr>
            <td width={"15%"} style={{"color":"gray"}}>테마</td>
            <td width={"50%"}>{food?.theme}</td>
          </tr>

          </tbody>
          </table>
          <table className={"table"}>
            <tbody>
            <tr>
              <td>{food?.content}</td>
            </tr>
            <tr>
              <td className={"text-right"}>
                <button className={"btn-sm btn-danger"} onClick={()=>{nav(-1)}}>목록</button>
              </td>
            </tr>
            </tbody>
          </table>
          <table className={"table"}>
            <tbody>
            <tr>
              <td className={"text-center"}>
                {
                  food &&
                  <FoodMap address={food?.address} name={food?.name} />
                }
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="row" style={{"marginTop": "20px"}}>
          <table className={"table"}>
            <tbody>
            <tr>
              <td>
                {
                  comment &&
                  comment.map((com:CommentData,index:number)=>
                    <table className={"table"} key={index}>
                      <tbody>
                      <tr>
                        <td width={"80%"} className={"text-left"}>
                          ◑{com.name}({com.dbday})
                        </td>
                        <td width={"20%"} className={"text-right"}>
                          {
                            com.id===sessionStorage.getItem("id") &&
                            (
                              <span>
                                <button className={"btn-sm btn-warning"} onClick={()=>updateData(com.no,index)}>수정</button>&nbsp;
                                <button className={"btn-sm btn-info"} onClick={()=>del(com.no)}>삭제</button>
                              </span>
                            )
                          }
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} valign={"top"}>
                          <pre style={{"whiteSpace":"pre-wrap","backgroundColor":"white","border":"none"}}>{com.msg}</pre>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  )
                }

              </td>
            </tr>
            </tbody>
          </table>
          {
            window.sessionStorage.getItem("id") &&
              (
                <table className={"table"}>
                  <tbody>
                  <tr>
                    <td>
                      <textarea rows={5} cols={120} style={{"float":"left"}}
                                ref={msgRef}
                                onChange={(e)=>setMsg(e.target.value)}
                      ></textarea>
                      {
                        toggle?(
                          <button className={"btn-primary"}
                                  style={{"float":"left","width":"100px","height":"100px"}}
                                  onClick={insert}
                                  value={msg}
                          >댓글쓰기</button>
                        ):(
                          <button className={"btn-primary"}
                                  style={{"float":"left","width":"100px","height":"100px"}}
                                  onClick={()=>update()}
                                  value={msg}
                          >수정하기</button>
                        )
                      }
                    </td>
                  </tr>
                  </tbody>
                </table>
              )
          }
        </div>
      </div>
    </section>
  </Fragment>
  )
}

export default FoodDetail;