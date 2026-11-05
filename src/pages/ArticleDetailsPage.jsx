import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MonumentArticle from '../components/article/MonumentArticle';
import { articles } from '../data/articles';
import 'react-photo-view/dist/react-photo-view.css';

export default function ArticleDetailsPage() {
  const { id } = useParams();
  const article = articles.find(item => item.id === id);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  return (
    <div className="monument-details-page">
      <div className="monument-details-center-col">
        <div className="monument-detail-container">
          <div className="monument-button">
            <Link to="/articles" className="button-back-to-map">← К списку статей</Link>
          </div>
          <h1 className="monument-title">{article ? article.title : 'Статья не найдена'}</h1>
          {article ? <>
            <p>Материал готовится · Демонстрационная страница</p>
            <MonumentArticle key={id} html={article.html} />
          </> : <p>Такой статьи пока нет. Выберите материал в списке статей.</p>}
        </div>
      </div>
    </div>
  );
}
