const express = require("express");
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth/auth");
const reviewRouter = express.Router();

reviewRouter.post("/", auth, reviewController.addReview)
reviewRouter.get("/:productId", reviewController.getAllProductReviews)


module.exports = reviewRouter