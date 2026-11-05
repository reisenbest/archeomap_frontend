/*
 * Полная карточка памятника. Получает id из MonumentDetailsPage и загружает одну запись API.
 * Содержимое похоже на PopupContent, но это отдельная страница с отдельным запросом.
 * Меняя поля карточки, проверьте также PopupContent, если изменения нужны и на карте.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL, ENABLE_MONUMENT_ARTICLES } from '../config.jsx';
import MonumentArticle, { hasArticle } from './article/MonumentArticle';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import LinkLogo from '../assets/link-icon.png';
import { Link } from 'react-router-dom';



const MonumentDetailsCenter = ({ id }) => {
  const [monumentData, setMonumentData] = useState(null);
  // sliderVisible хранит, открыт ли просмотр фотографий; currentIndex — номер фото, начиная с нуля.
  const [sliderVisible, setSliderVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const showArticle = useMemo(() => ENABLE_MONUMENT_ARTICLES && hasArticle(monumentData?.article), [monumentData?.article]);

  // При первом открытии и при изменении id запрашиваем выбранный памятник.
  // fetch сам не считает HTTP-ошибку исключением, поэтому отдельно проверяем response.ok.
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

  // Запоминаем номер нажатой миниатюры и открываем просмотр именно с неё.
  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setSliderVisible(true);
  };

  // Если данные есть, показываем карточку; иначе — Loading в конце разметки.
  // Сейчас ошибка только выводится в консоль, поэтому после неудачного запроса Loading остаётся на экране.
  return monumentData ? (
    <div className='monument-detail-container'>
      <div className='monument-button'>
        <Link to="/map" > 
        <button className="button-back-to-map">Перейти на карту</button>
        </Link> 
      </div>
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
      <h4><strong>Дополнительная категория:</strong></h4>
        {monumentData.custom_category.map((custom_category, index) => (
          <button key={index} className="custom-category-button">{custom_category}</button>
        ))}
      </div>
      {showArticle ? <MonumentArticle key={id} html={monumentData.article} /> : <div className='monument-description'>
        <p><strong>Описание:</strong></p>
         {/* HTML-описание этой страницы берётся из monumentData.description */}
        {/* Описание приходит как HTML с форматированием. Передавайте сюда только очищенную на сервере разметку: React вставляет её напрямую. */}
        <MonumentArticle key={id} html={monumentData.description} compact />
      </div>}
      {/* <div className='monument-authors'>
        <p><strong>Авторы:</strong> {monumentData.authors.join(', ')}</p>
      </div> */}
      <div className='monument-organization'>
        <p><strong>Организации:</strong> {monumentData.organizations.join(', ')}</p>
      </div>
      <div className='monument-research-years'>
        <p>
            <strong>Годы исследований:</strong> {monumentData.research_years.sort((a, b) => a - b).join(', ')}
        </p>
      </div>
      <div className='monument-address'> 
        <p><strong>Местоположение:</strong> {monumentData.address}</p>
      </div>

      <div className='monument-landmark'> 
        <p><strong>Современное обустройство:</strong> {monumentData.landmark}</p>
      </div>
      {/* Галерея: миниатюры берутся из images, полный адрес фото собирается из API_BASE_URL и image.image. */}
      {!showArticle && <div className="monument-details-section">
        <h3 className="monument-details-section-title">Галерея:</h3>
        <div className="monument-images-container">
          {monumentData.images.map((image, index) => (
            <div key={index} className="monument-image" onClick={() => handleImageClick(index)}>
              <img src={`${API_BASE_URL}/${image.image}`} alt={image.description} />
            </div>
          ))}
        </div>
      </div>}

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

      <div className='monument-content'>
      <p><strong>Контент:</strong></p>
        <ul>
          {/* Object.entries превращает объект в пары «название — ссылка». Пустая ссылка оставляет только название. */}
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


    </div>
  ) : (
    <div className="monument-details-loading">Loading...</div>
  );
};

export default MonumentDetailsCenter;
