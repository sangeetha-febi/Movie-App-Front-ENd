const express = require("express");
const router = express.Router();
 const {registerAPI, loginAPI} =require("../controller/authenticationController");
 router.post("/register", registerAPI);
 router.post("/login", loginAPI);
 module.exports = router;