const UserModel = require('../models/user');

class UserController {
  static async create(req, res) {
    try {
      const user = await UserModel.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;