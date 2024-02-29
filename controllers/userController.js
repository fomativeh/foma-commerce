const createError = require("../helpers/createError");
const generateRefId = require("../helpers/generateRefId");
const { createAccessToken, createRefreshToken } = require("../helpers/tokens");
const User = require("../schemas/userSchema");
const { hash, compare } = require("bcryptjs");

const removePassword = (user) => {
  // Exclude the password field from the response
  const userWithoutPassword = { ...user._doc };
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

const userController = {
  //Sign up service
  signUp: async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return createError(next, "Please provide all credentials.", 400);
    }

    try {
      const userExists = await User.findOne({ username });
      if (userExists) {
        return createError(next, "Username is taken.", 400);
      }

      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return createError(next, "Email already exists. Sign in.", 400);
      }

      const hashedPassword = await hash(password, 7);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      const tokenData = { userId: newUser._id, email: newUser.email };
      const accessToken = createAccessToken(tokenData);
      const refreshToken = createRefreshToken(tokenData);

      const user = removePassword(newUser);

      //Return userdata, access token and refresh token on sign up
      return res.status(201).json({
        success: true,
        message: "Sign-up successful.",
        data: { ...user, accessToken, refreshToken },
      });
    } catch (error) {
      return createError(next, "Server error", 500);
    }
  },

  //Sign in service
  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return createError(next, "Incomplete credentials.", 400);
    }

    try {
      const userExists = await User.findOne({ email });
      if (!userExists) {
        return createError(next, "User does not exist.", 404);
      }

      const passwordMatches = compare(password, userExists?.password);
      if (!passwordMatches) {
        return createError(next, "Incorrect Password.", 401);
      }

      const tokenData = { userId: userExists._id, email: userExists.email };
      const accessToken = createAccessToken(tokenData);
      const refreshToken = createRefreshToken(tokenData);

      const user = removePassword(userExists);

      return res.status(201).json({
        success: true,
        message: "Sign-in successful.",
        data: { ...user, accessToken, refreshToken },
      });
    } catch (error) {
      return createError(next, "Server error.", 500);
    }
  },

  //Fetch user service
  getSingleUser: async (req, res, next) => {
    let { userId } = req.params;

    if (!userId) {
      return createError(next, "User id is required.", 400);
    }

    try {
      const userExists = await User.findById(userId);
      if (!userExists) {
        return createError(next, "User does not exist.", 404);
      }

      //Assign to new variable for readability
      let userData = userExists;

      res
        .status(200)
        .json({ success: true, message: "User data fetched", data: userData });
    } catch (error) {
      // console.log(error)
      createError(next, "Server error.", 500);
    }
  },

  //Handles cart updates
  updateCart: async (req, res, next) => {
    try {
      //Extract cart details from req body
      const { cartDetails } = req.body;

      if (!cartDetails) {
        return createError(next, "Cart details are required.", 400);
      }

      if (!Array.isArray(cartDetails)) {
        return createError(next, "Cart must be an array.", 400);
      }

      //Extract user id from req params
      const { userId } = req.params;

      if (!userId) {
        return createError(next, "User id is required.", 400);
      }

      //Fetch user details from db
      const userDetails = await User.findById(userId);

      if (!userDetails) {
        return createError(next, "User does not exist.", 404);
      }

      //Replace cart in db with the latest cart details
      userDetails.cart = cartDetails;
      await userDetails.save();

      res.status(200).json({
        success: true,
        message: "Cart updated.",
        data: userDetails.cart,
      });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },

  //Handles wishlist updates
  updateWishlist: async (req, res, next) => {
    try {
      //Extract wishlist details from req body
      const { wishlistDetails } = req.body;

      if (!wishlistDetails) {
        return createError(next, "wishlist details are required.", 400);
      }

      if (!Array.isArray(wishlistDetails)) {
        return createError(next, "Wishlist must be an array.", 400);
      }

      //Extract user id from req params
      const { userId } = req.params;

      if (!userId) {
        return createError(next, "User id is required.", 400);
      }

      //Fetch user details from db
      const userDetails = await User.findById(userId);

      if (!userDetails) {
        return createError(next, "User does not exist.", 404);
      }

      //Replace wishlist in db with the latest wishlist details
      userDetails.wishlist = wishlistDetails;
      await userDetails.save();

      res.status(200).json({
        success: true,
        message: "Wishlist updated.",
        data: userDetails.wishlist,
      });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },

  //Fetch all users (ADMIN PRIVILEGE)
  getAll: async (req, res, next) => {
    try {
      //Find and return all the users in the db
      const allUsersData = await User.find();
      res.status(200).json({
        success: true,
        message: "All users fetched.",
        data: allUsersData,
      });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },

  //Delete a user's account (ACCOUNT OWNER OR ADMIN RIGHTS)
  deleteAUser: async (req, res, next) => {
    try {
      //Extract user id from req params
      const { userId } = req.params;

      if (!userId) {
        return createError(next, "User id is required", 400);
      }

      //Find and delete user from db
      await User.findByIdAndDelete(userId);

      res.status(200).json({ success: true, message: "User account deleted." });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },
};

module.exports = userController;
