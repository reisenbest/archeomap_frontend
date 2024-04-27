import { useState, useEffect } from 'react';
import axios from 'axios';

const useMonumentsData = () => {
  const [monuments, setMonuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://89.111.170.193/api/monuments/');
        setMonuments(response.data);

        const allCategories = response.data.flatMap(monument => monument.classification_category);
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
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

  const handleClearSelectionChange = () => {
    setSelectedCategories([]);
  };

  return {
    monuments,
    categories,
    selectedCategories,
    handleCategoryChange,
    handleClearSelectionChange
  };
};

export default useMonumentsData;