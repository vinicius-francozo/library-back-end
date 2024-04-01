"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Authors",
      [
        {
          name: "aspdkapgf",
          surname: "aosfoaf",
          description: "aoskfoafs",
          country: "brasil",
          birthDate: new Date(),
          picture: "asokfoafksa",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Authors", null, {});
  },
};
