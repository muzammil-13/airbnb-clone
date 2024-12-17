require('dotenv').config();

const express=require('express')
const app=express()
const env=process.env;
const mongoose=require('mongoose')

mongoose.connect(env.MONG_URL)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>console.log("Error occurred:",err));

app.listen(env.PORT,()=>{
    console.log("Server is running on port:", env.port);
});