import './Header.css';
import logo from '../../images/logo2_white.svg';
import { User, SquareMenu } from 'lucide-react';

import { useContext, useState, useEffect, useRef } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const {
    currentUser,
    setActiveModal,
    handleLogin,
    handleRegister,
    handleLogout,
  } = useContext(CurrentUserContext);
  const openLoginModal = () => {
    setActiveModal('loginModal');
    setMenuOpen(false);
  };
  const openRegisterModal = () => {
    setActiveModal('registerModal');
    setMenuOpen(false);
  };
  return (
    <header className="header" ref={menuRef}>
      <img
        src={logo}
        alt="Let's Eat Meal Planning Logo"
        className="header__logo"
      />

      <div
        className={`header__user-info ${menuOpen ? 'header__user-info--open' : ''}`}
      >
        {currentUser ? (
          <>
            <div className="header__greeting">Hi, {currentUser.name}!</div>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="header__button"
            >
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
        className={`header__menu ${menuOpen ? 'header__menu--active' : ''}`}
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <SquareMenu size={30} />
      </button>
    </header>
  );
}

export default Header;
