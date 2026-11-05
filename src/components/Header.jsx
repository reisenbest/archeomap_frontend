/*
 * Верхняя часть сайта: логотип и меню. Ссылки добавляются в список ниже.
 * Link переключает страницы внутри приложения. useMatch проверяет текущий адрес для подсветки ссылки.
 * Внешний вид и переключение на компактное меню описаны в styles/Header.css.
 */

import React, { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import SiteLogo from '../assets/sitelogo.png';
import burgerMenuIcon from '../assets/burger-menu-icon.png';
import closeMenuIcon from '../assets/close-icon.png';

const Header = () => {
  const isStartPageActive = useMatch('/');
  const isMapActive = useMatch('/map');
  const isMonumentListActive = useMatch('/monumentslist');
  const isBibliographyListActive = useMatch('/bibliographylist');
  const isVocabularyActive = useMatch('/vocabulary');
  const isArticleActive = useMatch('/articles/*');
  const isNewsActive = useMatch('/news');

  // false — компактное меню закрыто. При нажатии меняем состояние; класс open включает стили открытого меню.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Переключаем меню одним и тем же нажатием: открыто → закрыто или закрыто → открыто.
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <div className='header-content'>
        <div className='header-logo-wrapper'>
          <Link to="/map" className="header-logo-link">
            <img src={SiteLogo} alt="Logo" className="header-logo" />
          </Link>
          <span className="header-title">Археологическая карта<br />Санкт-Петербурга</span>
        </div>
        <nav className='header-navbar-wrapper'>
          <ul className={`header-nav-list ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/" className={isStartPageActive ? "nav-link active" : "nav-link"}>Приветственная страница</Link></li>
            <li><Link to="/map" className={isMapActive ? "nav-link active" : "nav-link"}>Карта</Link></li>
            <li><Link to="/monumentslist" className={isMonumentListActive ? "nav-link active" : "nav-link"}>Список памятников</Link></li>
            <li><Link to="/bibliographylist" className={isBibliographyListActive ? "nav-link active" : "nav-link"}>Источники</Link></li>
            <li><Link to="/vocabulary" onClick={() => setIsMenuOpen(false)} className={isVocabularyActive ? "nav-link active" : "nav-link"}>Словарь</Link></li>
            <li><Link to="/articles" onClick={() => setIsMenuOpen(false)} className={isArticleActive ? "nav-link active" : "nav-link"}>Статьи</Link></li>
            {/* <li><Link to="/news" className={isNewsActive ? "nav-link active" : "nav-link"}>Новости</Link></li> */}
          </ul>
          
          <div className={`burger-menu-header ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <img src={isMenuOpen ? closeMenuIcon : burgerMenuIcon} alt="Menu Icon" />
          </div>
        </nav>
      </div>
  );
}

export default Header;
