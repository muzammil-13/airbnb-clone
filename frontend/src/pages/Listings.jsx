import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Grid from '@mui/material/Grid';  // Assuming you are using Material UI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Listings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        // Fetch listings data from your API endpoint here
        const fetchListings = async () => {
            try {
                const response = await fetch('/api/listings'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setListings(data);
            } catch (error) {
                console.error('Error fetching listings:', error);
                // Handle error, e.g., display an error message
            }
        };

        fetchListings();
    }, []);


    return (
        <div style={{ padding: '20px' }}>
            <Grid container spacing={3}> {/* Use Grid for responsive layout */}
                {listings.map((listing) => (
                    <Grid item xs={12} sm={6} md={4} key={listing.id}> {/* Adjust grid breakpoints */}
                        <Card>
                           <CardMedia
                                component="img"
                                height="200" // Adjust as needed
                                image={listing.image}
                                alt={listing.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  <Link to={`/details/${listing.title}`}>{listing.title}</Link> {/* Link to Details page */}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {listing.description.substring(0, 100)}... {/* Limit description length */}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    ₹{listing.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View Details</Button> {/* Add actions like "Book Now" */}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Listings;

