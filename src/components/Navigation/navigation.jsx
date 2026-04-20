import './Navigation.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavData } from './navData';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="Navigation">
      <ul className="nav__bar">
        {NavData.map((val, key) => {
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
    </div>
    //
  );
}

export default Navigation;
