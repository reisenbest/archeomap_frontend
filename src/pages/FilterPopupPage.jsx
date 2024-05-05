import React, { useState, useEffect } from 'react';
import TypeDropdown from '../components/TypeDropdown';
import DatingDropdown from '../components/DatingDropdown'; // Импортируем компонент DatingDropdown
import PopupContent from '../components/PopupContent';

const FilterPopupPage = ({ categories, dating, selectedCategories, selectedDating, handleClearSelectionChange, handleCategoryChange, handleDatingChange, selectedMarkerInfo }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [markerInfo, setMarkerInfo] = useState(null);

  useEffect(() => {
    // Обновляем информацию о маркере при изменении выбранного маркера
    setMarkerInfo(selectedMarkerInfo);
  }, [selectedMarkerInfo]);

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
    setActiveButton('type');
  };

  const toggleDateButton = () => {
    setIsDateOpen(!isDateOpen);
    setActiveButton('date');
  };

  return (
    <>
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
          <>
            <TypeDropdown
              categories={categories}
              handleCategoryChange={handleCategoryChange}
              selectedCategories={selectedCategories}
              isTypeOpen={isTypeOpen}
              toggleTypeButton={toggleTypeButton}
            />
            
            {/* Используем DatingDropdown */}
            <DatingDropdown
              dating={dating}
              isDateOpen={isDateOpen}
              toggleDateButton={toggleDateButton}
              handleDatingChange={handleDatingChange}
              selectedDating={selectedDating}
            />
          </>
        )}
      </div>


        {isPopupOpen &&
         <PopupContent markerInfo={markerInfo} />} {/* Используем компонент PopupContent */}

</>
  );
};

export default FilterPopupPage;
