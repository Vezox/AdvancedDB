const Router = require("express").Router();
const ProductModel = require("../models/product");
const ProductController = require("../controllers/product");

Router.post("/create", ProductController.create);
Router.get("/list", ProductController.list);
Router.get("/list/:shop_id", ProductController.listShopId);
Router.get("/top", ProductController.top);

module.exports = Router;
