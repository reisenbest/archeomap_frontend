/*
 * Список источников с выбором раздела, поиском и раскрывающимися подразделами.
 * Данные и выбранный раздел приходят от BibliographyListPage через параметры (props).
 * Текст источников берётся из API; оформление меняется в styles/BibliographyListPage.css.
 */
import React, { useState } from 'react';
import LinkLogo from '../assets/link-icon.png';
import '../styles/BibliographyListPage.css';

function BibliographyList({ organizedBibliography, selectedMainCategory, setSelectedMainCategory }) {
  // Объект хранит открытые подразделы: имя → true/false. searchQuery хранит введённый текст.
  const [openSubCategories, setOpenSubCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // При смене основного раздела закрываем подразделы и очищаем старый поиск.
  const handleMainCategoryChange = (e) => {
    setSelectedMainCategory(e.target.value);
    setOpenSubCategories({});
    setSearchQuery('');
  };

  // Берём предыдущее состояние prev, сохраняем остальные ключи и переключаем только нужный подраздел.
  const toggleSubCategory = (subCategory) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [subCategory]: !prev[subCategory],
    }));
  };

  // Поиск открывает подразделы, в которых найден хотя бы один источник.
  // Сравнение через toLowerCase не различает большие и маленькие буквы. Пустой запрос закрывает подразделы.
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const newOpenSubCategories = {};
      Object.keys(organizedBibliography[selectedMainCategory]).forEach((subCategory) => {
        const items = organizedBibliography[selectedMainCategory][subCategory];
        if (items.some((item) => item.source.toLowerCase().includes(query.toLowerCase()))) {
          newOpenSubCategories[subCategory] = true;
        }
      });
      setOpenSubCategories(newOpenSubCategories);
    } else {
      setOpenSubCategories({});
    }
  };

  // Оставляем источники, у которых поле source содержит введённую строку.
  const filterItemsBySearchQuery = (items) => {
    return items.filter((item) =>
      item.source.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Несмотря на Desc в имени, здесь даты идут по возрастанию: от старых к новым.
  // Записи без даты ставятся первыми. Для обратного порядка меняют сравнение a и b.
  // sort меняет переданный массив; ниже ему передаётся новый массив, полученный через filter.
  const sortByPublicationDateDesc = (items) => {
    return items.sort((a, b) => {
      if (a.publication_date && b.publication_date) {
        return new Date(a.publication_date) - new Date(b.publication_date);
      } else if (a.publication_date) {
        return 1;
      } else if (b.publication_date) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  return (
    <div>
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
              <h3
                onClick={() => toggleSubCategory(subCategory)}
                className={`subcategory-header ${openSubCategories[subCategory] ? 'open' : ''}`}
              >
                {subCategory}
              </h3>
              {openSubCategories[subCategory] && (
                <ul className="bibliography-list">
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
  );
}

export default BibliographyList;
