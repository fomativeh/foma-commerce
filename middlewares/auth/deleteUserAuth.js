const { verify } = require("jsonwebtoken");
const createError = require("../../helpers/createError");
const User = require("../../schemas/userSchema");
const accessKey = process.env.ATS;

const deleteUserAuth = (req, res, next) => {
  //Retrieve access token from headers(Bearer `token`)
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return createError(next, "Unauthorized. Please login.", 401);
  }

  //Verify token's validity
  verify(accessToken, accessKey, async (err, decoded) => {
    if (err) {
      return createError(next, "Invalid token. Login again.", 403);
    }

    //Extract user id from token
    const userIdInToken = decoded.userId;

    //Extract user id from params
    const { userId } = req.params;

    //Check if client is a user
    const userData = await User.findById(userIdInToken);
    if (!userData) {
      return createError(next, "User does not exist.", 404);
    }

    // At this point, we already know the client owns this account
    // So we can allow account deletion by checking for admin rights or if the user is the owner of the account
    if (userData.isAdmin) {
      // If the user is an admin, allow account deletion
      next();
    } else {
      // If the user is not an admin, check if they are the owner of the account
      if (userData._id.toString() === userId) {
        // If the user is the owner of the account, allow account deletion
        next();
      } else {
        // If the user is neither an admin nor the owner of the account, deny deletion
        return createError(
          next,
          "You are not authorized to delete this account.",
          403
        );
      }
    }
  });
};

module.exports = deleteUserAuth;
