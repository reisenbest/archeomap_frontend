import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DOMPurify from 'dompurify';
import { API_BASE_URL } from '../../config';
import '../../styles/TermExplanation.css';

// Cache successful responses for five minutes; failures remain retryable.
const cache = new Map();
async function getTerm(id) {
  const saved = cache.get(id);
  if (saved && Date.now() - saved.time < 300000) return saved.data;
  const response = await fetch(`${API_BASE_URL}/api/glossary/${encodeURIComponent(id)}/`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(response.status === 404
    ? 'Этот термин пока недоступен.' : 'Не удалось загрузить пояснение. Попробуйте ещё раз.');
  const data = await response.json();
  if (typeof data.title !== 'string' || typeof data.short_definition !== 'string') {
    throw new Error('Сервер вернул некорректное пояснение.');
  }
  cache.set(id, { data, time: Date.now() });
  return data;
}

export default function TermExplanation({ termId, children }) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [position, setPosition] = useState({ left: 12, top: 12 });
  const trigger = useRef(null);
  const popup = useRef(null);
  const closeButton = useRef(null);
  const dialogId = useId();
  const close = () => { setOpen(false); trigger.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    let active = true;
    setTerm(null);
    setError('');
    getTerm(termId).then(data => { if (active) setTerm(data); }).catch(err => {
      if (active) setError(err.message || 'Не удалось загрузить пояснение.');
    });
    return () => { active = false; };
  }, [open, termId, attempt]);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      if (!trigger.current || !popup.current) return;
      const anchor = trigger.current.getBoundingClientRect();
      const box = popup.current.getBoundingClientRect();
      const left = Math.max(12, Math.min(anchor.left, window.innerWidth - box.width - 12));
      const below = anchor.bottom + 8;
      const top = below + box.height <= window.innerHeight - 12
        ? below : Math.max(12, Math.min(anchor.top - box.height - 8, window.innerHeight - box.height - 12));
      setPosition({ left, top });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, term, error]);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const outside = event => {
      if (!popup.current?.contains(event.target) && !trigger.current?.contains(event.target)) setOpen(false);
    };
    const escape = event => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const definition = term ? DOMPurify.sanitize(term.short_definition, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'a', 'span', 'sup', 'sub'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false,
  }) : '';

  return <>
    <button type="button" className="term-trigger" ref={trigger}
      aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? dialogId : undefined}
      onClick={event => { event.stopPropagation(); setOpen(value => !value); }}>
      {children}<sup className="term-trigger__badge" aria-hidden="true">?</sup>
    </button>
    {open && createPortal(
      <section className="term-popover" ref={popup} id={dialogId} role="dialog"
        aria-labelledby={`${dialogId}-title`} style={position}
        onClick={event => event.stopPropagation()}>
        <button type="button" className="term-popover__close" ref={closeButton}
          aria-label="Закрыть пояснение" onClick={close}>×</button>
        <h2 id={`${dialogId}-title`}>{term?.title || 'Пояснение термина'}</h2>
        {!term && !error && <p role="status">Загружаем определение…</p>}
        {error && <div role="alert"><p>{error}</p><button type="button"
          onClick={() => setAttempt(value => value + 1)}>Повторить</button></div>}
        {term && <>
          <div className="term-popover__definition" dangerouslySetInnerHTML={{ __html: definition }} />
          <div className="term-popover__footer">
            <button type="button" disabled>Читать подробнее</button>
            <span>Страница термина готовится</span>
          </div>
        </>}
      </section>, document.body)}
  </>;
}
