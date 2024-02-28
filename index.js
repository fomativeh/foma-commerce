const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const vendorRouter = require("./routes/vendorRouter");
const productRouter = require("./routes/productRouter");
const errorHandler = require("./middlewares/errorHandler");
const categoryRouter = require("./routes/categoryRouter");
const reviewRouter = require("./routes/reviewRouter");

//Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

//Routes
app.get("/", (req, res) => res.send("Hello from root route."));
app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);

//Custom error handler middleware
app.use(errorHandler)

// Configure server port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//Initiate database connection
mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connected to db."))
  .catch((err) => console.log(err));
