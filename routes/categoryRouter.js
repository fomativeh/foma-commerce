const categoryController = require("../controllers/categoryController");
const express = require("express");
const adminAuth = require("../middlewares/auth/adminAuth");
const categoryRouter = express.Router();

categoryRouter.post("/create", adminAuth, categoryController.create);
categoryRouter.delete("/:tag", adminAuth, categoryController.delete);
categoryRouter.get("/", categoryController.getTags);

module.exports = categoryRouter;