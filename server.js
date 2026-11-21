const express = require('express');
const fs = require("fs/promises");
const path = require('path');
const dotenv = require('dotenv');
const  db = require("./dbaccess");
const {LandingPage,LogginPage,NewUser }= require("./controllers/pageController");
const {  Checkuser  } = require ("./middlewares/Authenticate");


dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/////////////Middlewares /////////////////


/////////////////////Routes //

app.get("/",LandingPage);
app.get("/loggin",LogginPage);
app.post("/api/register", Checkuser,NewUser);



app.listen(PORT)