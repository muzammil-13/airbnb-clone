import React, { useState, useEffect } from 'react';
import '../styles/Bookings.css';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import axios from 'axios'; // For making API requests
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, differenceInDays } from 'date-fns';
import { Popover } from '@mui/material';


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

// Add a totalPrice state
const [totalPrice, setTotalPrice] = useState(0);

// Fix the calculateTotalPrice function
const calculateTotalPrice = () => {
    if (checkInDate && checkOutDate) {
        const nights = differenceInDays(checkOutDate, checkInDate);
        const baseTotal = parseInt(price) * nights * bookingDetails.guests;
        setTotalPrice(baseTotal);
        setBookingDetails(prev => ({
            ...prev,
            price: baseTotal
        }));
    }
};
// Add useEffect to recalculate price when dates or guests change
useEffect(() => {
    calculateTotalPrice();
}, [checkInDate, checkOutDate, bookingDetails.guests]);



    
    const [location, setLocation] = useState(null);
    // itinerary state to store the selected dates
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [itinerary, setItinerary] = useState(null);

    // Add this function inside the component
const generateItinerary = (event) => {
    setAnchorEl(event.currentTarget);
    const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    const dummyItinerary = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        activities: [
            `Morning: Breakfast at ${title}`,
            'Afternoon: Local sightseeing',
            'Evening: Dinner and relaxation'
        ]
    }));
    
    setItinerary(dummyItinerary);
};

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

                <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div className="date-selectors">
        <DatePicker
            label="Check-in Date"
            value={checkInDate}
            onChange={(date) => {
                setCheckInDate(date);
                setBookingDetails({
                    ...bookingDetails,
                    checkIn: format(date, 'yyyy-MM-dd')
                });
            }}
            renderInput={(params) => <TextField {...params} />}
            minDate={new Date()}
        />
        <DatePicker
            label="Check-out Date"
            value={checkOutDate}
            onChange={(date) => {
                setCheckOutDate(date);
                setBookingDetails({
                    ...bookingDetails,
                    checkOut: format(date, 'yyyy-MM-dd')
                });
            }}
            renderInput={(params) => <TextField {...params} />}
            minDate={checkInDate || new Date()}
        />
    </div>
</LocalizationProvider>

<Button
    variant="contained"
    color="secondary"
    onClick={generateItinerary}
    disabled={!checkInDate || !checkOutDate}
    fullWidth
    sx={{ mt: 2, mb: 2 }}
>
    Generate Sample Itinerary
</Button>

<Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={() => setAnchorEl(null)}
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
    }}
    transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
    }}
>
    <Box sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
            Your Itinerary planning
        </Typography>
        {itinerary && itinerary.map((day) => (
            <Box key={day.day} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Day {day.day}
                </Typography>
                {day.activities.map((activity, index) => (
                    <Typography key={index} variant="body2">
                        • {activity}
                    </Typography>
                ))}
            </Box>
        ))}
    </Box>
</Popover>

    
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

