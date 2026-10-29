/*
 * Нижняя часть сайта: логотипы музеев и ссылки на справочные разделы.
 * Изображения меняются через импорты assets; размеры — в styles/Footer.css.
 * useMatch определяет текущий раздел, чтобы выделить его ссылку классом active.
 */

import React, { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import burgerMenuIcon from '../assets/burger-menu-icon.png';
import closeMenuIcon from '../assets/close-icon.png';
import ArchaeologyMuseumlogo from '../assets/archaeology_museum_logo.png';
import GMHSPBlogo from '../assets/GMH_SPB_logo_horizontal.png';




const Footer = () => {
  const isAboutProject = useMatch('/about-project');
  const isAboutAuthors = useMatch('/about-authors');
  const isHowToUsePage = useMatch('/how-to-use');

  // false — компактное меню закрыто. При нажатии меняем состояние; класс open включает стили открытого меню.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Переключаем меню одним и тем же нажатием: открыто → закрыто или закрыто → открыто.
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='footer-content'>
      <div className="left-half">
        <img
          className="footer-logo footer-logo-archaeology"
          src={ArchaeologyMuseumlogo}
          alt="Археологический музей"
        />
        <a href="/map" className="footer-text">
          <span className="footer-text">Археологическая карта Петербурга</span>
        </a>
        <img
          className="footer-logo footer-logo-history"
          src={GMHSPBlogo}
          alt="Государственный музей истории Санкт-Петербурга"
        />
      </div>
      <div className="right-half">
        <nav className='footer-navbar-wrapper'>
          <div className={`burger-menu-footer ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <img src={isMenuOpen ? closeMenuIcon : burgerMenuIcon} alt="Menu Icon" />
          </div>
          <ul className={`footer-nav-list ${isMenuOpen ? 'open' : ''}`}>
            <li><Link to="/about-project" className={isAboutProject ? "footer-link active" : "footer-link"}>О проекте</Link></li>
            <li><Link to="/about-authors" className={isAboutAuthors ? "footer-link active" : "footer-link"}>Об авторах</Link></li>
            <li><Link to="/how-to-use" className={isHowToUsePage ? "footer-link active" : "footer-link"}>Как пользоваться?</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;

