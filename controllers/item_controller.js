const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler((req, res, next) => {
  res.render("index", {
    title: "Main Page",
  });
});

exports.item_details = asyncHandler(async (req, res, next) => {
  res.render(`Details about ${req.params.id} item will be here`);
});

exports.item_list = asyncHandler(async (req, res, next) => {
  res.send(`All item will be here`);
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("Item create get request will be sent");
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
