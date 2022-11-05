
module.exports = function (app) {
  app.use('/messages', require('./message'));
  app.use('/conversation', require('./conversation'));
  app.use('/product', require('./product'));
  app.use('/user', require('./user'));
  app.use('/shop', require('./shop'));
  app.use('/order', require('./order'));
}