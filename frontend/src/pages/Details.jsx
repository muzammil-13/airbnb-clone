import React from 'react';
import '../styles/Details.css'
import { useParams, Link } from 'react-router-dom'; // Import Link
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const Details = () => {

    const { title } = useParams(); // added for dynamic routing


  const locationData = {  // Data can be fetched from API/Database
    "Kerala Backwaters": {
      image: "/images/960px-Kumarkom.jpg",
      description: "Experience the serene backwaters of Kerala, enjoy houseboat stays, and explore the lush greenery.",
      price: 299,
        details: "Embark on a tranquil journey through the intricate network of canals, lakes, and lagoons. Witness the breathtaking beauty of nature.  Indulge in delicious Kerala cuisine."

    },
    // Add more locations here...
  };

  const location = locationData[title] || {}; // Get location data, handle if not found



  return (
    <div style={{padding: '20px'}}> {/* Added padding for better visuals */}
          <h1>Details for {title}</h1>
        <Card sx={{ maxWidth: 600, margin: '0 auto' }}> {/* Center the card */}
            <CardMedia
                component="img"
                height="300" // Set a fixed height or responsive height as needed.
                image={location.image}
                alt={title}
            />
            <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    From ₹{location.price}
                </Typography>
                <Typography variant="body1" paragraph>
                    {location.details || location.description /* Prioritize "details" if available */}
                </Typography>

                <Link to={`/bookings/${title}`}> {/* Use Link to create the navigation */}
                <Button variant="contained">Book Now</Button>
            </Link>

            </CardContent>

        </Card>

    </div>
  );
};

export default Details;
