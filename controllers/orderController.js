const createError = require("../helpers/createError");
const Order = require("../schemas/orderSchema");

const orderController = {
  //Create an order
  create: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { products, totalPrice, status, shippingAddress } = req.body;

      //Validate order details
      if (!products || !totalPrice || !status || !shippingAddress) {
        return createError(next, "Incomplete order details.", 400);
      }

      const newOrder = new Order({
        userId,
        products,
        totalPrice,
        status,
        shippingAddress,
      });

      await newOrder.save();

      res
        .status(200)
        .json({ success: true, message: "Order created.", data: newOrder });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },

  //Delete an order
  delete: async (req, res, next) => {
    try {
      //Extract order id from req params
      const { orderId } = req.params;

      if (!orderId) {
        return createError(next, "Order id is required", 400);
      }

      //Delete order from db
      await Order.findByIdAndDelete(orderId);

      res.status(200).json({ success: true, message: "Order deleted." });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },

  //Get a single order for a user
  getSingle: async (req, res, next) => {
    const { orderId } = req.params;
    try {
      //Find order in db
      const orderDetails = await Order.findById(orderId);
      if (!orderDetails) {
        return createError(next, "Order not found.", 404);
      }

      res
        .status(200)
        .json({ success: true, message: "Order fetched.", data: orderDetails });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },

  //Get all the orders for a user
  getAllForUser: async (req, res, next) => {
    const { userId } = req.params;
    try {
      //Fetch orders from db
      const ordersForThisUser = await Order.find({ userId });

      res.status(200).json({
        success: false,
        message: "Orders fetched",
        data: ordersForThisUser,
      });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },

  //Update order status for a user
  updateOrder: async (req, res, next) => {
    const { orderId } = req.params;

    try {
      //Find order in db and update it
      const updatedOrder = Order.findOneAndUpdate(
        orderId,
        { status: "completed" },
        { new: true }
      );

      if (!updatedOrder) {
        return createError(
          next,
          "Couldn't update order, or order doesn't exist.",
          400
        );
      }

      return res
        .status(200)
        .json({ success: true, message: "Order updated", data: updatedOrder });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },

  //Fetch all orders from the database
  getAll: async (req, res, next) => {
    try {
      //Find and return all orders in db
      const allOrdersInDb = await Order.find();
      res.status(200).json({
        success: true,
        message: "All orders fetched.",
        data: allOrdersInDb,
      });
    } catch (error) {
      createError(next, "Server error", 500);
    }
  },
};

module.exports = orderController;
