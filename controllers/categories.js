const { Category } = require("../db/models");

module.exports.index = async (req, res) => {
  const categories = await Category.findAll();
  res.json({
    categories,
  });
};
