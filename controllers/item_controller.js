const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [item_count, category_count] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Home Page",
    item_count,
    category_count,
  });
});

exports.item_details = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const category = await Category.findById(item.category._id);
  if (item == null) {
    const err = new Error("Item not found");
    err.status(404);
    return next(err);
  }
  res.render("item_detail", { title: item.name, item, category });
});

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name category")
    .sort({ name: 1 })
    .populate("category")
    .exec();

  res.render("item_list", { allItems: allItems, title: "Item List" });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}, "name desc").sort({ name: 1 });
  res.render("item_form", {
    title: "Create Item",
    categories:categories
  });
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("response for post request");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`GET about ${req.params.id} item will be deleted`);
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`POST about ${req.params.id} item will be deleted`);
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send(`GET update for ${req.params.id}`);
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send(`POST update for ${req.params.id}`);
});
