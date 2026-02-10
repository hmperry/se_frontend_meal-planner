import './Header.css';
import logo from '../../images/logo.svg';
import { User } from 'lucide-react';

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Let's Eat Meal Planning Logo"
        className="header__logo"
      />

      <div className="header__user-info">
        <button className="header__button" type="button">
          MY PROFILE
        </button>
        <button className="header__button" type="button">
          SIGN OUT
        </button>
      </div>
    </header>
  );
}

export default Header;
