const OrderModel = require("../models/order");
const OrderDetailModel = require("../models/orderDetail");
const ProductModel = require("../models/product");
const ObjectId = require("mongoose").Types.ObjectId;

class ProductController {
  static async create(req, res) {
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
            order_id: order._id,
            product_id: product.product,
            quantity: product.quantity,
            sum: product.price * product.quantity,
          };
          await OrderDetailModel.create(orderDetail);
        })
      );
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async detail(req, res) {
    try {
      const order_id = req.params.order_id;
      let order = await OrderDetailModel.aggregate([
        {
          $match: {
            order_id: ObjectId(order_id),
          },
        },
        {
          $group: {
            _id: "$order_id",
            products: { $push: "$$ROOT" },
          },
        },
        {
          $lookup: {
            from: "orders",
            localField: "products.order_id",
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
            localField: "products.product_id",
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
              product_id: 1,
              quantity: 1,
              sum: 1,
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
          (product_order) =>
            product_order.product_id.toString() === product._id.toString()
        );
        return {
          ...product,
          buy_quantity: product_order.quantity,
          buy_sum: product_order.sum,
        };
      });
      res.status(200).json({
        order: order.order,
        products: detail_products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
