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
        foreignKey: "bookId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Review.init(
    {
      bookId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
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
