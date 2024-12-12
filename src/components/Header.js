//header for all pages

import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Header.css';  

//desgined my header bar containing links between pages
const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Sign Out</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/charts">Charts</Link>
                    </li>
                    <li>
                        <Link to="/savings">Savings</Link>
                    </li>
                    <li>
                        <Link to="/update">Update</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
