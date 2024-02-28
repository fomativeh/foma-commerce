const createError = require("../helpers/createError");
const Product = require("../schemas/productSchema");
const Review = require("../schemas/reviewSchema");
const User = require("../schemas/userSchema");

const reviewController = {
  //Create a review
  addReview: async (req, res, next) => {
    const { authorEmail, comment, productId, authorUsername } =
      req.body;

    if (
      !authorEmail ||
      !comment ||
      !productId ||
      !authorUsername
    ) {
      return createError(next, "Incomplete review details.", 400);
    }

    try {
      const verifyEmail = await User.find({ email: authorEmail });
      if (!verifyEmail) {
        return createError(next, "No user exists with that email.", 404);
      }

      const verifyUsername = await User.find({ username: authorUsername });
      if (!verifyUsername) {
        return createError(next, "No user exists with that username.", 404);
      }

      const targetProduct = await Product.findById(productId);
      if (!targetProduct) {
        return createError(next, "That product doesn't exist.", 404);
      }

      const newReview = new Review({
        authorEmail,
        authorUsername,
        comment,
        productId,
      });
      await newReview.save();

      await targetProduct.updateOne({ $push: { reviews: newReview._id } });
      res.status(201).json({ success: true, message: "" });
    } catch (error) {
      createError(next, error.message, 500);
    }
  },

  //Fetch all reviews for a product
  getAllProductReviews: async (req, res, next) => {
    const { productId } = req.params;
    if (productId) {
      return createError(next, "Product ID is required.", 400);
    }

    try {
      // const targetProduct = await Product.findById(productId);
      // if (!targetProduct) {
      //   return createError(next, "Product does not exist.", 400);
      // }

      const productReviews = await Review.find({ productId });
      if (!productReviews || productReviews?.length == 0) {
        return createError(
          next,
          "No review(s) exist with that product ID.",
          404
        );
      }

      res
        .status(200)
        .json({
          success: true,
          message: "Reviews fetched.",
          data: productReviews,
        });
    } catch (error) {
      createError(next, error.message, 500);
    }
  },
};

module.exports = reviewController;
