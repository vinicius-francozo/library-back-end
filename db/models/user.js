"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Book, {
        foreignKey: "userId",
      });
      this.hasMany(models.Author, {
        foreignKey: "userId",
      });
      this.hasMany(models.Review, {
        foreignKey: "userId",
      });
      this.belongsToMany(models.Book, {
        through: models.Favorite,
        foreignKey: "userId",
        otherKey: "bookId",
      });
      this.belongsToMany(models.Book, {
        through: models.Rent,
        foreignKey: "userId",
        otherKey: "bookId",
      });
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      street: DataTypes.STRING,
      neighbourhood: DataTypes.STRING,
      number: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
