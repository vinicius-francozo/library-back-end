"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.book, {
        foreignKey: "book_id",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Review.init(
    {
      book_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      rate: { type: DataTypes.INTEGER, allowNull: false },
      text: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "review",
    }
  );
  return Review;
};
