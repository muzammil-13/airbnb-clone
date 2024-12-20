import React, { useState } from 'react';
import { 
    Paper, 
    InputBase, 
    IconButton, 
    Divider,
    Box,
    Typography,
    Popover
} from '@mui/material';

import { 
    Search as SearchIcon,
    DateRange,
    Person,
    Place
} from '@mui/icons-material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function SearchTrip() {
    const [location, setLocation] = useState('');
    const [dates, setDates] = useState([null, null]);
    const [guests, setGuests] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSearch = () => {
        // Implement search logic here
        console.log({ location, dates, guests });
    };

    const handleDateClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 800,
                    margin: '20px auto',
                    borderRadius: '50px',
                    position: 'relative',
                    zIndex: 2
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Place sx={{ color: '#6E7E54', mx: 1 }} />
                    <InputBase
                        placeholder="Where are you going?"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ ml: 1, flex: 1 }}
                    />
                </Box>
                
                <Divider orientation="vertical" flexItem />
                
                <Box
                    onClick={handleDateClick}
                    sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', px: 2 }}
                >
                    <DateRange sx={{ color: '#6E7E54' }} />
                    <Typography sx={{ ml: 1 }}>
                        {dates[0] ? dates[0].toLocaleDateString() : 'Check-in'} - 
                        {dates[1] ? dates[1].toLocaleDateString() : 'Check-out'}
                    </Typography>
                </Box>
                
                <Divider orientation="vertical" flexItem />
                
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                    <Person sx={{ color: '#6E7E54' }} />
                    <Typography sx={{ mx: 1 }}>
                        {guests} {guests === 1 ? 'Guest' : 'Guests'}
                    </Typography>
                    <IconButton 
                        onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                    >
                        -
                    </IconButton>
                    <IconButton 
                        onClick={() => setGuests(prev => prev + 1)}
                    >
                        +
                    </IconButton>
                </Box>

                <IconButton 
                    sx={{ 
                        bgcolor: '#6E7E54', 
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                    }}
                    onClick={handleSearch}
                >
                    <SearchIcon />
                </IconButton>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                        <DatePicker
                            label="Check-in"
                            value={dates[0]}
                            onChange={(newDate) => setDates([newDate, dates[1]])}
                        />
                        <DatePicker
                            label="Check-out"
                            value={dates[1]}
                            onChange={(newDate) => setDates([dates[0], newDate])}
                            minDate={dates[0]}
                        />
                    </Box>
                </Popover>
            </Paper>
        </LocalizationProvider>
    );
}

export default SearchTrip;