import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/main/Home";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import RecipeList from "./components/recipe/RecipeList";
import FoodList from "./components/food/FoodList";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/list" element={<RecipeList />} />
        <Route path="/food/list" element={<FoodList />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
