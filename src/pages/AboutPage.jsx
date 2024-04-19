import '../styles/AboutPage.css';
import React, { useState } from 'react';
import About from '../components/About';

const AboutPage = () => {
  const [data, setData] = useState([]);

  const onDataReceived = (onDataReceived) => {
    setData(onDataReceived);
  };

  return (
    <div className="center-content">
      <h1>О нас</h1>
      <div>
        {/* Передача функции для обновления данных в компонент для получения данных */}
        <About onDataReceived={onDataReceived} />

        {/* Отображение данных */}
        {data.length > 0 ? (
          <div>
            {data.map(item => (
              <div key={item.id} className="item">
                <h2>{item.title}</h2>
                <p>Latitude: {item.latitude}</p>
                <p>Longitude: {item.longitude}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Загрузка данных...</p>
        )}
      </div>
    </div>
  );
};

export default AboutPage;