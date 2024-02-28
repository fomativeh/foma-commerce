const express = require("express");
const adminAuth = require("../middlewares/auth/adminAuth");
const adminController = require("../controllers/adminController");
const adminRouter = express.Router();

adminRouter.post("/appoint-admin", adminAuth, adminController.appointAdmin);

module.exports = adminRouter;