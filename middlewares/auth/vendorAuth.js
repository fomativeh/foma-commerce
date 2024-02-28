const { verify } = require("jsonwebtoken");
const createError = require("../../helpers/createError");
const Vendor = require("../../schemas/vendorSchema");
const accessKey = process.env.ATS;

const vendorAuth = (req, res, next) => {
  //Retrieve access token from headers(Bearer `token`)
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return createError(
      next,
      "Unauthorized. Login to update your vendor details.",
      401
    );
  }

  //Verify token's validity
  verify(accessToken, accessKey, async (err, decoded) => {
    if (err) {
      return createError(next, "Invalid token. Login again.", 403);
    }

    //Extract vendor id from req params
    const { vendorId } = req.params;
    if (!vendorId) {
      return createError(next, "Vendor id is required.", 404);
    }

    //Check if vendor exists in db
    const vendorExists = await Vendor.findById({ vendorId });
    if (!vendorExists) {
      return createError(next, "Vendor does not exist.", 404);
    }

    //Re-assign for readability
    const vendorToUpdate = vendorExists;

    const userId = decoded.userId;

    //Check if the client is the creator of this vendor account
    if (vendorToUpdate.userId !== userId) {
      return createError(next, "This is not your vendor account.", 401);
    }

    //Assign vendor info to req object
    req.vendorInfo = vendorToUpdate

    next();
  });
};

module.exports = vendorAuth;
