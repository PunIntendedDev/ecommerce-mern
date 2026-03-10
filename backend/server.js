require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

app.listen(5000,()=>{

  console.log("Server running on 5000");

});