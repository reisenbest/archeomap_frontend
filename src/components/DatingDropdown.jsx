import React from 'react';

{/* Код берет из useMonumentsData данные, отбирает отттуда датировки и отображает их 
также отслеживает выбранные категории*/}
const DatingDropdown = ({ dating, isDateOpen, toggleDateButton, handleDatingChange, selectedDating }) => {
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
                id={`date-${index}`} 
                value={date} 
                onChange={handleDatingChange} 
                checked={selectedDating.includes(date)}
              />
              <label htmlFor={`date-${index}`}>{date}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatingDropdown;
