const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors"); 
const authRoutes  = require("./Routes/auth.routes") 

require("dotenv").config(); 

const app = express(); 

app.get('/', (req, res) => {
  res.send("Hello, world!");   
});

//middleware 
app.use(express.json()); 
app.use(cors( 
{ 
  origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
} 
)); 


//routes 
app.use("/api/auth",authRoutes );


//Database connection 
mongoose.connect(process.env.MONGODB_URI).then(() => { 
console.log("Connected to MongoDB"); 
}).catch((err) => { 
console.log('MongoDB connection error:', err); 
}); 
app.listen(process.env.PORT, () => { 
console.log(`Server is running on port ${process.env.PORT}`); 
}); 



// dummyJSON.com data check
// Could be GET or POST/PUT/PATCH/DELETE
fetch('https://dummyjson.com/test')
.then(res => res.json())
.then(console.log);
/* { status: 'ok', method: 'GET' } */