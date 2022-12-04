const ShopModel = require("../models/shop");
const ObjectId = require("mongoose").Types.ObjectId;

class ShopController {
  static async create(req, res) {
    try {
      const shop = await ShopModel.create(req.body);
      return res.status(201).send(shop);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  static async list(req, res) {
    try {
      const shops = await ShopModel.find({ user_id: req.payload.id }).populate({
        path: "user_id",
        select: "full_name",
      });
      return res.status(200).send(shops);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
}

module.exports = ShopController;
