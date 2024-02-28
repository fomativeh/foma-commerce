const { verify } = require("jsonwebtoken");
const createError = require("../../helpers/createError");
const accessKey = process.env.ATS;

const auth = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1]; //Retrieves token from headers(Bearer `token`) and trims token from the string

  if (!accessToken) {
    return createError(next, "Unauthorized.", 401);
  }

  verify(accessToken, accessKey, (err, decoded) => {
    if (err) {
      return createError(next, "Invalid token. Login again.", 403);
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = auth;