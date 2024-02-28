const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
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
    wishList: [],
  },
  { timestamps: true }
);
const User = model("User", userSchema);

module.exports = User;
