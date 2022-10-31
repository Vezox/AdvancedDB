const ShopModel = require("../models/shop");
const ObjectId = require("mongoose").Types.ObjectId;

class ShopController {
  static async create(req, res) {
    try {
      const shop = await ShopModel.create(req.body);
      res.status(201).json(shop);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listShops(req, res) {
    try {
      const user_id = req.params.user_id;
      const shops = await ShopModel.find({ user: user_id }).populate({
        path: "user",
        select: "name",
      });
      res.status(200).json(shops);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ShopController;
