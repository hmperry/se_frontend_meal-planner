import './Header.css';
import logo from '../../images/logo2_white.svg';
import { User, SquareMenu } from 'lucide-react';

import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header() {
  const {
    currentUser,
    setActiveModal,
    handleLogin,
    handleRegister,
    handleLogout,
  } = useContext(CurrentUserContext);
  const openLoginModal = () => {
    setActiveModal('loginModal');
  };
  const openRegisterModal = () => {
    setActiveModal('registerModal');
  };
  return (
    <header className="header">
      <img
        src={logo}
        alt="Let's Eat Meal Planning Logo"
        className="header__logo"
      />

      <div className="header__user-info">
        {currentUser ? (
          <>
            <div className="header__greeting">Hi, {currentUser.name}!</div>
            <button onClick={handleLogout} className="header__button">
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="header__button"
              type="button"
              onClick={openLoginModal}
            >
              Sign in
            </button>
            <button
              className="header__button"
              type="button"
              onClick={openRegisterModal}
            >
              Register
            </button>
          </>
        )}
      </div>

      <button
        className="header__menu"
        type="button"
        // onClick={handleMenuClick}
      >
        <SquareMenu size={30} />
      </button>
    </header>
  );
}

export default Header;
