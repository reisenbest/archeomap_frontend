// компонент отправляет запрос по апи и получает всю информации из бд по библиографии о всех категориях и под категориях
// отсюда компоненты для раздела библиографии берут инфу

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.jsx';

const useBibliographyData = () => {
  const [bibliography, setBibliography] = useState([]);
  const [organizedBibliography, setOrganizedBibliography] = useState({});

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