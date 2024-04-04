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
      this.hasMany(models.book, {
        foreignKey: "user_id",
      });
      this.hasMany(models.author, {
        foreignKey: "user_id",
      });
      this.hasMany(models.review, {
        foreignKey: "user_id",
      });
      this.belongsToMany(models.book, {
        through: models.favorite,
        foreignKey: "user_id",
        otherKey: "book_id",
      });
      this.belongsToMany(models.book, {
        through: models.rent,
        foreignKey: "user_id",
        otherKey: "book_id",
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
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
};
