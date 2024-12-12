import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from 'react-share';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Menu,
    MenuItem,
} from '@mui/material';

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
        <Card sx={{ maxWidth: 345, boxShadow: 3 }}>  {/* Added boxShadow */}
            <CardMedia
                component="img"
                height="140" // Give the image explicit height
                image={image}
                alt={title}
                onError={(e) => {  // Error handler for image
                    e.target.src = '/images/placeholder.jpg'; // Placeholder image URL
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {price ? `Starting from ₹${price}` : "Contact for pricing"}  {/* Conditional price display */}
                </Typography>
            </CardContent>


 <CardActions disableSpacing>
                <Button size="small" onClick={handleClick} aria-controls={open ? 'share-menu' : undefined}
                    aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                    Share
                </Button>


                <Menu
                    id="share-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'share-button', }}
                >


                    <MenuItem>
                        <FacebookShareButton url={shareUrl} quote={shareTitle}>
                            <FacebookIcon size={32} round /> Share on Facebook
                        </FacebookShareButton>
                    </MenuItem> {/* Added closing MenuItem tag */}

                    <MenuItem>
                        <TwitterShareButton url={shareUrl} title={shareTitle}>
                            <TwitterIcon size={32} round /> Share on Twitter
                        </TwitterShareButton>
                    </MenuItem> {/* Added closing MenuItem tag */}


                    <MenuItem>
                        <WhatsappShareButton url={shareUrl} title={shareTitle}>
                            <WhatsappIcon size={32} round /> Share on Whatsapp
                        </WhatsappShareButton>
                    </MenuItem> {/* Added closing MenuItem tag */}




                </Menu>

                <Link to={`/details/${title}`}>
                    <Button size="small">Details</Button>
                </Link>


            </CardActions>




        </Card>
    );
};



LocationCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,  // Price is no longer required, can be null or undefined
};

export default LocationCard;
