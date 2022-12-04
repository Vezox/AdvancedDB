const Router = require("express").Router();
const ShopController = require("../controllers/shop");

Router.post("/create", ShopController.create);
Router.get("/list", ShopController.list);

module.exports = Router;
