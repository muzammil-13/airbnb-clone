import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Rating, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Listings() {
    const keralaListings = [
        {
            id: 1,
            name: "Kumarakom Lake Resort",
            location: "Kumarakom",
            image: "https://www.kumarakomlakeresort.in/assets/images/luxury-dining/vembanad-the-seafood-bar/vembanad-the-seafood-bar.jpg",
            description: "Kumarakom Lake Resort is a luxury resort located in Kumarakom, Kerala, India. The resort is set on 25 acres of land on the Vembanad Lake shore. The resort has 59 villas, suites and rooms, a wellness spa, and two restaurants. The resort is a part of the Small Luxury Hotels of the World (SLH) marketing chain.",
            price: 25000,
            rating: 4.8
        },
        {
            id: 2,
            name: "Tea Valley Resort Munnar",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/f1/6b/20/exterior.jpg?w=1200&h=-1&s=1",
            location: "Munnar",
            description: "Tea Valley Resort Munnar is a 3-star property located in Munnar. Featuring a 24-hour front desk, this property also provides guests with a restaurant. The property is non-smoking and is situated 12 km from Munnar Tea Museum.",
            price: 15000,
            rating: 4.6
        },
        {
            id: 3,
            name: "Marari Beach Resort",
            image: "https://www.cghearth.com/uploads/DestinationImages/20170602073240AMDestImgmararibeach-beachviewfrompool.jpg",
            location: "Marari Beach",
            description: "Marari Beach Resort is a beach resort located in Alappuzha district of Kerala, India. It was awarded the title of Best Boutique Hotel by the World Boutique Hotel Awards in 2017. The resort is set in 30 acres of land with a large pond in the middle.",
            price: 18000,
            rating: 4.0
        },
        {
            id: 4,
            name: "Wayanad Wild Resort",
            image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/361058006.jpg?k=4f4f7b8096c9c2a7041c02226ad881b5bc883e18b95394bad7163f79c3bc490e&o=&hp=1",
            location: "Wayanad",
            description: "Treehouse accommodation in the midst of rainforest, offering wildlife tours and nature walks.",
            price: 12000,
            rating: 4.9
        },
        {
            id: 5,
            name: "Coconut Lagoon",
            image: "https://www.cghearth.com/uploads/DestinationImages/20190828072807amdestimg1.jpg",
            location: "Kumarakom",
            description: "Coconut Lagoon is a CGH Earth property located in Kumarakom, Kerala, India. The resort is set on the Vembanad Lake shore. The resort is a part of the Small Luxury Hotels of the World (SLH) marketing chain.",
            price: 22000,
            rating: 3.9
        },
        {
            id: 6,
            name: "Marari Beach Resort 2",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a7/86/ce/modelled-on-the-fishermens.jpg?w=1200&h=-1&s=1",
            location: "Marari Beac",
            description: "Beachfront eco-resort with traditional Kerala villas, seafood restaurant, and wellness center.",
            price: 18000,
            rating: 4.9
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
