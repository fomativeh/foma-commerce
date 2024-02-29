const express = require("express");
const adminAuth = require("../middlewares/auth/adminAuth");
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const adminRouter = express.Router();

//Appoint admin
adminRouter.post("/appoint-admin", adminAuth, adminController.appointAdmin);





module.exports = adminRouter;
