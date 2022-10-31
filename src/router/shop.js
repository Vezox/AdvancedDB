const Router = require('express').Router();
const ShopController = require('../controllers/shop');

Router
.post('/create', ShopController.create)
.get('/list-shop/:user_id', ShopController.listShops)

module.exports = Router;