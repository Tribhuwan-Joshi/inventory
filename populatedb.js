#! /usr/bin/env node

console.log(
  'This script populates some Items and Category. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("categories is", categories);
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}
main().catch((err) => console.log(err));

async function itemCreate(
  name,
  description,
  category,
  price,
  stocks_count,
  add_on
) {
  let itemdetails = {
    name,
    description,
    category,
    price,
    stocks_count,
  };
  if (add_on != false) itemdetails.add_on = add_on;
  const item = new Item(itemdetails);
  await item.save();
  items.push(item);
  console.log(`Added item : ${name}`);
}

async function categoryCreate(name, description, add_on, index) {
  let category_details = { name, description };
  if (add_on != false) category_details.add_on = add_on;
  const category = new Category(category_details);
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      "RedHat",
      "A cool red head for hackers",
      categories[0],
      100,
      10,
      "2018-04-15"
    ),
    itemCreate(
      "RayBan",
      "Protective sunglasses for adults",
      categories[1],
      200,
      4,
      "2020-12-01"
    ),
    itemCreate(
      "Wool scarf",
      "Pure wool scarf to makes u feel comfortable",
      categories[2],
      150,
      6,
      false
    ),
  ]);
}

async function createCategories() {
  console.log("Adding Categories");
  await Promise.all([
    categoryCreate("Headwear", "Cool things to wear on head", "2015-08-15", 0),
    categoryCreate(
      "EyeWears",
      "Make your eyes more charismatic",
      "2020-09-13",
      1
    ),
    categoryCreate("NeckWears", "wrap soft things around your neck", false, 2),
  ]);
}
