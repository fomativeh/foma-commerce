const createError = require("../helpers/createError");
const User = require("../schemas/userSchema");

const adminController = {
  appointAdmin: async (req, res, next) => {
    //Extract the user id of the user to be appointed
    const { userId } = req.body;

    if (!userId) {
      return createError(next, "User id is required.", 404);
    }

    try {
      const userDetails = await User.findById(userId);

      if (!userDetails) {
        return createError(next, "User does not exist.", 404);
      }

      //Update user admin status
      userDetails.isAdmin = true;
      await userDetails.save();

      return res
        .status(200)
        .json({ success: true, message: "User is now an admin." });
    } catch (error) {
      createError(next, "Network error.", 500);
    }
  },
};

module.exports = adminController;
