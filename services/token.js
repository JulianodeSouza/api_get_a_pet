const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function createToken(user) {
  const token = jwt.sign(
    { id: user._id, name: user.firstname + " " + user.lastname },
    process.env.SECRET,
    {
      expiresIn: "5m",
    }
  );

  return token;
}

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) res.json({ error: "Usuário não autorizado!" });

  try {
    const tokenVerified = jwt.verify(token, process.env.SECRET);
    req.user = tokenVerified;

    next();
  } catch (e) {
    res.json({ error: "Token inválido!" });
  }
}

module.exports = { createToken, verifyToken };
