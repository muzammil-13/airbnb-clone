import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

export default function BasicRating() {
  const [value, setValue] = React.useState(4);

  const userComments = [
    {
      name: "Kevin",
      rating: 5,
      comment: "Amazing place! The views are breathtaking and the service is excellent.",
      date: "December 2023",
      avatar: "K"
    },
    {
      name: "Sarah",
      rating: 4,
      comment: "Great location, very peaceful and relaxing. Would definitely come back.",
      date: "January 2024",
      avatar: "S"
    },
    {
      name: "Mike",
      rating: 5,
      comment: "Perfect getaway spot. The amenities are top-notch.",
      date: "February 2024",
      avatar: "M"
    }
  ];

  return (
    <Box sx={{ '& > legend': { mt: 4 } }}>
      <Typography variant="h6" gutterBottom>Guest Reviews</Typography>
      {userComments.map((user, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ bgcolor: '#6e7e54', mr: 2 }}>{user.avatar}</Avatar>
            <Box>
              <Typography variant="subtitle1" component="span">{user.name}</Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                {user.date}
              </Typography>
            </Box>
          </Box>
          <Rating
            value={user.rating}
            readOnly
            size="small"
            sx={{ mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {user.comment}
          </Typography>
          {index < userComments.length - 1 && (
            <Divider sx={{ mt: 2 }} />
          )}
        </Box>
      ))}
    </Box>
  );
}
