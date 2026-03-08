import './Header.css';
import logo from '../../images/logo2_white.svg';
import { User, SquareMenu } from 'lucide-react';

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
          My Profile
        </button>
        <button className="header__button" type="button">
          Sign Out
        </button>
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
