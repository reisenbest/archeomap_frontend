import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

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
import VirtualTourPage from './pages/VirtualTourPage.jsx';

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './styles/Header.css';
import './styles/Footer.css';
import './styles/MapPage.css';
import './styles/App.css';
import './styles/MonumentsListPage.css';

import './fonts/pixel-ultima-bold.ttf';
import './fonts/pixel-ultima-regular.ttf';

function AppContent() {
  const location = useLocation();

  // Список маршрутов, где НЕ нужно показывать Header/Footer
  const hideHeaderFooter = location.pathname === '/virtual-tour';

  return (
    <div className="weapper">
      {!hideHeaderFooter && <header className='header'><Header /></header>}

      <main className="main">
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/monumentslist' element={<MonumentsListPage />} />
          <Route path='/vocabulary' element={<GlossaryPage />} />
          <Route path='/articles' element={<ArticlesPage />} />
          <Route path='/bibliographylist' element={<BibliographyListPage />} />
          <Route path='/about-project' element={<AboutProjectPage />} />
          <Route path='/about-authors' element={<AboutAuthorsPage />} />
          <Route path='/how-to-use' element={<HowToUsePage />} />
          <Route path="/monument/:id" element={<MonumentDetailsPage />} />
          <Route path="/virtual-tour" element={<VirtualTourPage />} />
        </Routes>
      </main>

      {!hideHeaderFooter && <footer className='footer'><Footer /></footer>}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;





// import React from "react";
// import {BrowserRouter, Routes, Route} from 'react-router-dom'


// import NewsPage from "./pages/NewsPage";
// import MapPage from "./pages/MapPage.jsx";
// import StartPage from "./pages/StartPage.jsx";
// import MonumentDetailsPage from "./pages/MonumentDetailsPage.jsx";
// import GlossaryPage from "./pages/GlossaryPage.jsx";
// import MonumentsListPage from "./pages/MonumentsListPage.jsx";
// import BibliographyListPage from "./pages/BibliographyListPage.jsx";
// import ArticlesPage from "./pages/ArticlesPage.jsx";
// import AboutProjectPage from "./pages/AboutProjectPage.jsx";
// import AboutAuthorsPage from "./pages/AboutAuthorsPage.jsx";
// import HowToUsePage from "./pages/HowToUsePage.jsx";
// import VirtualTourPage from './pages/VirtualTourPage.jsx';


// import Header from './components/Header.jsx'
// import Footer from './components/Footer.jsx'
// import './styles/Header.css';
// import './styles/Footer.css';
// import './styles/MapPage.css';
// import './styles/App.css';
// import './styles/MonumentsListPage.css';


// import './fonts/pixel-ultima-bold.ttf';
// import './fonts/pixel-ultima-regular.ttf';

// function App() {
  
//   return (
    

//     <BrowserRouter>
//       <div className="weapper">
//       <header className='header'>
//         <Header />
//       </header>
//       <main className="main">
//         <Routes>
//           <Route path='/' element={<StartPage />} />
//           <Route path='/map' element={<React.Fragment><MapPage /></React.Fragment>} />
//           <Route path='/news' element={<NewsPage />} />
//           <Route path='/monumentslist' element={<MonumentsListPage />} />
//           <Route path='/vocabulary' element={<GlossaryPage />} />
//           <Route path='/articles' element={<ArticlesPage />} />
//           <Route path='/bibliographylist' element={<BibliographyListPage />} />
//           <Route path='/about-project' element={<AboutProjectPage />} />
//           <Route path='/about-authors' element={<AboutAuthorsPage />} />
//           <Route path='/how-to-use' element={<HowToUsePage />} />
//           <Route path="/monument/:id" element={<MonumentDetailsPage />} />


//           <Route path="/virtual-tour" element={<VirtualTourPage />} />

          
//         </Routes>
//         </main>
//         <footer className='footer'>
//         <Footer />
//         </footer>
//       </div>
//     </BrowserRouter>
//   );

// }
// export default App;
