/*
 * Фильтр по датировке. Получает список dating, выбранные значения и обработчики через параметры.
 * checked управляет галочкой; includes проверяет, выбрана ли эта датировка.
 * Изменение галочки обрабатывает useMonumentsData, после чего MapPage пересчитывает точки.
 */
import React, { useId } from 'react';


const DatingDropdown = ({ dating, isDateOpen, toggleDateButton, handleDatingChange, selectedDating }) => {
  const inputId = useId();
  return (
    <div className="dropdown-menu">
      <button
        className={`monument-date-button ${isDateOpen ? 'open' : ''}`}
        onClick={toggleDateButton}
      >
        Датировка
        <span className="arrow"></span> 
      </button>
      {isDateOpen && (
        <div className={`dropdown-content ${isDateOpen ? 'open' : ''}`}>
          {/* Код для списка датировок */}
          {dating.map((date, index) => (
            <div key={index} className="checkbox-item">
              <input 
                type="checkbox" 
                id={`${inputId}-${index}`} 
                value={date} 
                onChange={handleDatingChange} 
                checked={selectedDating.includes(date)}
              />
              <label htmlFor={`${inputId}-${index}`}>{date}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatingDropdown;

