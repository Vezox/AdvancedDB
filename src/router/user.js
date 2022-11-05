const Router = require('express').Router();
const UserModel = require('../models/user');

Router
.post('/create', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = Router;