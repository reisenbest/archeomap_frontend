import React, { useMemo, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import parse, { attributesToProps, domToReact } from 'html-react-parser';
import TermExplanation from './TermExplanation';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { API_BASE_URL } from '../../config';
import '../../styles/MonumentArticle.css';

export function cleanArticle(html) {
  return DOMPurify.sanitize(typeof html === 'string' ? html : '', {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select'],
    FORBID_ATTR: ['contenteditable', 'srcset', 'sizes', 'autofocus'],
  });
}

export function hasArticle(html) {
  const document = new DOMParser().parseFromString(cleanArticle(html), 'text/html');
  const text = document.body.textContent.replace(/\s+/g, ' ').trim();
  return Boolean(document.querySelector('img[src]') || (text && text.toLowerCase() !== 'lorem ipsum'));
}

// Relative media paths belong to Django, not to the React development server.
export function articleImageUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value, `${API_BASE_URL}/`);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function descendants(node, name) {
  return (node.children || []).flatMap(child => [
    ...(child.name === name ? [child] : []),
    ...descendants(child, name),
  ]);
}

function textContent(node) {
  return node.type === 'text' ? node.data : (node.children || []).map(textContent).join('');
}

function ArticleImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="article-image-error">Изображение недоступно{alt ? `: ${alt}` : ''}</span>;
  return (
    <PhotoView src={src}>
      <img {...props} src={src} alt={alt || ''} loading="lazy" decoding="async"
        tabIndex={0} role="button" aria-label={`Увеличить: ${alt || 'фотографию'}`}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
          }
        }} onError={() => setFailed(true)} />
    </PhotoView>
  );
}

export function ArticleCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const touch = useRef(null);
  const move = delta => setIndex(current => (current + delta + slides.length) % slides.length);
  const slide = slides[index];
  if (!slide) return <p>В этой карусели нет доступных изображений.</p>;

  return (
    <section className="article-carousel" aria-label="Фотографии памятника" aria-roledescription="карусель"
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}>
      <figure onTouchStart={event => {
        const point = event.touches[0];
        touch.current = { x: point.clientX, y: point.clientY };
      }} onTouchEnd={event => {
        if (!touch.current) return;
        const point = event.changedTouches[0];
        const dx = point.clientX - touch.current.x;
        const dy = point.clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
      }} onTouchCancel={() => { touch.current = null; }}>
        <ArticleImage key={slide.src} src={slide.src} alt={slide.alt} />
        {slide.caption && <figcaption>{slide.caption}</figcaption>}
      </figure>
      {slides.length > 1 && <div className="article-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Предыдущее фото">←</button>
        <span aria-live="polite" aria-atomic="true">{index + 1} / {slides.length}</span>
        <button type="button" onClick={() => move(1)} aria-label="Следующее фото">→</button>
      </div>}
    </section>
  );
}

export default function MonumentArticle({ html, compact = false }) {
  const content = useMemo(() => parse(cleanArticle(html), {
    replace(node) {
      if (!node.attribs) return;
      if (node.name === 'span' && /^[1-9]\d*$/.test(node.attribs['data-term-id'] || '')) {
        let parent = node.parent;
        while (parent) {
          if (parent.name === 'a' || parent.attribs?.['data-term-id']) return;
          parent = parent.parent;
        }
        return <TermExplanation termId={node.attribs['data-term-id']}>
          {domToReact(node.children)}
        </TermExplanation>;
      }
      if (node.name === 'div' && (node.attribs.class || '').split(/\s+/).includes('monument-carousel')) {
        const slides = descendants(node, 'img').map(img => {
          const figure = img.parent?.name === 'figure' ? img.parent : null;
          const caption = figure && descendants(figure, 'figcaption')[0];
          return {
            src: articleImageUrl(img.attribs.src),
            alt: img.attribs.alt || '',
            caption: caption ? textContent(caption) : '',
          };
        }).filter(slide => slide.src);
        return <ArticleCarousel slides={slides} />;
      }
      if (node.name === 'img') {
        const src = articleImageUrl(node.attribs.src);
        if (!src) return <span className="article-image-error">Изображение недоступно</span>;
        const props = attributesToProps(node.attribs);
        // Preserve linked illustrations as links rather than nesting controls.
        let parent = node.parent;
        while (parent) {
          if (parent.name === 'a') return <img {...props} src={src} alt={props.alt || ''} loading="lazy" />;
          parent = parent.parent;
        }
        return <ArticleImage {...props} src={src} />;
      }
      if (node.name === 'a') {
        node.attribs.rel = 'noopener noreferrer';
      }
    },
  }), [html]);

  return <div className={compact ? 'monument-rich-text' : 'monument-article'}><PhotoProvider>{content}</PhotoProvider></div>;
}
