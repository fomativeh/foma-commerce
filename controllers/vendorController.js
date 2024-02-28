const createError = require("../helpers/createError");
const User = require("../schemas/userSchema");
const Vendor = require("../schemas/vendorSchema");
const uploadImages = require("../helpers/uploadImages");
const VendorProduct = require("../schemas/vendorProductSchema");

const vendorController = {
  //Vendor creation
  create: async (req, res, next) => {
    const { userId, storeName, storeDescription } = req.body;

    if (!userId || !storeName || !storeDescription) {
      return createError(next, "Please provide all vendor data", 400);
    }

    try {
      const vendorApplicant = await User.findById({ userId });
      if (!vendorApplicant) {
        return createError(next, "There's no user with this userId.", 404);
      }

      // Check if 'images' field exists and contains at least one file
      if (!req.files || req.files.length === 0) {
        return createError(next, "Images are required.", 400);
      }

      // Loop through uploaded images and upload to Cloudinary
      const images = await uploadImages(req, next);

      const newVendorDetails = {
        userId,
        storeName,
        storeDescription,
        logo: images[0],
      };

      if (images?.length > 1) {
        newVendorDetails.banner = images[1];
      }
      const newVendor = new Vendor(newVendorDetails);
      await newVendor.save();

      //Update user account with vendor status
      vendorApplicant.isVendor = true;
      vendorApplicant.vendorId = newVendor._id;
      await vendorApplicant.save();

      res
        .status(201)
        .json({ success: true, message: "Vendor created", data: newVendor });
    } catch (error) {
      createError(next, "Server error.", 500);
    }
  },

  //Fetch single vendor
  getSingle: async (req, res, next) => {
    const { vendorId } = req.params;
    if (!vendorId) {
      return createError(next, "Vendor ID is required.", 400);
    }

    try {
      const vendorData = await Vendor.findOne({ vendorId });
      if (!vendorData) {
        return createError(next, "Vendor does not exist.", 404);
      }

      const vendorProducts = await VendorProduct.find({ vendorId });
      res.status(200).json({
        success: true,
        message: "Vendor details fetched.",
        data: { ...vendorData._doc, products: vendorProducts },
      });
    } catch (error) {
      createError(next, "Server error.", 500);
    }
  },

  //Fetch a vendor's products
  getProducts: async (req, res, next) => {
    const { vendorId } = req.params;
    if (!vendorId) {
      return createError(next, "Vendor id is required.", 404);
    }

    try {
      const vendorExists = await Vendor.findById({ vendorId });
      if (!vendorExists) {
        return createError(next, "Vendor does not exist", 404);
      }

      const allVendorProducts = await VendorProduct.find({ vendorId });
      res.status(200).json({
        success: true,
        message: "Vendor Products Fetched",
        data: allVendorProducts,
      });
    } catch (error) {
      createError(next, "Server error.", 500);
    }
  },

  //Update a vendor's details
  update: async (req, res, next) => {

    //Vendor info is assigned to req object by vendor auth middleware
    const vendorInfo = req.vendorInfo

    //Extract the only details that client's are allowed to update
    const { storeName, storeDescription, logo, banner } =
      req.body.detailsToUpdate;

    try {


      //Check if client provided any details to update
      if (!storeName && !storeDescription && !logo && !banner) {
        return createError(next, 404, "No details to update.");
      }

      const allDetailsToUpdate = {
        storeDescription,
        logo,
        banner,
        storeName,
      };

      // Update only the provided properties
      Object.assign(vendorInfo, allDetailsToUpdate);

      // Save the updated vendor
      const updatedVendor = await vendorInfo.save();

      res.status(200).json({
        success: true,
        message: "Vendor's details updated",
        data: updatedVendor,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      createError(next, "Server error", 500);
    }
  },
};

module.exports = vendorController;