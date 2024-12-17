const express=require('express');
const route=express.Router();

Router.get('/prod1',(req,res)=>{
    res.send("First product api here!")
})

Router.get('/prod2',(req,res)=>{
    res.send("Second product api link here!")
})

module.exports=router