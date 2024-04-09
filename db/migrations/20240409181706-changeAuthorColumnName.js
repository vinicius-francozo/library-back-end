"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("authors", "birthDate", "birth_date");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("authors", "birth_date", "birthDate");
  },
};
