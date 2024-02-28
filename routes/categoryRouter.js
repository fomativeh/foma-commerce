const categoryController = require("../controllers/categoryController");
const express = require("express");
const categoryAuth = require("../middlewares/auth/categoryAuth");
const categoryRouter = express.Router();

categoryRouter.post("/create", categoryAuth, categoryController.create);
categoryRouter.delete("/:tag", categoryAuth, categoryController.delete);
categoryRouter.get("/", categoryController.getTags);

module.exports = categoryRouter;