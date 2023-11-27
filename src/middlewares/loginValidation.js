const jwt_user_token = require("../utils/jwt/jwt_token_user");
const jwt_password = require("../utils/jwt/jwt_hash");

module.exports = async function (req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(400).json({ mensagem: "O token deve ser informado" });
  }

  const token = bearerToken.split(" ")[1];
  const user = jwt_user_token.verify(token, jwt_password);
  if (!user) {
    return res.status(401).json({ mensagem: "Usuário e/ou senha inválido(s)" });
  }
  req.userId = user.id;
  next();
};
