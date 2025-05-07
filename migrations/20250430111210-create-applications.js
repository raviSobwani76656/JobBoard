module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applications', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      resume: Sequelize.TEXT,
      coverletter: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applications');
  }
};
