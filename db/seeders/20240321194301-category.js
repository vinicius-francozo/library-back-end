"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Romance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Terror",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Aventura",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fantasia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  },
};
