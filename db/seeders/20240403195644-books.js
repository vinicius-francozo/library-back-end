"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "books",
      [
        {
          title: "How Innovation Works",
          author_id: 1,
          category_id: 1,
          pages: 100,
          publisher: "Dam co.",
          sinopsis: "lorem ipsum dolor",
          edition: 3,
          releaseDate: new Date(),
          cover: "/src/assets/matt-ridley-H-LIL57PHCc-unsplash.jpg",
          user_id: 1000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Psychology of Money",
          author_id: 1,
          category_id: 1,
          pages: 100,
          publisher: "Dam co.",
          sinopsis: "lorem ipsum dolor",
          edition: 3,
          releaseDate: new Date(),
          cover: "/src/assets/morgan-housel-aZ_MmSmAcjg-unsplash.jpg",
          user_id: 1000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("books", { user_id: 1000000 }, {});
  },
};
