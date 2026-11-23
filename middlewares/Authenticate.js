
const { request } = require("express");
const db = require("./../dbaccess");

const Checkuser = ((req, res, next) => {

    const username = req.body.username; 
    const email =  req.body.email; 

    const user =  db.prepare('SELECT  username ,email FROM users WHERE username = ?  OR email = ? ').get(username,email); 
    
     if (user){
     
       return res.status(409).json({
      error: "Username or email already in use",
    });

     }

     return next();
});

module.exports ={ Checkuser   } ; 


