'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Applications', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Applications', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Applications', 'name');
    await queryInterface.removeColumn('Applications', 'email');
  }
};

