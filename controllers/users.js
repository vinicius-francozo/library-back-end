const { user } = require("../db/models");
const bcrypt = require("bcryptjs");
const objectFilter = require("../utils/objectFilter");
const jwt = require("jsonwebtoken");

module.exports.show = async (req, res) => {
  const users = await user.findByPk(req.params.id);
  const updatedObject = objectFilter(
    JSON.parse(JSON.stringify(users)),
    (param) => param != "password"
  );

  res.json(updatedObject);
};

module.exports.create = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  await user.create({ ...req.body, password: hashPassword });
  res.json({ message: "Usuário criado com sucesso" });
};

module.exports.changeImage = async (req, res) => {
  const image = req.file.path;
  const users = await user.findByPk(req.params.id);
  await users.set({ image: image });
  await users.save();
  res.json({ users });
};

module.exports.update = async (req, res) => {
  const updateParams = objectFilter(
    req.body,
    (param) => !["id", "password"].includes(param)
  );

  const users = await user.findByPk(req.params.id);

  await users.set({ ...updateParams });
  await users.save();
  res.json({ users });
};
