const middleware = require("../middleware/auth");

module.exports = function (app) {
  app.use("/auth", require("./auth"));
  app.use(middleware.user);
  app.use("/shop", require("./shop"));
  app.use("/conversation", require("./conversation"));
  app.use("/product", require("./product"));
  app.use("/user", require("./user"));
  app.use("/order", require("./order"));
  app.use("/messages", require("./message"));
};
