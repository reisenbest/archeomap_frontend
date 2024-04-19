import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.css';
import useMonumentsData from '../components/useMonumentsData';
import markerIcon from '../assets/minimarker.png'; // Импортируем изображение маркера
import FilterPopupPage from './FilterPopupPage';
import { Link } from 'react-router-dom';

const customMarkerIcon = L.icon({
  iconUrl: markerIcon, // Указываем URL изображения
  iconSize: [9, 9], // Размеры изображения маркера
  iconAnchor: [0, 0], // Точка привязки маркера к координатам
});

function MapPage() {
  const {
    monuments,
    categories,
    selectedCategories,
    handleCategoryChange,
    handleClearSelectionChange
  } = useMonumentsData();
  
  const maxBounds = [
    [59.3, 28.5],
    [60.9, 32.0]
  ];

  const filteredMarkers = monuments.filter(monument => {
    if (selectedCategories.length === 0) {
      return true;
    }
    return monument.classification_category.some(category => selectedCategories.includes(category));
  });

  return (
    <>
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
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}"
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            ext='png'
          />
          {filteredMarkers.map(monument => (
            <Marker
              key={monument.id}
              position={[monument.latitude, monument.longitude]}
              icon={customMarkerIcon}
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
      
      <FilterPopupPage
        categories={categories}
        selectedCategories={selectedCategories}
        handleClearSelectionChange={handleClearSelectionChange}
        handleCategoryChange={handleCategoryChange}
       />

    </>
  );
};

export default MapPage;
