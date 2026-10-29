/*
 * Содержимое вкладки «О памятнике» на карте. markerInfo — объект выбранной точки из MapPage.
 * Здесь нет отдельного запроса: данные уже загрузил useMonumentsData.
 * Поля карточки и галерея описаны ниже; оформление находится в styles/MapPage.css.
 */

import React, { useState } from 'react';
import { API_BASE_URL } from '../config.jsx';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import LinkLogo from '../assets/link-icon.png';

const PopupContent = ({ markerInfo }) => {
  // sliderVisible хранит, открыт ли просмотр фотографий; currentIndex — номер фото, начиная с нуля.
  const [sliderVisible, setSliderVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Запоминаем номер нажатой миниатюры и открываем просмотр именно с неё.
  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setSliderVisible(true);
  };

  // Пока точка не выбрана, показываем подсказку и не обращаемся к полям отсутствующего объекта.
  if (!markerInfo) {
    return (
      <div className="popup-content">
        <span className="panel-empty-label">Город сквозь время</span><h2 className="panel-empty-title">У каждого места — своя история</h2><p>Выберите точку на карте, чтобы узнать о памятнике, находках и исследованиях. Или откройте фильтры, чтобы найти интересующую эпоху.</p>
      </div>
    );
  }

  // Показываем блок, если есть хотя бы одна категория, отличная от null и NONE.
  // Это проверка всего блока: внутри него ниже всё ещё выводятся все значения массива.
  const hasCustomCategory = markerInfo.custom_category && markerInfo.custom_category.some(category => category !== null && category !== 'NONE');

  return (
    <div className="popup-content">
      <h2>{markerInfo.name}</h2>
      <div className='monument-type'>
        <h4><strong>Тип:</strong></h4>
        {markerInfo.classification_category.map((category, index) => (
          <button key={index} className="category-button">{category}</button>
        ))}
      </div>

      <div className='monument-dating'>
        <h4><strong>Датировка:</strong></h4>
        {markerInfo.dating.map((dating, index) => (
          <button key={index} className="dating-button">{dating}</button>
        ))}
      </div>
      
      {hasCustomCategory && (
        <div className='monument-custom-category'>
          <h4><strong>Дополнительная категория:</strong></h4>
          {markerInfo.custom_category.map((custom_category, index) => (
            <button key={index} className="custom-category-button">{custom_category}</button>
          ))}
        </div>
      )}
      
      <div className='monument-description'>
        <p><strong>Описание:</strong></p>
        {/* Описание приходит как HTML с форматированием. Передавайте сюда только очищенную на сервере разметку: React вставляет её напрямую. */}
        <div dangerouslySetInnerHTML={{ __html: markerInfo.description }} />
      </div>
      
      {/* <div className='monument-authors'>
        <p><strong>Авторы:</strong> {markerInfo.authors.join(', ')}</p>
      </div> */}
      
      <div className='monument-organization'>
        <p><strong>Организации:</strong> {markerInfo.organizations.join(', ')}</p>
      </div>
      
      <div className='monument-research-years'>
        <p><strong>Годы исследований:</strong> {markerInfo.research_years.sort((a, b) => a - b).join(', ')}</p>
      </div>
      
      <div className='monument-address'> 
        <p><strong>Местоположение:</strong> {markerInfo.address}</p>
      </div>

      <div className='monument-landmark'> 
        <p><strong>Современное обустройство:</strong> {markerInfo.landmark}</p>
      </div>
      
      
      
      
      
      {/* Галерея: миниатюры берутся из images, полный адрес фото собирается из API_BASE_URL и image.image. */}
      <div className='monument-image-gallery'>
        <p><strong>Галерея:</strong></p>
        <div className="photo-thumbnails">
          {markerInfo.images.map((image, index) => (
            <img
              key={index}
              className="thumbnail"
              src={`${API_BASE_URL}/${image.image}`}
              alt={image.description}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        
        {sliderVisible && (
          <div className="photo-slider-overlay">
            <PhotoSlider
              images={markerInfo.images.map((image) => ({
                src: `${API_BASE_URL}/${image.image}`,
                key: image.id,
                description: image.description
              }))}
              visible={sliderVisible}
              onClose={() => setSliderVisible(false)}
              index={currentIndex}
              onIndexChange={setCurrentIndex}
              overlayRender={(overlayProps) => (
                <div className='image-description'>
                  <p>{overlayProps.images[currentIndex].description}</p>
                </div>
              )}
            />
          </div>
        )}
      </div>

      <div className='monument-content'>
        <p><strong>Контент:</strong></p>
        <ul>
          {/* Object.entries превращает объект в пары «название — ссылка». Пустая ссылка оставляет только название. */}
          {Object.entries(markerInfo.content).map(([title, link], index) => (
            <li key={index}>
              {title}
              {link && (
                <>
                  {' '}
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <img src={LinkLogo} alt="Link icon" className="source-link-icon" />
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className='monument-sources'>
        <p><strong>Источники:</strong></p>
        <ul>
          {Object.entries(markerInfo.sources).map(([title, link], index) => (
            <li key={index}>
              {title}
              {link && (
                <>
                  {' '}
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <img src={LinkLogo} alt="Link icon" className="source-link-icon" />
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopupContent;

