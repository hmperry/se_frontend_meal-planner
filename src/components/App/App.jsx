import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LetsEatLogo from '../../images/logo.svg';
import './App.css';

import Header from '../Header/header';
import Main from '../Main/main';

import Navigation from '../Navigation/navigation';
import Footer from '../Footer/footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <div className="app__content">
          <Header />
          <Navigation />
          <Main />

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
