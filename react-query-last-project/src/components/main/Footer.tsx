/*
  const Footer=()=>{

  }
 */
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="copy_right_text text-center">
              <p>2025 마지막 개인 프로젝트 (TanStack-Query+NodeJS)<i className="fa fa-heart-o" aria-hidden="true"></i>
                by <Link to={"#"}>D 강의실</Link></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;