const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const vendorSchema = new Schema(
  {
    userId: String, //The id of the user applying for a vendor
    storeName: String,
    storeDescription: String,
    logo: String,
    banner: {
      type: String,
      default:
        "https://res.cloudinary.com/vendornia/image/upload/v1702427915/defaultImages/defaultBanner_sg5zr6.svg",
    },
    products: [String], //Array of products' Id
  },
  { timestamps: true }
);
const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
