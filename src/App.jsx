/*
 * Главный компонент: общая шапка, содержимое выбранной страницы и подвал.
 * Адреса страниц задаются в Route: path — адрес, element — компонент для показа.
 * Чтобы добавить раздел, импортируйте его компонент и добавьте Route и ссылку в меню.
 * :id в адресе памятника — переменная часть, например /monument/12.
 */
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NewsPage from "./pages/NewsPage";
import MapPage from "./pages/MapPage.jsx";
import StartPage from "./pages/StartPage.jsx";
import MonumentDetailsPage from "./pages/MonumentDetailsPage.jsx";
import GlossaryPage from "./pages/GlossaryPage.jsx";
import MonumentsListPage from "./pages/MonumentsListPage.jsx";
import BibliographyListPage from "./pages/BibliographyListPage.jsx";
import ArticlesPage from "./pages/ArticlesPage.jsx";
import AboutProjectPage from "./pages/AboutProjectPage.jsx";
import AboutAuthorsPage from "./pages/AboutAuthorsPage.jsx";
import HowToUsePage from "./pages/HowToUsePage.jsx";

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './styles/Header.css';
import './styles/Footer.css';
import './styles/MapPage.css';
import './styles/App.css';
import './styles/MonumentsListPage.css';
import './styles/DesktopSizing.css';
import './styles/ModernTheme.css';


import './fonts/pixel-ultima-bold.ttf';
import './fonts/pixel-ultima-regular.ttf';

function App() {
  
  return (
    

    <BrowserRouter>
      <div className="wrapper">
      <header className='header'>
        <Header />
      </header>
      <main className="main">
        {/* Routes выбирает страницу по адресу. Шапка и подвал остаются общими для всех маршрутов. */}
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/map' element={<React.Fragment><MapPage /></React.Fragment>} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/monumentslist' element={<MonumentsListPage />} />
          <Route path='/vocabulary' element={<GlossaryPage />} />
          <Route path='/articles' element={<ArticlesPage />} />
          <Route path='/bibliographylist' element={<BibliographyListPage />} />
          <Route path='/about-project' element={<AboutProjectPage />} />
          <Route path='/about-authors' element={<AboutAuthorsPage />} />
          <Route path='/how-to-use' element={<HowToUsePage />} />
          <Route path="/monument/:id" element={<MonumentDetailsPage />} />
          
        </Routes>
        </main>
        <footer className='footer'>
        <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );

}
export default App;
