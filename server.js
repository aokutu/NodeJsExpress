const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const router = require("./routes/routes");


dotenv.config(); 

const PORT = process.env.PORT || 3000; 
const app = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'gfg-key',
  resave: false,
  saveUninitialized: false
}));


app.use("/", router);


app.listen(PORT)