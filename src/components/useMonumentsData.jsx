//Этот компонент используется для управления состоянием данных о памятниках, 
// компонент отправляет запрос по апи и получает всю информации из бд по по памятника 
// отсюда компоненты для раздела карты берут инфу
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.jsx';

const useMonumentsData = () => {
  const [monuments, setMonuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dating, setDating] = useState([]);
  const [selectedDating, setSelectedDating] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [selectedCustomCategories, setSelectedCustomCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/monuments/`);
        setMonuments(response.data);

        const allCategories = response.data.flatMap(monument => monument.classification_category);
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);

        const allDating = response.data.flatMap(monument => monument.dating);
        const uniqueDating = Array.from(new Set(allDating));
        setDating(uniqueDating);

        const allCustomCategories = response.data.flatMap(monument => monument.custom_category);
        const uniqueCustomCategories = Array.from(new Set(allCustomCategories));
        setCustomCategories(uniqueCustomCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMonuments([]);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    }
  };

  const handleDatingChange = (e) => {
    const date = e.target.value;
    if (e.target.checked) {
      setSelectedDating([...selectedDating, date]);
    } else {
      setSelectedDating(selectedDating.filter(d => d !== date));
    }
  };

  const handleCustomCategoryChange = (e) => {
    const customCategory = e.target.value;
    if (e.target.checked) {
      setSelectedCustomCategories([...selectedCustomCategories, customCategory]);
    } else {
      setSelectedCustomCategories(selectedCustomCategories.filter(cat => cat !== customCategory));
    }
  };

  const handleClearSelectionChange = () => {
    setSelectedCategories([]);
    setSelectedDating([]);
    setSelectedCustomCategories([]);
  };

  return {
    monuments,
    categories,
    selectedCategories,
    dating,
    selectedDating,
    customCategories,
    selectedCustomCategories,
    handleCategoryChange,
    handleDatingChange,
    handleCustomCategoryChange,
    handleClearSelectionChange
  };
};

export default useMonumentsData;
