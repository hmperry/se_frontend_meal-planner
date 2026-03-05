import './Main.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import MyMealPlan from '../MyMealPlan/myMealPlan';
import GroceryList from '../GroceryList/groceryList';
import CommunityRecipes from '../CommunityRecipes/communityRecipes';
import MyRecipes from '../MyRecipes/myRecipes';

function Main({
  handleCardClick,
  closeActiveModal,
  handleLikeClick,
  likedCards,
}) {
  return (
    <section className="main">
      <Routes>
        <Route path="/grocerylist" element={<GroceryList />}></Route>
        <Route
          path="/communityrecipes"
          element={<CommunityRecipes handleCardClick={handleCardClick} />}
        ></Route>
        <Route path="/" element={<MyMealPlan />}></Route>
        <Route
          path="/myrecipes"
          element={
            <MyRecipes
              handleCardClick={handleCardClick}
              closeActiveModal={closeActiveModal}
              handleLikeClick={handleLikeClick}
              likedCards={likedCards}
            />
          }
        ></Route>
      </Routes>
    </section>
  );
}

export default Main;
