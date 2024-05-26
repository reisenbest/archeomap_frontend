// компонент отрисовывает страничку о проекте
import React, { useState } from 'react';
import '../styles/AboutProjectPage.css'; 
import { Link } from 'react-router-dom';

function AboutProjectPage() {
  const [showText, setShowText] = useState({
    problem: false,
    goals: false,
    structure: false,
    data: false,
    future: false
  });

  const toggleText = (section) => {
    setShowText(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  return (
    <div className="about-project-container">
      <div className="about-project-center-col">
        <h1>О проекте</h1>
        <div className='about-project-introductory-text-section'>
          <p>
            Многие знакомы с историей Санкт-Петербурга и места, на котором он был построен
            только через работы историков, но город активно изучается и археологами, однако,
            результаты этих работ остаются в тени. Разрешить это досадное недоразумение и
            призван этот проект!
          </p>
          <p>
            В этом разделе мы вкратце расскажем структуре и целях проекта, поделимся планами на будущее.
          </p>
          <p>
              Мы надеемся, представленный ресурс будет полезен как специалистам в области истории 
              и археологии, так и обычным людям, интересующимся историей города.
            </p>
            <p>
              Так как наш проект находится на начальной стадии развития мы будем рады любым 
              комментариям, вопросам, замечаниям, пожеланиям и предложениям связанным как с
              техническими аспектами (проблемы с отображением информации, баги и т.д.), так и 
              наполнением ресурса. Пожалуйста, не стесняйтесь  <Link to="/about-authors" className="link">связаться</Link> с нами!  
            </p>
        </div>
        <div>
          <h2 className="about-project-section-title" onClick={() => toggleText('problem')}>
            <span className="about-project-section-header-text">Проблематика</span>
          </h2>
          {showText.problem && (
            <span className="about-project-section-content">
              <p>
                В археологии Санкт-Петербурга существует ряд проблем как в
                академической сфере в среде ученых, так и в сфере популяризации знания.
              </p>
              <p>
                К настоящему времени на территории Петербурга проведено множество археологических исследований,
                однако люди большинство людей о них почти не знают, кроме того, отсутствует
                единый «банк знаний» об археологии Санкт-Петербурга, материалы разрознены и часто труднодоступны.
              </p>
              <p>
                В попытке решить эти проблемы и родилась идея создать  <Link to="/" className="link">ресурс</Link> по археологии Санкт-Петербурга.
              </p>
            </span>
          )}
        </div>

        <div>
          <h2 className="about-project-section-title" onClick={() => toggleText('goals')}>
            <span className="about-project-section-header-text">Цели</span>
          </h2>
          {showText.goals && (
            <span className="about-project-section-content">
              <p>
              Рассказать простым языком о прошлом Санкт-Петербурга, его жителях и культуре через призму
               археологических исследований на территории города.
              </p>
              <p>
              Собрать и систематизировать данные об археологических исследованиях на территории города.
              </p>
              <p>
              Сократить дистанцию между людьми и археологией. Мало кто знает, чем на 
              самом деле занимаются археологи и какие важные открытия делаются в этой области.
               Наша цель - познакомить людей с археологией, рассказать о её важности.
              </p>
            </span>
          )}
        </div>



        <div>
          <h2 className="about-project-section-title" onClick={() => toggleText('structure')}>
            <span className="about-project-section-header-text">Структура</span>
          </h2>
          {showText.structure && (
            <span className="about-project-section-content">
              <p>
              В настоящее время наш проект находится в начальной стадии развития. Мы уже создали раздел
               с  <Link to="/map" className="link">картой</Link> исследованных археологических памятников на территории Санкт-Петербург,
                раздел со  <Link to="/monumentslist" className="link">списком</Link> представленных на карте памятников, и раздел с <Link to="/bibliographylist" className="link">источниками</Link>, 
                включающий существующую литературу и другие ресурсы 
                (видео-материалы, нормативно-правовые акты и т.д.) по археологии Санкт-Петербурга.  
              </p>
              <p>
              Разделы будут пополняться и обновляться по мере нашей работы.
              </p>
            </span>
          )}
        </div>

        <div>
          <h2 className="about-project-section-title" onClick={() => toggleText('data')}>
            <span className="about-project-section-header-text">Данные</span>
          </h2>
          {showText.data && (
            <span className="about-project-section-content">
              <p>
              В ходе работы над проектом мы постарались использовать данные из открытых источников, 
              где это было возможно. При создании проекта мы обращались к существующей литературе 
              по археологии Санкт-Петербурга (монографии, статьи), научно-популярным материалам 
              (лекции и т.д.), газетным и новостным источникам.
              </p>
              <p>
                Для каждого объекта на карте в
                его карточке представлены источники, которые мы использовали при описании памятника.
                Кроме того, в разделе "Источники" собраны и каталогизированы все материалы по 
                археологии Санкт-Петербурга, которые нам удалось найти.
              </p>
            </span>
          )}
        </div>


        <div>
          <h2 className="about-project-section-title" onClick={() => toggleText('future')}>
            <span className="about-project-section-header-text">Дальнейшее развитие проекта</span>
          </h2>
          {showText.future && (
            <span className="about-project-section-content">
              <p>
              В ближайшем будущем мы планируем расширить проект, создав словарь археологических 
              терминов и выпустить ряд научно-популярных статей, которых мы расскажем про историю
               становления и развития археологии Санкт-Петербурга, ответим на вопрос <i>«как и зачем» </i>  
                 работают археологи и многое другое.
              </p>
            </span>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default AboutProjectPage;




