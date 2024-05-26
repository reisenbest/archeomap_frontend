// компонент отрисовывает раздел источников
import React, { useState } from 'react';
import useBibliographyData from '../components/useBibliographyData';
import LinkLogo from '../assets/link-icon.png';
import { Link } from 'react-router-dom';
import '../styles/BibliographyListPage.css';


function BibliographyListPage() {
  const { organizedBibliography } = useBibliographyData();
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [openSubCategories, setOpenSubCategories] = useState({});
  const [showAboutSection, setShowAboutSection] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMainCategoryChange = (e) => {
    setSelectedMainCategory(e.target.value);
    setOpenSubCategories({}); 
    setSearchQuery(''); 
  };

  const toggleSubCategory = (subCategory) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [subCategory]: !prev[subCategory],
    }));
  };

  const toggleAboutSection = () => {
    setShowAboutSection((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Функция для фильтрации элементов по поисковому запросу
  const filterItemsBySearchQuery = (items) => {
    return items.filter((item) =>
      item.source.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Функция для сортировки элементов по дате публикации в обратном порядке
  const sortByPublicationDateDesc = (items) => {
    return items.sort((a, b) => {
      if (a.publication_date && b.publication_date) {
        return new Date(a.publication_date) - new Date(b.publication_date);
      } else if (a.publication_date) {
        return 1; // Если a имеет дату публикации, а b нет, помещаем a в конец
      } else if (b.publication_date) {
        return -1; // Если b имеет дату публикации, а a нет, помещаем b в конец
      } else {
        return 0; // Если оба не имеют даты публикации, сохраняем текущий порядок
      }
    });
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

        <div className='section-choices-container'>
          <label>Раздел:</label>
          <select value={selectedMainCategory} onChange={handleMainCategoryChange}>
            <option value="">Выберите категорию</option>
            {Object.keys(organizedBibliography).map((mainCategory) => (
              <option key={mainCategory} value={mainCategory}>
                {mainCategory}
              </option>
            ))}
          </select>
        </div>

        {selectedMainCategory && (
          <div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Поиск по ключевым словам"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {Object.keys(organizedBibliography[selectedMainCategory]).map((subCategory) => (
              <div key={subCategory} className="subcategory-block">
                <h3 onClick={() => toggleSubCategory(subCategory)} className="subcategory-header">
                  {subCategory}
                </h3>
                {openSubCategories[subCategory] && (
                  <ul className="bibliography-list">
                    {/* Фильтрация и сортировка по дате публикации в обратном порядке */}
                    {sortByPublicationDateDesc(filterItemsBySearchQuery(organizedBibliography[selectedMainCategory][subCategory])).map((item) => (
                      <li key={item.id}>
                        <div className="bibliography-item">
                          <p>{item.source}
                            {item.link && (
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <img src={LinkLogo} alt="Link icon" className="source-link-icon" />
                              </a>
                            )}
                          </p>
                          
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BibliographyListPage;
