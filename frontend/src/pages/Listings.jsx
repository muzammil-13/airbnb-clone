import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';  // Import CircularProgress and Typography


function Listings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state



    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch('/api/listings');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setListings(data);


            } catch (error) {
                console.error('Error fetching listings:', error);
                setError(error.message); // Set the error message



            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };


        fetchListings();

    }, []);

    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}> {/* Center the loading indicator */}
          <CircularProgress />
        </div>
      );

    }



    if (error) {

      return <Typography variant="body1" color="error" align='center'>{error}</Typography>; // Display the error message
    }


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

