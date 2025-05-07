const express = require("express")
const router = express.Router();
const { createUser, loginUser, forgotPassword, upDatePasswod } = require("../controllers/User-Controller");
const { authMiddleware } = require("../middleware/authmiddleware");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.post("/forgotPassword", forgotPassword);

router.put("/upDatePasswod", authMiddleware, upDatePasswod)


module.exports = router;



