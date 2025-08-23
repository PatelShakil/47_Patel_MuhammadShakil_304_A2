const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/apiController");

router.get("/categories", apiCtrl.getCategories);
router.get("/products", apiCtrl.getProducts);

module.exports = router;
