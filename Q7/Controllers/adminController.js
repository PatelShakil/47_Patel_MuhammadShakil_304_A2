const Category = require("../models/Category");
const Product = require("../models/Product");

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.render("admin/categories", { categories });
};

exports.postCategory = async (req, res) => {
  await Category.create({
    name: req.body.name,
    parentId: req.body.parentId || null,
  });
  res.redirect("/admin/categories");
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("categoryId");
  const categories = await Category.find();
  res.render("admin/products", { products, categories });
};

exports.postProduct = async (req, res) => {
  await Product.create({
    name: req.body.name,
    price: req.body.price,
    categoryId: req.body.categoryId,
  });
  res.redirect("/admin/products");
};
