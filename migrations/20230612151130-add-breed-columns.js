'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('breeds', 'height', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('breeds', 'weight', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('breeds', 'life_expectancy', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('breeds', 'temperament', {
      type: Sequelize.STRING,
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('breeds', 'height');
    await queryInterface.removeColumn('breeds', 'weight');
    await queryInterface.removeColumn('breeds', 'life_expectancy');
    await queryInterface.removeColumn('breeds', 'temperament');
  }
};
