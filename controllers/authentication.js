const { user } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const users = await user.findOne({ where: { username: username } });

  const isCorrectPassword = await bcrypt.compare(password, users.password);
  const jwtKey = process.env.JWT_KEY;

  if (isCorrectPassword) {
    jwt.sign(
      { id: users.id, username: users.username, email: users.email },
      jwtKey,
      (err, token) => {
        if (err) {
          res.status(500).json({ message: "Erro ao gerar token", error: err });
          return;
        }
        res
          .set("x-access-token", token)
          .json({ id: users.id, username: users.username })
          .end();
        return;
      }
    );
  } else {
    res.status(401).json({ message: "Não autorizado" });
    res.end();
  }
};
