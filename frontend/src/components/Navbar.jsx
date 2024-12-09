import React from 'react';

import { Link } from 'react-router-dom';
import AuthForm from '../pages/AuthForm';
import './Navbar.css';
import {FaMagnifyingGlass} from  'react-icons/fa6';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <Link to="/">
        <img src="public/images/SANCHARAM-Travels-Logo.png" alt="Brand Logo" className="logo" />
      </Link>
    </div>
      <input type="text" placeholder="Search..." className='search-bar' />
      <FaMagnifyingGlass/>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="#">About</Link></li>
        <li><Link to="#">Contact</Link></li>
        <li><Link to="/AuthForm">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
