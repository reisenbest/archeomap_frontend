/*
 * Свой хук React: загружает памятники с сервера и хранит выбранные фильтры.
 * Хук — функция с именем use..., которая использует состояние и другие возможности React.
 * MapPage и MonumentsListPage вызывают его независимо: каждый вызов имеет свои данные и запрос.
 * Списки вариантов берутся из ответа сервера, а не задаются вручную в выпадающих меню.
 */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.jsx';

const useMonumentsData = () => {
  // useState хранит значение между перерисовками. set... меняет его и просит React обновить экран.
  // Пустые массивы означают: данные ещё не загружены, фильтры пока не выбраны.
  const [monuments, setMonuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dating, setDating] = useState([]);
  const [selectedDating, setSelectedDating] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [selectedCustomCategories, setSelectedCustomCategories] = useState([]);

  // useEffect запускает загрузку после появления компонента. [] в конце означает, что эффект не зависит от значений.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // await ждёт ответ, не блокируя интерфейс. response.data содержит массив памятников из API.
        const response = await axios.get(`${API_BASE_URL}/api/monuments/`);
        setMonuments(response.data);

        // flatMap собирает категории всех памятников в один массив. Set убирает повторы, Array.from возвращает массив.
        // Ниже тем же способом собираем датировки и дополнительные категории.
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

  // При установленной галочке добавляем значение; при снятой исключаем его через filter.
  // ... копирует элементы в новый массив, чтобы передать React обновлённый список.
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    }
  };

  // Та же логика выбора, но для датировок; список не связан с выбранными типами.
  const handleDatingChange = (e) => {
    const date = e.target.value;
    if (e.target.checked) {
      setSelectedDating([...selectedDating, date]);
    } else {
      setSelectedDating(selectedDating.filter(d => d !== date));
    }
  };

  // Обновляем выбранные дополнительные категории по событию от галочки.
  const handleCustomCategoryChange = (e) => {
    const customCategory = e.target.value;
    if (e.target.checked) {
      setSelectedCustomCategories([...selectedCustomCategories, customCategory]);
    } else {
      setSelectedCustomCategories(selectedCustomCategories.filter(cat => cat !== customCategory));
    }
  };

  // Сбрасываем все три фильтра. Сами загруженные памятники остаются в памяти.
  const handleClearSelectionChange = () => {
    setSelectedCategories([]);
    setSelectedDating([]);
    setSelectedCustomCategories([]);
  };

  // Возвращаем данные и функции: вызывающая страница может показывать варианты и менять выбор.
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
