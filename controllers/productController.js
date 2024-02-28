const { default: mongoose } = require("mongoose");
const createError = require("../helpers/createError");
const Product = require("../schemas/productSchema");
const Category = require("../schemas/categorySchema");
const uploadImages = require("../helpers/uploadImages");
const Review = require("../schemas/reviewSchema");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const productController = {
  //Fetch all products
  fetchAll: async (req, res, next) => {
    try {
      const allProducts = await Product.find();
      res.status(200).json({ success: true, data: allProducts });
    } catch (error) {
      createError(next, error, 500);
    }
  },

  //Create a product
  create: async (req, res, next) => {
    const { description, title, price, category } = req.body;
    if (!description || !title || !price || !category) {
      return createError(next, "Please provide all product data.", 404);
    }

    // Check if 'images' field exists and contains at least one file
    if (!req.files || req.files.length === 0) {
      return createError(next, "Images are required.", 400);
    }

    try {
      // Check if the provided category tag exists in the Category document
      const categoryDocument = await Category.findOne({});
      if (categoryDocument) {
        const { tags } = categoryDocument;
        if (!tags.includes(category)) {
          tags.push(category); // Add the new category tag
          await categoryDocument.save();
        }
      } else {
        const newCategory = new Category({ tags: [category] });
        await newCategory.save();
      }

      // Loop through uploaded images and upload to Cloudinary
      const images = await uploadImages(req, next);

      const newProduct = new Product({
        images,
        description,
        title,
        price,
        category,
      });

      await newProduct.save();

      res
        .status(201)
        .json({ success: true, message: "Product created.", data: newProduct });
    } catch (error) {
      createError(next, error, 500);
    }
  },

  //Fetch a single product
  fetchSingle: async (req, res, next) => {
    const productId = req.params.productId;

    if (!productId) {
      return createError(next, "Product ID is required.", 404);
    }

    try {
      const productData = await Product.findById({ productId });

      if (!productData) {
        return createError(next, "No product found with that ID.", 404);
      }

      const productReviews = await Review.find({ productId });

      res.status(200).json({
        success: true,
        message: "Product fetched.",
        data: { ...productData._doc, reviews: productReviews },
      });
    } catch (error) {
      createError(next, "Server error.", 500);
    }
  },

  //Update a product
  update: async (req, res, next) => {
    const {productId} = req.params
    const productDetails = req.body;

    try {
      const productData = await Product.findByIdAndUpdate(
        { productId },
        productDetails
      );

      if (!productData) {
        createError(next, "No product found with that ID.", 404);
      }

      if (productData) {
        res.status(200).json({ success: true, message: "Product updated." });
      }
    } catch (error) {
      createError(next, "Server error.", 500);
    }
  },

  //Delete a product
  deleteSingle: async (req, res, next) => {
    const { productId } = req.params;

    try {
      const productData = await Product.findByIdAndDelete({ productId });

      if (!productData) {
        createError(next, "No product found with that ID.", 404);
      }

      if (productData) {
        res.status(200).json({ success: true, message: "Product deleted." });
      }
    } catch (error) {
      createError(next, "Server error.", 500);
    }
  },
};

module.exports = productController;
