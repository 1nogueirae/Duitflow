'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'dueTime', {
      type: Sequelize.TIME,
      allowNull: true
    });

    await queryInterface.changeColumn('Tasks', 'dueDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'dueTime');
    await queryInterface.changeColumn('Tasks', 'dueDate', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};