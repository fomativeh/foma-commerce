const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const vendorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: String,
    storeDescription: String,
    logo: String,
    banner: {
      type: String,
      default:
        "https://res.cloudinary.com/vendornia/image/upload/v1702427915/defaultImages/defaultBanner_sg5zr6.svg",
    },
    products: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);
const Vendor = model("Vendor", vendorSchema);

module.exports = Vendor;
