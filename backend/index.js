require('dotenv').config();

const express=require('express')
const app=express()
const env=process.env;
const mongoose=require('mongoose')
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser')


mongoose.connect(env.MONG_URL)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>console.log("Error occurred:",err));

app.use(cors({
    origin: 'http://localhost:3000', // Only allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true // Allow credentials (cookies, authorization headers)
}));
app.use(bodyParser.json()) //add this line

// Your API routes go here
app.get('/api/test', (req, res) => {
    res.send('Hello from the backend!'); // Simple test route
  });

app.listen(env.PORT,()=>{
    console.log("Server is running on port:", env.port);
});