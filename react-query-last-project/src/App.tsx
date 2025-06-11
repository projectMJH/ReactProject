import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/main/Home";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import RecipeList from "./components/recipe/RecipeList";
import RecipeDetail from "./components/recipe/RecipeDetail";
import RecipeFind from "./components/recipe/RecipeFind";
import FoodList from "./components/food/FoodList";
import FoodDetail from "./components/food/FoodDetail";
import BoardList from "./components/board/BoardList";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardDelete from "./components/board/BoardDelete";
import ChatClient from "./components/chat/ChatClient";
import NewsList from "./components/news/NewsList";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/list" element={<RecipeList />} />
        <Route path="/recipe/detail/:no" element={<RecipeDetail />} />
        <Route path="/recipe/find" element={<RecipeFind />} />
        <Route path="/food/list" element={<FoodList />} />
        <Route path="/food/detail/:fno" element={<FoodDetail />} />
        <Route path="/board/list" element={<BoardList />} />
        <Route path="/board/update/:no" element={<BoardUpdate />} />
        <Route path="/board/delete/:no" element={<BoardDelete />} />
        <Route path="/board/detail/:no" element={<BoardDetail />} />
        <Route path="/board/insert" element={<BoardInsert />} />
        <Route path="/chat/chat" element={<ChatClient />}/>
        <Route path="/news/list" element={<NewsList />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
