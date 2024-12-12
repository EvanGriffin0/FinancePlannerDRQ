//footer for all pages

import React from 'react';
import '../styling/Footer.css'; 
import logo from '../assets/logo.png';

//created a footer to be used throughout the site
const Footer = () => {
    //logo to be added later need to find an image
  return (
    <footer className="footer">
      <p>© GriffinEnterprise</p>
      <div className="footer-content">
      <img src={logo} alt="Example" style={{ maxWidth: '5%', height: 'auto'}}/>
        <p>Contact Us : 091 555 555</p>
      </div>
    </footer>
  );
};

export default Footer;
