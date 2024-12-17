import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationCard from '../components/cards/LocationCard';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChatIcon from '@mui/icons-material/Chat'; // Use ChatIcon
import Chatbot from '../components/Chatbot';
import '../styles/Home.css';


const Home = () => {  // Removed unused props
    const navigate = useNavigate();
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <div className="main">
            <div className="mainContainer">
                <div className="titleContainer">
                    <div className="filterIconContainer"> {/* Improved naming */}
                        <FilterListIcon />
                    </div>
                    <div className="chatIconContainer" onClick={toggleChatbot}> {/* Clearer naming */}
                        <ChatIcon /> {/* More appropriate icon */}
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
                        title="Kerala Backwaters-1"
                        description="Experience the serene backwaters of Kerala"
                        price={299}
                    />
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters-2"
                        description="Experience the serene backwaters of Kerala"
                        price={299}
                    />
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters-3"
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
                </div>
            </div>
            {showChatbot && <Chatbot />}
        </div>
    );
};

export default Home;

