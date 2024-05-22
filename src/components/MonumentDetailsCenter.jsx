import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config.jsx';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import '../styles/MonumentDetailsCenter.css';
import LinkLogo from '../assets/link-icon.png';

const MonumentDetailsCenter = ({ id }) => {
  const [monumentData, setMonumentData] = useState(null);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMonumentData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/monuments/${id}/`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных о памятнике');
        }
        const data = await response.json();
        setMonumentData(data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchMonumentData();
  }, [id]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setSliderVisible(true);
  };

  return monumentData ? (
    <div className='monument-detail-container'>
      <button className='button-monument'>О памятнике</button>
      <h2 className='monument-title'>{monumentData.name}</h2>
      <div className='monument-type'>
        <h4><strong>Тип:</strong></h4>
        {monumentData.classification_category.map((category, index) => (
          <button key={index} className="category-button">{category}</button>
        ))}
      </div>
      <div className='monument-dating'>
        <h4><strong>Датировка:</strong></h4>
        {monumentData.dating.map((dating, index) => (
          <button key={index} className="dating-button">{dating}</button>
        ))}
      </div>
      <div className='monument-custom-category'>
        <p><strong>Кастомные категории:</strong> {monumentData.custom_category.join(', ')}</p>
      </div>
      <div className='monument-description'>
        <p><strong>Описание:</strong></p>
         {/* Используем dangerouslySetInnerHTML для вставки HTML-разметки из markerInfo.description */}
        <div dangerouslySetInnerHTML={{ __html: markerInfo.description }} /> 
      </div>
      <div className='monument-authors'>
        <p><strong>Авторы:</strong> {monumentData.authors.join(', ')}</p>
      </div>
      <div className='monument-organization'>
        <p><strong>Организации:</strong> {monumentData.organizations.join(', ')}</p>
      </div>
      <div className='monument-research-years'>
        <p>
            <strong>Годы исследований:</strong> {markerInfo.research_years.sort((a, b) => a - b).join(', ')}
        </p>
      </div>
      <div className='monument-address'> 
        <p><strong>Местоположение:</strong> {monumentData.address}</p>
      </div>
      <div className='monument-sources'>
        <p><strong>Источники:</strong></p>
          <ul>
            {Object.entries(monumentData.sources).map(([title, link], index) => (
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
     <div className='monument-content'>
      <p><strong>Контент:</strong></p>
        <ul>
          {Object.entries(monumentData.content).map(([title, link], index) => (
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
      <div className="monument-details-section">
        <h3 className="monument-details-section-title">Галлерея:</h3>
        <div className="monument-images-container">
          {monumentData.images.map((image, index) => (
            <div key={index} className="monument-image" onClick={() => handleImageClick(index)}>
              <img src={`${API_BASE_URL}/${image.image}`} alt={image.description} />
            </div>
          ))}
        </div>
      </div>

      {sliderVisible && (
        <div className="photo-slider-overlay">
          <PhotoSlider
            images={monumentData.images.map((image) => ({
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
  ) : (
    <div className="monument-details-loading">Loading...</div>
  );
};

export default MonumentDetailsCenter;
