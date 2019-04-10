const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/ad", adController.index);
router.get("/ad/new", adController.new);
router.post("/ad/create", adController.create);
router.get("/ad/:id", adController.show);
router.post("/ad/:id/destroy", adController.destroy);
module.exports = router;
