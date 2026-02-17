import './Navigation.css';
import icon from '../../images/react.svg';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import { List, CookingPot, WalletCards, Calendar } from 'lucide-react';

function Navigation() {
  return (
    <div className="nav__bar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        <div className="nav__bar_items">
          <Calendar className="nav__icon" />
          <p className="nav__text">My Meal Plan</p>
        </div>
      </NavLink>
      <NavLink
        to="/grocerylist"
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        <div className="nav__bar_items">
          <List className="nav__icon" />
          <p className="nav__text">Grocery List</p>
        </div>
      </NavLink>
      <NavLink
        to="/browserecipes"
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        <div className="nav__bar_items">
          <CookingPot className="nav__icon" />
          <p className="nav__text">Browse Recipes</p>
        </div>
      </NavLink>

      <NavLink
        to="/myrecipes"
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        <div className="nav__bar_items">
          <WalletCards className="nav__icon" />
          <p className="nav__text">My Recipes</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Navigation;
