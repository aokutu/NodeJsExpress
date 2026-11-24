
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


module.exports ={ Checkuser,RequireLogin ,NoCache  } ; 


