const UserModel = require("../models/user");

class UserController {
  static async get(req, res) {
    console.log(
      "🚀 ~ file: user.js:5 ~ UserController ~ get ~ req",
      req.payload
    );
    try {
      const user = await UserModel.findOne({ _id: req.payload.id });
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
  static async update(req, res) {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.payload.id },
        req.body,
        { new: true }
      );
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
}

module.exports = UserController;
