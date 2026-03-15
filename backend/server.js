import 'dotenv/config';                
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

connectDB();

app.use(cors({
  origin: [FRONTEND_URL, "https://ecommerce-frontend-lac-omega.vercel.app"],
  credentials: true
}));

app.use(express.json());

app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});