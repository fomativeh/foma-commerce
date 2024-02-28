const { verify } = require("jsonwebtoken");
const createError = require("../../helpers/createError");
const User = require("../../schemas/userSchema");
const VendorProduct = require("../../schemas/vendorProductSchema");
const Vendor = require("../../schemas/vendorSchema");
const accessKey = process.env.ATS;

const vendorProductAuth = (req, res, next) => {
  //Retrieve access token from headers(Bearer `token`)
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return createError(next, "Unauthorized. Please login.", 401);
  }

  //Verify token's validity
  verify(accessToken, accessKey, async (err, decoded) => {
    if (err) {
      return createError(next, "Invalid token. Login again.", 403);
    }

    //Re-assign for readability
    const userId = decoded.userId;

    //Check if client is a user
    const userData = await User.findById(userId);
    if (!userData) {
      return createError(next, "User does not exist.", 404);
    }

    //Extract product id from req params
    const { productId } = req.params;
    if (!productId) {
      return createError(next, "Product id is required.", 404);
    }

    //Check if the product exists
    const productData = await VendorProduct.findById(productId);
    if (!productData) {
      return createError(next, "Product does not exist.", 404);
    }

    //Extract vendor id from product details
    const vendorId = productData.vendorId;

    //Fetch vendor from db
    const vendorData = await Vendor.findById(vendorId);
    if (!vendorData) {
      return createError(next, "Vendor no longer exists.", 404);
    }

    //Check if client is the owner of this vendor account
    if (userData._id !== vendorData.userId) {
      return createError(next, "You didn't create this product, so you can't do this.", 404);
    }

    next();
  });
};

module.exports = vendorProductAuth;
