const Router = require("express").Router();
const OrderController = require("../controllers/order");

Router.post("/create", OrderController.create);
Router.get("/detail/:order_id", OrderController.detail);

module.exports = Router;
