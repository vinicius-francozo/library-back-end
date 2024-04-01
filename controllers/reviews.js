const { Review, Book } = require("../db/models");

module.exports.getUserReviews = async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
  });
  res.json({
    reviews,
  });
};

module.exports.create = async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  const review = await book.createReview({ userId: req.user.id, ...req.body });

  res.json({
    review,
  });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await Review.destroy({ where: { id: id } });
  if (!isDeleted) {
    res.json({ message: "Review não encontrado" }).end();
    return;
  }
  res.json({ message: "Review deletado com sucesso" });
};
