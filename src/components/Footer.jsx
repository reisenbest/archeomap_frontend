import React from 'react';
import { Link, useMatch } from 'react-router-dom';


const Footer = () => {

  // Проверяем соответствие текущего маршрута
  const isAboutProject = useMatch('/about-project');
  const isAboutAuthors = useMatch('/about-authors');

  return (
    <div className='footer-content'>
      <div className="left-half">
          <a href="/map" className="footer-text">
          <span className="footer-text">Археологическая карта<br />Петербурга</span>
          </a>
      </div>
      <div className="right-half">
        <nav className='footer-navbar-wrapper'>
          <ul className="footer-nav-list">
            <li><Link to="/about-project" className={isAboutProject ? "footer-link active" : "footer-link"}>О проекте</Link></li>
            <li><Link to="/about-authors" className={isAboutAuthors ? "footer-link active" : "footer-link"}>Об авторах</Link></li>   
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
