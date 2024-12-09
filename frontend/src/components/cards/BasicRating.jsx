import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating() {
  const [value, setValue] = React.useState(2);

  return (
    <Box sx={{ '& > legend': { mt: 4 } }}>
      <Typography component="legend">Rating :</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque, veniam quasi ipsa tenetur ducimus nostrum accusamus enim illo eum quaerat odio placeat, ex perspiciatis exercitationem incidunt ea facere eaque harum.</p>
    </Box>
  );
}
