// компонент отрисовывает страничку об авторах

import React from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import alexeyPhoto from '../assets/alexey-portrait.jpg';
import annaPhoto from '../assets/anna-portrait.jpg';
import '../styles/AboutAuthorsPage.css'; 


function AboutAuthorsPage() {
  return (
    <div className="about-authors-container">
      <div className="about-authors-center-col">
        <h1>Об авторах</h1>
        <p>
          Мы - выпускники кафедры археологии Санкт-Петербургского государственного университета.
           Наше увлечение археологией и любовь к городу и его истории стали источниками вдохновения для создания этого проекта,
            который призван раскрыть богатое наследие археологических наследие Санкт-Петербурга и помочь взглянуть на город и его историю с другой стороны.
        </p>
        
          <div className="author">
          <PhotoProvider>
            <PhotoView src={alexeyPhoto}>
              <img src={alexeyPhoto} className="author-photo" alt="Селин Алексей" />
            </PhotoView>
            </PhotoProvider>
            <div className="author-info">
              <h2>Селин Алексей</h2>
              <p>
                Бакалавр археологии, СПбГУ
                <br />
                Email: drgn96rd@gmail.com
                <br />
                ВКонтакте: <a href="https://vk.com/cannotdefeatreisen" target="_blank" rel="noopener noreferrer">https://vk.com/cannotdefeatreisen</a>
                <br />
                Телеграм: <a href="https://t.me/reisen" target="_blank" rel="noopener noreferrer">@reisen</a>  
              </p>
            </div>
          </div>
          <div className="author">
          <PhotoProvider>
              <PhotoView src={annaPhoto}>
                <img src={annaPhoto} className="author-photo" alt="Пономаренко Анна" />
              </PhotoView>
            </PhotoProvider>
            <div className="author-info">
              <h2>Пономаренко Анна</h2>
              
              <p>
                Бакалавр археологии, СПбГУ
                <br />
                Email: shkiperova.anyuta@yandex.ru
                <br />
                ВКонтакте: <a href="https://vk.com/slonenty" target="_blank" rel="noopener noreferrer">https://vk.com/slonenty</a>
                <br />
                Телеграм: <a href="https://t.me/slonenty" target="_blank" rel="noopener noreferrer">@slonenty</a> 
              </p>
            </div>
          </div>
        
        <p>
          Мы постарались сделать информацию об археологических исследованиях на территории Санкт-Петербурга доступной и интересной для всех,
           кто интересуется историей и культурным наследием города. 
           Надеемся, что представленный ресурс будет полезен как специалистам в области истории и археологии,
            так и обычным людям, интересующимся историей города.
            Так как наш проект находится на начальной стадии развития мы будем рады любым комментариям, вопросам,
            замечаниям, пожеланиям и предложениям связанным как с техническими аспектами 
            (проблемы с отображением информации, баги и т.д.), так и наполнением ресурса. 
            Пожалуйста, не стесняйтесь связаться с нами!  

        </p>
        
      </div>
    </div>
  );
}

export default AboutAuthorsPage;
