'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pets', 'avatar', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('users', 'avatar', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pets', 'avatar');
    await queryInterface.removeColumn('users', 'avatar');
  }
};
