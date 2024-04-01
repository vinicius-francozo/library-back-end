const { Rent, Book, Author } = require("../db/models");
const { Op } = require("sequelize");

module.exports.listCheckout = async (req, res) => {
  const rents = await Rent.findAll({
    where: { userId: req.user.id, status: 0 },
    attributes: ["id"],
    include: {
      model: Book,
      attributes: ["id", "title", "cover", "sinopsis"],
      include: { model: Author, attributes: ["name"] },
    },
  });
  res.json({
    rents,
  });
};

module.exports.getOneCheckoutOrRented = async (req, res) => {
  const rents = await Rent.findOne({
    where: { userId: req.user.id, bookId: req.params.bookId, status: [0, 1] },
    attributes: ["id"],
    include: {
      model: Book,
      attributes: ["id", "title", "cover", "sinopsis"],
      include: { model: Author, attributes: ["name"] },
    },
  });
  res.json({
    rents,
  });
};

module.exports.confirmPurchase = async (req, res) => {
  await Rent.update(
    { status: 1 },
    { where: { userId: req.user.id, status: 0 } }
  );
  res.json({ message: "Livros alugados! confira em Meus Livros" });
};

module.exports.listRents = async (req, res) => {
  const rents = await Rent.findAll({
    where: { userId: req.user.id, status: 1 },
    attributes: ["id"],
    include: {
      model: Book,
      attributes: ["id", "title", "cover", "sinopsis"],
      include: { model: Author, attributes: ["name"] },
    },
  });
  res.json({ rents });
};

module.exports.returnBook = async (req, res) => {
  const rent = await Rent.findOne({
    where: { userId: req.user.id, id: req.params.id, status: 1 },
  });
  if (rent) {
    await rent.set({ status: 2 });
    await rent.save();

    res.json({ message: "Livro devolvido com sucesso" }).end();
    return;
  }
  res.json({ message: "Livro não encontrado" });
};

module.exports.create = async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  const rent = await Rent.findOne({
    where: {
      userId: req.user.id,
      bookId: req.params.bookId,
      status: [0, 1],
    },
  });
  if (book && !rent) {
    await Rent.create({
      userId: req.user.id,
      bookId: req.params.bookId,
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
  const isDeleted = await Rent.destroy({
    where: { userId: req.user.id, id: id, status: 0 },
  });
  if (!isDeleted) {
    res.json({ message: "Livro não encontrado" }).end();
    return;
  }

  res.json({ message: "Livro removido com sucesso" });
};
