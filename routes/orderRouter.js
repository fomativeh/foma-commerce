const orderController = require("../controllers/orderController");
const express = require("express");
const adminAuth = require("../middlewares/auth/adminAuth");
const orderAuth = require("../middlewares/auth/orderAuth");
const orderRouter = express.Router();

orderRouter.post("/create/:userId", orderAuth, orderController.create);
orderRouter.get("/single/:userId/:orderId", orderAuth, orderController.getSingle);
orderRouter.get("/all/:userId", orderAuth, orderController.getAllForUser);

//Delete an order (ONLY ADMINS)
orderRouter.delete("/delete-order/:orderId", adminAuth, orderController.delete);

//Fetch all orders from DB (ONLY ADMINS)
orderRouter.get("/all", adminAuth, orderController.getAll);

//Update an order (ONLY ADMINS)
orderRouter.patch(
  "/update-order/:orderId",
  adminAuth,
  orderController.updateOrder
);

module.exports = orderRouter;
