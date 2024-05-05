import React from 'react';
import '../styles/MonumentDetailsRight.css';

const MonumentDetailsRight = () => {
  return (
    <div className="monument-details-right-column-content">
      <div className="section">
        <button className='button-news'>Новости</button>
        <ul>
          <li>Новость 1</li>
          <li>Новость 2</li>
          <li>Новость 3</li>
        </ul>
      </div>
      <div className="section">
        <button className='button-announcements'>Анонсы</button>
        <ul>
          <li>Анонс 1</li>
          <li>Анонс 2</li>
          <li>Анонс 3</li>
        </ul>
      </div>
    </div>
  );
};

export default MonumentDetailsRight;