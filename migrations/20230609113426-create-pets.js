'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", 
          key: "id", 
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      neutered: {
        type: Sequelize.BOOLEAN
      },
      vaccination_status: {
        type: Sequelize.BOOLEAN
      },
      chip: {
        type: Sequelize.BOOLEAN
      },
      medical_issues: {
        type: Sequelize.STRING
      },
      special_needs: {
        type: Sequelize.STRING
      },
      passport: {
        type: Sequelize.BOOLEAN
      },
      bio: {
        type: Sequelize.STRING
      },
      diet: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pets');
  }
};