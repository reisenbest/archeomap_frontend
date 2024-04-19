import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import SiteLogo from '../assets/sitelogo.png';
const Header = () => {
  // Проверяем соответствие текущего маршрута
  const isHomeActive = useMatch('/');
  const isAboutActive = useMatch('/about');
  const isMapActive = useMatch('/map');

  return (
    <div className='header'>
      <div className='header-content'>
        <Link to="/map" className="header-logo-link">
          <img src={SiteLogo} alt="Logo" className="header-logo" />
        </Link>
        <nav className='header-navbar-wrapper'>
          <ul className="header-nav-list">
            {/* Добавляем класс "active" для активной ссылки */}
            <li><Link to="/" className={isHomeActive ? "nav-link active" : "nav-link"}>WelcomePage</Link></li>
            <li><Link to="/about" className={isAboutActive ? "nav-link active" : "nav-link"}>AboutPage</Link></li>
            <li><Link to="/map" className={isMapActive ? "nav-link active" : "nav-link"}>MapPage</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;