const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto-js");
class AuthController {
  static async register(req, res) {
    try {
      let user_exits = await UserModel.findOne({
        user_name: req.body.user_name,
      });
      if (user_exits) return res.status(422).send({ error: "user-exits" });
      let user_model = new UserModel(req.body);
      user_model.setPassword(req.body.password);
      return user_model
        .save()
        .then(async (user) => {
          return res.status(200).send({
            user_name: req.body.user_name,
            full_name: req.body.full_name,
          });
        })
        .catch((error) => {
          return res.status(422).send({ error: "email-exits" });
        });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
  static async login(req, res) {
    console.log(req.body);
    try {
      let user = await UserModel.findOne({
        user_name: req.body.user_name,
      });
      if (!user) return res.status(404).send({ error: "user-not-found" });
      if (!user.validatePassword(req.body.password))
        return res.status(400).send({
          error: "user-incorrect-password",
        });

      let token = await AuthController.generateToken({
        id: user._id,
        user_name: user.user_name,
      });
      return res.status(200).send({ user, token });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
  static async generateToken(payload, member = false) {
    let expiresIn = "365d";
    // if (member) expiresIn = "365d";
    const secret = "pwd_user";
    const options = { expiresIn };
    const token = jwt.sign(payload, secret, options);
    return token;
  }
}
module.exports = AuthController;
