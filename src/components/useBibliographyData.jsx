/*
 * Хук загружает источники и группирует их для страницы библиографии.
 * На выходе есть исходный массив bibliography и объект organizedBibliography:
 * название раздела → название подраздела → массив источников.
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.jsx';

const useBibliographyData = () => {
  // Первое состояние хранит ответ сервера, второе — те же записи, разложенные по разделам.
  const [bibliography, setBibliography] = useState([]);
  const [organizedBibliography, setOrganizedBibliography] = useState({});

  // Загружаем данные при появлении компонента. try/catch перехватывает ошибку запроса.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/bibliography/`);
        setBibliography(response.data);
        const organizedData = organizeData(response.data);
        setOrganizedBibliography(organizedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setBibliography([]);
      }
    };

    fetchData();
  }, []);

  // Проходим каждую запись и создаём недостающие разделы и подразделы.
  // push добавляет запись в нужный массив; исходные названия категорий становятся ключами объекта.
  const organizeData = (data) => {
    const organized = {};

    data.forEach(item => {
      const { main_category, sub_category } = item;

      if (!organized[main_category]) {
        organized[main_category] = {};
      }

      if (!organized[main_category][sub_category]) {
        organized[main_category][sub_category] = [];
      }

      organized[main_category][sub_category].push(item);
    });

    return organized;
  };

  return {
    bibliography,
    organizedBibliography,
  };
};

export default useBibliographyData;