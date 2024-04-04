"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.belongsTo(models.book, { foreignKey: "book_id" });
    }
  }
  Favorite.init(
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      book_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "favorite",
    }
  );
  return Favorite;
};
