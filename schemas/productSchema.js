const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const productSchema = new Schema(
  {
    images: [String],
    description: { type: String, required: true },
    title: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    category: String,
    reviews: [{ type: ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);
const Product = model("Product", productSchema);

module.exports = Product;
