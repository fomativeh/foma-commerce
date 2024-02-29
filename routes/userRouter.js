const userController = require("../controllers/userController");
const express = require("express");
const auth = require("../middlewares/auth/auth");
const adminAuth = require("../middlewares/auth/adminAuth");
const deleteUserAuth = require("../middlewares/auth/deleteUserAuth");
const userRouter = express.Router();

//Auth routes
userRouter.post("/auth/signup", userController.signUp);
userRouter.post("/auth/signin", userController.signIn);

//Fetch user route
userRouter.get("/single/:userId", auth, userController.getSingleUser);

//User's cart route
userRouter.put("/cart/:userId", auth, userController.updateCart);

//User's wishlist route
userRouter.put("/wishlist/:userId", auth, userController.updateWishlist);

//Fetch all users from DB (ADMIN RIGHTS)
userRouter.get("/all-users", adminAuth, userController.getAll);

//Delete a user (ADMIN RIGHTS)
userRouter.delete("/:userId", deleteUserAuth, userController.deleteAUser);

module.exports = userRouter;
