import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../pages/AuthForm';
import '../styles/Header.css';
import { TbHomeSearch } from "react-icons/tb";

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

  // search suggestions
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

const dummySearchData = {
    trending: [
        { title: "Munnar Hill Station", type: "Popular Destination" },
        { title: "Alleppey Houseboats", type: "Most Booked" },
        { title: "Wayanad Wildlife", type: "Trending" }
    ],
    recent: [
        { title: "Kovalam Beach Resort", type: "Recent Search" },
        { title: "Thekkady Tiger Reserve", type: "Recent Search" }
    ],
    properties: [
        { title: "Kumarakom Lake Resort", location: "Backwaters" },
        { title: "Tea Valley Resort", location: "Munnar" },
        { title: "Vythiri Resort", location: "Wayanad" }
    ]
};

const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
};

  

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/images/SANCHARAM-Travels-Logo.png" alt="Brand Logo" className="logo" />
        </Link>
      </div>

      {/* searchbar */}
      <div className="search-container" ref={searchContainerRef}>
    <div className="search-bar">
        <input 
            type="text" 
            placeholder="Search your Home ;)" 
            className='search-input'
            value={searchQuery}
            onChange={handleSearchChange}
        />
        <TbHomeSearch className="search-icon"/>
    </div>
    
    {showSuggestions && (
        <div className="search-suggestions">
            <div className="suggestion-section">
                <h4>Trending</h4>
                {dummySearchData.trending.map((item, index) => (
                    <div key={index} className="suggestion-item">
                        <span>{item.title}</span>
                        <small>{item.type}</small>
                    </div>
                ))}
            </div>
            
            <div className="suggestion-section">
                <h4>Recent Searches</h4>
                {dummySearchData.recent.map((item, index) => (
                    <div key={index} className="suggestion-item">
                        <span>{item.title}</span>
                    </div>
                ))}
            </div>
            
            <div className="suggestion-section">
                <h4>Popular Properties</h4>
                {dummySearchData.properties.map((item, index) => (
                    <div key={index} className="suggestion-item">
                        <span>{item.title}</span>
                        <small>{item.location}</small>
                    </div>
                ))}
            </div>
        </div>
    )}
</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/listings">View Listings</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
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
