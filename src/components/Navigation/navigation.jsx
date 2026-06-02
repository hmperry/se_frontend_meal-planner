import './Navigation.css';
import { useNavigate, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext } from 'react';
import { NavData } from './NavData';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  const visibleNav = NavData.filter((val) => !val.protected || currentUser);

  if (!currentUser) return null;

  return (
    <nav className="Navigation">
      <ul className="nav__bar">
        {visibleNav.map((val, key) => {
          return (
            <li
              className={
                location.pathname === val.link
                  ? 'nav__item nav__item-active'
                  : 'nav__item'
              }
              key={key}
              onClick={() => {
                navigate(val.link);
              }}
            >
              {''}
              <div className="nav__icon">{val.icon}</div>
              <div className="nav__title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </nav>
    //
  );
}

export default Navigation;
