import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StartPage.css';
import backgroundImage from '../assets/welcome-page-img.jpg'; // Замените на путь к вашему изображению

// отрисовывваем привественную страницу
function WelcomePage() {
  return (
    <div className="welcome-page-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">
        <div className="welcome-page-content">
          <h1>Археологическая карта Санкт-Петербурга</h1>
          <p>Добро пожаловать на сайт, посвященный археологии Санкт-Петербурга. Здесь вы найдете информацию 
            о многочисленных археологических изысканиях на территории Санкт-Петербурга.</p>
          <p>Изучите карту, чтобы узнать больше об археологии Санкт-Петербурга.</p>
          <Link to="/map" className="map-button">Перейти к карте</Link>
          <p>Кроме того, перед использованием ресурса мы предлагаем вам изучить руководство пользователя</p>
          <Link to="/how-to-use" className="how-to-use-button">Как пользоваться?</Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
