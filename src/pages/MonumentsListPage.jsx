/*
 * Алфавитный список памятников с поиском по названию.
 * Данные загружает useMonumentsData; нажатие на название открывает /monument/id.
 * Поиск выполняется в браузере по уже загруженному массиву, без нового запроса.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMonumentsData from '../components/useMonumentsData';

// Отрисовываем раздел список памятников
function MonumentsListPage() {
  // Храним видимость пояснения и текущий поисковый текст. Изменение состояния обновляет список на экране.
  const [showAboutSection, setShowAboutSection] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { monuments } = useMonumentsData(); // Получаем данные о памятниках

  // Сортируем памятники по алфавиту по их именам
  // localeCompare сравнивает названия как текст. Важно: sort сортирует сам массив monuments, а не его копию.
  const sortedMonuments = monuments.sort((a, b) => a.name.localeCompare(b.name));

  const toggleAboutSection = () => {
    setShowAboutSection((prev) => !prev);
  };

  // Фильтруем памятники на основе поискового запроса
  const filteredMonuments = sortedMonuments.filter(monument =>
    monument.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="monument-list-page-container">
      <div className='monument-list-page-center-col'>
        <h1>Памятники археологии, исследованные на территории Санкт-Петербурга.</h1> 
        <button className="about-section-btn" onClick={toggleAboutSection}>
          {showAboutSection ? 'Скрыть информацию о разделе' : 'Показать информацию о разделе'}
        </button>
        <div className='about-section-container' style={{ display: showAboutSection ? 'block' : 'none' }}>
          <span className='about-section-text'> 
            <p>В этом разделе вы найдете все памятники, представленные на <Link to="/map" className="link">интерактивной карте</Link>. Прочитать подробную информацию о памятнике можно кликнув по его названию в списке.</p>
            <p>Если вы знаете об археологических раскопках, которые здесь не представлены, пожалуйста, свяжитесь с нами! Контактная информация доступна в разделе <Link to="/about-authors" className="link">Об авторах</Link>.</p>
            <p>Раздел будет пополняться новыми материалами.</p>
          </span>
        </div>
        
        {/* Поле поиска */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск по имени памятника"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className='monuments-list'>
          <ol>
            {filteredMonuments.map((monument, index) => (
              <li key={monument.id}>
                {/* Имя памятника в виде ссылки */}
                <Link to={`/monument/${monument.id}`}>{monument.name}</Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default MonumentsListPage;
