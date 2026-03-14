import express from 'express';
import User from '../models/User.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    console.log("Fetching cart for user:", req.userId);
    
    const user = await User.findById(req.userId).populate("cart.productId");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user.cart || []);
  } catch (error) {
    console.error("Cart GET error:", error);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    console.log("Adding to cart - User:", req.userId);
    console.log("Request body:", req.body);
    
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const item = user.cart.find(p => 
      p.productId && p.productId.toString() === productId
    );
    
    if (item) {
      item.quantity = (item.quantity || 1) + 1;
      console.log("Incremented quantity for existing item");
    } else {
      user.cart.push({ 
        productId: productId, 
        quantity: 1 
      });
      console.log("Added new item to cart");
    }

    await user.save();
    await user.populate("cart.productId");
    
    res.json(user.cart);
  } catch (error) {
    console.error("Cart ADD error:", error);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

router.post("/remove", verifyToken, async (req, res) => {
  try {
    console.log("Removing from cart - User:", req.userId);
    console.log("Request body:", req.body);
    
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.cart = user.cart.filter(p => 
      !(p.productId && p.productId.toString() === productId)
    );
    
    await user.save();
    await user.populate("cart.productId");
    
    res.json(user.cart);
  } catch (error) {
    console.error("Cart REMOVE error:", error);
    res.status(500).json({ message: "Error removing from cart" });
  }
});

router.post("/clear", verifyToken, async (req, res) => {
  try {
    console.log("Clearing cart - User:", req.userId);
    
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.cart = [];
    await user.save();
    
    res.json([]);
  } catch (error) {
    console.error("Cart CLEAR error:", error);
    res.status(500).json({ message: "Error clearing cart" });
  }
});

export default router;