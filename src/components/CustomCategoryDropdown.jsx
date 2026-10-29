/*
 * Фильтр дополнительных категорий. Варианты приходят с сервера через родительские компоненты.
 * Компонент показывает галочки и вызывает переданную функцию при изменении выбора.
 * Сам список выбранных значений хранится в useMonumentsData, а не здесь.
 */

import React, { useId } from 'react';



const CustomCategoryDropdown = ({ customCategories, isCustomCategoryOpen, toggleCustomCategoryButton, handleCustomCategoryChange, selectedCustomCategories }) => {
  const inputId = useId();
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
                id={`${inputId}-${index}`} 
                value={category} 
                onChange={handleCustomCategoryChange} 
                checked={selectedCustomCategories.includes(category)}
              />
              <label htmlFor={`${inputId}-${index}`}>{category}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomCategoryDropdown;
