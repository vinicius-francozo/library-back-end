const { User } = require("../db/models");
const bcrypt = require("bcryptjs");
const objectFilter = require("../utils/objectFilter");
const jwt = require("jsonwebtoken");

module.exports.show = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const updatedObject = objectFilter(
    JSON.parse(JSON.stringify(user)),
    (param) => param != "password"
  );

  res.json(updatedObject);
};

module.exports.create = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashPassword });
  res.json({ message: "Usuário criado com sucesso" });
};

module.exports.changeImage = async (req, res) => {
  const image = req.file.path;
  const user = await User.findByPk(req.params.id);
  await user.set({ image: image });
  await user.save();
  res.json({ user });
};

module.exports.update = async (req, res) => {
  const updateParams = objectFilter(
    req.body,
    (param) => !["id", "password"].includes(param)
  );

  const user = await User.findByPk(req.params.id);
  console.log(user, req.params);

  await user.set({ ...updateParams });
  await user.save();
  res.json({ user });
};
