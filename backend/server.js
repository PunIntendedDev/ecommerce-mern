require("dotenv").config();

const express = require("express");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-project-name.vercel.app"
    ],
    credentials: true
  })
);

const connectDB = require("./config/db");

const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

app.listen(PORT, ()=>{

  console.log("Server running on 5000");

});