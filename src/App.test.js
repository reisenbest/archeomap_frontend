/*
 * Старый пример теста из шаблона React: ищет надпись learn react.
 * В текущем интерфейсе этой надписи нет, поэтому проверка уже не соответствует сайту.
 * render показывает компонент в тестовом окружении, screen ищет элементы, expect проверяет результат.
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
