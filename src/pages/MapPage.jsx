import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.css';
import useMonumentsData from '../components/useMonumentsData';
// import markerIcon from '../assets/minimarker_yellow.png';
import FilterPopupPage from './FilterPopupPage';
import { Link } from 'react-router-dom';
import closeMenuIcon from '../assets/close-icon.png';

import redMarker from '../assets/minimarker_red.png';
import yellowMarker from '../assets/minimarker_yellow.png';
import blueMarker from '../assets/minimarker_blue.png';
import greenMarker from '../assets/minimarker_green.png';

const markerIcon = {
  'Красный кружок': L.icon({ iconUrl: redMarker, iconSize: [10, 10], iconAnchor: [0, 0] }),
  'Желтый кружок': L.icon({ iconUrl: yellowMarker, iconSize: [10, 10], iconAnchor: [0, 0] }),
  'Синий кружок': L.icon({ iconUrl: blueMarker, iconSize: [10, 10], iconAnchor: [0, 0] }),
  'Зеленый кружок': L.icon({ iconUrl: greenMarker, iconSize: [10, 10], iconAnchor: [0, 0] })
};





// const customMarkerIcon = L.icon({
//   iconUrl: markerIcon,
//   iconSize: [10, 10],
//   iconAnchor: [0, 0],
// });

function MapPage() {
  const {
    monuments,
    categories,
    selectedCategories,
    dating,
    selectedDating,
    customCategories,
    selectedCustomCategories,
    handleClearSelectionChange,
    handleCategoryChange,
    handleDatingChange,
    handleCustomCategoryChange
  } = useMonumentsData();
  
  const maxBounds = [
    [59.3, 28.5],
    [60.9, 32.0]
  ];
  
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedExcavationSquare, setSelectedExcavationSquare] = useState(null);

  const handleMarkerClick = (markerInfo) => {
    console.log('Marker clicked:', markerInfo);
    setSelectedMarkerInfo(markerInfo);
    if (markerInfo.excavations_square && markerInfo.excavations_square.length > 0) {
      console.log('Excavation Square:', markerInfo.excavations_square[0]);
      setSelectedExcavationSquare(markerInfo.excavations_square[0]);
    } else {
      setSelectedExcavationSquare(null);
    }
  };

  const filteredMarkers = monuments.filter(monument => {
    if (selectedCategories.length === 0 && selectedDating.length === 0 && selectedCustomCategories.length === 0) {
      return true;
    }

    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => monument.classification_category.includes(category));
    const dateMatch = selectedDating.length === 0 || selectedDating.some(date => monument.dating.includes(date));
    const customCategoryMatch = selectedCustomCategories.length === 0 || selectedCustomCategories.some(customCategory => monument.custom_category.includes(customCategory));
    
    return categoryMatch && dateMatch && customCategoryMatch;
  });

  useEffect(() => {
    console.log('Selected Excavation Square updated:', selectedExcavationSquare);
  }, [selectedExcavationSquare]);

  return (
    <>
      {!showInfo && <button className="filter-popup-button-mobile" onClick={() => setShowInfo(!showInfo)}>Фильтры и информация о памятнике</button>}
      <div className={`info-text ${showInfo ? 'show' : ''}`}>
        
        <FilterPopupPage
          categories={categories}
          selectedCategories={selectedCategories}
          dating={dating}
          selectedDating={selectedDating}
          customCategories={customCategories} 
          selectedCustomCategories={selectedCustomCategories} 
          handleClearSelectionChange={handleClearSelectionChange}
          handleCategoryChange={handleCategoryChange}
          handleDatingChange={handleDatingChange}
          handleCustomCategoryChange={handleCustomCategoryChange} 
          selectedMarkerInfo={selectedMarkerInfo}
        />
        <div className="close-button" onClick={() => setShowInfo(false)}>
          <img src={closeMenuIcon} alt="Close icon" className="close-icon" />
        </div>
      </div>
      <div className="map-container">
        <MapContainer 
          center={[59.95, 30.15]} 
          zoom={10}
          minZoom={9}
          style={{ height: "85vh" }}
          maxBounds={maxBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredMarkers.map(monument => (
            <Marker
              key={monument.id}
              position={[monument.latitude, monument.longitude]}
              icon={markerIcon[monument.icon_choice] || markerIcon['Красный кружок']}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(monument);
                }
              }}
            >
              <Popup>
                <strong>Название:</strong> {monument.name} <br />
                <strong>Датировка:</strong> {monument.dating.join(', ')} <br />
                <strong>Категория:</strong> {monument.classification_category.join(', ')} <br />
                <strong>Адрес:</strong> {monument.address} <br />
                <Link to={`/monument/${monument.id}`}>Читать подробнее</Link>
              </Popup>
            </Marker>
          ))}
          {selectedExcavationSquare && (
            <Polygon positions={selectedExcavationSquare} />
          )}
        </MapContainer>
      </div>
      <div className='filters-popup-container'>
        <FilterPopupPage
          categories={categories}
          selectedCategories={selectedCategories}
          dating={dating}
          selectedDating={selectedDating}
          customCategories={customCategories} 
          selectedCustomCategories={selectedCustomCategories} 
          handleClearSelectionChange={handleClearSelectionChange}
          handleCategoryChange={handleCategoryChange}
          handleDatingChange={handleDatingChange}
          handleCustomCategoryChange={handleCustomCategoryChange} 
          selectedMarkerInfo={selectedMarkerInfo}
        />
      </div>
    </>
  );
}

export default MapPage;
