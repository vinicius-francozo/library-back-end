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
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.category, {
        foreignKey: "category_id",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.author, {
        foreignKey: "author_id",
        onDelete: "CASCADE",
      });
      this.hasMany(models.review, {
        foreignKey: "book_id",
      });
      this.belongsToMany(models.user, {
        through: models.favorite,
        foreignKey: "book_id",
        otherKey: "user_id",
      });
      this.belongsToMany(models.user, {
        through: models.rent,
        foreignKey: "book_id",
        otherKey: "user_id",
      });
    }
  }
  Book.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      author_id: { type: DataTypes.INTEGER, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
      pages: { type: DataTypes.INTEGER, allowNull: false },
      publisher: { type: DataTypes.STRING, allowNull: false },
      sinopsis: { type: DataTypes.STRING, allowNull: false },
      edition: { type: DataTypes.STRING, allowNull: false },
      releaseDate: { type: DataTypes.DATE, allowNull: false },
      cover: { type: DataTypes.STRING, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return Book;
};
