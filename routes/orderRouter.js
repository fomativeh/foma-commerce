const orderController = require("../controllers/orderController");
const express = require("express");
const adminAuth = require("../middlewares/auth/adminAuth");
const orderAuth = require("../middlewares/auth/orderAuth");
const orderRouter = express.Router();

orderRouter.post("/create/:userId", orderAuth, orderController.create);
orderRouter.delete("/:userId/:orderId", orderAuth, orderController.delete);
orderRouter.get("/single/:userId", orderAuth, orderController.getSingle);
orderRouter.get("/all/:userId", orderAuth, orderController.getAllForUser);
orderRouter.patch("/:orderId", orderAuth, orderController.getAllForUser);

//Get all orders from db(Only Admins)
orderRouter.get("/all", adminAuth, orderController.getAll);

module.exports = orderRouter;
