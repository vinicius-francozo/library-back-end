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
      this.belongsTo(models.user, { foreignKey: "userId" });
      this.belongsTo(models.book, { foreignKey: "bookId" });
    }
  }
  Favorite.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      bookId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "favorite",
    }
  );
  return Favorite;
};
