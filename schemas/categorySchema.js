const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    tags: [String],
  },
  { timestamps: true }
);
const Category = model("Category", categorySchema);

module.exports = Category;
