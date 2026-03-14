import express from "express";
import cors from "cors";

import connectDB from "../backend/config/db.js";

import cartRoutes from "../backend/routes/cartRoutes.js";
import authRoutes from "../backend/routes/authRoutes.js";
import productRoutes from "../backend/routes/productRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;