const express = require("express"); 
const router = express.Router();     
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.productId");
    res.json(user.cart || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.userId);

    const item = user.cart.find(p => p.productId.toString() === productId);
    if (item) item.quantity += 1;
    else user.cart.push({ productId, quantity: 1 });

    await user.save();
    await user.populate("cart.productId");
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

router.post("/remove", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter(p => p.productId.toString() !== productId);
    await user.save();
    await user.populate("cart.productId");
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart" });
  }
});

router.post("/clear", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = [];
    await user.save();
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
});

module.exports = router;