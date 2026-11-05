import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MonumentArticle from './MonumentArticle';

const originalFetch = global.fetch;
afterEach(() => { global.fetch = originalFetch; });

test('opens a definition from marked HTML, sanitizes it and closes with Escape', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({
    title: 'Культурный слой', short_definition: '<p><strong>Определение</strong><img src=x onerror="alert(1)"><script>bad()</script></p>',
  }) });
  render(<MonumentArticle compact html='<p>Остатки <span data-term-id="901"><em>культурного слоя</em></span>.</p>' />);
  const trigger = screen.getByRole('button', { name: 'культурного слоя' });
  fireEvent.click(trigger);
  expect(await screen.findByText('Определение')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/glossary/901/'), expect.any(Object));
  expect(screen.getByRole('dialog').querySelector('script, img')).toBeNull();
  expect(screen.getByRole('button', { name: 'Читать подробнее' })).toBeDisabled();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  fireEvent.click(trigger);
  await screen.findByText('Определение');
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('unavailable term can be retried and outside click closes the popup', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 404 })
    .mockResolvedValueOnce({ ok: true, json: async () => ({ title: 'Термин', short_definition: '<p>Найдено</p>' }) });
  render(<MonumentArticle html='<span data-term-id="902">слово</span>' />);
  fireEvent.click(screen.getByRole('button', { name: 'слово' }));
  await screen.findByText('Этот термин пока недоступен.');
  fireEvent.click(screen.getByRole('button', { name: 'Повторить' }));
  await screen.findByText('Найдено');
  fireEvent.pointerDown(document.body);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
