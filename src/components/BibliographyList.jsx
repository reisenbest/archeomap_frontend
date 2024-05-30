import React, { useState } from 'react';
import LinkLogo from '../assets/link-icon.png';
import '../styles/BibliographyListPage.css';

function BibliographyList({ organizedBibliography, selectedMainCategory, setSelectedMainCategory }) {
  const [openSubCategories, setOpenSubCategories] = useState({});
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

  const filterItemsBySearchQuery = (items) => {
    return items.filter((item) =>
      item.source.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

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
