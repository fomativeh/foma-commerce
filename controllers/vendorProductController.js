const { default: mongoose } = require("mongoose");
const createError = require("../helpers/createError");
const Category = require("../schemas/categorySchema");
const uploadImages = require("../helpers/uploadImages");
const Review = require("../schemas/reviewSchema");
const VendorProduct = require("../schemas/vendorProductSchema");
const Vendor = require("../schemas/vendorSchema");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const vendorProductController = {
  //Fetch all products for a vendor
  fetchAll: async (req, res, next) => {
    try {
      const { vendorId } = req.params;

      if (!vendorId) {
        return createError(next, "Vendor id is required.", 404);
      }

      const allProducts = await VendorProduct.find({ vendorId });
      res.status(200).json({
        success: true,
        message: "Vendor's products fetched.",
        data: allProducts,
      });
    } catch (error) {
      createError(next, error, 500);
    }
  },

  //Create a product for a vendor
  create: async (req, res, next) => {
    const { description, title, price, category } = req.body;
    if (!description || !title || !price || !category) {
      return createError(next, "Please provide all product data.", 404);
    }

    // Check if 'images' field exists and contains at least one file
    if (!req.files || req.files.length === 0) {
      return createError(next, "Images are required.", 400);
    }

    //Extract vendor id from req params
    const { vendorId } = req.params;
    if (!vendorId) {
      return createError(next, "Vendor id is required.", 400);
    }

    //Check if vendor exists
    const vendorData = await Vendor.findById(vendorId);
    if (vendorData) {
      return createError(next, "Vendor does not exist.", 404);
    }

    try {
      // Loop through uploaded images and upload to Cloudinary
      const images = await uploadImages(req, next);

      const newProduct = new VendorProduct({
        vendorId,
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
      createError(next, "Server error.", 500);
    }
  },

  //Fetch a single product from a vendor's records
  fetchSingle: async (req, res, next) => {
    const { productId } = req.params;

    if (!productId) {
      return createError(next, "Product ID is required.", 404);
    }

    try {
      const productData = await VendorProduct.findById(productId);

      if (!productData) {
        return createError(next, "No vendor has a product with that id.", 404);
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
    const { productId } = req.params;
    const productDetails = req.body;

    try {
      const updatedSuccessfully = await VendorProduct.findByIdAndUpdate(
        { productId },
        productDetails
      );

      if (!updatedSuccessfully) {
        createError(next, "No product found with that ID.", 404);
      }

      if (updatedSuccessfully) {
        res.status(200).json({ success: true, message: "Product updated." });
      }
    } catch (error) {
      createError(next, "Server error.", 500);
    }
  },

  //Delete a vendor's product
  deleteSingle: async (req, res, next) => {
    const { productId } = req.params;

    try {
      const successfullyDeleted = await VendorProduct.findByIdAndDelete(productId);

      if (!successfullyDeleted) {
        createError(next, "No product found with that ID.", 404);
      }

      if (successfullyDeleted) {
        res.status(200).json({ success: true, message: "Product deleted." });
      }
    } catch (error) {
      createError(next, "Server error.", 500);
    }
  },
};

module.exports = vendorProductController;
