import {useParams,useNavigate} from "react-router-dom";
import {Fragment} from "react";
import apiClient from "../../http-commons";
import {useQuery} from "@tanstack/react-query";

interface RecipeDetailData {
  no: number;
  poster: string;
  title: string;
  chef: string;
  chef_poster: string;
  chef_profile: string;
  info1: string;
  info2: string;
  info3: string;
  content: string;
  foodmake: string;
  data: string;
}
interface RecipeDetailResponse {
  vo:RecipeDetailData;
  mList:string[];
  iList:string[];
  dList:string[];
}
interface RealResponse {
  data: RecipeDetailResponse;
}
function RecipeDetail(){
  const {no}= useParams();
  const nav=useNavigate();

  const {isLoading,error,isError,data}=useQuery<RealResponse,Error>({
    queryKey: ['recipe-detail', no],
    queryFn: async () => await apiClient.get(`/recipe/detail/${no}`)
  })

  if(isLoading)
    return <h3 className={"text-center"}>Loading.....</h3>;
  if(isError)
    return <h3 className={"text-center"}>{error?.message}</h3>

  const recipe=data?.data
  console.log(recipe);

  return (
    <Fragment>
      <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>레시피 상세보기</h2>
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
                <td className="text-center" colSpan={3}>
                  <img src={recipe?.vo.poster} style={{"width": "800px","height": "300px"}} alt={""} />
                </td>
              </tr>
              <tr>
                <td className="text-center" colSpan={3}>
                  <h3>{recipe?.vo.title}</h3>
                </td>
              </tr>
              <tr>
                <td className="text-center" colSpan={3}>
                  {recipe?.vo.content}
                </td>
              </tr>
              <tr>
                <td className="text-center"><img src={"/icon/a1.png"} alt={""}/></td>
                <td className="text-center"><img src={"/icon/a2.png"} alt={""}/></td>
                <td className="text-center"><img src={"/icon/a3.png"} alt={""}/></td>
              </tr>
              <tr>
                <td className="text-center">{recipe?.vo.info1}</td>
                <td className="text-center">{recipe?.vo.info2}</td>
                <td className="text-center">{recipe?.vo.info3}</td>
              </tr>
              </tbody>
            </table>
            <table className="table">
              <tbody>
              <tr>
                <td><h3>[재료]</h3></td>
              </tr>
              <tr>
                <td>
                  <ul>
                    {
                      recipe &&
                      recipe?.dList.map((dd:string,index:number) =>
                        <li key={index}>{dd}</li>
                      )
                    }
                  </ul>
                </td>
              </tr>
              </tbody>
            </table>
            <table className="table">
              <tbody>
              <tr>
                <td colSpan={2}><h3>[조리방법]</h3></td>
              </tr>
              {
                recipe &&
                recipe?.mList.map((fm:string,index:number)=>
                  <tr key={index}>
                    <td className="text-left" width={"80%"}>
                      {fm}
                    </td>
                    <td className={"text-right"} width={"20%"}>
                      <img src={recipe?.iList[index]} style={{"width": "180px","height": "120px"}} alt={""}/>
                    </td>
                  </tr>
                )
              }
              </tbody>
            </table>
            <table className="table">
              <tbody>
              <tr>
                <td rowSpan={2} width={"20%"}>
                  <img src={recipe?.vo.chef_poster}
                       style={{"width": "150px","height": "100px"}} alt={""}/>
                </td>
                <td width={"80%"}>
                  {recipe?.vo.chef}
                </td>
              </tr>
              <tr>
                <td width={"85%"}>{recipe?.vo.chef_profile}</td>
              </tr>
              </tbody>
            </table>
            <table className="table">
              <tbody>
              <tr>
                <td className={"text-right"}>
                  <button className={"btn-sm btn-primary"}
                          onClick={()=>nav(-1)}>
                    목록
                  </button>
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

export default RecipeDetail;
