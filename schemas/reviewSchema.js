const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const reviewSchema = new Schema(
  {
    authorEmail: String,
    authorUsername:String,
    comment: String,
    productId:String,
  },
  { timestamps: true }
);
const Review = model("Review", reviewSchema);

module.exports = Review;
