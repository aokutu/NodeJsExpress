const express = require("express");
const router = express.Router();

const { LandingPage, LogginPage, NewUser } = require("../controllers/pageController");
const { Checkuser } = require("../middlewares/Authenticate");

router.get("/", LandingPage);
router.get("/loggin", LogginPage);
router.post("/api/register", Checkuser, NewUser);

module.exports = router;