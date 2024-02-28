const vendorProductController = require("../controllers/vendorProductController");
const express = require("express");
const { multerMiddleware } = require("../middlewares/multerMiddleware");
const vendorProductAuth = require("../middlewares/auth/vendorProductAuth");
const vendorProductRouter = express.Router();

//Vendor product creation route
vendorProductRouter.post(
  "/create/:vendorId",
  multerMiddleware,
  vendorProductAuth,
  vendorProductController.create
);

//Vendor single product fetch route
vendorProductRouter.get(
  "/single/:vendorId/:productId",
  vendorProductController.fetchSingle
);

//Vendor product delete route
vendorProductRouter.delete(
  "/:vendorId/:productId",
  vendorProductAuth,
  vendorProductController.deleteSingle
);

//Vendor product update route
vendorProductRouter.put(
  "/:vendorId/:productId",
  vendorProductAuth,
  vendorProductController.update
);

//Vendor all products fetch route
vendorProductRouter.get("/all/:vendorId", vendorProductController.fetchAll);

module.exports = vendorProductRouter;
