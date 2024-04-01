const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  const jwtKey = process.env.JWT_KEY;

  if (isCorrectPassword) {
    jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      jwtKey,
      (err, token) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Erro ao gerar token", error: err });
          return;
        }
        res
          .set("x-access-token", token)
          .json({ id: user.id, username: user.username })
          .end();
        return;
      }
    );
  } else {
    res.status(401).json({ message: "Não autorizado" });
    res.end();
  }
};
