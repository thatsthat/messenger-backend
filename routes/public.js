var express = require("express");
var router = express.Router();

const user = require("../controllers/publicController");

router.post("/login", user.login);
router.post("/signup", user.signup);

module.exports = router;
