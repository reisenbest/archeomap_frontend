import React, { useState } from 'react';

const FilterPopupPage = ({ categories, selectedCategories, handleClearSelectionChange, handleCategoryChange }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const toggleFilterButton = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsPopupOpen(false);
    setActiveButton('filter');
  };

  const togglePopupButton = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsFilterOpen(false);
    setActiveButton('popup');
  };

  const toggleTypeButton = () => {
    setIsTypeOpen(!isTypeOpen);
    setIsDateOpen(false);
    setActiveButton('type');
  };

  const toggleDateButton = () => {
    setIsDateOpen(!isDateOpen);
    setIsTypeOpen(false);
    setActiveButton('date');
  };

  return (
    <div className='filters-popup-container'>
      <div className={`filters-buttons-container ${isFilterOpen || isTypeOpen || isDateOpen ? 'open' : ''}`}>
        <button
          className={`monument-filter-button ${isFilterOpen ? 'open' : ''}`}
          onClick={toggleFilterButton}
        >
          Фильтры
        </button>
        <button
          className={`monument-popup-button ${isPopupOpen ? 'open' : ''}`}
          onClick={togglePopupButton}
        >
          О памятнике
        </button>
        {isFilterOpen && (
          <div className="dropdown-menu">
            <button
              className={`monument-type-button ${isTypeOpen ? 'open' : ''}`}
              onClick={toggleTypeButton}
            >
              Тип
            </button>
            <div className={`dropdown-content ${isTypeOpen ? 'open' : ''}`}>
              {/* Код для списка типов */}
              {categories.map((category, index) => (
                <div key={index}>
                  <input 
                    type="checkbox" 
                    id={`category-${index}`} 
                    value={category} 
                    onChange={handleCategoryChange} 
                    checked={selectedCategories.includes(category)} 
                  />
                  <label htmlFor={`category-${index}`}>{category}</label>
                </div>
              ))}
            </div>
            <button
              className={`monument-date-button ${isDateOpen ? 'open' : ''}`}
              onClick={toggleDateButton}
            >
              Датировка
            </button>
            {/* Здесь можно добавить список для датировки */}
          </div>
        )}
      </div>
      {isPopupOpen && (
        <div className="popup-content">
          {/* Ваш код для попапа */}
          <p>Это кнопка попап</p>
        </div>
      )}
    </div>
  );
};

export default FilterPopupPage;
