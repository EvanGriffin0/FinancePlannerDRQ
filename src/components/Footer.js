//footer for all pages

import React from 'react';
import '../styling/Footer.css'; 

//created a footer to be used throughout the site
const Footer = () => {
    //logo to be added later need to find an image
  return (
    <footer className="footer">
      <p>© GriffinEnterprise</p>
      <div className="footer-content">
        <p>***Company Logo***</p>
        <p>Contact Us : 091 555 555</p>
      </div>
    </footer>
  );
};

export default Footer;
