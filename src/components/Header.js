//header for all pages

import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css';  
import logo from '../assets/logo.png';


//desgined my header bar containing links between pages
const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul className="nav-links">
                    
                    <img src={logo} alt="Example" style={{ maxWidth: '5%', height: 'auto'}}/>
                
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/charts">Expenditures</Link>
                    </li>
                    <li>
                        <Link to="/savings">Savings</Link>
                    </li>
                    <li>
                        <Link to="/update">Update Your Details</Link>
                    </li>
                    <li>
                        <Link to="/">Sign Out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
