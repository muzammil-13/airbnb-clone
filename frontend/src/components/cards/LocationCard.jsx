import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import './LocationCard.css';

const LocationCard = ({ image, title, description, price }) => {
    const shareUrl = window.location.href;
    const shareTitle = title;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card className="location-card">
            <CardMedia
                component="img"
                height="240"
                image={image}
                alt={title}
                className="card-media"
            />
            <CardContent className="card-content">
                <Typography variant="h6" className="card-title">
                    {title}
                </Typography>
                <Typography variant="body2" className="card-description">
                    {description}
                </Typography>
                <Typography variant="h6" className="card-price">
                    ₹{price} <span className="price-suffix">per night</span>
                </Typography>
            </CardContent>
            <CardActions className="card-actions">
                <Button 
                    size="small" 
                    onClick={handleClick}
                    className="share-button"
                >
                    Share
                </Button>
                <Menu
                    id="share-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'share-button' }}
                >
                    <MenuItem>
                        <FacebookShareButton url={shareUrl} quote={shareTitle}>
                            <FacebookIcon size={32} round /> Share on Facebook
                        </FacebookShareButton>
                    </MenuItem>
                    <MenuItem>
                        <TwitterShareButton url={shareUrl} title={shareTitle}>
                            <TwitterIcon size={32} round /> Share on Twitter
                        </TwitterShareButton>
                    </MenuItem>
                    <MenuItem>
                        <WhatsappShareButton url={shareUrl} title={shareTitle}>
                            <WhatsappIcon size={32} round /> Share on Whatsapp
                        </WhatsappShareButton>
                    </MenuItem>
                </Menu>
                <Link to={`/bookings/${title}?image=${encodeURIComponent(image)}`} className="action-link">
                    <Button size="small" className="book-button">Book Now</Button>
                </Link>
                <Link to={`/details/${title}?image=${encodeURIComponent(image)}&price=${price}&description=${encodeURIComponent(description)}`} className="action-link">
                    <Button size="small" className="details-button">Details</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default LocationCard;
