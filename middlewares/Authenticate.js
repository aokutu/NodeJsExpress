
const db = require("./../dbaccess");

const Checkuser = ((req, res, next) => {

    const username = req.body.username; 
	 
 console.log("Check user " + username ); 
 next();
});

module.exports ={ Checkuser   } ; 


