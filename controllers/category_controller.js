const asyncHandler = require("express-async-handler");
exports.category_details = asyncHandler(async (req, res, next) => {
  res.render("category_detail",{id:req.params.id});
});

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send(`All item will be here`);
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("Item create get request will be sent");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("response for post request");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`GET about ${req.params.id} item will be deleted`);
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`POST about ${req.params.id} item will be deleted`);
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send(`GET update for ${req.params.id}`);
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send(`POST update for ${req.params.id}`);
});
