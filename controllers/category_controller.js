const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.category_details = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  const items = await Item.find({ category: category }, "name description");
  if (category == null) {
    const err = new Error("category not found");
    err.status(404);
    return next(err);
  }
  res.render("category_detail", { title: category.name, category, items });
});

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategory = await Category.find({}, "name description")
    .sort({ name: 1 })
    .exec();

  res.render("category_list", {
    allCategory: allCategory,
    title: "Category List",
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", {
    title: "Create Category",
  });
});

exports.category_create_post = [
  body("name", "Please provide category name")
    .isLength({ min: 1 })
    .trim()
    .escape(),
  body("description").optional({ checkFalsy: true }).escape(),
  body("add_on", "Invalid Date")
    .isISO8601()
    .toDate()
    .optional({ checkFalsy: true }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    if (req.body.add_on) {
      category.add_on = add_on;
    }
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`GET about ${req.params.id} item will be deleted`);
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`POST about ${req.params.id} item will be deleted`);
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  if (category === null) {
    const err = new Error("Category not Found");
    err.status = 404;
    return next(err);
  }

  res.render("category_form", {
    title: "Update Category",
    category,
  });
});

exports.category_update_post = [
  body("name", "Please provide category name")
    .isLength({ min: 1 })
    .trim()
    .escape(),
  body("description").optional({ checkFalsy: true }).escape(),
  body("add_on", "Invalid Date")
    .isISO8601()
    .toDate()
    .optional({ checkFalsy: true }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (req.body.add_on) {
      category.add_on = req.body.add_on;
    }
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      await Category.findByIdAndUpdate(req.params.id, category, {});
      res.redirect(category.url);
    }
  }),
];
