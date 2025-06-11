/*
{
	"lastBuildDate":"Wed, 11 Jun 2025 16:05:02 +0900",
	"total":706958,
	"start":1,
	"display":100,
	"items":[
		{
			"title":"골목의 귀환…서울 자치구, 상권 재생 실험에 나서다",
			"originallink":"https:\/\/www.dnews.co.kr\/uhtml\/view.jsp?idxno=202506111529282670575",
			"link":"https:\/\/www.dnews.co.kr\/uhtml\/view.jsp?idxno=202506111529282670575",
			"description":"구는 음식점 41곳을 테마별로 정리한 ‘<b>맛집<\/b> 지도’를 제작해 CMC 직원 9000여 명에게 QR코드 형태로... 동대문구는 ‘노포 <b>맛집<\/b> 인증제’를 통해 30년 이상 운영된 전통 음식점 18곳을 인증하고, 마케팅·영상제작... ",
			"pubDate":"Wed, 11 Jun 2025 16:02:00 +0900"
		},
 */
import {Fragment,useState,useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError, AxiosResponse} from "axios";

/*
    export functon NewsList(){}
    ------------------------------
    export const NewsList=()=>{}    => component
    ------------------------------
    const NewsList=()=>{

    }
    export default NewsList;
    ------------------------------
    1. Java
    2. Oracle
    3. JSP
    4. Spring / Spring - Boot
       ----------------------
    5. NodeJS
    6. Python / Django
    7. ElasticSearch
    8. JavaScript
        Jquery  /  Vue  /  React
           |      |           |
         Ajax  Vuex/Pinia  TanStack-Query / Redux
 */
interface NewsData {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
}
interface NewsResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: NewsData[];
}
interface NewsProps {
  data: NewsResponse;
}
function NewsList() {
  const [fd,setFd] = useState<string>("맛집");
  const fdRef=useRef<HTMLInputElement>(null);
  const {isLoading,isError,error,data,refetch:newsFind}=useQuery<AxiosResponse,Error>({
    queryKey:['news-list',fd],
    queryFn: async() => await axios.get('http://localhost:3355/news/list/',{
      params:{
        query:fd
      }
    })
  })

  if(isLoading)
    return <h3 className={"text-center"}>Loading.....</h3>;
  if(isError)
    return <h3 className={"text-center"}>{error?.message}</h3>

  //const news:NewsData[]|undefined=data?.data.items
  //console.log(news);
  const find=()=>{
    if(fd==="")
    {
      fdRef.current?.focus();
      return;
    }
    if(fdRef.current)
    {
      setFd(fdRef.current?.value);
    }
    newsFind()
  }
  return(
    <Fragment>
      <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>네이버 뉴스 검색</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="archive-area section_padding_80">
        <div className="container">
          <div className="row">
            <input type={"text"} className={"input-sm"}
                   size={20} ref={fdRef} />
            <button className={"btn-sm btn-danger"} onClick={find}>검색</button>
          </div>
          <div className="row" style={{"marginTop":"20px"}}>
            <table className="table">
              <tbody>
              <tr>
                <td>
                  {
                    data?.data.items &&
                    data?.data.items.map((n:NewsData)=>
                      <table className={"table"}>
                        <tbody>
                        <tr>
                          <td><a href={n.link}><h3 style={{"color":"orange"}} dangerouslySetInnerHTML={{__html: n.title}}></h3></a></td>
                        </tr>
                        <tr>
                          <td dangerouslySetInnerHTML={{__html: n.description}}></td>
                        </tr>
                        </tbody>
                      </table>
                    )
                  }
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

export default NewsList;