const { Author } = require("../db/models");
const objectFilter = require("../utils/objectFilter");

module.exports.index = async (req, res) => {
  const authors = await Author.findAll();
  res.json({
    authors,
  });
};

module.exports.paginatedIndex = async (req, res) => {
  const perPage = parseInt(req.query.perPage);
  const offset = parseInt(req.query.page * perPage);
  const authors = await Author.findAll({ offset: offset, limit: perPage });

  res.json({
    authors,
  });
};

module.exports.show = async (req, res) => {
  const author = await Author.findByPk(req.params.id);
  res.json({
    author,
  });
};

module.exports.create = async (req, res) => {
  const image = req.file.path;
  const author = await Author.create({
    ...req.body,
    userId: req.user.id,
    picture: image,
  });
  res.json({
    author,
  });
};

module.exports.update = async (req, res) => {
  const image = req?.file?.path || req.body.image;
  const updateParams = objectFilter(
    req.body,
    (param) => !["userId", "id"].includes(param)
  );
  console.log(req, updateParams);
  const author = await Author.findByPk(req.params.id);
  await author.set({ ...updateParams, picture: image });
  await author.save();
  res.json({ author });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await Author.destroy({ where: { id: id } });
  if (!isDeleted) {
    res.json({ message: "Autor não encontrado" }).end();
    return;
  }
  res.json({ message: "Autor deletado com sucesso" });
};
