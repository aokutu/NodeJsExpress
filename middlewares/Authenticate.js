
const { request } = require("express");
const rateLimit = require("express-rate-limit");
const db = require("./../dbaccess");

const Limiter  = rateLimit({ max: 200, windowMs: 60 * 60 * 1000, message: "Too many request from this IP"});


const Checkuser = ((req, res, next) => {

    const username = req.body.username; 
    const email =  req.body.email; 

    const user =  db.prepare('SELECT  username ,email FROM users WHERE username = ?  OR email = ? ').get(username,email); 
    
     if (user){
     
       return   res.redirect("/loggin");
     }

     return next();
});


function RequireLogin(req,res,next){
  if (req.session && req.session.user) {
    console.log('MIDDLEWARE ALLOWED:', req.session.user);
    return next(); 

  } else {
     res.redirect("/loggin"); 
  }

}


function NoCache(req, res, next) {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
}


module.exports ={ Checkuser,RequireLogin ,NoCache , Limiter } ; 


