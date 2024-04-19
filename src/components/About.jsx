import {useEffect} from 'react';
import axios from 'axios';

const About = ({ onDataReceived }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/monuments/');
        onDataReceived(response.data); // Передача полученных данных в родительский компонент
      } catch (error) {
        console.error('Error fetching data:', error);
        onDataReceived([]); // Если произошла ошибка, передаем пустой массив
      }
    };

    fetchData();
  }, [onDataReceived]);

  return null; // Этот компонент ничего не отрисовывает, поэтому возвращаем null
};

export default About;