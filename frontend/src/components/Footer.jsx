import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Import your CSS file

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <Link to="/" aria-label="Home"> {/* Added aria-label */}
          {/* <img src="/images/SANCHARAM-Travels-Logo.png" alt="Brand Logo" className="logo" style={{width:'10vh',height:'auto'}}/> */}
           <h1>SANCHARAM</h1> 
          </Link>
          <p>&copy; {currentYear} SANCHARAM Travels. All rights reserved.</p>
        </div>
        <nav className="footer-nav">
          <ul> {/* Use a <ul> for better semantics */}
            <li>
              <Link to="/" aria-label="Home">Home</Link>
            </li>
            <li>
              <Link to="/listings" aria-label="Listings">Listings</Link>
            </li>
            {/* Example of an external link: */}
            <li>
              <a href="https://muzammil13travelproj.pythonanywhere.com/" target="_blank" rel="noopener noreferrer" aria-label="External Link">
                Our Old Website (Sancharam Travels 1.0) ↗️
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
