var express = require("express");
var router = express.Router();

// Require controller modules.
const message = require("../controllers/messageController");

router.get("/:rxId", message.list);
router.post("/:rxId", message.create);

module.exports = router;
