/*
 * Страница карты: загрузка памятников → фильтрация → точки → сведения о выбранной точке.
 * Leaflet рисует карту, react-leaflet позволяет управлять ею через компоненты React.
 * Положение карты задаётся в MapContainer, цвета точек — в markerIcon, оформление — в MapPage.css.
 */
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPage.css';
import useMonumentsData from '../components/useMonumentsData';
import FilterPopupPage from './FilterPopupPage';
import { Link } from 'react-router-dom';
import closeMenuIcon from '../assets/close-icon.png';

import redMarker from '../assets/minimarker_red.png';
import yellowMarker from '../assets/minimarker_yellow.png';
import blueMarker from '../assets/minimarker_blue.png';
import greenMarker from '../assets/minimarker_green.png';

// Обычные значки: цвет выбирается по данным памятника.
const markerIcon = {
  'Красный кружок': L.icon({ iconUrl: redMarker, iconSize: [10, 10], iconAnchor: [0, 0] }),
  'Желтый кружок': L.icon({ iconUrl: yellowMarker, iconSize: [10, 10], iconAnchor: [0, 0] }),
  'Синий кружок': L.icon({ iconUrl: blueMarker, iconSize: [10, 10], iconAnchor: [0, 0] }),
  'Зеленый кружок': L.icon({ iconUrl: greenMarker, iconSize: [10, 10], iconAnchor: [0, 0] })
};

// Для каждого значка один раз создаём вариант с подсветкой.
// Картинка остаётся внутри обёртки, а кольцо и пульсацию рисует CSS.
const selectedMarkerIcons = Object.fromEntries(
  Object.entries(markerIcon).map(([choice, icon]) => [choice, L.divIcon({
    ...icon.options,
    className: 'selected-monument-marker',
    html: `<img src="${icon.options.iconUrl}" alt="" class="selected-monument-marker__image" />`
  })])
);






// Leaflet должен обновлять плитки и центр при изменении ширины контейнера.
function MapResizeSync() {
  const map = useMap();

  useEffect(() => {
    let frame;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        map.invalidateSize({ animate: false, debounceMoveend: true });
      });
    });
    observer.observe(map.getContainer());
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [map]);

  return null;
}

function MapPage() {
  // Получаем массив памятников, доступные варианты фильтров и функции для изменения выбора.
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
  
  // Ограничиваем область, за которую нельзя увести карту.
  const maxBounds = [
    [59.3, 28.5],
    [60.9, 32.0]
  ];
  
  // Выбранный памятник нужен для подсветки точки и панели с описанием.
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  // Открыта ли панель на узком экране.
  const [showInfo, setShowInfo] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  // Координаты выбранного контура раскопа. null означает, что рисовать контур не нужно.
  const [selectedExcavationSquare, setSelectedExcavationSquare] = useState(null);

  // При выборе точки показываем её данные и первый контур раскопа, если он есть.
  const handleMarkerClick = (markerInfo) => {
    console.log('Marker clicked:', markerInfo);
    setSelectedMarkerInfo(markerInfo);
    setIsPanelCollapsed(false);
    if (markerInfo.excavations_square && markerInfo.excavations_square.length > 0) {
      console.log('Excavation Square:', markerInfo.excavations_square[0]);
      setSelectedExcavationSquare(markerInfo.excavations_square[0]);
    } else {
      setSelectedExcavationSquare(null);
    }
  };

  // Внутри каждого фильтра достаточно одного совпадения.
  // Если заполнено несколько фильтров, памятник должен подходить под каждый.
  // Пустой фильтр не ограничивает выбор.
  const filteredMarkers = monuments.filter(monument => {
    if (selectedCategories.length === 0 && selectedDating.length === 0 && selectedCustomCategories.length === 0) {
      return true;
    }

    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => monument.classification_category.includes(category));
    const dateMatch = selectedDating.length === 0 || selectedDating.some(date => monument.dating.includes(date));
    const customCategoryMatch = selectedCustomCategories.length === 0 || selectedCustomCategories.some(customCategory => monument.custom_category.includes(customCategory));
    
    return categoryMatch && dateMatch && customCategoryMatch;
  });

  // Выводим выбранный контур в консоль для отладки.
  useEffect(() => {
    console.log('Selected Excavation Square updated:', selectedExcavationSquare);
  }, [selectedExcavationSquare]);

  return (
    <div className={`map-layout ${isPanelCollapsed ? 'map-layout--collapsed' : ''}`}>
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
        <button type="button" className="close-button" aria-label="Закрыть панель" onClick={() => setShowInfo(false)}>
          <img src={closeMenuIcon} alt="" className="close-icon" />
        </button>
      </div>
      <div className="map-container">
        {/* center — [широта, долгота], zoom — начальное приближение, minZoom — предел отдаления. maxBounds ограничивает перемещение. */}
        <MapContainer 
          center={[59.95, 30.15]} 
          zoom={10}
          minZoom={9}
          style={{ height: "100%" }}
          maxBounds={maxBounds}
          maxBoundsViscosity={1.0}
        >
          <MapResizeSync />
          {/* Подложка карты загружается небольшими картинками из OpenStreetMap. {z}, {x}, {y} библиотека заменяет координатами плитки. */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Выбранной точке даём значок с подсветкой и повышаем её слой.
              Если тип значка неизвестен, используем красный. */}
          {filteredMarkers.map(monument => (
            <Marker
              key={monument.id}
              position={[monument.latitude, monument.longitude]}
              icon={selectedMarkerInfo?.id === monument.id
                ? selectedMarkerIcons[monument.icon_choice] || selectedMarkerIcons['Красный кружок']
                : markerIcon[monument.icon_choice] || markerIcon['Красный кружок']}
              zIndexOffset={selectedMarkerInfo?.id === monument.id ? 1000 : 0}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(monument);
                }
              }}
            >
              {/* Обычное окно Leaflet: размер зависит от текста, ограничения высоты и прокрутки нет.
                  Класс меняет только цвета и шрифт, сохраняя первоначальное расположение строк. */}
              <Popup className="monument-map-popup">
                <strong>Название:</strong> <span className="monument-map-popup__name">{monument.name}</span> <br />
                <strong>Датировка:</strong> {monument.dating?.join(', ') || 'Не указана'} <br />
                <strong>Категория:</strong> {monument.classification_category?.join(', ') || 'Не указана'} <br />
                <strong>Адрес:</strong> {monument.address || 'Не указан'} <br />
                <Link to={`/monument/${monument.id}`}>Читать подробнее</Link>
              </Popup>
            </Marker>
          ))}
          {/* Рисуем только первый контур выбранного памятника. Изменение фильтров само по себе не сбрасывает этот выбор. */}
          {selectedExcavationSquare && (
            <Polygon positions={selectedExcavationSquare} />
          )}
        </MapContainer>
      </div>
      {/* Постоянная боковая панель для широкого экрана. */}
      <button
        type="button"
        className="map-panel-toggle"
        onClick={() => setIsPanelCollapsed(collapsed => !collapsed)}
        aria-expanded={!isPanelCollapsed}
        aria-controls="desktop-map-panel"
        aria-label={isPanelCollapsed ? 'Показать информационную панель' : 'Скрыть информационную панель'}
        title={isPanelCollapsed ? 'Показать панель' : 'Скрыть панель'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d={isPanelCollapsed ? 'M15 5L8 12L15 19' : 'M9 5L16 12L9 19'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id="desktop-map-panel"
        className="filters-popup-container"
        aria-hidden={isPanelCollapsed}
        inert={isPanelCollapsed ? '' : undefined}
      >
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
    </div>
  );
}

export default MapPage;

