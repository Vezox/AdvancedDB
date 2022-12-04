const Router = require("express").Router();
const UserController = require("../controllers/user");

Router.get("/get", UserController.get);
Router.post("/update", UserController.update);

module.exports = Router;
