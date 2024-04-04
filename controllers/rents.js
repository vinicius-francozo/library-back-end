const { rent, book, author } = require("../db/models");
const { Op } = require("sequelize");

module.exports.listCheckout = async (req, res) => {
  const rents = await rent.findAll({
    where: { user_id: req.user.id, status: 0 },
    attributes: ["id"],
    include: {
      model: book,
      attributes: ["id", "title", "cover", "sinopsis"],
      include: { model: author, attributes: ["name"] },
    },
  });
  res.json({
    rents,
  });
};

module.exports.getOneCheckoutOrRented = async (req, res) => {
  const rents = await rent.findOne({
    where: {
      user_id: req.user.id,
      book_id: req.params.book_id,
      status: [0, 1],
    },
    attributes: ["id"],
    include: {
      model: book,
      attributes: ["id", "title", "cover", "sinopsis"],
      include: { model: author, attributes: ["name"] },
    },
  });
  res.json({
    rents,
  });
};

module.exports.confirmPurchase = async (req, res) => {
  await rent.update(
    { status: 1 },
    { where: { user_id: req.user.id, status: 0 } }
  );
  res.json({ message: "Livros alugados! confira em Meus Livros" });
};

module.exports.listRents = async (req, res) => {
  const rents = await rent.findAll({
    where: { user_id: req.user.id, status: 1 },
    attributes: ["id"],
    include: {
      model: book,
      attributes: ["id", "title", "cover", "sinopsis"],
      include: { model: author, attributes: ["name"] },
    },
  });
  res.json({ rents });
};

module.exports.returnBook = async (req, res) => {
  const rents = await rent.findOne({
    where: { user_id: req.user.id, id: req.params.id, status: 1 },
  });
  if (rents) {
    await rents.set({ status: 2 });
    await rents.save();

    res.json({ message: "Livro devolvido com sucesso" }).end();
    return;
  }
  res.json({ message: "Livro não encontrado" });
};

module.exports.create = async (req, res) => {
  const books = await book.findByPk(req.params.book_id);
  const rents = await rent.findOne({
    where: {
      user_id: req.user.id,
      book_id: req.params.book_id,
      status: [0, 1],
    },
  });
  if (books && !rents) {
    await rent.create({
      user_id: req.user.id,
      book_id: req.params.book_id,
    });

    res
      .json({
        message: "Livro adicionado ao carrinho",
      })
      .end();
    return;
  }
  res.json({ message: "Erro ao adicionar livro ao carrinho" });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await rent.destroy({
    where: { user_id: req.user.id, id: id, status: 0 },
  });
  if (!isDeleted) {
    res.json({ message: "Livro não encontrado" }).end();
    return;
  }

  res.json({ message: "Livro removido com sucesso" });
};
