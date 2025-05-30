import {useState, useEffect, Fragment} from "react";
import InfoMap from "./InfoMap";
import {useNavigate,useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchInfoDetail} from "../../actions/infoAction";

function InfoDetail(){
  //const [loaded, setLoaded] = useState(false);
  const {no}=useParams(); // List에서 받는 변수
  const dispatch = useDispatch(); // 액션 연결
  const nav = useNavigate();  // 화면 이동 (-1)/사이트 주소
  useEffect(()=>{
    dispatch(fetchInfoDetail(no));
  },[])
  const id = useSelector(state => state.infos.info_detail)

  const listClick = () => {
    nav(-1)   // histoty.back()
    // window.history.back(); =>  nav(-1)
    // window.location.href="/food/detail" => nav("/food/detail")
  }
  return (
    <Fragment>
      <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>부산지역 상세보기</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="archive-area section_padding_80">
        <div className="container">
          <div className="row">
            <table className="table">
              <tr>
                <td>
                  <img src={id.vo && id.vo.poster} style={{"width": "100%"}} />
                </td>
              </tr>
              <tr>
                <td><h3>{id.vo && id.vo.title}</h3></td>
              </tr>
              <tr>
                <td>{id.vo && id.vo.address}</td>
              </tr>
              <tr>
                <td>{id.vo && id.vo.phone}</td>
              </tr>
              <tr>
                <td>{id.vo && id.vo.info}</td>
              </tr>
              <tr>
                <td>
                  <InfoMap address={id.addr && id.addr}/>
                </td>
              </tr>
              <tr>
                <td className={"text-right"}>
                  <button className={"btn-sm btn-danger"} onClick={ listClick}>목록</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
export default InfoDetail;