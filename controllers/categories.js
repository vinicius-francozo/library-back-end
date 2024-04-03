const { category } = require("../db/models");

module.exports.index = async (req, res) => {
  const categories = await category.findAll();
  res.json({
    categories,
  });
};

module.exports.create = async (req, res) => {
  const categories = await category.create({
    ...req.body,
  });
  res.json({
    categories,
  });
};
