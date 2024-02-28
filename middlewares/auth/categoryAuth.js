const { verify } = require("jsonwebtoken");
const createError = require("../../helpers/createError");
const User = require("../../schemas/userSchema");
const accessKey = process.env.ATS;

const categoryAuth = (req, res, next) => {
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

    const userId = decoded.userId;

    //Check if client is a user
    const userExists = await User.findById({ userId });
    if (!userExists) {
      return createError(next, "User does not exist.", 404);
    }

    const userAccount = userExists

    //Check if user is an admin
    if(!userAccount.isAdmin){
      return createError(next, "Only admins can do this.", 401);
    }

    next();
  });
};

module.exports = categoryAuth;
