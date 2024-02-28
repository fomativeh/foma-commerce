const {
    model,
    Schema,
    Types: { ObjectId },
  } = require("mongoose");
  
  const vendorProductSchema = new Schema(
    {
      vendorId: String,
      images: [String],
      description: String,
      title: String,
      price: String,
      category: String,
      vendorName: String,
      reviews: [String],
    },
    { timestamps: true }
  );
  const VendorProduct = model("VendorProduct", vendorProductSchema);
  
  module.exports = VendorProduct;
  