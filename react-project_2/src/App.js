import {Fragment} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router";
import Header from "./components/main/Header";
import Home from "./components/main/Home";
import InfoList from "./components/busan/InfoList";
import InfoFind from "./components/busan/InfoFind";

function App() {
  return (
    <Fragment>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/* 실행 화면을 지정 */}
          <Route path="/busan/info_list" element={<InfoList/>}/>
          <Route path="/busan/info_find" element={<InfoFind/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
