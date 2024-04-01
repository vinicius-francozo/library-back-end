const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  const jwtKey = process.env.JWT_KEY;

  jwt.verify(token, jwtKey, (err, userInfo) => {
    if (err) {
      res.status(403).end();
      return;
    }

    req.user = userInfo;
    next();
  });
};
