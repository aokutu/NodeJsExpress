const express = require('express');
const fs = require("fs/promises");
const path = require('path');
const dotenv = require('dotenv');
const  db = require("./dbaccess");


dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/////////////////////Routes //

app.get("/",function(req,res){
    console.log("LANDING PAGE "); 
    res.send("Landing page "); 

})

app.listen(PORT)