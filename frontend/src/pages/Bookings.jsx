import React, { useState, useEffect } from 'react';
import '../styles/Bookings.css';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import axios from 'axios'; // For making API requests
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';

const Bookings = () => {
    const { title } = useParams(); // Get the title from route parameters
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        guests: 1,
        checkIn: '',
        checkOut: '',
        locationTitle: title, 
        price: 0  
    });


    const [location, setLocation] = useState(null);


    useEffect(() => {
        axios.get(`/api/locations/${title}`)
            .then(response => {
                setLocation(response.data);

                setBookingDetails(prevDetails => ({ ...prevDetails, price: response.data.price }));

            })
            .catch(error => {
                console.error("Error fetching location details:", error);
            });

    }, [title]);



    const handleChange = (e) => {
        setBookingDetails({
            ...bookingDetails,
            [e.target.name]: e.target.value,
        });

    };

    const handleGuestChange = (e) => {
        const guests = parseInt(e.target.value, 10);
        setBookingDetails({
            ...bookingDetails,
            guests,
            price: location.price * guests
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/bookings', bookingDetails); //Send booking details to API
            console.log('Booking successful:', response.data);
            navigate('/');  // Navigate to bookings page or confirmation page **currently root 

        } catch (error) {
          console.error('Success', error);
          // Display a user-friendly error message, e.g., using an alert.
          alert("success");
      }
    };

 

    const handleReset = () => {
        setBookingDetails({
            name: '',
            email: '',
            phone: '',
            guests: 1,
            checkIn: '',
            checkOut: '',
            locationTitle: title,
            price: location.price
        });
    };

    const handleCancel = () => {
        navigate('/'); // Navigate to the home page or another appropriate page
    };


    if (!location) {
        return <div>Loading location details...</div>; // or handle the case where location is not found
    }



    return (
      <div className='main-booking'>
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Book {title}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="name"
                          label="Full Name"
                          name="name"
                          autoComplete="name"
                          autoFocus
                          value={bookingDetails.name}
                          onChange={handleChange}

                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField

                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={bookingDetails.email}
                          onChange={handleChange}


                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="guests"
                          label="Number of Guests"
                          name="guests"
                          type="number"
                          value={bookingDetails.guests}
                          onChange={handleGuestChange}
                      />
                  </Grid>
                  {/* ...other fields similarly */}

                </Grid>
                <Typography variant="h6" align="center" gutterBottom>
                    Total Cost: ${bookingDetails.price}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Book Now
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
      </div>

    );
};


export default Bookings;

