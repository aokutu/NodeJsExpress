const express = require("express");
const router = express.Router();

const { LandingPage,LogginPage,  NewUser ,AuthenticateLoggin, GetUserSessionName ,Logout } = require("../controllers/pageController");
const { Checkuser,RequireLogin ,NoCache  } = require("../middlewares/Authenticate");

router.get("/", NoCache , RequireLogin,LandingPage);
router.get("/loggin", LogginPage );
router.post("/api/register", Checkuser, NewUser);
router.post("/api/login",AuthenticateLoggin);
router.get("/api/me",NoCache ,RequireLogin,GetUserSessionName );
router.post("/logout",NoCache, Logout);


module.exports = router;