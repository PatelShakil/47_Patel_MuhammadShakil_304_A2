const Category = require("../models/Category");
const Product = require("../models/Product");

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("categoryId");
  res.json(products);
};
