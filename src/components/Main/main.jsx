import './Main.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import MyMealPlan from '../MyMealPlan/MyMealPlan';
import GroceryList from '../GroceryList/GroceryList';
import CommunityRecipes from '../CommunityRecipes/CommunityRecipes';
import MyRecipes from '../MyRecipes/MyRecipes';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function Main({
  handleCardClick,
  closeActiveModal,
  handleLikeClick,
  likedCards,
}) {
  return (
    <section className="main">
      <Routes>
        <Route
          path="/grocerylist"
          element={
            <ProtectedRoute>
              <GroceryList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/"
          element={<CommunityRecipes handleCardClick={handleCardClick} />}
        ></Route>
        <Route
          path="/mealplan"
          element={
            <ProtectedRoute>
              <MyMealPlan />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/myrecipes"
          element={
            <ProtectedRoute>
              <MyRecipes
                handleCardClick={handleCardClick}
                closeActiveModal={closeActiveModal}
                handleLikeClick={handleLikeClick}
                likedCards={likedCards}
              />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </section>
  );
}

export default Main;
