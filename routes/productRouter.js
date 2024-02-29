const productController = require("../controllers/productController");
const express = require("express");
const  multerMiddleware = require("../middlewares/multerMiddleware");
const productAuth = require("../middlewares/auth/productAuth");
const productRouter = express.Router();

productRouter.post(
  "/create",
  multerMiddleware,
  productAuth,
  productController.create
);
productRouter.get("/single/:productId", productController.fetchSingle);
productRouter.delete(
  "/:productId",
  productAuth,
  productController.deleteSingle
);
productRouter.put("/:productId", productAuth, productController.update);
productRouter.get("/all", productController.fetchAll);

module.exports = productRouter;
