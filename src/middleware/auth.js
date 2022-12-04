const { expressjwt: jwt } = require("express-jwt");

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    let token = authorization.split(" ")[1];
    req.token = token;
    return token;
  }
  return null;
};

const isRevokedCallbackUser = async function (req, payload) {
  req.payload = payload.payload;
};

const auth = {
  user: jwt({
    secret: "pwd_user",
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    isRevoked: isRevokedCallbackUser,
    algorithms: ["HS256"],
  }),
};
module.exports = auth;
