import { useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import Footer from '../Footer/Footer.jsx';
import RecipeModal from '../RecipeModal/RecipeModal.jsx';
import AddRecipeModal from '../AddRecipeModal/AddRecipeModal';
import EditMealPlanModal from '../EditMealPlanModal/EditMealPlan.jsx';
import EditGroceryModal from '../GroceryList/EditGroceryModal.jsx';
import LoginModal from '../LoginModal/LoginModal.jsx';
import RegisterModal from '../RegisterModal/RegisterModal.jsx';
import { getRecipeDetails, getRecipes } from '../../utils/FatSecretAPI.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
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
  const [myRecipes, setMyRecipes] = useState(() => {
    const stored = localStorage.getItem('myRecipes');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
  }, [myRecipes]);

  const addToMyRecipes = (recipe) => {
    return new Promise((resolve, reject) => {
      try {
        if (myRecipes.some((r) => r.id === recipe.id)) {
          reject(new Error('Recipe already exists'));
          return;
        }
        setMyRecipes((prev) => [...prev, recipe]);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  //For deleting recipes from My Recipes
  const deleteFromMyRecipes = (recipe) => {
    setMyRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
  };

  //For community recipes page
  const [communitySearchQuery, setCommunitySearchQuery] = useState('');
  const [communityRecipes, setCommunityRecipes] = useState([]); // ✅ API results

  const handleCardClick = (card) => {
    console.log('card clicked:', card);
    console.log('recipe_image:', card.recipe_image);
    if (card.isCustom) {
      setSelectedCard(card);
      setActiveModal('preview');
      return;
    }
    getRecipeDetails(card.id)
      .then((data) => {
        const fullCard = {
          ...card,
          ...data,
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
    if (likedCards.includes(card.id)) {
      setLikedCards(likedCards.filter((id) => id !== card.id));
    } else {
      setLikedCards([...likedCards, card.id]);
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

  // handleLogin
  const handleLogin = ({ email, password }) => {
    return new Promise((resolve, reject) => {
      try {
        setCurrentUser({ name: 'TEST_USER', email });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleRegister = ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
      try {
        setCurrentUser({ name, email });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    closeActiveModal();
  };

  return (
    <CurrentUserContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handleLogout,
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
        currentUser,
        setActiveModal,
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
        <LoginModal
          isOpen={activeModal === 'loginModal'}
          onLogin={handleLogin}
          closeActiveModal={closeActiveModal}
          onSwitchToSignUp={() => setActiveModal('registerModal')}
        />
        <RegisterModal
          isOpen={activeModal === 'registerModal'}
          onRegister={handleRegister}
          closeActiveModal={closeActiveModal}
          onSwitchToSignIn={() => setActiveModal('loginModal')}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
