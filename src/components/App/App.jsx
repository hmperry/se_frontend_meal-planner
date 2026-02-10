import { useState } from 'react';
import LetsEatLogo from '../../images/logo.svg';
import './App.css';

import Header from '../Header/header';
import Main from '../Main/main';
import Footer from '../Footer/footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <div className="app__content">
          <Header />

          <Main />

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
