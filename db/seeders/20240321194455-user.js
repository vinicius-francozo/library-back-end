const bcrypt = require("bcryptjs");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const hashPassword = () => {
      const password = bcrypt.hashSync("123", 10);
      return password;
    };

    return queryInterface.bulkInsert(
      "users",
      [
        {
          username: "vini",
          email: "email@teste.com",
          password: hashPassword(),
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", { username: "vini" }, {});
  },
};
