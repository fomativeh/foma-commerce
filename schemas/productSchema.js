const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const productSchema = new Schema(
  {
    images: [String],
    description: String,
    title: String,
    price: String,
    category: String,
    reviews: [String],
  },
  { timestamps: true }
);
const Product = model("Product", productSchema);

module.exports = Product;
