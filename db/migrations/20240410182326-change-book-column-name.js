"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("books", "releaseDate", "release_date");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("books", "release_date", "releaseDate");
  },
};
