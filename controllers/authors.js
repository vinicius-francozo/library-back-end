const { author } = require("../db/models");
const objectFilter = require("../utils/objectFilter");

module.exports.index = async (req, res) => {
  const authors = await author.findAll();
  res.json({
    authors,
  });
};

module.exports.paginatedIndex = async (req, res) => {
  const perPage = parseInt(req.query.perPage);
  const offset = parseInt(req.query.page * perPage);
  const authors = await author.findAll({ offset: offset, limit: perPage });

  res.json({
    authors,
  });
};

module.exports.show = async (req, res) => {
  const authors = await author.findByPk(req.params.id);
  res.json({
    authors,
  });
};

module.exports.create = async (req, res) => {
  const image = req.file.path;
  const name = req.body.name;
  const surname = req.body.surname;
  const possibleAuthor = await author.findOne({
    where: { name: name, surname: surname },
  });
  if (!possibleAuthor) {
    const authors = await author.create({
      ...req.body,
      user_id: req.user.id,
      picture: image,
    });
    return res
      .json({
        authors,
      })
      .end();
  }
  res.status(422).json({ message: "Erro ao criar autor" });
};

module.exports.update = async (req, res) => {
  const image = req?.file?.path || req.body.image;
  const updateParams = objectFilter(
    req.body,
    (param) => !["user_id", "id"].includes(param)
  );
  const authors = await author.findByPk(req.params.id);
  await authors.set({ ...updateParams, picture: image });
  await authors.save();
  res.json({ authors });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await author.destroy({ where: { id: id } });
  if (!isDeleted) {
    res.json({ message: "Autor não encontrado" }).end();
    return;
  }
  res.json({ message: "Autor deletado com sucesso" });
};
