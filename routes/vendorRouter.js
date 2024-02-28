const vendorController = require("../controllers/vendorController");
const express = require("express");
const multerStorage = require("../helpers/multerStorage");
const multer = require("multer");
const vendorAuth = require("../middlewares/auth/vendorAuth");
const { multerMiddleware } = require("../middlewares/multerMiddleware");
const vendorRouter = express.Router();

//Routes
vendorRouter.post("/apply", multerMiddleware, vendorController.create);
vendorRouter.get("/single/:vendorId", vendorController.getSingle);
vendorRouter.get("/:vendorId/products", vendorController.getProducts);
vendorRouter.put("/:vendorId", vendorAuth, vendorController.update);

module.exports = vendorRouter;