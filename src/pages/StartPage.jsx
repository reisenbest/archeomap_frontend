import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StartPage.css';

function WelcomePage() {
  return (
    <div className="welcome-page-container">
      <div className="overlay">
        <div className="welcome-page-content">
          <p className="welcome-eyebrow">Археологическая карта Петербурга</p>
          <h1>Откройте историю<br />под знакомыми улицами</h1>
          <p>Добро пожаловать на сайт, посвященный археологии Санкт-Петербурга. Здесь вы найдете информацию о многочисленных археологических изысканиях на территории Санкт-Петербурга.</p>
          <div className="welcome-actions">
            <Link to="/map" className="map-button">Исследовать карту →</Link>
            <Link to="/how-to-use" className="how-to-use-button">Как пользоваться</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WelcomePage;
