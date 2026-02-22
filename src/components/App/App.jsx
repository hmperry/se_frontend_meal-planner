import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LetsEatLogo from '../../images/logo.svg';
import './App.css';

import Header from '../Header/header';
import Main from '../Main/main';

import Navigation from '../Navigation/navigation';
import Footer from '../Footer/footer';
import RecipeModal from '../RecipeModal/recipeModal';

function App() {
  const [count, setCount] = useState(0);

  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
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

  return (
    <>
      <div className="app">
        <div className="app__content">
          <Header />
          <Navigation />
          <Main handleCardClick={handleCardClick} />

          <Footer />
        </div>
        <RecipeModal
          activeModal={activeModal}
          selectedCard={selectedCard}
          closeActiveModal={closeActiveModal}
        />
      </div>
    </>
  );
}

export default App;
