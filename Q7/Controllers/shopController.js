const Category = require("../models/Category");
const Product = require("../models/Product");

exports.getHome = async (req, res) => {
  const categories = await Category.find({ parentId: null });
  res.render("shop/index", { categories });
};

exports.getProductsByCategory = async (req, res) => {
  const products = await Product.find({ categoryId: req.params.categoryId });
  res.render("shop/product", { products });
};
