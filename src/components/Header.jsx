import React, { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import SiteLogo from '../assets/sitelogo.png';

const Header = () => {
  const isStartPageActive = useMatch('/');
  const isMapActive = useMatch('/map');
  const isMonumentListActive = useMatch('/monumentslist');
  const isBibliographyListActive = useMatch('/bibliographylist');
  const isVocabularyActive = useMatch('/vocabulary');
  const isArticleActive = useMatch('/articles');
  const isNewsActive = useMatch('/news');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='header'>
      <div className='header-content'>
        <div className='header-logo-wrapper'>
          <Link to="/map" className="header-logo-link">
            <img src={SiteLogo} alt="Logo" className="header-logo" />
          </Link>
        </div>
        <nav className='header-navbar-wrapper'>
          <ul className={`header-nav-list ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/" className={isStartPageActive ? "nav-link active" : "nav-link"}>WelcomePage</Link></li>
            <li><Link to="/map" className={isMapActive ? "nav-link active" : "nav-link"}>Карта</Link></li>
            <li><Link to="/monumentslist" className={isMonumentListActive ? "nav-link active" : "nav-link"}>Список памятников</Link></li>
            <li><Link to="/bibliographylist" className={isBibliographyListActive ? "nav-link active" : "nav-link"}>Источники</Link></li>
            <li><Link to="/vocabulary" className={isVocabularyActive ? "nav-link active" : "nav-link"}>Словарь</Link></li>
            <li><Link to="/articles" className={isArticleActive ? "nav-link active" : "nav-link"}>Статьи</Link></li>
            <li><Link to="/news" className={isNewsActive ? "nav-link active" : "nav-link"}>Новости</Link></li>
          </ul>
          <div className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
