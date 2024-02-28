const { verify } = require("jsonwebtoken");
const createError = require("../../helpers/createError");
const User = require("../../schemas/userSchema");
const accessKey = process.env.ATS;

const orderAuth = (req, res, next) => {
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

    //Extract user if from params and compare both
    const { userId } = req.params;

    //Compare both ids
    if (userIdInToken !== userId) {
      return createError(next, "This is not your account.", 401);
    }

    //Check if client is a user
    const userData = await User.findById(userId);
    if (!userData) {
      return createError(next, "User does not exist.", 404);
    }

    next();
  });
};

module.exports = orderAuth;
