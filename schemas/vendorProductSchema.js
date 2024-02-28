const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const vendorProductSchema = new Schema(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    images: [String],
    description: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    reviews: [{ type: ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);
const VendorProduct = model("VendorProduct", vendorProductSchema);

module.exports = VendorProduct;
