const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  add_on: { type: Date, default: Date.now },
});

CategorySchema.virtual("url").get(function () {
  return `/catalog/category/${this._id}`;
});

CategorySchema.virtual("date").get(function () {
  return this.add_on.toLocaleString("en-US", { dateStyle: "medium" });
});


module.exports = mongoose.model("Category", CategorySchema);
