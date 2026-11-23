const express = require("express");
const router = express.Router();

const { LandingPage,LogginPage,  NewUser ,AuthenticateLoggin } = require("../controllers/pageController");
const { Checkuser,RequireLogin } = require("../middlewares/Authenticate");

router.get("/", RequireLogin,LandingPage);
router.get("/loggin", LogginPage );
router.post("/api/register", Checkuser, NewUser);
router.post("/api/login",AuthenticateLoggin);

module.exports = router;