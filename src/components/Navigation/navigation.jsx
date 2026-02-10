import './Navigation.css';
import icon from '../../images/react.svg';

import { List, CookingPot, WalletCards, Calendar } from 'lucide-react';

function Navigation() {
  return (
    <section className="navigation">
      <ul className="nav__bar">
        <li className="nav__bar_items">
          <button className="nav__button">
            <List className="nav__icon" />
            <p className="nav__text">Grocery List</p>
          </button>
        </li>
        <li className="nav__bar_items">
          <button className="nav__button">
            <CookingPot className="nav__icon" />
            <p className="nav__text">Browse Recipes</p>
          </button>
        </li>
        <li className="nav__bar_items">
          <button className="nav__button">
            <Calendar className="nav__icon" />
            <p className="nav__text">My Meal Plan</p>
          </button>
        </li>
        <li className="nav__bar_items">
          <button className="nav__button">
            <WalletCards className="nav__icon" />
            <p className="nav__text">My Recipes</p>
          </button>
        </li>
      </ul>
    </section>
  );
}

export default Navigation;
