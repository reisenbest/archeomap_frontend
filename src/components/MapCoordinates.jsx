import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// Стандартные Control и события Leaflet: вычисления координат выполняет карта.
export default function MapCoordinates() {
  const map = useMap();

  useEffect(() => {
    const control = L.control({ position: 'bottomright' });
    const container = L.DomUtil.create('div', 'map-coordinates leaflet-control');
    const label = L.DomUtil.create('span', 'map-coordinates__label', container);
    label.textContent = 'Координаты · WGS 84';
    const value = L.DomUtil.create('output', 'map-coordinates__value', container);
    value.setAttribute('aria-label', 'Широта и долгота точки на карте');
    // Не озвучиваем каждое движение мыши экранным диктором.
    value.setAttribute('aria-live', 'off');
    const reset = () => { value.textContent = 'Наведите курсор или нажмите на карту'; };
    const update = ({ latlng }) => {
      value.textContent = `Ш: ${latlng.lat.toFixed(5)}° · Д: ${latlng.lng.toFixed(5)}°`;
    };
    reset();
    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);
    control.onAdd = () => container;
    control.addTo(map);
    map.on('mousemove', update);
    map.on('click', update);
    map.on('mouseout', reset);

    return () => {
      map.off('mousemove', update);
      map.off('click', update);
      map.off('mouseout', reset);
      control.remove();
    };
  }, [map]);

  return null;
}
