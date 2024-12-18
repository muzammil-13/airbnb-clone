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
            {/* Ideally, replace this with your logo as an <img> tag  */}
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
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" aria-label="External Link">
                External Link
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
