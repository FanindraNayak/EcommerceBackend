const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Dotenv Configuration
dotenv.config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
const userRoutes = require("./Routes/userRoutes");
app.use("/", userRoutes);
// ProductRoutes
const productRoutes = require("./Routes/productRoutes");
app.use("/products/", productRoutes);

// CartAndOrderControllers
const cartAndOrderRoutes = require("./Routes/cartAndOrderRoutes");
app.use("/cartAndOrder", cartAndOrderRoutes);

// Listing
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
