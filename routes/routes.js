const express = require("express");
const multer = require("multer");
const router = express.Router();

const { LandingPage,LogginPage,  NewUser ,AuthenticateLoggin, GetUserSessionName ,Logout ,uploadFile , PushChatMessage } = require("../controllers/pageController");
const { Checkuser,RequireLogin ,NoCache  } = require("../middlewares/Authenticate"); 
const upload = multer({ dest: "./uploads/" });

router.get("/", NoCache , RequireLogin,LandingPage);
router.get("/loggin", LogginPage );
router.post("/api/register", Checkuser, NewUser);
router.post("/api/login",AuthenticateLoggin);
router.get("/api/me",NoCache ,RequireLogin,GetUserSessionName );
router.post("/api/messages",NoCache , RequireLogin,PushChatMessage );
router.post("/logout",NoCache, Logout);
router.post("/upload", upload.single("demo_image"), uploadFile);





module.exports = router;