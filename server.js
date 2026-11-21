const express = require('express');
const fs = require("fs/promises");
const path = require('path');
const dotenv = require('dotenv');
const  db = require("./dbaccess");
const {LandingPage,LogginPage,NewUser }= require("./controllers/pageController");
const {  Checkuser  } = require ("./middlewares/Authenticate");
const router = require("./routes/routes");


dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);


app.listen(PORT)