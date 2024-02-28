const { sign, verify } = require("jsonwebtoken");
const accessKey = process.env.ATS;
const refreshKey = process.env.RTS;

const createAccessToken = (user) => {
  const accessToken = sign(user, accessKey, { expiresIn: "5d" });
  return accessToken
};

const createRefreshToken = (user) => {
  let refreshToken = sign(user, refreshKey, { expiresIn: "1w" });
  return refreshToken
};

module.exports = { createAccessToken, createRefreshToken };
