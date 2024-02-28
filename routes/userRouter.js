const userController = require("../controllers/userController");
const express = require("express");
const auth = require("../middlewares/auth/auth");
const userRouter = express.Router();

//Auth routes
userRouter.post("/auth/signup", userController.signUp);
userRouter.post("/auth/signin", userController.signIn);

//Fetch user route
userRouter.get("/single/:userId", auth, userController.getSingleUser);

//User's cart routes
userRouter.post("/cart/:userId", auth, userController.addToCart);
userRouter.put("/cart/:userId", auth, userController.updateCart);
userRouter.delete("/cart/:userId", auth, userController.deleteCart);

module.exports = userRouter;
