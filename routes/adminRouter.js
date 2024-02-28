const express = require("express");
const categoryAuth = require("../middlewares/auth/categoryAuth");
const adminController = require("../controllers/adminController");
const adminRouter = express.Router();

// Category auth works as admin auth
adminRouter.post("/appoint-admin", categoryAuth, adminController.appointAdmin);

module.exports = adminRouter;