var express = require("express");
var router = express.Router();

// Require controller modules.
const privatec = require("../controllers/privateController");

router.get("/user-list", privatec.userList);
router.get("/:rxId", privatec.list);
router.post("/:rxId", privatec.create);

module.exports = router;
