const { favorite, book, author } = require("../db/models");

module.exports.index = async (req, res) => {
  const favorites = await favorite.findAll({
    where: { user_id: req.user.id },
    attributes: ["id", "user_id", "book_id"],
    include: {
      model: book,
      attributes: ["id", "title", "cover"],
      include: { model: author, attributes: ["name"] },
    },
  });
  res.json({
    favorites,
  });
};

module.exports.show = async (req, res) => {
  const favorites = await favorite.findOne({
    where: { user_id: req.user.id, book_id: req.params.book_id },
  });

  res.json({ favorites });
};

module.exports.create = async (req, res) => {
  const books = await book.findByPk(req.params.book_id);
  const favorites = await favorite.findOne({
    where: { user_id: req.user.id, book_id: req.params.book_id },
  });
  if (books && !favorites) {
    await favorite.create({
      user_id: req.user.id,
      book_id: req.params.book_id,
    });

    res
      .json({
        message: "Livro adicionado aos favoritos",
      })
      .end();
    return;
  }
  res.json({ message: "Erro ao adicionar livro aos favoritos" });
};

module.exports.delete = async (req, res) => {
  const { book_id } = req.params;
  const isDeleted = await favorite.destroy({
    where: { user_id: req.user.id, book_id: book_id },
  });
  if (!isDeleted) {
    res.json({ message: "Favorito não encontrado" }).end();
    return;
  }

  res.json({ message: "Favorito removido com sucesso" });
};
