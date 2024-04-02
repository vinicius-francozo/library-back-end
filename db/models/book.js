"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.author, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.review, {
        foreignKey: "bookId",
      });
      this.belongsToMany(models.user, {
        through: models.favorite,
        foreignKey: "bookId",
        otherKey: "userId",
      });
      this.belongsToMany(models.user, {
        through: models.rent,
        foreignKey: "bookId",
        otherKey: "userId",
      });
    }
  }
  Book.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      authorId: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
      pages: { type: DataTypes.INTEGER, allowNull: false },
      publisher: { type: DataTypes.STRING, allowNull: false },
      sinopsis: { type: DataTypes.STRING, allowNull: false },
      edition: { type: DataTypes.STRING, allowNull: false },
      releaseDate: { type: DataTypes.DATE, allowNull: false },
      cover: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return Book;
};
