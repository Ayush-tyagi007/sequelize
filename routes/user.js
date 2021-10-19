const express = require("express");
const user = require("../contollers");
const router = express.Router();
router.post("/register", user.register);
module.exports = router;
