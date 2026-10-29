/*
 * Фильтр по типу памятника. Данные и функции приходят через FilterPopupPage из MapPage.
 * Этот компонент сам не загружает данные: показывает варианты categories и передаёт нажатия наверх.
 * checked показывает галочку, includes проверяет наличие варианта в выбранном списке.
 * onChange передаёт событие с value (вариант) и checked (отмечен ли он).
 */
import React, { useId } from 'react';



const TypeDropdown = ({ categories, selectedCategories, handleCategoryChange, isTypeOpen, toggleTypeButton }) => {
  const inputId = useId();
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
                id={`${inputId}-${index}`} 
                value={category} 
                onChange={handleCategoryChange} 
                checked={selectedCategories.includes(category)}
              />
              <label htmlFor={`${inputId}-${index}`}>{category}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeDropdown;

