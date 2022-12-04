const ProductModel = require("../models/product");
const ShopModel = require("../models/shop");

class ProductController {
  static async create(req, res) {
    try {
      const shop = await ShopModel.findOne({
        _id: req.body.shop_id,
        user_id: req.payload.id,
      });
      if (!shop) return res.status(404).send({ error: "shop-not-found" });
      const product = await ProductModel.create(req.body);
      return res.status(201).send(product);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  static async list(req, res) {
    try {
      const products = await ProductModel.find().populate({
        path: "shop_id",
        select: "name",
      });
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
  static async listShopId(req, res) {
    try {
      const products = await ProductModel.find({
        shop_id: req.params.shop_id,
      }).populate({
        path: "shop_id",
        select: "name",
      });
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
  static async top(req, res) {
    try {
      const products = await ProductModel.find().sort({ sold: -1 }).limit(3);
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = ProductController;
