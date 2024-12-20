import { useState, useEffect } from 'react'; // Import useEffect
import '../styles/Home.css';
import axios from 'axios';
import LocationCard from '../components/cards/LocationCard';
import { IoFilterCircle } from "react-icons/io5";
import { SiChatbot } from "react-icons/si";
import Chatbot from '../components/Chatbot';
import { Popover, Box, Typography, Checkbox, Slider, Button } from '@mui/material';
import SearchTrip from '../components/SearchTrip';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';


const Home = () => { 
    const [showChatbot, setShowChatbot] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    
    // Add these state variables inside the Home component
    const [userAnchorEl, setUserAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

// Add these handler functions
    const handleUserClick = (event) => { 
        setUserAnchorEl(event.currentTarget);
    };

    const handleUserClose = () => {
        setUserAnchorEl(null);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserAnchorEl(null);
    // Add your logout logic here
};


    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleChatbot = (event) => {
        setAnchorEl(event.currentTarget);
        setShowChatbot(!showChatbot);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowChatbot(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('/api/listings');
                setListings(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    // filter icon responding
    const [filterAnchor, setFilterAnchor] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: [0, 5000],
        propertyType: [],
        amenities: []
    });

    const handleFilterClick = (event) => {
        setFilterAnchor(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchor(null);
    };

    return (
        <div className="main" style={{ 
            paddingTop: '10px' // Adjust this value based on your header height
        }}>

            <div className="mainContainer">

    <div className="userIconContainer" style={{ 
        position: 'absolute', 
        top: 20, 
        right: 20, 
        zIndex: 1100 
    }}>
    <IconButton onClick={handleUserClick}>
        {isLoggedIn ? (
            <Avatar sx={{ bgcolor: 'white' }}>U</Avatar>
        ) : (
            <AccountCircle sx={{ fontSize: 40, color: 'white' }} />
        )}
    </IconButton>
    <Menu
        anchorEl={userAnchorEl}
        open={Boolean(userAnchorEl)}
        onClose={handleUserClose}
    >
        {isLoggedIn ? (
            [
                <MenuItem key="profile">Profile</MenuItem>,
                <MenuItem key="bookings">My Bookings</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
            ]
        ) : (
            <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
        )}
    </Menu>
</div>

                <div className="titleContainer">

                <div className="filterIconContainer">
            <IoFilterCircle 
                onClick={(e) => {
                    e.stopPropagation();
                    handleFilterClick(e);
                }} 
                style={{ 
                    fontSize: '40px', 
                    cursor: 'pointer'
                }} 
            />
        </div>
        <div className='searchTripContainer' onClick={(e) => e.stopPropagation()}>
            <SearchTrip />
        </div>

                    <Popover
                    open={Boolean(filterAnchor)}
                    anchorEl={filterAnchor}
                    onClose={handleFilterClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{ zIndex: 1200 }} 
                >
                    <Box sx={{ p: 3, width: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Price Range
                        </Typography>
                        <Slider
                            value={filters.priceRange}
                            onChange={(e, newValue) => setFilters({...filters, priceRange: newValue})}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `₹${value}`}
                            min={0}
                            max={5000}
                        />


                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Property Type
                        </Typography>
                        {['House', 'Apartment', 'Villa', 'Resort'].map(type => (
                            <Box key={type} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox 
                                    checked={filters.propertyType.includes(type)}
                                    onChange={(e) => {
                                        const newTypes = e.target.checked 
                                            ? [...filters.propertyType, type]
                                            : filters.propertyType.filter(t => t !== type);
                                        setFilters({...filters, propertyType: newTypes});
                                    }}
                                />
                                <Typography>{type}</Typography>
                            </Box>
                        ))}

                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Amenities
                        </Typography>
                        {['WiFi', 'Pool', 'Kitchen', 'AC', 'Parking'].map(amenity => (
                            <Box key={amenity} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox 
                                    checked={filters.amenities.includes(amenity)}
                                    onChange={(e) => {
                                        const newAmenities = e.target.checked 
                                            ? [...filters.amenities, amenity]
                                            : filters.amenities.filter(a => a !== amenity);
                                        setFilters({...filters, amenities: newAmenities});
                                    }}
                                />
                                <Typography>{amenity}</Typography>
                            </Box>
                        ))}

                        <Button 
                            variant="contained" 
                            fullWidth 
                            sx={{ mt: 3 }}
                            onClick={handleFilterClose}
                        >
                            Show Results
                        </Button>
                    </Box>
                </Popover>
                    
                    <div
                        className="chatIconContainer"
                        onClick={toggleChatbot}
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            zIndex: 100,
                            cursor: 'pointer',
                            backgroundColor: '#6e7e54',
                            padding: '10px',
                            borderRadius: '50%'
                        }}
                    >
                        <SiChatbot />
                    </div>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>
            {showChatbot && <Chatbot />}
            </Typography>
            </Popover>


                    <h1>Welcome to SANCHARAM Travels</h1>
                </div>
                
                <div className="contentContainer">
                    <h2>Your Journey Begins Here</h2>
                    <p>Discover amazing destinations and create unforgettable memories</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores cupiditate odio ad nemo, repellat natus explicabo reprehenderit obcaecati soluta quam. Error voluptates suscipit sapiente labore officia, exercitationem doloremque vero quas!</p>
                </div>

                <div className="locationsGrid">
                    <LocationCard
                        image="/images/960px-Kumarkom.jpg"
                        title="Kerala Backwaters"
                        description="Officially called Alappuzha, Alleppey is known for its network of canals and lagoons with beautiful backwaters and the houseboats offering overnight stays. Located in the southern part of Kerala, the coastline of Alleppey offers some of the best beaches with water sports during the dry sea...
                                        Best Time: June to March"
                        price={299}
                    />
                    <LocationCard
                        image="https://www.holidify.com/images/bgImages/MUNNAR.jpg"
                        title="Munnar"
                        description="Famous for the tea estates, greenery, winding roads, blanket of mist, and viewpoints, Munnar is a hill station in Kerala, located in the Idukki district. Lying in the Western Ghats at 1600 metres, it is one of the most sought after and visited travel destinations globally, especially popular amongst...
                                        Best Time: September to May"
                        price={199}
                    />
                    <LocationCard
                        image="https://www.holidify.com/images/bgImages/KOCHI.jpg"
                        title="Kochi"
                        description="Lying on the Malabar coast in the southwest of India, Kochi or Cochin is a port city with a trading history that dates back to at least 600 years. Known popularly as the Queen of the Arabian Sea, the city is also Kerala's financial, commercial, and industrial capital. Exuding an old-world charm with...
                                    Best Time: July to April"
                        price={1999}
                    />
                    <LocationCard
                        image="https://www.holidify.com/images/bgImages/VARKALA.jpg"
                        title="Varkala"
                        description="Varkala is a coastal town in the southern part of Kerala known for the unique 15m high 'Northern Cliff' adjacent to the Arabian Sea. Located approximately 50 kilometers north of Thiruvananthapuram (Trivandrum), the capital city of Kerala, Varkala offers a perfect blend of natural beauty, s...
                                        Best Time: October to February"
                        price={2299}
                    />
                    <LocationCard
                        image="https://www.holidify.com/images/bgImages/WAYANAD.jpg"
                        title="Wayanadu"
                        description="Nestled in the Western Ghats of Kerala, Wayanad in Kerala is famous for its spice plantations and wildlife. Situated at an altitude ranging from 700 to 2100 meters above sea level, this picturesque region is blessed with verdant forests, mist-covered hills, and glistening waterfalls, making it ...
                                        Best Time: Throughout the year"
                        price={3199}
                    />
                    <LocationCard
                        image="https://www.holidify.com/images/bgImages/KOZHIKODE.jpg"
                        title="Kozhikkode"
                        description="Formerly known as Calicut, Kozhikode is located in Kerala. It was the Capital of Malabar during the Zamorin rule 500 years ago and is famous for its centuries-old trade in cotton and spices with Jews, Arabs, Phoenicians and Chinese. Basking in the idyllic setting of the serene Arabian Sea on th...
                                        Best Time: October to March"
                        price={1299}
                    />
                    {/* {loading ? (
                    <h3>Loading listings...</h3>
                        ) : error ? (
                    <p>Error: {error}</p>
                        ) : (
                    <Listings listings={listings} />
                        )} */}
                </div>
            </div>

        </div>
    );
};

export default Home;

