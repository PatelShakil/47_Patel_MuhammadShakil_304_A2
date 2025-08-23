const express = require("express");
const router = express.Router();
const shopCtrl = require("../controllers/shopController");

router.get("/", shopCtrl.getHome);
router.get("/category/:categoryId", shopCtrl.getProductsByCategory);

module.exports = router;
