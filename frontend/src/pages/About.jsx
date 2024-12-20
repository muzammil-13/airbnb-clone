import React from 'react';
import '../styles/About.css'; // Import the CSS file

const About = () => {
    return (
        <div className="about-page">
            <div className="about-section">
                <div className="about-image-container"> {/* Container for image */}
                    <img src="/images/SANCHARAM-Travels-Logo.png" alt="About Us" className="about-image" /> {/* Replace with your image */}
                </div>
                <div className="about-content">
                    <h1 className="about-title">About SANCHARAM Travels</h1>
                    <p>
                        At SANCHARAM Travels, we're passionate about crafting unforgettable travel experiences. 
                        We believe that travel is more than just visiting new places; it's about creating lasting memories,
                        immersing yourself in different cultures, and connecting with the world around you.
                    </p>
                    <p>
                        Our team of dedicated travel experts is committed to providing personalized service and curating
                        unique itineraries that cater to your individual needs and preferences.  Whether you're seeking a
                        relaxing beach getaway, an adventurous trek through the mountains, or an immersive cultural exploration,
                        we'll help you plan the perfect trip.
                    </p>
                    <p>
                       Our mission is simple - To provide seamless and personalized travel experiences while promoting 
                       sustainable and responsible tourism. We want you to worry less about the details and more about being present.
                       Join us in creating unforgettable travel memories!
                    </p>
                    <h2>Our Values</h2>
                    <ul className="values-list">
                        <li>Passion for Travel</li>
                        <li>Personalized Service</li>
                        <li>Sustainable Tourism</li>
                        <li>Creating Lasting Memories</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;

