const fs = require("fs/promises");
const path = require('path');


function LandingPage(req,res){
    console.log("LANDING PAGE "); 
     res.sendFile(path.join(__dirname,"../views","index.html"));


};


function LogginPage(req,res){
    console.log("LOGGIN PAGE  "); 
     res.sendFile(path.join(__dirname,"../views","loggin.html"));


};

function NewUser(req,res){
    console.log("New User   "); 
   res.redirect("/loggin"); 
};


module. exports ={LandingPage,LogginPage,NewUser} ; 