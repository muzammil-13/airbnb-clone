const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors"); 
const authRoutes  = require("./Routes/auth.routes") 

require("dotenv").config(); 

const app = express(); 

//middleware 
app.get('/', (req, res) => {
  res.send("Hello, world!");   
});
app.use(express.json()); 
app.use(cors( 
{ 
    origin: process.env.CLIENT_URL, 
    credentials: true,
} 
)); 


//routes 
app.use("/api/auth",authRoutes );

// fetch('http://localhost:3000/') // Use the correct URL here
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch(error => console.error("Error fetching listings:", error));


//Database connection 
mongoose.connect(process.env.MONGODB_URI).then(() => { 
console.log("Connected to MongoDB"); 
}).catch((err) => { 
console.log('MongoDB connection error:', err); 
}); 
app.listen(process.env.PORT, () => { 
console.log(`Server is running on port ${process.env.PORT}`); 
}); 