const { Favorite, Book, Author } = require("../db/models");

module.exports.index = async (req, res) => {
  const favorites = await Favorite.findAll({
    where: { userId: req.user.id },
    attributes: ["id", "userId", "bookId"],
    include: {
      model: Book,
      attributes: ["id", "title", "cover"],
      include: { model: Author, attributes: ["name"] },
    },
  });
  res.json({
    favorites,
  });
};

module.exports.show = async (req, res) => {
  const favorite = await Favorite.findOne({
    where: { userId: req.user.id, bookId: req.params.bookId },
  });

  res.json({ favorite });
};

module.exports.create = async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  const favorite = await Favorite.findOne({
    where: { userId: req.user.id, bookId: req.params.bookId },
  });
  if (book && !favorite) {
    await Favorite.create({
      userId: req.user.id,
      bookId: req.params.bookId,
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
  const { bookId } = req.params;
  const isDeleted = await Favorite.destroy({
    where: { userId: req.user.id, bookId: bookId },
  });
  if (!isDeleted) {
    res.json({ message: "Favorito não encontrado" }).end();
    return;
  }

  res.json({ message: "Favorito removido com sucesso" });
};
