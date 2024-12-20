import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Rating, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Listings() {
    const keralaListings = [
        {
            id: 1,
            name: "Kumarakom Lake Resort",
            location: "Kumarakom",
            image: "https://www.shutterstock.com/shutterstock/photos/305396333/display_1500/stock-photo-close-up-lifestyle-photo-of-hipster-student-accessories-still-life-of-random-objects-of-modern-305396333.jpg",
            description: "Luxury backwater resort featuring traditional Kerala architecture, infinity pool, and Ayurvedic spa.",
            price: 25000,
            rating: 4.8
        },
        {
            id: 2,
            name: "Tea Valley Resort Munnar",
            image: "https://www.shutterstock.com/shutterstock/photos/305396333/display_1500/stock-photo-close-up-lifestyle-photo-of-hipster-student-accessories-still-life-of-random-objects-of-modern-305396333.jpg",
            location: "Munnar",
            description: "Nestled in tea plantations offering panoramic valley views, mountain treks, and tea tasting experiences.",
            price: 15000,
            rating: 4.6
        },
        {
            id: 3,
            name: "Marari Beach Resort",
            image: "https://www.shutterstock.com/shutterstock/photos/305396333/display_1500/stock-photo-close-up-lifestyle-photo-of-hipster-student-accessories-still-life-of-random-objects-of-modern-305396333.jpg",
            location: "Marari Beach",
            description: "Beachfront eco-resort with traditional Kerala villas, seafood restaurant, and wellness center.",
            price: 18000,
            rating: 4.7
        },
        {
            id: 4,
            name: "Wayanad Wild Resort",
            image: "https://www.shutterstock.com/shutterstock/photos/305396333/display_1500/stock-photo-close-up-lifestyle-photo-of-hipster-student-accessories-still-life-of-random-objects-of-modern-305396333.jpg",
            location: "Wayanad",
            description: "Treehouse accommodation in the midst of rainforest, offering wildlife tours and nature walks.",
            price: 12000,
            rating: 4.5
        },
        {
            id: 5,
            name: "Coconut Lagoon",
            image: "https://www.shutterstock.com/shutterstock/photos/305396333/display_1500/stock-photo-close-up-lifestyle-photo-of-hipster-student-accessories-still-life-of-random-objects-of-modern-305396333.jpg",
            location: "Kumarakom",
            description: "Heritage lakeside resort accessible only by boat, featuring mansion rooms and private pools.",
            price: 22000,
            rating: 4.9
        },
        {
            id: 6,
            name: "Marari Beach Resort 2",
            image: "https://www.shutterstock.com/shutterstock/photos/305396333/display_1500/stock-photo-close-up-lifestyle-photo-of-hipster-student-accessories-still-life-of-random-objects-of-modern-305396333.jpg",
            location: "Marari Beac",
            description: "Beachfront eco-resort with traditional Kerala villas, seafood restaurant, and wellness center.",
            price: 18000,
            rating: 5.0
        }

    ];


    return (
        <Grid container spacing={3} sx={{ padding: 3, marginTop: '80px' }}>
            {keralaListings.map((listing) => (
                <Grid item xs={12} sm={6} md={4} key={listing.id}>
                    <Card sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'translateY(-5px)' }
                    }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={listing.image}
                            alt={listing.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {listing.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {listing.location}
                            </Typography>
                            <Rating value={listing.rating} readOnly precision={0.1} />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {listing.description}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                ₹{listing.price} per night
                            </Typography>
                            <Link to={`/details/${listing.name}?image=${encodeURIComponent(listing.image)}&price=${listing.price}`}>
                                <Button variant="contained" sx={{ mt: 2, bgcolor: '#6e7e54' }}>
                                    View Details
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default Listings;
