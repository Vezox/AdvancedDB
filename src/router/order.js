const Router = require("express").Router();
const OrderModel = require("../models/order");
const ProductModel = require("../models/product");
const OrderDetailModel = require("../models/orderDetail");
const ObjectId = require("mongoose").Types.ObjectId;
Router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    await Promise.all(
      data.products.map(async (product) => {
        const productDB = await ProductModel.findById(product.product, {
          price: 1,
        });
        if (!productDB) {
          throw new Error("Product not found");
        }
        product["price"] = productDB.price;
      })
    );
    data["total"] = data.products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    const order = await OrderModel.create(data);
    await Promise.all(
      data.products.map(async (product) => {
        const orderDetail = {
          order: order._id,
          product: product.product,
          quantity: product.quantity,
          price: product.price,
        };
        await OrderDetailModel.create(orderDetail);
      })
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}).get("/detail/:order_id", async (req, res) => {
  try {
    const order_id = req.params.order_id;
    let order = await OrderDetailModel.aggregate([
      {
        $match: {
          order: ObjectId(order_id),
        },
      },
      {
        $group: {
          _id: "$order",
          products: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "_id",
          as: "order",
        },
      },
      {
        $unwind: "$order",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "detail",
        },
      },
      {
        $project: {
          _id: 0,
          order: {
            _id: "$order._id",
            user: "$order.user",
            total: "$order.total",
            status: "$order.status",
            createdAt: "$order.createdAt",
          },
          products: {
            product: 1,
            quantity: 1,
            price: 1,
          },
          detail: {
            _id: 1,
            name: 1,
            image: 1,
            price: 1,
            sold: 1,
            quantity: 1,
          },
        },
      },
    ]);
    order = order[0];
    const detail_products = order.detail.map((product) => {
      const product_order = order.products.find(
        (product_order) => product_order.product.toString() === product._id.toString()
      );
      return {
        ...product,
        buy_quantity: product_order.quantity,
        buy_price: product_order.price,
      };
    });
    res.status(200).json({
      order: order.order,
      products: detail_products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = Router;
