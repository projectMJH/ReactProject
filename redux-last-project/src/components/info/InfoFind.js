import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState, useEffect, useRef,Fragment} from "react";
import {fetchInfoFind} from "../../actions/infoAction";

function InfoFind(){
  const dispatch = useDispatch();
  const nav=useNavigate()
  const fdRef = useRef(null);
  const [fd,setFd] = useState("부산");
  useEffect(()=>{
    dispatch(fetchInfoFind(fd));
  },[fd])
  const infoList = useSelector(state => state.infos.info_find);
  const find=()=>{
    if(fd==="")
    {
      fdRef.current.focus();
      return;
    }
    setFd(fdRef.current.value);
  }

  return (
    <Fragment>
      <div className="breadcumb-area" style={{"backgroundImage": "url(/img/bg-img/breadcumb.jpg)"}}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>
                  명소,쇼핑,음식 검색
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="archive-area section_padding_80">
        <div className="container">
          <div className="row">
            <div className={"col-12 text-center"}>
              <input type={"text"} size={"25"} className={"input-group-sm"}
                     ref={fdRef}
              />
              <button className={"btn-sm btn-primary"} onClick={find}>검색</button>
            </div>
          </div>
        </div>
      </section>
      <section className="archive-area section_padding_80">
        <div className="container">
          <div className="row">
            {
              infoList && infoList.map((info) =>
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="single-post wow fadeInUp" data-wow-delay="0.1s">
                    <div className="post-thumb">
                      <Link to={"/info/detail/"+info.NO}>
                        <img src={info.POSTER} alt="" />
                      </Link>
                    </div>
                    <div className="post-content">
                    </div>
                    <div>
                      <Link to={info.NO}>
                        <h4 className="post-headline">{info.TITLE}</h4>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </section>
    </Fragment>
  )
}
export default InfoFind;