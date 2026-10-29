import React, { useState, useEffect } from 'react';
import TypeDropdown from '../components/TypeDropdown';
import DatingDropdown from '../components/DatingDropdown';
import CustomCategoryDropdown from '../components/CustomCategoryDropdown';
import PopupContent from '../components/PopupContent';
import alterLogo from '../assets/alter_logo.png';

const FilterPopupPage = ({ categories, dating, customCategories, selectedCategories,
  selectedDating, selectedCustomCategories, handleClearSelectionChange,
  handleCategoryChange, handleDatingChange, handleCustomCategoryChange, selectedMarkerInfo }) => {
  const [activeTab, setActiveTab] = useState('object');
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isDateOpen, setIsDateOpen] = useState(true);
  const [isCustomCategoryOpen, setIsCustomCategoryOpen] = useState(false);
  useEffect(() => {
    if (selectedMarkerInfo) setActiveTab('object');
  }, [selectedMarkerInfo]);
  const selectedCount = selectedCategories.length + selectedDating.length + selectedCustomCategories.length;

  return (
    <>
      <div className="filters-buttons-container">
        <button className={`monument-popup-button ${activeTab === 'object' ? 'open' : ''}`}
          aria-pressed={activeTab === 'object'} onClick={() => setActiveTab('object')}>Об объекте</button>
        <button className={`monument-filter-button ${activeTab === 'filters' ? 'open' : ''}`}
          aria-pressed={activeTab === 'filters'} onClick={() => setActiveTab('filters')}>Фильтры</button>
        {activeTab === 'filters' && (
          <div className="filter-content">
            <div className="filter-summary">
              <span>Выбрано: {selectedCount}</span>
              <button className="clear-all-filters-button" onClick={handleClearSelectionChange}>Сбросить всё</button>
            </div>
            <TypeDropdown categories={categories} selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange} isTypeOpen={isTypeOpen}
              toggleTypeButton={() => setIsTypeOpen(open => !open)} />
            <DatingDropdown dating={dating} selectedDating={selectedDating}
              handleDatingChange={handleDatingChange} isDateOpen={isDateOpen}
              toggleDateButton={() => setIsDateOpen(open => !open)} />
            <CustomCategoryDropdown customCategories={customCategories} selectedCustomCategories={selectedCustomCategories}
              handleCustomCategoryChange={handleCustomCategoryChange} isCustomCategoryOpen={isCustomCategoryOpen}
              toggleCustomCategoryButton={() => setIsCustomCategoryOpen(open => !open)} />
          </div>
        )}
      </div>
      {activeTab === 'object' && <>
        <PopupContent markerInfo={selectedMarkerInfo} />
        {!selectedMarkerInfo && <img className="map-panel-empty-logo" src={alterLogo} alt="Логотип проекта" />}
      </>}
    </>
  );
};
export default FilterPopupPage;
