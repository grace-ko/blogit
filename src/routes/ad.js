const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/ad", adController.index);

module.exports = router;
