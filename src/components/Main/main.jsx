import './Main.css';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import MyMealPlan from '../MyMealPlan/myMealPlan';
import GroceryList from '../GroceryList/groceryList';
import BrowseRecipes from '../BrowseRecipes/browseRecipes';
import MyRecipes from '../MyRecipes/myRecipes';

function Main() {
  return (
    <section className="main">
      <Routes>
        <Route path="/grocerylist" element={<GroceryList />}></Route>
        <Route path="/browserecipes" element={<BrowseRecipes />}></Route>
        <Route path="/" element={<MyMealPlan />}></Route>
        <Route path="/myrecipes" element={<MyRecipes />}></Route>
      </Routes>
    </section>
  );
}

export default Main;
