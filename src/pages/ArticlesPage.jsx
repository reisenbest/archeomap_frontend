/*
 * Список статей с поиском по названию. Временные данные — в data/articles.js.
 * Нажатие на название открывает отдельную страницу /articles/:id.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import '../styles/Articles.css';


function ArticlesPage() {
  const [query, setQuery] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const filtered = [...articles].sort((a, b) => a.title.localeCompare(b.title, 'ru'))
    .filter(article => article.title.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    
    <div className="articles-page">
      <div className="articles-page-content">
        <h1>Статьи по археологии</h1>
        <button className="about-section-btn" aria-expanded={showAbout} aria-controls="articles-about"
          onClick={() => setShowAbout(value => !value)}>
          {showAbout ? 'Скрыть информацию о разделе' : 'Показать информацию о разделе'}
        </button>
        <div id="articles-about" className="about-section-container" hidden={!showAbout}>
          <div className="about-section-text">
            <p>Материалы об археологии, методах исследований и находках. Выберите «Читать полностью», чтобы открыть статью.</p>
            <p>Раздел готовится к публикации. Сейчас здесь представлены демонстрационные страницы.</p>
          </div>
        </div>
        <div className="articles-search">
          <input type="search" className="search-input" placeholder="Поиск по названию статьи"
            aria-label="Поиск по названию статьи" value={query} onChange={event => setQuery(event.target.value)} />
        </div>
        {filtered.length ? <div className="articles-grid">{filtered.map(article => (
          <article className="article-card" key={article.id}>
            <Link to={`/articles/${article.id}`} className="article-card-image-link" tabIndex={-1} aria-hidden="true">
              <img className="article-card-image" src={article.previewImage} alt="" loading="lazy"
                style={{ objectPosition: article.previewPosition }} />
            </Link>
            <h2><Link to={`/articles/${article.id}`}>{article.title}</Link></h2>
            <p>{article.excerpt}</p>
            <Link className="article-card-read-more" to={`/articles/${article.id}`}
              aria-label={`Читать полностью: ${article.title}`}>
              Читать полностью <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}</div> : <p className="articles-empty" role="status">Статьи не найдены. Попробуйте другое название.</p>}
      </div>
    </div>
  );
}

export default ArticlesPage;
