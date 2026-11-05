/*
 * Словарь с раскрывающимися буквами. Временные данные — в data/glossary.js.
 */
import React from 'react';
import { glossaryTerms } from '../data/glossary';
import '../styles/Glossary.css';

const alphabet = Array.from('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ');

function GlossaryPage() {
  
  return (
    
    <div className="monument-list-page-container">
      <div className="monument-list-page-center-col glossary-page">
        <h1>Словарь археологических терминов</h1>
        <p>Нажмите на букву, чтобы раскрыть список терминов и их определения. Повторное нажатие свернёт список.</p>
        <p className="glossary-note">Раздел готовится к публикации. Пока здесь приведены примеры словарных статей.</p>
        <div className="glossary-letters">
          {alphabet.map(letter => {
            const terms = glossaryTerms.filter(term => term.title.charAt(0).toLocaleUpperCase('ru') === letter)
              .sort((a, b) => a.title.localeCompare(b.title, 'ru'));
            return (
              <details key={letter} className="glossary-letter">
                <summary>
                  <span className="glossary-letter__title">{letter}</span>
                  <span className="glossary-letter__count">{terms.length ? `Терминов: ${terms.length}` : 'Пока нет терминов'}</span>
                </summary>
                {terms.length ? <dl className="glossary-definitions">
                  {terms.map(term => <div key={term.id}>
                    <dt>{term.title}</dt>
                    <dd>{term.definition}</dd>
                  </div>)}
                </dl> : <p className="glossary-empty">Термины на букву «{letter}» пока не добавлены.</p>}
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GlossaryPage;
