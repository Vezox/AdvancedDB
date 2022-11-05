const Router = require("express").Router();
const ProductModel = require("../models/product");

Router.post("/create", async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
  .get("/list-product", async (req, res) => {
    try {
      const products = await ProductModel.find().populate({
        path: "shop",
        select: "name",
      })
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get("/list-product/:shop_id", async (req, res) => {
    try {
      const shop_id = req.params.shop_id;
      const products = await ProductModel.find(
        { shop: shop_id },
        { shop: 0, createdAt: 0, updatedAt: 0, __v: 0 }
      );
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get("/top", async (req, res) => {
    try {
      const products = await ProductModel.find().sort({sold: -1}).limit(3);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

module.exports = Router;
