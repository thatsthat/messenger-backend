var express = require("express");
var router = express.Router();

const user = require("../controllers/userController");

router.post("/login", user.login);
router.post("/signup", user.signup);

module.exports = router;
