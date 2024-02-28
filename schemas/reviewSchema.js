const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const reviewSchema = new Schema(
  {
    authorEmail: {
      type: String,
      required: true,
    },
    authorUsername: { type: String, required: true },
    comment: {
      type: String,
      required: true,
    },
    productId: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
const Review = model("Review", reviewSchema);

module.exports = Review;
