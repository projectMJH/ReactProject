import {useState,useEffect,Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router-dom";
import {fetchFoodDetail} from "../../actions/foodAction";
import FoodMap from "./FoodMap";

// redirect, useFef, useCallback, useMemo
// Navigate => history.back() 실행하는 클래스

function FoodDetail() {
  const {fno} = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    dispatch(fetchFoodDetail(fno)); // 데이터를 서버에서 읽어서 저장
  }, []);
  const foodDetail=useSelector(state=>state.foods.food_detail);
  const listClick=()=>{
    nav("/food/list")
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
            <table className={"table"}>
              <tbody>
              <tr>
                <td className={"text-center"} width={"40%"} rowSpan={"8"}>
                  <img src={"https://www.menupan.com"+foodDetail.poster} style={{"width":"320px","height": "300px"}}/>
                </td>
                <td colSpan={"2"}>
                  <h3>{foodDetail.name }&nbsp;&nbsp;
                    <span style={{"color":"orange"}}>{foodDetail.score}</span>
                  </h3>
                </td>
              </tr>
              <tr>
                <th width={"15%"} className={"text-center"}>주소</th>
                <td width={"55%"}>{foodDetail.address}</td>
              </tr>              
              <tr>
                <th width={"15%"} className={"text-center"}>전화</th>
                <td width={"55%"}>{foodDetail.phone}</td>
              </tr>              
              <tr>
                <th width={"15%"} className={"text-center"}>음식종류</th>
                <td width={"55%"}>{foodDetail.type}</td>
              </tr>              
              <tr>
                <th width={"15%"} className={"text-center"}>가격대</th>
                <td width={"55%"}>{foodDetail.price}</td>
              </tr>              
              <tr>
                <th width={"15%"} className={"text-center"}>주차</th>
                <td width={"55%"}>{foodDetail.parking}</td>
              </tr>              
              <tr>
                <th width={"15%"} className={"text-center"}>영업시간</th>
                <td width={"55%"}>{foodDetail.time}</td>
              </tr>
              <tr>
                <th width={"15%"} className={"text-center"}>테마</th>
                <td width={"55%"}>{foodDetail.theme}</td>
              </tr>
              </tbody>
            </table>
            <table className={"table"}>
              <tbody>
              <tr>
                <td>{foodDetail.content}</td>
              </tr>
              <tr>
                <td className={"text-right"}>
                  <button className={"btn-sm btn-danger"} onClick={listClick}>목록</button>
                </td>
              </tr>
              <tr>
                <td>
                  <FoodMap address={foodDetail.address} name={foodDetail.name}/>
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
export default FoodDetail;