const { book, review, user, category, author } = require("../db/models");
const objectFilter = require("../utils/objectFilter");
const { Op } = require("sequelize");

module.exports.index = async (req, res) => {
  const books = await book.findAll({
    include: [
      { model: category, attributes: ["id", "name"] },
      { model: author, attributes: ["id", "name", "surname"] },
    ],
  });
  res.json({
    books,
  });
};

module.exports.paginatedIndex = async (req, res) => {
  const perPage = parseInt(req.query.perPage);
  const offset = parseInt(req.query.page * perPage);
  const books = await book.findAll({
    offset: offset,
    limit: perPage,
    include: [
      { model: author, attributes: ["id", "name", "surname"] },
      { model: category, attributes: ["name"] },
    ],
  });

  res.json({
    books,
  });
};

module.exports.show = async (req, res) => {
  const books = await book.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: category,
        attributes: ["id", "name"],
      },
      {
        model: author,
        attributes: ["id", "name", "surname"],
      },
      {
        model: review,
        attributes: ["text", "rate", "id", "user_id"],
        include: { model: user, attributes: ["id", "username"] },
      },
    ],
  });
  res.json({
    books,
  });
};

module.exports.listByName = async (req, res) => {
  const books = await book.findAll({
    where: {
      title: { [Op.like]: `%${req.params.name}%` },
    },

    include: [
      { model: author, attributes: ["id", "name", "surname"] },
      { model: category, attributes: ["name"] },
    ],
  });

  res.json({
    books,
  });
};

module.exports.create = async (req, res) => {
  const image = req.file.path;
  const books = await book.create({
    ...req.body,
    user_id: req.user.id,
    cover: image,
  });
  res.json({
    books,
  });
};

module.exports.update = async (req, res) => {
  const image = req?.file?.path || req.body.image;
  const updateParams = objectFilter(
    req.body,
    (param) => !["user_id", "id"].includes(param)
  );
  const books = await book.findByPk(req.params.id);
  await books.set({ ...updateParams, cover: image });
  await books.save();
  res.json({ books });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await book.destroy({ where: { id: id } });
  if (!isDeleted) {
    res.json({ message: "Livro não encontrado" }).end();
    return;
  }
  res.json({ message: "Livro deletado com sucesso" });
};
