import {BrowserRouter as Router, Routes, Route} from "react-router";
import {Fragment} from "react";
import FoodList from "./components/food/FoodList";
import InfoList from "./components/info/InfoList";
import FoodDetail from "./components/food/FoodDetail";
import BoardList from "./components/board/BoardList";
import BoardInsert  from "./components/board/BoardInsert";
// <FoodList /> => return 에 등록된 HTML을 받는다 => 메서드 호출
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<FoodList />} />
          <Route path="/info/list" element={<InfoList />} />
          <Route path="/food/detail/:fno" element={<FoodDetail />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/board/insert" element={<BoardInsert />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
