const fs = require("fs/promises");
const path = require('path');
const db = require("./../dbaccess");

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;


function LandingPage(req,res){
    console.log("LANDING PAGE "); 
     res.sendFile(path.join(__dirname,"../views","index.html"));


};


function LogginPage(req,res){
    console.log("LOGGIN PAGE  "); 
     res.sendFile(path.join(__dirname,"../views","loggin.html"));


};

 async   function NewUser(req,res){

 const username = req.body.username; 
 const email = req.body.email; 
 const password = req.body.password; 
 const hashedPassword = await bcrypt.hash(password, 10);
 db.prepare('INSERT INTO users ( username, email,password) VALUES (?, ?, ?)').run(username,email, hashedPassword  ); 


    console.log("New User   "); 
   res.redirect("/loggin"); 
};


async function AuthenticateLoggin(req,res){
    const email = req.body.email; 
    const password = req.body.password; 
    const user =  db.prepare('SELECT  username,password FROM users WHERE  email = ? ').get(email); 

      if (user){
      const isMatch = await bcrypt.compare(password, user.password); 
      if (! isMatch){
         return   res.redirect("/loggin"); 

      }

       req.session.user = user.username; 

      console.log('LOGGED IN SESSION:', req.session);

        return  res.redirect("/"); 
       
    } else {
       return   res.redirect("/loggin"); 
    }
    

}

function GetUserSessionName(req,res){
     const name =  req.session.user; 
     console.log("Test GetUserSession" + name );
     if (name == undefined ){
          res.redirect("/loggin");

     }else {
           res.json({username : name }); 
     }
    

}

function Logout(req,res){
     console.log("Logg out "  + req.session.user );
     req.session.destroy();
     res.redirect("/loggin");
}

function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  return res.json({
    message: "Uploaded",
    file: req.file,
  });
}


function PushChatMessage(req ){
  const msg = req.body.message;
  const name =  req.session.user; 
  const now = new Date();

  const data = {
    sender : name,
    message : msg ,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  }


  console.log(data )

}


module. exports ={LandingPage,LogginPage,NewUser,AuthenticateLoggin,GetUserSessionName,Logout,uploadFile , PushChatMessage } ; 