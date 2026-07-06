const express = require("express");
const router = express.Router();
const buffetController = require("../controllers/buffetController");

router.get("/", buffetController.getBuffetHome);
router.get("/:id", buffetController.getBuffetDetails);

module.exports = router;
