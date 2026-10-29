/*
 * Точка запуска сайта. Подключаем общие стили и помещаем App в элемент root из public/index.html.
 * Импорты подключают готовые компоненты, функции и оформление из других файлов.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';




// Находим HTML-контейнер и создаём корень React: в нём будет весь интерфейс.
const root = ReactDOM.createRoot(document.getElementById('root'));
// StrictMode помогает находить ошибки при разработке; в этом режиме эффекты могут запускаться повторно.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Измерение скорости сейчас выключено: функция вызывается без обработчика результатов.
reportWebVitals();
