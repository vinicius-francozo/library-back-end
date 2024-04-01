const { Book, Review, User, Category, Author } = require("../db/models");
const objectFilter = require("../utils/objectFilter");
const { Op } = require("sequelize");

module.exports.index = async (req, res) => {
  const books = await Book.findAll({
    include: [
      { model: Category, attributes: ["id", "name"] },
      { model: Author, attributes: ["id", "name", "surname"] },
    ],
  });
  res.json({
    books,
  });
};

module.exports.paginatedIndex = async (req, res) => {
  const perPage = parseInt(req.query.perPage);
  const offset = parseInt(req.query.page * perPage);
  const books = await Book.findAll({
    offset: offset,
    limit: perPage,
    include: [
      { model: Author, attributes: ["id", "name", "surname"] },
      { model: Category, attributes: ["name"] },
    ],
  });

  res.json({
    books,
  });
};

module.exports.show = async (req, res) => {
  const book = await Book.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
      },
      {
        model: Author,
        attributes: ["id", "name", "surname"],
      },
      {
        model: Review,
        attributes: ["text", "rate", "id", "userId"],
        include: { model: User, attributes: ["id", "username"] },
      },
    ],
  });
  res.json({
    book,
  });
};

module.exports.listByName = async (req, res) => {
  const books = await Book.findAll({
    where: {
      title: { [Op.like]: `%${req.params.name}%` },
    },

    include: [
      { model: Author, attributes: ["id", "name", "surname"] },
      { model: Category, attributes: ["name"] },
    ],
  });

  res.json({
    books,
  });
};

module.exports.create = async (req, res) => {
  const image = req.file.path;
  const book = await Book.create({
    ...req.body,
    userId: req.user.id,
    cover: image,
  });
  res.json({
    book,
  });
};

module.exports.update = async (req, res) => {
  const image = req?.file?.path || req.body.image;
  const updateParams = objectFilter(
    req.body,
    (param) => !["userId", "id"].includes(param)
  );
  console.log(req, updateParams);
  const book = await Book.findByPk(req.params.id);
  await book.set({ ...updateParams, cover: image });
  await book.save();
  res.json({ book });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await Book.destroy({ where: { id: id } });
  if (!isDeleted) {
    res.json({ message: "Livro não encontrado" }).end();
    return;
  }
  res.json({ message: "Livro deletado com sucesso" });
};
