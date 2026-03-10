const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/add", async (req,res)=>{
  try {
    const {title,description,price,image} = req.body;
    const product = new Product({title,description,price,image});
    await product.save();
    res.json(product);
  } catch(err){
    res.status(500).json({error:err.message});
  }
});

router.get("/", async (req,res)=>{
  try {
    const products = await Product.find();
    res.json(products);
  } catch(err){
    res.status(500).json({error:err.message});
  }
});

module.exports = router;