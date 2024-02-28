const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: ObjectId,
          ref: "Product", 
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending",  "completed"],
      default: "pending",
    },

    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
