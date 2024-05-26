
import React, { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import burgerMenuIcon from '../assets/burger-menu-icon.png';
import closeMenuIcon from '../assets/close-icon.png';

{/* Код с разметкой и логикой для футера сайта */}

const Footer = () => {
  const isAboutProject = useMatch('/about-project');
  const isAboutAuthors = useMatch('/about-authors');
  const isHowToUsePage = useMatch('/how-to-use');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='footer-content'>
      <div className="left-half">
        <a href="/map" className="footer-text">
          <span className="footer-text">Археологическая карта<br />Петербурга</span>
        </a>
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