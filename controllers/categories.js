const { category } = require("../db/models");

module.exports.index = async (req, res) => {
  const categories = await category.findAll();
  res.json({
    categories,
  });
};
