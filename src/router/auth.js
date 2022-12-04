const express = require("express");
const AuthController = require("../controllers/auth");
const Router = express.Router();
Router.post("/register", AuthController.register);
Router.post("/login", AuthController.login);
module.exports = Router;
