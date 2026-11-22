const fs = require("fs/promises");
const path = require('path');
const db = require("./../dbaccess");


function LandingPage(req,res){
    console.log("LANDING PAGE "); 
     res.sendFile(path.join(__dirname,"../views","index.html"));


};


function LogginPage(req,res){
    console.log("LOGGIN PAGE  "); 
     res.sendFile(path.join(__dirname,"../views","loggin.html"));


};

function NewUser(req,res){

 const username = req.body.username; 
 const email = req.body.email; 
 const password = req.body.password; 
 db.prepare('INSERT INTO users ( username, email,password) VALUES (?, ?, ?)').run(username,email,password); 


    console.log("New User   "); 
   res.redirect("/loggin"); 
};


module. exports ={LandingPage,LogginPage,NewUser} ; 