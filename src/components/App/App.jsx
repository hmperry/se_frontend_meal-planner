import { useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LetsEatLogo from '../../images/logo.svg';
import './App.css';

import Header from '../Header/header';
import Main from '../Main/main';

import Navigation from '../Navigation/navigation';
import Footer from '../Footer/footer';
import RecipeModal from '../RecipeModal/recipeModal';
import AddRecipeModal from '../AddRecipeModal/AddRecipeModal';
import EditMealPlanModal from '../EditMealPlanModal/editMealPlan';
import EditGroceryModal from '../GroceryList/editGroceryModal';

import { getRecipeDetails, getRecipes } from '../../utils/FatSecretAPI.js';
import { Edit } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);

  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [likedCards, setLikedCards] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [mealPlanDays, setMealPlanDays] = useState([]);
  //Saved plans: [{ id, name, startDate, endDate, days}]
  const [savedPlans, setSavedPlans] = useState(() => {
    const stored = localStorage.getItem('savedMealPlans');
    return stored ? JSON.parse(stored) : [];
  });
  // console.log('savedPlans:', savedPlans);

  //For saving recipes to My Recipes
  const [myRecipes, setMyRecipes] = useState([]);

  const addToMyRecipes = (recipe) => {
    if (myRecipes.some((r) => r.recipe_id === recipe.recipe_id)) return;
    setMyRecipes((prev) => [...prev, recipe]);
  };

  //For deleting recipes from My Recipes
  const deleteFromMyRecipes = (recipe) => {
    setMyRecipes((prev) =>
      prev.filter((r) => r.recipe_id !== recipe.recipe_id)
    );
  };

  //For community recipes page
  const [communitySearchQuery, setCommunitySearchQuery] = useState('');
  const [communityRecipes, setCommunityRecipes] = useState([]); // ✅ API results

  const handleCardClick = (card) => {
    console.log('card clicked:', card);
    console.log('recipe_image:', card.recipe_image);
    getRecipeDetails(card.recipe_id)
      .then((data) => {
        const fullCard = {
          ...card,
          ...data.recipe,
        };
        setSelectedCard(fullCard);
        setActiveModal('preview');
        // setSelectedCard(card);
      })
      .catch((err) => {
        console.error('Error fetching recipe details:', err);
      });
  };

  const closeActiveModal = () => {
    console.log('Clicked close');
    setActiveModal('');
  };

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeActiveModal();
      }
    };
    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  //handle like
  const handleLikeClick = (card) => {
    console.log('clicked like');
    if (likedCards.includes(card._id)) {
      setLikedCards(likedCards.filter((id) => id !== card._id));
    } else {
      setLikedCards([...likedCards, card._id]);
    }
  };

  //Open Add Recipe Form
  const openAddRecipeModal = () => {
    console.log('Open Add Recipe Modal');
    setActiveModal('addRecipeModal');
  };

  //Open Edit Meal Plan Modal
  const openEditMealPlanModal = (recipe) => {
    console.log('Open Edit Meal Plan Modal');
    setSelectedDay(recipe);
    setActiveModal('editMealPlanModal');
  };

  //Open Edit Grocery Modal
  const openEditGroceryModal = () => {
    console.log('Open Edit Grocery Modal');
    setActiveModal('editGroceryModal');
  };

  //handleMealPlan Days
  const updateMealPlanDay = (updatedDay) => {
    setMealPlanDays((prev) =>
      prev.map((day) => (day._id === updatedDay._id ? updatedDay : day))
    );
  };

  return (
    <CurrentUserContext.Provider
      value={{
        activeModal,
        handleLikeClick,
        handleCardClick,
        openAddRecipeModal,
        closeActiveModal,
        openEditMealPlanModal,
        selectedDay,
        setSelectedDay,
        mealPlanDays,
        setMealPlanDays,
        updateMealPlanDay,
        communitySearchQuery,
        setCommunitySearchQuery,
        communityRecipes,
        setCommunityRecipes,
        myRecipes,
        addToMyRecipes,
        openEditGroceryModal,
        deleteFromMyRecipes,
        savedPlans,
        setSavedPlans,
      }}
    >
      <div className="app">
        <div className="app__content">
          <Header />
          <Navigation />
          <Main
            handleCardClick={handleCardClick}
            handleLikeClick={handleLikeClick}
            likedCards={likedCards}
          />

          <Footer />
        </div>
        {activeModal === 'preview' && (
          <RecipeModal
            activeModal={activeModal}
            selectedCard={selectedCard}
            closeActiveModal={closeActiveModal}
            handleLikeClick={handleLikeClick}
            likedCards={likedCards}
          />
        )}
        <AddRecipeModal
          isOpen={activeModal === 'addRecipeModal'}
          closeActiveModal={closeActiveModal}
        />
        <EditMealPlanModal
          isOpen={activeModal === 'editMealPlanModal'}
          closeActiveModal={closeActiveModal}
        />
        <EditGroceryModal
          isOpen={activeModal === 'editGroceryModal'}
          closeActiveModal={closeActiveModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
