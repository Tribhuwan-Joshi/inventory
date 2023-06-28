const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  stocks_count: { type: Number, required: true },
  add_on: { type: Date, default: Date.now },
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});
ItemSchema.virtual("date").get(function () {
  return this.add_on.toLocaleString("en-US", { dateStyle: "medium" });
});

module.exports = mongoose.model("Item", ItemSchema);
