import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const LocationCard = ({ image, title, description, price }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"  
        sx={{ height: 140 }}
        image={image}
        alt={title}  
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.primary"> {/* Display the price */}
          Starting at just ₹{price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Link to={`/details/${title}`}> {/* Link to /details/locationTitle */}
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
  price: PropTypes.number.isRequired,
};

export default LocationCard;
