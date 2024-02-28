const express = require("express");
const categoryAuth = require("../middlewares/auth/categoryAuth");
const adminController = require("../controllers/adminController");
const adminRouter = express.Router();

// The category auth middleware is utilized here as it contains the necessary logic for validating admin authorization.
adminRouter.post("/appoint-admin", categoryAuth, adminController.appointAdmin);

module.exports = adminRouter;