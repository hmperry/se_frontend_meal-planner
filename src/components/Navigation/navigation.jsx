import './Navigation.css';
import icon from '../../images/react.svg';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from 'react-router-dom';
import PageHeading from '../PageHeading/pageHeading';
import { NavData } from './navData';

import { List, CookingPot, WalletCards, Calendar } from 'lucide-react';

function Navigation() {
  const location = useLocation();

  const pageTitles = {
    '/': 'My Meal Plan',
    '/grocerylist': 'Grocery List',
    '/communityrecipes': 'Community Recipes',
    '/myrecipes': 'My Recipes',
  };

  const currentTitle = pageTitles[location.pathname] || '';
  return (
    <div className="Navigation">
      <ul className="nav__bar">
        {NavData.map((val, key) => {
          return (
            <li
              className={
                window.location.pathname === val.link
                  ? 'nav__item nav__item-active'
                  : 'nav__item'
              }
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              {''}
              <div className="nav__icon">{val.icon}</div>
              <div className="nav__title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
    // <div className="nav-wrapper">
    //   <div className="nav__bar">
    //     <NavLink
    //       to="/"
    //       className={({ isActive }) =>
    //         isActive ? 'nav-link active' : 'nav-link'
    //       }
    //     >
    //       <div className="nav__bar_items">
    //         <Calendar className="nav__icon" />
    //         <p className="nav__text">My Meal Plan</p>
    //       </div>
    //     </NavLink>
    //     <NavLink
    //       to="/grocerylist"
    //       className={({ isActive }) =>
    //         isActive ? 'nav-link active' : 'nav-link'
    //       }
    //     >
    //       <div className="nav__bar_items">
    //         <List className="nav__icon" />
    //         <p className="nav__text">Grocery List</p>
    //       </div>
    //     </NavLink>
    //     <NavLink
    //       to="/communityrecipes"
    //       className={({ isActive }) =>
    //         isActive ? 'nav-link active' : 'nav-link'
    //       }
    //     >
    //       <div className="nav__bar_items">
    //         <CookingPot className="nav__icon" />
    //         <p className="nav__text">Community Recipes</p>
    //       </div>
    //     </NavLink>

    //     <NavLink
    //       to="/myrecipes"
    //       className={({ isActive }) =>
    //         isActive ? 'nav-link active' : 'nav-link'
    //       }
    //     >
    //       <div className="nav__bar_items">
    //         <WalletCards className="nav__icon" />
    //         <p className="nav__text">My Recipes</p>
    //       </div>
    //     </NavLink>
    //   </div>
    //   <PageHeading>{currentTitle}</PageHeading>
    // </div>
  );
}

export default Navigation;
