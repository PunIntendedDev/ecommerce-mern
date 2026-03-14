const express = require("express"); 
const router = express.Router();     
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// GET user's cart
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

// Add item to cart
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
    
    // Safely find existing item
    const item = user.cart.find(p => 
      p.productId && p.productId.toString() === productId
    );
    
    if (item) {
      // Item exists - increment quantity
      item.quantity = (item.quantity || 1) + 1;
      console.log("Incremented quantity for existing item");
    } else {
      // New item - add to cart
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

// Remove item from cart
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
    
    // Filter out the item to remove
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

// Clear cart
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

module.exports = router;