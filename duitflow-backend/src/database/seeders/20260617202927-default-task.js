'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [{
      title: 'Default Task',
      description: 'This is the default task',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: "2026-07-01",
      dueTime: "10:00"
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
