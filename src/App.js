// created routing paths for my pages in react
import React from 'react';
import { BrowserRouter as Router,Routes, Route,useLocation  } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomePage from './pages/HomePage.js';
import Dashboard from './pages/Dashboard.js';
import ChartsPage from './pages/ChartsPage.js';
import SavingsPage from './pages/SavingsPage.js';
import UpdateValues from './pages/UpdateValues.js';

const AppContent = () => {

    const location = useLocation();

    //created a basic template for my pages that use my header and footer components but exclude it from my homepage (aka my signup /login page )
    return (
        <>
            {/* Render Header on all pages except the HomePage */}
            {location.pathname !== '/' && <Header />}
        
                <div className="main-content">
                    <Routes>
                        <Route path="/" exact element={<HomePage /> } />
                        <Route path="/dashboard" element={<Dashboard/> } />
                        <Route path="/charts" element={<ChartsPage/>} />
                        <Route path="/savings" element={<SavingsPage/>} />
                        <Route path="/update" element={<UpdateValues/>} />
                    </Routes>
                </div>

            {/* Render Footer on all pages except the HomePage */}
            {location.pathname !== '/' && <Footer />}
        </>
    );
};

const App = () => {
    return (
      <Router>
        <AppContent /> 
      </Router>
    );
  };

export default App;
