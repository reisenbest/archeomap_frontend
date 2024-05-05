import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.css';
import useMonumentsData from '../components/useMonumentsData';
import markerIcon from '../assets/minimarker.png';
import FilterPopupPage from './FilterPopupPage';
import { Link } from 'react-router-dom';

const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [9, 9],
  iconAnchor: [0, 0],
});

function MapPage() {
  const {
    monuments,
    categories,
    selectedCategories,
    dating,
    selectedDating,
    handleClearSelectionChange,
    handleCategoryChange,
    handleDatingChange
  } = useMonumentsData();
  
  const maxBounds = [
    [59.3, 28.5],
    [60.9, 32.0]
  ];
  
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleMarkerClick = (markerInfo) => {
    setSelectedMarkerInfo(markerInfo);
  };

  const filteredMarkers = monuments.filter(monument => {
    if (selectedCategories.length === 0 && selectedDating.length === 0) {
      return true;
    }

    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => monument.classification_category.includes(category));
    const dateMatch = selectedDating.length === 0 || selectedDating.some(date => monument.dating.includes(date));
    return categoryMatch && dateMatch;
  });

  return (
    <>
            {!showInfo && <button className="filter-popup-button-mobile" onClick={() => setShowInfo(!showInfo)}>Фильтры и информация о памятнике</button>}
        <div className={`info-text ${showInfo ? 'show' : ''}`}>
              <FilterPopupPage
          categories={categories}
          selectedCategories={selectedCategories}
          dating={dating}
          selectedDating={selectedDating}
          handleClearSelectionChange={handleClearSelectionChange}
          handleCategoryChange={handleCategoryChange}
          handleDatingChange={handleDatingChange}
          selectedMarkerInfo={selectedMarkerInfo}
        />
          <div className="close-button" onClick={() => setShowInfo(false)}>
            <span className="close-line"></span>
            <span className="close-line"></span>
          </div>
        </div>
      <div className="map-container">
        <MapContainer 
          center={[60.1, 30.3]}
          zoom={9}
          minZoom={7}
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
              icon={customMarkerIcon}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(monument);
                }
              }}
            >
              <Popup>
                {monument.name} {monument.slug}
                <br />
                <Link to={`/monument/${monument.id}`}>Читать подробнее</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className='filters-popup-container'>
        <FilterPopupPage
          categories={categories}
          selectedCategories={selectedCategories}
          dating={dating}
          selectedDating={selectedDating}
          handleClearSelectionChange={handleClearSelectionChange}
          handleCategoryChange={handleCategoryChange}
          handleDatingChange={handleDatingChange}
          selectedMarkerInfo={selectedMarkerInfo}
        />
      </div>
    </>
  );
}

export default MapPage;
