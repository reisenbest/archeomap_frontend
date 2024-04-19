import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AboutPage from "./pages/AboutPage";
import MapPage from "./pages/MapPage.jsx";
import StartPage from "./pages/StartPage.jsx";
import AboutProjectPage from "./pages/AboutProjectPage.jsx";
import AboutAuthorsPage from "./pages/AboutAuthorsPage.jsx";
import MonumentDetailsPage from "./pages/MonumentDetailsPage.jsx";
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './styles/Header.css';
import './styles/Footer.css';
import './styles/MapPage.css';
import './styles/App.css';

function App() {
  
  return (
    

    <BrowserRouter>
      <div className="weapper">
      <header className='header'>
        <Header />
      </header>
      <main className="main">
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/map' element={<React.Fragment><div className="map-page-container"><MapPage /></div></React.Fragment>} />
          <Route path='/about-project' element={<AboutProjectPage />} />
          <Route path='/about-authors' element={<AboutAuthorsPage />} />
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
