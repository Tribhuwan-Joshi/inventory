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
  console.log(item, category);
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
    categories: categories,
  });
});

exports.item_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description").optional({ checkFalsy: true }).escape(),
  body("stocks_count").escape().notEmpty().withMessage("Provide stocks count"),
  body("price", "Provide price of the item").escape().isLength({ min: 1 }),

  body("category", "Category must not be empty").escape().isLength({ min: 1 }),
  body("add_on", "Invalid Date")
    .isISO8601()
    .toDate()
    .optional({ checkFalsy: true }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stocks_count: req.body.stocks_count,

      category: req.body.category,
    });
    if (req.body.add_on) {
      item.add_on = req.body.add_on;
    }
    if (!errors.isEmpty()) {
      const categories = await Category.find({}, "name").exec();
      res.render("item_form", {
        title: "Create Item",
        errors: errors.array(),
        categories: categories,
        item: item,
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`GET about ${req.params.id} item will be deleted`);
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`POST about ${req.params.id} item will be deleted`);
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const categories = await Category.find({}).exec();
  if (item === null) {
    const err = new Error("Item not Found");
    err.status = 404;
    return next(err);
  }

  console.log("On update", item, categories);
  res.render("item_form", {
    item,
    categories,
  });
});

exports.item_update_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description").optional({ checkFalsy: true }).escape(),
  body("stocks_count").escape().notEmpty().withMessage("Provide stocks count"),
  body("price", "Provide price of the item").escape().isLength({ min: 1 }),

  body("category", "Category must not be empty").escape().isLength({ min: 1 }),
  body("add_on", "Invalid Date")
    .isISO8601()
    .toDate()
    .optional({ checkFalsy: true }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stocks_count: req.body.stocks_count,
      _id: req.params.id,
      category: req.body.category,
    });
    if (req.body.add_on) {
      item.add_on = req.body.add_on;
    }
    if (!errors.isEmpty()) {
      const categories = await Category.find({}, "name").exec();
      res.render("item_form", {
        title: "Create Item",
        errors: errors.array(),
        categories: categories,
        item: item,
      });
    } else {
      await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(item.url);
    }
  }),
];
