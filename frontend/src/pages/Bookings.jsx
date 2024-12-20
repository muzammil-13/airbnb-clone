import React, { useState, useEffect } from 'react';
import '../styles/Bookings.css';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import axios from 'axios'; // For making API requests
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';

const Bookings = ({price}) => {
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
        price: parseInt(price) // Use the passed price
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
            price: parseInt(price) * guests // Calculate using passed price
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

        <div className="bookings-container">
        <div className="booking-form-wrapper">
            <Typography variant="h4" className="booking-title">
                Book Your Stay at {title}
            </Typography>
            
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <TextField
                        className="form-field"
                        label="Full Name"
                        name="name"
                        value={bookingDetails.name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        className="form-field"
                        label="Email"
                        name="email"
                        type="email"
                        value={bookingDetails.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        className="form-field"
                        label="Phone"
                        name="phone"
                        value={bookingDetails.phone}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        className="form-field"
                        label="Number of Guests"
                        name="guests"
                        type="number"
                        value={bookingDetails.guests}
                        onChange={handleGuestChange}
                        fullWidth
                        variant="outlined"
                    />
                </div>
    
                <div className="price-summary">
                    <Typography variant="h5">Price Details</Typography>
                    <div className="price-breakdown">
                        <span>₹{bookingDetails.price} x {bookingDetails.guests} guests</span>
                        <span>₹{bookingDetails.price * bookingDetails.guests}</span>
                    </div>
                    <div className="price-total">
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">₹{bookingDetails.price * bookingDetails.guests}</Typography>
                    </div>
                </div>
    
                <div className="button-group">
                    <Button
                        className="booking-button primary-btn"
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Reserve
                    </Button>
                    <Button
                        className="booking-button secondary-btn"
                        onClick={handleReset}
                        variant="outlined"
                        fullWidth
                    >
                        Clear
                    </Button>
                    <Button
                        className="booking-button cancel-btn"
                        onClick={handleCancel}
                        variant="outlined"
                        color="error"
                        fullWidth
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    </div>    
            );
        }
        


export default Bookings;

