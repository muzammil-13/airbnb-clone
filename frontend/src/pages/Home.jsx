import React, { useState, useEffect } from 'react'; // Import useEffect
import Listings from './Listings';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LocationCard from '../components/cards/LocationCard';
import { IoFilterCircle } from "react-icons/io5";
import { SiChatbot } from "react-icons/si";
import Chatbot from '../components/Chatbot';
import '../styles/Home.css';


const Home = () => { 
    const navigate = useNavigate();
    const [showChatbot, setShowChatbot] = useState(false);

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    

    return (
        <div className="main">
            <div className="mainContainer">
                <div className="titleContainer">
                    <div className="filterIconContainer"> {/* Improved naming */}
                    <IoFilterCircle />
                    </div>

                    <div 
    className="chatIconContainer"  // Keep only necessary class
    onClick={toggleChatbot} 
    style={{
        position: 'fixed',
        bottom: '20px',       
        right: '20px',       
        zIndex: 100,           
        cursor: 'pointer',   
        // backgroundColor: '#22da46',
        padding: '10px', 
        borderRadius: '50%'
    }}
>
    <SiChatbot />
</div>



                    <h1>Welcome to SANCHARAM Travels</h1>
                </div>

                <div className="contentContainer">
                    <h2>Your Journey Begins Here</h2>
                    <p>Discover amazing destinations and create unforgettable memories</p>
                </div>

                <div className="locationsGrid"> {/* Better naming convention */}
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters"
                        description="Experience the serene backwaters of Kerala"
                        price={299}
                    />
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters"
                        description="Experience the serene backwaters of Kerala"
                        price={299}
                    />
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters"
                        description="Experience the serene backwaters of Kerala"
                        price={299}
                    />
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters"
                        description="Experience the serene backwaters of Kerala"
                        price={299}
                    />
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters"
                        description="Experience the serene backwaters of Kerala"
                        price={299}
                    />
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters"
                        description="Experience the serene backwaters of Kerala"
                        price={299}
                    />
                    {loading ? (
                    <h3>Loading listings...</h3>
                        ) : error ? (
                    <p>Error: {error}</p>
                        ) : (
                    <Listings listings={listings} />
                        )}
                </div>
            </div>
            {showChatbot && <Chatbot />}
        </div>
    );
};

export default Home;

