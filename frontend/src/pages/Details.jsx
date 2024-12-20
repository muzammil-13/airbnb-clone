import React from 'react';
import '../styles/Details.css'
import { useParams,  useLocation, Link } from 'react-router-dom'; 
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Bookings from './Bookings';
import BasicRating from '../components/cards/BasicRating';

const Details = () => {
    const { title } = useParams(); // added for dynamic routing
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const imageUrl = searchParams.get('image');
    const price = searchParams.get('price');
    const description = searchParams.get('description');


  return (
          <div className="details-container" style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h1>Details for {title}</h1>
                    <Card sx={{ maxWidth: 600 }}> 
                        <CardMedia
                            component="img"
                            height="300"
                            image={imageUrl}
                            alt={title}
                        />
                        <CardContent>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h6" component="p" gutterBottom>
                                From ₹{price}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {description}
                            </Typography>
                            <BasicRating />
                        </CardContent>
                    </Card>
                </div>
                <div style={{ flex: 1 }}>
                    <Bookings price={price} />
                </div>
            </div>
        );
    };
    

export default Details;

