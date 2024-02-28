const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/vendornia/image/upload/v1702802920/defaultImages/avatar_cv2qx9.png",
    },
    isVendor: {
      type: Boolean,
      default: false,
    },
    cart: [],
    wishlist: [],
  },
  { timestamps: true }
);
const User = model("User", userSchema);

module.exports = User;
