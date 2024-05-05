import React from 'react';
import { Link } from 'react-router-dom';
import useMonumentsData from '../components/useMonumentsData';


function MonumentsListPage() {
  const { monuments } = useMonumentsData(); // Получаем данные о памятниках

  // Сортируем памятники по алфавиту по их именам
  const sortedMonuments = monuments.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="content">
      <ol>
        {sortedMonuments.map((monument, index) => (
          <li key={monument.id}>
            {/* Имя памятника в виде ссылки */}
            <Link to={`/monument/${monument.id}`}>{monument.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MonumentsListPage;