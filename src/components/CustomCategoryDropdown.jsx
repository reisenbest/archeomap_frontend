
import React from 'react';

{/* Код берет из useMonumentsData данные, отбирает отттуда кастомные категории и отображает их 
также отслеживает выбранные категории. */}

const CustomCategoryDropdown = ({ customCategories, isCustomCategoryOpen, toggleCustomCategoryButton, handleCustomCategoryChange, selectedCustomCategories }) => {
  return (
    <div className="dropdown-menu">
      <button
        className={`monument-custom-category-button ${isCustomCategoryOpen ? 'open' : ''}`}
        onClick={toggleCustomCategoryButton}
      >
        Дополнительная категория
        <span className="arrow"></span> 
      </button>
      {isCustomCategoryOpen && (
        <div className={`dropdown-content ${isCustomCategoryOpen ? 'open' : ''}`}>
          {/* Код для списка пользовательских категорий */}
          {customCategories.map((category, index) => (
            <div key={index} className="checkbox-item">
              <input 
                type="checkbox" 
                id={`category-${index}`} 
                value={category} 
                onChange={handleCustomCategoryChange} 
                checked={selectedCustomCategories.includes(category)}
              />
              <label htmlFor={`category-${index}`}>{category}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomCategoryDropdown;