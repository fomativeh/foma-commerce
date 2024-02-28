const userController = require("../controllers/userController");
const express = require("express");
const auth = require("../middlewares/auth/auth");
const userRouter = express.Router();

//Auth routes
userRouter.post("/auth/signup", userController.signUp);
userRouter.post("/auth/signin", userController.signIn);

//Fetch user route
userRouter.get("/single/:userId", auth, userController.getSingleUser);

//User's cart route
userRouter.put("/cart/:userId", auth, userController.updateCart);

module.exports = userRouter;
