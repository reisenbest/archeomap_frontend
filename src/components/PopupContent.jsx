import React, { useState } from 'react';
import { API_BASE_URL } from '../config.jsx';
import { PhotoSlider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const PopupContent = ({ markerInfo }) => {
  const [sliderVisible, setSliderVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setSliderVisible(true);
  };

  // Проверяем, есть ли информация о маркере
  if (!markerInfo) {
    return (
      <div className="popup-content">
        <p>Чтобы получить информацию о памятнике, кликните на соответствующий маркер на карте.</p>
      </div>
    );
  }

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
        <h4><strong>Датировка:</strong></h4>{
        markerInfo.dating.map((dating, index) => (
            <button key={index} className="dating-button">{dating}</button>
          ))}
      </div>
  
      <div className='monument-custom-category'>
        <p><strong>Кастомные категории:</strong> {markerInfo.custom_category.join(', ')}</p>
      </div>
      <div className='monument-description'>
        <p><strong>Описание:</strong> {markerInfo.description}</p>
      </div>
      <div className='monument-authors'>
        <p><strong>Авторы:</strong> {markerInfo.authors.join(', ')}</p>
      </div>
      <div className='monument-organization'>
        <p><strong>Организации:</strong> {markerInfo.organizations.join(', ')}</p>
      </div>
      <div className='monument-research-years'>
        <p><strong>Годы исследований:</strong> {markerInfo.research_years.join(', ')}</p>
      </div>
      <div className='monument-address'> 
        <p><strong>Местоположение:</strong> {markerInfo.address}</p>
      </div>
    <div className='monument-sources'>
      <p><strong>Источники:</strong></p>
        <ul>
          {markerInfo.sources.map((source, index) => (
            <li key={index}>{source}</li>
          ))}
        </ul>
    </div> 
     <div className='monument-content'>
     <p><strong>Контент:</strong></p>
      <ul>
        {markerInfo.content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
     </div>
      
      <div className='monument-image-gallery'>
        <p><strong>Галлерея:</strong></p>
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
                description: image.description // Добавляем описание к фотографии
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
    
    </div>
  );
};

export default PopupContent;
