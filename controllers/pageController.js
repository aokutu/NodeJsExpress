const fs = require("fs/promises");
const path = require('path');


function LandingPage(req,res){
    console.log("LANDING PAGE "); 
     res.sendFile(path.join(__dirname,"../views","index.html"));


};

module. exports = LandingPage; 