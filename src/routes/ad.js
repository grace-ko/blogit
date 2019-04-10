const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/ad", adController.index);
router.get("/ad/new", adController.new);
router.post("/ad/create", adController.create);
router.get("/ad/:id", adController.show);
router.post("/ad/:id/destroy", adController.destroy);
router.get("/ad/:id/edit", adController.edit);
router.post("/ad/:id/update", adController.update);
module.exports = router;
