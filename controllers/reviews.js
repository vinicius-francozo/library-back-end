const { review, book } = require("../db/models");

module.exports.getUserReviews = async (req, res) => {
  const reviews = await review.findAll({
    where: { user_id: req.user.id },
  });
  res.json({
    reviews,
  });
};

module.exports.create = async (req, res) => {
  const books = await book.findByPk(req.params.bookId);
  const review = await books.createReview({
    user_id: req.user.id,
    ...req.body,
  });

  res.json({
    review,
  });
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await review.destroy({ where: { id: id } });
  if (!isDeleted) {
    res.json({ message: "review não encontrado" }).end();
    return;
  }
  res.json({ message: "review deletado com sucesso" });
};
