const express = require("express");
const router = express.Router();
const adminCtrl = require("../Controllers/adminController");

router.get("/categories", adminCtrl.getCategories);
router.post("/categories", adminCtrl.postCategory);

router.get("/products", adminCtrl.getProducts);
router.post("/products", adminCtrl.postProduct);

module.exports = router;
