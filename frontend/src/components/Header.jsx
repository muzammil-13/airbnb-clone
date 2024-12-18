import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../pages/AuthForm';
import '../styles/Header.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

function Header() {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowAuthForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleAuthForm = () => {
    setShowAuthForm(!showAuthForm);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/images/SANCHARAM-Travels-Logo.png" alt="Brand Logo" className="logo" />
        </Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search anything..." className='search-input'/>
        <FaMagnifyingGlass className="search-icon"/>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/listings">View Listings</Link></li>
        <li><Link to="#">About</Link></li>
        <li><Link to="#">Contact</Link></li>
        <li>
          <button onClick={toggleAuthForm} className="login-button">Login</button>
          {showAuthForm && (
            <div className="auth-popover" ref={popoverRef}>
              <AuthForm />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
