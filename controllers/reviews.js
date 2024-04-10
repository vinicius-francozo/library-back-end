const { review, book } = require("../db/models");
const objectFilter = require("../utils/objectFilter");

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

module.exports.update = async (req, res) => {
  const updateParams = objectFilter(
    req.body,
    (param) => !["id", "book_id", "user_id"].includes(param)
  );

  const reviews = await review.findByPk(req.params.id);

  await reviews.set({ ...updateParams });
  await reviews.save();
  res.json({ reviews });
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
