import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import MonumentArticle, { articleImageUrl, cleanArticle, hasArticle } from './MonumentArticle';

const gallery = (prefix) => `<div class="monument-carousel" contenteditable="false" data-carousel-ids="1,2">
  <figure><img src="/media/${prefix}1.jpg" alt="${prefix}1"><figcaption>${prefix} первая</figcaption></figure>
  <figure><img src="/media/${prefix}2.jpg" alt="${prefix}2"><figcaption>${prefix} вторая</figcaption></figure>
</div>`;

test('removes executable HTML while retaining formatting and carousel metadata', () => {
  const html = cleanArticle(`<script>alert(1)</script><p style="color:red">Текст</p>
    <a href="javascript:alert(1)">Ссылка</a><img src="/media/a.jpg" onerror="alert(1)">${gallery('a')}`);
  expect(html).not.toMatch(/<script|onerror|javascript:|contenteditable/);
  expect(html).toContain('color:red');
  expect(html).toContain('data-carousel-ids="1,2"');
});

test('falls back for empty articles and default placeholder, but accepts image-only articles', () => {
  [undefined, '', '<p>&nbsp;<br></p>', '<p>Lorem ipsum</p>'].forEach(html => expect(hasArticle(html)).toBe(false));
  expect(hasArticle('<p>История</p>')).toBe(true);
  expect(hasArticle('<img src="/media/a.jpg">')).toBe(true);
  expect(articleImageUrl('/media/a.jpg')).toBe('http://127.0.0.1:8000/media/a.jpg');
  expect(articleImageUrl('https://example.com/a.jpg')).toBe('https://example.com/a.jpg');
  expect(articleImageUrl('javascript:alert(1)')).toBe('');
});

test('renders text around independent carousels, captions, keyboard and touch navigation', () => {
  render(<MonumentArticle html={`<h2>История</h2>${gallery('a')}<p>Между</p>${gallery('b')}<p>Конец</p>`} />);
  const carousels = screen.getAllByRole('region', { name: 'Фотографии памятника' });
  expect(screen.getByText('Между')).toBeInTheDocument();
  expect(screen.getByText('Конец')).toBeInTheDocument();
  fireEvent.click(within(carousels[0]).getByRole('button', { name: 'Следующее фото' }));
  expect(within(carousels[0]).getByText('a вторая')).toBeInTheDocument();
  expect(within(carousels[1]).getByText('b первая')).toBeInTheDocument();
  fireEvent.keyDown(carousels[0], { key: 'ArrowLeft' });
  expect(within(carousels[0]).getByText('a первая')).toBeInTheDocument();
  const figure = carousels[1].querySelector('figure');
  fireEvent.touchStart(figure, { touches: [{ clientX: 150, clientY: 20 }] });
  fireEvent.touchEnd(figure, { changedTouches: [{ clientX: 40, clientY: 25 }] });
  expect(within(carousels[1]).getByText('b вторая')).toBeInTheDocument();
});

test('preserves individual image formatting and handles broken images', () => {
  render(<MonumentArticle html='<figure><img src="/media/a.jpg" alt="Раскоп" style="width:400px"><figcaption>Подпись</figcaption></figure>' />);
  const image = screen.getByAltText('Раскоп');
  expect(image).toHaveAttribute('src', 'http://127.0.0.1:8000/media/a.jpg');
  expect(image).toHaveStyle({ width: '400px' });
  expect(screen.getByText('Подпись')).toBeInTheDocument();
  fireEvent.error(image);
  expect(screen.getByText('Изображение недоступно: Раскоп')).toBeInTheDocument();
});
