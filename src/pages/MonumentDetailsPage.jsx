import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MonumentDetailsPage.css';

const MonumentDetailsPage = () => {
  const { id } = useParams();
  const [monumentData, setMonumentData] = useState(null);

  useEffect(() => {
    const fetchMonumentData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/monuments/${id}/`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных о памятнике');
        }
        const data = await response.json();
        setMonumentData(data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchMonumentData();
  }, [id]);

  if (!monumentData) {
    return <div className="monument-details-loading">Loading...</div>;
  }

  return (
<div className='monument-detail-container'>
  <h2 className="monument-details-title">{monumentData.title}</h2>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Name:</h3>
    <p className="monument-details-section-content">{monumentData.name}</p>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Description:</h3>
    <p className="monument-details-section-content">{monumentData.description}</p>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Landmark:</h3>
    <p className="monument-details-section-content">{monumentData.landmark}</p>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Address:</h3>
    <p className="monument-details-section-content">{monumentData.address}</p>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Coordinates:</h3>
    <p className="monument-details-section-content">Latitude: {monumentData.latitude}, Longitude: {monumentData.longitude}</p>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Dating:</h3>
    <ul className="monument-details-section-list">
      {monumentData.dating.map((date, index) => (
        <li key={index}>{date}</li>
      ))}
    </ul>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Categories:</h3>
    <ul className="monument-details-section-list">
      {monumentData.classification_category.map((category, index) => (
        <li key={index}>{category}</li>
      ))}
    </ul>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Content:</h3>
    <ul className="monument-details-section-list">
      {monumentData.content.map((content, index) => (
        <li key={index}>{content}</li>
      ))}
    </ul>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Authors:</h3>
    <ul className="monument-details-section-list">
      {monumentData.authors.map((author, index) => (
        <li key={index}>{author}</li>
      ))}
    </ul>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Organizations:</h3>
    <ul className="monument-details-section-list">
      {monumentData.organizations.map((organization, index) => (
        <li key={index}>{organization}</li>
      ))}
    </ul>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Sources:</h3>
    <ul className="monument-details-section-list">
      {monumentData.sources.map((source, index) => (
        <li key={index}>{source}</li>
      ))}
    </ul>
  </div>
  <div className="monument-details-section">
    <h3 className="monument-details-section-title">Images:</h3>
    {monumentData.images.map((image, index) => (
      <div key={index} className="monument-image">
        <img src={`http://127.0.0.1:8000${image.image}`} alt={image.description} />
        <p>{image.description}</p>
      </div>
    ))}
  </div>
</div>
  );
};

export default MonumentDetailsPage;
