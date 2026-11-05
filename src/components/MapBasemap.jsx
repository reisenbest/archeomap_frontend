import { useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import 'maplibre-gl/dist/maplibre-gl.css';

export const BASEMAPS = [
  { value: 'osm', label: 'OpenStreetMap' },
  { value: 'positron', label: 'Positron — светлый' },
  { value: 'bright', label: 'Bright' },
  { value: 'bright-custom', label: 'Bright — свой стиль' }
];

const STORAGE_KEY = 'archeomap.basemap';

export function readBasemap() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return BASEMAPS.some(option => option.value === saved) ? saved : 'positron';
  } catch {
    return 'positron';
  }
}

export function saveBasemap(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Карта работает и при запрете браузером локального хранилища.
  }
}

function OpenFreeMapLayer({ style, onUnavailable }) {
  const map = useMap();

  useEffect(() => {
    const layer = maplibreGL({
      // Локальная копия редактируется в public/map-styles/bright-custom.json.
      style: style === 'bright-custom'
        ? `${process.env.PUBLIC_URL}/map-styles/bright-custom.json`
        : `https://tiles.openfreemap.org/styles/${style}`,
      attributionControl: {
        customAttribution: '<a href="https://openfreemap.org/">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    });
    try {
      layer.addTo(map);
    } catch (error) {
      // В браузере без WebGL остаётся доступна обычная растровая карта.
      // Если конструктор WebGL упал, обычный onRemove плагина ещё не применим.
      if (!layer.getMaplibreMap()) {
        layer.onRemove = () => layer.getContainer()?.remove();
      }
      if (map.hasLayer(layer)) map.removeLayer(layer);
      onUnavailable();
      return undefined;
    }
    return () => map.removeLayer(layer);
  }, [map, style, onUnavailable]);

  return null;
}

export default function MapBasemap({ value, onUnavailable }) {
  return value === 'osm' ? (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
  ) : <OpenFreeMapLayer style={value} onUnavailable={onUnavailable} />;
}
