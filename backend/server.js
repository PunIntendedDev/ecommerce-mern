require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}