import React from 'react';

{/* Код берет из useMonumentsData данные, отбирает отттуда Тип и отображает их 
также отслеживает выбранные категории*/}

const TypeDropdown = ({ categories, selectedCategories, handleCategoryChange, isTypeOpen, toggleTypeButton }) => {
  return (
    <div className="dropdown-menu">
      <button
        className={`monument-type-button ${isTypeOpen ? 'open' : ''}`}
        onClick={toggleTypeButton}
      >
        Тип
        <span className="arrow"></span> {/* Стрелочка */}
      </button>
      {isTypeOpen && (
        <div className={`dropdown-content ${isTypeOpen ? 'open' : ''}`}>
          {categories.map((category, index) => (
            <div key={index} className="checkbox-item">
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
      )}
    </div>
  );
};

export default TypeDropdown;
