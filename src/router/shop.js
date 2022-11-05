const Router = require("express").Router();
const ShopModel = require("../models/shop");

Router.post("/create", async (req, res) => {
  try {
    const shop = await ShopModel.create(req.body);
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}).get("/list-shop/", async (req, res) => {
  try {
    const shops = await ShopModel.aggregate([
      {
        $group: {
          _id: "$user",
          shops: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          user: {
            _id: "$user._id",
            name: "$user.name",
            phone: "$user.phone",
            address: "$user.address",
          },
          shops: {
            _id: 1,
            name: 1,
          },
        },
      },
    ]);
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}).get;

module.exports = Router;
