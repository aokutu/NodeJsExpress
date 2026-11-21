const express = require('express');
const fs = require("fs/promises");
const path = require('path');
const dotenv = require('dotenv');
const  db = require("./dbaccess");
const {LandingPage,LogginPage }= require("./controllers/pageController");


dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/////////////////////Routes //

app.get("/",LandingPage);
app.get("/loggin",LogginPage);


app.listen(PORT)