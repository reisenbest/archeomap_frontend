import React, { useState } from 'react';
import '../styles/HowToUsePage.css'; 
import { Link } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import navigation from '../assets/how-to-use/navigation/nav.jpg';
import navigationMobile from '../assets/how-to-use/navigation/nav-mobile.jpg';

import mapGeneral from '../assets/how-to-use/map/general.jpg';
import mapContent from '../assets/how-to-use/map/content.jpg';
import mapFilters from '../assets/how-to-use/map/filters.jpg';
import mapGeneralMobile from '../assets/how-to-use/map/general-mobile.jpg';
import mapContentMobile from '../assets/how-to-use/map/content-mobile.jpg';
import mapFiltersMobile from '../assets/how-to-use/map/filters-mobile.jpg';

import monumentsSearchBefore from '../assets/how-to-use/monumentlist/search-monument-before.jpg';
import monumentsSearchAfter from '../assets/how-to-use/monumentlist/search-monument-after.jpg';

import sourcesMainCategory from '../assets/how-to-use/sourceslist/main-section-choice.jpg';
import sourcesSubCategoryBefore from '../assets/how-to-use/sourceslist/sub-section-content.jpg';
import sourcesSubCategoryAfter from '../assets/how-to-use/sourceslist/sub-section-search.jpg';



// раздел отрисовывает раздел как польззваться


function HowToUsePage() {

  const [showText, setShowText] = useState({
    navigation: false,
    map: false,
    monumentslist: false,
    sourceslist: false,
  });

  const toggleText = (section) => {
    setShowText(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  return (
    <div className="how-to-use-container">
      <div className="how-to-use-center-col">
        <h1>Руководство по использованию ресурса</h1>
        <div className='how-to-use-introductory-text-section'>
          <p>
          Здесь мы подробно объясним, как использовать различные функции и возможности, 
          чтобы максимально эффективно и комфортно пользоваться нашим ресурсом.
          </p>
          <p>
          Мы приложили все усилия, чтобы сделать интерфейс как можно более интуитивно понятным. 
          Однако, учитывая отсутствие опыта в разработке подобных проектов, 
          мы подготовили это руководство. 
          </p>
        </div>

        <div>
          <h2 className="how-to-use-section-title" onClick={() => toggleText('navigation')}>
            <span className="how-to-use-section-header-text">Навигация по сайту</span>
          </h2>
          {showText.navigation && (
            <span className="how-to-use-section-content">
              <p>
                Навигация по разделам сайта осуществляется посредством меню в верхней и нижней части сайта.
              </p>
              <p>
              <PhotoProvider>
                <PhotoView src={navigation}>
                  <img src={navigation} className="how-to-use-image-wide" alt="Меню для навигации по сайту" />
                </PhotoView>
                </PhotoProvider>
              </p>
              <p>
                Для мобильных устройств меню доступно при клике на соответствующую иконку
                 (три горизонтальных полосы).
              </p>
              <p>
              <PhotoProvider>
                <PhotoView src={navigationMobile}>
                  <img src={navigationMobile} className="how-to-use-image-high" alt="Меню для навигации по сайту. Мобильная версия" />
                </PhotoView>
                </PhotoProvider>
              </p>
            </span>
          )}
        </div>

        <div>
          <h2 className="how-to-use-section-title" onClick={() => toggleText('map')}>
            <span className="how-to-use-section-header-text">Карта</span>
          </h2>
          {showText.map && (
            <span className="how-to-use-section-content">
              <p>
              При открытии раздела <Link to="/map" className="link">Карта</Link> вы увидите, что содержимое разделено на две части.
               Слева находится непосредственно карта, где каждая точка обозначает памятник археологии.
               В правой части экрана находятся кнопки, отвечающие за показ подробной информации о памятнике
                (<i><b>«О памятнике»</b></i>), и за фильтрацию (<i><b>«Фильтры»</b></i>).
              </p>
              <p>
              <PhotoProvider>
                <PhotoView src={mapGeneral}>
                  <img src={mapGeneral} className="how-to-use-image" alt='Общий вид раздела "Карта"' />
                </PhotoView>
                </PhotoProvider>
              </p>
              <p>
              При клике на точку вам откроется краткая информация в виде окна с текстом на самой карте, 
              а также более полная информация о памятнике в правой части экрана.
              </p>
              <p>
              <PhotoProvider>
                <PhotoView src={mapContent}>
                  <img src={mapContent} className="how-to-use-image" alt='Раздел "Карта". Контент.' />
                </PhotoView>
                </PhotoProvider>
              </p>
              <p>
              При клике на кнопку <i><b>«Фильтры»</b></i> в правой части экрана вы увидите категории,
              по которым можно отфильтровать содержимое карты. Сбросить <b>ВСЕ</b> фильтры можно, нажав на кнопку <i><b>«Сбросить все фильтры»</b></i>.
              </p>
              <p>
              <PhotoProvider>
                <PhotoView src={mapFilters}>
                  <img src={mapFilters} className="how-to-use-image" alt='Раздел "Карта". Фильтры.' />
                </PhotoView>
                </PhotoProvider>
              </p>
              <p>
              Дополнительная категория предназначена для выделения определённых объектов, которые имеют особую значимость
               или интерес для археологии Санкт-Петербурга и являются уникальными в своём роде. 
               Она не применяется ко всем объектам, а используется лишь для некоторых. 
               Эта категория нужна, чтобы подчеркнуть их особое историческое, культурное или 
               археологическое значение. 
              </p>
              <p>
              Для мобильных устройств раздел <Link to="/map" className="link">Карта</Link> выглядит немного иначе.
               Весь функционал, располагавшийся в правой части экрана (<i><b>"Фильтры"</b></i>, <i><b>«О памятнике»</b></i>), 
               теперь доступен при клике на кнопку <i><b>«Фильтры и информация о памятнике» в верхнем правом углу карты</b></i>.
              </p>
              <p>
              <PhotoProvider>
                <PhotoView src={mapGeneralMobile}>
                  <img src={mapGeneralMobile} className="how-to-use-image-high" alt='Общий вид раздела "Карта". Мобильная версия' />
                </PhotoView>
                <PhotoView src={mapContentMobile}>
                  <img src={mapContentMobile} className="how-to-use-image-high" alt='Раздел "Карта". Контент. Мобильная версия' />
                </PhotoView>
                <PhotoView src={mapFiltersMobile}>
                  <img src={mapFiltersMobile} className="how-to-use-image-high" alt='Раздел "Карта". Фильтры. Мобильная версия' />
                </PhotoView>
                </PhotoProvider>
              </p>
            </span>
          )}
        </div>

        <div>
          <h2 className="how-to-use-section-title" onClick={() => toggleText('monumentslist')}>
            <span className="how-to-use-section-header-text">Список памятников</span>
          </h2>
          {showText.monumentslist && (
            <span className="how-to-use-section-content">
              <p>
                Данный <Link to="/monumentslist" className="link">раздел</Link> содержит список памятников, представленных на карте и отсортированных в алфавитном порядке.
                При клике на название памятника вы перейдете на страницу с подробной информацией о выбранном памятнике.
                Также в данном разделе доступен поиск по ключевым словам. При вводе поискового запроса автоматически будут
                 показаны памятники, в названии которых есть частичное или полное совпадение с поисковым запросом.
              </p>
              <p>
                <PhotoProvider>
                  <PhotoView src={monumentsSearchBefore}>
                    <img src={monumentsSearchBefore} className="how-to-use-image-wide" alt='Раздел "Список памятников".' />
                  </PhotoView>
                  <PhotoView src={monumentsSearchAfter}>
                    <img src={monumentsSearchAfter} className="how-to-use-image-wide" alt='Раздел "Список памятников". Поиск.' />
                  </PhotoView>
                </PhotoProvider>
              </p>
            </span>
          )}
        </div>

        <div>
          <h2 className="how-to-use-section-title" onClick={() => toggleText('sourceslist')}>
            <span className="how-to-use-section-header-text">Источники</span>
          </h2>
          {showText.sourceslist && (
            <span className="how-to-use-section-content">
              <p>
              Данный <Link to="/bibliographylist" className="link">раздел</Link> содержит список источников по городской археологии и археологии Санкт-Петербурга.
              </p>
              <p>
                Для начала вам необходимо выбрать нужный раздел.
              </p>
              <p>
                <PhotoProvider>
                  <PhotoView src={sourcesMainCategory}>
                    <img src={sourcesMainCategory} className="how-to-use-image-wide" alt='Раздел "Источники". Выбор главного раздела.' />
                  </PhotoView>
                </PhotoProvider>
              </p>
              <p>
              В разделе будет доступен выбор категории источника 
              (книги, статьи и т.д.). Содержимое появится при клике на категорию.
              </p>
              <p>
              Также после выбора раздела вам будет доступен поиск по ключевым словам. П
              ри вводе поискового запроса внутри подразделов будут показываться только те источники, в названии которых есть частичное или полное совпадение с запросом.
               Отдельного поиска внутри подразделов нет.
              </p>
              <p>
              Наличие значка лупы справа от названия источника говорит о том, 
              что источник доступен в интернете. При клике на значок лупы вы перейдете к нему.
              </p>
              <p>
              <PhotoProvider>
                <PhotoView src={sourcesSubCategoryBefore}>
                  <img src={sourcesSubCategoryBefore} className="how-to-use-image" alt='Раздел "Источники". Подразделы.' />
                </PhotoView>
                <PhotoView src={sourcesSubCategoryAfter}>
                  <img src={sourcesSubCategoryAfter} className="how-to-use-image" alt='Раздел "Источники". Подразделы. Поиск.' />
                </PhotoView>
                </PhotoProvider>
              </p>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default HowToUsePage;