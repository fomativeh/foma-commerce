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
const adminRouter = require("./routes/adminRouter");

//Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Routes
app.get("/", (req, res) => res.send("Hello from root route."));
app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouter);

//Custom error handler middleware
app.use(errorHandler)

// Configure server port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//Initiate database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to db."))
  .catch((err) => console.log(err));
