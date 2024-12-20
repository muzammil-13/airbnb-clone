import React, { useState, useEffect, useRef } from 'react';
import { Button, CardActions, Card, CardMedia, CardContent, CircularProgress, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Popover } from '@mui/material';
import axios from 'axios';
import '../styles/Listings.css';

function Listings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quotaExceeded, setQuotaExceeded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const errorButtonRef = useRef(null);

    useEffect(() => {
        const fetchListings = async () => {
            const options = {
                method: 'GET',
                url: 'https://travel-advisor.p.rapidapi.com/locations/search',
                params: { query: 'Kerala', limit: '10', offset: '0', units: 'km' },
                headers: {
                    'x-rapidapi-key': '123456789',
                    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log('API Response:', response.data); // Log the entire response
                if (response.data && response.data.data) {
                    setListings(response.data.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
                if (error.message.includes('you have exceeded your rapidapi basic quota')) {
                    setQuotaExceeded(true);
                }
                if (error.message.includes('Request failed with status code 429')) {
                    setAnchorEl(errorButtonRef.current);
                }
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
        <>
            <Grid container spacing={2}>
                {listings.length > 0 ? (
                    listings.map((listing) => (
                        <Grid item xs={12} sm={6} md={4} key={listing.result_object.location_id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={listing.result_object.photo ? listing.result_object.photo.images.medium.url : 'https://via.placeholder.com/140'}
                                    alt={listing.result_object.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {listing.result_object.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {listing.result_object.description || 'No description available'}
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
            <Dialog open={quotaExceeded} onClose={() => setQuotaExceeded(false)}>
                <DialogTitle>Quota Exceeded</DialogTitle>
                <DialogContent>
                    <Typography>You have exceeded your RapidAPI basic quota. Please upgrade your plan.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setQuotaExceeded(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
            <Button ref={errorButtonRef} style={{ display: 'none' }}>Error</Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>Error: {error}</Typography>
            </Popover>
        </>
    );
}

export default Listings;