import React, { useState, useEffect } from 'react';
import { Button, CardActions, Card, CardMedia, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/Listings.css';

function Listings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            const options = {
                method: 'GET',
                url: 'https://airbnb-listings.p.rapidapi.com/v2/listingsByZipcode',
                params: { state: 'us', zipcode: '92037', offset: '0' },
                headers: {
                    'x-rapidapi-key': 'd0f18fb5d1mshcddba1ba51d1ec5p11106djsnca737e7091db',
                    'x-rapidapi-host': 'airbnb-listings.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log('API Response:', response.data); // Log the entire response
                if (response.data && response.data.results) {
                    setListings(response.data.results);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {listings.length > 0 ? (
                listings.map((listing) => (
                    <Grid item xs={12} sm={6} md={4} key={listing.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={listing.thumbnail_url}
                                alt={listing.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {listing.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {listing.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography>No listings available</Typography>
            )}
        </Grid>
    );
}

export default Listings;