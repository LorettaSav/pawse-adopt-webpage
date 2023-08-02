'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('answers', [
      {
        answer: 'Apartment',
        question_id: 1
      },
      {
        answer: 'House with a backyard',
        question_id: 1,
      },
      {
        answer: 'Not important, there are no children in the household',
        question_id: 2,
      },
      {
        answer: 'Very important, we have children or frequently have children visiting',
        question_id: 2,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('answers', null, {});
  }
};
