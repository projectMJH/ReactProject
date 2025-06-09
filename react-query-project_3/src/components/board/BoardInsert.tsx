import {useState, useRef, RefObject} from "react";
// useState => 데이터값 유지 => let / const => 클래스 : 멤버변수
/*
    class BoardInsert extends React.Component
    {
      constructor(props)
      {
        state={
          name:'',
          today:''
        }
        -------------- useState()
      }
      componentDidMount(){
        window.onload
        -------------- useEffect() => Hooks => 본격화 : 16
      }
    }
    발전 속도가 빠르다
      = 이전 버전과 호환성이 떨어진다
      = 19버전
 */
import {useMutation} from "@tanstack/react-query";
/*
    useQuery : SELECT
                  | @GetMapping
    useMutation : INSERT / UPDATE / DELETE
                                      | @DeleteMapping
                            | @PutMapping
                    | @PostMapping
                ------------------------------------ RestFul
 */
import {useNavigate} from "react-router-dom"; // 화면 이동
import apiClient from "../../http-commons"; // 서버와 연결 => axios, fetch
// 데이터형
/*
    let a:number=10
    let b:string=''
    let c:boolean=true
    let d:object={}
    let k:Array=[]
    ----------------------------
    => 여러개 데이터를 모아서 처리
    interface In{
      => 함수포함
    }
    type In{
      => 데이터형
    }
    ---------------------------- VO
    Python / ElasticSearch
    AWS / Docker / Vue, Vuex / Redux, TanStack-Query / TypeScript
    -------------------------------------------------------------
    Spring-Boot / JPA / Git-Action / Docker-Hub
                                     -------
                                     image, 설치 방법, CI/CD
 */
function BoardInsert() {
  const nameRef = useRef<HTMLInputElement>(null);
  // <input>
  const subjectRef= useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  // ------------------------------ 변수 선언
  const nav=useNavigate();
  const {mutate:boardInsert}=useMutation({
    mutationFn:async ()=>{
      return await apiClient.post(`/board/insert`,{
        name: name,
        subject: subject,
        content: content,
        pwd: pwd
      })
    },
    onSuccess:(res)=> {
      if(res.data.msg==='yes')
      {
        window.location.href=`/board/list`
      }
      else
      {
        alert(res.data.msg)
      }
    },
    onError:(error)=> {
      console.log(error);
    }
  })
  /*
      => 코틀린 => 자바라이브러리 사용이 가능
      func aaa():String
      {
        var a=10; => 변수
        val b=20; => 상수
      }

      function aaa():string
      {
        return "name"
      }
      function bbb():number
      {
      }
      function ccc(name:string,age:number)
      {
      }
   */
  // 유효성 검사
  const insert=():void=>{
    if(!name.trim()) // name.trim()===""
      return nameRef.current?.focus()
    if(!subject.trim())
      return subjectRef.current?.focus()
    if(!content.trim())
      return contentRef.current?.focus()
    boardInsert()
  }

  const cancel=():void=>{
    nav(-1) // history.back()
  }

  return (
    <div className={"container"}>
      <div className={"row"}>
        <h3>글쓰기</h3>
        <table className={"table"}>
          <tbody>
          <tr>
            <th className={"text-center"} style={{"width":"15%"}}>이름</th>
            <td style={{"width":"85%"}}>
              <input type="text" className={"input-sm"}
                     size={15}
                     ref={nameRef}
                     value={name}
                     onChange={(e:any):void=>setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th className={"text-center"} style={{"width":"15%"}}>제목</th>
            <td style={{"width":"85%"}}>
              <input type="text" className={"input-sm"}
                     size={50}
                     ref={subjectRef}
                     value={subject}
                     onChange={(e:any):void=>setSubject(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th className={"text-center"} style={{"width":"15%"}}>내용</th>
            <td style={{"width":"85%"}}>
              <textarea rows={10} cols={50}
                     ref={contentRef}
                     value={content}
                     onChange={(e:any):void=>setContent(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th className={"text-center"} style={{"width":"15%"}}>비밀번호</th>
            <td style={{"width":"85%"}}>
              <input type="password" className={"input-sm"}
                     size={10}
                     ref={pwdRef}
                     value={pwd}
                     onChange={(e:any):void=>setPwd(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={"text-center"}>
              <button className={"btn btn-primary"} onClick={insert}>글쓰기</button>
              <button className={"btn btn-primary"} onClick={cancel}>취소</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default BoardInsert;