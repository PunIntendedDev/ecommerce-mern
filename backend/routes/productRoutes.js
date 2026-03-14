import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const product = new Product({ title, description, price, image });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;