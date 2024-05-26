import React, { useState, useEffect } from 'react';
import TypeDropdown from '../components/TypeDropdown';
import DatingDropdown from '../components/DatingDropdown';
import CustomCategoryDropdown from '../components/CustomCategoryDropdown';
import PopupContent from '../components/PopupContent';

//компонент представляет страницу фильтров и всплывающего контента.
 // Он отображает кнопки для открытия фильтров и всплывающего контента,
// а также содержит выпадающие списки для выбора категорий, датировки и пользовательских категорий. 
const FilterPopupPage = ({
  categories,
  dating,
  customCategories,
  selectedCategories,
  selectedDating,
  selectedCustomCategories,
  handleClearSelectionChange,
  handleCategoryChange,
  handleDatingChange,
  handleCustomCategoryChange,
  selectedMarkerInfo
}) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isCustomCategoryOpen, setIsCustomCategoryOpen] = useState(false);
  const [markerInfo, setMarkerInfo] = useState(null);

  useEffect(() => {
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

  const toggleCustomCategoryButton = () => {
    setIsCustomCategoryOpen(!isCustomCategoryOpen);
    setActiveButton('customCategory');
  };

  // Обработчик для сброса всех выбранных фильтров
  const handleClearAllFilters = () => {
    handleClearSelectionChange();
  };

  return (
    <>
      <div className={`filters-buttons-container ${isFilterOpen || isTypeOpen || isDateOpen || isCustomCategoryOpen ? 'open' : ''}`}>
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
          <div className='filter-content'>
          <>
            <TypeDropdown
              categories={categories}
              handleCategoryChange={handleCategoryChange}
              selectedCategories={selectedCategories}
              isTypeOpen={isTypeOpen}
              toggleTypeButton={toggleTypeButton}
            />
            
            <DatingDropdown
              dating={dating}
              isDateOpen={isDateOpen}
              toggleDateButton={toggleDateButton}
              handleDatingChange={handleDatingChange}
              selectedDating={selectedDating}
            />

            <CustomCategoryDropdown
              customCategories={customCategories}
              isCustomCategoryOpen={isCustomCategoryOpen}
              toggleCustomCategoryButton={toggleCustomCategoryButton}
              handleCustomCategoryChange={handleCustomCategoryChange}
              selectedCustomCategories={selectedCustomCategories}
            />

        <button className="clear-all-filters-button" onClick={handleClearAllFilters}>
          Сбросить все фильтры
        </button>
          </>
          </div>
        )}
      </div>

      {isPopupOpen && <PopupContent markerInfo={markerInfo} />}

    </>
  );
};

export default FilterPopupPage;
