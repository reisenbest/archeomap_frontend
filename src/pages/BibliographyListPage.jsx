import React, { useState } from 'react';
import useBibliographyData from '../components/useBibliographyData';
import BibliographyList from '../components/BibliographyList';
import { Link } from 'react-router-dom';
import '../styles/BibliographyListPage.css';

function BibliographyListPage() {
  const { organizedBibliography } = useBibliographyData();
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [showAboutSection, setShowAboutSection] = useState(false);

  const toggleAboutSection = () => {
    setShowAboutSection((prev) => !prev);
  };

  return (
    <div className="bibliography-container">
      <div className='bibliography-center-col'>
        <h1>Банк материалов по городской археологии и археологии Санкт-Петербурга.</h1>
        
        <button className="about-section-btn" onClick={toggleAboutSection}>
          {showAboutSection ? 'Скрыть информацию о разделе' : 'Показать информацию о разделе'}
        </button>
        <div className='about-section-container' style={{ display: showAboutSection ? 'block' : 'none' }}>
          <span className='about-section-text'>
            <p>В этом разделе представлена литература и другие источники по городской археологии и истории Санкт-Петербурга, которые нам удалось собрать. Для источников, доступных в интернете, имеется ссылка для перехода (знак лупы).</p>
            <p>Перед использованием изучите инструкцию по использованию данного <Link to="/how-to-use" className="link">раздела</Link>.</p>
            <p>Если вы знаете об источнике, который здесь не указан, пожалуйста, свяжитесь с нами! Контактная информация доступна в разделе <Link to="/about-authors" className="link">Об авторах</Link>.</p>
            <p>Раздел будет пополняться новыми материалами.</p>
          </span>
        </div>

        <BibliographyList 
          organizedBibliography={organizedBibliography} 
          selectedMainCategory={selectedMainCategory} 
          setSelectedMainCategory={setSelectedMainCategory} 
        />
      </div>
    </div>
  );
}

export default BibliographyListPage;